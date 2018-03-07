import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-index1',
  templateUrl: './index1.html',
  styleUrls: ['./index1.css']
})
export class Index1Component {


  constructor(
      private route: ActivatedRoute,
      private router: Router) {
  
  }
   
   goHome(){
          let link=['/home'];
    this.router.navigate(link);
   }
  
}