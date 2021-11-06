import { Component, OnInit } from '@angular/core';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  public editStatus = false;
  public isAddCar = false;
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private carService: CarsSettingsService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
    this.getCarsList();
  }

  initForm(): void {
    this.carSettingsForm = this.fb.group({
      mark: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, Validators.required],
      type: [null, Validators.required],
      EURO: [null, Validators.required],
      userid: [this.currentUserid],
      id : [null]
    })
  }

  getCarsList(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.carService.getCars(user.id).then(data => {
      this.carList = []
      data.forEach(el => {
        this.carList.push(el.data() as ICar)
      });
    })
  }

  addCar() {
    this.carService.setCar(this.carSettingsForm.value).then(() => {
      this.getCarsList();
      this.isAddCar = false;
      this.carSettingsForm.reset();
    }).catch(err => {
      console.log(err);
    })
  }

  updateCar(car: ICar): void {
    console.log(car);
    this.carSettingsForm.patchValue(car);
    this.isAddCar = true;
    this.editStatus = true;
  }

  saveCar(): void {
    this.carService.updateCar(this.carSettingsForm.value).then(() => {
      this.carSettingsForm.reset();
      this.getCarsList();
      this.isAddCar = false;
      this.editStatus = false;
    })
  }

  deleteCar(id : string): void {
    this.carService.deleteCar(id).then(() => {
      this.getCarsList();
    })
  }
}
