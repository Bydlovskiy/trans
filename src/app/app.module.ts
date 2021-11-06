import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BurgerComponent } from './components/burger/burger.component';
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
import { ConsignorLoginComponent } from './pages/consignor-login/consignor-login.component';
import { TruckerLoginComponent } from './pages/trucker-login/trucker-login.component';
import { UserSettingsComponent } from './pages/cabinet/user-settings/user-settings.component';
import { UserBurgerComponent } from './pages/cabinet/user-burger/user-burger.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { UserActionsComponent } from './pages/cabinet/user-actions/user-actions.component';
import { ExchangeComponent } from './pages/cabinet/exchange/exchange.component';
import { MessagesComponent } from './pages/cabinet/messages/messages.component';
import { UserInfoComponent } from './pages/cabinet/user-info/user-info.component';
import { CarsSettingsComponent } from './pages/cabinet/user-settings/cars-settings/cars-settings.component';
import { ProfileSettingsComponent } from './pages/cabinet/user-settings/profile-settings/profile-settings.component';
import { CompanySettingsComponent } from './pages/cabinet/user-settings/company-settings/company-settings.component';
import { CreateOfferComponent } from './pages/cabinet/user-actions/create-offer/create-offer.component';
import { ActiveOffersComponent } from './pages/cabinet/user-actions/active-offers/active-offers.component';
import { ArchiveOffersComponent } from './pages/cabinet/user-actions/archive-offers/archive-offers.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
 
  declarations: [
    AppComponent,
    HeaderComponent,
    BurgerComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    AdminBlogComponent,
    AdminAccountsComponent,
    AdminTruckerAccountsComponent,
    AdminConsignorAccountsComponent,
    HelpComponent,
    KontaktyComponent,
    LoginComponent,
    RegisterComponent,
    BlogComponent,
    BlogDetailsComponent,
    CabinetComponent,
    TruckerComponent,
    ConsignorComponent,
    UserBlogComponent,
    TruckerRegisterComponent,
    ConsignorRegisterComponent,
    ConsignorLoginComponent,
    TruckerLoginComponent,
    UserSettingsComponent,
    UserBurgerComponent,
    UserActionsComponent,
    ExchangeComponent,
    MessagesComponent,
    UserInfoComponent,
    CarsSettingsComponent,
    ProfileSettingsComponent,
    CompanySettingsComponent,
    CreateOfferComponent,
    ActiveOffersComponent,
    ArchiveOffersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp( environment.firebaseConfig )),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage()),
    provideAuth(() => getAuth()),
    GooglePlaceModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
