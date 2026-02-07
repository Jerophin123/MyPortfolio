'use client';

import { useEffect } from 'react';

export default function VisitorTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if script is already loaded
    if (document.getElementById('device-detector-script')) {
      initVisitorTracking();
      return;
    }

    // Check if DeviceDetector is already available (might be loaded elsewhere)
    if (typeof DeviceDetector !== 'undefined') {
      initVisitorTracking();
      return;
    }

    // Load the script dynamically
    const script = document.createElement('script');
    script.id = 'device-detector-script';
    script.src = 'https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/dist/device-detector.min.js';
    script.async = true;
    
    script.onload = () => {
      // Small delay to ensure DeviceDetector is available
      setTimeout(() => {
        initVisitorTracking();
      }, 100);
    };
    
    script.onerror = () => {
      // Silently handle script load failure (e.g., network issues, ad blockers)
      // Don't log as error - this is expected in some environments
      // Try to continue without DeviceDetector if possible
      try {
        // Fallback: try to get basic device info without DeviceDetector
        initVisitorTrackingFallback();
      } catch (e) {
        // Silently fail - tracking is optional
      }
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('device-detector-script');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const initVisitorTrackingFallback = () => {
    if (typeof window === 'undefined') return;

    try {
      // Basic device detection without DeviceDetector library
      const ua = navigator.userAgent;
      const screenSize = `${window.innerWidth}x${window.innerHeight}`;
      
      // Simple OS detection
      let os = 'Unknown';
      if (ua.includes('Windows')) os = 'Windows';
      else if (ua.includes('Mac')) os = 'Mac OS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

      // Simple browser detection
      let browser = 'Unknown';
      if (ua.includes('Chrome')) browser = 'Chrome';
      else if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Safari')) browser = 'Safari';
      else if (ua.includes('Edge')) browser = 'Edge';

      fetch("https://ipinfo.io/json?token=4dbd09d944c7db")
        .then(res => res.json())
        .then(data => {
          const visitorData = {
            sheet1: {
              ip: data.ip || "Unknown",
              city: data.city || "Unknown",
              region: data.region || "Unknown",
              country: data.country || "Unknown",
              isp: data.org || "Unavailable",
              deviceBrand: "Unknown",
              deviceModel: "Unknown",
              os: os,
              browser: browser,
              screenSize: screenSize,
              deviceType: /Mobile|Android|iPhone|iPad/.test(ua) ? "Mobile" : "Desktop",
              referrer: document.referrer || "Direct",
              pageVisited: window.location.pathname,
              timestamp: new Date().toLocaleString()
            }
          };

          fetch("https://api.sheety.co/2aee85d5e142542cbb36fc6bb7620a90/portfolioVisitors/sheet1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(visitorData)
          })
          .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
          })
          .then(data => {
            // Silently log success (optional - can be removed if not needed)
            if (process.env.NODE_ENV === 'development') {
              console.log("✅ Visitor logged (fallback):", data);
            }
          })
          .catch(() => {
            // Silently handle fetch errors
          });
        })
        .catch(() => {
          // Silently handle IP info fetch errors
        });
    } catch (error) {
      // Silently handle any errors
    }
  };

  const initVisitorTracking = () => {
    if (typeof window === 'undefined') return;
    
    // DeviceDetector should be available globally after script loads
    if (typeof DeviceDetector === 'undefined') {
      // Try a few times, then fallback
      let attempts = 0;
      const maxAttempts = 10;
      const checkDeviceDetector = () => {
        attempts++;
        if (typeof DeviceDetector !== 'undefined') {
          initVisitorTracking();
        } else if (attempts < maxAttempts) {
          setTimeout(checkDeviceDetector, 50);
        } else {
          // Fallback to basic tracking if DeviceDetector never loads
          initVisitorTrackingFallback();
        }
      };
      setTimeout(checkDeviceDetector, 50);
      return;
    }

    try {
      const detector = new DeviceDetector();
      const result = detector.parse(navigator.userAgent);

      fetch("https://ipinfo.io/json?token=4dbd09d944c7db")
        .then(res => res.json())
        .then(data => {
          const deviceModel = result.device?.model || "Unknown";
          const deviceBrand = result.device?.brand || "Unknown";
          const os = `${result.os?.name || "Unknown"} ${result.os?.version || ""}`;
          const browser = `${result.client?.name || "Unknown"} ${result.client?.version || ""}`;
          const screenSize = `${window.innerWidth}x${window.innerHeight}`;
          const deviceType = result.device?.type || "Unknown";
          const isp = data.org || "Unavailable";

          const visitorData = {
            sheet1: {
              ip: data.ip || "Unknown",
              city: data.city || "Unknown",
              region: data.region || "Unknown",
              country: data.country || "Unknown",
              isp: isp,
              deviceBrand: deviceBrand,
              deviceModel: deviceModel,
              os: os,
              browser: browser,
              screenSize: screenSize,
              deviceType: deviceType,
              referrer: document.referrer || "Direct",
              pageVisited: window.location.pathname,
              timestamp: new Date().toLocaleString()
            }
          };

          fetch("https://api.sheety.co/2aee85d5e142542cbb36fc6bb7620a90/portfolioVisitors/sheet1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(visitorData)
          })
          .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
          })
          .then(data => {
            // Silently log success (optional - can be removed if not needed)
            if (process.env.NODE_ENV === 'development') {
              console.log("✅ Visitor logged:", data);
            }
          })
          .catch(() => {
            // Silently handle logging failures
          });
        })
        .catch(() => {
          // Silently handle IP info fetch failures
        });
    } catch (error) {
      // Silently handle DeviceDetector initialization failures
      // Fallback to basic tracking
      initVisitorTrackingFallback();
    }
  };

  return null;
}

