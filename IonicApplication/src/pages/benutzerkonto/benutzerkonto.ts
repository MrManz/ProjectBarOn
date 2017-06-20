import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-benutzerkonto',
  templateUrl: 'benutzerkonto.html'
})
export class BenutzerkontoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToLogin(params){
    if (!params) params = {};
    //workaround better way to do !!!
    location.reload();
    this.navCtrl.push(LoginPage);
  }goToBenutzerkonto(params){
    if (!params) params = {};
    this.navCtrl.push(BenutzerkontoPage);
  }
}
