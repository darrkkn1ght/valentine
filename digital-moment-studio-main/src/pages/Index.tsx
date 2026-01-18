import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, Lock, Clock, Zap, Users, Mail, Gift, Play } from 'lucide-react';
import { ScrollReveal } from '@/hooks/use-scroll-animation';
import { useState } from 'react';
import valentineProduct from '@/assets/valentine-product.jpg';
import momentHands from '@/assets/moment-hands.jpg';
import heroBg from '@/assets/hero-bg.jpg';
import aboutBg from '@/assets/about-bg.jpg';

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Connect to newsletter API (Mailchimp, Convertkit, etc.)
      console.log('Newsletter signup:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[85vh] flex items-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Digital Experience Studio
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
                Transform Your Most Important Question Into An Unforgettable Moment
                <br />
                <span className="text-accent-gradient">They'll Never Forget</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10">
                Skip the ordinary. Create a personalized digital experience that will leave them speechless when you ask them to be your Valentine. With music, animations, and your personal message—delivered beautifully.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/valentine-ask">
                    Create My Moment Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/valentine-ask">
                    See Demo
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-xs text-muted-foreground mt-8">
                ⏰ Limited Stock | ✓ 24-Hour Delivery | 🔒 Personalized to Your Story
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <ScrollReveal animation="fade-up">
              <div>
                <Lock className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">Secure Payment</p>
                <p className="text-xs text-muted-foreground mt-1">Bank transfer verified</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={50}>
              <div>
                <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">24-Hour Delivery</p>
                <p className="text-xs text-muted-foreground mt-1">Fast turnaround</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={100}>
              <div>
                <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">Instant Delivery Link</p>
                <p className="text-xs text-muted-foreground mt-1">Share immediately</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150}>
              <div>
                <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">24/7 Support</p>
                <p className="text-xs text-muted-foreground mt-1">WhatsApp support</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div>
                <Gift className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">100% Personalized</p>
                <p className="text-xs text-muted-foreground mt-1">Your unique story</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Custom Experiences CTA */}
      <section className="py-16 md:py-20 bg-accent/5 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ScrollReveal animation="fade-up">
                <div>
                  <p className="text-sm uppercase tracking-widest text-accent mb-3">
                    Have Something Else In Mind?
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                    We Do Custom Experiences
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Birthday proposals? Engagement asks? Business announcements? We create personalized digital experiences for any special moment.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Tell us your idea and we'll craft something unique for you.
                  </p>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">
                      Request Custom Experience
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-right">
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="font-medium text-foreground mb-1">💍 Engagement</p>
                    <p className="text-xs text-muted-foreground">Personalized proposal experience</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="font-medium text-foreground mb-1">🎂 Birthday</p>
                    <p className="text-xs text-muted-foreground">Special celebration moments</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="font-medium text-foreground mb-1">💼 Business</p>
                    <p className="text-xs text-muted-foreground">Corporate announcements & launches</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border">
                    <p className="font-medium text-foreground mb-1">🎯 Custom</p>
                    <p className="text-xs text-muted-foreground">Any milestone or moment that matters</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal animation="fade-up">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  What We Create
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  Why Choose Digital Moment Studio?
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Forget generic templates. We craft personalized digital experiences that turn ordinary moments into extraordinary memories. Your story deserves more than a simple text or call.
                </p>
              </ScrollReveal>
              
              {/* Benefits */}
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-accent text-xl font-bold">✓</span>
                    <div>
                      <p className="font-medium text-foreground">Fully Personalized</p>
                      <p className="text-sm text-muted-foreground">Your names, your story, your message</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent text-xl font-bold">✓</span>
                    <div>
                      <p className="font-medium text-foreground">Beautiful & Interactive</p>
                      <p className="text-sm text-muted-foreground">Music, animations, and effects they'll love</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent text-xl font-bold">✓</span>
                    <div>
                      <p className="font-medium text-foreground">Easy to Share</p>
                      <p className="text-sm text-muted-foreground">Send via link or QR code—works on any device</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent text-xl font-bold">✓</span>
                    <div>
                      <p className="font-medium text-foreground">24-Hour Delivery</p>
                      <p className="text-sm text-muted-foreground">Get your personalized link fast</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="relative">
                <img 
                  src={momentHands} 
                  alt="Person experiencing a meaningful digital moment" 
                  className="w-full rounded-lg"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                See It In Action
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Experience The Magic
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-muted-foreground text-lg">
                Watch how a personalized Digital Moment Studio experience captivates and delights
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="fade-right">
              <div className="bg-foreground/5 rounded-lg aspect-video flex flex-col items-center justify-center border-2 border-dashed border-border">
                <Play className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-4 text-center px-6">
                  Live preview available after purchase
                </p>
                <Button variant="outline" asChild>
                  <Link to="/valentine-ask">
                    View Demo Experience
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <span className="text-xl">🎵</span> Personalized Music
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Beautiful background music sets the mood from the moment they open the link
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Stunning Animations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Smooth transitions, floating elements, and engaging visual effects throughout
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <span className="text-xl">💌</span> Your Message
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A personalized letter that appears with dramatic typing effect
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <span className="text-xl">🎉</span> Celebration Moment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Confetti, heart animations, and their names featured beautifully
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-accent mb-4">
                What Our Customers Say
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Moments That Changed Everything
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Chioma & Tunde",
                text: "The experience was absolutely beautiful! She cried happy tears when the music started. This was so much better than just asking her directly. It felt special, intentional, and so romantic. Thank you!",
                rating: 5
              },
              {
                name: "Sarah M.",
                text: "I was nervous about how to ask her out. This service made it perfect. The personalization was incredible—everything about it was tailored to our story. She said yes immediately and keeps rewatching it!",
                rating: 5
              },
              {
                name: "David & Zainab",
                text: "Honestly didn't know this existed but I'm so glad we found it. The animations, the music, her name throughout—it felt like it was made just for her. Best ₦8,000 I've ever spent. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <ScrollReveal 
                key={index}
                animation="fade-up" 
                delay={index * 100}
              >
                <div className="border border-border rounded-lg p-8 bg-background hover:border-accent/50 transition-colors">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="fade-right" className="order-2 lg:order-1">
              <img 
                src={valentineProduct} 
                alt="Valentine Ask Experience" 
                className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg\"
              />
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal animation="fade-up">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  Now Available
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={100}>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  Valentine Ask Experience
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                  A guided digital experience designed to help you ask an important question in a meaningful way. Refined, personal, and delivered directly to your recipient.
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-2xl font-serif text-foreground">₦8,000</span>
                  <span className="text-sm text-muted-foreground">One-time</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={400}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default" size="lg" asChild>
                    <Link to="/valentine-ask">
                      Learn More
                    </Link>
                  </Button>
                  <Button variant="cta" size="lg" asChild>
                    <Link to="/order">
                      Order Now
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Bonus */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-accent/10 border-2 border-accent/30 rounded-lg p-8 md:p-12 text-center">
            <ScrollReveal animation="fade-up">
              <Gift className="w-10 h-10 text-accent mx-auto mb-4" />
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Share & Earn Rewards
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground mb-8">
                Know someone who needs this? Share your unique referral link and earn ₦1,000 credit for every person who orders. No limits!
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-background p-4 rounded">
                  <p className="text-2xl font-serif text-accent mb-1">Share</p>
                  <p className="text-sm text-muted-foreground">Send your referral link</p>
                </div>
                <div className="bg-background p-4 rounded">
                  <p className="text-2xl font-serif text-accent mb-1">They Order</p>
                  <p className="text-sm text-muted-foreground">Friend creates experience</p>
                </div>
                <div className="bg-background p-4 rounded">
                  <p className="text-2xl font-serif text-accent mb-1">You Earn</p>
                  <p className="text-sm text-muted-foreground">₦1,000 store credit</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <Button variant="cta" size="lg" asChild>
                <Link to="/order">
                  Get Your Referral Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section 
        className="relative py-20 md:py-28"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <ScrollReveal animation="fade-up">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Our Philosophy
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Intention over impulse
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every experience we create is designed with emotional clarity in mind. We believe that how you say something matters as much as what you say.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <p className="text-muted-foreground leading-relaxed">
                Digital Moment Studio serves anyone who values presentation, intention, and meaningful communication—individuals, creators, and brands alike.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Email Capture / Newsletter */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal animation="fade-up">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
                Get Early Launch Updates
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-muted-foreground text-center mb-8">
                Be the first to know about new experience types, special promotions, and exclusive features. Join our community.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
              
              {subscribed && (
                <p className="text-center text-sm text-accent mt-4">
                  ✓ Thanks for subscribing! Check your email for confirmation.
                </p>
              )}
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-xs text-muted-foreground text-center mt-6">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal animation="scale">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              Ready to create a moment?
            </h2>
            <Button variant="cta" size="lg" asChild>
              <Link to="/valentine-ask">
                Start with Valentine Ask
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
