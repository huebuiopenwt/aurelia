import { IRouteableComponent, IRoute } from "@aurelia/router";
import { Login } from "./modules/auth/login/login";
import { Profiles } from "./modules/profiles/list/profiles";
import { CreateProfile } from "./modules/profiles/create/create-profile";
import { AuthService } from "./services/auth.service";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia";
import { environment } from "../environments/environment";

@inject(AuthService, HttpClient)
export class App implements IRouteableComponent {
  static routes: IRoute[] = [
    {
      path: ["", "login"],
      component: Login,
      title: "Login",
    },
    {
      path: ["/profiles"],
      component: Profiles,
      title: "Profiles",
    },
    {
      path: ["/create"],
      component: CreateProfile,
      title: "Create profile",
    },
  ];

  constructor(private authService: AuthService, http: HttpClient) {
    this.authService = authService;
    const baseUrl = `${environment.apiUrl}`;

    http.configure((config) =>
      config
        .withBaseUrl(baseUrl)
        .withInterceptor(this.authService.tokenInterceptor)
    );
  }
}
