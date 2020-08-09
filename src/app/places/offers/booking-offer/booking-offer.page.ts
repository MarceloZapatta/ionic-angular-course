import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../places.model';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-offer',
  templateUrl: './booking-offer.page.html',
  styleUrls: ['./booking-offer.page.scss'],
})
export class BookingOfferPage implements OnInit, OnDestroy {
  place: Place;
  private placeSubscription: Subscription;

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

      this.placeSubscription = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe((placeFinded) => {
          this.place = placeFinded;
        });
    });
  }

  ngOnDestroy() {
    if (this.placeSubscription) {
      this.placeSubscription.unsubscribe();
    }
  }
}
