import { useQuery } from "@tanstack/react-query";
import { fetchBranches } from "@/lib/api";
import type { Branch } from "@/lib/types";

export function useBranches() {
  return useQuery<Branch[]>({
    queryKey: ["branches"],
    queryFn: fetchBranches,
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

// Haversine: distancia en km entre dos coordenadas
export function distanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestBranch(
  branches: Branch[],
  lat: number,
  lng: number,
): Branch & { distanceKm: number } {
  const sorted = branches
    .filter((b) => b.is_active)
    .map((b) => ({ ...b, distanceKm: distanceKm(lat, lng, b.lat, b.lng) }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
  return sorted[0];
}
