import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Список миров",
}

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>Home</div>
      <Link href={"/register"}>go to register</Link>
      <Link href={"/login"}>go to login</Link>
      <Link href={"/confirm-email"}>go to confirm email</Link>
    </div>
  );
}
