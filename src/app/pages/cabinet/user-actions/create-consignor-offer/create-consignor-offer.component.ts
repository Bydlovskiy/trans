import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ConsignorOffersService } from 'src/app/shared/services/offers/consignor-offers.service';

@Component({
  selector: 'app-create-consignor-offer',
  templateUrl: './create-consignor-offer.component.html',
  styleUrls: ['./create-consignor-offer.component.scss']
})
export class CreateConsignorOfferComponent implements OnInit {
  public offerConsignorForm !: FormGroup;
  private currentUserId = JSON.parse(localStorage.getItem('user') as string).id;

  constructor(private fb: FormBuilder,
              private consignorOfferService : ConsignorOffersService) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;

  public loadingCountryChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerConsignorForm.patchValue({
        loadingCountry: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'country'
      }))
      this.offerConsignorForm.patchValue({
        loadingCountry: country[0].long_name
      })
    }
  }

  public loadingCityChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerConsignorForm.patchValue({
        loadingCity: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'locality'
      }))
      this.offerConsignorForm.patchValue({
        loadingCity: country[0].long_name
      })
    }
  }

  public unloadingCountryChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerConsignorForm.patchValue({
        unloadingCountry: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'country'
      }))
      this.offerConsignorForm.patchValue({
        unloadingCountry: country[0].long_name
      })
    }
  }

  public unloadingCityChange(address: Address) {
    if (address.address_components === undefined) {
      this.offerConsignorForm.patchValue({
        unloadingCity: address.name
      })
    } else {
      let country = (address.address_components.filter(function (elem) {
        return elem.types[0] == 'locality'
      }))
      this.offerConsignorForm.patchValue({
        unloadingCity: country[0].long_name
      })
    }
  }


  ngOnInit(): void {
    this.initConsignorForm();
  }


  initConsignorForm(): void {
    this.offerConsignorForm = this.fb.group({
      loadingCountry: [null, Validators.required],
      loadingCity: [null, Validators.required],
      loadingDate: [null, Validators.required],
      unloadingCountry: [null, Validators.required],
      unloadingCity: [null, Validators.required],
      unloadingDate: [null, Validators.required],
      cargo: [null, Validators.required],
      price: [null, Validators.required],
      weight: [null,Validators.required],
      userId: [this.currentUserId],
      status: [null, Validators.required],
      date: [null, Validators.required],
      id : [null,Validators.required],
      respondedUsersId : [[]]
    })
  }

  saveConsignorOffer() : void {
    this.offerConsignorForm.patchValue({
      status: 'generated',
      date: new Date,
      id : ''
    })
    this.consignorOfferService.saveOffer(this.offerConsignorForm.value).then(() => {
      this.offerConsignorForm.reset()
    })
  }

}
