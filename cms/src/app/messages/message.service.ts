import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // messageChangedEvent = new EventEmitter<Message[]>();
  messageChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
   }

  getMessages(): Message[] {
    this.http
      .get<Message[]>('https://cms-app-e215a-default-rtdb.firebaseio.com/messages.json')
      .pipe(
        map((responseData) => {
          const messages: Message[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              messages.push({...responseData[key], id: key});
            }
          }
          return messages;
        })
      )
      .subscribe(
        ((messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          // this.messages.sort((a, b) => a.id > b.id ? 1 : -1);
          this.messageChangedEvent.next(this.messages.slice());
        }),
        ((error: any) => {
          console.log(error);
        })
      )
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if(message.id == id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (newMessage == null || !newMessage) {
      return
    }

    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'content-type': 'application/json'});

    this.http
      .put('https://cms-app-e215a-default-rtdb.firebaseio.com/messages.json', messages, {'headers': headers})
      .subscribe(response => {
        const messagesListClone = this.messages.slice();
        this.messageChangedEvent.next(messagesListClone);
      })
  }
}
