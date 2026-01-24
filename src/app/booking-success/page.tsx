import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-3xl shadow-xl">
                    <div className="flex justify-center">
                        <CheckCircle className="h-24 w-24 text-green-500" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Booking Request Received!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for booking with Ami Shalom Tours. We have received your request and our team will be in touch shortly to confirm your details.
                    </p>
                    <div className="mt-8 space-y-4">
                        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition duration-300">
                            <Link href="/">Back to Home</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 font-bold py-3 rounded-xl transition duration-300">
                            <Link href="/destinations">Explore More Destinations</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
