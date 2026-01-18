import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { getLastOrder, getWhatsAppLink, OrderData } from '@/lib/order';

const Success = () => {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const lastOrder = getLastOrder();
    setOrder(lastOrder);
  }, []);

  const whatsappLink = order ? getWhatsAppLink(order) : '#';

  return (
    <PageLayout showFooter={false}>
      <section className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-success flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-up delay-100">
              <h1 className="font-serif text-3xl text-foreground">
                Order Received
              </h1>
              
              <p className="text-muted-foreground">
                Thank you for your order. Please complete the payment and send your receipt to confirm.
              </p>

              {order && (
                <div className="text-left bg-secondary p-6 space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Name:</span> {order.fullName}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Product:</span> {order.productName}
                  </p>
                </div>
              )}

              <div className="text-left bg-muted p-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Next Steps</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Complete bank transfer</li>
                  <li>2. Screenshot your receipt</li>
                  <li>3. Send via WhatsApp</li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="flex-1"
                  onClick={() => window.open(whatsappLink, '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Receipt
                </Button>
                
                <Button variant="outline" size="lg" className="flex-1" asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Success;