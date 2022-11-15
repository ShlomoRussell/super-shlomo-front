import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private token = false;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    const tokenSub = this.authService.getToken.subscribe(res => {
      this.token = res;
      tokenSub.unsubscribe();
    })
    if (this.token) {
      const result = this.authService
        .checkToken()
        .subscribe({
          next: (res) => {
            this.authService.setUser(res)
            result.unsubscribe();
          },
          error(err) { },
        })
    }
  }
  title = 'client';
}
