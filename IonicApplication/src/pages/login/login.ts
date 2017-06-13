import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BenutzerkontoPage } from '../benutzerkonto/benutzerkonto';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToBenutzerkonto(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage);
    //this.navCtrl.push(BenutzerkontoPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
