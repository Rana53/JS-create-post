import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']

})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) { }
  
  form: FormGroup = new FormGroup({
    exmail: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]})
  });
  onSubmit(){
    if(!this.form.valid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.form.value.exmail, this.form.value.password);
    this.form.reset()
  }
 }