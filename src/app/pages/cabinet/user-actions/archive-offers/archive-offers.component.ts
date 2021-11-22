import { Component, OnInit } from '@angular/core';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { OffersService } from 'src/app/shared/services/offers/offers.service';

@Component({
  selector: 'app-archive-offers',
  templateUrl: './archive-offers.component.html',
  styleUrls: ['./archive-offers.component.scss']
})
export class ArchiveOffersComponent implements OnInit {
  public archiveConsignorOffersList !: IConsignorOffer[];
  public archiveTruckerOffersList !: ITruckerOffer[];
  public isEmpty !:boolean;
  public user = JSON.parse(localStorage.getItem('user') as string);
  constructor(private offerService: OffersService) { }

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
        if(this.archiveConsignorOffersList.length > 0){
          this.isEmpty = false;
        } else if(this.archiveConsignorOffersList.length == 0){
          this.isEmpty = true;
        }
      } else if (this.user.role == 'trucker') {
        this.archiveTruckerOffersList = offerList.filter(offer => offer.status == "archive");
        if(this.archiveTruckerOffersList.length > 0){
          this.isEmpty = false;
        } else if(this.archiveTruckerOffersList.length == 0){
          this.isEmpty = true;
        }
      }
    })
  }

}
