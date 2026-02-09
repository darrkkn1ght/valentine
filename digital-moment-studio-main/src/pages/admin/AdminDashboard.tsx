import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Package, Users, DollarSign, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Order = Tables<'orders'>;
type ReferralCode = Tables<'referral_codes'>;

const AdminDashboard = () => {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [referrals, setReferrals] = useState<ReferralCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      // Fetch orders using edge function (since we don't have SELECT policy)
      const { data: ordersData, error: ordersError } = await supabase
        .functions.invoke('admin-orders', { body: { action: 'list' } });

      if (ordersError) throw ordersError;
      setOrders(ordersData?.orders || []);

      // Fetch referral codes (public read for active ones)
      const { data: refData } = await supabase
        .from('referral_codes')
        .select('*');

      setReferrals(refData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const confirmPayment = async (orderId: string) => {
    try {
      const { error } = await supabase.functions.invoke('admin-orders', {
        body: { action: 'confirm', orderId },
      });

      if (error) throw error;

      toast({
        title: 'Payment confirmed',
        description: 'The order has been marked as paid.',
      });

      fetchData();
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to confirm payment.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');
  const totalRevenue = confirmedOrders.reduce((sum, o) => sum + o.product_price, 0);
  const referralOrders = orders.filter(o => o.referral_code);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Digital Moment Studio</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={fetchData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-serif">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-serif">{pendingOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-serif">₦{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Referral Orders</p>
                  <p className="text-2xl font-serif">{referralOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage and confirm customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No orders yet</div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{order.full_name}</span>
                            <Badge
                              variant={order.status === 'confirmed' ? 'default' : 'secondary'}
                              className={order.status === 'confirmed' ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}
                            >
                              {order.status}
                            </Badge>
                            {order.referral_code && (
                              <Badge variant="outline">ref: {order.referral_code}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                          <p className="text-sm text-muted-foreground">{order.whatsapp_number}</p>
                          <p className="text-sm mt-1">
                            {order.product_name} — ₦{order.product_price.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(order.created_at).toLocaleDateString('en-NG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        {order.status === 'pending' && (
                          <Button size="sm" onClick={() => confirmPayment(order.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm Payment
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Referral Codes</CardTitle>
                <CardDescription>Track marketer performance and commissions</CardDescription>
              </CardHeader>
              <CardContent>
                {referrals.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No referral codes yet</div>
                ) : (
                  <div className="space-y-4">
                    {referrals.map((ref) => (
                      <div
                        key={ref.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{ref.marketer_name}</span>
                            <Badge variant="outline">{ref.code}</Badge>
                            {!ref.is_active && <Badge variant="destructive">Inactive</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{ref.marketer_whatsapp}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span>Orders: <strong>{ref.total_orders}</strong></span>
                            <span>Commission Rate: <strong>{ref.commission_rate}%</strong></span>
                            <span>Total Earned: <strong>₦{ref.total_commission.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
