import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BersichtPage } from '../bersicht/bersicht';

@Component({
  selector: 'page-rezept-ausw-hlen',
  templateUrl: 'rezept-ausw-hlen.html'
})
export class RezeptAuswHlenPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {

  }
  goToBersicht(params){
    if (!params) params = {};
    this.navCtrl.push(BersichtPage);
  }
}
