import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/credential.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private token = new BehaviorSubject<boolean>(false);
  public getToken = this.token.asObservable();
  public setToken(token: boolean) {
    this.token.next(token);
  }
  private user = new BehaviorSubject<User>(new User());

  public getUser = this.user.asObservable();

  public setUser(newUser: User) {
    return this.user.next(newUser);
  }

  private isLoggedIn = new BehaviorSubject(
    !!localStorage.getItem(environment.jwtLocalStorageKey)
  );

  public getLoggedIn = this.isLoggedIn.asObservable();

  public setLoggedIn() {
    return this.isLoggedIn.next(
      !!localStorage.getItem(environment.jwtLocalStorageKey)
    );
  }
  public checkIfTeudatZehutExists(teudatZehut: Number) {
    return this.httpClient.post<boolean>(
      `${environment.baseUrl}/auth/checkForTeudatZehut`,
      {
        teudatZehut,
      }
    );
  }
  public login(credentials: LoginCredentials): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.baseUrl}/auth/login`,
      credentials
    );
  }
  public logOut() {
    localStorage.removeItem(environment.jwtLocalStorageKey);
    this.user.next(new User());
    this.setToken(false)
    this.isLoggedIn.next(false);
  }
  public register(credentials: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.baseUrl}/auth/register`,
      credentials
    );
  }

  public checkToken(): Observable<User> {
    return this.httpClient.get(`${environment.baseUrl}/auth/checkToken`);
  }
}
