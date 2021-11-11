import { Component, OnInit } from '@angular/core';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';

@Component({
  selector: 'app-active-consignor-offers',
  templateUrl: './active-consignor-offers.component.html',
  styleUrls: ['./active-consignor-offers.component.scss']
})
export class ActiveConsignorOffersComponent implements OnInit {
  public activeOffersList !: IConsignorOffer[];
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private consignorOffersService : ConsignorOffersService) { }

  ngOnInit(): void {
    this.loadOfferList()
  }

  loadOfferList(): void {
    this.consignorOffersService.getAllforCurrentUser(this.currentUserid).then(data => {
      this.activeOffersList = [];
      data.forEach(offer => {
        this.activeOffersList.push(offer.data() as IConsignorOffer)
      });
    })
  }

}
