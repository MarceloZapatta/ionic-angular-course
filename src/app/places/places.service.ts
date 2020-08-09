import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Sorocaba',
      'Terra rasgada',
      'https://agencia.sorocaba.sp.gov.br/wp-content/uploads/2018/10/2007-06-01-paco-municipal-ft-zaqueu-proenca-53.jpg',
      89.9,
      new Date('2019-01-01'),
      new Date('2022-01-01'),
      'abc'
    ),
    new Place(
      'p2',
      'Votorantim',
      'Terra da capivara',
      'https://i.ytimg.com/vi/RGjt28vX6bY/maxresdefault.jpg',
      45.9,
      new Date('2019-01-01'),
      new Date('2022-01-01'),
      'abc'
    ),
    new Place(
      'p3',
      'Itu',
      'Cidade grande',
      'https://itu.sp.gov.br/wp-content/uploads/2017/03/orelhao-300x300.jpg',
      70.9,
      new Date('2019-01-01'),
      new Date('2022-01-01'),
      'abc'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      '',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    this._places.pipe(take(1)).subscribe((places) => {
      this._places.next(places.concat(newPlace));
    });
  }
}
