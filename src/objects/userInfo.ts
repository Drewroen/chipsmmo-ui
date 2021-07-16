import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo {
  username: string;
  elo: number;
  verified: boolean;

  constructor() {
    this.username = null;
    this.elo = null;
    this.verified = null;
  }

  setUserInfo(userInfo: UserInfo)
  {
    this.username = userInfo?.username;
    this.elo = userInfo?.elo;
    this.verified = userInfo?.verified;
  }

  getUserName(): string {
    return this.username ? this.username : 'Chip';
  }
}
