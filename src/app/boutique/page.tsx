import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Fahrräder und Zubehör | VELORA",
  description:
    "Entdecken Sie E-Bikes, Fahrradzubehör, Radbekleidung und Kinderfahrräder.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}