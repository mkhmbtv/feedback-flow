import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { marketingConfig } from "@/config";

export default async function Home() {
  return (
    <>
      <section
        id="hero"
        className="container flex max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32"
      >
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
          <Balancer>
            Empowering Your Static Sites with Effortless Interaction
          </Balancer>
        </h1>
        <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
          <Balancer>
            Watch as feedback flows seamlessly, nurturing your site&apos;s
            growth and fostering a community of engaged users.
          </Balancer>
        </p>
        <div>
          <Link href="/login" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Features
          </h2>
          <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Discover the power of Feedback Flow
          </Balancer>
        </div>
        <div className="mx-auto grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {marketingConfig.features.map((feat) => {
            const Icon = Icons[feat.icon];
            return (
              <Card key={feat.title}>
                <CardHeader>
                  <Icon className="h-10 w-10" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle>{feat.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {feat.body}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
