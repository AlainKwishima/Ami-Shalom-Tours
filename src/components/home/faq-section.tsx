import React from "react";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "How do I book a gorilla trekking permit?",
    answer:
      "Gorilla permits are in high demand and should be booked several months in advance. As your tour operator, Ami Shalom handles the entire permit acquisition process through the Rwanda Development Board (RDB). The current price is $1,500 per person, which contributes directly to the conservation of these endangered primates and community development.",
  },
  {
    id: "item-2",
    question: "What is the best time to visit Rwanda?",
    answer:
      "Rwanda can be visited year-round. However, the dry seasons (June to September and December to February) are ideal for gorilla trekking as the trails are less muddy. The rainy seasons (March to May and October to November) are excellent for chimpanzee tracking in Nyungwe and for photographers who enjoy the lush, vibrant green landscapes.",
  },
  {
    id: "item-3",
    question: "Do I need a visa to enter Rwanda?",
    answer:
      "Rwanda has a very friendly visa policy. Citizens of all countries can get a 30-day visa upon arrival at Kigali International Airport or any land border. Citizens of many countries, including all African Union, Commonwealth, and Francophonie members, are eligible for visa-free entry or waived fees. We recommend checking the latest Irembo portal updates before travel.",
  },
  {
    id: "item-4",
    question: "What should I pack for a Rwandan safari?",
    answer:
      "For gorilla trekking, pack sturdy hiking boots, long trousers, long-sleeved shirts, and garden gloves to protect against nettles. Don't forget a waterproof jacket, even in the dry season. For Akagera safaris, lightweight neutral-colored clothing is best. Rwanda is plastic-bag free, so please use reusable bags for your belongings.",
  },
  {
    id: "item-5",
    question: "Is Rwanda safe for solo travelers and families?",
    answer:
      "Absolutely. Rwanda is consistently ranked as one of the safest countries globally. Kigali is exceptionally peaceful, and the hospitality of the Rwandan people is legendary. Whether you are a solo traveler or visiting with family, you will find a secure environment, professional guides, and a culture that deeply respects and welcomes guests.",
  },
];

export function FaqSection() {
  return (
    <section
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#002B28" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-yellow-500 text-lg md:text-xl mb-4 font-medium"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            ACTUALS
          </p>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "Palanquin Dark, sans-serif" }}
          >
            FAQS
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-3"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-yellow-500 py-4"
            >
              <AccordionTrigger
                className="text-white text-base md:text-lg font-light hover:no-underline text-left [&[data-state=open]>svg]:rotate-45"
                style={{ fontFamily: "Palanquin Dark, sans-serif" }}
                icon={<Plus className="h-5 w-5 text-white shrink-0 transition-transform duration-200" />}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white text-sm md:text-base leading-relaxed pt-4 pb-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
