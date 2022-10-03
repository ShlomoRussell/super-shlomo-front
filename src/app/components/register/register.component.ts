import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user = new User();
  public isFirstScreen = true;
  public isSecondScreen = false;
  public displayError!: string;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void { }
  
  public goBack() {
    this.isFirstScreen = !this.isFirstScreen;
    this.isSecondScreen = !this.isSecondScreen;
  }
  public next() {
    this.auth.checkIfTeudatZehutExists(this.user.teudatZehut!).subscribe({
      next: (res) => {
        this.isSecondScreen = res;
        this.isFirstScreen = !res;
      },
      error: (error) => {
        if (error.status === 409) this.displayError = error.error;
      },
    });
  }
  public register(): void {
    this.auth
      .register(this.user)
      .pipe(
        tap((res) =>
          window.localStorage.setItem(
            environment.jwtLocalStorageKey,
            res.token!
          )
        )
      )
      .subscribe((res) => this.router.navigate(['/login']));
  }
}
