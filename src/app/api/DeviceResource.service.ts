import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from "app/models/user";
import {UserTok} from "../models/userTok";
import { Device } from "app/models/device";

@Injectable()
export class DeviceResourceService {
  protected basePath = 'http://localhost:5000';
  public defaultHeaders = new HttpHeaders();


  constructor(protected httpClient: HttpClient) {

  }


  public getDevices(token?:string, reportProgress?: boolean): Observable<Device[]>;
  public getDevices(token?: string, reportProgress: boolean = false): Observable<Device[]> {
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
    return this.httpClient.get<Device[]>(`${this.basePath}/device/getByUsername` , options);
  }

  public getAllDevices(token?:string, reportProgress?: boolean): Observable<Device[]>;
  public getAllDevices(token?: string, reportProgress: boolean = false): Observable<Device[]> {
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
    return this.httpClient.get<Device[]>(`${this.basePath}/device/getAll` , options);
  }
  public deviceDelete(token:string, id:string,reportProgress?: boolean): Observable<Device>;
  public deviceDelete(token: string, id:string, reportProgress: boolean = false): Observable<Device> {
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
    return this.httpClient.delete<Device>(`${this.basePath}/device/delete/`+ id, options);
  }
}
