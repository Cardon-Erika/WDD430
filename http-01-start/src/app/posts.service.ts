import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe, Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content}
        this.http.post<{ name: string }>(
            'https://ng-complete-guide-4dccf-default-rtdb.firebaseio.com/posts.json', 
            postData,
            {
                observe: 'response'
            }
            ).subscribe(responseData => {
              console.log(responseData);
          }, error => {
            this.error.next(error.message);
          });
    }

    fetchPosts() {
        let searchParams = new HttpParams(); // multiple params
        searchParams = searchParams.append('print', 'pretty'); // multiple params
        searchParams = searchParams.append('custom', 'key'); // multiple params

       return this.http
       .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-4dccf-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({'Custom-Header': 'Hello'}),
            // params: new HttpParams().set('print', 'pretty') //single params
            params: searchParams, // multiple params
        }
        )
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
      )
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-4dccf-default-rtdb.firebaseio.com/posts.json',
        {
            observe: 'events',
            responseType: 'text'
        }
        ).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Sent) {
                // ...
            }
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}