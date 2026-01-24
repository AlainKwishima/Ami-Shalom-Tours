import { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import { FaqSection } from "@/components/home/faq-section";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Ami Shalom Tours",
    description:
        "Find answers to common questions about booking, visas, packing, and safety for your Rwanda safari and tour experiences.",
};

export default function FaqsPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <FaqSection />
            </div>
            <Footer />
        </div>
    );
}
