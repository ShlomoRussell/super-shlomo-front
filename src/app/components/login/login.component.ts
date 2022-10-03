import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginCredentials } from 'src/app/models/credential.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public credentials = new LoginCredentials();
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public login(): void {
    this.auth
      .login(this.credentials)
      .pipe(
        tap((res) =>
          window.localStorage.setItem(
            environment.jwtLocalStorageKey,
            res.token!
          )
        )
      )
      .subscribe((res) => {
        this.router.navigate(['/']);
        this.auth.setLoggedIn()
        this.auth.setUser(res)
      });
  }
}
