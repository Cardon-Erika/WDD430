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

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // this.route.data.subscribe();


    this.contactService.getContact(this.message.sender.id)
      .subscribe(
        contactData => {
          this.messageSender = contactData.contact.name;
          console.log(this.messageSender);
        }
      ); // comment back in - commented out for testing... 6/30
  }

}
