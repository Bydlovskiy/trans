import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminBlogComponent } from './pages/admin/admin-blog/admin-blog.component';
import { AdminAccountsComponent } from './pages/admin/admin-accounts/admin-accounts.component';
import { AdminTruckerAccountsComponent } from './pages/admin/admin-accounts/admin-trucker-accounts/admin-trucker-accounts.component';
import { AdminConsignorAccountsComponent } from './pages/admin/admin-accounts/admin-consignor-accounts/admin-consignor-accounts.component';
import { HelpComponent } from './pages/help/help.component';
import { KontaktyComponent } from './pages/kontakty/kontakty.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
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
import { ExchangeComponent } from './pages/cabinet/exchange/exchange.component';
import { MessagesComponent } from './pages/cabinet/messages/messages.component';
import { UserInfoComponent } from './pages/cabinet/user-info/user-info.component';
import { CarsSettingsComponent } from './pages/cabinet/user-settings/cars-settings/cars-settings.component';
import { ProfileSettingsComponent } from './pages/cabinet/user-settings/profile-settings/profile-settings.component';
import { CompanySettingsComponent } from './pages/cabinet/user-settings/company-settings/company-settings.component';
import { ActiveOffersComponent } from './pages/cabinet/user-actions/active-offers/active-offers.component';
import { ArchiveOffersComponent } from './pages/cabinet/user-actions/archive-offers/archive-offers.component';
import { CreateOfferComponent } from './pages/cabinet/user-actions/create-offer/create-offer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trucker', component: TruckerComponent },
  { path: 'consignor', component: ConsignorComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
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
        {path : 'active-offers' , component : ActiveOffersComponent},
        {path : 'archive-offers' , component : ArchiveOffersComponent},
        {path : 'create-offer', component : CreateOfferComponent}
      ]},
      { path: 'exchange', component: ExchangeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'info', component: UserInfoComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'admin-blog', component: AdminBlogComponent },
      {
        path: 'admin-accounts', component: AdminAccountsComponent, children: [
          { path: 'trucker', component: AdminTruckerAccountsComponent },
          { path: 'consignor', component: AdminConsignorAccountsComponent }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
