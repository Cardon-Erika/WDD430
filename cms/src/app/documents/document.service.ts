import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
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

  constructor(private http: HttpClient) { 
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>('https://cms-app-e215a-default-rtdb.firebaseio.com/documents.json')
      .pipe(
        map((responseData) => {
          const documents: Document[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              documents.push({ ...responseData[key], id: key });
            }
          }
          return documents;
        })
      )
      .subscribe(
        ((documents: Document[]) => {
          console.log('Success');
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          // sort the list of documents
          this.documents.sort((a, b) => a.name > b.name ? 1 : -1);
          // emit the next document list change event
          this.documentListChangedEvent.next(this.documents.slice());
        }),
        ((error: any) => {
          console.log(error);
        })
        )
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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone)
    this.storeDocuments();
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents);
    // console.log('Store Document');
    // console.log(this.documents);
    let headers = new HttpHeaders({'content-type': 'application/json'})
    // headers.set('content-type', 'application/json');
    // const headers = {'content-type': 'application/json'};
    
    this.http
      .put('https://cms-app-e215a-default-rtdb.firebaseio.com/documents.json', documents, {'headers': headers})
      .subscribe(response => {
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      })
  }

}
