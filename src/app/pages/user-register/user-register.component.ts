import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit ,OnDestroy {
  private role: string = JSON.parse(localStorage.getItem('register-role') as string)
  public submited = false;
  public registerForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.role);
    this.initSignForm();
    this.checkChoosingRole();
  }

  checkChoosingRole ()  {
    if(localStorage.getItem('register-role') == null){
      this.router.navigate(['/register'])
    } else {

    }
  }

  private initSignForm(): void {
    this.registerForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^\d{10,12}$/)]],
      role: [this.role]
    })
  }

  public register(): void {
    console.log(this.validation.email.errors)
    this.submited = true;
    if (!this.registerForm.valid) {
      this.toastr.error('Введіть правильно дані');
    } else {
      const email = this.registerForm.controls['email'].value;
      const password = this.registerForm.controls['password'].value;
      this.emailSignUp(email, password)
    }
  }

  private emailSignUp(email: string, password: string): void {
    this.authService.register(email, password).then(data => {
      const user = {
        phoneNumber: this.registerForm.controls['phoneNumber'].value,
        email: this.registerForm.controls['email'].value,
        role: this.registerForm.controls['role'].value,
        id: data.user.uid,
        user: {},
        company: {},
      };
      let role !: string;
      if (this.role == 'trucker') {
        role = 'перевізник'
      } else if (this.role = 'consignor') {
        role = 'товаровідправник'
      }
      this.toastr.success(`Ви успішно зареєструвались як ${role}`)
      this.registerForm.reset();
      localStorage.setItem('login-role', JSON.stringify(this.role))
      this.router.navigate(['/user-login']);
      this.authService.setUserData(data.user.uid, user)
    }).catch(err => {
      this.toastr.error('Неправильно введені дані')
    })
  }
  get validation(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('register-role')
  }
}
