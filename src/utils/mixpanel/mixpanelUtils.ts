import mixpanel from "mixpanel-browser";// Types for better type safety
export interface MixpanelEventProperties {
  [key: string]: any;
}

export interface UserProperties {
  $email?: string;
  $name?: string;
  $created?: string;
  user_id?: string;
  user_type?: 'customer' | 'admin' | 'creator';
  subscription_plan?: string;
  [key: string]: any;
}

// Mixpanel instance wrapper class
class MixpanelService {
  private isInitialized = false;
  private isEnabled = false;

  /**
   * Initialize Mixpanel with proper error handling
   */
  init(): boolean {
    try {
      const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN;
      
      if (!mixpanelToken) {
        console.warn("⚠️ Mixpanel: Project token is missing in environment variables");
        return false;
      }

      if (typeof window === 'undefined') {
        console.warn("⚠️ Mixpanel: Not running in browser environment");
        return false;
      }

      if (this.isInitialized) {
        console.log("🔄 Mixpanel: Already initialized");
        return true;
      }

      // Initialize Mixpanel
      mixpanel.init(mixpanelToken, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: true,
        persistence: "localStorage",
        property_blacklist: ['$current_url', '$initial_referrer', '$referrer'],
        loaded: (mixpanel) => {
          console.log("✅ Mixpanel: Successfully loaded and initialized");
        }
      });

      this.isInitialized = true;
      this.isEnabled = true;

      // Track initial app load
      this.track("App Loaded", {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });

      // Enable auto-tracking
      this.enableAutoTracking();

      console.log("✅ Mixpanel: Initialization completed successfully");
      return true;

    } catch (error) {
      console.error("❌ Mixpanel: Failed to initialize", error);
      this.isEnabled = false;
      return false;
    }
  }

  /**
   * Enable automatic tracking for links and forms
   */
private enableAutoTracking(): void {
  try {
    // Wait for DOM to be ready and then check for elements
    const setupTracking = () => {
      // Check if there are any anchor elements before tracking
      const links = document.querySelectorAll("a");
      if (links.length > 0) {
        mixpanel.track_links("a", "Link Clicked", (element: HTMLAnchorElement) => ({
          link_text: element.innerText?.trim() || '',
          link_url: element.href || '',
          link_target: element.target || '_self'
        }));
        console.log(`✅ Mixpanel: Link tracking enabled for ${links.length} links`);
      } else {
        console.log("ℹ️ Mixpanel: No links found, skipping link tracking");
      }

      // Check if there are any form elements before tracking
      const forms = document.querySelectorAll("form");
      if (forms.length > 0) {
        mixpanel.track_forms("form", "Form Submitted", (form: HTMLFormElement) => ({
          form_id: form.id || '',
          form_action: form.action || '',
          form_method: form.method || 'GET'
        }));
        console.log(`✅ Mixpanel: Form tracking enabled for ${forms.length} forms`);
      } else {
        console.log("ℹ️ Mixpanel: No forms found, skipping form tracking");
      }
    };

    // If DOM is already loaded, setup immediately
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupTracking);
    } else {
      // DOM is already loaded, but wait a bit for React components to render
      setTimeout(setupTracking, 100);
    }

    console.log("✅ Mixpanel: Auto-tracking setup initiated");
  } catch (error) {
    console.error("❌ Mixpanel: Failed to enable auto-tracking", error);
  }
}


  /**
   * Track an event with properties
   */
  track(eventName: string, properties?: MixpanelEventProperties): void {
    if (!this.isEnabled) {
      console.warn(`⚠️ Mixpanel: Cannot track event "${eventName}" - service not enabled`);
      return;
    }

    try {
      const eventProperties = {
        ...properties,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title
      };

      mixpanel.track(eventName, eventProperties);
      console.log(`📊 Mixpanel: Tracked event "${eventName}"`, eventProperties);
    } catch (error) {
      console.error(`❌ Mixpanel: Failed to track event "${eventName}"`, error);
    }
  }

  /**
   * Identify a user
   */
  identify(userId: string): void {
    if (!this.isEnabled) {
      console.warn("⚠️ Mixpanel: Cannot identify user - service not enabled");
      return;
    }

    try {
      mixpanel.identify(userId);
      console.log(`👤 Mixpanel: User identified: ${userId}`);
    } catch (error) {
      console.error("❌ Mixpanel: Failed to identify user", error);
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: UserProperties): void {
    if (!this.isEnabled) {
      console.warn("⚠️ Mixpanel: Cannot set user properties - service not enabled");
      return;
    }

    try {
      mixpanel.people.set(properties);
      console.log("👤 Mixpanel: User properties set", properties);
    } catch (error) {
      console.error("❌ Mixpanel: Failed to set user properties", error);
    }
  }

  /**
   * Track page view
   */
  trackPageView(pageName?: string): void {
    if (!this.isEnabled) return;

    try {
      const properties = {
        page_name: pageName || document.title,
        page_url: window.location.href,
        referrer: document.referrer
      };

      this.track("Page Viewed", properties);
    } catch (error) {
      console.error("❌ Mixpanel: Failed to track page view", error);
    }
  }

  /**
   * Reset user data (for logout)
   */
  reset(): void {
    if (!this.isEnabled) return;

    try {
      mixpanel.reset();
      console.log("🔄 Mixpanel: User data reset");
    } catch (error) {
      console.error("❌ Mixpanel: Failed to reset user data", error);
    }
  }

  /**
   * Check if Mixpanel is properly initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.isEnabled;
  }
}

// Create singleton instance
const mixpanelService = new MixpanelService();

// Export the service instance and initialization function
export const initMixpanel = () => mixpanelService.init();
export const trackEvent = (eventName: string, properties?: MixpanelEventProperties) => 
  mixpanelService.track(eventName, properties);
export const identifyUser = (userId: string) => mixpanelService.identify(userId);
export const setUserProperties = (properties: UserProperties) => 
  mixpanelService.setUserProperties(properties);
export const trackPageView = (pageName?: string) => mixpanelService.trackPageView(pageName);
export const resetUser = () => mixpanelService.reset();
export const isMixpanelReady = () => mixpanelService.isReady();

export default mixpanelService;
