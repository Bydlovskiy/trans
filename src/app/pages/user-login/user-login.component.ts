import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit , OnDestroy {
  private role : string = JSON.parse(localStorage.getItem('login-role') as string)
  public loginForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkChoosingRole();
    this.initLoginForm()
  }
  
  checkChoosingRole ()  {
    if(localStorage.getItem('login-role') == null){
      this.router.navigate(['/login'])
    } else {
      
    }
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
        if (user && currentUser.role  ===  this.role) {
          const userLocal = {
            id: user.id,
            role: currentUser.role
          }
          localStorage.setItem('user', JSON.stringify(userLocal));
          this.toastr.success('Вхід виконано')
          this.router.navigate(['/cabinet']);
          localStorage.removeItem('login-role');
          localStorage.removeItem('register-role');
        } else if (user && currentUser.role != this.role ) {
          let role !: string;
          if(this.role == 'trucker'){
            role = 'товаровідправник'
          } else if (this.role = 'consignor'){
            role = 'перевізник'
          }
          this.toastr.error(`Увійдіть як ${role}`)
        } 
      });
    }).catch(() => {
      this.toastr.error('Неправильний email чи пароль')
    })
  }

  ngOnDestroy(): void {
    localStorage.removeItem('login-role')
  }
}
