import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig } from "@/lib/supabase";

export function useSiteConfig() {
  return useQuery({
    queryKey: ["site-config"],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 60, // 1 hora — recarga si la ventana estuvo más de 1h inactiva
    retry: 2,
  });
}
