import { Component, OnInit } from '@angular/core';
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
  public editIndex !: number;
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private carService : CarsSettingsService ) { }

  ngOnInit(): void {
    this.getCarsList();
  }


  getCarsList() : void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.carService.getCars(user.id).then(data => {
        data.forEach(user => {
        this.carList = user.data().cars ;
      });
    })
  }

  updateCar(index: number): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.carService.getCars(user.id).then(data => {
      data.forEach(user => {
        this.editIndex = index
        this.carService.editCar.next(user.data().cars[index]);
        this.carService.saveEditIndex(index);
      });
    });
  }

  deleteCar(index : number ) : void {
   this.carList.splice(index,1);
   this.carService.setCarsList(this.currentUserid,this.carList).then(data => {
     console.log(data);
     
   })
   
  }



 
}
