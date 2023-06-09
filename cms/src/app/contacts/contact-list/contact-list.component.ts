import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  term: string;

  contacts: Contact[] = []
  private subscription: Subscription;

  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();

    // this.contactService.contactChangedEvent
    //   .subscribe(
    //     (contacts: Contact[]) => {
    //       this.contacts = contacts;
    //     }
    //   )

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactList: Contact[]) => {
          console.log(contactList);
          console.log('Fetching from ContactList');
          this.contacts = contactList;
        }
      );
      this.contactService.getContacts();
  }

  search(value: string) {
    // console.log(value);
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
