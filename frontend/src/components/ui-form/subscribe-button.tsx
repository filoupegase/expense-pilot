import { useFormContext } from "@/hooks/form-context";
import { Button } from "@/components/ui/Button";

export default function SubscribeButton({ label = "Submit" }: { label?: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button className="mt-4" type="submit" disabled={!canSubmit}>
          {isSubmitting ? "..." : label}
        </Button>
      )}
    />
  );
}
