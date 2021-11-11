import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { KontaktyComponent } from './pages/kontakty/kontakty.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { TruckerComponent } from './pages/home/trucker/trucker.component';
import { ConsignorComponent } from './pages/home/consignor/consignor.component';
import { UserBlogComponent } from './pages/cabinet/user-blog/user-blog.component';
import { TruckerRegisterComponent } from './pages/trucker-register/trucker-register.component';
import { ConsignorRegisterComponent } from './pages/consignor-register/consignor-register.component';
import { TruckerLoginComponent } from './pages/trucker-login/trucker-login.component';
import { ConsignorLoginComponent } from './pages/consignor-login/consignor-login.component';
import { UserSettingsComponent } from './pages/cabinet/user-settings/user-settings.component';
import { UserActionsComponent } from './pages/cabinet/user-actions/user-actions.component';
import { ExchangeComponent } from './pages/cabinet/consignor-exchange/consignor-exchange.component';
import { MessagesComponent } from './pages/cabinet/messages/messages.component';
import { UserInfoComponent } from './pages/cabinet/user-info/user-info.component';
import { CarsSettingsComponent } from './pages/cabinet/user-settings/cars-settings/cars-settings.component';
import { ProfileSettingsComponent } from './pages/cabinet/user-settings/profile-settings/profile-settings.component';
import { CompanySettingsComponent } from './pages/cabinet/user-settings/company-settings/company-settings.component';
import { ActiveOffersComponent } from './pages/cabinet/user-actions/active-trucker-offers/active-trucker-offers.component';
import { ArchiveOffersComponent } from './pages/cabinet/user-actions/archive-trucker-offers/archive-trucker-offers.component';
import { CreateOfferComponent } from './pages/cabinet/user-actions/create-trucker-offer/create-trucker-offer.component';
import { CreateConsignorOfferComponent } from './pages/cabinet/user-actions/create-consignor-offer/create-consignor-offer.component';
import { ActiveConsignorOffersComponent } from './pages/cabinet/user-actions/active-consignor-offers/active-consignor-offers.component';
import { ArchiveConsignorOffersComponent } from './pages/cabinet/user-actions/archive-consignor-offers/archive-consignor-offers.component';
import { TruckerExchangeComponent } from './pages/cabinet/trucker-exchange/trucker-exchange.component';
import { YouTruckerOffersComponent } from './pages/cabinet/messages/you-trucker-offers/you-trucker-offers.component';
import { YourConsignorOffersComponent } from './pages/cabinet/messages/your-consignor-offers/your-consignor-offers.component';
import { OthersTruckerOffersComponent } from './pages/cabinet/messages/others-trucker-offers/others-trucker-offers.component';
import { OthersConsignorOffersComponent } from './pages/cabinet/messages/others-consignor-offers/others-consignor-offers.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trucker', component: TruckerComponent },
  { path: 'consignor', component: ConsignorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'trucker-register', component: TruckerRegisterComponent },
  { path: 'consignor-register', component: ConsignorRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trucker-login', component: TruckerLoginComponent },
  { path: 'consignor-login', component: ConsignorLoginComponent },
  { path: 'help', component: HelpComponent },
  { path: 'contacts', component: KontaktyComponent },
  {
    path: 'cabinet', component: CabinetComponent, children: [
      { path: '', component: UserBlogComponent },
      {
        path: 'settings', component: UserSettingsComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'profile' },
          { path: 'cars', component: CarsSettingsComponent },
          { path: 'profile', component: ProfileSettingsComponent },
          { path : 'company' ,component : CompanySettingsComponent }
        ]
      },
      { path: 'user-actions', component: UserActionsComponent ,children :[
        {path :'' , pathMatch : 'full' , redirectTo : 'active-offers'},
        {path : 'active-trucker-offers' , component : ActiveOffersComponent},
        {path : 'archive-trucker-offers' , component : ArchiveOffersComponent},
        {path : 'create-trucker-offers', component : CreateOfferComponent},
        {path : 'create-consignor-offers' , component : CreateConsignorOfferComponent},
        {path : 'active-consignor-offers', component : ActiveConsignorOffersComponent},
        {path : 'archive-consignor-offers', component : ArchiveConsignorOffersComponent},
      ]},
      { path: 'trucker-exchange' ,component : TruckerExchangeComponent},
      { path: 'consignor-exchange', component: ExchangeComponent },
      { path: 'messages', component: MessagesComponent ,children : [
        {path : 'your-trucker-offers' , component : YouTruckerOffersComponent },
        {path : 'your-consignor-offers' , component : YourConsignorOffersComponent},
        {path : 'others-trucker-offers' , component :  OthersTruckerOffersComponent},
        {path : 'others-consignor-offers' , component : OthersConsignorOffersComponent},
      ]},
      { path: 'info', component: UserInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
