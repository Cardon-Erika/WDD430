import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Contact } from "../contacts/contact.model";
import { ContactService } from "../contacts/contact.service";

@Injectable({providedIn: 'root'})
// export class MessagesResolverService implements Resolve<Contact[]>{
export class MessagesResolverService{
    constructor(private contactService: ContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.contactService.getContacts();

    }
}