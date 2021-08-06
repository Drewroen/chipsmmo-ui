import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo {
  username: string;
  elo: number;
  verified: boolean;
  banned: boolean;
  email: string;

  constructor() {
    this.username = null;
    this.banned = null;
    this.elo = null;
    this.verified = null;
    this.email = null;
  }

  setUserInfo(userInfo: UserInfo)
  {
    this.username = userInfo?.username;
    this.elo = userInfo?.elo;
    this.verified = userInfo?.verified;
    this.banned = userInfo?.banned;
    this.email = userInfo?.email;
  }

  resetUserInfo()
  {
    this.username = null;
    this.banned = null;
    this.elo = null;
    this.verified = null;
    this.email = null;
  }

  getUserName(): string {
    return this.username ? this.username : 'Chip';
  }
}
