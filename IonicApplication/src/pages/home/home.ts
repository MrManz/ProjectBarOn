import {Component} from '@angular/core';
import {NavController, LoadingController, Platform} from 'ionic-angular';
import {UserPage} from '../user/user';
import {GooglePlus, NativeStorage} from 'ionic-native';
import $ from "jquery";
var that: HomePage;
var user2;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isApp: boolean;
  SCOPE = 'profile';
  GoogleAuth: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public platform: Platform) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
    that = this;
  }

  doGoogleLogin() {
    if (this.isApp) {
      let nav = this.navCtrl;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      GooglePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
        .then(function (user) {
          loading.dismiss();

          NativeStorage.setItem('user', {
            name: user.displayName,
            email: user.email,
            picture: user.imageUrl
          })
            .then(function () {
              nav.push(UserPage);
            }, function (error) {
              console.log(error);
            })
        }, function (error) {
          loading.dismiss();
        });
    } else {
      gapi.load('client:auth2', this.initClient);
    }

  }

  initClient() {
    gapi.client.init({
      'apiKey': 'Gn4FmGcD_pSP0D-7M_1oPhLe',
      'clientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com',
      'scope': that.SCOPE
    }).then(function () {
      that.GoogleAuth = gapi.auth2.getAuthInstance();
      // Listen for sign-in state changes.
      that.GoogleAuth.isSignedIn.listen(that.updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = that.GoogleAuth.currentUser.get();
      that.setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function () {
        that.handleAuthClick();
      });
      $('#revoke-access-button').click(function () {
        that.revokeAccess();
      });
    });
  }

  handleAuthClick() {
    if (that.GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
      that.GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      that.GoogleAuth.signIn();
    }
  }


  revokeAccess() {
    that.GoogleAuth.disconnect();
  }

  setSigninStatus() {
    var user = that.GoogleAuth.currentUser.get();
    console.log(user);
    var isAuthorized = user.hasGrantedScopes(that.SCOPE);
    if (isAuthorized) {
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
        'access to this app.');
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
        'signed out.');
    }
  }

  updateSigninStatus() {
    that.setSigninStatus();
  }

}
