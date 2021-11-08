import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  private userRole = JSON.parse(localStorage.getItem('user') as string).role;
  public path: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
    this.checkRole();
  }

  checkRole(): void {
    if (this.userRole == 'trucker') {
      this.path = ['create-trucker-offers', 'active-trucker-offers', 'archive-trucker-offers']
    } else if (this.userRole == 'consignor') {
      this.path = ['create-consignor-offers', 'active-consignor-offers', 'archive-consignor-offers']
    }
  }
}
