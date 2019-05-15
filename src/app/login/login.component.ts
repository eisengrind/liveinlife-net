import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPair, Problem } from '../api';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { FormControl, Validators, ValidatorFn, AbstractControl, Validator } from '@angular/forms';

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

  nameValidator = new FormControl({
    value: '',
    disabled: false
  }, [Validators.required, this.invalidNameValidator()]);
  private nameInvalid = false;

  passwordValidator = new FormControl('', [Validators.required, this.invalidPasswordValidator()]);
  private passwordInvalid = false;

  loading = false;
  submitDisabled = false;

  onNameChanged() {
    this.nameInvalid = false;
    this.nameValidator.updateValueAndValidity();
  }

  onPasswordChanged() {
    this.passwordInvalid = false;
    this.passwordValidator.updateValueAndValidity();
  }

  private invalidNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return this.nameInvalid ? {invalidName: true} : null;
    };
  }

  private invalidPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return this.passwordInvalid ? {invalidPassword: true} : null;
    };
  }

  private setLoading(v: boolean) {
    this.loading = v;
    if (v) {
      this.nameValidator.disable();
      this.passwordValidator.disable();
    } else {
      this.nameValidator.enable();
      this.passwordValidator.enable();
    }
  }

  onRecaptchaResolved(response: string) {
    this.recaptchaResponse = response;
    this.submitDisabled = false;
  }

  onSubmit() {
    this.setLoading(true);
    if (this.recaptchaNeeded) {
      this.authService.recaptchaLogin(
        this.recaptchaResponse,
        {
          name: this.nameValidator.value,
          password: this.passwordValidator.value
        },
        'response',
        false
      ).toPromise().catch((v: HttpErrorResponse) => {
        if (v.status === 500) {
          const errMsg = v.error as Problem;
          if (errMsg.detail === 'crypto/bcrypt: hashedPassword is not the hash of the given password') {
            this.passwordInvalid = true;
            this.submitDisabled = true;
            this.passwordValidator.setErrors({
              invalidPassword: true
            });
            grecaptcha.reset(0);
            grecaptcha.reset(1);
          }
        }
      }).then((v: HttpResponse<TokenPair>) => {
        this.tokenService.setAccessToken(v.body.access_token);
        this.tokenService.setRefreshToken(v.body.refresh_token);
      }).finally(() => {
        this.setLoading(false);
      });
    } else {
      this.authService.login({
        name: this.nameValidator.value,
        password: this.passwordValidator.value
      }, 'response', false).toPromise().catch((v: HttpErrorResponse) => {
        if (v.status === 425) {
          this.recaptchaNeeded = true;
          this.submitDisabled = true;
        } else if (v.status === 500) {
          const errMsg = v.error as Problem;
          if (errMsg.detail === 'crypto/bcrypt: hashedPassword is not the hash of the given password') {
            this.passwordValidator.setErrors({
              invalidPassword: true
            });
            this.passwordInvalid = true;
          }
        }
      }).then((v: HttpResponse<TokenPair>) => {
        this.tokenService.setAccessToken(v.body.access_token);
        this.tokenService.setRefreshToken(v.body.refresh_token);
      }).finally(() => {
        this.setLoading(false);
      });
    }
  }
}
