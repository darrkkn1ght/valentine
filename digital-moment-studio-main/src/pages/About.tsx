import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, Heart, Lightbulb, Users } from 'lucide-react';
import { ScrollReveal } from '@/hooks/use-scroll-animation';
import { useSEO, addSchemaMarkup, organizationSchema } from '@/hooks/useSEO';
import { useEffect } from 'react';

const About = () => {
  useSEO({
    title: 'About Us - Why Digital Moment Studio Exists',
    description: 'Learn about Digital Moment Studio\'s mission to create unforgettable moments. We believe how you ask matters just as much as what you ask.',
    type: 'article'
  });

  useEffect(() => {
    addSchemaMarkup(organizationSchema);
  }, []);
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                Our Story
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                Why Digital Moment Studio Exists
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Because the most important moments in life deserve to be experienced intentionally, not rushed. We believe that how you ask matters just as much as what you ask.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                We Started With A Question
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                "How do you ask someone something truly meaningful in a way that feels special and intentional?"
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Most people either ask in person (pressure, no memento) or via text (impersonal, easily forgotten). Neither felt right for moments that matter.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <p className="text-muted-foreground leading-relaxed">
                We realized: what if there was a middle ground? A way to ask that's personal, intentional, beautifully designed, AND creates a permanent memory they can experience and revisit forever.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                Our Mission
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                Transform Ordinary Moments Into Unforgettable Experiences
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-3">Intentional</h3>
                  <p className="text-sm text-muted-foreground">
                    Every moment is crafted with care. Designed to communicate what matters most.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <div className="text-center">
                  <Lightbulb className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-3">Creative</h3>
                  <p className="text-sm text-muted-foreground">
                    No two experiences are the same. We personalize everything to your story.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300}>
                <div className="text-center">
                  <Users className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-3">Memorable</h3>
                  <p className="text-sm text-muted-foreground">
                    Creates lasting memories that matter. They'll remember this forever.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                What We Believe In
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">
                Our Core Values
              </h2>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-medium text-lg text-foreground mb-2">
                    Quality Over Speed
                  </h3>
                  <p className="text-muted-foreground">
                    We take time to create beautiful, personalized experiences. This is about meaning, not mass production.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-medium text-lg text-foreground mb-2">
                    Your Story Matters
                  </h3>
                  <p className="text-muted-foreground">
                    We don't use templates. Every experience is built around your unique story and relationship.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300}>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-medium text-lg text-foreground mb-2">
                    Personal Connection
                  </h3>
                  <p className="text-muted-foreground">
                    We're here to help. From order to delivery, you get real support from real people who care.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={400}>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-medium text-lg text-foreground mb-2">
                    Make It Special
                  </h3>
                  <p className="text-muted-foreground">
                    We sweat the details. Animation timing, music selection, message placement—everything works together to create magic.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team (Simple) */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                The Team
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                Built For Love
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're a small team passionate about creating experiences that matter. We've personally been through the awkwardness of asking important questions, which is why we created this.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <p className="text-muted-foreground mb-12 leading-relaxed">
                Every experience we create is built with the same care we'd want if we were asking someone we love. That's our standard.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal animation="fade-up">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Ready to Create Your Moment?
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-lg text-muted-foreground mb-8">
                Let's create an experience that transforms an important question into an unforgettable memory.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <Button variant="cta" size="lg" asChild>
                <Link to="/valentine-ask">
                  Explore The Experience
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
