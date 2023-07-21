import { HttpClient, json } from "aurelia";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class AuthService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  get tokenInterceptor() {
    return {
      request(request) {
        const token = window.localStorage.getItem("token");
        if (token) {
          request.headers.append("authorization", `Bearer ${token}`);
        }
        return request;
      },
    };
  }

  public logIn(userName, password) {
    return this.http
      .post("/auths/login", json({ email: userName, password }))
      .then((response) => response.json())
      .then((tokenResult) => {
        if (tokenResult.success)
          window.localStorage.setItem("token", tokenResult.token);
        return tokenResult;
      })
      .catch((error) => {
        console.log("Error retrieving token", error);
      });
  }

  public logOut(): void {
    window.localStorage.removeItem("token");
  }

  public isLoggedIn(): boolean {
    return !!window.localStorage.getItem("token");
  }
}
