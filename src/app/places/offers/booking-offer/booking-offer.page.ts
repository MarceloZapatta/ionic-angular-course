import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../places.model';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-booking-offer',
  templateUrl: './booking-offer.page.html',
  styleUrls: ['./booking-offer.page.scss']
})
export class BookingOfferPage implements OnInit {
  place: Place;

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, private placesService: PlacesService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }

      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }
}
