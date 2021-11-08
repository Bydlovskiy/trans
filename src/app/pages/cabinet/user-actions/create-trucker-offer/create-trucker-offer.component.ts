import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective, GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ICar } from 'src/app/shared/interfaces/car-interface';
import { TruckerOffersService } from 'src/app/shared/services/offers/trucker-offers.service';
import { CarsSettingsService } from 'src/app/shared/services/settings/cars-settings/cars-settings.service';

@Component({
  selector: 'app-create-trucker-offer',
  templateUrl: './create-trucker-offer.component.html',
  styleUrls: ['./create-trucker-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  public offerTruckerForm !: FormGroup;


  public carList !: ICar[];
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;
  public selectedValue = null;
  constructor(private fb: FormBuilder,
    private carService: CarsSettingsService,
    private offersSrvice: TruckerOffersService) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;

  public loadingCountryChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerTruckerForm.patchValue({
        loadingCountry: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'country'
      }))
      this.offerTruckerForm.patchValue({
        loadingCountry: country[0].long_name
      })
    }
  }

  public loadingCityChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerTruckerForm.patchValue({
        loadingCity: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'locality'
      }))
      this.offerTruckerForm.patchValue({
        loadingCity: country[0].long_name
      })
    }
  }

  public unloadingCountryChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerTruckerForm.patchValue({
        unloadingCountry: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'country'
      }))
      this.offerTruckerForm.patchValue({
        unloadingCountry: country[0].long_name
      })
    }
  }

  public unloadingCityChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerTruckerForm.patchValue({
        unloadingCity: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'locality'
      }))
      this.offerTruckerForm.patchValue({
        unloadingCity: country[0].long_name
      })
    }
  }

  ngOnInit(): void {
    this.initTruckerForm();
    this.initCarList();
  }


  initTruckerForm(): void {
    this.offerTruckerForm = this.fb.group({
      loadingCountry: [null, Validators.required],
      loadingCity: [null, Validators.required],
      loadingDate: [null, Validators.required],
      unloadingCountry: [null, Validators.required],
      unloadingCity: [null, Validators.required],
      unloadingDate: [null, Validators.required],
      car: [null, Validators.required],
      price: [null, Validators.required],
      userId: [this.currentUserId],
      status: [null, Validators.required],
      date: [null, Validators.required],
      id : [null,Validators.required]
    })
  }

 

  initCarList(): void {
    this.carService.getCars(this.currentUserId).then(data => {
      this.carList = []
      data.forEach(car => {
        this.carList.push(car.data() as ICar)
      });
    })
  }

  saveTruckerOffer(): void {
    this.offerTruckerForm.patchValue({
      status: 'generated',
      date: new Date,
      id : ''
    })
    this.offersSrvice.saveOffer(this.offerTruckerForm.value).then(data => {
      this.offerTruckerForm.reset()
    })
  }
}
