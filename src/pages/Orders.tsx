
import React from 'react';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, MapPin, ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  restaurantName: string;
  items: string[];
  total: string;
  status: 'completed' | 'active' | 'cancelled';
  trackingId?: string;
}

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

const Orders: React.FC = () => {
  const navigate = useNavigate();

  const handleTrackOrder = (trackingId: string) => {
    navigate(`/tracking?id=${trackingId}`);
  };

  // Group orders by status
  const activeOrders = mockOrders.filter(order => order.status === 'active');
  const previousOrders = mockOrders.filter(order => order.status !== 'active');

  return (
    <Layout>
      <div className="food-app-container py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {/* Active Orders Section */}
        {activeOrders.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
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
                      <button 
                        onClick={() => handleTrackOrder(order.trackingId!)}
                        className="text-sm bg-foodapp-primary text-white px-4 py-2 rounded-full hover:bg-foodapp-primary/90"
                      >
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Previous Orders Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {previousOrders.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-foodapp-gray">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="divide-y">
                {previousOrders.map((order) => (
                  <div key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{order.restaurantName}</h3>
                      <div className={`flex items-center rounded-full px-3 py-1 text-xs ${
                        order.status === 'completed' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {order.status === 'completed' ? (
                          <CheckCircle2 size={12} className="mr-1" />
                        ) : (
                          <Clock size={12} className="mr-1" />
                        )}
                        <span>{order.status === 'completed' ? 'Delivered' : 'Cancelled'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-foodapp-gray mb-2">
                      <MapPin size={12} className="mr-1" />
                      <span>Order #{order.id} • {new Date(order.date).toLocaleDateString()}</span>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
