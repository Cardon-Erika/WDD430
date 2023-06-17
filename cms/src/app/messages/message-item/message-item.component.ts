import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe();
    const contact: Contact = this.contactService.getContact(this.message.sender.toString());
    // console.log(this.message.sender);
    this.messageSender = contact.name;
  }

}
