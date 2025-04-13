
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface OrderMapProps {
  deliveryLocation?: [number, number]; // [longitude, latitude]
  customerLocation?: [number, number]; // [longitude, latitude]
}

const OrderMap: React.FC<OrderMapProps> = ({ 
  deliveryLocation = [-73.9857, 40.7484], // Default: Manhattan
  customerLocation = [-73.9712, 40.7831]  // Default: Upper East Side
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState(false);

  // For demo purposes, we'll use a simple input for the Mapbox token
  // In a real app, this would come from environment variables or Supabase
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    if (map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: deliveryLocation,
      zoom: 13
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      setMapLoaded(true);
      
      if (map.current) {
        // Add delivery person marker
        new mapboxgl.Marker({ color: '#F97316' })
          .setLngLat(deliveryLocation)
          .addTo(map.current);
          
        // Add customer marker
        new mapboxgl.Marker({ color: '#8B5CF6' })
          .setLngLat(customerLocation)
          .addTo(map.current);
          
        // Add a route line between delivery person and customer
        if (map.current.getSource('route')) {
          (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [deliveryLocation, customerLocation]
            }
          });
        } else {
          map.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [deliveryLocation, customerLocation]
              }
            }
          });
          
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#8B5CF6',
              'line-width': 4,
              'line-opacity': 0.75
            }
          });
        }
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [deliveryLocation, customerLocation, mapboxToken]);

  // Simulate delivery person movement for demo
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    const intervalId = setInterval(() => {
      if (map.current && mapLoaded) {
        // Simulate movement: slightly adjust the delivery location
        const newLng = deliveryLocation[0] + (Math.random() * 0.001 - 0.0005);
        const newLat = deliveryLocation[1] + (Math.random() * 0.001 - 0.0005);
        
        // Update marker position
        const markers = document.querySelectorAll('.mapboxgl-marker');
        if (markers.length > 0) {
          // The first marker is the delivery person
          const marker = new mapboxgl.Marker({ color: '#F97316' })
            .setLngLat([newLng, newLat])
            .addTo(map.current);
          
          // Remove old marker
          markers[0].remove();
        }
      }
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [mapLoaded, deliveryLocation]);

  const handleSaveToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('mapboxToken') as HTMLInputElement;
    const token = input.value;
    
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <div className="text-center">
          <MapPin size={32} className="mx-auto mb-2 text-foodapp-primary" />
          <h3 className="font-medium mb-4">Map requires a Mapbox access token</h3>
          <form onSubmit={handleSaveToken} className="space-y-4">
            <div>
              <input 
                type="text" 
                name="mapboxToken"
                placeholder="Enter your Mapbox public token" 
                className="search-input w-full"
              />
              <p className="text-xs mt-2 text-foodapp-gray">
                Get your free token at <a href="https://mapbox.com/" className="text-foodapp-primary" target="_blank" rel="noopener noreferrer">mapbox.com</a>
              </p>
            </div>
            <button type="submit" className="w-full bg-foodapp-primary text-white px-4 py-2 rounded">
              Save Token
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-sm">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default OrderMap;
