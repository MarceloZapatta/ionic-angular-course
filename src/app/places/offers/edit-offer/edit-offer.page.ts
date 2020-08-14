import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  isLoading = false;
  placeId: string;
  private placeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeId = paramMap.get('placeId');

      this.isLoading = true;

      this.placeSubscription = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          (placeFinded) => {
            this.place = placeFinded;

            this.form = new FormGroup({
              title: new FormControl(this.place.title, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
              description: new FormControl(this.place.description, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
            });

            this.isLoading = false;
          },
          (error) => {
            this.alertController
              .create({
                header: 'Um erro ocorreu',
                message:
                  'Lugar não pode ser encontrado. Por favor tente novamente mais tarde',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/places/tabs/offers']);
                    },
                  },
                ],
              })
              .then((alertElement) => {
                alertElement.present();
              });
          }
        );
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingController
      .create({
        message: 'Updating places...',
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.placesService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingElement.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
          });
      });
    this.placesService
      .updatePlace(
        this.place.id,
        this.form.value.title,
        this.form.value.description
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe();
  }
}
