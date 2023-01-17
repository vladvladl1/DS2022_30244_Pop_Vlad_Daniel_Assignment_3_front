import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from "app/models/user";
import {UserTok} from "../models/userTok";
import {Device} from "../models/device";

@Injectable()
export class UserResService {
  protected basePath = 'http://localhost:5000';
  public defaultHeaders = new HttpHeaders();


  constructor(protected httpClient: HttpClient) {

  }

  public getAllUsers(token?:string, reportProgress?: boolean): Observable<User[]>;
  public getAllUsers(token?: string, reportProgress: boolean = false): Observable<User[]> {
    const options = {
      headers: {
        'Authorization': `Bearer "${token}"`
      }
    }

    if (token == null) {
      throw new Error("token is nul baiiiiiiiiiiiiii");
    }else{
      console.log("am primit token:" + token);

    }
    console.log(options);
    return this.httpClient.get<User[]>(`${this.basePath}/user/getAllUsers` , options);
  }


  public getMe(token?:string, reportProgress?: boolean): Observable<User>;
  public getMe(token?: string, reportProgress: boolean = false): Observable<User> {
    const options = {
      headers: {
        'Authorization': `Bearer "${token}"`
      }
    }

    if (token == null) {
      throw new Error("token is nul baiiiiiiiiiiiiii");
    }else{
      console.log("am primit token:" + token);

    }
    console.log(options);
    return this.httpClient.get<User>(`${this.basePath}/user/getMe` , options);
  }

  public userDelete(token:string, username:string,reportProgress?: boolean): Observable<User>;
  public userDelete(token: string, username:string, reportProgress: boolean = false): Observable<User> {
    const options = {
      headers: {
        'Authorization': `Bearer "${token}"`
      }
    }

    if (token == null) {
      throw new Error("token is nul baiiiiiiiiiiiiii");
    }else{
      console.log("am primit token:" + token);

    }
    console.log(options);
    return this.httpClient.delete<Device>(`${this.basePath}/user/delete/`+ username, options);
  }

  public editUsers(token?:string, newuser?:User, reportProgress?: boolean): Observable<User>;
  public editUsers(token?: string,newuser?:User, reportProgress: boolean = false): Observable<User> {
    const options = {
      headers: {
        'Authorization': `Bearer "${token}"`
      }
    }

    if (token == null) {
      throw new Error("token is nul baiiiiiiiiiiiiii");
    }else{
      console.log("am primit token:" + token);

    }
    console.log(options);
    return this.httpClient.patch<User>(`${this.basePath}/user/edit` ,newuser ,options);
  }

}
