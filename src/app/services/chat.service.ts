import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
} from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as firebase from "firebase/app";

import { ChatMessage } from "../models/chat-message.model";
import { User, UserDb } from '../models/user.model';

@Injectable({
  providedIn: "root",
})
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(auth => {
          if (auth !== undefined && auth !== null) {
            this.user = auth;
          }

          this.getUser().subscribe(user => {
            this.userName = user.displayName;
          });
        });
    }

    getUser() {
      const userId = this.user.uid;
      const path = `/users/${userId}`;
      return this.db.object<UserDb>(path).valueChanges();
    }
  
    getUsers() {
      const path = '/users';
      return this.db.list(path).valueChanges();
    }
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    // const email = "demo@example";
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      // userName: "demo user name",
      email: email,
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }

  getMessages(): AngularFireList<ChatMessage> {
    return  this.db.list<ChatMessage>('messages',(ref)=>ref.limitToLast(25).orderByKey());
    // query to create our message feed binding
    // return this.db.list('messages', {
      
    //   query: {
    //     limitToLast: 25,
    //     orderByKey: true
    //   }
    // });
  }

}
