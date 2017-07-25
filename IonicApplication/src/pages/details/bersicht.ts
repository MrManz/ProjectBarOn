import {Component} from '@angular/core';
import {NativeStorage} from 'ionic-native';
import {App, NavController, NavParams, AlertController, Platform} from 'ionic-angular';
import {BackendServiceProvider} from '../../providers/backend-service/backend-service';
import {SocialSharing} from '@ionic-native/social-sharing';
var that;

@Component({
  selector: 'page-bersicht',
  templateUrl: 'bersicht.html'
})
export class BersichtPage {
  cocktail = [];
  name = "";

  constructor(private app: App, public navCtrl: NavController, private backendservice: BackendServiceProvider, private params: NavParams, private socialSharing: SocialSharing, private alertCtrl: AlertController, public platform: Platform) {
    that = this
    this.readBottlesData().then(function (bottles) {
        let id = that.params.get("RecipeID")
        that.name = that.params.get("RecipeName")
        backendservice.loadRecipe(id).then(function (result) {
          let ingriedients = result as Array<number>;
          for (let incredient of ingriedients) {
            let zwischen = {
              Bottle: bottles[incredient["Id"]].Name,
              PathToPicture: bottles[incredient["Id"]].PathToPicture,
              volume: incredient["Volume"],
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
            text: 'NEIN',
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
          // if()
          alert.addInput({
            type: 'checkbox',
            id: bottle["Id"],
            label: bottle["Name"],
            value: bottle["Name"],
            checked: checked
          });
        }
        alert.addButton('Abbrechen');
        alert.addButton({
          text: 'Ändern',
          handler: data => {
            console.log('Checkbox data:', data);
          }
        });
        alert.present();
      }
      , function (error) {
      }
    );
  }

}
