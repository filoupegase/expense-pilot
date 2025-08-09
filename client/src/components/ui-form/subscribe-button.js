import { jsx as _jsx } from "react/jsx-runtime";
import { useFormContext } from "@/hooks/form-context";
import { Button } from "@/components/ui/Button";
export default function SubscribeButton({ label = "Submit" }) {
    const form = useFormContext();
    return (_jsx(form.Subscribe, { selector: (state) => [state.canSubmit, state.isSubmitting], children: ([canSubmit, isSubmitting]) => (_jsx(Button, { className: "mt-4", type: "submit", disabled: !canSubmit, children: isSubmitting ? "..." : label })) }));
}
