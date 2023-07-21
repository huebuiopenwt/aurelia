import { inject } from "aurelia-framework";
import { Redirect } from "aurelia-router";
import { AuthService } from "../../../services/auth.service";

@inject(AuthService)
export class AuthorizeStep {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  run(navigationInstruction, next) {
    if (
      navigationInstruction
        .getAllInstructions()
        .some((i) => i.config.settings.auth)
    ) {
      if (!this.authService.isLoggedIn()) {
        return next.cancel(new Redirect("login"));
      }
    }

    return next();
  }
}
