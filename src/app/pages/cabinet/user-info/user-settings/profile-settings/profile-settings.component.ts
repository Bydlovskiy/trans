import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileSettingsService } from 'src/app/shared/services/settings/profile-settings/profile-settings.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public profileSettingsForm!: FormGroup;
  public imagePathCurentUser : string = '';
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private fb: FormBuilder,
    private profileService: ProfileSettingsService,
    private storage: Storage, 
    private toastr : ToastrService) {

  }
  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  initForm(): void {
    this.profileSettingsForm = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      sex: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  saveData(): void {
    if (this.profileSettingsForm.valid){
      this.profileService.setUserData(this.profileSettingsForm.value, this.currentUserid).then(() => {
        this.toastr.success('Дані успішно змінені')
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      })
    } else {
      this.toastr.error('Заповніть правильно форму')
    }
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.uploadFile('images', file.name, file).then(data => {
      this.profileSettingsForm.patchValue({
        imagePath: data
      });
      this.imagePathCurentUser = data;
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

  private getData () {
    this.profileService.getCompanyData(this.currentUserid).then(data => {
      let profileData !: any;
      data.forEach(data => {
        profileData = data.data().user
      })
      this.imagePathCurentUser = profileData.imagePath
      this.profileSettingsForm.patchValue(profileData)
    })
  }

}
