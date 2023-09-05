import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SubscriptionForm() {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>free</strong> plan.
          </CardDescription>
        </CardHeader>
        <CardContent>Description</CardContent>
        <CardFooter>
          <Button type="submit">Subscribe to Pro</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
