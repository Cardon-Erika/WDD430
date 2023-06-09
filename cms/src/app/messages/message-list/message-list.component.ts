import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    // this.messages = this.messageService.getMessages();
    // this.messageService.messageChangedEvent
    //   .subscribe(
    //     (messages: Message[]) => {
    //       this.messages = messages;
    //     }
    //   )
    this.subscription = this.messageService.messageChangedEvent
      .subscribe(
        (messageList: Message[]) => {
          console.log("Message List: " + messageList);
          console.log("Fetching from MessageList");
          this.messages = messageList;
        }
      );
      this.messageService.getMessages();
      console.log('Getting Messages from MessageList');
  }

  // onAddMessage(message: Message){
  //   this.messages.push(message);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
