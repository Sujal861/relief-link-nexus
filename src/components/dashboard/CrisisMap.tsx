import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { AlertTriangle, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { config } from '@/lib/config';

// Crisis locations data for demonstration
const CRISIS_LOCATIONS = [
  { id: 1, name: 'Eastern Region Crisis', coordinates: { lat: 31.77, lng: 35.21 }, type: 'water', severity: 'high' },
  { id: 2, name: 'Northern Region Floods', coordinates: { lat: 32.08, lng: 34.81 }, type: 'flood', severity: 'medium' },
  { id: 3, name: 'Southern District Earthquake', coordinates: { lat: 30.60, lng: 35.50 }, type: 'earthquake', severity: 'high' },
  { id: 4, name: 'Western Region Drought', coordinates: { lat: 31.50, lng: 34.30 }, type: 'drought', severity: 'medium' },
  { id: 5, name: 'Central Region Storm', coordinates: { lat: 31.40, lng: 35.08 }, type: 'storm', severity: 'low' },
];

// Drop zone locations data for demonstration
const DROP_ZONES = [
  { id: 1, name: 'Primary Medical Drop Zone', coordinates: { lat: 31.79, lng: 35.23 }, type: 'medical' },
  { id: 2, name: 'Food Distribution Center', coordinates: { lat: 32.10, lng: 34.83 }, type: 'food' },
  { id: 3, name: 'Water Supply Station', coordinates: { lat: 30.62, lng: 35.52 }, type: 'water' },
  { id: 4, name: 'Emergency Shelter', coordinates: { lat: 31.52, lng: 34.32 }, type: 'shelter' },
  { id: 5, name: 'Aid Coordination Center', coordinates: { lat: 31.42, lng: 35.10 }, type: 'coordination' },
];

// Supply routes for demonstration
const SUPPLY_ROUTES = [
  { id: 1, name: 'Primary Supply Route', coordinates: [
    { lat: 31.77, lng: 35.21 },
    { lat: 31.79, lng: 35.23 }
  ]},
  { id: 2, name: 'Northern Aid Route', coordinates: [
    { lat: 32.08, lng: 34.81 },
    { lat: 32.10, lng: 34.83 }
  ]},
  { id: 3, name: 'Southern Response Route', coordinates: [
    { lat: 30.60, lng: 35.50 },
    { lat: 30.62, lng: 35.52 }
  ]},
  { id: 4, name: 'Western Emergency Route', coordinates: [
    { lat: 31.50, lng: 34.30 },
    { lat: 31.52, lng: 34.32 }
  ]},
  { id: 5, name: 'Central Distribution Route', coordinates: [
    { lat: 31.40, lng: 35.08 },
    { lat: 31.42, lng: 35.10 }
  ]},
];

interface CrisisMapProps {
  showDropZones: boolean;
  showRoutes: boolean;
  showTeams: boolean;
  isMapDownloaded: boolean;
  initialCenter?: { lat: number; lng: number };
  showUserLocation?: boolean;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: 31.5,
  lng: 35.0
};

const CrisisMap: React.FC<CrisisMapProps> = ({ 
  showDropZones, 
  showRoutes, 
  showTeams,
  isMapDownloaded,
  initialCenter,
  showUserLocation = false
}) => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [center, setCenter] = useState(initialCenter || defaultCenter);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  // Track user location if enabled
  useEffect(() => {
    if (!showUserLocation) return;
    
    let watchId: number;
    
    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      setIsLocating(false);
      
      // If we get location for the first time, center the map on user
      if (!userLocation) {
        setCenter({ lat: latitude, lng: longitude });
      }
    };
    
    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Error getting location:", error);
      setIsLocating(false);
      toast({
        title: "Location Error",
        description: `Could not access your location: ${error.message}`,
        variant: "destructive"
      });
    };
    
    if (navigator.geolocation) {
      setIsLocating(true);
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive"
      });
    }
    
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [showUserLocation, toast, userLocation]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey,
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    mapTypeId: isMapDownloaded ? 'roadmap' : 'hybrid',
  };

  // Team locations for real-time updates
  const [teamLocations, setTeamLocations] = useState([
    { id: 1, name: 'Medical Team Alpha', coordinates: { lat: 31.75, lng: 35.18 }, status: 'active' },
    { id: 2, name: 'Rescue Team Bravo', coordinates: { lat: 32.05, lng: 34.78 }, status: 'active' },
    { id: 3, name: 'Supply Team Charlie', coordinates: { lat: 30.58, lng: 35.47 }, status: 'standby' },
  ]);

  // Simulate real-time updates
  React.useEffect(() => {
    if (!navigator.onLine) return;

    const interval = setInterval(() => {
      setTeamLocations(prev => 
        prev.map(team => ({
          ...team,
          coordinates: {
            lat: team.coordinates.lat + (Math.random() - 0.5) * 0.01,
            lng: team.coordinates.lng + (Math.random() - 0.5) * 0.01
          }
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loadError) {
    return (
      <div className="flex items-center justify-center p-10 bg-white rounded-lg border border-gray-200">
        <AlertTriangle className="text-red-500 mr-2" />
        <span>Error loading Google Maps: {loadError.message}</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-10 bg-white rounded-lg border border-gray-200">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-relief-lime"></div>
        <span className="ml-3">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* Crisis Markers */}
        {CRISIS_LOCATIONS.map((location) => (
          <Marker
            key={`crisis-${location.id}`}
            position={location.coordinates}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: location.severity === 'high' ? '#ef4444' : 
                        location.severity === 'medium' ? '#f59e0b' : '#3b82f6',
              fillOpacity: 0.8,
              strokeWeight: 2,
              strokeColor: '#ffffff'
            }}
            onClick={() => setSelectedMarker({
              ...location,
              type: 'crisis'
            })}
          />
        ))}

        {/* Drop Zone Markers */}
        {showDropZones && DROP_ZONES.map((zone) => (
          <Marker
            key={`dropzone-${zone.id}`}
            position={zone.coordinates}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#10b981',
              fillOpacity: 0.8,
              strokeWeight: 2,
              strokeColor: '#ffffff'
            }}
            onClick={() => setSelectedMarker({
              ...zone,
              type: 'dropzone'
            })}
          />
        ))}

        {/* Team Markers */}
        {showTeams && teamLocations.map((team) => (
          <Marker
            key={`team-${team.id}`}
            position={team.coordinates}
            icon={{
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 6,
              fillColor: team.status === 'active' ? '#6366f1' : '#9ca3af',
              fillOpacity: 0.8,
              strokeWeight: 2,
              strokeColor: '#ffffff',
              rotation: 45
            }}
            onClick={() => setSelectedMarker({
              ...team,
              type: 'team'
            })}
          />
        ))}

        {/* User Location Marker */}
        {showUserLocation && userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#3b82f6',
              fillOpacity: 0.8,
              strokeWeight: 2,
              strokeColor: '#ffffff'
            }}
            onClick={() => setSelectedMarker({
              name: 'Your Location',
              coordinates: userLocation,
              type: 'user'
            })}
          >
            {/* Add a pulsating effect around the user location */}
            <div className="absolute w-6 h-6 bg-blue-500/30 rounded-full animate-ping"></div>
          </Marker>
        )}

        {/* Supply Routes */}
        {showRoutes && SUPPLY_ROUTES.map((route) => (
          <Polyline
            key={`route-${route.id}`}
            path={route.coordinates}
            options={{
              strokeColor: '#0ea5e9',
              strokeOpacity: 0.8,
              strokeWeight: 3,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5,
                    fillOpacity: 0,
                    strokeColor: '#0ea5e9',
                    strokeWeight: 1,
                  },
                  offset: '0',
                  repeat: '20px'
                }
              ]
            }}
            onClick={() => setSelectedMarker({
              ...route,
              type: 'route'
            })}
          />
        ))}

        {/* Info Window for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={
              selectedMarker.type === 'route' 
                ? selectedMarker.coordinates[0] // For routes, use the first point
                : selectedMarker.coordinates
            }
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-sm">{selectedMarker.name}</h3>
              {selectedMarker.type === 'crisis' && (
                <>
                  <p className="text-xs mt-1"><strong>Type:</strong> {selectedMarker.type}</p>
                  <p className="text-xs"><strong>Severity:</strong> {selectedMarker.severity}</p>
                </>
              )}
              {selectedMarker.type === 'dropzone' && (
                <p className="text-xs mt-1"><strong>Type:</strong> {selectedMarker.type}</p>
              )}
              {selectedMarker.type === 'team' && (
                <p className="text-xs mt-1"><strong>Status:</strong> {selectedMarker.status}</p>
              )}
              {selectedMarker.type === 'route' && (
                <p className="text-xs mt-1"><strong>Type:</strong> Supply route</p>
              )}
              {selectedMarker.type === 'user' && (
                <p className="text-xs mt-1"><strong>Your current location</strong></p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      <div className="absolute bottom-4 left-4 z-10 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg text-sm">
        <div className="font-semibold mb-2">Map Legend</div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>High Severity Crisis</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span>Medium Severity Crisis</span>
          </div>
          {showDropZones && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Drop Zones</span>
            </div>
          )}
          {showTeams && (
            <div className="flex items-center">
              <div className="w-3 h-3 transform rotate-45 bg-indigo-500 mr-2"></div>
              <span>Field Teams</span>
            </div>
          )}
          {showRoutes && (
            <div className="flex items-center">
              <div className="w-6 h-0.5 bg-blue-500 mr-2"></div>
              <span>Supply Routes</span>
            </div>
          )}
          {showUserLocation && userLocation && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Your Location</span>
            </div>
          )}
        </div>
      </div>
      
      {showUserLocation && (
        <button 
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          onClick={() => {
            if (userLocation) {
              mapRef.current?.panTo(userLocation);
              mapRef.current?.setZoom(14);
            } else {
              toast({
                title: "Finding your location",
                description: "Please wait while we locate you",
              });
            }
          }}
          disabled={isLocating}
        >
          <Navigation size={20} className="text-blue-600" />
        </button>
      )}
    </div>
  );
};

export default CrisisMap;
