
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronRight } from 'lucide-react';

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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75-.55 4.15-1.5 1.5-1.05 2.5-2.5 3.25-4.33a14.09 14.09 0 0 0 1.1-5.35c0-2.8-1.1-4.95-2.85-6.15S13.45 2 12 2s-3.35.67-5.1 1.6c-1.8 1.2-2.9 3.35-2.9 6.15 0 1.8.35 3.5 1.1 5.35.7 1.5 1.75 3.3 3.25 4.35 1.4.94 2.7 1.5 4.15 1.5Z" /><path d="M12 20.94c-1.45 0-2.75-.55-4.15-1.5a14.5 14.5 0 0 1-3.25-4.35 14.09 14.09 0 0 1-1.1-5.35c0-2.8 1.1-4.95 2.9-6.15S9.6 2 12 2s3.35.67 5.1 1.6c1.75 1.2 2.85 3.35 2.85 6.15 0 1.8-.35 3.5-1.1 5.35-.75 1.83-1.75 3.28-3.25 4.33-1.4.95-2.65 1.5-4.15 1.5Z" /><path d="M12 7v5" /><path d="M15 10h-6" /></svg>
        <div className="text-left">
          <div className="text-xs">Download on the</div>
          <div className="font-semibold">App Store</div>
        </div>
      </a>
      <a 
        href="#" 
        className="flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3 px-4 hover:bg-gray-800 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg>
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
