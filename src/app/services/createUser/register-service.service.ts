import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { createUserRequest } from '../../pages/create-user/create-userRequest';
import { Observable, catchError, throwError } from 'rxjs'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(request: createUserRequest): Observable<createUserRequest> {
    return this.http.post<createUserRequest>(environment.urlApi + "/createUser", request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('Backend returned code', error.status, 'body was:', error.error);
    }
    return throwError(() => new Error('This user already exists'));
  }
}
