import { environment } from '../../environments/environment';
import { UserInfo } from "../../objects/userInfo";
import { Token } from "../../objects/token";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(username: string, password: string) {
    return await this.http.post<Token>(environment.apiUrl + "/Account/login", { username, password }).toPromise();
  }

  async getNewAccessToken() {
    return await this.http.post<Token>(environment.apiUrl + "/Account/token", {
      token: localStorage.getItem("refresh_token"),
    }).toPromise();
  }

  async createAccount(username: string, password: string, email: string) {
    return await this.http.post<Object>(environment.apiUrl + "/Account/new-account", { username, password, email }).toPromise();
  }

  async getInfo() {
    return await this.http.get<UserInfo>(environment.apiUrl + "/Account/info", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + localStorage.getItem("access_token")
      )
    }).toPromise();
  }

  async logout() {
    return await this.http.delete(environment.apiUrl + "/Account/logout", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + localStorage.getItem("access_token")
      )
    }).toPromise();
  }
}
