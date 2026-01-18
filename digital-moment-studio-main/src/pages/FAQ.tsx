import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does it take to get my personalized Valentine experience?",
    answer: "After you place your order and send us your details (recipient name, your name, and message) via WhatsApp or email, we'll create your personalized link within 24 hours. Most orders are done within 6-12 hours!"
  },
  {
    question: "How does the recipient access their Valentine experience?",
    answer: "You'll receive a unique link that you can share with your special someone via text, WhatsApp, social media, or even QR code. They just click the link and experience your beautiful personalized moment. It works on any phone or device!"
  },
  {
    question: "Can I choose between different experiences (xoxoask vs xoxoval)?",
    answer: "Absolutely! When you order, you can choose which Valentine experience you want: 'Will you be my Valentine?' (xoxoask) or the celebration version (xoxoval). Both are beautifully personalized to your story."
  },
  {
    question: "Can I customize the colors, music, or style?",
    answer: "Great question! Currently, our experiences come with beautiful default styling and romantic music. If you need custom designs, premium features, or branding, contact us via WhatsApp for a custom quote."
  },
  {
    question: "What if I need it urgently? Can I get it faster?",
    answer: "Our standard delivery is 24 hours, but urgent orders might be possible depending on our current workload. Contact us via WhatsApp to discuss rush options—we'll do our best to help!"
  },
  {
    question: "How do I send you my personalization details?",
    answer: "After your order, you'll receive instructions to contact us via WhatsApp with your details: recipient's name, your name, and any personal message or letter you'd like included. Just send a message and we'll take it from there!"
  },
  {
    question: "Is my information safe and private?",
    answer: "Absolutely. Your personal information is only used to create your experience and is never shared publicly. Each experience has its own unique link that only you control."
  },
  {
    question: "Can I share the link on social media?",
    answer: "Yes! You can share the link anywhere you'd like—WhatsApp, Instagram, TikTok, email, etc. It's yours to share however you want. Some people love sharing their moments!"
  },
  {
    question: "What if something goes wrong or I'm not happy with it?",
    answer: "We stand behind our work! If there's any issue, just let us know via WhatsApp and we'll fix it immediately. Your satisfaction is our priority."
  },
  {
    question: "Can I create multiple experiences for different people?",
    answer: "Yes! You can place multiple orders, each with its own personalization. Perfect if you want to ask multiple people or celebrate different moments."
  },
  {
    question: "How much does it cost and what are payment options?",
    answer: "Pricing depends on the experience you choose. We accept bank transfers currently. Visit the Order page to see pricing and payment details. We'll be adding more payment options soon!"
  },
  {
    question: "Can I gift this to someone or buy it for a friend?",
    answer: "Absolutely! You can order it and have your friend personalize it, or you can personalize it as a gift. It's a unique, memorable gift that shows you really care."
  }
];

const FAQAccordion = ({ item, index }: { item: FAQItem; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal animation="fade-up" delay={index * 50}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left border border-border rounded-lg p-6 hover:bg-secondary/50 transition-colors group"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-medium text-foreground text-lg pr-4">
            {item.question}
          </h3>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-accent flex-shrink-0 transition-transform",
              open && "rotate-180"
            )}
          />
        </div>
        
        {open && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </div>
        )}
      </button>
    </ScrollReveal>
  );
};

const FAQ = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                Got Questions?
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Frequently Asked Questions
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground mb-8">
                Everything you need to know about creating your perfect Valentine moment
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <FAQAccordion key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Still have questions?
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-lg text-muted-foreground mb-8">
                Our team is here to help! Reach out via WhatsApp and we'll answer any questions you have.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" asChild>
                  <a href="https://wa.me/message-link" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/order">
                    Ready to Order
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQ;
