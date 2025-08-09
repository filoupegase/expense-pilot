import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export default function FieldInfo({ field }) {
    return (_jsxs(_Fragment, { children: [field.state.meta.isTouched && !field.state.meta.isValid ? (_jsx("em", { children: field.state.meta.errors.map((err) => err.message).join(",") })) : null, field.state.meta.isValidating ? "Validating..." : null] }));
}
