import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout/footer";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </div>
  );
}