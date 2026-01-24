import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    // In a real app, fetch data based on params.slug

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[60vh]">
                <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm">
                    <span className="text-teal-600 font-medium mb-2 block uppercase tracking-wide text-sm">Blog Post</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 capitalize">
                        {params.slug.replace(/-/g, ' ')}
                    </h1>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                            This is a placeholder for the full blog post content. In a real application, this content would be fetched from a CMS (Content Management System) or a database based on the slug: <strong>{params.slug}</strong>.
                        </p>
                        <p>
                            Rwanda offers incredibly diverse experiences. From the misty volcanoes where mountain gorillas roam to the sun-soaked savannahs of Akagera National Park, every corner of this country tells a unique story.
                        </p>
                        <p>
                            Travelers are often surprised by the cleanliness of Kigali, the warmth of the locals, and the ease of travel within the country.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <Button asChild variant="outline">
                            <Link href="/blog">← Back to All Stories</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
