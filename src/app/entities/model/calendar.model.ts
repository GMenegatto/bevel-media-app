import {Platform} from "../enum/platform.enum";

export class Calendar {
  constructor(
    public id?: number,
    public date?: string,
    public pilar?: string,
    public content?: string,
    public platform?: Platform[],
    public format?: string,
    public ads?: boolean,
  ) {
  }
}


