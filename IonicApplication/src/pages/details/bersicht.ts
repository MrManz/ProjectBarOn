import {Component, NgZone} from '@angular/core';
import {NativeStorage} from 'ionic-native';
import {NavParams, AlertController, Platform, ModalController} from 'ionic-angular';
import {BackendServiceProvider} from '../../providers/backend-service/backend-service';
import {SocialSharing} from '@ionic-native/social-sharing';
import {DeviceOrientation, DeviceOrientationCompassHeading} from '@ionic-native/device-orientation';

var that;

@Component({
  selector: 'page-bersicht',
  templateUrl: 'bersicht.html'
})
export class BersichtPage {
  private cocktail = [];
  private name = "";
  private maximum = 500;
  static subscription;

  constructor(private backendservice: BackendServiceProvider,
              private params: NavParams,
              private socialSharing: SocialSharing,
              private alertCtrl: AlertController,
              private platform: Platform,
              private zone: NgZone,
              private deviceOrientation: DeviceOrientation,
              private modal: ModalController) {
    that = this
    this.readBottlesData().then(function (bottles) {
        let id = that.params.get("RecipeID")
        that.name = that.params.get("RecipeName")
        backendservice.loadRecipe(id).then(function (result) {
          let ingriedients = result as Array<number>;
          for (let incredient of ingriedients) {
            let zwischen = {
              Name: bottles[incredient["Id"]].Name,
              PathToPicture: bottles[incredient["Id"]].PathToPicture,
              Volume: incredient["Volume"],
              Id: incredient["Id"]
            }
            that.cocktail.push(zwischen);
          }
        });
      }
      , function (error) {
      }
    );
  }

  share() {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      let alert = this.alertCtrl.create({
        title: 'Teilen',
        subTitle: 'Möchtest du eine deinen Cocktail mit deinen Freunden teilen ?',
        buttons: [
          {
            text: 'Nein',
            role: 'cancel'
          },
          {
            text: 'JA !',
            handler: () => {
              var link = "mailto:me@example.com"
                + "&subject=" + "Teste den BarOn und meinen Cocktail"
                + "&body=" + document.getElementById('myText')
              window.open(link, '_self')
            }
          }
        ]
      });
      alert.present();
    } else {
      this.socialSharing.shareWithOptions({
        message: 'Teile deine Cocktail', // not supported on some apps (Facebook, Instagram)
        subject: 'Teste den BarOn und meinen Cocktail', // fi. for email
        files: ['', ''], // an array of filenames either locally or remotely
        // url: 'https://www.website.com/foo/#bar?a=b',
        chooserTitle: 'Share your Cocktail' // Android only, you can override the default share sheet title
      }).then((result) => {
        // Success!
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      }).catch((msg) => {
        console.log("Sharing failed with message: " + msg);
        // Error!
      });
    }
  }

  changeRangeSlider(data, Id) {
    this.name = "Mix your own Drink"
    let currentTotalAmount = 0;
    this.cocktail.forEach(function (element) {
      currentTotalAmount += element.Volume
    })
    if (currentTotalAmount > this.maximum) {
      let reduce = currentTotalAmount - this.maximum;
      reduce = reduce / (this.cocktail.length - 1);
      this.cocktail.forEach(function (element) {
        if (element.Id != Id) {
          element.Volume = element.Volume - reduce;
        }
      })
    }
    this.zone.run(() => {
      //Callback of Object.forEach breaks NgZone -> so run Ng.zone() to update UI
    });
  }

  readBottlesData() {
    return new Promise(
      (resolve, reject) => {
        var bottles;
        NativeStorage.getItem('bottles')
          .then(function (data) {
            bottles = data
            resolve(bottles)
          }, function (error) {
            reject(error);
          });
      }
    )
  }

  hasValue(obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] === value;
  }

  addIngredient() {
    this.readBottlesData().then(function (bottles) {
        let alert = that.alertCtrl.create();
        alert.setTitle('Du möchtest deine Getränkeauswahl ändern ?');
        let bottlesarray = bottles as Array<number>;
        for (let bottle of bottlesarray) {
          let checked = false;
          for (let cocktail of that.cocktail) {
            if (bottle["Id"] == cocktail["Id"]) {
              checked = true;
            }
          }
          alert.addInput({
            type: 'checkbox',
            label: bottle["Name"],
            value: {
              "Id": bottle["Id"],
              "Name": bottle["Name"],
              "PathToPicture": bottle["PathToPicture"]
            },
            checked: checked
          });
        }
        alert.addButton('Abbrechen');
        alert.addButton({
          text: 'Ändern',
          handler: data => {
            that.name = "Mix your own Drink"
            console.log('Checkbox data:', data);
            for (let selectedBottles of data) {
              if (!(that.cocktail.some(function (bottle) {
                  return that.hasValue(bottle, "Id", selectedBottles["Id"]);
                }))) {
                let zwischen = {
                  Name: selectedBottles["Name"],
                  PathToPicture: selectedBottles["PathToPicture"],
                  Volume: "0",
                  Id: selectedBottles["Id"]
                }
                that.cocktail.push(zwischen);
              }
            }
            for (let actualBottles of that.cocktail) {
              if (!(data.some(function (bottle) {
                  return that.hasValue(bottle, "Id", actualBottles["Id"]);
                }))) {
                var index = that.cocktail.indexOf(actualBottles);
                that.cocktail.splice(index, 1);
              }
            }
          }
        });
        alert.present();
      }
      , function (error) {
      }
    );
  }

  MixWithOrientationStart() {
    console.log("pressed");
      /*setInterval(function () {
      this.deviceOrientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => console.log(data),
        (error: any) => console.log(error)
      );
    },1000);*/

    var subscription = that.deviceOrientation.watchHeading({frequency: 1000}).subscribe(
      function (data: DeviceOrientationCompassHeading) {
        //console.log(data)
      }
    );

  }

  MixWithOrientationEnd() {
    // if(this.subscription){
    //   this.subscription.unsubscribe();
    //   alert("unsub")
    // }
  }

  openInfoModal(){
    const infoModal = this.modal.create('InfoModalPage');
    infoModal.present();
  }
}
