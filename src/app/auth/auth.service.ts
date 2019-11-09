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
        this.token = token;
        // console.log(expriesInDuration);
        if(token){
          const expriesInDuration = response.expiresIn;
          this.setAuthTimer(expriesInDuration); 
          this.userIsAuthenticated = true;
          this.authStatus.next(true);
          const now = new Date();
          const expirationTime = new Date(now.getTime() + expriesInDuration * 1000);
          // console.log(expirationTime);
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
  private setAuthTimer(duration: number){
   // console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.userIsAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); 
      this.authStatus.next(true);
    }
  }
  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration",expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");   
    localStorage.removeItem("expiration")
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}