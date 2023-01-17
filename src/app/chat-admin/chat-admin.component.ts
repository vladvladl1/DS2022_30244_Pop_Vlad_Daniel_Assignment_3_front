import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {User} from "../models/user";
import {UserResService} from "../api/UserRes.service";
import {ChatService} from "../services/chat/chat.service";

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {
  private httpCancelSubject: Subject<any> = new Subject<any>();



  public messageText: any;
  public messageArray: { user: User, message: string }[] = [];
  private storageArray:any = [];
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
  public allUsers : User[] = [];
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
    this.getCurrentUser();
    this.chatService.getMessage()
      .subscribe((data: { user: string,room:string, message: string }) => {
        // this.messageArray.push(data);

        setTimeout(() => {
          var usermsg = {user: this.currentUser, message: data.message};
          this.messageArray.push(usermsg);
          // this.storageArray = this.chatService.getStorage();
          // const storeIndex = this.storageArray.findIndex((storage: { user: string, message:string }) => storage.user === this.selectedUser.username);
          // this.messageArray = this.storageArray[storeIndex].mesaje;
        }, 500);

      });
  }

  private getUser() {
    this.userService.getAllUsers(this.logged).pipe(takeUntil(this.httpCancelSubject)).subscribe( response => {
      this.allUsers = response;
    });
  }

  private getCurrentUser() {
    this.userService.getMe(this.logged).pipe(takeUntil(this.httpCancelSubject)).subscribe( response => {
      this.currentUser = response;
    });
  }

  selectUserHandler(name: string | undefined): void {
    this.selectedUser = this.allUsers.find(user => user.username === name);
    //this.storageArray = this.chatService.getStorage();
    //const storeIndex = this.storageArray.findIndex((storage: { user: string, message:string }) => storage.user === this.selectedUser.username);

    //if (storeIndex > -1) {
    //  this.messageArray = this.storageArray[storeIndex].mesaje;
    //}
    this.join(this.currentUser, this.selectedUser.username)
  }
  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }
  sendMessage(): void {
    if(this.selectedUser!==undefined) {
      var sendit = {user: this.currentUser.username, room: this.selectedUser.username, message: this.messageText}
      this.chatService.sendMessage(sendit);
      var usermsg = {user:this.selectedUser.username,message: this.messageText};
      const localData1 = localStorage.setItem("mesaje", JSON.stringify(usermsg));
      this.messageText = "";
    }
    /*var sendit = {user: this.selectedUser.username, room: this.selectedUser.username, message: this.messageText}
    this.chatService.sendMessage(sendit);
    this.storageArray = this.chatService.getStorage();
    console.log(this.storageArray);

    const storeIndex = this.storageArray
      .findIndex((storage: { user: string, message:string }) => storage.user === this.selectedUser.username);
    console.log(storeIndex);


    if (storeIndex > -1) {
      this.storageArray[storeIndex].mesaje.push({
        user: this.selectedUser.username,
        message: this.messageText
      });
    } else {
      var updateStorage = {

          user: this.selectedUser.username,
          message: this.messageText

      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = "";*/
  }


}
