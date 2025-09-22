import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b22e370365844acf92d8508c14cb542e',
  appName: 'vihar2025',
  webDir: 'dist',
  server: {
    url: 'https://b22e3703-6584-4acf-92d8-508c14cb542e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2563eb',
      showSpinner: false
    }
  }
};

export default config;