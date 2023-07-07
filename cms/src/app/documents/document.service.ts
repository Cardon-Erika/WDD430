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

  sortAndSend() {
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    this.http
      .get<{ message: string, documents: Document[]}>('http://localhost:3000/documents')
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
        );
    }

  getDocument(id: string) {
    // for (let document of this.documents) {
    //   if(document.id == id) {
    //     return document;
    //   }
    // }
    // return null;
    console.log("Getting single document " + id);
    return this.http.get<{ message: string, document: Document }>('http://localhost:3000/documents/' + id);
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    
    if(pos < 0) {
      return;
    }

    // delete from db
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  addDocument(document: Document) {
    if (document == null || !document) {
      return
    }

    document.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json"});

    // add to db
    this.http.post<{ message: string, document: Document}>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    console.log("Update Document");
    if (!originalDocument || originalDocument == null || !newDocument || newDocument == null) {
      return
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    // update db
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
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
