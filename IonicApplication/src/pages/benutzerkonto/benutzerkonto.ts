import {Component, ViewChild} from '@angular/core';
import {Item, NavController} from 'ionic-angular';
import {NativeStorage} from 'ionic-native';
import {LoginPage} from '../login/login';
//import $ from "jquery";
var that;
@Component({
  selector: 'page-benutzerkonto',
  templateUrl: 'benutzerkonto.html'
})
export class BenutzerkontoPage {
  userPremise;
  user: any;
  @ViewChild('AccountListItem')  AccountListItem: Item;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
    that = this;
    this.readUserData();
    this.userPremise.then(function (user) {
      that.user = user;
    })
  }
  //Remove when unused
  ngAfterViewInit() {
    console.log(this.AccountListItem);
  }

  goToLogin(params) {
    if (!params) params = {};
    //workaround better way to do !!!
    location.reload();
    this.navCtrl.push(LoginPage);
  }

  goToBenutzerkonto(params) {
    if (!params) params = {};
    this.navCtrl.push(BenutzerkontoPage);
  }

  readUserData() {
    this.userPremise = new Promise(
      (resolve, reject) => {
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
            reject(error);
          });
      }
    )
  }
}
