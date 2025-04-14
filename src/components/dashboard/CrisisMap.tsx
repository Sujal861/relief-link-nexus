
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertTriangle, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Crisis locations data for demonstration
const CRISIS_LOCATIONS = [
  { id: 1, name: 'Eastern Region Crisis', coordinates: [35.21, 31.77], type: 'water', severity: 'high' },
  { id: 2, name: 'Northern Region Floods', coordinates: [34.81, 32.08], type: 'flood', severity: 'medium' },
  { id: 3, name: 'Southern District Earthquake', coordinates: [35.50, 30.60], type: 'earthquake', severity: 'high' },
  { id: 4, name: 'Western Region Drought', coordinates: [34.30, 31.50], type: 'drought', severity: 'medium' },
  { id: 5, name: 'Central Region Storm', coordinates: [35.08, 31.40], type: 'storm', severity: 'low' },
];

// Drop zone locations data for demonstration
const DROP_ZONES = [
  { id: 1, name: 'Primary Medical Drop Zone', coordinates: [35.23, 31.79], type: 'medical' },
  { id: 2, name: 'Food Distribution Center', coordinates: [34.83, 32.10], type: 'food' },
  { id: 3, name: 'Water Supply Station', coordinates: [35.52, 30.62], type: 'water' },
  { id: 4, name: 'Emergency Shelter', coordinates: [34.32, 31.52], type: 'shelter' },
  { id: 5, name: 'Aid Coordination Center', coordinates: [35.10, 31.42], type: 'coordination' },
];

// Supply routes for demonstration (pairs of coordinates forming routes)
const SUPPLY_ROUTES = [
  { id: 1, name: 'Primary Supply Route', coordinates: [[35.21, 31.77], [35.23, 31.79]] },
  { id: 2, name: 'Northern Aid Route', coordinates: [[34.81, 32.08], [34.83, 32.10]] },
  { id: 3, name: 'Southern Response Route', coordinates: [[35.50, 30.60], [35.52, 30.62]] },
  { id: 4, name: 'Western Emergency Route', coordinates: [[34.30, 31.50], [34.32, 31.52]] },
  { id: 5, name: 'Central Distribution Route', coordinates: [[35.08, 31.40], [35.10, 31.42]] },
];

interface CrisisMapProps {
  showDropZones: boolean;
  showRoutes: boolean;
  showTeams: boolean;
  isMapDownloaded: boolean;
}

