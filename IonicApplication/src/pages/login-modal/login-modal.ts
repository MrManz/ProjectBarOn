import { Component } from '@angular/core';
import { IonicPage, LoadingController, ViewController} from 'ionic-angular';
import GoogleAuth = gapi.auth2.GoogleAuth;
import { GoogleService } from '../../app/google.service';
var that: LoginModalPage;
@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
  loading;
  constructor(public vController: ViewController, private googleService: GoogleService, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    that = this;
  }

  startGoogleSignIn() {
    this.loading.present();
    this.googleService.googleSignIn();
    this.vController.dismiss();
    this.loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SampleModalPage');
  }
}
