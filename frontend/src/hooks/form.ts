import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import SubscribeButton from "@/components/ui-form/subscribe-button";
import CalendarFields from "@/components/ui-form/calendar-fields";
import { fieldContext, formContext } from "@/hooks/form-context";

const TextField = lazy(() => import("@/components/ui-form/text-fields"));

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CalendarFields,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
