import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { isEmpty } from '@firebase/util';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';
import { OffersService } from 'src/app/shared/services/offers/offers.service';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';
import { IConsignorOffer } from 'src/app/shared/interfaces/consignor-offer-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  public truckerOffersList !: ITruckerOffer[];
  public consignorOffersList !: IConsignorOffer[];
  public truckerUsersData !: Array<any>;
  public consignorUsersData !: Array<any>;
  public respondToOfferForm !: FormGroup;
  public messageGroup !: FormGroup;
  private collection !: string;
  public isEmpty = false;
  public modalToggle = false;
  public customerInfoForConsignor = false;
  public customerInfoForTrucker = false;
  public customerDataAboutConsignor !: any;
  public customerDataAboutTrucker !: any;
  public currentUser !: any;
  public checkSettings !: boolean;
  public user = JSON.parse(localStorage.getItem('user') as string);
  constructor(private offersService: OffersService,
    private communicationService: CommunicationsService,
    private fb: FormBuilder,
    private userInfoService: UserInfoService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.checkSetings();
    this.chooseColection();
    this.initMessageForm();
    this.initRespondToOfferForm()
    this.getOffersList();
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

  private chooseColection(): void {
    if (this.user.role == 'consignor') {
      this.collection = 'trucker'
    } else {
      this.collection = 'consignor'
    }
  }

  private getOffersList(): void {
    this.offersService.getOffers(this.collection).subscribe(data => {
      const activeOffers = data.filter(data => data.status == "generated");
      if(activeOffers.length > 0){
        this.isEmpty = false; 
      } else if (activeOffers.length == 0){
        this.isEmpty = true; 
      }
      this.getUserData(activeOffers as ITruckerOffer[] | IConsignorOffer[])
    })
  }

  private getUserData(arr: any[]): void {
    let truckerUsersId: string[] = [];
    let usersData: Array<any> = []
    arr.forEach(offer => {
      truckerUsersId.push(offer.userId as string)
    })
    truckerUsersId.forEach(userId => {
      this.offersService.getUserFromId(userId).then(data => {
        usersData.push(data.data())
      })
    })
    if (this.user.role == 'consignor') {
      this.truckerUsersData = usersData;
      this.truckerOffersList = arr;
    } else if (this.user.role == 'trucker') {
      this.consignorUsersData = usersData;
      this.consignorOffersList = arr;
    }
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
    this.offersService.getOfferById(this.respondToOfferForm.controls['offerId'].value, this.collection).then(data => {
      let currentOffer = data.data() as IConsignorOffer | ITruckerOffer;
      currentOffer.respondedUsersId.push(this.user.id);
      this.offersService.updateResponsedUser(currentOffer.id, currentOffer.respondedUsersId, this.collection).then(() => { })
    })
    this.communicationService.saveNotification(this.respondToOfferForm.value).then(() => {
      this.getOffersList();
      this.toastr.success('Відгук успішно надіслано')
    }).catch(() => {
      this.toastr.error('Щось пішло не так')
    })
  }

  public getCustomerData(i: number): void {
    if (this.user.role == 'consignor') {
      this.customerDataAboutTrucker = this.truckerUsersData[i];
    } else if (this.user.role == 'trucker') {
      this.customerDataAboutConsignor = this.consignorUsersData[i];
    }
  }

  private checkSetings(): void {
    this.userInfoService.getUserInfo(this.user.id).then(data => {
      data.forEach(data => {
        this.currentUser = data.data();
      })
    }).then(() => {
      if (isEmpty(this.currentUser.company) || isEmpty(this.currentUser.user)) {
        this.checkSettings = false;
      } else {
        this.checkSettings = true;
      }
    })
  }
}