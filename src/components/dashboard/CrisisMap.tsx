import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const center = {
  lat: 31.5,
  lng: 35.0
};

const CrisisMap: React.FC<CrisisMapProps> = ({ 
  showDropZones, 
  showRoutes, 
  showTeams,
  isMapDownloaded
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const { toast } = useToast();

  // See if we have a saved API key
  React.useEffect(() => {
    const savedKey = localStorage.getItem('google-maps-key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    setIsKeySet(true);
    localStorage.setItem('google-maps-key', key);
    toast({
      title: "Google Maps API key saved",
      description: "Your API key has been saved for this session",
    });
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
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

  if (!isKeySet) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4 bg-white rounded-lg border border-gray-200">
        <div className="text-center mb-4">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-2" />
          <h3 className="text-lg font-bold">Google Maps API Key Required</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            To display the crisis map, please enter your Google Maps API key. You can get this from the Google Cloud Console.
          </p>
        </div>
        
        <div className="w-full max-w-md">
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-relief-lime"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              className="bg-relief-lime text-relief-black px-4 py-2 rounded-r-md hover:bg-relief-lime/90 transition-colors"
              onClick={() => saveApiKey(apiKey)}
            >
              Save
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your API key will be stored locally in your browser and is not sent to our servers.
          </p>
        </div>
        
        <div className="text-sm text-gray-600 max-w-md mx-auto border-t border-gray-200 pt-4 mt-4">
          <p>
            Don't have a Google Maps API key? Visit <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a> to 
            create an API key for your project.
          </p>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default CrisisMap;
