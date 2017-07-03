import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BersichtPage } from '../bersicht/bersicht';
import { BackendServiceProvider } from '../../providers/backend-service/backend-service';
@Component({
  selector: 'page-rezept-ausw-hlen',
  templateUrl: 'rezept-ausw-hlen.html'
})
export class RezeptAuswHlenPage {
  recipes;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private backendservice: BackendServiceProvider) {
    this.recipes = backendservice.loadRecipe();
  }
  goToBersicht(params){
    if (!params) params = {};
    this.navCtrl.push(BersichtPage);
  }
}
