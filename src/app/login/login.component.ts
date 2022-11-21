import { Component, OnInit } from '@angular/core';
import {UsersResourceService} from "../api/userResource.service";
import {User} from "../models/user";
import {Subject, takeUntil} from "rxjs";
import {UserTok} from "../models/userTok";
import {provideRouter, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsers: any;
  signed: any[] = [];
  loginObj: any = {
    username: '',
    password: ''
  };
  private http: Subject<any> = new Subject<any>();

   constructor(private userResource:UsersResourceService, private router:Router) {

  }

  ngOnInit(): void {
  }

  loginUser(event: any){
    console.log(event)
  }

  onLogin(){

   /* const localData = localStorage.getItem("loggedUsers");

    this.userResource.loginUser();
    if(localData!=null){
     this.signed = JSON.parse(localData);
    }

    */

   // const isUserExist = this.signed.find(m=>m.username === this.loginObj.username && m.password === this.loginObj.password);
    const user:User = {username:this.loginObj.username, password:this.loginObj.password};
    console.log("aici" + user);
    const tok :[] = [];
    this.userResource.loginUser(user).pipe(takeUntil(this.http)).subscribe(response => {
      const userTok : UserTok = response;
      if(userTok.user?.role==="admin"){
        this.router.navigate(['/', 'admin']);
      }
      if(userTok.user?.role==="user"){
        this.router.navigate(['/', 'user']);
      }
     console.log(userTok.token);
      localStorage.setItem('logginUsers', JSON.stringify(userTok.token));
    });

   // if(isUserExist != null){
   //   alert('user login');
  //  }else{
   //   alert('wrong credentials');
  //  }
  }

}
