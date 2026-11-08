import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "E-Bikes | VELORA",
  description: "Entdecken Sie unsere E-Bikes für Stadt, Trekking und anspruchsvolle Trails.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}