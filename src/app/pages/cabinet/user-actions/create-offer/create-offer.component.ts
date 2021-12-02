import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { ICar } from 'src/app/shared/interfaces/car-interface';
import { OffersService } from 'src/app/shared/services/offers/offers.service';
import { CarsSettingsService } from 'src/app/shared/services/settings/cars-settings/cars-settings.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  public offerConsignorForm !: FormGroup;
  public offerTruckerForm !: FormGroup;
  public carList !: ICar[];
  public selectedValue = null;
  public submitted = false;
  public user = JSON.parse(localStorage.getItem('user') as string);
  constructor(private fb: FormBuilder,
    private offerService: OffersService,
    private carService: CarsSettingsService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;

  public loadingCountryChange(address: Address) {
    if (this.user.role == 'consignor') {
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
    } else if (this.user.role == 'trucker') {
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
  }

  public loadingCityChange(address: Address) {
    if (this.user.role == 'consignor') {
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
    } else if (this.user.role == 'trucker') {
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
  }

  public unloadingCountryChange(address: Address) {
    if (this.user.role == 'consignor') {
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
    } else if (this.user.role == 'trucker') {
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
  }

  public unloadingCityChange(address: Address) {
    if (this.user.role == 'consignor') {
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
    } else if (this.user.role == 'trucker') {
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
  }


  ngOnInit(): void {
    this.checkRole();
  }

  private checkRole(): void {
    if (this.user.role == 'trucker') {
      this.initTruckerForm();
      this.initCarList();
    } else if (this.user.role == 'consignor') {
      this.initConsignorForm();
    }
  }

  private initTruckerForm(): void {
    this.offerTruckerForm = this.fb.group({
      loadingCountry: [null, [Validators.required,Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      loadingCity: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      loadingDate: [null, Validators.required],
      unloadingCountry: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      unloadingCity: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      unloadingDate: [null, Validators.required],
      car: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      userId: [this.user.id],
      status: [null],
      date: [null],
      id: [null],
      respondedUsersId: [[]],
      notifitaionId: [null]
    })
  }

  private initConsignorForm(): void {
    this.offerConsignorForm = this.fb.group({
      loadingCountry: [null, [Validators.required,Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      loadingCity: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      loadingDate: [null, Validators.required],
      unloadingCountry: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      unloadingCity: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      unloadingDate: [null, Validators.required],
      cargo: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯЁЇїІіЄєҐґ\s]{2,}$/)]],
      price: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      weight: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      userId: [this.user.id],
      status: [null],
      date: [null],
      id: [null],
      respondedUsersId: [[]],
      notifitaionId: [null]
    })
  }

  private initCarList(): void {
    this.carService.getCars(this.user.id).then(data => {
      this.carList = []
      data.forEach(car => {
        this.carList.push(car.data() as ICar)
      });
    })
  }

  public saveOffer(): void {
    this.submitted = true;
    if (this.user.role == 'trucker') {
      if (this.offerTruckerForm.valid) {
        this.offerTruckerForm.patchValue({
          status: 'generated',
          date: new Date,
          id: ''
        })
        this.offerService.saveOffer(this.offerTruckerForm.value, this.user.role).then(() => {
          this.router.navigate(['/cabinet/user-actions/active-offers'])
          this.offerTruckerForm.reset();
          this.toastr.success('Пропозицію додано успішно')
        })
      } else {
        this.toastr.error('Заповніть правильно форму')
      }
    } else if (this.user.role = 'consignor') {
      if (this.offerConsignorForm.valid) {
        this.offerConsignorForm.patchValue({
          status: 'generated',
          date: new Date,
          id: ''
        })
        this.offerService.saveOffer(this.offerConsignorForm.value, this.user.role).then(() => {
          this.router.navigate(['/cabinet/user-actions/active-offers']);
          this.offerConsignorForm.reset();
          this.toastr.success('Пропозицію додано успішно')
        })
      } else {
        this.toastr.error('Заповніть правильно форму')
      }
    }
  }

  get validation(): { [key: string]: AbstractControl } {
    if (this.user.role == 'trucker') {
      return this.offerTruckerForm.controls;
    } else {
      return this.offerConsignorForm.controls;
    }
  }


}
