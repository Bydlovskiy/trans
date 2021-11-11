import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';

@Component({
  selector: 'app-consignor-exchange',
  templateUrl: './consignor-exchange.component.html',
  styleUrls: ['./consignor-exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  public truckerOffersList !: ITruckerOffer[];
  public truckerUsersData !: Array<any>;
  public respondToOfferForm !: FormGroup;
  public messageGroup !: FormGroup;
  public modalToggle = false;
  public currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private consignorOffersService : ConsignorOffersService,
              private communicationService : CommunicationsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initMessageForm();
    this.initRespondToOfferForm()
    this.getConsignorOffersList()
  }
  private initMessageForm(): void {
    this.messageGroup = this.fb.group({
      message: [null]
    })
  }


  private initRespondToOfferForm(): void {
    this.respondToOfferForm = this.fb.group({
      customerId: [null, Validators.required],
      performerId: [JSON.parse(localStorage.getItem('user') as string).id, Validators.required],
      offerId: [null, Validators.required],
      message: [null],
      date : [null],
      status : ['not-confirmed',Validators.required]
    })
  }

  private getConsignorOffersList(): void {
    this.consignorOffersService.getTruckerOffers().subscribe(data => {
      const activeOffers = data.filter(data => data.status == "generated");
      this.getUserData(activeOffers as Array<ITruckerOffer>)
    })
  }

  private getUserData(arr: Array<ITruckerOffer>): void {
    let truckerUsersId: String[] = [];
    let truckerUsersData: Array<any> = []
    arr.forEach(offer => {
      truckerUsersId.push(offer.userId)
    })
    truckerUsersId.forEach(userId => {
      this.consignorOffersService.getUserFromId(userId).then(data => {
        data.forEach(ell => {
          truckerUsersData.push(ell.data())
        });
      })
    })
    this.truckerUsersData = truckerUsersData
    this.truckerOffersList = arr;
  }

  public createRespondOffer(userId: String, offerId: String): void {
    this.modalToggle = true;
    this.respondToOfferForm.patchValue({
      customerId: userId,
      offerId: offerId
    });
  }

  public sendRespond(): void {
    this.modalToggle = false;
    const message = [{ performer: this.messageGroup.controls['message'].value }]
    this.respondToOfferForm.patchValue({
      message: message,
      date : new Date
    });
    this.consignorOffersService.getTruckerOfferById(this.respondToOfferForm.controls['offerId'].value).then(data => {
      data.forEach(offer => {
        let currentOffer = offer.data().respondedUsersId;
        currentOffer.push(this.currentUserId);
        this.consignorOffersService.updateResponsedUser(offer.id, currentOffer as ITruckerOffer).then(() => {
        })
      })
    })
    this.communicationService.saveOffer(this.respondToOfferForm.value).then(() => {
    })
  }
}
