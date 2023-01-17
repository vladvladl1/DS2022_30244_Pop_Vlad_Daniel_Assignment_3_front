import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserResService} from "../api/UserRes.service";
import {Subject, takeUntil} from "rxjs";
import {User} from "../models/user";
import {ChatService} from '../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private httpCancelSubject: Subject<any> = new Subject<any>();



  public messageText: any;
  public messageArray: { user: User, message: string }[] = [];
  private storageArray = [];
  roomId = '1';
  public showScreen = true;
  logged: any;
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
    private userService: UserResService, // clasa cu get post users
    private chatService: ChatService
  ) { }

  ngOnInit(): void {

    const localData = localStorage.getItem("logginUsers");
    if(localData!=null){
      this.logged = JSON.parse(localData);
    }
    this.getUser();

    this.chatService.getMessage()
      .subscribe((data: { user: string,room:string, message: string }) => {
        // this.messageArray.push(data);

          setTimeout(() => {
            var usermsg = {user:this.currentUser.username,message: data.message};
            this.messageArray.push(usermsg);

          }, 500);

      });
  }

  private getUser() {
    this.userService.getMe(this.logged).pipe(takeUntil(this.httpCancelSubject)).subscribe( response => {
      this.currentUser = response;
      this.join(this.currentUser.username, this.currentUser.username);
    });
  }

  selectUserHandler(name: string | undefined): void {
    this.selectedUser = this.users.find(user => user.username === name);
  }
  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }
  sendMessage(): void {
    var sendit = {user:this.currentUser.username, room:this.currentUser.username, message: this.messageText}
    this.chatService.sendMessage(sendit);
    var usermsg = {user:this.currentUser.username,message: this.messageText};
    //this.messageArray.push(usermsg);
    const localData1 = localStorage.setItem("mesaje", JSON.stringify(usermsg));
    this.messageText = "";
  }
}


