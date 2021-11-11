import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';
import { TruckerOffersService } from 'src/app/shared/services/offers/trucker-offers.service';


@Component({
  selector: 'app-trucker-exchange',
  templateUrl: './trucker-exchange.component.html',
  styleUrls: ['./trucker-exchange.component.scss']
})
export class TruckerExchangeComponent implements OnInit {
  public consignorOffersList !: IConsignorOffer[];
  public consignorUsersData !: any[];
  public respondToOfferForm !: FormGroup;
  public messageGroup !: FormGroup;
  public modalToggle = false;

  public currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  constructor(private truckerOffersSrvice: TruckerOffersService,
    private communicationService: CommunicationsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initRespondToOfferForm();
    this.initMessageForm()
    this.getConsignorOffersList();
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
      date: [null],
      status: ['not-confirmed', Validators.required]
    })
  }

  private getConsignorOffersList(): void {
    this.truckerOffersSrvice.getConsignorOffers().subscribe(data => {
      const activeOffers = data.filter(data => data.status == "generated");
      this.getUserData(activeOffers as IConsignorOffer[])
    })
  }

  private getUserData(arr: IConsignorOffer[]): void {
    let consignorUsersId: String[] = [];
    let consignorUsersData: any[] = []
    arr.forEach(offer => {
      consignorUsersId.push(offer.userId)
    })
    consignorUsersId.forEach(userId => {
      this.truckerOffersSrvice.getUserFromId(userId).then(data => {
        data.forEach(ell => {
          consignorUsersData.push(ell.data())
        });
      })
    })
    this.consignorUsersData = consignorUsersData
    this.consignorOffersList = arr;
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
      date: new Date
    });
    this.truckerOffersSrvice.getConsignorOfferById(this.respondToOfferForm.controls['offerId'].value).then(data => {
      data.forEach(offer => {
        let currentOffer = offer.data().respondedUsersId;
        currentOffer.push(this.currentUserId);
        this.truckerOffersSrvice.updateResponsedUser(offer.id, currentOffer as IConsignorOffer).then(() => {
        })
      })
    })
    this.communicationService.saveOffer(this.respondToOfferForm.value).then(() => {
      this.getConsignorOffersList();
    })
  }
}
