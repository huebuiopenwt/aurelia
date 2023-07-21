import { HttpClient } from "aurelia";
import { inject } from "aurelia-framework";
import { TPosition } from "../models/position.model";

@inject(HttpClient)
export class PositionService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  public async getPositions(): Promise<TPosition[]> {
    return await this.http
      .fetch("/positions")
      .then((response) => response.json())
      .then((positions: TPosition[]) => {
        return positions;
      })
      .catch((error) => {
        console.log(" Error get positions: ", error);
        return [];
      });
  }
}
