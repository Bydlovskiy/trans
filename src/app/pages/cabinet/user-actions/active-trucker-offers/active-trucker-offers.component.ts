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
  private cerruntUserId = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private offerService: TruckerOffersService) { }

  ngOnInit(): void {
    this.getactiveList()
  }

  getactiveList() {
    this.offerService.getAllforCurrentUser(this.cerruntUserId).then(data => {
      this.activeOffersList = []
      data.forEach(el => {
        this.activeOffersList.push(el.data() as ITruckerOffer)

      })
    })
  }



}
