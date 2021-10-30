import { Component, OnInit } from '@angular/core';
import { collection, Firestore, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'rxfire/auth';
import { ICar } from 'src/app/shared/interfaces/car-interface';
import { CarsSettingsService } from 'src/app/shared/services/settings/cars-settings/cars-settings.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  public carSettingsForm !: FormGroup;
  public editStatus = false;
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private fb: FormBuilder,
    private carService: CarsSettingsService,
    private router : Router) { }
    
  ngOnInit(): void {
    this.initForm();
    this.loadForm();
  }

  initForm(): void {
    this.carSettingsForm = this.fb.group({
      mark: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, Validators.required],
      type: [null, Validators.required],
      EURO: [null, Validators.required]
    })
  }

  addCar() {
    this.carService.setCar(this.carSettingsForm.value, this.currentUserid).then(() => {
      this.carSettingsForm.reset();
      this.router.navigate(['/cabinet/settings/cars']);
      console.log('add');  
    }).catch(err => {
      console.log(err);
    })
  }

  loadForm(): void {
    this.carService.editCar.subscribe(data => {
      let car: ICar = data as ICar;
      this.editStatus = true;
      this.carSettingsForm.patchValue({
        mark: car.mark,
        model: car.model,
        year: car.year,
        type: car.type,
        EURO: car.EURO
      })
    })
  }

  saveCar() : void{
    let carList : ICar[]; 
    this.carService.getCars(this.currentUserid).then(data => {
        data.forEach(user => {
          console.log(user.data().cars);
          carList = user.data().cars as ICar[];
          this.carService.updateCar(this.carSettingsForm.value,carList,this.currentUserid)
          this.router.navigate(['/cabinet/settings/cars']);
          this.editStatus = false;
      });
    })
  }
}
