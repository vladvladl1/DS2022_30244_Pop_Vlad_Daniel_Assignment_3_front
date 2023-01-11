import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserTok} from "../models/userTok";
import {UsersResourceService} from "../api/userResource.service";
import {Router} from "@angular/router";
import {DeviceResourceService} from "../api/DeviceResource.service";
import {webSocket} from "rxjs/webSocket";
import Swal from 'sweetalert2';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  logged: any;
  subject = webSocket('ws://localhost:8081/');
  private http: Subject<any> = new Subject<any>();
  deviceArr:any[] = [];
  device:any = {
    description: '',
    address: '',
    maxHConsumption: '',
    username: ''
  }
  constructor(private deviceResource:DeviceResourceService, private router:Router, private userResource:UsersResourceService) { }

  ngOnInit(): void {
    const localData = localStorage.getItem("logginUsers");

    if(localData!=null){
      this.logged = JSON.parse(localData);
    }
    this.deviceResource.getDevices(this.logged).pipe(takeUntil(this.http)).subscribe(response => {
      this.deviceArr = response;
      localStorage.setItem('devicesUser', JSON.stringify(this.deviceArr));
    });
    this.subject.asObservable().subscribe(val => {
      console.log(val);

      Swal.fire({title:'s-a intrecut pragul', text:"cu valoarea " + val});
    });
  }


  onClose(){
    const notNull = document.getElementById("deviceModel");
    if(notNull != null){
      notNull.style.display = 'block';
    }
  }



  onChat(){
    this.router.navigate(['/', 'chat']);
  }

  onLogout(){
    const localData = localStorage.getItem("logginUsers");

    if(localData!=null){
      this.logged = JSON.parse(localData);
    }
    console.log(this.logged);
    this.userResource.logoutUser(this.logged).pipe(takeUntil(this.http)).subscribe(response => {
     this.router.navigate(['/', 'login']);
    });



  }

}
