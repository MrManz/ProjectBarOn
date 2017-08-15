import {Component, NgZone} from '@angular/core';
import {NativeStorage} from 'ionic-native';
import {NavParams, AlertController, Platform, ModalController, ToastController} from 'ionic-angular';
import {BackendServiceProvider} from '../../providers/backend-service/backend-service';
import {SocialSharing} from '@ionic-native/social-sharing';
import { RezeptAuswHlenPage } from '../rezept-ausw-hlen/rezept-ausw-hlen';
var that;

@Component({
  selector: 'page-cocktail-erstellen',
  templateUrl: 'cocktail-erstellen.html'
})
export class CocktailErstellenPage {
  private cocktail = [];
  private name = "";
  private maximum = 500;
  private eventSet = false;
  private ItemClickedId;
  private Degree = 90;



  // Konstruktor der aus dem NativeStorage die zur Verfügung stehenden Getränke abruft und dann die Zutaten des zuvor ausgewählten
  // Rezeptes anzuzeigen oder einen leeren Mischbildschirm anzuzeigen
  constructor(private backendservice: BackendServiceProvider,
              private params: NavParams,
              private socialSharing: SocialSharing,
              private alertCtrl: AlertController,
              private platform: Platform,
              private zone: NgZone,
              private modal: ModalController,
              private toastCtrl: ToastController) {
    that = this
    this.readBottlesData().then(function (bottles) {
        if (that.params.data.RecipeID && that.params.data.RecipeName) {
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
        } else that.name = "Mix your own Cocktail"
      }
      , function (error) {
      }
    );
  }
  // Natives Teilen wenn möglich, ansonsten wird eine E-Mail versendet.
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
        subject: 'Teste den BarOn und meinen Cocktail',
        files: ['', ''], // an array of filenames
        chooserTitle: 'Share your Cocktail'
      }).then((result) => {
        console.log("Share completed? " + result.completed);
        console.log("Shared to app: " + result.app);
      }).catch((msg) => {
        console.log("Sharing failed with message: " + msg);
      });
    }
  }
  //Ueberwachung, dass immer höchstens this.maximum als Summe aller Getränkezutaten erreicht ist
  changeRangeSlider(Id) {
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
  //auslesen der angeschlossenen Getränke am BarOn aus dem NativeStorage
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
  //Die Getränkeauswahl des Mischbildschrims ändern(hinzufügen und entfernen von Zutaten)
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
  //Eventlistener nach dem Klick auf eine Zutat hinzufügen oder entfernen
  MixWithOrientationClick(id) {
    if (!(this.eventSet)) {
      window.addEventListener("deviceorientation", this.deviceOrientationChanged)
      that.ItemClickedId = id;
      that.eventSet = true;
    } else {
      window.removeEventListener("deviceorientation", this.deviceOrientationChanged);
      that.eventSet = false;
    }
  }
  //verändern der Menge je nachdem wie das Gerät gekippt wurde
  deviceOrientationChanged(event) {
    var beta = event.beta;
    if (Math.abs(that.Degree - beta) > 10) {
      that.Degree = beta;
      console.log(beta);
      that.cocktail.forEach(function (element) {
        if (element.Id == that.ItemClickedId) {
          console.log(element.Volume)
          element.Volume = element.Volume + ((beta - 90) * (-1));
          if (element.Volume > 200) {
            element.Volume = 200;
          }
        }
      })
    }
    that.changeRangeSlider(that.ItemClickedId)
  }
  //aktuelle Zutatenliste zum Backend senden
  SubmitOrder() {
    //Send Order to Backend
    this.readUserData().then(function (user) {
        that.backendservice.sentOrder(that.cocktail, user["token"]).then(function (requestAnswer) {
            let toast = that.toastCtrl.create({
              message: requestAnswer['_body'],
              duration: 3000,
              showCloseButton: true,
              closeButtonText: "OK"
            });

            toast.onDidDismiss(() => {
            });

            toast.present();
          }
        ), function (error) {
          console.log(error);

        };
      }
      , function (error) {
        console.log("Couldn't read user-Token")
        console.log(error);
      }
    );
  }
  //Nutzerdaten aus dem NativeStorage lesen
  readUserData() {
    return new Promise(
      (resolve, reject) => {
        var user;
        NativeStorage.getItem('user')
          .then(function (data) {
            user = data
            resolve(user)
          }, function (error) {
            reject(error);
          });
      }
    )
  }
  //Hilfe-Fenster mit Anleitung zum Mischen
  openInfoModal() {
    const infoModal = this.modal.create('InfoModalPage');
    infoModal.present();
  }
}
