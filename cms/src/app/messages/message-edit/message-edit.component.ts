import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';
import { response } from 'express';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: Contact;

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('message') messageInputRef: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();


  constructor(private messageService: MessageService, private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContact('101')
      .subscribe(
        response => {
          this.currentSender = response.contact;
        }
      )
  }

  onSendMessage() {
    const messageSubject = this.subjectInputRef.nativeElement.value;
    const messageContent = this.messageInputRef.nativeElement.value;
    
    const newMessage = new Message('', messageSubject, messageContent, this.currentSender);

    // console.log(newMessage);

    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}
