import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService{ 
  private token: string;
  userIsAuthenticated = false;
  private authStatus = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    console.log('Auth data ' + authData);
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }
  getToken(){
    return this.token;
  }
  getAuthStatus(){
    return this.authStatus.asObservable();
  }
  getUserAuthSatatus(){
    return this.userIsAuthenticated;
  }
  userLogin(username: string, password: string){
    const authData: AuthData = {
      email: username, 
      password: password
    }
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        const expriesInDuration = response.expiresIn;
        this.token = token;
        if(this.token){
          this.tokenTimer=setTimeout(() => {
            this.logout()
          }, expriesInDuration * 1000);
          this.userIsAuthenticated = true;
          this.authStatus.next(true);
          const now = new Date();
          const expirationTime = new Date(now.getTime() + expriesInDuration * 1000);
          console.log('Timexx '+ expirationTime);
          this.saveAuthData(token, expirationTime);
          this.router.navigate(['/']);
        }
      });
  } 
  logout(){
    this.token = null;
    this.userIsAuthenticated = false;
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration",expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");   
    localStorage.removeItem("expiration")
  }
}