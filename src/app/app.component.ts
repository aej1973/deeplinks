import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import queryString from 'querystring';
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private deeplinks:Deeplinks, private events: Events,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.deeplinks.routeWithNavController(this.nav, {       
        '/landing': LandingPage
      }).subscribe((match) => {
        
        console.log('URL scheme data', queryString.parse(match.$link.queryString));
        this.events.publish("openAppFromExternal", queryString.parse(match.$link.queryString));
        // alert("success page" + match.$link.queryString)
      }, (nomatch) => {
        console.log('Unmatched Route', nomatch);
        // alert("No matched page")
      });

    });
  }
}
