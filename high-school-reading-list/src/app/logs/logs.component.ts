import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LogService } from './log.service';
import { Log } from './log.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  selectedLog: Log;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.logSelectedEvent
      .subscribe((log: Log) => {
        this.selectedLog = log;
      })  
  }

}
