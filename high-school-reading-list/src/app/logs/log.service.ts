import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from './log.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logSelectedEvent = new EventEmitter<Log>();
  logListChangedEvent = new Subject<Log[]>();

  logs: Log[] = [];

  constructor(private http: HttpClient) { }

  sortAndSend() {
    // add in sorting 
    this.logListChangedEvent.next(this.logs.slice());
  }

  getLogs() {
    this.http
      .get<{ message: string, logs: Log[] }>('http://localhost:3000/logs')
      .subscribe(
        (responseData) => {
          this.logs = responseData.logs;
          console.log(this.logs);
          this.sortAndSend();
        },
        (error:any) => {
          console.log(error);
        }
      );
  }

  getLog(id:string) {
    return this.http.get<{ message: string, log: Log }>('http://localhost:3000/logs/' + id);
  }

  // getLogByUser(userId:string) {
  //   return this.http.get<{ message: string, log: Log }>('http://localhost:3000/logs/users/' + userId);
  // }

  addLog(log: Log) {
    if(log == null || !log){
      console.log("Returned missing log data.");
      return
    }

    log.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json"});

    this.http.post<{ message: string, log: Log }>('http://localhost:3000/logs', log,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.logs.push(responseData.log);
          // console.log("Response Data: " + responseData.log);
          this.sortAndSend();
        }
      )
  }

  updateLog(originalLog: Log, newLog: Log) {
    if(!originalLog || originalLog == null || !newLog || newLog == null) {
      return
    }

    const pos = this.logs.findIndex(l => l.id ==originalLog.id);
    if(pos < 0) {
      return
    }

    newLog.id = originalLog.id;

    const headers = new HttpHeaders({ "Content-Type": "application/json"});

    this.http.put('http://localhost:3000/logs/' + originalLog.id, newLog, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.logs[pos] = newLog;
          this.sortAndSend();
        }
      );
  }

  deleteLog(log: Log) {
    if(!log) {
      return
    }

    const pos = this.logs.findIndex(l => l.id === log.id);
    if(pos < 0) {
      return
    }

    this.http.delete('http://localhost:3000/logs/' + log.id)
      .subscribe(
        (response: Response) => {
          this.logs.splice(pos, 1);
          this.sortAndSend();
        }
      )
  }

  
}
