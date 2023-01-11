import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, from } from "rxjs";
import { User } from "./user.model";
import { map, tap } from "rxjs/operators";
import { Storage } from "@capacitor/core";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user
      .asObservable()
      .pipe(map((user) => (user ? !!user.token : false)));
  }

  get userId() {
    return this._user
      .asObservable()
      .pipe(map((user) => (user ? user.id : null)));
  }

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          token: string;
          tokenExpirationDate: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }

        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );

        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
    Storage.remove({ key: "authData" });
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );

    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );

    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({ userId, token, tokenExpirationDate, email });
    Storage.set({ key: "authData", value: data });
  }
}
