import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>()

  documents: Document[] = [];
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if(document.id == id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    console.log(pos);
    if(pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    // this.documentChangedEvent.emit(this.documents.slice());
    // this.documentListChangedEvent.next(this.documents.slice());
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null || !newDocument) {
      return
    }

    console.log(newDocument);
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    console.log("Update Document");
    if (!originalDocument || originalDocument == null || !newDocument || newDocument == null) {
      return
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone)
  }

}
