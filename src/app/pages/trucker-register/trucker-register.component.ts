import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProfileSettingsService } from 'src/app/shared/services/settings/profile-settings/profile-settings.service';

@Component({
  selector: 'app-trucker-register',
  templateUrl: './trucker-register.component.html',
  styleUrls: ['./trucker-register.component.scss']
})
export class TruckerRegisterComponent implements OnInit {
  public registerForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initSignForm();
  }
  initSignForm(): void {
    this.registerForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      role: ['trucker']
    })
  }


  public registerTrucker(): void {
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
      this.toastr.success('Ви успішно зареєструвались як перевізник')
      this.registerForm.reset();
      this.router.navigate(['/consignor-login']);
      this.authService.setUserData(data.user.uid, user)
    }).catch(err => {
      this.toastr.error('Неправильно введені дані')
    })
  }


}
