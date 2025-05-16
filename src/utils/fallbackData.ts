/**
 * This file contains fallback data for various API endpoints
 * to ensure the application works even when API calls fail
 */

// Default landing page data to use when API fails
export const defaultLandingPageData = {
  title: "Contentia",
  subtitle: "Your Content Creation Platform",
  description: "Connect with creators and grow your business with high-quality content.",
  heroImage: "/images/default-hero.jpg",
  features: [
    {
      title: "Content Creation",
      description: "Professional content creation services for your business",
      icon: "📝"
    },
    {
      title: "Creator Network",
      description: "Access to a network of professional content creators",
      icon: "🌐"
    },
    {
      title: "Analytics",
      description: "Track the performance of your content",
      icon: "📊"
    }
  ],
  ctaText: "Get Started",
  ctaLink: "/register"
};

// Default about page data
export const defaultAboutData = {
  title: "About Contentia",
  content: "Contentia is a platform connecting businesses with content creators.",
  contactTitle: "Contact Us",
  contactEmail: "info@contentia.io",
  contactPhone: "0850 302 71 32",
  contactAddress: "Istanbul, Turkey",
  buttonUrl: "https://calendly.com/contentia",
};

// Default help center data
export const defaultHelpCenterData = {
  categories: [
    {
      title: "Getting Started",
      slug: "getting-started",
      articles: [
        {
          title: "How to Create an Account",
          slug: "how-to-create-account",
          content: "Follow these steps to create your account..."
        }
      ]
    }
  ]
};

// Function to handle API errors and return fallback data
export const handleApiError = (error: any, fallbackData: any, entityName: string) => {
  console.error(`Error fetching ${entityName} data:`, error);
  
  // Log detailed error information in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Detailed error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
  }
  
  return fallbackData;
};
