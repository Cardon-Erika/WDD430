import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  // pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    const resultArray: Contact[] = [];

    for (const contact of contacts) {
      // console.log(contact.name);
      // console.log(term);
      if (term && term.length > 0) {
        if (contact.name.toLowerCase().includes(term.toLowerCase())) {
          resultArray.push(contact);
        }
      }
    }

    // if (term && term.length > 0) {
    //   resultArray = contacts.filter(
    //     (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
    //   )
    // }

    if (resultArray.length === 0) {
      return contacts;
    }

    return resultArray;
  }

}
