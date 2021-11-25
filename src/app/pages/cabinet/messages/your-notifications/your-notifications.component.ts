import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOfferResponde } from 'src/app/shared/interfaces/IOffer-respond';
import { CommunicationsService } from 'src/app/shared/services/communications/communications.service';

@Component({
  selector: 'app-your-notifications',
  templateUrl: './your-notifications.component.html',
  styleUrls: ['./your-notifications.component.scss']
})
export class YourNotificationsComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user') as string);
  private notificationsIdList: IOfferResponde[] = [];
  public notificationsList !: any[];
  public pageReady = false;
  public chat !: any[];
  public messageGroup !: FormGroup;
  public isEmpty = false;
  public rejectModalToggle = false;
  public confirmModalToggle = false;
  public rejectOrConfirm !: boolean;
  public offerId !: string;
  public notificationId !: string;
  public customerData: any;
  public offerDetailsData: any;
  public customerInfo = false;
  public offerTruckerInfo = false;
  public offerConsignorInfo = false;
  constructor(private CommunicationService: CommunicationsService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

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
    this.CommunicationService.getNotificationsforCustomerUser(this.user.id).then(data => {
      let list: any[] = [];
      data.forEach(notification => {
        list.push(notification.data() as IOfferResponde)
      })
      const activeList = list.filter(ell => ell.status == "not-confirmed");
      if (activeList.length > 0) {
        this.isEmpty = false;
      } else if (activeList.length == 0) {
        this.isEmpty = true;
      }
      this.notificationsIdList = activeList;
    }).then(() => {
      this.initList()
    }).then(() => {
      this.pageReady = true;
    })
  }

  initList() {
    this.notificationsList = [];
    let list: Array<any> = [];
    if (this.notificationsIdList.length > 0) {
      this.notificationsIdList.forEach((notification, index) => {
        this.CommunicationService.getUserFromId(notification.performerId).then(performer => {
          list.push({ performerData: performer.data() });
          list[index].date = (notification.date);
          list[index].id = notification.id;
        }).then(() => {
          this.CommunicationService.getOfferFromId(notification.offerId as string, this.user.role).then(data => {
            list[index].offerData = data.data()
          })
        }).then(() => {
          this.CommunicationService.getUserFromId(notification.customerId).then(customer => {
            list[index].customerData = customer.data()
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
    this.notificationId = notificationId;
  }

  sendRespond(rejectOrConfirm: boolean): void {
    this.chat.push({ customer: this.messageGroup.controls['message'].value })
    if (rejectOrConfirm) {
      this.CommunicationService.changeNotificationStatus(this.notificationId, 'confirmed', this.chat).then(() => {
        this.confirmModalToggle = false;
        this.getYourNotifications();
      }).then(() => {
        this.CommunicationService.changeOfferStatus(this.offerId, 'in-work', this.notificationId, this.user.role).then(() => {
          this.toastr.success('Відповідь відправлена')
        }).catch(() => {
          this.toastr.error('Щось пішло не так')
        })
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      });
    } else {
      this.CommunicationService.changeNotificationStatus(this.notificationId, 'rejected', this.chat).then(() => {
        this.rejectModalToggle = false;
        this.getYourNotifications();
        this.toastr.success('Відповідь відправлена')
      }).catch(() => {
        this.toastr.error('Щось пішло не так')
      });
    }
  }

  public companyDetails(i: number) {
    this.customerData = this.notificationsList[i].performerData;
    this.customerInfo = true;
  }

  public offerDetails(i: number) {
    if (this.user.role == 'trucker') {
      this.offerDetailsData = this.notificationsList[i].offerData;
      this.offerTruckerInfo = true;
    } else if (this.user.role == 'consignor') {
      this.offerDetailsData = this.notificationsList[i].offerData;
      this.offerConsignorInfo = true;
    }
  }
}
