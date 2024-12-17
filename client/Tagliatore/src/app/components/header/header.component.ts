import { LoginService } from './../../services/loginService/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.loginService.getUser();
  }
}
