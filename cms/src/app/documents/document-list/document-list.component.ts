import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  documents: Document[] = []
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();

    // this.documentService.documentChangedEvent
    //   .subscribe(
    //     (documents: Document[]) => {
    //       this.documents = documents;
    //     }
    //   )
    
    this.subscription = this.documentService.documentListChangedEvent
        .subscribe(
          (documentList: Document[]) => {
            console.log(documentList);
            this.documents = documentList;
          }
        );

        this.documentService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
