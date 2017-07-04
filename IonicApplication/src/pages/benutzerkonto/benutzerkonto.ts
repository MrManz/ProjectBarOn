import {Component, ViewChild} from '@angular/core';
import {Item, NavController, ModalController} from 'ionic-angular';
import {NativeStorage} from 'ionic-native';
import {LoginModalPage} from '../login-modal/login-modal';
import {GoogleService} from '../../providers/google-service/google.service';
import {BackendServiceProvider} from '../../providers/backend-service/backend-service';
//import $ from "jquery";
var that;
@Component({
  selector: 'page-benutzerkonto',
  templateUrl: 'benutzerkonto.html'
})
export class BenutzerkontoPage {
  user = {
    name: "",
    email: "",
    picture: "",
    token: ""
  };
  @ViewChild('AccountListItem') AccountListItem: Item;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private googleService: GoogleService, private backendservice: BackendServiceProvider) {
    that = this;
    this.readUserData().then(function (user) {
        that.user = user;
      }
      , function (error) {
        that.openLoginModal()
      }
    );
  }

  //Remove when unused
  ngAfterViewInit() {
    console.log(this.AccountListItem);
  }

  logout(params) {
    if (!params) params = {};
    //workaround better way to do !!!
    NativeStorage.remove('user');
    this.openLoginModal();
    this.user = {
      name: "",
      email: "",
      picture: "",
      token: ""
    };
    this.googleService.googleSignOut();
  }

  goToBenutzerkonto(params) {
    if (!params) params = {};
    this.navCtrl.push(BenutzerkontoPage);
  }

  openLoginModal() {
    let loginModal = this.modalCtrl.create(LoginModalPage, {
      showBackdrop: false,
      enableBackdropDismiss: false
    });
    loginModal.onDidDismiss(function () {
      that.readUserData().then(function (user) {
          that.user = user;
        }
        , function (error) {
          that.openLoginModal()
        }
      );
    });
    loginModal.present();
  }

  readUserData() {
    return new Promise(
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

  loadBottles() {
    this.backendservice.loadBottles();
  }
}
