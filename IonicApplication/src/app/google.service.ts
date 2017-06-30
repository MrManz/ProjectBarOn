import {Injectable} from  '@angular/core';
import {GooglePlus, NativeStorage} from 'ionic-native';
import { Platform } from 'ionic-angular';
import GoogleAuth = gapi.auth2.GoogleAuth;
var that: GoogleService;

@Injectable()
export class GoogleService {
isApp: boolean;
SCOPE = 'profile';
GoogleAuth: any;

  constructor(public platform: Platform) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
    that = this;
  }

  public googleSignIn() {
    if (this.isApp) {
      GooglePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
        .then(function (user) {
          NativeStorage.setItem('user', {
            name: user.displayName,
            email: user.email,
            picture: user.imageUrl,
            token: user.id_token
          })
            .then(function () {
              //nav.push(UserPage);
            }, function (error) {
              console.log(error);
            })
        }, function (error) {
            console.log(error);
        });
    } else {
      gapi.load('client:auth2', this.initClient);
    }
  }

  private initClient() {
    gapi.client.init({
      'apiKey': 'Gn4FmGcD_pSP0D-7M_1oPhLe',
      'clientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com',
      'scope': that.SCOPE
    }).then(function () {
      that.GoogleAuth = gapi.auth2.getAuthInstance();
      that.GoogleAuth.signIn().then(function () {
        var user = that.GoogleAuth.currentUser.get();
        var userProfile = user.getBasicProfile();

        NativeStorage.setItem('user', {
          name: userProfile.getName(),
          email: userProfile.getEmail(),
          picture: userProfile.getImageUrl(),
          token: user.getAuthResponse().id_token
        });
      });
    });
  }

  public googleSignOut(){
    if (this.isApp) {
      console.log(this.isApp);
    } else {
      this.GoogleAuth.signOut();
    }
  }
}
