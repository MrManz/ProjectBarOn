import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-benutzerkonto',
  templateUrl: 'benutzerkonto.html'
})
export class BenutzerkontoPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    this.readUserData();
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
  readUserData(){
    let p1 = new Promise(
      (resolve,reject) => {
        var user;
        NativeStorage.getItem('user')
          .then(function (data) {
            user = {
              name: data.name,
              email: data.email,
              picture: data.picture,
              token: data.token
            };
            resolve(user)
          }, function (error) {
            return user;
          });
      }
    )
    p1.then(function (user) {
       console.log(user);
    })
  }
}
