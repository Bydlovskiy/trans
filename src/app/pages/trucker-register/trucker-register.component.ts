import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trucker-register',
  templateUrl: './trucker-register.component.html',
  styleUrls: ['./trucker-register.component.scss']
})
export class TruckerRegisterComponent implements OnInit {
  public signInForm !: FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.initSignForm();
  }
  initSignForm():void{
    this.signInForm = this.fb.group({
      name : [null,Validators.required],
      country : [null,Validators.required],
      city : [null,Validators.required],
      street : [null,Validators.required],
      сompanyСode : [null,Validators.required],
      phoneNumber : [null,Validators.required],
      email : [null,Validators.required],
      password : [null,Validators.required],
    })
  }

  registerTrucker(): void{
    console.log(this.signInForm.value);
  }

}
