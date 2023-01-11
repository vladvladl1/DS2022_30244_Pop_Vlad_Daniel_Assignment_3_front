import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserResService} from "../api/UserRes.service";
import {Subject, takeUntil} from "rxjs";
import {User} from "../models/user"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private httpCancelSubject: Subject<any> = new Subject<any>();



  public messageText: any;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public showScreen = true;

  private user1:User = {
    name: '',
    username: '',
    status: '',
    role: ''
  }
  public currentUser : any;
  public selectedUser: any;

  public users: User[] = [];

  constructor(
    private userService: UserResService // clasa cu get post users
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAllUsers().pipe(takeUntil(this.httpCancelSubject)).subscribe( response => {
      this.users = response;
      //this.selectedUser = this.users[0];
    });
  }

  selectUserHandler(name: string | undefined): void {
    this.selectedUser = this.users.find(user => user.username === name);
  }

  sendMessage(): void {
   // this.messageText = '';
  }
}


