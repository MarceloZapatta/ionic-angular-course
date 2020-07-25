import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.loadingController.create({keyboardClose: true, message: 'Loggin in...'})
      .then(loadingEl => {
        loadingEl.present();
      });
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.loadingController.dismiss();
      this.router.navigateByUrl('/places/tabs/discover');
    }, 1000);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
