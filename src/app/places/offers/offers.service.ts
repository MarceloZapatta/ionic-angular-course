import { Injectable } from '@angular/core';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  public offers: Place[];

  constructor(private placesService: PlacesService) { 
    this.offers = this.placesService.places;
  }
}
