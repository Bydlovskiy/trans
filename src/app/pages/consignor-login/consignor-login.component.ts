import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consignor-login',
  templateUrl: './consignor-login.component.html',
  styleUrls: ['./consignor-login.component.scss']
})
export class ConsignorLoginComponent implements OnInit {
  public loginForm !: FormGroup;
  public loginSubscription!: Subscription;
  constructor(private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
  
              ) { }

  ngOnInit(): void {
    this.initLoginForm()
  }
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      if(user && user.role === 'consignor'){
        this.router.navigate(['/cabinet']);
      }
    });
  }

  loginConsignor(): void {
    const { email, password } = this.loginForm.value;
    this.login(email,password).then(data => {
      console.log(data);
    })
  }
}
