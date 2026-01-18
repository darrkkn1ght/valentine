import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, orderId } = await req.json();

    console.log('Admin action:', action, orderId);

    if (action === 'list') {
      // List all orders
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch orders' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ orders }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'confirm' && orderId) {
      // Confirm payment for an order
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (fetchError || !order) {
        return new Response(
          JSON.stringify({ error: 'Order not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'confirmed',
          payment_confirmed_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating order:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update order' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update referral commission if applicable
      if (order.referral_code) {
        const commissionRate = 0.20; // 20%
        const commission = Math.floor(order.product_price * commissionRate);

        // Get current referral stats
        const { data: refCode } = await supabase
          .from('referral_codes')
          .select('total_orders, total_commission')
          .eq('code', order.referral_code)
          .single();

        if (refCode) {
          await supabase
            .from('referral_codes')
            .update({
              total_orders: refCode.total_orders + 1,
              total_commission: refCode.total_commission + commission,
            })
            .eq('code', order.referral_code);

          console.log(`Updated referral ${order.referral_code}: +1 order, +₦${commission} commission`);
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
