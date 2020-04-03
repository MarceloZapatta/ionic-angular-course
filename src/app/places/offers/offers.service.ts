import { Injectable } from '@angular/core';
import { Offer } from './offers.model';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private places: Place[];
  public offers: Offer[];

  constructor(private placesService: PlacesService) { 
    this.places = this.placesService.places;

    this.offers = [
      new Offer(
        'o1', 
        'Hotel maravilha', 
        'Este hotel tem uma bela vista.',
        'https://www.ahstatic.com/photos/9399_ho_00_p_1024x768.jpg',
        this.places[0]),
      new Offer(
        'o2', 
        'Pousada papagaio', 
        'Cheio de periquitos.',
        'https://pousadavivamar.com.br/wp-content/uploads/2019/06/WEB-PousadaVivamar-166-e1567982987303.jpg',
        this.places[0]),
      new Offer(
        'o3', 
        'Hostel', 
        'Opção amigável :D.',
        'https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg',
        this.places[2])
    ]
  }
}
