import { ImageResponse } from "@vercel/og";

import { ogImageSchema } from "@/lib/validations/og";

export const runtime = "edge";

export function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parsedValues = ogImageSchema.parse(
      Object.fromEntries(url.searchParams),
    );

    const { mode, heading, type } = parsedValues;
    const paint = mode === "dark" ? "#fff" : "#000";

    return new ImageResponse(
      (
        <div
          tw="flex h-full w-full flex-col items-center justify-center"
          style={{
            color: paint,
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #000 0%, #111 100%)"
                : "white",
          }}
        >
          <div tw="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="116" height="100">
              <path
                fill="currentColor"
                d="M511.5 477.5v3H-.5v-3a143566.088 143566.088 0 0 0 256-447 72994.656 72994.656 0 0 1 180 315c-68.663 1-137.33 1.333-206 1a1351.485 1351.485 0 0 1 38-67.5c17.01-.167 34.01-.667 51-1.5a8643.198 8643.198 0 0 0-63-109 28890.59 28890.59 0 0 0-140 243.5c119.668.167 239.335.667 359 1.5 12.36 21.396 24.693 42.729 37 64Z"
              />
            </svg>
          </div>
          <div
            tw="mt-10 flex max-w-4xl flex-col text-center items-center justify-center"
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            <div tw="text-6xl px-8 leading-tight tracking-tight mb-4">
              {type}
            </div>
            <div
              tw="text-4xl px-8 leading-tight tracking-tight"
              style={{ color: "hsl(240 3.8% 46.1%)" }}
            >
              {heading}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    error instanceof Error
      ? console.log(`${error.message}`)
      : console.log(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
