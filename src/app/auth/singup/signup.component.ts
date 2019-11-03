import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']

})
export class SignupComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value.username + ' password ' + this.form.value.password);
    }
  }
 }