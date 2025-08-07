import { jsx as _jsx } from "react/jsx-runtime";
import { useFieldContext } from "@/hooks/form-context";
import { Calendar } from "@/components/ui/Calendar";
import { format, parseISO, startOfDay } from "date-fns";
export default function CalendarFields() {
    const field = useFieldContext();
    return (_jsx(Calendar, { mode: "single", className: "rounded-md border", selected: field.state.value ? startOfDay(parseISO(field.state.value)) : undefined, onSelect: (date) => field.handleChange(date ? format(date, "yyyy-MM-dd") : "") }));
}
