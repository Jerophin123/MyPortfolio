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

  // Enhanced location detection using IP-based geolocation only (no permission required)
  // Uses multiple IP geolocation services for better accuracy
  const getEnhancedLocation = async () => {
    // Advanced IP-based geolocation with weighted averaging and cross-validation
    // No permission required, works silently - best possible accuracy without GPS
    
    // Service reliability weights (higher = more reliable/accurate)
    const serviceWeights = {
      'ipapi': 1.0,        // Most reliable
      'ipapico': 0.9,      // Very reliable
      'ipinfo': 0.85,      // Good reliability
      'ipgeolocation': 0.8, // Good reliability
      'ipapi_full': 0.75,  // Alternative endpoint
      'ipwhois': 0.7,      // Additional service
      'ipify': 0.65        // Additional service
    };

    const ipServices = [
      // Service 1: ip-api.com (highest weight - most accurate)
      fetch("https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,query")
        .then(res => res.json())
        .then(data => data.status === 'success' ? {
          source: 'ipapi',
          weight: serviceWeights.ipapi,
          ip: data.query,
          city: data.city || '',
          region: data.regionName || '',
          country: data.countryCode || '',
          postal: data.zip || '',
          timezone: data.timezone || '',
          isp: data.isp || 'Unavailable',
          loc: data.lat && data.lon ? [data.lat.toString(), data.lon.toString()] : null,
          accuracy: 'IP-based'
        } : null)
        .catch(() => null),
      
      // Service 2: ipapi.co (high weight - very accurate)
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => data.ip && !data.error ? {
          source: 'ipapico',
          weight: serviceWeights.ipapico,
          ip: data.ip,
          city: data.city || '',
          region: data.region || '',
          country: data.country_code || '',
          postal: data.postal || '',
          timezone: data.timezone || '',
          isp: data.org || 'Unavailable',
          loc: data.latitude && data.longitude ? [data.latitude.toString(), data.longitude.toString()] : null,
          accuracy: 'IP-based'
        } : null)
        .catch(() => null),
      
      // Service 3: ipinfo.io (good weight)
      fetch("https://ipinfo.io/json?token=4dbd09d944c7db")
        .then(res => res.json())
        .then(data => ({
          source: 'ipinfo',
          weight: serviceWeights.ipinfo,
          ip: data.ip,
          city: data.city || '',
          region: data.region || '',
          country: data.country || '',
          postal: data.postal || '',
          timezone: data.timezone || '',
          isp: data.org || 'Unavailable',
          loc: data.loc ? data.loc.split(',') : null,
          accuracy: 'IP-based'
        }))
        .catch(() => null),
      
      // Service 4: ip-api.com full endpoint
      fetch("https://ip-api.com/json/")
        .then(res => res.json())
        .then(data => data.status === 'success' ? {
          source: 'ipapi_full',
          weight: serviceWeights.ipapi_full,
          ip: data.query,
          city: data.city || '',
          region: data.regionName || '',
          country: data.countryCode || '',
          postal: data.zip || '',
          timezone: data.timezone || '',
          isp: data.isp || 'Unavailable',
          loc: data.lat && data.lon ? [data.lat.toString(), data.lon.toString()] : null,
          accuracy: 'IP-based'
        } : null)
        .catch(() => null),
      
      // Service 5: ipwhois.app (additional service)
      fetch("https://ipwhois.app/json/")
        .then(res => res.json())
        .then(data => data.success ? {
          source: 'ipwhois',
          weight: serviceWeights.ipwhois,
          ip: data.ip || '',
          city: data.city || '',
          region: data.region || '',
          country: data.country_code || '',
          postal: data.postal || '',
          timezone: data.timezone?.name || '',
          isp: data.isp || 'Unavailable',
          loc: data.latitude && data.longitude ? [data.latitude.toString(), data.longitude.toString()] : null,
          accuracy: 'IP-based'
        } : null)
        .catch(() => null),
      
      // Service 6: ip-api.com batch (alternative)
      fetch("https://ip-api.com/json/?fields=query,status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp")
        .then(res => res.json())
        .then(data => data.status === 'success' ? {
          source: 'ipapi_alt',
          weight: serviceWeights.ipapi * 0.9,
          ip: data.query,
          city: data.city || '',
          region: data.regionName || '',
          country: data.countryCode || '',
          postal: data.zip || '',
          timezone: data.timezone || '',
          isp: data.isp || 'Unavailable',
          loc: data.lat && data.lon ? [data.lat.toString(), data.lon.toString()] : null,
          accuracy: 'IP-based'
        } : null)
        .catch(() => null)
    ];

    // Wait for all IP services to complete
    const ipResults = await Promise.allSettled(ipServices);
    const validIpResults = ipResults
      .map(r => r.status === 'fulfilled' ? r.value : null)
      .filter(r => r !== null && r.loc !== null); // Only results with coordinates

    if (validIpResults.length === 0) {
      // Fallback: try to get at least one result without coordinates
      const anyResults = ipResults
        .map(r => r.status === 'fulfilled' ? r.value : null)
        .filter(r => r !== null);
      if (anyResults.length > 0) {
        return anyResults[0];
      }
      return null;
    }

    // Get browser timezone for cross-validation
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Filter and validate results using timezone cross-validation
    const validatedResults = validIpResults.filter(result => {
      // Prefer results that match browser timezone (more likely accurate)
      if (result.timezone && browserTimezone) {
        return result.timezone === browserTimezone || 
               result.timezone.toLowerCase().includes(browserTimezone.toLowerCase().split('/')[1] || '');
      }
      return true; // Include if timezone not available
    });

    const resultsToUse = validatedResults.length > 0 ? validatedResults : validIpResults;

    // Extract coordinates with weights
    const weightedCoordinates = resultsToUse
      .map(r => ({
        lat: parseFloat(r.loc[0]),
        lon: parseFloat(r.loc[1]),
        weight: r.weight || 0.5
      }))
      .filter(coord => !isNaN(coord.lat) && !isNaN(coord.lon));

    if (weightedCoordinates.length === 0) {
      return validIpResults[0]; // Fallback to first result
    }

    // Remove outliers using IQR (Interquartile Range) method
    const removeOutliers = (values, weights) => {
      if (values.length < 3) return { values, weights };
      
      const sorted = values.map((v, i) => ({ value: v, weight: weights[i] }))
        .sort((a, b) => a.value - b.value);
      
      const q1Index = Math.floor(sorted.length * 0.25);
      const q3Index = Math.floor(sorted.length * 0.75);
      const q1 = sorted[q1Index].value;
      const q3 = sorted[q3Index].value;
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      
      const filtered = sorted.filter(item => 
        item.value >= lowerBound && item.value <= upperBound
      );
      
      return {
        values: filtered.map(item => item.value),
        weights: filtered.map(item => item.weight)
      };
    };

    const latData = removeOutliers(
      weightedCoordinates.map(c => c.lat),
      weightedCoordinates.map(c => c.weight)
    );
    const lonData = removeOutliers(
      weightedCoordinates.map(c => c.lon),
      weightedCoordinates.map(c => c.weight)
    );

    // Calculate weighted average (more reliable services have more influence)
    const calculateWeightedAverage = (values, weights) => {
      const totalWeight = weights.reduce((sum, w) => sum + w, 0);
      if (totalWeight === 0) {
        return values.reduce((sum, v) => sum + v, 0) / values.length;
      }
      return values.reduce((sum, v, i) => sum + v * weights[i], 0) / totalWeight;
    };

    let finalLat = calculateWeightedAverage(latData.values, latData.weights);
    let finalLon = calculateWeightedAverage(lonData.values, lonData.weights);

    // Use reverse geocoding as PRIMARY source for accurate city and coordinates
    // Reverse geocoding is more accurate than IP-based services
    let reverseGeoData = null;
    let reverseGeoCoords = null;
    
    try {
      // Use multiple reverse geocoding services for better accuracy
      const reverseGeoServices = await Promise.allSettled([
        // Service 1: bigdatacloud (most accurate)
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${finalLat}&longitude=${finalLon}&localityLanguage=en`)
          .then(res => res.json()),
        // Service 2: OpenStreetMap Nominatim (backup)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${finalLat}&lon=${finalLon}&zoom=18&addressdetails=1`)
          .then(res => res.json())
      ]);
      
      // Use the first successful reverse geocoding result
      for (const result of reverseGeoServices) {
        if (result.status === 'fulfilled' && result.value) {
          const data = result.value;
          
          // bigdatacloud format
          if (data.city || data.locality) {
            reverseGeoData = {
              city: data.city || data.locality || '',
              region: data.principalSubdivision || data.region || '',
              country: data.countryName || data.country || '',
              postal: data.postcode || '',
              timezone: data.timezone?.name || data.timezone || '',
              locality: data.locality || '',
              coordinates: data.latitude && data.longitude ? 
                [data.latitude.toString(), data.longitude.toString()] : null
            };
            break;
          }
          
          // OpenStreetMap format
          if (data.address) {
            reverseGeoData = {
              city: data.address.city || data.address.town || data.address.village || data.address.municipality || '',
              region: data.address.state || data.address.region || '',
              country: data.address.country || '',
              postal: data.address.postcode || '',
              timezone: '', // OSM doesn't provide timezone
              locality: data.address.locality || data.address.suburb || '',
              coordinates: [data.lat, data.lon]
            };
            break;
          }
        }
      }
      
      // If we got coordinates from reverse geocoding, use them (more accurate)
      if (reverseGeoData?.coordinates) {
        reverseGeoCoords = reverseGeoData.coordinates;
        // Use reverse geocoding coordinates as they're more accurate
        finalLat = parseFloat(reverseGeoCoords[0]);
        finalLon = parseFloat(reverseGeoCoords[1]);
      }
    } catch (error) {
      // Silent failure - use calculated coordinates
    }

    // Calculate accuracy estimate
    const latVariance = latData.values.reduce((sum, lat) => 
      sum + Math.pow(lat - finalLat, 2), 0) / latData.values.length;
    const lonVariance = lonData.values.reduce((sum, lon) => 
      sum + Math.pow(lon - finalLon, 2), 0) / lonData.values.length;
    const avgVariance = (latVariance + lonVariance) / 2;
    const accuracyRadius = Math.sqrt(avgVariance) * 111; // Convert degrees to km (approx)

    // Get the best result for other data (city, region, etc.)
    // REVERSE GEOCODING TAKES PRIORITY for city name (most accurate)
    const bestResult = resultsToUse.reduce((best, current) => {
      if (!best) return current;
      
      // Check if result matches reverse geocoding city (highest priority)
      const currentMatchesReverse = reverseGeoData && 
        current.city && reverseGeoData.city &&
        (current.city.toLowerCase() === reverseGeoData.city.toLowerCase() ||
         current.city.toLowerCase().includes(reverseGeoData.city.toLowerCase()) ||
         reverseGeoData.city.toLowerCase().includes(current.city.toLowerCase()));
      
      const bestMatchesReverse = reverseGeoData && 
        best.city && reverseGeoData.city &&
        (best.city.toLowerCase() === reverseGeoData.city.toLowerCase() ||
         best.city.toLowerCase().includes(reverseGeoData.city.toLowerCase()) ||
         reverseGeoData.city.toLowerCase().includes(best.city.toLowerCase()));
      
      // Calculate completeness score (postal and timezone are critical)
      const currentScore = (
        (current.city ? 2 : 0) +
        (current.region ? 1 : 0) +
        (current.postal ? 3 : 0) + // Higher weight for postal code
        (current.timezone ? 3 : 0) + // Higher weight for timezone
        (current.timezone === browserTimezone ? 2 : 0) + // Bonus for timezone match
        (currentMatchesReverse ? 5 : 0) // HIGH bonus if matches reverse geocoding (most accurate)
      ) * (current.weight || 0.5);
      
      const bestScore = (
        (best.city ? 2 : 0) +
        (best.region ? 1 : 0) +
        (best.postal ? 3 : 0) +
        (best.timezone ? 3 : 0) +
        (best.timezone === browserTimezone ? 2 : 0) +
        (bestMatchesReverse ? 5 : 0) // HIGH bonus if matches reverse geocoding
      ) * (best.weight || 0.5);
      
      return currentScore > bestScore ? current : best;
    }, null);

    // Use reverse geocoding as PRIMARY source - it's more accurate than IP services
    let enhancedData = { ...bestResult };
    
    // PRIORITY: Use reverse geocoding data (most accurate)
    if (reverseGeoData) {
      // ALWAYS use reverse geocoding city (most accurate)
      if (reverseGeoData.city) {
        enhancedData.city = reverseGeoData.city;
      } else if (reverseGeoData.locality) {
        enhancedData.city = reverseGeoData.locality;
      }
      
      // Use reverse geocoding region if available
      if (reverseGeoData.region) {
        enhancedData.region = reverseGeoData.region;
      }
      
      // Use reverse geocoding postal code (more accurate)
      if (reverseGeoData.postal) {
        enhancedData.postal = reverseGeoData.postal;
      }
      
      // Use reverse geocoding timezone if available
      if (reverseGeoData.timezone) {
        enhancedData.timezone = reverseGeoData.timezone;
      }
    }
    
    // Fallback: Fill missing data from IP services
    if (!enhancedData.postal || enhancedData.postal === 'Unknown' || enhancedData.postal === '') {
      const postalFromService = resultsToUse.find(r => r.postal && r.postal !== 'Unknown' && r.postal !== '');
      if (postalFromService) {
        enhancedData.postal = postalFromService.postal;
      }
    }
    
    if (!enhancedData.timezone || enhancedData.timezone === 'Unknown' || enhancedData.timezone === '') {
      const timezoneFromService = resultsToUse.find(r => r.timezone && r.timezone !== 'Unknown' && r.timezone !== '');
      if (timezoneFromService) {
        enhancedData.timezone = timezoneFromService.timezone;
      }
    }
    
    // Final fallback: use browser timezone if still missing
    if (!enhancedData.timezone || enhancedData.timezone === 'Unknown' || enhancedData.timezone === '') {
      enhancedData.timezone = browserTimezone || 'Asia/Kolkata';
    }
    
    // Final fallback for postal code: try to get from any service
    if (!enhancedData.postal || enhancedData.postal === 'Unknown' || enhancedData.postal === '') {
      // Try to get postal code from any result
      const postalFromAny = resultsToUse.find(r => r.postal && r.postal !== 'Unknown' && r.postal !== '');
      if (postalFromAny) {
        enhancedData.postal = postalFromAny.postal;
      } else if (reverseGeoData?.postal) {
        enhancedData.postal = reverseGeoData.postal;
      }
    }
    
    // Ensure no "Unknown" strings remain
    if (enhancedData.postal === 'Unknown') enhancedData.postal = '';
    if (enhancedData.timezone === 'Unknown') enhancedData.timezone = browserTimezone || 'Asia/Kolkata';

    // Use the most accurate coordinates (reverse geocoding if available, otherwise weighted average)
    const finalCoordinates = reverseGeoCoords || [finalLat.toFixed(6), finalLon.toFixed(6)];
    
    // Use refined coordinates with enhanced data
    return {
      ...enhancedData,
      loc: Array.isArray(finalCoordinates) ? 
        [parseFloat(finalCoordinates[0]).toFixed(6), parseFloat(finalCoordinates[1]).toFixed(6)] :
        [finalLat.toFixed(6), finalLon.toFixed(6)],
      accuracy: reverseGeoCoords ? 
        `Reverse geocoded (most accurate)` :
        `IP-based (weighted avg from ${resultsToUse.length} services, ~${Math.round(accuracyRadius)}km radius)`
    };
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

