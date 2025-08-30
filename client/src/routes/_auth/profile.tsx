import { createFileRoute } from "@tanstack/react-router";
import { useGetCurrentUser } from "@/queries/useGetCurrentUser";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export const Route = createFileRoute("/_auth/profile")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useGetCurrentUser();

  if (isPending) return "loading";
  if (error) return "not logged in";

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          {data.image && (
            <AvatarImage src={data.image} alt={data.id} />
          )}
          <AvatarFallback>{data.name}</AvatarFallback>
        </Avatar>
        <p>
          {data.name}
        </p>
      </div>
      <Button asChild className="my-4">
        <a href="/api/logout">Logout!</a>
      </Button>
    </div>
  );
}
