
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {
    let tok = localStorage.getItem('token_accessToken');
    this.accessToken = tok === null || tok === undefined ? '' : tok;
    tok = localStorage.getItem('token_refreshToken');
    this.refreshToken = tok === null || tok === undefined ? '' : tok;
  }

  private accessToken = '';
  private refreshToken = '';

  setAccessToken(tok: string) {
    this.accessToken = tok;
    localStorage.setItem('token_accessToken', tok);
  }

  setRefreshToken(tok: string) {
    this.refreshToken = tok;
    localStorage.setItem('token_refreshToken', tok);
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  isLoggedIn(): boolean {
    if (this.accessToken === '' || this.refreshToken === '') {
      return false;
    }

    return true;
  }
}
