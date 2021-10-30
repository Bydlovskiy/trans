import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileSettingsService } from 'src/app/shared/services/settings/profile-settings/profile-settings.service';

@Component({
  selector: 'app-trucker-register',
  templateUrl: './trucker-register.component.html',
  styleUrls: ['./trucker-register.component.scss']
})
export class TruckerRegisterComponent implements OnInit {
  public registerForm !: FormGroup;
  constructor(private fb : FormBuilder,
              private auth : Auth,
              private firestore: Firestore,
              private profileService : ProfileSettingsService) { }
        
  ngOnInit(): void {
    this.initSignForm();
  }
  initSignForm():void{
    this.registerForm = this.fb.group({
      email : [null,Validators.required],
      password : [null,Validators.required],
      phoneNumber : [null,Validators.required],
      role : ['trucker']
    })
  }

  registerTrucker(): void{
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
      console.log(data.user.uid)
      const user = {
        phoneNumber : this.registerForm.controls['phoneNumber'].value,
        email : this.registerForm.controls['email'].value,
        role : this.registerForm.controls['role'].value,
        id : data.user.uid,
        user : {},
        company : {},
        cars : {}
      } 
      this.registerForm.reset();
     setDoc(doc(this.firestore, "users", data.user.uid), user)
    }).catch(err => {
      console.log(err,'register error');
    })
  }
 

}
