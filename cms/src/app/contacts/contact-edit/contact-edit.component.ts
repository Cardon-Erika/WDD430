import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string
  invalidContact = false; 

  constructor(private conatctService: ContactService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id == null || !this.id) {
          this.editMode = false;
          return;
        }

        this.conatctService.getContact(this.id.toString())
          .subscribe(contactData => {
            this.originalContact = contactData.contact;
            
            if (this.originalContact == null || !this.originalContact) {
              return;
            }
    
            this.editMode = true;
            this.contact = JSON.parse(JSON.stringify(this.originalContact));
    
            if (this.originalContact.group && this.originalContact.group.length > 0) {
              this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
            }
          });
          
      }

    )
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newContact = new Contact('', value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    console.log(form);
    if (this.editMode) {
      this.conatctService.updateContact(this.originalContact, newContact);
    } else {
      this.conatctService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    this.invalidContact = false;
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      this.invalidContact = true;
      return
    }

    this.groupContacts.push(selectedContact);
  }

}
