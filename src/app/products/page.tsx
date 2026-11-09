import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Alle Produkte | VELORA",
  description:
    "Entdecken Sie Fahrräder, Kinderfahrräder, Fahrradzubehör und Radbekleidung.",
};

export default function ProductsPage() {
  return (
    <main>
      <ShopGrid />
    </main>
  );
}
