import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-cocktail-erstellen',
  templateUrl: 'cocktail-erstellen.html'
})
export class CocktailErstellenPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
}
