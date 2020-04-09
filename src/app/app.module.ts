import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";
// import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ChatFormComponent } from "./chat-form/chat-form.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { FeedComponent } from "./feed/feed.component";
import { MessageComponent } from "./message/message.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserItemComponent } from "./user-item/user-item.component";
import { AuthService } from "./services/auth.service";
import { ChatService } from "./services/chat.service";

import { environment } from '../environments/environment';

// import { FirstComponentComponent } from './first-component/first-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,AngularFireAuthModule,AngularFireDatabaseModule,AngularFireModule.initializeApp(environment.firebase)],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
