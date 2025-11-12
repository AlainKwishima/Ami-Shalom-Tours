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
    question: "How Do I Place An Order?",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam.",
  },
  {
    id: "item-2",
    question: "What Payment Methods Do You Accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital wallets. All transactions are processed through secure payment gateways to ensure your information is protected.",
  },
  {
    id: "item-3",
    question: "What Is Your Cancellation Policy?",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam.",
  },
  {
    id: "item-4",
    question: "How Do I Contact Customer Support?",
    answer:
      "You can reach our customer support team 24/7 through multiple channels: email us at support@travel.com, call our hotline at +(45) 899 566 389, or use our live chat feature on the website. We typically respond within 2 hours.",
  },
  {
    id: "item-5",
    question: "What Is Your Privacy Policy?",
    answer:
      "We take your privacy seriously and comply with all data protection regulations. Your personal information is encrypted, securely stored, and never shared with third parties without your consent. You can read our full privacy policy on our website.",
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
