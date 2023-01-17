import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {UsersComponent} from "./users.component";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";
import {UsersResourceService} from "./api/userResource.service";
import {DeviceResourceService} from "./api/DeviceResource.service";
import {HttpClientModule} from "@angular/common/http";
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { DialogComponent } from './dialog/dialog.component';
import {UserResService} from "./api/UserRes.service";
import { ChatComponent } from './chat/chat.component';
import { ChatAdminComponent } from './chat-admin/chat-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UserPageComponent,
    AdminPageComponent,
    DialogComponent,
    ChatComponent,
    ChatAdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'admin',
        component: AdminPageComponent
      },
      {
        path: 'user',
        component: UserPageComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'adminchat',
        component: ChatAdminComponent
      }
    ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UsersResourceService,
    DeviceResourceService,
    UserResService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
