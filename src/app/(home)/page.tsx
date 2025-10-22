import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Список миров",
}

export default function Home() {
  return (
    <div>
      <div>Home</div>
      <Link href={"/register"}>go to register</Link>
      <Link href={"/login"}>go to login</Link>
      <Link href={"/confirm-email"}>go to confirm email</Link>
    </div>
  );
}
