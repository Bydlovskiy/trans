import { Component, OnInit } from '@angular/core';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';



@Component({
  selector: 'app-active-offers',
  templateUrl: './active-offers.component.html',
  styleUrls: ['./active-offers.component.scss']
})
export class ActiveOffersComponent implements OnInit {
  public activeConsignorOffersList !: IConsignorOffer[];
  public activeTruckerOffersList !:ITruckerOffer[];
  public user = JSON.parse(localStorage.getItem('user') as string);

  constructor(private offerService: ConsignorOffersService) { }
 
  ngOnInit(): void {
    this.loadOfferList()
  }

  loadOfferList(): void {
    this.offerService.getAllforCurrentUser(this.user.id,this.user.role).then(data => {
      this.activeTruckerOffersList = [];
      this.activeConsignorOffersList = [];
      let offerList : any[] = [];
      data.forEach(offer => {
        offerList.push(offer.data() as ITruckerOffer | IConsignorOffer);
      });
      if(this.user.role == 'consignor'){
        this.activeConsignorOffersList = offerList.filter(offer => offer.status == "generated" || offer.status == "in-work")
      } else if (this.user.role == 'trucker'){
        this.activeTruckerOffersList = offerList.filter(offer => offer.status == "generated" || offer.status == "in-work")
      }
    })
  }

  addToArchive(offerId : string): void {
    this.offerService.changeOfferStatus(offerId , this.user.role).then(() => {
      this.loadOfferList();
    })
  }
}
