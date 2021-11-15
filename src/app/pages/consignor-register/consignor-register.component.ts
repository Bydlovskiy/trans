import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consignor-register',
  templateUrl: './consignor-register.component.html',
  styleUrls: ['./consignor-register.component.scss']
})
export class ConsignorRegisterComponent implements OnInit {
  public registerForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initSignForm();
  }
  initSignForm(): void {
    this.registerForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      role: ['consignor']
    })
  }

  registerConsignor(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.controls['email'].value;
      const password = this.registerForm.controls['password'].value;
      this.emailSignUp(email, password).then(() => {
        this.toastr.success('Реєстрація Успішна')
      }).catch(err => {
      })
    } else {
      this.toastr.error('Введіть правильно дані');
    }
   
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(data => {
        const user = {
          phoneNumber: this.registerForm.controls['phoneNumber'].value,
          email: this.registerForm.controls['email'].value,
          role: this.registerForm.controls['role'].value,
          id: data.user.uid,
          user: {},
          company: {},
        }
        this.registerForm.reset();
        this.router.navigate(['/consignor-login'])
        setDoc(doc(this.firestore, "users", data.user.uid), user)
      }).catch(err => {
        console.log(err, 'register error');
      })
  }
}
