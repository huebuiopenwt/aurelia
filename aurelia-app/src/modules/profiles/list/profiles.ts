import { inject, bindable } from "aurelia-framework";
import { UserService } from "../../../services/user.service";
import { PositionService } from "../../../services/position.service";
import { IRouteableComponent, IRouter } from "@aurelia/router";
import { TPosition } from "../../../models/position.model";
import "./profiles.scss";

@inject(UserService, PositionService, IRouter)
export class Profiles implements IRouteableComponent {
  @bindable userProfiles = [];
  @bindable positions: TPosition[] = [];

  constructor(
    private userService: UserService,
    private positionService: PositionService,
    @IRouter private router: IRouter
  ) {
    this.userService = userService;
    this.positionService = positionService;
    this.router = router;
  }

  public loading(): void {
    this.positionService.getPositions().then((positions) => {
      this.positions = positions;
    });
    this.userService.getUsers().then((users) => {
      this.userProfiles = users.map((user) => {
        return {
          ...user,
          position: this.positions.find((p) => p.id === user.positionId).name,
        };
      });
    });
  }

  public navigateToCreate(): void {
    this.router.load("/create");
  }
}
