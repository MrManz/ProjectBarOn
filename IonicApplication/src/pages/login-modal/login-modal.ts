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
  constructor(public vController: ViewController, private googleService: GoogleService) {
    that = this;
  }

  startGoogleSignIn() {
    this.googleService.googleSignIn();
    this.vController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SampleModalPage');
  }
}
