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

  getTweets(count, screen_name): Observable<any> {
    const httpOptions = {
      // withCredentials: true,
      headers: new HttpHeaders(
        {
        'content-type': 'application/json',
        'accept': 'application/json',
        'cache-control': 'no-cache'
        })
    };

    const url = `${this.api_url}?count=${count}&screen_name=${screen_name}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(tweets => this.log(`fetched tweets`)),
        catchError(this.handleError('get', []))
      );
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
