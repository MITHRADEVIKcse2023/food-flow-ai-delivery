
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-6">
        <img 
          src="/lovable-uploads/f3f71c2a-7bdd-4294-8020-c4a6b24daa96.png" 
          alt="Food illustration" 
          className="w-40 h-40 mx-auto mb-8 opacity-50"
        />
        <h1 className="text-6xl font-bold text-foodapp-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
        <p className="text-foodapp-gray mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-foodapp-primary text-white rounded-full transition-all hover:bg-foodapp-primary/90"
        >
          <HomeIcon size={18} className="mr-2" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
