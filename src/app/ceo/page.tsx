import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Quote, Linkedin, Twitter, Mail, Map, Heart, Globe, Users } from "lucide-react";

export const metadata = {
    title: "Our CEO | Ami Shalom Tours",
    description: "Meet Jean Paul Habimana, the visionary leader behind Ami Shalom Tours.",
};

export default function CeoPage() {
    const philosophyPoints = [
        {
            icon: Users,
            title: "Guests, Not Tourists",
            desc: "We believe in treating every traveler as a personal guest, ensuring their journey is intimate, cared for, and truly special."
        },
        {
            icon: Heart,
            title: "Conservation First",
            desc: "Tourism must be a force for good. Protecting our wildlife and empowering local communities is at the core of every itinerary we design."
        },
        {
            icon: Globe,
            title: "Authentic Connection",
            desc: "We go beyond the postcard views to connect you with the real people, culture, and spirit of East Africa."
        }
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#002B28] text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 transform origin-top-right" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-800/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-yellow-500 font-medium tracking-wide text-sm uppercase mb-4">Leadership & Vision</h2>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                                    Meet Our <br />
                                    <span className="text-yellow-500">CEO & Founder</span>
                                </h1>
                            </div>

                            <div className="relative pl-8 border-l-4 border-yellow-500/30">
                                <Quote className="absolute -top-4 -left-6 text-yellow-500/20 w-12 h-12 rotate-180" />
                                <p className="text-xl md:text-2xl italic font-light text-gray-200">
                                    "Travel is not just about moving from one place to another. It's about the stories we create, the connections we make, and the way we let the world change us."
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Link href="https://linkedin.com" className="p-3 bg-white/10 hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-300">
                                    <Linkedin size={20} />
                                </Link>
                                <Link href="https://twitter.com" className="p-3 bg-white/10 hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-300">
                                    <Twitter size={20} />
                                </Link>
                                <Link href="mailto:ceo@amishalomtours.com" className="p-3 bg-white/10 hover:bg-yellow-500 hover:text-black rounded-full transition-all duration-300">
                                    <Mail size={20} />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <Image
                                    src="/assets/team1.jpg"
                                    alt="Jean Paul Habimana, CEO"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#002B28] via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <h3 className="text-2xl font-bold">Jean Paul Habimana</h3>
                                    <p className="text-yellow-500 font-medium">Founder & CEO</p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-yellow-500/30 rounded-2xl -z-10 hidden lg:block" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Biography Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Chapter 1: Early Beginnings */}
                    <div className="prose prose-lg prose-teal mx-auto text-gray-700">
                        <span className="text-teal-600 font-bold tracking-wider uppercase text-sm block mb-2">The Beginning</span>
                        <h3 className="text-3xl font-bold text-[#002B28] font-serif mb-6">Born Under the African Sun</h3>
                        <p>
                            Jean Paul’s story begins in the verdant hills of Northern Rwanda, just a stone's throw from the majestic Volcanoes National Park. Growing up in a community where the forest was a neighbor and the wildlife a constant presence, he developed a profound respect for nature at an early age.
                        </p>
                        <p>
                            "I remember watching the silverback gorillas from a distance as a child, fascinated by their gentleness and power," Jean Paul recalls. "It wasn't just curiosity; it was a calling. I knew my life would be tied to these mountains."
                        </p>
                        <p>
                            This early connection fueled his academic pursuits in Tourism and Hospitality Management, where he combined his innate passion with professional expertise, laying the groundwork for what would become Ami Shalom Tours.
                        </p>
                    </div>

                    {/* Chapter 2: Professional Journey */}
                    <div className="grid md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-12 items-start">
                        <div className="prose prose-lg text-gray-700">
                            <h3 className="text-2xl font-bold text-[#002B28] font-serif mb-4">From Guide to Leader</h3>
                            <p>
                                Before founding the company in 2016, Jean Paul spent over a decade as a professional tour guide. He led expeditions across East Africa, mastering the art of the safari in Kenya, Tanzania, Uganda, and Rwanda.
                            </p>
                            <p>
                                It was during these years on the road that he noticed a gap in the industry. Many tours were impersonal, rushed, and disconnected from the local reality. He envisioned a company that offered something different: <strong>soulful travel</strong>.
                            </p>
                        </div>
                        <div className="hidden md:block w-0.5 h-full bg-yellow-500/30"></div>
                        <div className="prose prose-lg text-gray-700">
                            <h3 className="text-2xl font-bold text-[#002B28] font-serif mb-4">Building Ami Shalom</h3>
                            <p>
                                "Ami Shalom" means "Friend of Peace." Jean Paul chose this name to reflect Rwanda's journey of reconciliation and the peaceful serenity found in its landscapes.
                            </p>
                            <p>
                                Starting with just one vehicle and a heart full of dreams, he built the company brick by brick. His hands-on approach meant he personally vetted every lodge, drove the trails, and trained his team to share his high standards of hospitality.
                            </p>
                        </div>
                    </div>

                    {/* Philosophy Cards */}
                    <div className="bg-gray-50 rounded-3xl p-8 md:p-12 my-12">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold text-[#002B28] font-serif">My Philosophy of Travel</h3>
                            <p className="text-gray-600 mt-2">The core values that drive every decision we make.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {philosophyPoints.map((point, idx) => {
                                const Icon = point.icon;
                                return (
                                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                            <Icon size={24} />
                                        </div>
                                        <h4 className="font-bold text-[#002B28] text-lg mb-2">{point.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{point.desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Chapter 3: Vision */}
                    <div className="prose prose-lg prose-teal mx-auto text-gray-700">
                        <h3 className="text-3xl font-bold text-[#002B28] font-serif mb-6">A Vision for the Future</h3>
                        <p>
                            Today, Jean Paul is not just focused on growing a business, but on growing an impact. His vision for Ami Shalom Tours is to become the leading sustainable travel partner in East Africa, setting a benchmark for eco-tourism.
                        </p>
                        <p>
                            "We are expanding our community outreach programs," he shares. "My goal is to see a future where every child living near a national park understands that their heritage is their greatest wealth. When you travel with us, you are helping to build that future."
                        </p>
                        <p className="font-medium text-[#002B28] pt-4">
                            Whether he is mapping out a new itinerary or sharing a coffee with guests in Kigali, Jean Paul remains the heart of Ami Shalom Tours—a leader who leads with love, passion, and an open hand.
                        </p>
                    </div>

                    {/* Signature */}
                    <div className="pt-12 text-center md:text-left">
                        <img src="/assets/signature-placeholder.png" alt="Signature" className="h-16 opacity-0" /> {/* Placeholder invisible for layout spacing or if user adds one later */}
                        <p className="text-2xl font-script text-gray-500 mt-4" style={{ fontFamily: 'WindSong, cursive' }}>Jean Paul Habimana</p>
                        <p className="text-sm font-bold uppercase tracking-widest text-[#002B28] mt-2">CEO & Founder, Ami Shalom Tours</p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
