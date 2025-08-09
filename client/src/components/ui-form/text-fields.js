import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFieldContext } from "@/hooks/form-context";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import FieldInfo from "@/components/ui-form/field-info";
export default function TextFields({ label }) {
    const field = useFieldContext();
    return (_jsxs("div", { children: [_jsx(Label, { htmlFor: field.name, children: label }), _jsx(Input, { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value) }), _jsx(FieldInfo, { field: field })] }));
}
