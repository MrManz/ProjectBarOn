import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { BackendServiceProvider } from '../../providers/backend-service/backend-service';
import {NativeStorage} from 'ionic-native';
var that;

@Component({
  selector: 'page-bersicht',
  templateUrl: 'bersicht.html'
})
export class BersichtPage {
  recipe;
  cocktail;

  constructor(public navCtrl: NavController, private backendservice: BackendServiceProvider, private params: NavParams) {
    that = this

    that.cocktail = this.params.get("RecipeID")
    console.log(this.params.get("RecipeID"))

    backendservice.loadRecipes().then(function (result) {
      that.recipe = result;
    });
  }

}
