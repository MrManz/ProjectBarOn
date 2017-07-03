import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BenutzerkontoPage } from '../pages/benutzerkonto/benutzerkonto';
import { CocktailErstellenPage } from '../pages/cocktail-erstellen/cocktail-erstellen';
import { BersichtPage } from '../pages/bersicht/bersicht';
import { RezeptAuswHlenPage } from '../pages/rezept-ausw-hlen/rezept-ausw-hlen';
import { BestellungenPage } from '../pages/bestellungen/bestellungen';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { GoogleService } from './google.service';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackendServiceProvider } from '../providers/backend-service/backend-service';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    BenutzerkontoPage,
    CocktailErstellenPage,
    BersichtPage,
    RezeptAuswHlenPage,
    BestellungenPage,
    TabsControllerPage,
    LoginModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BenutzerkontoPage,
    CocktailErstellenPage,
    BersichtPage,
    RezeptAuswHlenPage,
    BestellungenPage,
    TabsControllerPage,
    LoginModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackendServiceProvider
  ]
})
export class AppModule {}
