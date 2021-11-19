import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor( private router : Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(){
    if(localStorage.getItem('user')!== null){
      this.router.navigate(['/cabinet'])
    }
  }

  chooseRole(role : string): void {
    localStorage.setItem("login-role", JSON.stringify(role))
  }

}
