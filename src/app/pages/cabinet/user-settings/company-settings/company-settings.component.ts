import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanySettingsService } from 'src/app/shared/services/settings/company-settings/company-settings.service';


@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
  public companySettingsForm !:FormGroup;
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private fb : FormBuilder,
              private companyService : CompanySettingsService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() : void {
    this.companySettingsForm = this.fb.group({
      name : [null,Validators.required],
      activity : [null,Validators.required],
      country : [null,Validators.required],
      city : [null,Validators.required],
      street : [null,Validators.required],
      IPN : [null,Validators.required],
      EDRPOY : [null,Validators.required]
    })
  }
  saveData():void {
    if(this.companySettingsForm.valid){
      
      this.companyService.setcompanyData(this.companySettingsForm.value,this.currentUserId).then(() => {
        this.companySettingsForm.reset();
      }) 
    } else {
      console.log('false');
    } 
  }
}
