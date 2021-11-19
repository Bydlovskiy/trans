import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KontaktyComponent } from './pages/kontakty/kontakty.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { TruckerComponent } from './pages/home/trucker/trucker.component';
import { ConsignorComponent } from './pages/home/consignor/consignor.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserActionsComponent } from './pages/cabinet/user-actions/user-actions.component';
import { ExchangeComponent } from './pages/cabinet/exchange/exchange.component';
import { MessagesComponent } from './pages/cabinet/messages/messages.component';
import { UserInfoComponent } from './pages/cabinet/user-info/user-info.component';
import { ActiveOffersComponent } from './pages/cabinet/user-actions/active-offers/active-offers.component';
import { ArchiveOffersComponent } from './pages/cabinet/user-actions/archive-offers/archive-offers.component';
import { YouTruckerOffersComponent } from './pages/cabinet/messages/you-trucker-offers/you-trucker-offers.component';
import { YourConsignorOffersComponent } from './pages/cabinet/messages/your-consignor-offers/your-consignor-offers.component';
import { OthersTruckerOffersComponent } from './pages/cabinet/messages/others-trucker-offers/others-trucker-offers.component';
import { OthersConsignorOffersComponent } from './pages/cabinet/messages/others-consignor-offers/others-consignor-offers.component';
import { UserSettingsComponent } from './pages/cabinet/user-info/user-settings/user-settings.component';
import { CarsSettingsComponent } from './pages/cabinet/user-info/user-settings/cars-settings/cars-settings.component';
import { ProfileSettingsComponent } from './pages/cabinet/user-info/user-settings/profile-settings/profile-settings.component';
import { CompanySettingsComponent } from './pages/cabinet/user-info/user-settings/company-settings/company-settings.component';
import { CreateOfferComponent } from './pages/cabinet/user-actions/create-offer/create-offer.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trucker', component: TruckerComponent },
  { path: 'consignor', component: ConsignorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'contacts', component: KontaktyComponent },
  {
    path: 'cabinet', component: CabinetComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
     
      { path: 'user-actions', component: UserActionsComponent ,children :[
        {path :'' , pathMatch : 'full' , redirectTo : 'active-offers'},
        {path : 'active-offers' , component : ActiveOffersComponent},
        {path : 'create-offers' , component : CreateOfferComponent},
        {path : 'archive-consignor-offers', component : ArchiveOffersComponent},
      ]},
      { path: 'consignor-exchange', component: ExchangeComponent },
      { path: 'messages', component: MessagesComponent ,children : [
        {path : 'your-trucker-offers' , component : YouTruckerOffersComponent },
        {path : 'your-consignor-offers' , component : YourConsignorOffersComponent},
        {path : 'others-trucker-offers' , component :  OthersTruckerOffersComponent},
        {path : 'others-consignor-offers' , component : OthersConsignorOffersComponent},
      ]},
      { path: 'info', component: UserInfoComponent , children : [
        // { path: '', pathMatch: 'full', redirectTo: 'settings' },
        {
          path: 'settings', component: UserSettingsComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'profile' },
            { path: 'cars', component: CarsSettingsComponent },
            { path: 'profile', component: ProfileSettingsComponent },
            { path : 'company' ,component : CompanySettingsComponent }
          ]
        },
      ]
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
