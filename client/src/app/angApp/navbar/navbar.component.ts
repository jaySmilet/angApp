import { Component, OnInit } from '@angular/core';
import { AngAppAuthService } from '../services/ang-app-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private angAppAuthService:AngAppAuthService) { }

  ngOnInit(): void {
  }

}
