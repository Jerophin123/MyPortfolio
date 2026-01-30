'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityScript() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      // Initialize Clarity with error handling for ad blockers
      // Project ID: s42lyzhke3 (update if you have a different project ID)
      const projectId = "s42lyzhke3";
      
      // Initialize Clarity - the package handles errors gracefully
      Clarity.init(projectId);
    } catch (e) {
      // Silently handle any initialization errors
      // This is expected when ad blockers are active or if Clarity fails to load
    }
  }, []);

  return null;
}

