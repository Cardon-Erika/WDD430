import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute, private windRefService: WindRefService) {
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // console.log(params);
          this.id = params['id'];
          this.documentService.getDocument(this.id)
          .subscribe(documentData => {
            this.document = documentData.document;
          });
        }
      );
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

}
