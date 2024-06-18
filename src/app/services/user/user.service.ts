import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  getUsers(sort?: string): Observable<User[]> {
    let params = new HttpParams();
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<User[]>(environment.urlApi+"/getUsers", { params });
  }

  getUserById(id: number):Observable<User>{
    return this.http.get<User>(environment.urlApi+"/getById?id="+id).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error("An error has occurred: ", error.error)
    }
    else{
      console.error("The backend returned status code: ", error.status, error.error)
    }
    return throwError(() => new Error("Something went wrong, please try again."))
  }

}
