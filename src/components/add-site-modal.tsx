import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Icons } from "./icons";
import { AddSiteForm } from "./add-site-form";

export function AddSiteModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.add className="mr-2 h-4 w-4" />
          New site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new site</DialogTitle>
          <DialogDescription>
            Fill out the form below to add your site
          </DialogDescription>
        </DialogHeader>
        <AddSiteForm />
      </DialogContent>
    </Dialog>
  );
}
