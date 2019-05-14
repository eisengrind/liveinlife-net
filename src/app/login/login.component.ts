import { Component } from '@angular/core';
import { AuthService, TokenPair, Problem } from '../api';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private tokenService: TokenService) {}

  recaptchaResponse: string;
  hidePassword = true;
  recaptchaNeeded = false;

  credentialsInvalid = false;

  name = '';
  password = '';

  loading = false;
  submitDisabled = false;

  onRecaptchaResolved(response: string) {
    this.recaptchaResponse = response;
    this.submitDisabled = false;
  }

  onSubmit() {
    this.loading = true;
    if (this.recaptchaNeeded) {
      this.authService.recaptchaLogin(
        this.recaptchaResponse,
        {
          name: this.name,
          password: this.password
        },
        'response',
        false
      ).toPromise().catch((v: HttpErrorResponse) => {
        if (v.status === 500) {
          const errMsg = v.error as Problem;
          if (errMsg.detail === 'crypto/bcrypt: hashedPassword is not the hash of the given password') {
            this.credentialsInvalid = true;
            this.submitDisabled = true;
            grecaptcha.reset();
          }
        }
      }).then((v: HttpResponse<TokenPair>) => {
        this.tokenService.setAccessToken(v.body.access_token);
        this.tokenService.setRefreshToken(v.body.refresh_token);
      }).finally(() => {
        this.loading = false;
      });
    } else {
      this.authService.login({
        name: this.name,
        password: this.password
      }, 'response', false).toPromise().catch((v: HttpErrorResponse) => {
        if (v.status === 425) {
          this.recaptchaNeeded = true;
          this.submitDisabled = true;
        } else if (v.status === 500) {
          const errMsg = v.error as Problem;
          if (errMsg.detail === 'crypto/bcrypt: hashedPassword is not the hash of the given password') {
            this.credentialsInvalid = true;
          }
        }
      }).then((v: HttpResponse<TokenPair>) => {
        this.tokenService.setAccessToken(v.body.access_token);
        this.tokenService.setRefreshToken(v.body.refresh_token);
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
