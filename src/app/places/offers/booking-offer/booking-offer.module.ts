import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingOfferPageRoutingModule } from './booking-offer-routing.module';

import { BookingOfferPage } from './booking-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingOfferPageRoutingModule
  ],
  declarations: [BookingOfferPage]
})
export class BookingOfferPageModule {}
