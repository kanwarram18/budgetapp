import { useQuery } from '@tanstack/react-query';
import { fetchHealth } from '../api/client';

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    refetchInterval: 30000,
  });

  return (
    <div className="px-5 pt-5 pb-20">
      {/* Phase 0: Connection status */}
      <div className="mb-4">
        <p className="text-sm text-text-secondary">April 2026</p>
        <p className="text-3xl font-medium mt-1">Budget App</p>
      </div>

      <div className="bg-surface-secondary rounded-xl p-4">
        <p className="text-2xs text-text-secondary uppercase tracking-wide mb-2">
          Backend status
        </p>

        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-base">Connecting...</p>
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div>
              <p className="text-base text-accent-danger">Not connected</p>
              <p className="text-2xs text-text-tertiary mt-1">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
          </div>
        )}

        {data && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-success" />
            <div>
              <p className="text-base">Connected</p>
              <p className="text-2xs text-text-tertiary mt-1">
                v{data.version} · {new Date(data.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Phase 0 info */}
      <div className="mt-6 space-y-3">
        <div className="border border-border rounded-xl p-4">
          <p className="text-sm font-medium mb-1">Phase 0 complete</p>
          <p className="text-2xs text-text-secondary leading-relaxed">
            The backend is running, the database is connected, and this PWA
            is talking to the API. Next up: transactions and categories.
          </p>
        </div>

        <div className="border border-border rounded-xl p-4">
          <p className="text-sm font-medium mb-1">Install on your phone</p>
          <p className="text-2xs text-text-secondary leading-relaxed">
            In Safari, tap the Share button then "Add to Home Screen" to
            install this as an app on your iPhone.
          </p>
        </div>
      </div>
    </div>
  );
}
