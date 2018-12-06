import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { Tweet } from './tweet';


@Injectable()
export class DashboardService {
  constructor( private http: HttpClient) { }
  private api_url = environment.api_url;

  getTweets(screen_name): Observable<any> {
    const httpOptions = {
      // withCredentials: true,
      headers: new HttpHeaders(
        {
        'content-type': 'application/json',
        'accept': 'application/json',
        'cache-control': 'no-cache'
        })
    };

    const url = `${this.api_url}?count=30&screen_name=${screen_name}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(tweets => this.log(`fetched tweets`)),
        catchError(this.handleError('get', []))
      );
  }
  parseTextToTweet(tweets): void {
    tweets.forEach(tweet => {
      let ele = '';
      // replacing hashtag string from hashtag url
      tweet.entities.hashtags.forEach(tag => {
          if ( tweet.text[tweet.text.indexOf(tag.text) - 1] === '#' ) {
            ele = '<a href="https://twitter.com/hashtag/' + tag.text + '?src=hash">#<b>' + tag.text + '</b></a>';
           tweet.text = tweet.text.replace('#' + tag, ele);
          }
      });
      tweet.entities.user_mentions.forEach(user => {
        if ( tweet.text[tweet.text.indexOf(user.screen_name) - 1] === '@' ) {
          ele = '<a href="https://twitter.com/' + user.text + '">@<b>' + user.screen_name + '</b></a>';
          tweet.text = tweet.text.replace('@' + user.screen_name, ele);
        }
      });
      tweet.entities.urls.forEach(url => {
          ele = '<a href="' + url.url + '"><b>' + url.url + '</b></a>';
          tweet.text = tweet.text.replace(url.url, ele);
      });
    });
    return tweets;
  }
  getState(): string {
    return localStorage.getItem('app.state');
  }
  setState(newState): void {
    return localStorage.setItem('app.state', newState);
  }

  sortBasedOnDate(a, b): number {
    const date1 = new Date(a.created_at).getTime();
    const date2 = new Date(b.created_at).getTime();
    return date1 > date2 ? 1 : ((date1 === date2) ? 0 : -1);
  }
  private log(message: string) {
    console.log('Service: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
