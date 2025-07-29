import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export const Route = createFileRoute("/profile")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <a href="/api/logout">Logout!</a>
    </div>
  );
}
