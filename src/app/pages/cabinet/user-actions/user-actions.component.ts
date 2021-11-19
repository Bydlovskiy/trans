import { Component, Input, OnInit } from '@angular/core';
import { isEmpty } from '@firebase/util';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user') as string);
  public currentUser !: any;
  public checkSettings !: boolean;
  public path: Array<any> = [];
  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.checkSetings();
  }

  checkSetings(): void {
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
