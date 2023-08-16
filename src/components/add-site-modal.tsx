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
import { AddSiteForm } from "./add-site-form";
import { useRouter } from "next/navigation";

export function AddSiteModal() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const router = useRouter();
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
        <AddSiteForm
          onSuccess={() => {
            setDialogOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
