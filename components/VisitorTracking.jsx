'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function VisitorTracking() {
  useEffect(() => {
    // This will run after the component mounts
  }, []);

  const handleDeviceDetectorLoad = () => {
    if (typeof window === 'undefined') return;
    
    const initVisitorTracking = () => {
      // DeviceDetector should be available globally after script loads
      if (typeof DeviceDetector === 'undefined') {
        setTimeout(initVisitorTracking, 50);
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
            .then(data => console.log("✅ Visitor logged:", data))
            .catch(err => console.error("❌ Logging failed:", err));
          })
          .catch(err => console.error("❌ IP info fetch failed:", err));
      } catch (error) {
        console.error("❌ DeviceDetector initialization failed:", error);
      }
    };

    // Start initialization after page loads
    if (document.readyState === 'complete') {
      initVisitorTracking();
    } else {
      window.addEventListener("load", initVisitorTracking);
    }
  };

  return (
    <Script
      id="device-detector"
      src="https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/dist/device-detector.min.js"
      strategy="afterInteractive"
      onLoad={handleDeviceDetectorLoad}
    />
  );
}

