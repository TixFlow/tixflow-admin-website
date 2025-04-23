"use server";

import { redirect } from "next/navigation";

export default async function BashboardHomePape() {
  redirect("/dashboard/users");
}
