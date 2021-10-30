import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trucker-login',
  templateUrl: './trucker-login.component.html',
  styleUrls: ['./trucker-login.component.scss']
})
export class TruckerLoginComponent implements OnInit {
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
      if(user && user.role === 'trucker'){
        this.router.navigate(['/cabinet']);
      }
    });
  }

 


  loginTrucker(): void {
    const { email, password } = this.loginForm.value;
    this.login(email,password).then(data => {

    })
  }
}
