import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileSettingsService } from 'src/app/shared/services/settings/profile-settings/profile-settings.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public profileSettingsForm!: FormGroup;
  public submitted = false;
  public pageReady = false;
  public imagePathCurrentUser: string = '';
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;
  public imagePath !: string;

  constructor(private fb: FormBuilder,
    private profileService: ProfileSettingsService,
    private storage: Storage,
    private toastr: ToastrService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  private getData() {
    this.profileService.getCompanyData(this.currentUserid).then(data => {
      let profileData = data.data()?.user;
      this.profileSettingsForm.patchValue(profileData);
      this.imagePathCurrentUser = this.profileSettingsForm.controls['imagePath'].value;
    }).then(() => {
      this.pageReady = true;
    })
  }

  private initForm(): void {
    this.profileSettingsForm = this.fb.group({
      name: [null, [Validators.required,Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ]{2,}$/)]],
      surname: [null, [Validators.required,Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ]{2,}$/) ]],
      dateOfBirth: [null, Validators.required],
      sex: [null, Validators.required],
      imagePath: [null]
    })
  }

  public saveData(): void {
    this.submitted = true;
    if (this.profileSettingsForm.valid) {
      this.profileService.setUserData(this.profileSettingsForm.value, this.currentUserid).then(() => {
        this.toastr.success('Дані успішно змінені');
        this.router.navigate(['/cabinet/info'])
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      })
    } else {
      this.toastr.error('Заповніть правильно форму')
    }
  }

  public uploadImage(event: any) {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file).then(data => {
      this.profileSettingsForm.patchValue({
        imagePath: data
      });
      this.imagePathCurrentUser = data;
    })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<any> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytes(storageRef, file);
          await task;
          return await getDownloadURL(storageRef);
        } catch (err: any) {
          return err.message
        }
      }
    }
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.profileSettingsForm.controls;
  }
}
