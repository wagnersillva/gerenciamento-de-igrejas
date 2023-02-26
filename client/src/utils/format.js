import moment from "moment";
import {enum_date_format} from "./variables";

export const dateToString = (date, format = enum_date_format.ISO) => date ? moment(date).format(format) : null;
export const stringToDate = (date, format) => date ? moment(date, format) : null;