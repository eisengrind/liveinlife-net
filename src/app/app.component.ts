import { Component, OnInit } from '@angular/core';
import { TokenService } from './token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    if (this.tokenService.getAccessToken() === '') {
      this.router.navigate(['login'], {});
    }
  }
}
