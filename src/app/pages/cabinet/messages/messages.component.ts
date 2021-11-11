import { Component, OnInit } from '@angular/core';
import { IMessageCustomer, IMessagePerformer, IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public path !: Array<String>;  
  constructor() { }

  ngOnInit(): void {
    this.checkRole()
  }

  checkRole() {
    if(JSON.parse(localStorage.getItem('user') as string).role == 'trucker'){
      this.path = ['your-trucker-offers','others-trucker-offers']
    } else if (JSON.parse(localStorage.getItem('user') as string).role == 'consignor'){
      this.path = ['your-consignor-offers','others-consignor-offers']
    }
  }

}
