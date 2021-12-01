import { Component, OnInit } from '@angular/core';
import { IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';

@Component({
  selector: 'app-archive-notifications',
  templateUrl: './archive-notifications.component.html',
  styleUrls: ['./archive-notifications.component.scss']
})
export class ArchiveNotificationsComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user') as string);
  private notificationsIdList !: any[];
  public notificationsList !: any[];
  public pageReady = false;
  private collection !: string;
  public customerData: any;
  public offerDetailsData: any;
  public isEmpty = false;
  public customerInfo = false;
  public offerConsignorInfo = false;
  public offerTruckerInfo = false;
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
      let activeList = list.filter(ell => ell.status == "archived");
      if (activeList.length > 0) {
        this.isEmpty = false;
      } else if (activeList.length == 0) {
        this.isEmpty = true;
      }
      this.notificationsIdList = activeList;
    }).then(() => {
      this.initList()
    }).then(() => {
      this.pageReady = true
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
        })
      })
    }
  }

  public companyDetails(i: number) {
    this.customerData = this.notificationsList[i].customerData;
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
