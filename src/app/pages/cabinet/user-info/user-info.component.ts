import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;
  public userInfo !: any;
  constructor(private userService: UserInfoService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo(this.currentUserid).then(data => {
      data.forEach(data => {
        this.userInfo = data.data();
      });

    })
  }

}
