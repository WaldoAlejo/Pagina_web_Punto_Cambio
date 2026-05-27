import { useQuery } from "@tanstack/react-query";
import { fetchFAQs } from "@/lib/api";
import type { FAQ } from "@/lib/types";

export function useFAQs() {
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}
