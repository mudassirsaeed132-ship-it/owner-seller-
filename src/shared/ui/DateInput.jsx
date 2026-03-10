import Input from "./Input";
import { CalendarDays } from "lucide-react";

export default function DateInput(props) {
  return <Input endIcon={<CalendarDays size={18} />} {...props} />;
}