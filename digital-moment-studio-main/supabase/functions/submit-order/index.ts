import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  fullName: string;
  email: string;
  whatsappNumber: string;
  productName: string;
  productPrice: number;
  currency: string;
  referralCode: string | null;
  source: 'referral' | 'direct';
  timestamp: string;
  status: 'pending';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_URL');

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const order: OrderData = await req.json();

    console.log('Received order:', order);

    // Validate required fields
    if (!order.fullName || !order.email || !order.whatsappNumber) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(order.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert order into database
    const { data: insertedOrder, error: dbError } = await supabase
      .from('orders')
      .insert({
        full_name: order.fullName.trim(),
        email: order.email.toLowerCase().trim(),
        whatsapp_number: order.whatsappNumber.trim(),
        product_name: order.productName,
        product_price: order.productPrice,
        currency: order.currency,
        referral_code: order.referralCode,
        source: order.source,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Order saved:', insertedOrder);

    // Update referral stats if applicable
    if (order.referralCode) {
      const { error: refError } = await supabase
        .from('referral_codes')
        .update({
          total_orders: supabase.rpc('increment_counter', { row_id: order.referralCode })
        })
        .eq('code', order.referralCode);

      if (refError) {
        console.warn('Failed to update referral stats:', refError);
      }
    }

    // Send to webhook (Zapier/Make) if configured
    if (webhookUrl) {
      try {
        console.log('Sending to webhook:', webhookUrl);
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: insertedOrder.id,
            fullName: order.fullName,
            email: order.email,
            whatsappNumber: order.whatsappNumber,
            productName: order.productName,
            productPrice: order.productPrice,
            currency: order.currency,
            referralCode: order.referralCode,
            source: order.source,
            createdAt: insertedOrder.created_at,
          }),
        });
        console.log('Webhook sent successfully');
      } catch (webhookError) {
        console.error('Webhook error (non-blocking):', webhookError);
        // Don't fail the order if webhook fails
      }
    } else {
      console.log('No webhook URL configured, skipping notification');
    }

    return new Response(
      JSON.stringify({ success: true, orderId: insertedOrder.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});