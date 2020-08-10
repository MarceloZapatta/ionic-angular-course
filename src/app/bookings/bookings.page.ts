import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingsSubscription: Subscription;

  constructor(
    private bookingsService: BookingService
  ) {}

  ngOnInit() {
    this.bookingsSubscription = this.bookingsService.bookings.subscribe(
      (bookings) => {
        this.loadedBookings = bookings;
      }
    );
  }

  ngOnDestroy() {
    if (this.bookingsSubscription) {
      this.bookingsSubscription.unsubscribe();
    }
  }

  onCancelBooking(offerId: string, itemSlidingEl: IonItemSliding) {
    itemSlidingEl.close();

    // Cancel booking with id offer
  }
}
