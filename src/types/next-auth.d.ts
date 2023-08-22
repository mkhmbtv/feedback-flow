import type { User } from "next-auth";

type UserAuthInfo = {
  id: string;
  provider: string;
};

declare module "next-auth/jwt" {
  interface JWT extends UserAuthInfo {}
}

declare module "next-auth" {
  interface Session {
    user: User & UserAuthInfo;
  }
}
