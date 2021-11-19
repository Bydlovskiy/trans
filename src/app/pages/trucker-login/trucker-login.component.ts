import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-trucker-login',
  templateUrl: './trucker-login.component.html',
  styleUrls: ['./trucker-login.component.scss']
})
export class TruckerLoginComponent implements OnInit {
  public loginForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private authService : AuthService,
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


  loginTrucker(): void {
    if (!this.loginForm.valid) {
      this.toastr.error('Заповніть форму')

    } else {
      const { email, password } = this.loginForm.value;
      this.login(email, password)
    }
  }

  login(email: string, password: string) {
    this.authService.logIn(email,password).then(credential => {
      this.authService.getUserData(credential.user.uid).then(user => {
        const currentUser : any = user.data();
        if (user && currentUser.role  === 'trucker') {
          const userLocal = {
            id: user.id,
            role: currentUser.role
          }
          localStorage.setItem('user', JSON.stringify(userLocal));
          this.toastr.success('Вхід виконано')
          this.router.navigate(['/cabinet']);
        } else if (user && currentUser.role === 'consignor') {
          this.toastr.error('Увійдіть як товаровідправник')
        } 
      }); 
    }).catch(() => {
      this.toastr.error('Неправильний email чи пароль')
    })
  } 
}
