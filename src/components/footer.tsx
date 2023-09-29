import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { siteConfig } from "@/config";

interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Icons.logo />
          <p className="text-center text-sm md:text-left">
            Built by Mirkhat. Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
