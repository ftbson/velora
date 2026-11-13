import { redirect } from "next/navigation";

export default function PanierRedirect() {
  redirect("/warenkorb");
}