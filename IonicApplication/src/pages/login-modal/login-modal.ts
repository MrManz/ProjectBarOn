import { Component } from '@angular/core';
import { IonicPage, ViewController} from 'ionic-angular';
import {GoogleService } from '../../providers/google-service/google.service';
import { Events } from 'ionic-angular';
var that: LoginModalPage;
@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
  loading;
  constructor(public vController: ViewController, private googleService: GoogleService, public events: Events) {
    that = this;
    events.subscribe('nativestorage:filled', () => {
      this.vController.dismiss();
    });
  }

  startGoogleSignIn() {
    this.googleService.googleSignIn();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SampleModalPage');
  }
}
