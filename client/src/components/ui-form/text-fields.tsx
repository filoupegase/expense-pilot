import { useFieldContext } from "@/hooks/form-context";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import FieldInfo from "@/components/ui-form/field-info";

export default function TextFields({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <div>
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}
