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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
