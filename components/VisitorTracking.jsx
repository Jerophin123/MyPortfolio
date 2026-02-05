'use client';

import { useEffect } from 'react';

export default function VisitorTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Check if script is already loaded
      if (document.getElementById('device-detector-script')) {
        setTimeout(() => {
          try {
            initVisitorTracking();
          } catch (e) {
            // Silent fail
          }
        }, 50);
        return;
      }

      // Check if DeviceDetector is already available (might be loaded elsewhere)
      if (typeof DeviceDetector !== 'undefined') {
        setTimeout(() => {
          try {
            initVisitorTracking();
          } catch (e) {
            // Silent fail
          }
        }, 50);
        return;
      }

      // Load the script dynamically - silent loading
      const script = document.createElement('script');
      script.id = 'device-detector-script';
      script.src = 'https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/dist/device-detector.min.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        // Small delay to ensure DeviceDetector is available
        setTimeout(() => {
          try {
            initVisitorTracking();
          } catch (e) {
            // Silent fail - try fallback
            try {
              initVisitorTrackingFallback();
            } catch (e2) {
              // Silent fail
            }
          }
        }, 100);
      };
      
      script.onerror = () => {
        // Silently handle script load failure - no errors exposed
        try {
          initVisitorTrackingFallback();
        } catch (e) {
          // Silent fail - tracking is optional
        }
      };

      try {
        document.head.appendChild(script);
      } catch (e) {
        // Silent fail if append fails
      }
    } catch (error) {
      // Silent fail - no errors exposed to user
    }

    // Cleanup function - silent cleanup
    return () => {
      try {
        const existingScript = document.getElementById('device-detector-script');
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
      } catch (e) {
        // Silent cleanup failure
      }
    };
  }, []);

  // Enhanced location detection using IP-based geolocation only (no permission required)
  // Uses multiple IP geolocation services for better accuracy
  const getEnhancedLocation = async () => {
    try {
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
    
    // Final fallback for postal code: try to get from any service or all results
    if (!enhancedData.postal || enhancedData.postal === 'Unknown' || enhancedData.postal === '') {
      // Try to get postal code from any result (including those without coordinates)
      const allResults = ipResults
        .map(r => r.status === 'fulfilled' ? r.value : null)
        .filter(r => r !== null);
      
      const postalFromAny = allResults.find(r => r.postal && r.postal !== 'Unknown' && r.postal !== '' && r.postal);
      if (postalFromAny) {
        enhancedData.postal = postalFromAny.postal;
      } else if (reverseGeoData?.postal) {
        enhancedData.postal = reverseGeoData.postal;
      } else {
        // Try one more reverse geocoding call if we have coordinates
        try {
          const finalReverseGeo = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${finalLat}&longitude=${finalLon}&localityLanguage=en`
          );
          const finalReverseData = await finalReverseGeo.json();
          if (finalReverseData.postcode) {
            enhancedData.postal = finalReverseData.postcode;
          } else if (finalReverseData.localityInfo?.administrative) {
            const adminWithPostcode = finalReverseData.localityInfo.administrative.find(a => a.postcode);
            if (adminWithPostcode) {
              enhancedData.postal = adminWithPostcode.postcode;
            }
          }
        } catch (error) {
          // Silent failure
        }
      }
    }
    
    // Ensure no "Unknown" strings remain - but keep empty string if truly not available
    if (enhancedData.postal === 'Unknown') {
      enhancedData.postal = ''; // Will be sent as empty, not "Unknown"
    }
    if (enhancedData.timezone === 'Unknown' || !enhancedData.timezone) {
      enhancedData.timezone = browserTimezone || 'Asia/Kolkata';
    }

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
    } catch (error) {
      // Silent fail - return null if location detection fails completely
      return null;
    }
  };

  // Enhanced device detection from user agent and browser APIs
  const detectDeviceFromUA = (ua) => {
    let os = 'Unknown';
    let osVersion = '';
    let deviceBrand = 'Unknown';
    let deviceModel = 'Unknown';
    let deviceType = 'Unknown';
    let browser = 'Unknown';
    let browserVersion = '';

    // Get additional browser info for better detection
    const platform = typeof navigator !== 'undefined' ? navigator.platform : '';
    const vendor = typeof navigator !== 'undefined' ? navigator.vendor : '';
    const maxTouchPoints = typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0;

    // OS Detection - Check Android FIRST before Linux (Android UAs contain "Linux")
    if (ua.includes('Android')) {
      os = 'Android';
      // Extract Android version
      const androidMatch = ua.match(/Android\s([\d.]+)/);
      if (androidMatch) osVersion = androidMatch[1];
      
      // Try multiple patterns to extract device brand and model from Android user agent
      // Pattern 1: (Linux; Android 13; SM-S918B)
      // Pattern 2: (Linux; Android 13; wsmn) - some devices use model codes
      // Pattern 3: Build/... - some UAs have device info in Build string
      let deviceInfo = null;
      
      // Try primary pattern
      const deviceMatch1 = ua.match(/\(Linux; Android [^;]+; ([^)]+)\)/);
      if (deviceMatch1) {
        deviceInfo = deviceMatch1[1];
      }
      
      // Try alternative pattern: (Linux; Android 13; wsmn Build/...)
      if (!deviceInfo) {
        const deviceMatch2 = ua.match(/\(Linux; Android [^;]+; ([^)]+?)(?:\s+Build\/|\))/);
        if (deviceMatch2) {
          deviceInfo = deviceMatch2[1];
        }
      }
      
      // Try Build pattern: Build/... which sometimes contains device model
      if (!deviceInfo) {
        const buildMatch = ua.match(/Build\/([^)]+)/);
        if (buildMatch) {
          deviceInfo = buildMatch[1].split('/')[0];
        }
      }
      
      if (deviceInfo) {
        const cleanDeviceInfo = deviceInfo.trim();
        
        // Samsung detection (SM-*, GT-*, SCH-*, SGH-*, etc.)
        if (cleanDeviceInfo.match(/^(SM-|GT-|SCH-|SGH-|SHV-|SPH-|SAMSUNG)/i)) {
          deviceBrand = 'Samsung';
          deviceModel = cleanDeviceInfo.replace(/^(SM-|GT-|SCH-|SGH-|SHV-|SPH-|SAMSUNG)/i, '').trim() || cleanDeviceInfo;
        }
        // Google Pixel
        else if (cleanDeviceInfo.includes('Pixel') || cleanDeviceInfo.match(/^Pixel/i)) {
          deviceBrand = 'Google';
          deviceModel = cleanDeviceInfo.replace(/^Pixel/i, '').trim() || 'Pixel';
        }
        // Xiaomi/Redmi/POCO
        else if (cleanDeviceInfo.match(/(Redmi|POCO|Mi\s|Xiaomi|HM\s|MIX)/i)) {
          deviceBrand = 'Xiaomi';
          deviceModel = cleanDeviceInfo;
        }
        // OnePlus
        else if (cleanDeviceInfo.match(/^(OnePlus|ONEPLUS|GM)/i)) {
          deviceBrand = 'OnePlus';
          deviceModel = cleanDeviceInfo.replace(/^(OnePlus|ONEPLUS|GM)/i, '').trim() || cleanDeviceInfo;
        }
        // OPPO
        else if (cleanDeviceInfo.match(/^(OPPO|CPH|CPH-)/i)) {
          deviceBrand = 'OPPO';
          deviceModel = cleanDeviceInfo.replace(/^(OPPO|CPH|CPH-)/i, '').trim() || cleanDeviceInfo;
        }
        // Vivo
        else if (cleanDeviceInfo.match(/^(Vivo|VIVO|V|PD)/i)) {
          deviceBrand = 'Vivo';
          deviceModel = cleanDeviceInfo.replace(/^(Vivo|VIVO|V|PD)/i, '').trim() || cleanDeviceInfo;
        }
        // Realme
        else if (cleanDeviceInfo.match(/^(Realme|RMX|RM)/i)) {
          deviceBrand = 'Realme';
          deviceModel = cleanDeviceInfo.replace(/^(Realme|RMX|RM)/i, '').trim() || cleanDeviceInfo;
        }
        // Motorola
        else if (cleanDeviceInfo.match(/^(Moto|XT|Motorola)/i)) {
          deviceBrand = 'Motorola';
          deviceModel = cleanDeviceInfo.replace(/^(Moto|XT|Motorola)/i, '').trim() || cleanDeviceInfo;
        }
        // Huawei
        else if (cleanDeviceInfo.match(/^(Huawei|HONOR|ELE|VOG|LIO|ANA)/i)) {
          deviceBrand = 'Huawei';
          deviceModel = cleanDeviceInfo.replace(/^(Huawei|HONOR|ELE|VOG|LIO|ANA)/i, '').trim() || cleanDeviceInfo;
        }
        // Nokia
        else if (cleanDeviceInfo.match(/^(Nokia|TA-)/i)) {
          deviceBrand = 'Nokia';
          deviceModel = cleanDeviceInfo.replace(/^(Nokia|TA-)/i, '').trim() || cleanDeviceInfo;
        }
        // LG
        else if (cleanDeviceInfo.match(/^(LG-|LM-)/i)) {
          deviceBrand = 'LG';
          deviceModel = cleanDeviceInfo.replace(/^(LG-|LM-)/i, '').trim() || cleanDeviceInfo;
        }
        // Sony
        else if (cleanDeviceInfo.match(/^(Sony|Xperia|SO-)/i)) {
          deviceBrand = 'Sony';
          deviceModel = cleanDeviceInfo.replace(/^(Sony|Xperia|SO-)/i, '').trim() || cleanDeviceInfo;
        }
        // Generic brand extraction - try to get brand from first word
        else {
          const brandMatch = cleanDeviceInfo.match(/^([A-Za-z]{2,})/);
          if (brandMatch && brandMatch[1].length >= 2) {
            deviceBrand = brandMatch[1];
            deviceModel = cleanDeviceInfo.replace(brandMatch[1], '').trim() || cleanDeviceInfo;
          } else {
            // If no clear brand, use the whole string as model
            deviceModel = cleanDeviceInfo;
            // Try to infer from platform or other hints
            if (platform.includes('Linux')) {
              deviceBrand = 'Android Device';
            }
          }
        }
      } else {
        // No device info found in UA, try to infer from platform
        deviceBrand = 'Android Device';
        deviceModel = 'Unknown Model';
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
      else deviceModel = 'iPhone';
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
      // Try to detect Mac model from platform
      if (platform.includes('Mac')) {
        deviceModel = platform;
      } else {
        deviceModel = 'Mac';
      }
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
      // Try to detect manufacturer from platform or vendor
      if (platform) {
        deviceBrand = platform.includes('Win64') || platform.includes('Win32') ? 'PC' : platform;
      } else {
        deviceBrand = 'PC';
      }
      deviceModel = 'Desktop';
    } else if (ua.includes('Linux')) {
      os = 'Linux';
      deviceType = 'Desktop';
      deviceBrand = 'PC';
      deviceModel = 'Linux Device';
    } else if (ua.includes('CrOS')) {
      os = 'Chrome OS';
      deviceType = 'Desktop';
      deviceBrand = 'Chrome OS Device';
      deviceModel = 'Chromebook';
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

    // Final validation - ensure no single character or invalid values
    if (deviceBrand && (deviceBrand.length === 1 || deviceBrand === 'K' || deviceBrand === 'Unknown')) {
      // Try to get from platform
      if (platform && platform.length > 1) {
        deviceBrand = platform;
      } else {
        deviceBrand = deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop';
      }
    }
    
    if (deviceModel && (deviceModel.length === 1 || deviceModel === 'K' || deviceModel === 'Unknown')) {
      deviceModel = deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop';
    }

    return {
      os: osVersion ? `${os} ${osVersion}` : os,
      browser: browserVersion ? `${browser} ${browserVersion}` : browser,
      deviceBrand,
      deviceModel,
      deviceType
    };
  };

  // Comprehensive function to collect 50+ additional data points
  const collectExtendedDeviceInfo = async () => {
    if (typeof window === 'undefined') return {};
    
    const extendedInfo = {};
    
    try {
      // Silent data collection - no user interaction required
      // Screen Information (5+ points)
      extendedInfo.screenWidth = window.screen?.width || null;
      extendedInfo.screenHeight = window.screen?.height || null;
      extendedInfo.screenAvailWidth = window.screen?.availWidth || null;
      extendedInfo.screenAvailHeight = window.screen?.availHeight || null;
      extendedInfo.screenColorDepth = window.screen?.colorDepth || null;
      extendedInfo.screenPixelDepth = window.screen?.pixelDepth || null;
      extendedInfo.devicePixelRatio = window.devicePixelRatio || null;
      extendedInfo.orientation = window.screen?.orientation?.type || (window.orientation ? (window.orientation === 0 || window.orientation === 180 ? 'portrait' : 'landscape') : null);
      extendedInfo.orientationAngle = window.screen?.orientation?.angle ?? window.orientation ?? null;
      
      // Viewport Information (3+ points)
      extendedInfo.viewportWidth = window.innerWidth || null;
      extendedInfo.viewportHeight = window.innerHeight || null;
      extendedInfo.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth || null;
      
      // Browser & Navigator Info (10+ points)
      extendedInfo.userAgent = navigator.userAgent || null;
      extendedInfo.platform = navigator.platform || null;
      extendedInfo.vendor = navigator.vendor || null;
      extendedInfo.language = navigator.language || null;
      extendedInfo.languages = navigator.languages ? navigator.languages.join(',') : null;
      extendedInfo.cookieEnabled = navigator.cookieEnabled ? 'Yes' : 'No';
      extendedInfo.doNotTrack = navigator.doNotTrack || 'Unknown';
      extendedInfo.onLine = navigator.onLine ? 'Yes' : 'No';
      extendedInfo.hardwareConcurrency = navigator.hardwareConcurrency || null;
      extendedInfo.deviceMemory = navigator.deviceMemory || null;
      extendedInfo.maxTouchPoints = navigator.maxTouchPoints || null;
      extendedInfo.webdriver = navigator.webdriver ? 'Yes' : 'No';
      extendedInfo.javaEnabled = navigator.javaEnabled ? 'Yes' : 'No';
      
      // Time & Date Information (5+ points)
      const now = new Date();
      extendedInfo.localTime = now.toLocaleString();
      extendedInfo.utcTime = now.toUTCString();
      extendedInfo.timezoneOffset = now.getTimezoneOffset();
      extendedInfo.timezoneOffsetHours = (now.getTimezoneOffset() / -60).toFixed(2);
      extendedInfo.dayOfWeek = now.getDay();
      extendedInfo.hourOfDay = now.getHours();
      extendedInfo.dateString = now.toDateString();
      
      // Storage Information (4+ points)
      try {
        extendedInfo.localStorageEnabled = typeof(Storage) !== 'undefined' && window.localStorage ? 'Yes' : 'No';
        extendedInfo.sessionStorageEnabled = typeof(Storage) !== 'undefined' && window.sessionStorage ? 'Yes' : 'No';
        extendedInfo.indexedDBEnabled = typeof indexedDB !== 'undefined' ? 'Yes' : 'No';
        extendedInfo.webSQLEnabled = typeof openDatabase !== 'undefined' ? 'Yes' : 'No';
      } catch (e) {
        extendedInfo.localStorageEnabled = 'Unknown';
        extendedInfo.sessionStorageEnabled = 'Unknown';
        extendedInfo.indexedDBEnabled = 'Unknown';
        extendedInfo.webSQLEnabled = 'Unknown';
      }
      
      // Connection Information (if available) (5+ points)
      if (navigator.connection || navigator.mozConnection || navigator.webkitConnection) {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        extendedInfo.connectionType = conn.effectiveType || null;
        extendedInfo.connectionDownlink = conn.downlink || null;
        extendedInfo.connectionRtt = conn.rtt || null;
        extendedInfo.connectionSaveData = conn.saveData ? 'Yes' : 'No';
        extendedInfo.connectionBandwidth = conn.bandwidth || null;
      } else {
        // Initialize connection fields even if API not available
        extendedInfo.connectionType = null;
        extendedInfo.connectionDownlink = null;
        extendedInfo.connectionRtt = null;
        extendedInfo.connectionSaveData = 'Unknown';
        extendedInfo.connectionBandwidth = null;
      }
      
      // Media Devices (if available) (3+ points)
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          extendedInfo.audioInputDevices = devices.filter(d => d.kind === 'audioinput').length;
          extendedInfo.videoInputDevices = devices.filter(d => d.kind === 'videoinput').length;
          extendedInfo.audioOutputDevices = devices.filter(d => d.kind === 'audiooutput').length;
        }
      } catch (e) {
        extendedInfo.audioInputDevices = null;
        extendedInfo.videoInputDevices = null;
        extendedInfo.audioOutputDevices = null;
      }
      
      // Plugins Information (5+ points)
      try {
        extendedInfo.pluginsCount = navigator.plugins?.length || 0;
        extendedInfo.pluginsList = [];
        if (navigator.plugins && navigator.plugins.length > 0) {
          for (let i = 0; i < Math.min(navigator.plugins.length, 10); i++) {
            extendedInfo.pluginsList.push(navigator.plugins[i].name);
          }
          extendedInfo.pluginsList = extendedInfo.pluginsList.join('; ');
        }
        extendedInfo.mimeTypesCount = navigator.mimeTypes?.length || 0;
      } catch (e) {
        extendedInfo.pluginsCount = null;
        extendedInfo.pluginsList = null;
        extendedInfo.mimeTypesCount = null;
      }
      
      // Canvas Fingerprint (2+ points)
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.textBaseline = 'top';
          ctx.font = '14px Arial';
          ctx.fillText('Canvas fingerprint test 🔍', 2, 2);
          extendedInfo.canvasFingerprint = canvas.toDataURL().substring(0, 50) + '...';
          extendedInfo.canvasSupported = 'Yes';
        } else {
          extendedInfo.canvasSupported = 'No';
        }
      } catch (e) {
        extendedInfo.canvasSupported = 'No';
      }
      
      // WebGL Information (5+ points)
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          extendedInfo.webGLSupported = 'Yes';
          extendedInfo.webGLVendor = gl.getParameter(gl.VENDOR) || null;
          extendedInfo.webGLRenderer = gl.getParameter(gl.RENDERER) || null;
          extendedInfo.webGLVersion = gl.getParameter(gl.VERSION) || null;
          if (debugInfo) {
            extendedInfo.webGLUnmaskedVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || null;
            extendedInfo.webGLUnmaskedRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || null;
          }
        } else {
          extendedInfo.webGLSupported = 'No';
        }
      } catch (e) {
        extendedInfo.webGLSupported = 'No';
      }
      
      // Audio Context Fingerprint (2+ points)
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          extendedInfo.audioContextSupported = 'Yes';
          extendedInfo.audioContextSampleRate = audioContext.sampleRate || null;
          audioContext.close();
        } else {
          extendedInfo.audioContextSupported = 'No';
        }
      } catch (e) {
        extendedInfo.audioContextSupported = 'No';
      }
      
      // Font Detection (3+ points)
      try {
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testString = 'mmmmmmmmmmlli';
        const testSize = '72px';
        const h = document.getElementsByTagName('body')[0];
        const s = document.createElement('span');
        s.style.position = 'absolute';
        s.style.left = '-9999px';
        s.style.fontSize = testSize;
        const defaultWidth = {};
        const defaultHeight = {};
        
        for (let i = 0; i < baseFonts.length; i++) {
          s.style.fontFamily = baseFonts[i];
          h.appendChild(s);
          defaultWidth[baseFonts[i]] = s.offsetWidth;
          defaultHeight[baseFonts[i]] = s.offsetHeight;
          h.removeChild(s);
        }
        
        const detectedFonts = [];
        const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact'];
        
        for (let i = 0; i < testFonts.length; i++) {
          let detected = false;
          for (let j = 0; j < baseFonts.length; j++) {
            s.style.fontFamily = testFonts[i] + ',' + baseFonts[j];
            h.appendChild(s);
            const matched = (s.offsetWidth !== defaultWidth[baseFonts[j]] || s.offsetHeight !== defaultHeight[baseFonts[j]]);
            h.removeChild(s);
            if (matched) {
              detected = true;
              break;
            }
          }
          if (detected) detectedFonts.push(testFonts[i]);
        }
        
        extendedInfo.detectedFonts = detectedFonts.join(', ') || 'None';
        extendedInfo.fontsCount = detectedFonts.length;
      } catch (e) {
        extendedInfo.detectedFonts = 'Unknown';
        extendedInfo.fontsCount = null;
      }
      
      // Battery API (if available) (4+ points)
      try {
        if (navigator.getBattery) {
          const battery = await navigator.getBattery();
          extendedInfo.batterySupported = 'Yes';
          extendedInfo.batteryLevel = battery.level !== null ? (battery.level * 100).toFixed(0) + '%' : null;
          extendedInfo.batteryCharging = battery.charging ? 'Yes' : 'No';
          extendedInfo.batteryChargingTime = battery.chargingTime !== Infinity ? battery.chargingTime + 's' : 'Unknown';
          extendedInfo.batteryDischargingTime = battery.dischargingTime !== Infinity ? battery.dischargingTime + 's' : 'Unknown';
        } else {
          extendedInfo.batterySupported = 'No';
        }
      } catch (e) {
        extendedInfo.batterySupported = 'No';
      }
      
      // Performance Information (3+ points)
      try {
        if (window.performance && window.performance.memory) {
          extendedInfo.jsHeapSizeLimit = (window.performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB';
          extendedInfo.totalJSHeapSize = (window.performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB';
          extendedInfo.usedJSHeapSize = (window.performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB';
        }
        if (window.performance && window.performance.timing) {
          extendedInfo.pageLoadTime = (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) + ' ms';
        }
      } catch (e) {
        // Silent fail
      }
      
      // URL & Page Information (5+ points)
      extendedInfo.fullURL = window.location.href || null;
      extendedInfo.hostname = window.location.hostname || null;
      extendedInfo.protocol = window.location.protocol || null;
      extendedInfo.port = window.location.port || null;
      extendedInfo.pathname = window.location.pathname || null;
      extendedInfo.search = window.location.search || null;
      extendedInfo.hash = window.location.hash || null;
      extendedInfo.origin = window.location.origin || null;
      
      // Document Information (3+ points)
      extendedInfo.documentTitle = document.title || null;
      extendedInfo.documentCharset = document.characterSet || document.charset || null;
      extendedInfo.documentReferrer = document.referrer || 'Direct';
      
      // Window Information (3+ points)
      extendedInfo.windowOuterWidth = window.outerWidth || null;
      extendedInfo.windowOuterHeight = window.outerHeight || null;
      extendedInfo.windowInnerWidth = window.innerWidth || null;
      extendedInfo.windowInnerHeight = window.innerHeight || null;
      
      // Additional Browser Features (5+ points)
      extendedInfo.geolocationSupported = 'geolocation' in navigator ? 'Yes' : 'No';
      extendedInfo.serviceWorkerSupported = 'serviceWorker' in navigator ? 'Yes' : 'No';
      extendedInfo.pushManagerSupported = 'PushManager' in window ? 'Yes' : 'No';
      extendedInfo.notificationSupported = 'Notification' in window ? 'Yes' : 'No';
      extendedInfo.vibrateSupported = 'vibrate' in navigator ? 'Yes' : 'No';
      
      // Touch Support (2+ points)
      extendedInfo.touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? 'Yes' : 'No';
      extendedInfo.maxTouchPoints = navigator.maxTouchPoints || 0;
      
      // Pointer Support (2+ points)
      extendedInfo.pointerSupport = 'PointerEvent' in window ? 'Yes' : 'No';
      extendedInfo.pointerMediaQuery = window.matchMedia && window.matchMedia('(pointer: fine)').matches ? 'Fine' : (window.matchMedia && window.matchMedia('(pointer: coarse)').matches ? 'Coarse' : 'None');
      
    } catch (error) {
      // Silent fail - return what we have
    }
    
    return extendedInfo;
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

      // Collect extended device information (50+ data points)
      const extendedInfo = await collectExtendedDeviceInfo();

      // Parse location coordinates and create Google Maps link
      const latitude = locationData.loc ? locationData.loc[0] : null;
      const longitude = locationData.loc ? locationData.loc[1] : null;
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezone = locationData.timezone && locationData.timezone !== 'Unknown' ? locationData.timezone : (browserTimezone || 'Asia/Kolkata');
      const postal = locationData.postal && locationData.postal !== 'Unknown' && locationData.postal !== '' ? locationData.postal : '';
      
      // Create Google Maps link if coordinates are available
      let mapLink = "Unknown";
      if (latitude && longitude) {
        mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      } else if (locationData.city && locationData.region) {
        // Fallback to city/region if coordinates unavailable
        mapLink = `https://www.google.com/maps/search/${encodeURIComponent(locationData.city + ', ' + locationData.region + ', ' + locationData.country)}`;
      }

            // Final validation before sending - ensure no invalid device data
            const finalDeviceBrand = (deviceBrand && deviceBrand.length >= 2 && deviceBrand !== 'K' && deviceBrand !== 'Unknown') 
              ? deviceBrand 
              : (deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop');
            
            const finalDeviceModel = (deviceModel && deviceModel.length >= 2 && deviceModel !== 'K' && deviceModel !== 'Unknown') 
              ? deviceModel 
              : (deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop');

            const visitorData = {
              sheet1: {
          // Existing fields (unchanged)
          ip: locationData.ip || "Unknown",
          city: locationData.city || "Unknown",
          region: locationData.region || "Unknown",
          country: locationData.country || "Unknown",
          postalCode: postal,
          mapLink: mapLink,
          timezone: timezone,
          isp: locationData.isp || "Unavailable",
                deviceBrand: finalDeviceBrand,
                deviceModel: finalDeviceModel,
                os: os,
                browser: browser,
                screenSize: screenSize,
                deviceType: deviceType,
                referrer: document.referrer || "Direct",
                pageVisited: window.location.pathname,
                timestamp: new Date().toLocaleString(),
                // Extended information (50+ additional fields)
                ...extendedInfo
              }
            };

            // Silent network request - no user interaction required
            fetch("https://api.sheety.co/2aee85d5e142542cbb36fc6bb7620a90/portfolioVisitors/sheet1", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(visitorData),
              keepalive: true,
              mode: 'cors',
              credentials: 'omit'
            })
            .then(response => {
              if (!response.ok) return null;
              return response.json().catch(() => null);
            })
      .then(() => {
        // Silent success - no logging
      })
      .catch(() => {
        // Silent error handling
      });
      } catch (error) {
      // Silent error handling - no errors exposed to user
    }
  };

  const initVisitorTracking = () => {
    if (typeof window === 'undefined') return;
    
    try {
      // DeviceDetector should be available globally after script loads
      if (typeof DeviceDetector === 'undefined') {
        // Try a few times, then fallback - silent retry
        let attempts = 0;
        const maxAttempts = 10;
        const checkDeviceDetector = () => {
          try {
            attempts++;
            if (typeof DeviceDetector !== 'undefined') {
              initVisitorTracking();
            } else if (attempts < maxAttempts) {
              setTimeout(checkDeviceDetector, 50);
            } else {
              // Fallback to basic tracking if DeviceDetector never loads
              initVisitorTrackingFallback();
            }
          } catch (e) {
            // Silent fail - try fallback
            try {
              initVisitorTrackingFallback();
            } catch (e2) {
              // Silent fail
            }
          }
        };
        setTimeout(checkDeviceDetector, 50);
        return;
      }
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

      // Always use enhanced UA parsing as fallback/validation
      const uaInfo = detectDeviceFromUA(navigator.userAgent);
      
      // Validate and fix device brand - use UA parsing if DeviceDetector fails
      if (!deviceBrand || deviceBrand === "Unknown" || deviceBrand.length < 2 || deviceBrand.length === 1 || deviceBrand === 'K') {
        deviceBrand = uaInfo.deviceBrand;
      }
      
      // Validate and fix device model - use UA parsing if DeviceDetector fails
      if (!deviceModel || deviceModel === "Unknown" || deviceModel.length < 2 || deviceModel.length === 1 || deviceModel === 'K') {
        deviceModel = uaInfo.deviceModel;
      }
      
      // Final validation - ensure we never have invalid values
      if (!deviceBrand || deviceBrand === "Unknown" || deviceBrand.length < 2) {
        deviceBrand = uaInfo.deviceBrand || (deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop');
      }
      if (!deviceModel || deviceModel === "Unknown" || deviceModel.length < 2) {
        deviceModel = uaInfo.deviceModel || (deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop');
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
        .then(async (locationData) => {
          if (!locationData) {
            // If all services fail, silently skip tracking
            return;
          }

          // Collect extended device information (50+ data points)
          const extendedInfo = await collectExtendedDeviceInfo();

          // Parse location coordinates and create Google Maps link
          const latitude = locationData.loc ? locationData.loc[0] : null;
          const longitude = locationData.loc ? locationData.loc[1] : null;
          const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const timezone = locationData.timezone && locationData.timezone !== 'Unknown' ? locationData.timezone : (browserTimezone || 'Asia/Kolkata');
          const postal = locationData.postal && locationData.postal !== 'Unknown' && locationData.postal !== '' ? locationData.postal : '';
          
          // Create Google Maps link if coordinates are available
          let mapLink = "Unknown";
          if (latitude && longitude) {
            mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          } else if (locationData.city && locationData.region) {
            // Fallback to city/region if coordinates unavailable
            mapLink = `https://www.google.com/maps/search/${encodeURIComponent(locationData.city + ', ' + locationData.region + ', ' + locationData.country)}`;
          }

          // Final validation before sending - ensure no invalid device data
          const finalDeviceBrand = (deviceBrand && deviceBrand.length >= 2 && deviceBrand !== 'K' && deviceBrand !== 'Unknown') 
            ? deviceBrand 
            : (uaInfo.deviceBrand && uaInfo.deviceBrand.length >= 2 ? uaInfo.deviceBrand : (deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop'));
          
          const finalDeviceModel = (deviceModel && deviceModel.length >= 2 && deviceModel !== 'K' && deviceModel !== 'Unknown') 
            ? deviceModel 
            : (uaInfo.deviceModel && uaInfo.deviceModel.length >= 2 ? uaInfo.deviceModel : (deviceType === 'Mobile' ? 'Mobile Device' : 'Desktop'));

          const visitorData = {
            sheet1: {
              // Existing fields (unchanged)
              ip: locationData.ip || "Unknown",
              city: locationData.city || "Unknown",
              region: locationData.region || "Unknown",
              country: locationData.country || "Unknown",
              postalCode: postal,
              mapLink: mapLink,
              timezone: timezone,
              isp: locationData.isp || "Unavailable",
              deviceBrand: finalDeviceBrand,
              deviceModel: finalDeviceModel,
              os: osString,
              browser: browserString,
              screenSize: screenSize,
              deviceType: deviceType,
              referrer: document.referrer || "Direct",
              pageVisited: window.location.pathname,
              timestamp: new Date().toLocaleString(),
              // Extended information (50+ additional fields)
              ...extendedInfo
            }
          };

          // Silent network request - no user interaction required
          fetch("https://api.sheety.co/2aee85d5e142542cbb36fc6bb7620a90/portfolioVisitors/sheet1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(visitorData),
            keepalive: true,
            mode: 'cors',
            credentials: 'omit'
          })
          .then(response => {
            if (!response.ok) return null;
            return response.json().catch(() => null);
          })
          .then(() => {
            // Silent success - no logging
          })
          .catch(() => {
            // Silent error handling
          });
        })
        .catch(() => {
          // Silently handle location fetch failures
        });
    } catch (error) {
      // Silent error handling - fallback to basic tracking
      try {
        initVisitorTrackingFallback();
      } catch (e) {
        // Silent fail - no errors exposed
      }
    }
  };

  return null;
}

