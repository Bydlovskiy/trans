import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-consignor-login',
  templateUrl: './consignor-login.component.html',
  styleUrls: ['./consignor-login.component.scss']
})
export class ConsignorLoginComponent implements OnInit {
  public loginForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private toastr: ToastrService
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

  loginConsignor(): void {
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
        if (user && currentUser.role  === 'consignor') {
          const userLocal = {
            id: user.id,
            role: currentUser.role
          }
          localStorage.setItem('user', JSON.stringify(userLocal));
          this.toastr.success('Вхід виконано')
          this.router.navigate(['/cabinet']);
        } else if (user && currentUser.role === 'trucker') {
          this.toastr.error('Увійдіть як перевізник')
        } 
      });
      
    }).catch(() => {
      this.toastr.error('Неправильний email чи пароль')
    })
  }

}
