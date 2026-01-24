import Script from "next/script";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Ami Shalom Travel",
    description:
      "Expert guided tours in Ami Shalom, India. Discover breathtaking destinations with professional tour guides.",
    url: "https://AmiShalom.vercel.app",
    logo: "https://AmiShalom.vercel.app/assets/logo.png",
    image: "https://AmiShalom.vercel.app/og-image.jpg",
    // telephone: "+91-XXX-XXX-XXXX",
    // email: "info@Ami Shalomtravel.com",
    // address: {
    //   "@type": "PostalAddress",
    //   addressCountry: "IN",
    // },
    // sameAs: [
    //   "https://www.facebook.com/Ami Shalomtravel",
    //   "https://www.instagram.com/Ami Shalomtravel",
    //   "https://twitter.com/Ami Shalomtravel",
    // ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2000",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ami Shalom Travel",
    url: "https://AmiShalom.vercel.app",
    description: "Your travel experience with expert guided tours",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://AmiShalom.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Travel & Tourism",
    provider: {
      "@type": "TravelAgency",
      name: "Ami Shalom Travel",
    },
    areaServed: {
      "@type": "State",
    },
    description:
      "Professional guided tours, adventure travel, family vacations, and exclusive tour packages",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "Varies",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
