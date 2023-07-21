import { HttpClient, json } from "aurelia";
import { inject } from "aurelia-framework";
import { TCreateProfileRequest, User } from "../models/user.model";

@inject(HttpClient)
export class UserService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  public async getUsers(): Promise<User[]> {
    return await this.http
      .fetch("/users")
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(" Error get users: ", error);
        return [];
      });
  }

  public async createUserProfile(user: TCreateProfileRequest): Promise<User> {
    return await this.http
      .post("/users", json(user))
      .then((response) => response.json())
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log(" Error create profile: ", error);
      });
  }
}
