import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  public isUserPanel = false;
  public exchangePath !:string;
  public userRole = JSON.parse(localStorage.getItem('user') as string).role
   
  constructor(private authService : AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.checkRole();
  }

  logOut(): void {
    this.authService.logOut().then(() => {
      localStorage.removeItem('user');
      // this.currentUser$.next(false);
      this.router.navigate([''])
    });
  }

  checkRole(){
    if(this.userRole == 'trucker'){
      this.exchangePath = 'trucker-exchange';
    } else if (this.userRole == 'consignor'){
      this.exchangePath = 'consignor-exchange';
    }
  }

}
