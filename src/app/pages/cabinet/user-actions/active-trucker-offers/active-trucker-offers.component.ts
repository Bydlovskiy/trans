import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/shared/interfaces/car-interface';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { TruckerOffersService } from 'src/app/shared/services/offers/trucker-offers.service';


@Component({
  selector: 'app-active-trucker-offers',
  templateUrl: './active-trucker-offers.component.html',
  styleUrls: ['./active-trucker-offers.component.scss']
})
export class ActiveOffersComponent implements OnInit {
  public activeOffersList !: ITruckerOffer[];
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private truckerOfferService: TruckerOffersService) { }

 
  ngOnInit(): void {
    this.loadOfferList()
  }

  loadOfferList(): void {
    this.truckerOfferService.getAllforCurrentUser(this.currentUserId).then(data => {
      this.activeOffersList = [];
      let offerList : any[] = [];
      data.forEach(offer => {
        offerList.push(offer.data() as ITruckerOffer);
      });
      this.activeOffersList = offerList.filter(offer => offer.status == "generated" || offer.status == "in-work")
    })
  }

  addToArchive(offerId : string): void {
    this.truckerOfferService.changeOfferStatus(offerId).then(() => {
      this.loadOfferList();
    })
  }


}
