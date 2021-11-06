import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  public isUserPanel = false;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logOut();
  }

}
