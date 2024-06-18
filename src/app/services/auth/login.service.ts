import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { Observable, catchError, throwError, BehaviorSubject, tap, map} from 'rxjs'; 
import { environment } from '../../../environments/environment';
import { Session } from 'node:inspector';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserIsAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  

  constructor(private http: HttpClient) {
    
    this.currentUserLoginOn.next(sessionStorage.getItem("token") !== null);
    this.currentUserData.next(sessionStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest):Observable<any> {
    return this.http.post<any>(environment.urlHost+"/login", credentials).pipe(
      
      tap((userData) => {

        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.isAdmin().subscribe();
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  isAdmin():Observable<boolean> {
    return this.http.get<boolean>(environment.urlApi+"/userAuthorities", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.currentUserData.value}`
      })
    }).pipe(
      tap((isAdmin) => this.currentUserIsAdmin.next(isAdmin)),
    catchError(this.handleError)
  );
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.currentUserIsAdmin.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error("An error has occurred: ", error.error)
    }
    else{
      console.error("The backend returned status code: ", error.status, error.error)
    }
    return throwError(() => new Error("Wrong credentials"))
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

  get isUserAdmin(): Observable<boolean> {
    return this.currentUserIsAdmin.asObservable();
  }

}
