import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document('1', 'Web Fundamentals - WDD 130', 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.', 'fakeurl.com/wdd130', null),
    new Document('2', 'Web FrontEnd Development I - WDD 230', 'This course focuses on the planning and development of responsive web sites using HTML, CSS, and JavaScript with attention to usability principles.', 'fakeurl.com/wdd230', null),
    new Document('3', 'Web FrontEnd Development II - WDD 330', 'WDD 330 will continue with the topics presented in WDD 230 Web Front-end Development I: Building websites with HTML, CSS, and Javascript. This course will have a stronger emphasis on Javascript development and mobile design as students create mobile web applications.', 'fakeurl.com/wdd330', null),
    new Document('4', 'Advanced CSS - WDD 331R', 'This course provides deeper learning into topics in cascading style sheets (CSS). Topics of study will include: complex CSS selectors, advanced CSS layout and positioning techniques, CSS transitions and animations, CSS Preprocessing, an introduction to CSS libraries, and using scalable vector graphics (SVG) with HTML and CSS.', 'fakeurl.com/wdd331r', null),
    new Document('5', 'Web Full-Stack Development - WDD 430', 'This course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.', 'fakeurl.com/wdd430', null),
  ]

  constructor() {}

  ngOnInit(): void {
    
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
