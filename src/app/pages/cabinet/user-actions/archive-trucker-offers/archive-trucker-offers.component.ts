import { Component, OnInit } from '@angular/core';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { TruckerOffersService } from 'src/app/shared/services/offers/trucker-offers.service';

@Component({
  selector: 'app-archive-trucker-offers',
  templateUrl: './archive-trucker-offers.component.html',
  styleUrls: ['./archive-trucker-offers.component.scss']
})
export class ArchiveOffersComponent implements OnInit {
  public activeOffersList !: ITruckerOffer[];
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private truckerOfferService: TruckerOffersService) { }

  ngOnInit(): void {
    this.loadOfferList();
  }

  loadOfferList(): void {
    this.truckerOfferService.getAllforCurrentUser(this.currentUserId).then(data => {
      this.activeOffersList = [];
      let offerList: any[] = [];
      data.forEach(offer => {
        offerList.push(offer.data() as ITruckerOffer);
      });
      this.activeOffersList = offerList.filter(offer => offer.status == "archive");
    })
  }


}
