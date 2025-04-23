"use server";

import { redirect } from "next/navigation";

export default function BashboardHomePape() {
  redirect("/dashboard/users");
}
