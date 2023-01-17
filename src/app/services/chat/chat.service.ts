import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:3000'; // your server local path

  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data:any): void {
    this.socket.emit('join', data);
  }
  sendMessage(data:any): void {
    this.socket.emit('message', data);
  }
  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
        console.log("mesajul este:"+data.message);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }
  getStorage() {
    const storage: string | null = localStorage.getItem('mesaje');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: {user:string, message:string }) {
    localStorage.setItem('mesaje', JSON.stringify(data));
  }

}
