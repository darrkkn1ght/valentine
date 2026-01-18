import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '@/components/layout/PageLayout';
import { Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/hooks/use-scroll-animation';
import { useSEO, addSchemaMarkup, localBusinessSchema } from '@/hooks/useSEO';
import { useEffect, useState } from 'react';

const Contact = () => {
  useSEO({
    title: 'Contact Us - Get Support & Custom Experiences',
    description: 'Have questions? Contact Digital Moment Studio via WhatsApp, email, or contact form. We respond within 2 hours, 7am-11pm WAT.',
    type: 'article'
  });

  useEffect(() => {
    addSchemaMarkup(localBusinessSchema);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service (Sendgrid, Mailgun, etc.)
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                Get In Touch
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                We're Here To Help
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions about your order? Need custom support? We respond within 2 hours during business hours.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded inline-block">
                <p className="text-sm text-accent font-medium">
                  Have a custom idea? Tell us about it in the form below—birthdays, proposals, business launches, anything!
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quick Support Options */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-up">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-3">WhatsApp Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fastest way to reach us. We're usually online.
                </p>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <div className="text-center">
                <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-3">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed inquiry? Send us an email.
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:support@digitalmoment.studio">
                    Send Email
                  </a>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="text-center">
                <Clock className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-3">Response Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We respond within 2 hours, 7am-11pm WAT.
                </p>
                <p className="text-xs text-muted-foreground">
                  Mon-Sun • Same-day replies
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal animation="fade-up">
              <h2 className="font-serif text-3xl text-foreground mb-8 text-center">
                Send Us A Message
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Question about my order"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what we can help with..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {submitted && (
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-center">
                    <p className="text-sm text-accent font-medium">
                      ✓ Message sent! We'll reply within 2 hours.
                    </p>
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 md:py-20 bg-secondary border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal animation="fade-up">
              <h3 className="font-serif text-2xl text-foreground text-center mb-8">
                Common Questions?
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal animation="fade-up" delay={100}>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/faq">
                    Browse Our FAQ
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <Button variant="outline" asChild className="w-full justify-start">
                  <Link to="/about">
                    Learn About Us
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
