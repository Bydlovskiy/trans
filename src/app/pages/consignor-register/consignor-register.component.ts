import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consignor-register',
  templateUrl: './consignor-register.component.html',
  styleUrls: ['./consignor-register.component.scss']
})
export class ConsignorRegisterComponent implements OnInit {
  public registerForm !: FormGroup;
  constructor(private fb : FormBuilder,
              private auth : Auth,
              private firestore: Firestore,
              private router : Router) { }

  ngOnInit(): void {
    this.initSignForm();
  }
  initSignForm():void{
    this.registerForm = this.fb.group({
      email : [null,Validators.required],
      password : [null,Validators.required],
      phoneNumber : [null,Validators.required],
      role : ['consignor']
    })
  }

  registerConsignor(): void{
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
     this.emailSignUp(email, password).then(() => {
    }).catch(err => {
      console.log(err);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then(data => {
      const user = {
        phoneNumber : this.registerForm.controls['phoneNumber'].value,
        email : this.registerForm.controls['email'].value,
        role : this.registerForm.controls['role'].value,
        id : data.user.uid,
        user : {},
        company : {},
      }
      this.registerForm.reset();
      this.router.navigate(['/consignor-login'])
      setDoc(doc(this.firestore, "users", data.user.uid), user)
    }).catch(err => {
      console.log(err,'register error');
    })
  }
}
