import { Component } from '@angular/core';
import { IonicPage, NavController,Events,  NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  appLoadInfo;  
  customerInfoForm: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    private events: Events,
    private fb: FormBuilder,  

  ) {
    this.appLoadInfo = {};
    this.appLoadInfo.projectid = "12345";
    this.appLoadInfo.firstname = "John";
    this.appLoadInfo.lastname = "Doe";
    this.appLoadInfo.username = "johnDoe@yahoo.com";   
    this.events.subscribe("openAppFromExternal", (val) => {
    this.events.publish("homeParamChanged", val);
    });

    this.events.subscribe("homeParamChanged", (val) => {
      this.appLoadInfo = val;
    });
    this.customerInfoForm = fb.group({
      projectid: [null],
      firstname: [null],
      lastname: [null],
      srcurlscheme: [null],
      username: [null],
      opportunityid: [null],
      env: [null],
      product: [null],
      token: [null],
      pasteboardkey: [null],
      branchnumber: [null]

    });
  }
    
   submit(data){
     console.log("the data val is...", data);
     this.navCtrl.push(TabsPage, { index: "0" });
   }
  }

  


