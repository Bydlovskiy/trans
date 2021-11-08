import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public points : Array<any> = [];
 
  constructor() { }

  ngOnInit(): void {
    this.checkRole();
  }

  checkRole()  {
    if(JSON.parse(localStorage.getItem('user') as string).role == 'trucker' ){
      this.points = [{name : 'Мій обліковий запис',path : 'profile'},{name : 'Компанія',path : 'company'},{name : 'Автомобілі',path : 'cars'}]
    } else if(JSON.parse(localStorage.getItem('user') as string).role == 'consignor'){
      this.points = [{name : 'Мій обліковий запис',path : 'profile'},{name : 'Компанія',path : 'company'}]
    } else {
      return
    }
  }

}
