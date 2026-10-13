"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidPassword, LAB_COOKIE, LAB_COOKIE_MAX_AGE, labToken } from "@/lib/lab/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const token = labToken();
  if (!token) return { error: "De lab is nog niet ingesteld (LAB_PASSWORD ontbreekt)." };
  if (!isValidPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return { error: "Onjuist wachtwoord." };
  }
  (await cookies()).set(LAB_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: LAB_COOKIE_MAX_AGE,
  });
  redirect("/lab");
}

export async function logout() {
  (await cookies()).delete(LAB_COOKIE);
  redirect("/lab/login");
}
