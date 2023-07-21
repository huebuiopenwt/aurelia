import { ICustomElementViewModel, bindable } from "aurelia";
import { TCreateProfileRequest } from "../../../models/user.model";
import { Gender } from "../../../enums/gender.enum";
import { ContractType } from "../../../enums/contract-type.enum";
import { UserService } from "../../../services/user.service";
import { inject } from "aurelia-framework";
import { PositionService } from "../../../services/position.service";
import { TPosition } from "../../../models/position.model";
import { TBaseEntity } from "../../../models/base-entity.model";
import { CONTRACT_TYPES } from "../../../constants/contractTypes";
import "./create-profile.scss";
import { formatDateUTC } from "../../../utils/helpers";
import { IRouteableComponent, IRouter } from "@aurelia/router";

@inject(UserService, PositionService, IRouter)
export class CreateProfile
  implements ICustomElementViewModel, IRouteableComponent
{
  @bindable positions: TPosition[] = [];
  @bindable contractTypes: TBaseEntity[] = CONTRACT_TYPES;

  public profile: TCreateProfileRequest = {
    personalEmail: "",
    companyEmail: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: Gender.Male,
    address: "",
    university: "",
    photo: "",
    phoneNumber: "",
    identifier: "",
    startDate: new Date(),
    endDate: "",
    positionId: "",
    contractType: ContractType.EMPLOYEE,
    changeCode: false,
  };

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
  }

  public handleCreateProfile(): void {
    this.profile = {
      ...this.profile,
      dateOfBirth: formatDateUTC(this.profile.dateOfBirth),
      startDate: formatDateUTC(this.profile.startDate),
      endDate: formatDateUTC(this.profile.endDate),
    };
    this.userService.createUserProfile(this.profile).then(async (profile) => {
      if (profile.id) {
        await this.router.load("/profiles");
      } else {
        console.log("Error create profile");
      }
    });
  }
}
