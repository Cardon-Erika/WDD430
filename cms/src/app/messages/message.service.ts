import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // messageChangedEvent = new EventEmitter<Message[]>();
  messageChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];
  // maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    // this.maxMessageId = this.getMaxId();
   }


  getMessages() {
    this.http
      .get<{message: string, messages: Message[]}>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.messageChangedEvent.next(this.messages.slice());
          console.log(responseData);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  //  not using
  // getMessage(id: string){
  //   return this.http.get<{ message: string, OneMessage: Message}>('http://localhost:3000/messages/' + id);
  // }

  addMessage(newMessage: Message) {
    if (newMessage == null || !newMessage) {
      return
    }

    newMessage.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    this.http.post<{ message: string, OneMessage: Message }>('http://localhost:3000/messages', 
      newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          console.log("New message info: " + responseData.OneMessage);
          this.messages.push(responseData.OneMessage);
          // following line in the sortAndSend method for documents and contacts
          this.messageChangedEvent.next(this.messages.slice());
        }
      )
  }

  // getMaxId(): number {
  //   let maxId = 0;
  //   for (let message of this.messages) {
  //     const currentId = +message.id;
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //   return maxId;
  // }

  // storeMessages() {
  //   const messages = JSON.stringify(this.messages);
  //   const headers = new HttpHeaders({'content-type': 'application/json'});

  //   this.http
  //     .put('https://cms-app-e215a-default-rtdb.firebaseio.com/messages.json', messages, {'headers': headers})
  //     .subscribe(response => {
  //       const messagesListClone = this.messages.slice();
  //       this.messageChangedEvent.next(messagesListClone);
  //     })
  // }

}
