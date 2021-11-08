import { Component, OnInit } from '@angular/core';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';

@Component({
  selector: 'app-consignor-exchange',
  templateUrl: './consignor-exchange.component.html',
  styleUrls: ['./consignor-exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  constructor(private consignorOffersService : ConsignorOffersService) { }

  ngOnInit(): void {
    this.getTruckerOffersList()
  }

  getTruckerOffersList(): void {
    this.consignorOffersService.getTruckerOffers().subscribe(data => {
      console.log(data);
      
    })
  }

}
