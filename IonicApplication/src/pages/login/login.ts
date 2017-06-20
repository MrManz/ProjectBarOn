import {Component} from '@angular/core';
import {NavController, LoadingController, Platform} from 'ionic-angular';
//import {BenutzerkontoPage} from '../benutzerkonto/benutzerkonto';
import {GooglePlus, NativeStorage} from 'ionic-native';
import {TabsControllerPage} from '../tabs-controller/tabs-controller';
import GoogleAuth = gapi.auth2.GoogleAuth;
var that: LoginPage;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  isApp: boolean;
  SCOPE = 'profile';
  GoogleAuth: any;
  loading
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public platform: Platform) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    that = this;
  }

  // Do Google Login depending on mobile or Desktop
  goToBenutzerkonto(params) {

    if (this.isApp) {
      let nav = this.navCtrl;
      this.loading.present();
      GooglePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
        .then(function (user) {
          this.loading.dismiss();

          NativeStorage.setItem('user', {
            name: user.displayName,
            email: user.email,
            picture: user.imageUrl
          })
            .then(function () {
              //nav.push(UserPage);
            }, function (error) {
              console.log(error);
            })
        }, function (error) {
          this.loading.dismiss();
        });
    } else {
      this.loading.present();
      gapi.load('client:auth2', this.initClient);
    }
    //this.navCtrl.push(BenutzerkontoPage);
  }

  initClient() {
    gapi.client.init({
      'apiKey': 'Gn4FmGcD_pSP0D-7M_1oPhLe',
      'clientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com',
      'scope': that.SCOPE
    }).then(function () {
      that.GoogleAuth = gapi.auth2.getAuthInstance();
      that.GoogleAuth.signIn().then(function () {
        var user = that.GoogleAuth.currentUser.get();
        console.log(user.getBasicProfile().getEmail());
        that.navCtrl.push(TabsControllerPage);
        that.loading.dismiss();
      });
      //if (!params) params = {};
    });
  }

  goToLogin(params) {
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
