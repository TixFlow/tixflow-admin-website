"use client";
import PageLoading from "@/components/loading";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);
  return <Suspense fallback={<PageLoading />}></Suspense>;
}
