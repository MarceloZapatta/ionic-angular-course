import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-booking-offer',
  templateUrl: './booking-offer.page.html',
  styleUrls: ['./booking-offer.page.scss']
})
export class BookingOfferPage implements OnInit {
  constructor(private navController: NavController) {}

  ngOnInit() {}

  onBookOffer() {
    this.navController.navigateBack('/places/tabs/offers');
  }
}
