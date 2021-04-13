import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngAppAuthService } from '../services/ang-app-auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myReactiveForm: FormGroup;
  constructor(private angAppService:AngAppAuthService,
    private router:Router,public toast:ToastComponent) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    })
  }

  submitSignUpForm() {
    // console.log(this.myReactiveForm.value)
    this.angAppService.signUpUser(this.myReactiveForm.value).subscribe(
      res=>{
        this.toast.setMessage('You have been successfully registered! Redirecting to login page in 3s...', 'success');
        setTimeout(()=>{
          this.router.navigate(["angApp/signin"]);
        },3000);
      },
      error => this.toast.setMessage('username already exists', 'danger')
    )
  }
  resetForm(){  
    this.myReactiveForm.reset();
    this.toast.setMessage('All entries has been reset.', 'info');
  }
}
