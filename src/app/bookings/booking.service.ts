import { Injectable } from '@angular/core';

import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface BookingData {
  placeId: string;
  userId: string;
  placeTitle: string;
  placeImage: string;
  firstName: string;
  lastName: string;
  guestNumber: number;
  bookedFrom: Date;
  bookedTo: Date;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookins = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookins.asObservable();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  fetchBookings() {
    return this.httpClient
      .get<{ [key: string]: BookingData }>(
        `/api/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
      )
      .pipe(
        map((response) => {
          const bookings = [];

          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  response[key].placeId,
                  response[key].userId,
                  response[key].placeTitle,
                  response[key].placeImage,
                  response[key].firstName,
                  response[key].lastName,
                  +response[key].guestNumber,
                  new Date(response[key].bookedFrom),
                  new Date(response[key].bookedTo)
                )
              );
            }
          }

          return bookings;
        }),
        tap((bookings) => {
          this._bookins.next(bookings);
        })
      );
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;

    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );

    return this.httpClient
      .post<{ name: string }>('/api/bookings.json', { ...newBooking, id: null })
      .pipe(
        switchMap((response) => {
          generatedId = response.name;

          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          newBooking.id = generatedId;
          this._bookins.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string) {
    return this.httpClient.delete(`/api/bookings/${bookingId}.json`).pipe(
      switchMap(() => {
        return this.bookings;
      }),
      take(1),
      tap((bookings) => {
        return this._bookins.next(bookings.filter((b) => b.id !== bookingId));
      })
    );
  }
}
