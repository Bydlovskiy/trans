import { Component, OnInit } from '@angular/core';
import { IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';

@Component({
  selector: 'app-others-consignor-offers',
  templateUrl: './others-consignor-offers.component.html',
  styleUrls: ['./others-consignor-offers.component.scss']
})
export class OthersConsignorOffersComponent implements OnInit {
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  private notificationsIdList !: Array<any>;
  public notificationsList !: Array<any>;
  constructor(private CommunicationService: CommunicationsService) { }

  ngOnInit(): void {
    this.getYourNotifications()
  }
  getYourNotifications(): void {
    this.CommunicationService.getNotificationsforPerformerUser(this.currentUserId).then(data => {
      data.forEach(notification => {
        let list = [];
        list.push(notification.data() as IOfferResponde)
        const activeList = list.filter(ell => ell.status == "confirmed" || ell.status == "rejected");
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
            list.push({ performerData: performer.data() })
          })
        })
        this.CommunicationService.getUserFromId(notification.customerId).then(data => {
          data.forEach((customer) => {
            list[index].customerData = customer.data()
          })
        })
        this.CommunicationService.getTruckerOfferFromId(notification.offerId).then(data => {
          data.forEach(offer => {
            list[index].offerData = (offer.data());
            list[index].date = (notification.date);
            list[index].id = notification.id;
            list[index].status = notification.status
          })
        }).then(() => {
          list[index].message = notification.message
          this.notificationsList = list;
          console.log(this.notificationsList);
        })
      })
    } else {
    }
  }

}
