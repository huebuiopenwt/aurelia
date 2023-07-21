import { inject } from "aurelia-framework";
import { AuthService } from "../../../services/auth.service";
import { IRouteableComponent, IRouter } from "@aurelia/router";
import "./login.scss";

export type LoginParams = {
  email: string;
  password: string;
};

@inject(AuthService, IRouter)
export class Login implements IRouteableComponent {
  public model: LoginParams = {
    email: "",
    password: "",
  };

  constructor(
    private authService: AuthService,
    @IRouter private router: IRouter
  ) {
    this.authService = authService;
    this.router = router;
  }

  public handleLogin(): void {
    this.authService
      .logIn(this.model.email, this.model.password)
      .then(async (tokenResult) => {
        localStorage.setItem("token", tokenResult?.token);
        if (tokenResult?.token) {
          await this.router.load("/profiles");
        } else {
          console.log("Error login");
        }
      });
  }
}
