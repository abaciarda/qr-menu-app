"use server";

import { env } from "@/lib/env";
import { createSession, deleteSession } from "@/lib/auth";
import { LoginInput, loginSchema } from "@/lib/validations/auth";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginInput) {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: "Invalid input data. Please check your username and password.",
    };
  }

  const { username, password } = validation.data;

  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return {
      success: false,
      error: "Incorrect username or password.",
    };
  }

  await createSession(username);

  return { success: true };
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin");
}