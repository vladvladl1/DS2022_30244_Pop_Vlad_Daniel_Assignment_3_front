import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from "app/models/user";
import {UserTok} from "../models/userTok";




@Injectable()
export class UsersResourceService {
  protected basePath = 'http://localhost:5000';
  public defaultHeaders = new HttpHeaders();


  constructor(protected httpClient: HttpClient) {

  }

  public loginUser(credentials?: User, observe?: 'body', reportProgress?: boolean): Observable<UserTok>;
  public loginUser(credentials?: User, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (credentials == null) {
      throw new Error("Required parameter JsonUserDTO was null or undefined when calling addUser");
    }
    return this.httpClient.post<UserTok>(`${this.basePath}/auth/login`, credentials);
  }

  public signUser(credentials?: User, observe?: 'body', reportProgress?: boolean): Observable<UserTok>;
  public signUser(credentials?: User, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (credentials == null) {
      throw new Error("Required parameter JsonUserDTO was null or undefined when calling addUser");
    }
    return this.httpClient.post<UserTok>(`${this.basePath}/auth/register`, credentials);
  }

  public logoutUser(token?:string, reportProgress?: boolean): Observable<User>;
  public logoutUser(token?: string, reportProgress: boolean = false): Observable<User> {


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
    return this.httpClient.post<User>(`${this.basePath}/auth/logout`,{} , options);
  }



}
