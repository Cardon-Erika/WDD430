import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = '9';

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('message') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();


  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    
  }

  onSendMessage() {
    const messageSubject = this.subjectInputRef.nativeElement.value;
    const messageContent = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('1', messageSubject, messageContent, this.currentSender);

    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}
