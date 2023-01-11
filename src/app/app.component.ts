import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Plugins, Capacitor } from "@capacitor/core";

import { AuthService } from "./auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (Capacitor.isPluginAvailable("SplashScreen")) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth");
  }

  ngOnInit(): void {
    this.authSub = this.authService.userIsAuthenticated.subscribe((isAuth) => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl("/auth");
      }

      this.previousAuthState = isAuth;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
