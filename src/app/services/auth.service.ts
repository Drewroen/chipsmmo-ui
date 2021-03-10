import { environment } from '../../environments/environment';
import { UserInfo } from "../../objects/userInfo";
import { Token } from "../../objects/token";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<Token>(environment.socketUrl + "/login", { username, password });
  }

  getNewAccessToken() {
    return this.http.post<Token>(environment.socketUrl + "/token", {
      token: localStorage.getItem("refresh_token"),
    });
  }

  createAccount(username: string, password: string, email: string) {
    return this.http.post<Object>(environment.socketUrl + "/account", { username, password, email });
  }

  getInfo() {
    return this.http.get<UserInfo>(environment.socketUrl + "/info", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + localStorage.getItem("access_token")
      )
    });
  }

  logout() {
    return this.http.delete(environment.socketUrl + "/logout", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + localStorage.getItem("access_token")
      )
    });
  }
}
