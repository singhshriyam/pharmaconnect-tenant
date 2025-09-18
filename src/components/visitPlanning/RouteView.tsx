import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, Navigation, Clock, Route, Car, AlertTriangle } from "lucide-react";

// Import shared types from centralized location
import { Visit, RouteViewProps } from '../common/types';

interface OptimizedVisit extends Visit {
  sequence: number;
  estimatedTravelTime: number;
  estimatedArrival: string;
  routeOptimized: boolean;
}

export default function RouteView({ visits, selectedDate }: RouteViewProps) {
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedVisit[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeStats, setRouteStats] = useState({
    totalVisits: 0,
    estimatedTime: 0,
    totalDistance: 0,
    fuelCost: 0
  });

  const selectedDateVisits = useMemo(() => {
    if (!visits || visits.length === 0) return [];
    return visits.filter(visit => {
      const visitDate = new Date(visit.visit_date);
      return visitDate.toDateString() === selectedDate.toDateString();
    });
  }, [visits, selectedDate]);

  const calculateEstimatedArrival = useCallback((index: number, scheduledTime?: string) => {
    if (index === 0 && scheduledTime) return scheduledTime;

    const baseTime = scheduledTime || '09:00';
    const [hours, minutes] = baseTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + (index * 65);

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  }, []);

  const optimizeRoute = useCallback(async () => {
    if (selectedDateVisits.length === 0) {
      setOptimizedRoute([]);
      setRouteStats({ totalVisits: 0, estimatedTime: 0, totalDistance: 0, fuelCost: 0 });
      return;
    }

    setIsOptimizing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      let sorted = [...selectedDateVisits];

      sorted.sort((a, b) => {
        const typeOrder: Record<string, number> = { 'Emergency': 0, 'Scheduled': 1, 'Follow-up': 2, 'New Doctor': 3 };
        const typePriority = (typeOrder[a.visit_type] || 4) - (typeOrder[b.visit_type] || 4);

        if (typePriority !== 0) return typePriority;

        if (a.visit_time && b.visit_time) {
          return a.visit_time.localeCompare(b.visit_time);
        }

        return a.doctor_name.localeCompare(b.doctor_name);
      });

      const optimizedWithDetails: OptimizedVisit[] = sorted.map((visit, index) => ({
        ...visit,
        sequence: index + 1,
        estimatedTravelTime: index === 0 ? 0 : 15 + Math.floor(Math.random() * 20),
        estimatedArrival: calculateEstimatedArrival(index, visit.visit_time),
        routeOptimized: true
      }));

      const stats = {
        totalVisits: sorted.length,
        estimatedTime: sorted.length * 45 + (sorted.length - 1) * 20,
        totalDistance: sorted.length * 8.5,
        fuelCost: sorted.length * 8.5 * 0.15
      };

      setOptimizedRoute(optimizedWithDetails);
      setRouteStats(stats);

    } catch (error) {
      console.error('Route optimization error:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, [selectedDateVisits, calculateEstimatedArrival]);

  useEffect(() => {
    optimizeRoute();
  }, [optimizeRoute]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Missed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }, []);

  const getPriorityIcon = useCallback((visitType: string) => {
    switch (visitType) {
      case 'Emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'Scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Follow-up': return <MapPin className="w-4 h-4 text-green-500" />;
      default: return <MapPin className="w-4 h-4 text-gray-500" />;
    }
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Route Summary */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Route className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Route Summary</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium">Total Visits</span>
            <span className="text-xl font-bold text-blue-600">{routeStats.totalVisits}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium">Est. Time</span>
            <span className="text-xl font-bold text-green-600">{Math.floor(routeStats.estimatedTime / 60)}h {routeStats.estimatedTime % 60}m</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <span className="text-sm font-medium">Distance</span>
            <span className="text-xl font-bold text-orange-600">{routeStats.totalDistance.toFixed(1)} km</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="text-sm font-medium">Fuel Cost</span>
            <span className="text-xl font-bold text-purple-600">₹{routeStats.fuelCost.toFixed(0)}</span>
          </div>
          <button
            onClick={optimizeRoute}
            disabled={isOptimizing || selectedDateVisits.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {isOptimizing ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Re-optimize Route
              </>
            )}
          </button>
        </div>
      </div>

      {/* Optimized Route */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Optimized Route for {formatDate(selectedDate)}
              </h3>
            </div>
            {optimizedRoute.length > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm border border-green-200">
                {optimizedRoute.length} stops
              </span>
            )}
          </div>

          {isOptimizing ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
                <p className="text-gray-600">Optimizing your route...</p>
              </div>
            </div>
          ) : optimizedRoute.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="mb-2">No visits scheduled for {formatDate(selectedDate)}</p>
              <p className="text-sm text-gray-400 mb-4">
                Create a visit for today using the "Plan New Visit" button to see route optimization in action.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {optimizedRoute.map((visit, index) => (
                <div
                  key={visit.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {visit.sequence}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getPriorityIcon(visit.visit_type)}
                      <span className="font-medium">{visit.doctor_name}</span>
                      <span className={`px-2 py-1 rounded text-sm border ${getStatusColor(visit.status)}`}>
                        {visit.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {visit.visit_type} • Est. arrival: {visit.estimatedArrival}
                      {visit.estimatedTravelTime > 0 && ` • Travel time: ${visit.estimatedTravelTime} min`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
