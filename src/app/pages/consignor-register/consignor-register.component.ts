import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consignor-register',
  templateUrl: './consignor-register.component.html',
  styleUrls: ['./consignor-register.component.scss']
})
export class ConsignorRegisterComponent implements OnInit {

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

  registerConsignor(): void{
    console.log(this.signInForm.value);
  }


}
