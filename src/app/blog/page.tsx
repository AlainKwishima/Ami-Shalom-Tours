import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer } from "@/components/layout";
import { Calendar, User, ArrowRight } from "lucide-react";

// Mock data for blog posts - usually fetched from an API/CMS
const blogPosts = [
    {
        slug: "top-5-destinations-rwanda",
        title: "Top 5 Must-Visit Destinations in Rwanda",
        excerpt: "Discover the hidden gems of the Land of a Thousand Hills, from the mist-covered Virunga Mountains to the savannahs of Akagera.",
        image: "/assets/hero1.jpg", // Using existing asset
        date: "Jan 15, 2026",
        author: "Ami Shalom Team",
        category: "Destinations"
    },
    {
        slug: "gorilla-trekking-guide",
        title: "The Ultimate Guide to Gorilla Trekking",
        excerpt: "Everything you need to know about preparing for your encounter with the majestic mountain gorillas of Volcanoes National Park.",
        image: "/assets/re2.jpg", // Using existing asset
        date: "Jan 10, 2026",
        author: "Expert Guide",
        category: "Guides"
    },
    {
        slug: "cultural-experiences-kigali",
        title: "Immersive Cultural Experiences in Kigali",
        excerpt: "Beyond the wildlife, explore the vibrant art, history, and culinary scenes of Rwanda's bustling capital city.",
        image: "/assets/hero2.jpg", // Using existing asset
        date: "Jan 05, 2026",
        author: "Local Explorer",
        category: "Culture"
    }
];

export const metadata = {
    title: "Travel Blog | Ami Shalom Tours",
    description: "Read our latest stories, travel guides, and tips for exploring Rwanda and East Africa.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Blog Header */}
            <div className="bg-[#002B28] pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "Palanquin Dark, sans-serif" }}>
                    Travel Stories & Insights
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-300">
                    Inspiration for your next adventure. Explore our guides, tips, and stories from the heart of Africa.
                </p>
            </div>

            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <div key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                            {/* Image */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                    <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1 text-teal-600" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center">
                                        <User className="h-4 w-4 mr-1 text-teal-600" />
                                        {post.author}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-semibold text-teal-600 hover:text-teal-700 transition-colors mt-auto">
                                    Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
