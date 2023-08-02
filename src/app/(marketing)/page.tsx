import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="container">
      <h1>Empowering Your Static Sites with Effortless Interaction</h1>
      <div>{session?.user?.name}</div>
    </div>
  );
}
