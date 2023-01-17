import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UsersResourceService} from "../api/userResource.service";
import {Router} from "@angular/router";
import {DeviceResourceService} from "../api/DeviceResource.service";
import {UserResService} from "../api/UserRes.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  logged: any;
  username:any;
  deviceArr:any[] = [];
  deviceArr1:any[] = [];
  UserArr:any[] = [];
  device:any = {
    _id:'',
    description: '',
    address: '',
    maxHConsumption: '',
    username: ''
  };

  user:any = {
    name: '',
    username: '',
    status: '',
    role: ''
  }
  private http: Subject<any> = new Subject<any>();
  constructor(private userResource:UsersResourceService,
              private router:Router, private deviceResource:DeviceResourceService,
              private userRes:UserResService,) { }

  ngOnInit(): void {
    const localData = localStorage.getItem("logginUsers");

    if(localData!=null){
      this.logged = JSON.parse(localData);
    }
  }
  onDelete1(dev:any){
    this.deviceResource.deviceDelete(this.logged, dev._id).pipe(takeUntil(this.http)).subscribe(response => {

    });
  }
  map(){

    this.deviceResource.mapping(this.logged, this.username).pipe(takeUntil(this.http)).subscribe(response => {
      this.deviceArr1 = response;

    });

  }
  onChat(){
    this.router.navigate(['/', 'adminchat']);
  }
  onDelete(user:any){
    this.userRes.userDelete(this.logged, user.username).pipe(takeUntil(this.http)).subscribe(response => {

    });
  }
  onAdd(){

    const device = {description:this.device.description,address:this.device.address,
      maxHConsumption:this.device.maxHConsumption,username:this.device.username};
    this.deviceResource.deviceCreate(this.logged, device).pipe(takeUntil(this.http)).subscribe(response => {

    });
  }

  onEditDevice(){
    const thedevice = {_id:this.device._id, description:this.device.description, address:this.device.address,
      maxHConsumption:this.device.maxHConsumption, username:this.device.username};
    this.deviceResource.deviceEdit(this.logged, thedevice).pipe(takeUntil(this.http)).subscribe(response => {

    });
  }

  onEdit(){
    const theuser = {name:this.user.name, username:this.user.username, status:this.user.status, role:this.user.role};
    this.userRes.editUsers(this.logged, theuser).pipe(takeUntil(this.http)).subscribe(response => {
      const s = response;
    });
  }

  getDev(){

    this.deviceResource.getAllDevices(this.logged).pipe(takeUntil(this.http)).subscribe(response => {
      this.deviceArr = response;
      localStorage.setItem('allUDevices', JSON.stringify(this.deviceArr));
    });
    this.device= {
      _id: '',
      description: '',
      address: '',
      maxHConsumption: '',
      username: ''
    };
  }
  getUs(){

    this.userRes.getAllUsers(this.logged).pipe(takeUntil(this.http)).subscribe(response => {
      this.UserArr = response;
      localStorage.setItem('allUsers', JSON.stringify(this.UserArr));
    });
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
