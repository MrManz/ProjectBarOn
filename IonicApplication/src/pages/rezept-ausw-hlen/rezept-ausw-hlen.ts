import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CocktailErstellenPage } from '../cocktail-erstellen/cocktail-erstellen'
import { BackendServiceProvider } from '../../providers/backend-service/backend-service';
var that;
@Component({
  selector: 'page-rezept-ausw-hlen',
  templateUrl: 'rezept-ausw-hlen.html'
})
export class RezeptAuswHlenPage {
  recipes;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private backendservice: BackendServiceProvider) {
    that = this;
    backendservice.loadRecipes().then(function (result) {
      that.recipes = result;
    });
  }
  goToCocktailErstellenPage(params){
    this.navCtrl.push(CocktailErstellenPage,{ RecipeID: params.Id, RecipeName: params.Name} )
  }

  like(item){
    //implement like according to Peter
  }
}
