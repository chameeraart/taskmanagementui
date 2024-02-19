import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { config } from '../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(): Observable<void> {
    return this._refreshNeeded$;
  }

  saveTask(task: any): Observable<any> {
    const headers = this.getHeadersWithToken();
    // Make HTTP POST request with token in headers
    return this.http.post<any>(`${config.apiUrl}/Task/create`, task, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getsaveTaskAll(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${config.apiUrl}/Task/getAll`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getTask(Id: number): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${config.apiUrl}/Task/get/` + Id, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteask(Id: number): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${config.apiUrl}/Task/delete/` + Id, { headers })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        }),
        catchError(this.handleError)
      );
  }

  completetask(Id: number): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${config.apiUrl}/Task/complete/` + Id, { headers })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        }),
        catchError(this.handleError)
      );
  }

  getTaskAll(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${config.apiUrl}/Task/GetAllTask`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private getHeadersWithToken(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No JWT token found');
    }
    // Set JWT token in request headers
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
