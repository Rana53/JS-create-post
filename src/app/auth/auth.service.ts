import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService{
  constructor(private http: HttpClient) { }
  private token: string = 'no token';
  private authStatus = new Subject<boolean>();
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
  userLogin(username: string, password: string){
    const authData: AuthData = {
      email: username, 
      password: password
    }
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatus.next(true);
      });
  } 
}