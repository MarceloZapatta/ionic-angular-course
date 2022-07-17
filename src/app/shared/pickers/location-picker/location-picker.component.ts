import { HttpClient } from "@angular/common/http";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from "@ionic/angular";

import { MapModalComponent } from "../../map-modal/map-modal.component";
import { environment } from "../../../../environments/environment";
import { map, switchMap } from "rxjs/operators";
import { Coordinates, PlaceLocation } from "src/app/places/location.model";
import { of } from "rxjs";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onPickLocation() {
    this.actionSheetCtrl.create({
      header: "Plase Choose",
      buttons: [
        {
          text: "Auto-Locate",
          handler: () => this.locateUser(),
        },
        {
          text: "Pick on Map",
          handler: () => this.openMap(),
        },
        {
          text: "Cancel",
          handler: () => {},
        },
      ],
    });
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      this.showErrorAlert();
      return;
    }
    this.isLoading = true;
    Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        const coordinates: Coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };

        this.createPlace(coordinates.lat, coordinates.lng);
      })
      .catch((err) => {})
      .finally(() => {
        this.isLoading = false;
      });
  }

  private showErrorAlert() {
    this.alertCtrl
      .create({
        header: "Could not fetch location",
        message: "Please use the map to pick a location!",
        buttons: ['OK']
      })
      .then((alert) => alert.present());
  }

  openMap() {
    this.modalCtrl.create({ component: MapModalComponent }).then((modalEl) => {
      modalEl.onDidDismiss().then((modalData) => {
        if (!modalData.data) {
          return;
        }
        const coordinates: Coordinates = {
          lat: modalData.data.lat,
          lng: modalData.data.lng,
        };
        this.createPlace(coordinates.lat, coordinates.lng);
      });
      modalEl.present();
    });
  }

  private createPlace(lat: number, lng: number) {
    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null,
    };

    this.isLoading = true;
    this.getAddress(lat, lng)
      .pipe(
        switchMap((address) => {
          pickedLocation.address = address;
          return of(
            this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe((staticMapImageUrl: any) => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map((geoData: any) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }

          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:blue%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }
}
