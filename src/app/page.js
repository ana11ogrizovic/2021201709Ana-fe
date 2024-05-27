"use client"
import {useSession} from "next-auth/react";
import AuthButton from "@/app/AuthButton.server";

export default function HomePage() {

  return (
      <>
        <h1>App home page</h1>
        <AuthButton />
      </>
  );
}
