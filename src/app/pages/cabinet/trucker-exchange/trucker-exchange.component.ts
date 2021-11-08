import { Component, OnInit } from '@angular/core';
import { TruckerOffersService } from 'src/app/shared/services/offers/trucker-offers.service';

@Component({
  selector: 'app-trucker-exchange',
  templateUrl: './trucker-exchange.component.html',
  styleUrls: ['./trucker-exchange.component.scss']
})
export class TruckerExchangeComponent implements OnInit {

  constructor(private truckerOffersSrvice : TruckerOffersService) { }

  ngOnInit(): void {
    this.getConsignorOffersList()
  }

  getConsignorOffersList(): void {
    this.truckerOffersSrvice.getConsignorOffers().subscribe(data => {
      console.log(data);
      
    })
  }

}
