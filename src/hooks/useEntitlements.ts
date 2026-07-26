import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { fetchEntitlements, ENTITLEMENTS, type Entitlement } from "@/lib/licensing";

// Reads the signed-in user's active entitlements (RLS scopes the query).
// `hasEntitlement` treats All-Access as a superset of every pack.
export function useEntitlements() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery<Entitlement[]>({
    queryKey: ["entitlements", user?.id],
    queryFn: fetchEntitlements,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const keys = new Set((query.data ?? []).map((e) => e.entitlement));

  const hasEntitlement = (key: string) =>
    keys.has(key) || keys.has(ENTITLEMENTS.ALL_ACCESS);

  return {
    entitlements: query.data ?? [],
    loading: !!user && query.isLoading,
    isPremium: keys.size > 0,
    hasEntitlement,
    hasPack: (platformId: string) => hasEntitlement(ENTITLEMENTS.pack(platformId)),
    refresh: () => queryClient.invalidateQueries({ queryKey: ["entitlements", user?.id] }),
  };
}
