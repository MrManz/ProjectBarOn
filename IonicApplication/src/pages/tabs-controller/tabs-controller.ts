import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RezeptAuswHlenPage } from '../rezept-ausw-hlen/rezept-ausw-hlen';
import { BersichtPage } from '../details/bersicht';
import { BenutzerkontoPage } from '../benutzerkonto/benutzerkonto';
import { CocktailErstellenPage } from '../cocktail-erstellen/cocktail-erstellen';
import { BestellungenPage } from '../bestellungen/bestellungen';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = BenutzerkontoPage;
  tab2Root: any = CocktailErstellenPage;
  tab3Root: any = RezeptAuswHlenPage;
  tab4Root: any = BestellungenPage;
  constructor(public navCtrl: NavController) {
  }
  goToRezeptAuswHlen(params){
    if (!params) params = {};
    this.navCtrl.push(RezeptAuswHlenPage);
  }goToBersicht(params){
    if (!params) params = {};
    this.navCtrl.push(BersichtPage);
  }
}
