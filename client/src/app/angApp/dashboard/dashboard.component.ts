import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { AngAppAuthService } from '../services/ang-app-auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  username="";
  constructor(private angAppAuthService: AngAppAuthService, 
    private router: Router,public toast:ToastComponent) { }

  
  ngOnInit(): void {
    this.angAppAuthService.getUserData().subscribe(
      res=>{
        this.username=res.username;
        this.toast.setMessage(`Welcome to user dashboard.  Mr./Mrs. ${this.username}!`, 'success');
      },
      err=>console.log(err)
    )
  }

}
