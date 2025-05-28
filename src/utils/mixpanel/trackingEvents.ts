import { trackEvent, identifyUser, setUserProperties, resetUser } from './mixpanelUtils';
import type { MixpanelEventProperties, UserProperties } from './mixpanelUtils';

// Authentication Events
export const trackUserSignup = (method: 'email' | 'google' | 'facebook' | 'apple', userId?: string) => {
  trackEvent('User Signup', {
    signup_method: method,
    user_id: userId
  });
};

export const trackUserLogin = (method: 'email' | 'google' | 'facebook' | 'apple', userId?: string) => {
  trackEvent('User Login', {
    login_method: method,
    user_id: userId
  });
  
  if (userId) {
    identifyUser(userId);
  }
};

export const trackUserLogout = () => {
  trackEvent('User Logout');
  resetUser();
};

// Content Creation Events
export const trackContentCreated = (contentType: string, contentId?: string) => {
  trackEvent('Content Created', {
    content_type: contentType,
    content_id: contentId
  });
};

export const trackContentPublished = (contentType: string, contentId?: string) => {
  trackEvent('Content Published', {
    content_type: contentType,
    content_id: contentId
  });
};

export const trackContentDeleted = (contentType: string, contentId?: string) => {
  trackEvent('Content Deleted', {
    content_type: contentType,
    content_id: contentId
  });
};

// File Management Events
export const trackFileUploaded = (fileType: string, fileSize?: number, fileName?: string) => {
  trackEvent('File Uploaded', {
    file_type: fileType,
    file_size: fileSize,
    file_name: fileName
  });
};

export const trackFileDownloaded = (fileType: string, fileName?: string) => {
  trackEvent('File Downloaded', {
    file_type: fileType,
    file_name: fileName
  });
};

// Navigation Events
export const trackPageVisit = (pageName: string, section?: string) => {
  trackEvent('Page Visit', {
    page_name: pageName,
    section: section
  });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('Button Clicked', {
    button_name: buttonName,
    location: location
  });
};

// Search Events
export const trackSearch = (query: string, resultsCount?: number) => {
  trackEvent('Search Performed', {
    search_query: query,
    results_count: resultsCount
  });
};

// E-commerce Events (if applicable)
export const trackPurchase = (amount: number, currency: string, productId?: string) => {
  trackEvent('Purchase Completed', {
    amount: amount,
    currency: currency,
    product_id: productId
  });
};

export const trackSubscriptionStarted = (plan: string, amount: number, currency: string) => {
  trackEvent('Subscription Started', {
    subscription_plan: plan,
    amount: amount,
    currency: currency
  });
};

export const trackSubscriptionCancelled = (plan: string, reason?: string) => {
  trackEvent('Subscription Cancelled', {
    subscription_plan: plan,
    cancellation_reason: reason
  });
};

// Error Events
export const trackError = (errorType: string, errorMessage?: string, errorLocation?: string) => {
  trackEvent('Error Occurred', {
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation
  });
};

// Form Events
export const trackFormStarted = (formName: string) => {
  trackEvent('Form Started', {
    form_name: formName
  });
};

export const trackFormCompleted = (formName: string, completionTime?: number) => {
  trackEvent('Form Completed', {
    form_name: formName,
    completion_time: completionTime
  });
};

export const trackFormAbandoned = (formName: string, fieldReached?: string) => {
  trackEvent('Form Abandoned', {
    form_name: formName,
    field_reached: fieldReached
  });
};

// Admin Events
export const trackAdminAction = (action: string, targetType?: string, targetId?: string) => {
  trackEvent('Admin Action', {
    admin_action: action,
    target_type: targetType,
    target_id: targetId
  });
};

// User Profile Events
export const trackProfileUpdated = (fieldsUpdated: string[]) => {
  trackEvent('Profile Updated', {
    fields_updated: fieldsUpdated
  });
};

export const trackProfileViewed = (profileId?: string, isOwnProfile?: boolean) => {
  trackEvent('Profile Viewed', {
    profile_id: profileId,
    is_own_profile: isOwnProfile
  });
};

// Feature Usage Events
export const trackFeatureUsed = (featureName: string, context?: string) => {
  trackEvent('Feature Used', {
    feature_name: featureName,
    context: context
  });
};

// Help & Support Events
export const trackHelpArticleViewed = (articleId: string, articleTitle?: string) => {
  trackEvent('Help Article Viewed', {
    article_id: articleId,
    article_title: articleTitle
  });
};

export const trackSupportTicketCreated = (category: string, priority?: string) => {
  trackEvent('Support Ticket Created', {
    ticket_category: category,
    ticket_priority: priority
  });
};

// User Properties Helper
export const updateUserProfile = (userProperties: UserProperties) => {
  setUserProperties(userProperties);
};

// Custom event tracker for specific business logic
export const trackCustomEvent = (eventName: string, properties?: MixpanelEventProperties) => {
  trackEvent(eventName, properties);
};
