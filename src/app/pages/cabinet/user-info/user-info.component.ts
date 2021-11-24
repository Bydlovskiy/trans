import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  private currentUserid = JSON.parse(localStorage.getItem('user') as string).id;
  public pageReady = false;
  public userInfo !: any;
  constructor(private userService: UserInfoService,
    private authService : AuthService,
    private router  : Router)  { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo(this.currentUserid).then(data => {
      data.forEach(data => {
        this.userInfo = data.data();
      });
    }).then(() => {
      this.pageReady = true;
    })
  }

  public logOut() : void {
    this.authService.logOut().then(() => {
      this.router.navigate(['']);
      localStorage.removeItem('user')
    })
  }

}
