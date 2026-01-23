import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, Check } from 'lucide-react';
import { useSEO, addSchemaMarkup, productSchema } from '@/hooks/useSEO';
import { detectAndStoreReferral } from '@/lib/referral';
import { VALENTINE_CARD_PRODUCT, formatCurrency } from '@/lib/order';
import valentineProduct from '@/assets/valentine-product.jpg';
import momentHands from '@/assets/moment-hands.jpg';

const ValentineCard = () => {
    useSEO({
        title: 'Valentine Card Digital Experience - ₦8,000',
        description: 'A beautiful digital card with music and personalized message. The classic way to ask the question. Order now - delivery within 24 hours.',
        image: 'https://digital-moment-studio.onrender.com/valentine-ask-preview.jpg', // Using same preview for now
        type: 'product'
    });

    useEffect(() => {
        detectAndStoreReferral();
        addSchemaMarkup(productSchema);
    }, []);

    return (
        <PageLayout>
            {/* Hero */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="animate-fade-up">
                            <p className="text-xs uppercase tracking-widest text-accent mb-4">
                                Digital Experience
                            </p>

                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
                                Valentine Card
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                                A classic, elegant digital card tailored to your story. Featuring music, beautiful typography, and your heartfelt message.
                            </p>

                            <div className="flex items-baseline gap-3 mb-8">
                                <span className="text-3xl font-serif text-foreground">
                                    {formatCurrency(VALENTINE_CARD_PRODUCT.price)}
                                </span>
                                <span className="text-sm text-muted-foreground">one-time</span>
                            </div>

                            <Button variant="cta" size="xl" asChild>
                                <Link to={`/order?product=${VALENTINE_CARD_PRODUCT.id}`}>
                                    Create My Moment Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="animate-fade-up delay-200">
                            <img
                                src={valentineProduct}
                                alt="Valentine Card Experience Preview"
                                className="w-full max-w-md mx-auto lg:ml-auto rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Experience */}
            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <img
                                src={momentHands}
                                alt="Experiencing a digital moment"
                                className="w-full rounded-lg"
                            />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                                The Experience
                            </p>
                            <h2 className="font-serif text-3xl text-foreground mb-6">
                                Timeless Romance
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Sometimes the classic approach is best. The Valentine Card experience delivers your message in a beautifully designed digital envelope, complete with mood-setting music and elegant animations.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                It's simple, direct, and undeniably romantic.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mb-12">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                            Process
                        </p>
                        <h2 className="font-serif text-3xl text-foreground">
                            How It Works
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <span className="inline-block text-xs font-medium text-accent uppercase tracking-wider">01</span>
                            <h3 className="text-lg font-medium text-foreground">Order</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Choose the "Card" option, submit your message, and complete payment.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <span className="inline-block text-xs font-medium text-accent uppercase tracking-wider">02</span>
                            <h3 className="text-lg font-medium text-foreground">We Design</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Our designers arrange your message with our premium templates and music.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <span className="inline-block text-xs font-medium text-accent uppercase tracking-wider">03</span>
                            <h3 className="text-lg font-medium text-foreground">Send</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                You get a private link. Share it with your special someone and wait for their reply.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                                Included
                            </p>
                            <h2 className="font-serif text-3xl text-foreground mb-8">
                                What You Get
                            </h2>

                            <div className="space-y-5">
                                {[
                                    'Personalized message layout',
                                    'Background music selection',
                                    'Elegant typography (Playful or Glamorous)',
                                    'Mobile and Desktop optimized',
                                    'Private shareable link',
                                    'Delivered within 24 hours',
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-background p-8 md:p-12 border border-border">
                            <h3 className="font-serif text-2xl text-foreground mb-4">
                                Ready to deliver your message?
                            </h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Create a lasting memory with a digital card they can keep forever.
                            </p>
                            <Button variant="cta" size="lg" asChild>
                                <Link to={`/order?product=${VALENTINE_CARD_PRODUCT.id}`}>
                                    Order Valentine Card
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default ValentineCard;
