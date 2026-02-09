import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight, Copy, Check, MessageCircle } from 'lucide-react';
import { useSEO, addSchemaMarkup } from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import {
  createOrder,
  storeOrderLocally,
  orderSchema,
  VALENTINE_ASK_PRODUCT,
  BANK_DETAILS,
  formatCurrency,
  WHATSAPP_NUMBER,
  OrderFormData
} from '@/lib/order';
import { getStoredReferralCode } from '@/lib/referral';

const Order = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    email: '',
    whatsappNumber: '',
  });

  useSEO({
    title: 'Order Valentine Ask Experience - ₦8,000',
    description: 'Order your personalized Valentine digital experience. Fill in your details and complete payment via bank transfer. Delivery within 24 hours.',
    image: 'https://digital-moment-studio.onrender.com/valentine-ask-preview.jpg',
    type: 'product'
  });

  useEffect(() => {
    addSchemaMarkup(orderSchema);
  }, []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralCode = getStoredReferralCode();

  const validateForm = (): boolean => {
    const result = orderSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const order = createOrder(formData, referralCode);

      // Submit to database via edge function
      const { error } = await supabase.functions.invoke('submit-order', {
        body: order
      });

      if (error) {
        console.error('Order submission error:', error);
        toast({
          title: 'Error',
          description: 'Failed to submit order. Please try again.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      storeOrderLocally(order);
      navigate('/success');
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout>
      <section className="section-padding min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12 animate-fade-up">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Order</p>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                Complete Your Order
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-fade-up delay-100">
                <div className="border border-border p-8 md:p-10 rounded-xl">
                  <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">
                    Your Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? 'border-destructive' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-destructive">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsappNumber" className="text-sm">WhatsApp</Label>
                      <Input
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        placeholder="08012345678"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        className={errors.whatsappNumber ? 'border-destructive' : ''}
                      />
                      {errors.whatsappNumber && (
                        <p className="text-xs text-destructive">{errors.whatsappNumber}</p>
                      )}
                    </div>

                    {/* Product Summary */}
                    <div className="pt-5 mt-5 border-t-2 border-dashed border-border/60 bg-muted/20 -mx-8 px-8 pb-2 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Product</span>
                        <span className="text-foreground font-medium">{VALENTINE_ASK_PRODUCT.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-base">
                        <span className="text-muted-foreground">Total to Pay</span>
                        <span className="text-2xl font-serif text-foreground">
                          {formatCurrency(VALENTINE_ASK_PRODUCT.price)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Order'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="animate-fade-up delay-200">
                <div className="bg-secondary p-8 md:p-10 rounded-xl">
                  <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">
                    Payment
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-background p-5 border border-border">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Transfer to</p>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Bank</p>
                          <p className="font-medium text-foreground">{BANK_DETAILS.bankName}</p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-lg text-foreground">
                              {BANK_DETAILS.accountNumber}
                            </p>
                            <button
                              type="button"
                              onClick={copyAccountNumber}
                              className="p-1.5 hover:bg-muted rounded transition-colors"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-success" />
                              ) : (
                                <Copy className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Account Name</p>
                          <p className="font-medium text-foreground">{BANK_DETAILS.accountName}</p>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">Amount</p>
                          <p className="text-2xl font-serif text-accent">
                            {formatCurrency(BANK_DETAILS.amount)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-foreground">After Payment</h3>
                      <ol className="space-y-1 text-sm text-muted-foreground">
                        <li>1. Screenshot your receipt</li>
                        <li>2. Send via WhatsApp</li>
                        <li>3. Receive confirmation within 24hrs</li>
                      </ol>
                    </div>

                    <Button
                      type="button"
                      variant="whatsapp"
                      size="lg"
                      className="w-full"
                      onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Order;