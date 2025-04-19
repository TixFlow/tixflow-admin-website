"use client";
import PageLoading from "@/components/loading";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);
  return <Suspense fallback={<PageLoading />}></Suspense>;
}
