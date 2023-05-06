import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message('1', 'Birthday', 'Hey, are you going to make it to my party?', 'Bob'),
    new Message('2', 'Church', 'What time does our meeting start tomorrow?', 'Jada'),
    new Message('3', 'Church', 'Meetings start at 8.', 'Cari'),
  ]

  constructor() {}

  ngOnInit(): void {
    
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
