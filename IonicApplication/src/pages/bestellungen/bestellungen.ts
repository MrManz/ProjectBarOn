import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {BackendServiceProvider} from '../../providers/backend-service/backend-service';
import {NativeStorage} from 'ionic-native';
var that: BestellungenPage;

@Component({
  selector: 'page-bestellungen',
  templateUrl: 'bestellungen.html'
})
export class BestellungenPage {
  private orders = [];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,
              private backendservice: BackendServiceProvider) {
    that = this;
    this.loadOrderedDrinks();
  }

  loadOrderedDrinks() {
    //Send Order to Backend
    this.readUserData().then(function (user) {
        that.backendservice.loadOrderedDrinks(user["token"]).then(function (requestAnswer) {
            that.readBottlesData().then(function (bottles) {
              // let ordersResult = requestAnswer as Array<number>;

               let ordersResult = JSON.parse(requestAnswer['_body']);
               ordersResult.forEach(function (order) {
                 let temp = {
                   Name: bottles[order.IdBottle].Name,
                   PathToPicture: bottles[order.IdBottle].PathToPicture,
                   Volume: order.Amount
                 }
                 that.orders.push(temp)
               })
            }),function (error) {
              console.log(error);
            };
        }),function (error) {
          console.log(error);
        };
      }
      , function (error) {
        console.log("Couldn't read user-Token")
        console.log(error);
      }
    );
  }

  readUserData() {
    return new Promise(
      (resolve, reject) => {
        var user;
        NativeStorage.getItem('user')
          .then(function (data) {
            user = data
            resolve(user)
          }, function (error) {
            reject(error);
          });
      }
    )
  }

  readBottlesData() {
    return new Promise(
      (resolve, reject) => {
        var bottles;
        NativeStorage.getItem('bottles')
          .then(function (data) {
            bottles = data
            resolve(bottles)
          }, function (error) {
            reject(error);
          });
      }
    )
  }

}
