import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { KontaktyComponent } from './pages/kontakty/kontakty.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { TruckerComponent } from './pages/home/trucker/trucker.component';
import { ConsignorComponent } from './pages/home/consignor/consignor.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { UserActionsComponent } from './pages/cabinet/user-actions/user-actions.component';
import { ExchangeComponent } from './pages/cabinet/consignor-exchange/consignor-exchange.component';
import { MessagesComponent } from './pages/cabinet/messages/messages.component';
import { UserInfoComponent } from './pages/cabinet/user-info/user-info.component';
import { CreateOfferComponent } from './pages/cabinet/user-actions/create-trucker-offer/create-trucker-offer.component';
import { ActiveOffersComponent } from './pages/cabinet/user-actions/active-trucker-offers/active-trucker-offers.component';
import { ArchiveOffersComponent } from './pages/cabinet/user-actions/archive-trucker-offers/archive-trucker-offers.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CreateConsignorOfferComponent } from './pages/cabinet/user-actions/create-consignor-offer/create-consignor-offer.component';
import { ActiveConsignorOffersComponent } from './pages/cabinet/user-actions/active-consignor-offers/active-consignor-offers.component';
import { ArchiveConsignorOffersComponent } from './pages/cabinet/user-actions/archive-consignor-offers/archive-consignor-offers.component';
import { TruckerExchangeComponent } from './pages/cabinet/trucker-exchange/trucker-exchange.component';
import { YouTruckerOffersComponent } from './pages/cabinet/messages/you-trucker-offers/you-trucker-offers.component';
import { OthersTruckerOffersComponent } from './pages/cabinet/messages/others-trucker-offers/others-trucker-offers.component';
import { OthersConsignorOffersComponent } from './pages/cabinet/messages/others-consignor-offers/others-consignor-offers.component';
import { YourConsignorOffersComponent } from './pages/cabinet/messages/your-consignor-offers/your-consignor-offers.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSettingsComponent } from './pages/cabinet/user-info/user-settings/user-settings.component';

import { CarsSettingsComponent } from './pages/cabinet/user-info/user-settings/cars-settings/cars-settings.component';
import { CompanySettingsComponent } from './pages/cabinet/user-info/user-settings/company-settings/company-settings.component';
import { ProfileSettingsComponent } from './pages/cabinet/user-info/user-settings/profile-settings/profile-settings.component';






@NgModule({
 
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    KontaktyComponent,
    LoginComponent,
    RegisterComponent,
    CabinetComponent,
    TruckerComponent,
    ConsignorComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserActionsComponent,
    ExchangeComponent,
    MessagesComponent,
    UserInfoComponent,
    CreateOfferComponent,
    ActiveOffersComponent,
    ArchiveOffersComponent,
    CreateConsignorOfferComponent,
    ActiveConsignorOffersComponent,
    ArchiveConsignorOffersComponent,
    TruckerExchangeComponent,
    YouTruckerOffersComponent,
    OthersTruckerOffersComponent,
    OthersConsignorOffersComponent,
    YourConsignorOffersComponent, 
    CarsSettingsComponent,
    CompanySettingsComponent,
    ProfileSettingsComponent,
    UserSettingsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-left',}),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp( environment.firebaseConfig )),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage()),
    provideAuth(() => getAuth()),
    GooglePlaceModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
