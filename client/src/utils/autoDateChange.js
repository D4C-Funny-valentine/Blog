import { format } from "date-fns";

export const formatDate = (date = Date.now()) =>
  format(new Date(date), "yyyy-MMM-dd");
