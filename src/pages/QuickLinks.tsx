
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronRight, Apple, Play } from 'lucide-react';

interface LinkSectionProps {
  title: string;
  links: { name: string; href: string; external?: boolean }[];
}

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="text-foodapp-primary mr-2" />
          {link.external ? (
            <a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-foodapp-primary flex items-center"
            >
              {link.name}
              <ExternalLink size={14} className="ml-1" />
            </a>
          ) : (
            <Link 
              to={link.href} 
              className="text-gray-700 hover:text-foodapp-primary"
            >
              {link.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
);

const AppDownloadSection: React.FC = () => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-6">Download Our App</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a 
        href="#" 
        className="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3 px-4 hover:bg-gray-800 transition"
      >
        <Apple size={24} />
        <div className="text-left">
          <div className="text-xs">Download on the</div>
          <div className="font-semibold">App Store</div>
        </div>
      </a>
      <a 
        href="#" 
        className="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3 px-4 hover:bg-gray-800 transition"
      >
        <Play size={24} />
        <div className="text-left">
          <div className="text-xs">GET IT ON</div>
          <div className="font-semibold">Google Play</div>
        </div>
      </a>
    </div>
  </div>
);

const QuickLinks: React.FC = () => {
  return (
    <Layout>
      <div className="food-app-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Quick Links</h1>
          <p className="text-xl text-foodapp-gray mb-12">
            FoodFlow – Delicious food delivered to your doorstep
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <LinkSection 
                title="About Us"
                links={[
                  { name: "Our Story", href: "/our-story" },
                  { name: "Blog", href: "/blog" },
                  { name: "Careers", href: "/careers" }
                ]}
              />
              
              <LinkSection 
                title="Support"
                links={[
                  { name: "Help Center", href: "/help" },
                  { name: "Safety", href: "/safety" },
                  { name: "Terms of Service", href: "/terms" }
                ]}
              />
            </div>
            
            <div>
              <AppDownloadSection />
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                <p className="text-foodapp-gray mb-4">
                  Have questions, feedback, or need assistance? Our support team is here to help!
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-foodapp-primary text-white px-6 py-3 rounded-lg hover:bg-foodapp-primary/90 transition"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuickLinks;
