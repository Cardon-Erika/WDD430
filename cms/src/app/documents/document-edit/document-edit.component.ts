import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: number;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.subscription = this.documentService.
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        if (this.id == null || !this.id) {
          this.editMode = false;
          console.log('Edit False');
          return;
          // return this.editMode;
        }

        // commented out until I can figure out what is happening with the id
        this.documentService.getDocument(this.id.toString())
          .subscribe(documentData => {
            this.originalDocument = documentData.document;
            console.log(this.originalDocument);
            
            if (this.originalDocument == null || !this.originalDocument) {
              return
            }
            
            console.log('Edit True');
            this.editMode = true;
            this.document = JSON.parse(JSON.stringify(this.originalDocument));
          });

      })
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newDocument = new Document('', value.name, value.description, value.url, null);
    console.log(newDocument);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
      console.log('Edit True Documents');
    } else {
      this.documentService.addDocument(newDocument);
      console.log('Edit False Documents');
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
