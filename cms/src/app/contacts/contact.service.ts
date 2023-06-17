import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>()

  contacts: Contact[] = [];
  maxContactId: number;
  
  constructor(private http: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http
      .get<Contact[]>('https://cms-app-e215a-default-rtdb.firebaseio.com/contacts.json')
      .pipe(
        map((responseData) => {
          const contacts: Contact[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              contacts.push({...responseData[key], id: key});
            }
          }
          return contacts;
        })
      )
      .subscribe(
        ((contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name > b.name ? 1 : -1);
          this.contactListChangedEvent.next(this.contacts.slice());
        }),
        ((error: any) => {
          console.log(error);
        })
      )
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if(contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    // this.contactChangedEvent.emit(this.contacts.slice());
    // this.contactListChangedEvent.next(this.contacts.slice());
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == null || !newContact) {
      return
    }

    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || originalContact == null || !newContact || newContact == null) {
      return
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'content-type': 'application/json'});

    this.http
      .put('https://cms-app-e215a-default-rtdb.firebaseio.com/contacts.json', contacts, {'headers': headers})
      .subscribe(response => {
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      })
  }
}
