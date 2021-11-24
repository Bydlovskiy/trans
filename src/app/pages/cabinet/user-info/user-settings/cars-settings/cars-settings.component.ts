import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICar } from 'src/app/shared/interfaces/car-interface';
import { CarsSettingsService } from 'src/app/shared/services/settings/cars-settings/cars-settings.service';

@Component({
  selector: 'app-cars-settings',
  templateUrl: './cars-settings.component.html',
  styleUrls: ['./cars-settings.component.scss']
})
export class CarsSettingsComponent implements OnInit {
  public carList: ICar[] = [];
  public carSettingsForm !: FormGroup;
  public submited = false;
  public pageReady = false;
  public deleteId !: string;
  public editStatus = false;
  public isAddCar = false;
  public deleteCard = false;
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private carService: CarsSettingsService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.initForm();
    this.getCarsList();
  }

  private initForm(): void {
    this.carSettingsForm = this.fb.group({
      mark: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, [Validators.required, Validators.pattern(/^([1][9][5-9][0-9])|[2][0][0-9][0-9]$/)]],
      type: [null, Validators.required],
      EURO: [null, [Validators.required, Validators.pattern(/^[1-6]{1}$/)]],
      userid: [this.currentUserid],
      id: [null]
    })
  }

  private getCarsList(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.carService.getCars(user.id).then(data => {
      this.carList = []
      data.forEach(el => {
        this.carList.push(el.data() as ICar)
      });
    }).then(() => {
      this.pageReady = true;
    })
  }

  public addCar() {
    this.submited = true;
    if (this.carSettingsForm.valid) {
      this.carService.setCar(this.carSettingsForm.value).then(() => {
        this.getCarsList();
        this.isAddCar = false;
        this.toastr.success('Автомобіль додано')
        this.carSettingsForm.reset();
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      })
    } else {
      this.toastr.error('Заповніть правильно форму')
    }
  }

  public updateCar(car: ICar): void {
    this.carSettingsForm.patchValue(car);
    this.isAddCar = true;
    this.editStatus = true;
  }

  public saveCar(): void {
    this.submited = true;
    if (this.carSettingsForm.valid) {
      this.carService.updateCar(this.carSettingsForm.value).then(() => {
        this.toastr.success('Автомобіль успішно редаговано')
        this.getCarsList();
        this.isAddCar = false;
        this.editStatus = false;
        this.carSettingsForm.reset();
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      })
    } else {
      this.toastr.error('Заповніть правильно форму')
    }
  }

  public deleteCar(id: string): void {
    this.deleteCard = true;
    this.deleteId = id;
  }

  closeDeleteCard(): void {
    this.deleteCard = false
  }

  public delete(): void {
    this.deleteCard = false;
    this.carService.deleteCar(this.deleteId).then(() => {
      this.getCarsList();
      this.toastr.success('Автомобіль успішно видалено')
    }).catch(() => {
      this.toastr.error('Щось пішло не так')
    })
  }

  get validation(): { [key: string]: AbstractControl } {
    return this.carSettingsForm.controls;
  }
}
