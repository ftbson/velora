import { permanentRedirect } from "next/navigation";

export default function WishlistRedirect() {
  permanentRedirect("/wunschliste");
}