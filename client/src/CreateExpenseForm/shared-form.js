import { formOptions } from "@tanstack/react-form";
const formOpts = formOptions({
    defaultValues: {
        title: "",
        amount: "0",
        date: new Date().toISOString(),
    },
});
export { formOpts };
