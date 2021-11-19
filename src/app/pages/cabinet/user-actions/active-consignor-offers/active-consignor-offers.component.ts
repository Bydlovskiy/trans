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
  private user = JSON.parse(localStorage.getItem('user') as string);
  constructor(private consignorOffersService: ConsignorOffersService) { }

  ngOnInit(): void {
    this.loadOfferList();
  }

  loadOfferList(): void {
    this.consignorOffersService.getAllforCurrentUser(this.user.id).then(data => {
      this.activeOffersList = [];
      let offerList: any[] = [];
      data.forEach(offer => {
        offerList.push(offer.data() as IConsignorOffer);
      });
      this.activeOffersList = offerList.filter(offer => offer.status == "generated" || offer.status == "in-work")
    })
  }

  addToArchive(offerId: string): void {
    this.consignorOffersService.changeOfferStatus(offerId).then(() => {
      this.loadOfferList();
    })
  }

}
