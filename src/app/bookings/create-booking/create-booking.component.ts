import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: true }) form: NgForm;
  startDate: string;
  endDate: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() - 604800000 - availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              5184000000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onClose() {
    this.modalController.dismiss(null, 'cancel');
  }

  onBookPlace() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }

    this.modalController.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          numberGuests: +this.form.value['number-guests'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to']),
        },
      },
      'confirm'
    );
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;
  }
}
