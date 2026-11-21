import { permanentRedirect } from "next/navigation";

export default function ConnexionRedirect() {
  permanentRedirect("/anmelden");
}