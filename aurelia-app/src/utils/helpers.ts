import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const toggleDisabled = (element: Element, isDisabled: boolean): void => {
  toggleAttribute(element, isDisabled, "disabled");
};

export const toggleAttribute = (
  element: Element,
  setAttribute: boolean,
  attribute: string
): void => {
  if (setAttribute) {
    element.setAttribute(attribute, "");
  } else {
    element.removeAttribute(attribute);
  }
};

export const formatDateUTC = (date: Date | string): string => {
  if (date.toString().length > 0) {
    return dayjs(new Date(date)).utc().format();
  }
  return date.toString();
};
