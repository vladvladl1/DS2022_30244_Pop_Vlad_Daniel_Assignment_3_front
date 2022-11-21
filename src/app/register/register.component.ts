import { Component, OnInit } from '@angular/core';
import {UsersResourceService} from "../api/userResource.service";
import {Subject, takeUntil} from "rxjs";
import {User} from "../models/user";
import {UserTok} from "../models/userTok";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUsers: any[] = [];
  signObj: any = {
    username: '',
    password: '',
    name: '',
    role: ''
  };
  private http: Subject<any> = new Subject<any>();
  constructor(private userResource:UsersResourceService) { }

  ngOnInit(): void {
    const localData = localStorage.getItem("signUsers");
    if(localData!=null){
      this.signUsers = JSON.parse(localData);
    }
  }

  onSign(){
   // this.signUsers.push(this.signObj);
  //  localStorage.setItem('signUsers', JSON.stringify(this.signUsers));
  //  this.signObj = {
  //    username: '',
  //    password: '',
  //    name: '',
  //    role: ''
 //   };

    const user:User = {username:this.signObj.username, password:this.signObj.password, name:this.signObj.name,
    status:"unsuspended", role:this.signObj.role
    };
    console.log("aici" + user);

    this.userResource.signUser(user).pipe(takeUntil(this.http)).subscribe(response => {
      const userTok : UserTok = response;
      console.log(userTok);
    });
  }
}
