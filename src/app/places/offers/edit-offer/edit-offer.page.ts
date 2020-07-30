import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }

      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
    console.log(this.place);
    this.form = new FormGroup({
      title: new FormControl(this.place.title, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.place.description, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(this.place.price, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      imageUrl: new FormControl(this.place.imageUrl, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  save() {
    console.log('Fui salvo!');
    console.log(this.form.value);
  }
}
