import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICompany } from 'src/app/shared/interfaces/company-interface';
import { CompanySettingsService } from 'src/app/shared/services/settings/company-settings/company-settings.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
  public companySettingsForm !: FormGroup;
  public submited = false;
  public pageReady = false;
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private fb: FormBuilder,
    private companyService: CompanySettingsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getData()
  }

  private initForm(): void {
    this.companySettingsForm = this.fb.group({
      name: [null, Validators.required],
      activity: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      IPN: [null, [Validators.required,Validators.pattern(/^\d{10}$/)]],
      EDRPOY: [null, [Validators.pattern(/^\d{8}$/)]]
    })
  }

  public saveData(): void {
    this.submited = true;
    if (this.companySettingsForm.valid) {
      this.companyService.setCompanyData(this.companySettingsForm.value, this.currentUserId).then(() => {
        this.toastr.success('Дані успішно редаговані')
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      })
    } else {
      this.toastr.error('Заповніть правильно  форму')
    }
  }

  private getData() {
    this.companyService.getCompanyData(this.currentUserId).then(data => {
      let copmanyData !: ICompany;
      data.forEach(data => {
        copmanyData = data.data().company
      })
      this.companySettingsForm.patchValue(copmanyData)
    }).then(() => {
      this.pageReady = true;
    })
  }


  get validation(): { [key: string]: AbstractControl } {
    return this.companySettingsForm.controls;
  }

}
