"use client";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

export default async function Home() {
  const { user } = useUserContext();
  const router = useRouter();
  if (!user) router.push("/login");
  else router.push("/dashboard");
}
