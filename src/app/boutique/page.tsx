import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Shop | Swiss Holz",
  description: "Entdecken Sie unsere komplette Auswahl an Brennholz, Holzpellets und Holzbriketts.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}