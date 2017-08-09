import {Injectable} from '@angular/core';
import { NativeStorage} from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Events, AlertController  } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
var that: GoogleService;

@Injectable()
export class GoogleService {
isApp: boolean;
SCOPE = 'profile';
GoogleAuth: any;
  constructor(public platform: Platform, public events: Events,public alert: AlertController, private googlePlus: GooglePlus ) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
    that = this;
  }

  public googleSignIn() {
      if (this.isApp) {
        this.googlePlus.login({
          'webClientId': '920043719912-b9pam9s4ak2g3f3elv421hk5d2jqhmjg.apps.googleusercontent.com',
          'offline': true
        })
          .then(function (user) {
            NativeStorage.setItem('user', {
              name: user.displayName,
              email: user.email,
              picture: user.imageUrl,
              token: user.idToken
            }).then(function () {
                that.events.publish('nativestorage:filled');
            })
          },function (msg) {
        })
        ;
      } else {
        gapi.load('client:auth2',  this.initClient);
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
        }).then(function () {
          that.events.publish('nativestorage:filled');
        });
      });
    });
  }

  public googleSignOut(){
    if (this.isApp) {
      this.googlePlus.logout();
      console.log(this.isApp);
    } else {
      this.GoogleAuth.signOut();
    }
  }
}
