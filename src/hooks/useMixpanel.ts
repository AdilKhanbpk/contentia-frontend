import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  trackEvent, 
  trackPageView, 
  identifyUser, 
  setUserProperties, 
  resetUser,
  isMixpanelReady 
} from '@/utils/mixpanel/mixpanelUtils';
import type { MixpanelEventProperties, UserProperties } from '@/utils/mixpanel/mixpanelUtils';

/**
 * Custom hook for Mixpanel tracking
 * Provides easy-to-use methods for tracking events and managing user data
 */
export const useMixpanel = () => {
  const pathname = usePathname();

  // Track page views automatically when pathname changes
  useEffect(() => {
    if (isMixpanelReady()) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Memoized tracking functions
  const track = useCallback((eventName: string, properties?: MixpanelEventProperties) => {
    trackEvent(eventName, properties);
  }, []);

  const identify = useCallback((userId: string) => {
    identifyUser(userId);
  }, []);

  const setUser = useCallback((properties: UserProperties) => {
    setUserProperties(properties);
  }, []);

  const reset = useCallback(() => {
    resetUser();
  }, []);

  const trackClick = useCallback((elementName: string, additionalProperties?: MixpanelEventProperties) => {
    track('Element Clicked', {
      element_name: elementName,
      page_path: pathname,
      ...additionalProperties
    });
  }, [track, pathname]);

  const trackFormSubmit = useCallback((formName: string, additionalProperties?: MixpanelEventProperties) => {
    track('Form Submitted', {
      form_name: formName,
      page_path: pathname,
      ...additionalProperties
    });
  }, [track, pathname]);

  const trackError = useCallback((errorMessage: string, errorType?: string) => {
    track('Error Occurred', {
      error_message: errorMessage,
      error_type: errorType,
      page_path: pathname
    });
  }, [track, pathname]);

  return {
    track,
    identify,
    setUser,
    reset,
    trackClick,
    trackFormSubmit,
    trackError,
    isReady: isMixpanelReady()
  };
};

export default useMixpanel;
