import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective, GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';



import { ICar } from 'src/app/shared/interfaces/car-interface';
import { TruckerOffersService } from 'src/app/shared/services/offers/trucker-offers.service';
import { CarsSettingsService } from 'src/app/shared/services/settings/cars-settings/cars-settings.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  public offerForm !: FormGroup;
  public carList !: ICar[];
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  
   
  constructor(private fb: FormBuilder,
    private carService: CarsSettingsService,
    private offersSrvice: TruckerOffersService,
    private google :GooglePlaceModule) { }


  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;

  public handleAddressChange(address: Address) {
    console.log(address.formatted_address);


  }

  
  
  ngOnInit(): void {
    this.initlist();
    this.initForm();
    this.initCarList();
  }
  
  public qqq() : any {
    return  {
      types: ['country'],
      
    }
  }
  initForm(): void {
    this.offerForm = this.fb.group({
      loadingCountry: [null, Validators.required],
      loadingCity: [null, Validators.required],
      loadingStreet: [null, Validators.required],
      loadingDate: [null, Validators.required],
      loadingTime: [null, Validators.required],
      unloadingCountry: [null, Validators.required],
      unloadingCity: [null, Validators.required],
      unloadingStreet: [null, Validators.required],
      unloadingDate: [null, Validators.required],
      uploadingTime: [null, Validators.required],
      car: [null, Validators.required],
      price: [null, Validators.required],
      userId: [this.currentUserId],
      status: ['in-work'],
      date: [new Date]
    })
  }

  initCarList(): void {
    // this.carService.getCars(this.currentUserId).then(data => {
    //   data.forEach(user => {
    //     this.carList = user.data().cars;
    //   });
    // })
  }

  initlist(): void {
    this.offersSrvice.getAllFB().subscribe(data => {

    })
  }

  saveOffer(): void {
    this.offersSrvice.saveOffer(this.offerForm.value).then(data => {

    })
  }
}
