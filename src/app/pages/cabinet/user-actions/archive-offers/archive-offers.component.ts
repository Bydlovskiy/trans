import { Component, OnInit } from '@angular/core';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';

@Component({
  selector: 'app-archive-offers',
  templateUrl: './archive-offers.component.html',
  styleUrls: ['./archive-offers.component.scss']
})
export class ArchiveOffersComponent implements OnInit {
  public archiveConsignorOffersList !: IConsignorOffer[];
  public archiveTruckerOffersList !: ITruckerOffer[];
  public user = JSON.parse(localStorage.getItem('user') as string);
  constructor(private offerService: ConsignorOffersService) { }

  ngOnInit(): void {
    this.loadOfferList();
  }

  loadOfferList(): void {
    this.offerService.getAllforCurrentUser(this.user.id, this.user.role).then(data => {
      this.archiveConsignorOffersList = [];
      this.archiveTruckerOffersList = [];
      let offerList: any[] = [];
      data.forEach(offer => {
        offerList.push(offer.data() as IConsignorOffer | ITruckerOffer);
      });
      if (this.user.role == 'consignor') {
        this.archiveConsignorOffersList = offerList.filter(offer => offer.status == "archive");
      } else if (this.user.role == 'trucker') {
        this.archiveTruckerOffersList = offerList.filter(offer => offer.status == "archive");
      }
    })
  }

}
