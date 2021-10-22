import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consignor-login',
  templateUrl: './consignor-login.component.html',
  styleUrls: ['./consignor-login.component.scss']
})
export class ConsignorLoginComponent implements OnInit {
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
