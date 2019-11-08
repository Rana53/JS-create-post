import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]})
  });
  onSubmit(){
    if(!this.form.valid){
      this.form.reset()
      return;
    }
    this.isLoading = true;
    this.authService.userLogin(this.form.value.username, this.form.value.password);
    this.form.reset();
  }
  
 }