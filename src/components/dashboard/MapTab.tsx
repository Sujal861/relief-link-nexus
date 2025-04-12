
import { Layers } from "lucide-react";

export const MapTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-display font-bold">Crisis Map</h2>
        <p className="text-gray-600">Interactive map of active crisis zones and drop points</p>
      </div>
      <div className="bg-gray-200 aspect-video flex items-center justify-center p-6">
        <div className="text-center text-gray-500">
          <Layers className="w-16 h-16 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">Interactive Crisis Map</p>
          <p className="text-sm">The map would display here with affected areas, drop zones, and supply routes</p>
        </div>
      </div>
    </div>
  );
};
