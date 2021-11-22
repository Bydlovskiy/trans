import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { ITruckerOffer } from 'src/app/shared/interfaces/trucker-offer-interface';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';

@Component({
  selector: 'app-others-notifications',
  templateUrl: './others-notifications.component.html',
  styleUrls: ['./others-notifications.component.scss']
})
export class OthersNotificationsComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user') as string);
  private notificationsIdList !: Array<any>;
  public notificationsList !: Array<any>;
  private collection !: string;
  public chat !: any[];
  public messageGroup !: FormGroup;
  public isEmpty = false;
  public offerTruckerInfo = false;
  public offerConsignorInfo = false;
  public customerInfo = false;
  public rejectOrConfirm !: boolean;
  public offerId !: string;
  public offerDetailsData: any;
  public customerData: any;


  constructor(private CommunicationService: CommunicationsService) { }

  ngOnInit(): void {
    this.chooseCollection();
    this.getYourNotifications()
  }

  private chooseCollection(): void {
    if (this.user.role == 'trucker') {
      this.collection = 'consignor'
    } else if (this.user.role == 'consignor') {
      this.collection = 'trucker'
    }
  }
  getYourNotifications(): void {
    this.CommunicationService.getNotificationsforPerformerUser(this.user.id).then(data => {
      let list: any[] = [];
      data.forEach(notification => {
        list.push(notification.data() as IOfferResponde)
      })
      let activeList = list.filter(ell => ell.status == "confirmed" || ell.status == "rejected");
      if (activeList.length > 0) {
        this.isEmpty = false;
      } else if (activeList.length == 0) {
        this.isEmpty = true;
      }
      this.notificationsIdList = activeList;
    }).then(() => {
      this.initList()
    })
  }

  initList() {
    this.notificationsList = [];
    let list: Array<any> = [];
    if (this.notificationsIdList.length > 0) {
      this.notificationsIdList.forEach((notification, index) => {
        this.CommunicationService.getUserFromId(notification.performerId).then(performer => {
          list.push({ performerData: performer.data() })
        })
        this.CommunicationService.getUserFromId(notification.customerId).then(customer => {
          list[index].customerData = customer.data()
        })
        this.CommunicationService.getOfferFromId(notification.offerId, this.collection).then(data => {
          list[index].offerData = data.data();
          list[index].date = (notification.date);
          list[index].id = notification.id;
          list[index].status = notification.status;
        }).then(() => {
          list[index].message = notification.message
          this.notificationsList = list;
          console.log(this.notificationsList);
        })
      })
    } else { }
  }

  public companyDetails(i: number) {
    this.customerData = this.notificationsList[i].performerData;
    this.customerInfo = true;
  }

  public offerDetails(i: number) {
    if (this.user.role == 'consignor') {
      this.offerDetailsData = this.notificationsList[i].offerData;
      this.offerTruckerInfo = true;
    } else if (this.user.role == 'trucker') {
      this.offerDetailsData = this.notificationsList[i].offerData;
      this.offerConsignorInfo = true;
    }
  }

}
