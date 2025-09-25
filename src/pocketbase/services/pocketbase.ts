// src/services/pocketbase.ts
import PocketBase from 'pocketbase';

// Initialize PocketBase - replace with your actual PocketBase URL
const pb = new PocketBase('http://127.0.0.1:8090'); // Default local PocketBase URL

// Enable auto-cancellation of requests
pb.autoCancellation(false);

// Test user credentials - replace with your actual test user
const TEST_USER = {
  email: 'admin@cara.com',
  password: 'Test12345$'
};

// Authentication service
export const authService = {
  // Auto-login with test user
  async autoLogin() {
    try {
      // Check if already authenticated
      if (pb.authStore.isValid) {
        console.log('User already authenticated:', pb.authStore.model?.email);
        return pb.authStore.model;
      }

      // Attempt login with test credentials
      const authData = await pb.collection('users').authWithPassword(
        TEST_USER.email,
        TEST_USER.password
      );
      
      console.log('Auto-login successful:', authData.record.email);
      return authData.record;
    } catch (error) {
      console.error('Auto-login failed:', error);
      
      // Optionally create the test user if it doesn't exist
      if ((error as any)?.status === 400) {
        console.log('Test user not found, attempting to create...');
        try {
          // First create the user
          await pb.collection('users').create({
            email: TEST_USER.email,
            password: TEST_USER.password,
            passwordConfirm: TEST_USER.password,
            name: 'Test User',
            // Add any additional fields your user collection requires
          });
          
          // Then login
          const authData = await pb.collection('users').authWithPassword(
            TEST_USER.email,
            TEST_USER.password
          );
          
          console.log('Test user created and logged in:', authData.record.email);
          return authData.record;
        } catch (createError) {
          console.error('Failed to create test user:', createError);
          throw createError;
        }
      }
      throw error;
    }
  },

  // Logout
  logout() {
    pb.authStore.clear();
    console.log('User logged out');
  },

  // Get current user
  getCurrentUser() {
    return pb.authStore.model;
  },

  // Check if authenticated
  isAuthenticated() {
    return pb.authStore.isValid;
  },

  // Subscribe to auth state changes
  subscribeToAuthState(callback: (user: any) => void) {
    // Listen to auth store changes
    pb.authStore.onChange((token, model) => {
      callback(model);
    });

    // Return unsubscribe function
    return () => {
      pb.authStore.onChange(() => {});
    };
  },

  // Refresh auth token if needed
  async refreshAuth() {
    if (!pb.authStore.isValid) return null;
    
    try {
      const authData = await pb.collection('users').authRefresh();
      return authData.record;
    } catch (error) {
      console.error('Failed to refresh auth:', error);
      return null;
    }
  }
};

// Consultation service for CARA-specific operations
export const consultationService = {
  // Create a new consultation
 // Create a new consultation
 // Create a new consultation
 async createConsultation(data: {
  topic: string;
  description: string;
  type?: string;
  status?: string;
  userId?: string;
}) {
  try {
    console.log('=== POCKETBASE CREATE ===');
    console.log('Auth valid?', pb.authStore.isValid);
    console.log('Current user:', pb.authStore.model?.email);
    console.log('Input data:', data);
    
    // Map our type values to PocketBase allowed values
    const mapTypeToAllowed = (type: string): string => {
      if (type === 'risk' || type.includes('risk') || type.includes('assessment')) {
        return 'risk-assessment';
      }
      if (type === 'comp' || type.includes('compliance')) {
        return 'comp';
      }
      return 'general'; // default fallback
    };
    
    const finalData = {
      topic: data.topic,
      description: data.description,
      type: mapTypeToAllowed(data.type || 'general'),
      status: 'active', // Only 'active' and 'completed' are allowed
      userId: data.userId || pb.authStore.model?.id,
    };
    
    console.log('Final data to send:', finalData);
    
    const consultation = await pb.collection('consultations').create(finalData);
    
    console.log('=== POCKETBASE SUCCESS ===');
    console.log('Created consultation:', consultation);
    
    return consultation;
  } catch (error) {
    console.log('=== POCKETBASE ERROR ===');
    console.error('PocketBase error details:', error);
    throw error;
  }
},

  // Get user's consultations
  async getUserConsultations(userId?: string) {
    try {
      const id = userId || pb.authStore.model?.id;
      if (!id) throw new Error('No user ID available');
      
      const consultations = await pb.collection('consultations').getList(1, 50, {
        filter: `userId = "${id}"`,
        sort: '-created',
      });
      return consultations.items;
    } catch (error) {
      console.error('Failed to fetch consultations:', error);
      throw error;
    }
  },

  // Get single consultation
  async getConsultation(id: string) {
    try {
      const consultation = await pb.collection('consultations').getOne(id);
      return consultation;
    } catch (error) {
      console.error('Failed to fetch consultation:', error);
      throw error;
    }
  },

  // Update consultation
  async updateConsultation(id: string, data: any) {
    try {
      const consultation = await pb.collection('consultations').update(id, data);
      return consultation;
    } catch (error) {
      console.error('Failed to update consultation:', error);
      throw error;
    }
  },

  // Delete consultation
  async deleteConsultation(id: string) {
    try {
      await pb.collection('consultations').delete(id);
    } catch (error) {
      console.error('Failed to delete consultation:', error);
      throw error;
    }
  },

  // Upload file attachment
  async uploadFile(consultationId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append('attachment', file);
      
      const record = await pb.collection('consultations').update(consultationId, formData);
      return record;
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  }
};

// Export the PocketBase instance for direct use if needed
export default pb;