import {Component} from '@angular/core';
import {NavController,Platform} from 'ionic-angular';
import {CocktailErstellenPage} from '../cocktail-erstellen/cocktail-erstellen'
import {BackendServiceProvider} from '../../providers/backend-service/backend-service';
import {NativeStorage} from 'ionic-native';
import {Toast} from "@ionic-native/toast";

var that;

@Component({
  selector: 'page-rezept-ausw-hlen',
  templateUrl: 'rezept-ausw-hlen.html'
})
export class RezeptAuswHlenPage {
  recipes;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private backendservice: BackendServiceProvider,private platform: Platform,private toast: Toast) {
    that = this;
    backendservice.loadRecipes().then(function (result) {
      that.recipes = result;
    });
  }

  goToCocktailErstellenPage(params) {
    this.navCtrl.push(CocktailErstellenPage, {RecipeID: params.Id, RecipeName: params.Name})
  }

  like(item) {
    this.readUserData().then(function (user) {
        that.backendservice.likeRecipe(item.item.id,user["token"]).then(function (requestAnswer) {
          if (that.platform.is('core') || that.platform.is('mobileweb')) {
            alert(requestAnswer['_body']);
          } else {
            that.toast.show(requestAnswer['_body'], '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          }
        }),
          function (error) {
          console.log(error);
          }
      }
    ),
      function (error) {
        console.log("Couldn't read user-Token")
        console.log(error);
      }
  }
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
}
