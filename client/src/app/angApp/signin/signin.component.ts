import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngAppAuthService } from '../services/ang-app-auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myReactiveForm: FormGroup;
  constructor(private angAppAuthService: AngAppAuthService, private router: Router,
    public toast:ToastComponent) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    })
  }

  submitSignInForm() {
    // console.log(this.myReactiveForm.value);
    this.angAppAuthService.signInUser(this.myReactiveForm.value).subscribe(
      res => {
        localStorage.setItem('token',res.token);
          this.router.navigate(["angApp/dashboard"]);
      },
      err => {
        this.toast.setMessage('username or password does not match!', 'danger')
      }
    )
  }

  resetForm(){  
    this.myReactiveForm.reset();
    this.toast.setMessage('All entries has been reset.', 'info');
  }
}
