import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingOfferPage } from './booking-offer.page';

describe('BookingOfferPage', () => {
  let component: BookingOfferPage;
  let fixture: ComponentFixture<BookingOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOfferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
