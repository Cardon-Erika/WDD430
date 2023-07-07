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
  // maxContactId: number;
  
  constructor(private http: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }

  sortAndSend() {
    this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    this.http
      .get<{ message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          console.log(responseData);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        });
  }

  getContact(id: string) {
    // for (let contact of this.contacts) {
    //   if(contact.id == id) {
    //     return contact;
    //   }
    // }
    // return null;

    console.log('Getting single contact ' + id);
    return this.http.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts/' + id);
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if(pos < 0) {
      return;
    }

    // this.contacts.splice(pos, 1);
    // // this.contactChangedEvent.emit(this.contacts.slice());
    // // this.contactListChangedEvent.next(this.contacts.slice());
    // // const contactsListClone = this.contacts.slice();
    // // this.contactListChangedEvent.next(contactsListClone);
    // this.storeContacts();
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          // this.sortAndSend();
        }
      );
  }

  // getMaxId(): number {
  //   let maxId = 0;
  //   for (let contact of this.contacts) {
  //     const currentId = +contact.id;
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //   return maxId;
  // }

  addContact(contact: Contact) {
    if (contact == null || !contact) {
      return
    }

  contact.id = "";

  const headers = new HttpHeaders({ "Content-Type": "application/json" });

  this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    contact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || originalContact == null || !newContact || newContact == null) {
      return
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return
    }

    newContact.id = originalContact.id;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, 
      {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          // this.sortAndSend();
        }
      )
  }

  // storeContacts() {
  //   const contacts = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders({'content-type': 'application/json'});

  //   this.http
  //     .put('https://cms-app-e215a-default-rtdb.firebaseio.com/contacts.json', contacts, {'headers': headers})
  //     .subscribe(response => {
  //       const contactsListClone = this.contacts.slice();
  //       this.contactListChangedEvent.next(contactsListClone);
  //     })
  // }
}