const CrisisMap: React.FC<CrisisMapProps> = ({ 
  showDropZones, 
  showRoutes, 
  showTeams,
  isMapDownloaded
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const { toast } = useToast();

  const saveMapToken = (token: string) => {
    setMapToken(token);
    setIsTokenSet(true);
    localStorage.setItem('mapbox-token', token);
    toast({
      title: "Map token saved",
      description: "Your Mapbox token has been saved for this session",
    });
  };

  useEffect(() => {
    // Check for token in localStorage
    const savedToken = localStorage.getItem('mapbox-token');
    if (savedToken) {
      setMapToken(savedToken);
      setIsTokenSet(true);
    }
  }, []);

  useEffect(() => {
    if (!isTokenSet || !mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isMapDownloaded 
        ? 'mapbox://styles/mapbox/streets-v12' // Offline-compatible style
        : 'mapbox://styles/mapbox/satellite-streets-v12', // More detailed style
      center: [35.0, 31.5], // Center on Middle East region
      zoom: 7,
      pitch: 40,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add crisis locations markers
    const addCrisisMarkers = () => {
      if (!map.current) return;
      
      CRISIS_LOCATIONS.forEach(location => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'crisis-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = location.severity === 'high' ? 'rgba(239, 68, 68, 0.8)' : 
                                  location.severity === 'medium' ? 'rgba(245, 158, 11, 0.8)' : 
                                  'rgba(59, 130, 246, 0.8)';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        
        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <h3 class="font-bold">${location.name}</h3>
                <p><strong>Type:</strong> ${location.type}</p>
                <p><strong>Severity:</strong> ${location.severity}</p>
              `)
          )
          .addTo(map.current);
      });
    };

    // Add drop zone markers if selected
    const addDropZoneMarkers = () => {
      if (!map.current || !showDropZones) return;
      
      DROP_ZONES.forEach(zone => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'dropzone-marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = 'rgba(16, 185, 129, 0.8)'; // Green
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        el.style.cursor = 'pointer';
        
        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat(zone.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <h3 class="font-bold">${zone.name}</h3>
                <p><strong>Type:</strong> ${zone.type}</p>
              `)
          )
          .addTo(map.current);
      });
    };

    // Add supply routes if selected
    const addSupplyRoutes = () => {
      if (!map.current || !showRoutes) return;
      
      map.current.on('load', () => {
        SUPPLY_ROUTES.forEach((route, index) => {
          map.current!.addSource(`route-${index}`, {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': route.coordinates
              }
            }
          });
          
          map.current!.addLayer({
            'id': `route-${index}`,
            'type': 'line',
            'source': `route-${index}`,
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#0ea5e9',
              'line-width': 3,
              'line-dasharray': [2, 1]
            }
          });
        });
      });
    };

    // Add field team markers if selected
    const addTeamMarkers = () => {
      if (!map.current || !showTeams) return;
      
      // Example team locations (simulated in real world these would be real-time)
      const teamLocations = [
        { id: 1, name: 'Medical Team Alpha', coordinates: [35.18, 31.75], status: 'active' },
        { id: 2, name: 'Rescue Team Bravo', coordinates: [34.78, 32.05], status: 'active' },
        { id: 3, name: 'Supply Team Charlie', coordinates: [35.47, 30.58], status: 'standby' },
      ];
      
      teamLocations.forEach(team => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'team-marker';
        el.style.width = '18px';
        el.style.height = '18px';
        el.style.borderRadius = '3px';
        el.style.backgroundColor = team.status === 'active' ? 'rgba(99, 102, 241, 0.8)' : 'rgba(156, 163, 175, 0.8)';
        el.style.border = '2px solid white';
        el.style.transform = 'rotate(45deg)';
        el.style.cursor = 'pointer';
        
        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat(team.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <h3 class="font-bold">${team.name}</h3>
                <p><strong>Status:</strong> ${team.status}</p>
              `)
          )
          .addTo(map.current);
      });
    };

    // Add all markers and routes
    map.current.on('load', () => {
      addCrisisMarkers();
      addDropZoneMarkers();
      addSupplyRoutes();
      addTeamMarkers();
      
      // Simulate real-time updates with a timer
      const interval = setInterval(() => {
        if (!navigator.onLine) {
          return; // Don't update if offline
        }
        
        // Simulate a change in marker position (for the first crisis marker)
        if (map.current && CRISIS_LOCATIONS.length > 0) {
          CRISIS_LOCATIONS[0].coordinates[0] += (Math.random() - 0.5) * 0.02;
          CRISIS_LOCATIONS[0].coordinates[1] += (Math.random() - 0.5) * 0.02;
          
          // Update would happen here with real data
          // In a real app, this would use websockets or polling
        }
      }, 30000); // Update every 30 seconds
      
      return () => clearInterval(interval);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isTokenSet, mapToken, showDropZones, showRoutes, showTeams, isMapDownloaded]);

  if (!isTokenSet) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4 bg-white rounded-lg border border-gray-200">
        <div className="text-center mb-4">
          <AlertTriangle size={40} className="mx-auto text-amber-500 mb-2" />
          <h3 className="text-lg font-bold">Mapbox API Token Required</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            To display the crisis map, please enter your Mapbox public token. You can get this from your 
            Mapbox account dashboard.
          </p>
        </div>
        
        <div className="w-full max-w-md">
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-relief-lime"
              placeholder="Enter your Mapbox public token"
              value={mapToken}
              onChange={(e) => setMapToken(e.target.value)}
            />
            <button
              className="bg-relief-lime text-relief-black px-4 py-2 rounded-r-md hover:bg-relief-lime/90 transition-colors"
              onClick={() => saveMapToken(mapToken)}
            >
              Save
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your token will be stored locally in your browser and is not sent to our servers.
          </p>
        </div>
        
        <div className="text-sm text-gray-600 max-w-md mx-auto border-t border-gray-200 pt-4 mt-4">
          <p>
            Don't have a Mapbox token? Visit <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mapbox</a> to 
            create a free account and get your public token.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
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
