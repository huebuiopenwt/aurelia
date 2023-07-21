import { ContractType } from "../enums/contract-type.enum";
import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

export type User = {
  id: string;
  personalEmail: string;
  companyEmail: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  gender: Gender;
  address: string;
  university: string;
  photo: string;
  phoneNumber: string;
  identifier: string;
  startDate: Date | string;
  endDate: Date | string | null;
  active?: boolean;
  positionId: string;
  role?: Role;
  contractType: ContractType;
  qrCode?: string;
  changeCode?: boolean;
};

export type TCreateProfileRequest = Omit<User, "id">;
