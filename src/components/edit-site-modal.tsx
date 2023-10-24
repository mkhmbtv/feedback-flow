"use client";

import * as React from "react";

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
import { Site } from "@prisma/client";
import { EditSiteForm } from "./edit-site-form";

interface EditSiteModalProps {
  site: Site;
}

export function EditSiteModal({ site }: EditSiteModalProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icons.gear className="mr-2 h-4 w-4" />
          Edit site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit site</DialogTitle>
          <DialogDescription>
            Select how feedback will be displayed on{" "}
            <span className="font-semibold">{site.name}</span>
          </DialogDescription>
        </DialogHeader>
        <EditSiteForm site={site} onSuccess={() => setDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
