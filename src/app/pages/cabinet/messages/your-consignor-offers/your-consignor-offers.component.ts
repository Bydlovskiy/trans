import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';

@Component({
  selector: 'app-your-consignor-offers',
  templateUrl: './your-consignor-offers.component.html',
  styleUrls: ['./your-consignor-offers.component.scss']
})
export class YourConsignorOffersComponent implements OnInit {
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  private notificationsIdList : IOfferResponde[] = [];
  public notificationsList !: any[];
  public chat !: any[];
  public messageGroup !: FormGroup;
  public rejectModalToggle = false;
  public confirmModalToggle = false;
  public rejectOrConfirm !: boolean;
  public offerId !: string;
  public notificationId !: string;
  private rejectRespondData !: string;
  constructor(private CommunicationService: CommunicationsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initMessages();
    this.getYourNotifications();
  }

  initMessages(): void {
    this.messageGroup = this.fb.group({
      message: [null]
    })
  }

  getYourNotifications(): void {
    this.CommunicationService.getNotificationsforCustomerUser(this.currentUserId).then(data => {
      data.forEach(notification => {
        let list = [];
        list.push(notification.data() as IOfferResponde)
        const activeList = list.filter(ell => ell.status == "not-confirmed");
        this.notificationsIdList = activeList;
      })
    }).then(() => {
      this.initList()
    })
  }

  initList() {
    this.notificationsList = [];
    let list: Array<any> = [];
    if (this.notificationsIdList.length > 0) {
      this.notificationsIdList.forEach((notification, index) => {
        this.CommunicationService.getUserFromId(notification.performerId).then(data => {
          data.forEach(performer => {
            list.push({performerData : performer.data()})
          })
        })
        this.CommunicationService.getUserFromId(notification.customerId).then(data => {
          data.forEach((customer) => {
            list[index].customerData = customer.data()
          })
        })
        this.CommunicationService.getConsignorOfferFromId(notification.offerId).then(data => {
          data.forEach(offer => {
            list[index].offerData = (offer.data());
            list[index].date = (notification.date);
            list[index].id = notification.id;
            list[index].status = notification.status
          })
        }).then(() => {
          list[index].message = notification.message;
          this.notificationsList = list;
        })
      })
    }
  }

  confirmRespond(index: number, offerId: string, notificationId: string) {
    this.offerId = offerId;
    this.notificationId = notificationId;
    this.confirmModalToggle = true;
    this.chat = this.notificationsList[index].message
    this.rejectOrConfirm = true;
  }

  rejectRespond(index: number, notificationId: string) {
    this.rejectModalToggle = true;
    this.chat = this.notificationsList[index].message
    this.rejectOrConfirm = false;
    this.rejectRespondData = notificationId;
  }

  sendRespond(rejectOrConfirm: boolean): void {
    this.chat.push({ customer: this.messageGroup.controls['message'].value })
    if (rejectOrConfirm) {
      this.CommunicationService.changeNotificationStatus(this.notificationId, 'confirmed', this.chat).then(() => {
        this.confirmModalToggle = false;
        this.getYourNotifications();
      }).then(() => {
        this.CommunicationService.changeConsignorOfferStatus(this.offerId, 'in-work',this.chat).then(() => {
        })
      });
    } else {
      this.CommunicationService.changeNotificationStatus(this.rejectRespondData, 'rejected', this.chat).then(() => {
        this.rejectModalToggle = false;
        this.getYourNotifications();
      });
    }
  }
}
