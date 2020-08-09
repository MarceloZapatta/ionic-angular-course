import { Injectable } from '@angular/core';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  public offers: Place[];
  private placesSubscription: Subscription;

  constructor(private placesService: PlacesService) { 
    this.placesSubscription = this.placesService.places.subscribe((places) => {
      this.offers = places;
    });
  }
}
