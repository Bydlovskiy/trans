import { Component, OnInit } from '@angular/core';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';

@Component({
  selector: 'app-archive-consignor-offers',
  templateUrl: './archive-consignor-offers.component.html',
  styleUrls: ['./archive-consignor-offers.component.scss']
})
export class ArchiveConsignorOffersComponent implements OnInit {
  public activeOffersList !: IConsignorOffer[];
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private consignorOfferService: ConsignorOffersService) { }

  ngOnInit(): void {
    this.loadOfferList();
  }

  loadOfferList(): void {
    this.consignorOfferService.getAllforCurrentUser(this.currentUserId).then(data => {
      this.activeOffersList = [];
      let offerList: any[] = [];
      data.forEach(offer => {
        offerList.push(offer.data() as IConsignorOffer);
      });
      this.activeOffersList = offerList.filter(offer => offer.status == "archive");
      console.log(this.activeOffersList);
    })
  }

}
