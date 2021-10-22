import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trucker-login',
  templateUrl: './trucker-login.component.html',
  styleUrls: ['./trucker-login.component.scss']
})
export class TruckerLoginComponent implements OnInit {
  public loginForm !: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm()
  }
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
  login(): void {

  }
}
