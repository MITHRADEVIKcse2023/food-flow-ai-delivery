
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, MapPin, ChevronRight, Package, Calendar, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  date: string;
  restaurantName: string;
  items: string[];
  total: string;
  status: 'completed' | 'active' | 'cancelled';
  trackingId?: string;
}

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("active");

  // This would fetch from Supabase in a real implementation
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For now, use mock data but later connect to Supabase
      const mockOrders: Order[] = [
        {
          id: '123456',
          date: '2025-04-13',
          restaurantName: 'Burger Delight',
          items: ['Cheese Burger', 'French Fries', 'Milkshake'],
          total: '$21.99',
          status: 'active',
          trackingId: '7890'
        },
        {
          id: '123457',
          date: '2025-04-10',
          restaurantName: 'Pizza Palace',
          items: ['Pepperoni Pizza', 'Garlic Bread', 'Coke'],
          total: '$29.99',
          status: 'completed'
        },
        {
          id: '123458',
          date: '2025-04-05',
          restaurantName: 'Sushi Spot',
          items: ['California Roll', 'Miso Soup', 'Green Tea'],
          total: '$35.50',
          status: 'completed'
        },
        {
          id: '123459',
          date: '2025-03-28',
          restaurantName: 'Taco Time',
          items: ['Burrito Bowl', 'Chips & Salsa', 'Lemonade'],
          total: '$18.75',
          status: 'cancelled'
        }
      ];
      
      return mockOrders;
    }
  });

  const handleTrackOrder = (trackingId: string) => {
    navigate(`/tracking?id=${trackingId}`);
  };

  // Group orders by status
  const activeOrders = orders?.filter(order => order.status === 'active') || [];
  const completedOrders = orders?.filter(order => order.status === 'completed') || [];
  const cancelledOrders = orders?.filter(order => order.status === 'cancelled') || [];

  if (isLoading) {
    return (
      <Layout>
        <div className="food-app-container py-8">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse inline-block h-8 w-8 rounded-full bg-foodapp-primary/30"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="food-app-container py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="active" className="relative">
              Active
              {activeOrders.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-foodapp-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          {/* Active Orders Tab */}
          <TabsContent value="active">
            {activeOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium">No active orders</h3>
                <p className="text-foodapp-gray mt-2 mb-6">Your active orders will appear here</p>
                <Button 
                  onClick={() => navigate('/restaurants')}
                  className="bg-foodapp-primary hover:bg-foodapp-primary/90"
                >
                  Browse Restaurants
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-foodapp-primary">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{order.restaurantName}</h3>
                        <p className="text-sm text-foodapp-gray">Order #{order.id}</p>
                      </div>
                      <div className="flex items-center bg-foodapp-primary/10 text-foodapp-primary rounded-full px-3 py-1 text-sm">
                        <Clock size={14} className="mr-1" />
                        <span>On the way</span>
                      </div>
                    </div>
                    
                    <div className="py-3 border-t border-b border-gray-100">
                      <p className="text-sm text-foodapp-gray">{order.items.join(", ")}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-semibold">{order.total}</span>
                      {order.trackingId && (
                        <Button 
                          onClick={() => handleTrackOrder(order.trackingId!)}
                          className="text-sm bg-foodapp-primary text-white px-4 py-2 rounded-full hover:bg-foodapp-primary/90"
                        >
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Completed Orders Tab */}
          <TabsContent value="completed">
            {completedOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium">No completed orders</h3>
                <p className="text-foodapp-gray mt-2">Your order history will appear here</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden divide-y">
                {completedOrders.map((order) => (
                  <div key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{order.restaurantName}</h3>
                      <div className="flex items-center bg-green-50 text-green-600 rounded-full px-3 py-1 text-xs">
                        <CheckCircle2 size={12} className="mr-1" />
                        <span>Delivered</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-foodapp-gray mb-2">
                      <Calendar size={12} className="mr-1" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                      <MapPin size={12} className="ml-2 mr-1" />
                      <span>Order #{order.id}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{order.total}</span>
                      <button className="text-foodapp-primary flex items-center text-sm">
                        <span>Details</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Cancelled Orders Tab */}
          <TabsContent value="cancelled">
            {cancelledOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <X size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium">No cancelled orders</h3>
                <p className="text-foodapp-gray mt-2">Cancelled orders will appear here</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden divide-y">
                {cancelledOrders.map((order) => (
                  <div key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{order.restaurantName}</h3>
                      <div className="flex items-center bg-red-50 text-red-600 rounded-full px-3 py-1 text-xs">
                        <X size={12} className="mr-1" />
                        <span>Cancelled</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-foodapp-gray mb-2">
                      <Calendar size={12} className="mr-1" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{order.total}</span>
                      <button className="text-foodapp-primary flex items-center text-sm">
                        <span>Details</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Orders;
