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

  // Enhanced location detection using browser geolocation + reverse geocoding (shopsavvyy approach)
  // Falls back to IP-based geolocation if browser geolocation fails
  const getEnhancedLocation = async () => {
    // Step 1: Try browser geolocation first (most accurate, but requires permission)
    const browserLocation = await new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      const options = {
        enableHighAccuracy: true, // High accuracy for precise location
        timeout: 10000, // 10 second timeout
        maximumAge: 0 // No cache, always get fresh location
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          // Step 2: Use reverse geocoding to get detailed address (bigdatacloud.net)
          let city = '';
          let region = '';
          let country = '';
          let postal = '';
          let address = '';
          let timezone = '';

          try {
            const reverseGeoResponse = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const reverseGeoData = await reverseGeoResponse.json();
            
            city = reverseGeoData.city || reverseGeoData.locality || '';
            region = reverseGeoData.principalSubdivision || reverseGeoData.localityInfo?.administrative?.[0]?.name || '';
            country = reverseGeoData.countryName || '';
            postal = reverseGeoData.postcode || '';
            address = reverseGeoData.localityInfo?.administrative?.[0]?.name || '';
            timezone = reverseGeoData.timezone?.name || '';
          } catch (error) {
            // Silent failure - continue with coordinates only
          }

          // Get IP and ISP info
          let ip = 'Unknown';
          let isp = 'Unavailable';
          try {
            const ipResponse = await fetch("https://ipinfo.io/json?token=4dbd09d944c7db");
            const ipData = await ipResponse.json();
            ip = ipData.ip || 'Unknown';
            isp = ipData.org || 'Unavailable';
            if (!timezone) timezone = ipData.timezone || '';
            if (!country) country = ipData.country || '';
            if (!city) city = ipData.city || '';
            if (!region) region = ipData.region || '';
            if (!postal) postal = ipData.postal || '';
          } catch (error) {
            // Silent failure
          }

          resolve({
            source: 'browser_geolocation',
            ip: ip,
            city: city,
            region: region,
            country: country,
            postal: postal,
            timezone: timezone,
            isp: isp,
            loc: [latitude.toString(), longitude.toString()],
            accuracy: `GPS (${Math.round(accuracy)}m)`,
            address: address
          });
        },
        () => {
          // Browser geolocation failed - try fallback with lower accuracy
          const fallbackOptions = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000 // 5 minutes cache
          };

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const accuracy = position.coords.accuracy;

              // Get reverse geocoding data
              let city = '';
              let region = '';
              let country = '';
              let postal = '';
              let address = '';
              let timezone = '';

              try {
                const reverseGeoResponse = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const reverseGeoData = await reverseGeoResponse.json();
                city = reverseGeoData.city || reverseGeoData.locality || '';
                region = reverseGeoData.principalSubdivision || '';
                country = reverseGeoData.countryName || '';
                postal = reverseGeoData.postcode || '';
                address = reverseGeoData.localityInfo?.administrative?.[0]?.name || '';
                timezone = reverseGeoData.timezone?.name || '';
              } catch (error) {
                // Silent failure
              }

              // Get IP info
              let ip = 'Unknown';
              let isp = 'Unavailable';
              try {
                const ipResponse = await fetch("https://ipinfo.io/json?token=4dbd09d944c7db");
                const ipData = await ipResponse.json();
                ip = ipData.ip || 'Unknown';
                isp = ipData.org || 'Unavailable';
                if (!timezone) timezone = ipData.timezone || '';
              } catch (error) {
                // Silent failure
              }

              resolve({
                source: 'browser_geolocation_fallback',
                ip: ip,
                city: city,
                region: region,
                country: country,
                postal: postal,
                timezone: timezone,
                isp: isp,
                loc: [latitude.toString(), longitude.toString()],
                accuracy: `GPS (${Math.round(accuracy)}m)`,
                address: address
              });
            },
            () => {
              // Both browser geolocation attempts failed - fall through to IP-based
              resolve(null);
            },
            fallbackOptions
          );
        },
        options
      );
    });

    // If browser geolocation succeeded, return it
    if (browserLocation) {
      return browserLocation;
    }

    // Step 3: Fallback to IP-based geolocation (multiple services)
    const ipServices = [
      // Service 1: ipinfo.io
      fetch("https://ipinfo.io/json?token=4dbd09d944c7db")
        .then(res => res.json())
        .then(data => ({
          source: 'ipinfo',
          ip: data.ip,
          city: data.city || '',
          region: data.region || '',
          country: data.country || '',
          postal: data.postal || '',
          timezone: data.timezone || '',
          isp: data.org || 'Unavailable',
          loc: data.loc ? data.loc.split(',') : null,
          accuracy: 'IP-based (city level)'
        }))
        .catch(() => null),
      
      // Service 2: ip-api.com
      fetch("https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,query")
        .then(res => res.json())
        .then(data => data.status === 'success' ? {
          source: 'ipapi',
          ip: data.query,
          city: data.city || '',
          region: data.regionName || '',
          country: data.countryCode || '',
          postal: data.zip || '',
          timezone: data.timezone || '',
          isp: data.isp || 'Unavailable',
          loc: data.lat && data.lon ? [data.lat.toString(), data.lon.toString()] : null,
          accuracy: 'IP-based (city level)'
        } : null)
        .catch(() => null),
      
      // Service 3: ipapi.co
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => data.ip && !data.error ? {
          source: 'ipapico',
          ip: data.ip,
          city: data.city || '',
          region: data.region || '',
          country: data.country_code || '',
          postal: data.postal || '',
          timezone: data.timezone || '',
          isp: data.org || 'Unavailable',
          loc: data.latitude && data.longitude ? [data.latitude.toString(), data.longitude.toString()] : null,
          accuracy: 'IP-based (city level)'
        } : null)
        .catch(() => null)
    ];

    // Wait for all IP services to complete
    const ipResults = await Promise.allSettled(ipServices);
    const validIpResults = ipResults
      .map(r => r.status === 'fulfilled' ? r.value : null)
      .filter(r => r !== null);

    if (validIpResults.length === 0) return null;

    // Select the best IP-based result
    const bestIpResult = validIpResults.reduce((best, current) => {
      if (!best) return current;
      
      // Prefer results with coordinates
      if (current.loc && !best.loc) return current;
      if (best.loc && !current.loc) return best;
      
      // If both have coordinates, prefer ip-api or ipapico
      if (current.loc && best.loc) {
        if (current.source === 'ipapi' || current.source === 'ipapico') return current;
        if (best.source === 'ipapi' || best.source === 'ipapico') return best;
      }
      
      // Prefer results with more complete data
      const currentCompleteness = [current.city, current.region, current.postal, current.timezone].filter(Boolean).length;
      const bestCompleteness = [best.city, best.region, best.postal, best.timezone].filter(Boolean).length;
      return currentCompleteness > bestCompleteness ? current : best;
    }, null);

    return bestIpResult;
  };

  // Enhanced device detection from user agent
  const detectDeviceFromUA = (ua) => {
    let os = 'Unknown';
    let osVersion = '';
    let deviceBrand = 'Unknown';
    let deviceModel = 'Unknown';
    let deviceType = 'Unknown';
    let browser = 'Unknown';
    let browserVersion = '';

    // OS Detection - Check Android FIRST before Linux (Android UAs contain "Linux")
    if (ua.includes('Android')) {
      os = 'Android';
      // Extract Android version
      const androidMatch = ua.match(/Android\s([\d.]+)/);
      if (androidMatch) osVersion = androidMatch[1];
      
      // Try to extract device brand and model from Android user agent
      // Format: Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36
      const deviceMatch = ua.match(/\(Linux; Android [^;]+; ([^)]+)\)/);
      if (deviceMatch) {
        const deviceInfo = deviceMatch[1];
        // Common patterns: SM-S918B (Samsung), Pixel 7, Redmi Note 10, etc.
        if (deviceInfo.includes('SM-') || deviceInfo.includes('Samsung')) {
          deviceBrand = 'Samsung';
          deviceModel = deviceInfo.replace(/SM-/, '').trim();
        } else if (deviceInfo.includes('Pixel')) {
          deviceBrand = 'Google';
          deviceModel = deviceInfo.replace('Pixel', '').trim();
        } else if (deviceInfo.includes('Redmi') || deviceInfo.includes('POCO') || deviceInfo.includes('Mi ')) {
          deviceBrand = 'Xiaomi';
          deviceModel = deviceInfo;
        } else if (deviceInfo.includes('OnePlus')) {
          deviceBrand = 'OnePlus';
          deviceModel = deviceInfo.replace('OnePlus', '').trim();
        } else if (deviceInfo.includes('OPPO')) {
          deviceBrand = 'OPPO';
          deviceModel = deviceInfo.replace('OPPO', '').trim();
        } else if (deviceInfo.includes('Vivo')) {
          deviceBrand = 'Vivo';
          deviceModel = deviceInfo.replace('Vivo', '').trim();
        } else if (deviceInfo.includes('Realme')) {
          deviceBrand = 'Realme';
          deviceModel = deviceInfo.replace('Realme', '').trim();
        } else {
          // Try to extract brand from device string
          const brandMatch = deviceInfo.match(/^([A-Za-z]+)/);
          if (brandMatch) {
            deviceBrand = brandMatch[1];
            deviceModel = deviceInfo.replace(brandMatch[1], '').trim();
          } else {
            deviceModel = deviceInfo;
          }
        }
      }
      deviceType = 'Mobile';
    } else if (ua.includes('iPhone')) {
      os = 'iOS';
      deviceBrand = 'Apple';
      deviceType = 'Mobile';
      const iosMatch = ua.match(/OS (\d+)[_\d]*/);
      if (iosMatch) osVersion = iosMatch[1].replace(/_/g, '.');
      const modelMatch = ua.match(/iPhone([\d,]+)/);
      if (modelMatch) deviceModel = `iPhone ${modelMatch[1]}`;
    } else if (ua.includes('iPad')) {
      os = 'iOS';
      deviceBrand = 'Apple';
      deviceType = 'Tablet';
      const iosMatch = ua.match(/OS (\d+)[_\d]*/);
      if (iosMatch) osVersion = iosMatch[1].replace(/_/g, '.');
      deviceModel = 'iPad';
    } else if (ua.includes('Mac OS X') || ua.includes('Macintosh')) {
      os = 'macOS';
      deviceBrand = 'Apple';
      deviceType = 'Desktop';
      const macMatch = ua.match(/Mac OS X (\d+[._]\d+)/);
      if (macMatch) osVersion = macMatch[1].replace(/_/g, '.');
    } else if (ua.includes('Windows')) {
      os = 'Windows';
      deviceType = 'Desktop';
      const winMatch = ua.match(/Windows NT ([\d.]+)/);
      if (winMatch) {
        const version = winMatch[1];
        if (version === '10.0') osVersion = '10/11';
        else if (version === '6.3') osVersion = '8.1';
        else if (version === '6.2') osVersion = '8';
        else if (version === '6.1') osVersion = '7';
        else osVersion = version;
      }
    } else if (ua.includes('Linux')) {
      os = 'Linux';
      deviceType = 'Desktop';
    } else if (ua.includes('CrOS')) {
      os = 'Chrome OS';
      deviceType = 'Desktop';
    }

    // Browser Detection
    if (ua.includes('Edg/')) {
      browser = 'Edge';
      const edgeMatch = ua.match(/Edg\/([\d.]+)/);
      if (edgeMatch) browserVersion = edgeMatch[1];
    } else if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
      browser = 'Chrome';
      const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
      if (chromeMatch) browserVersion = chromeMatch[1];
    } else if (ua.includes('Firefox/')) {
      browser = 'Firefox';
      const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
      if (firefoxMatch) browserVersion = firefoxMatch[1];
    } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
      browser = 'Safari';
      const safariMatch = ua.match(/Version\/([\d.]+)/);
      if (safariMatch) browserVersion = safariMatch[1];
    } else if (ua.includes('Opera/') || ua.includes('OPR/')) {
      browser = 'Opera';
      const operaMatch = ua.match(/(?:Opera|OPR)\/([\d.]+)/);
      if (operaMatch) browserVersion = operaMatch[1];
    }

    return {
      os: osVersion ? `${os} ${osVersion}` : os,
      browser: browserVersion ? `${browser} ${browserVersion}` : browser,
      deviceBrand,
      deviceModel,
      deviceType
    };
  };

  const initVisitorTrackingFallback = async () => {
    if (typeof window === 'undefined') return;

    try {
      // Enhanced device detection from user agent
      const ua = navigator.userAgent;
      const screenSize = `${window.innerWidth}x${window.innerHeight}`;
      
      const deviceInfo = detectDeviceFromUA(ua);
      const os = deviceInfo.os;
      const browser = deviceInfo.browser;
      const deviceBrand = deviceInfo.deviceBrand;
      const deviceModel = deviceInfo.deviceModel;
      const deviceType = deviceInfo.deviceType || (/Mobile|Android|iPhone|iPad/.test(ua) ? "Mobile" : "Desktop");

      // Get enhanced location from multiple services
      const locationData = await getEnhancedLocation();
      
      if (!locationData) {
        // If all services fail, silently skip tracking
        return;
      }

      // Parse location coordinates and create Google Maps link
      const latitude = locationData.loc ? locationData.loc[0] : null;
      const longitude = locationData.loc ? locationData.loc[1] : null;
      const timezone = locationData.timezone || "Unknown";
      const postal = locationData.postal || "Unknown";
      
      // Create Google Maps link if coordinates are available
      let mapLink = "Unknown";
      if (latitude && longitude) {
        mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      } else if (locationData.city && locationData.region) {
        // Fallback to city/region if coordinates unavailable
        mapLink = `https://www.google.com/maps/search/${encodeURIComponent(locationData.city + ', ' + locationData.region + ', ' + locationData.country)}`;
      }
      
      const visitorData = {
        sheet1: {
          ip: locationData.ip || "Unknown",
          city: locationData.city || "Unknown",
          region: locationData.region || "Unknown",
          country: locationData.country || "Unknown",
          postalCode: postal,
          mapLink: mapLink,
          timezone: timezone,
          isp: locationData.isp || "Unavailable",
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
          console.log("✅ Visitor logged (fallback):", data);
        }
      })
      .catch(() => {
        // Silently handle fetch errors
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

      // Use DeviceDetector results, but fallback to UA parsing if missing
      let deviceModel = result.device?.model || "Unknown";
      let deviceBrand = result.device?.brand || "Unknown";
      let os = result.os?.name || "Unknown";
      let osVersion = result.os?.version || "";
      let browser = result.client?.name || "Unknown";
      let browserVersion = result.client?.version || "";
      let deviceType = result.device?.type || "Unknown";

      // If DeviceDetector didn't provide device info, use enhanced UA parsing
      if (deviceBrand === "Unknown" || deviceModel === "Unknown") {
        const uaInfo = detectDeviceFromUA(navigator.userAgent);
        if (deviceBrand === "Unknown") deviceBrand = uaInfo.deviceBrand;
        if (deviceModel === "Unknown") deviceModel = uaInfo.deviceModel;
      }

      // If OS detection is poor (e.g., Android detected as Linux), use UA parsing
      if (os === "Linux" && navigator.userAgent.includes("Android")) {
        const uaInfo = detectDeviceFromUA(navigator.userAgent);
        os = uaInfo.os;
      }

      // Format OS and browser strings
      const osString = osVersion ? `${os} ${osVersion}`.trim() : os;
      const browserString = browserVersion ? `${browser} ${browserVersion}`.trim() : browser;
      const screenSize = `${window.innerWidth}x${window.innerHeight}`;
      
      // Ensure deviceType is set
      if (deviceType === "Unknown") {
        deviceType = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "Mobile" : "Desktop";
      }

      // Get enhanced location from multiple services
      getEnhancedLocation()
        .then(locationData => {
          if (!locationData) {
            // If all services fail, silently skip tracking
            return;
          }

          // Parse location coordinates and create Google Maps link
          const latitude = locationData.loc ? locationData.loc[0] : null;
          const longitude = locationData.loc ? locationData.loc[1] : null;
          const timezone = locationData.timezone || "Unknown";
          const postal = locationData.postal || "Unknown";
          
          // Create Google Maps link if coordinates are available
          let mapLink = "Unknown";
          if (latitude && longitude) {
            mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          } else if (locationData.city && locationData.region) {
            // Fallback to city/region if coordinates unavailable
            mapLink = `https://www.google.com/maps/search/${encodeURIComponent(locationData.city + ', ' + locationData.region + ', ' + locationData.country)}`;
          }

          const visitorData = {
            sheet1: {
              ip: locationData.ip || "Unknown",
              city: locationData.city || "Unknown",
              region: locationData.region || "Unknown",
              country: locationData.country || "Unknown",
              postalCode: postal,
              mapLink: mapLink,
              timezone: timezone,
              isp: locationData.isp || "Unavailable",
              deviceBrand: deviceBrand,
              deviceModel: deviceModel,
              os: osString,
              browser: browserString,
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
          // Silently handle location fetch failures
        });
    } catch (error) {
      // Silently handle DeviceDetector initialization failures
      // Fallback to basic tracking
      initVisitorTrackingFallback();
    }
  };

  return null;
}

