import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private _bookins: Booking[] = [
        {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Manson',
            guestNumber: 2,
            userId: 'abc'
        }
    ];

    get bookings() {
        return [...this._bookins];
    }
}
