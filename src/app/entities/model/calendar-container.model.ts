import {Platform} from "../enum/platform.enum";
import {Calendar} from "./calendar.model";

export class CalendarContainer {
  constructor(
    public calendars?: Calendar[],
  ) {
  }
}


