import { formOptions } from "@tanstack/react-form";

const formOpts = formOptions({
  defaultValues: {
    title: "",
    content: "",
    amount: "0",
  },
});

export { formOpts };
