import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Recipe Book';
  loadedFeature= 'recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyC3QyHpFn0qzphnybUlCMasEq8R-a0l-TA",
      authDomain: "ng-recipe-book-d1acc.firebaseapp.com"
    });
  }

  onNavigate(feature: string){
    this.loadedFeature=feature;
  }
}
