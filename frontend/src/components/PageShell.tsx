import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  title?: string;
  rightAction?: ReactNode;
  backLabel?: string;
  onBack?: () => void;
}

export default function PageShell({
  children,
  title,
  rightAction,
  backLabel,
  onBack,
}: PageShellProps) {
  return (
    <div className="min-h-full pb-16">
      {title && (
        <header className="sticky top-0 z-40 bg-surface-primary border-b border-border px-5 py-4 flex items-center justify-between">
          <div className="w-16">
            {backLabel && onBack && (
              <button
                onClick={onBack}
                className="text-base text-text-secondary"
              >
                {backLabel}
              </button>
            )}
          </div>
          <h1 className="text-lg font-medium">{title}</h1>
          <div className="w-16 flex justify-end">{rightAction}</div>
        </header>
      )}
      {children}
    </div>
  );
}
