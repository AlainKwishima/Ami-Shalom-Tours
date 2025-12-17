import clsx from 'clsx';
import { ReactNode } from 'react';

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide',
        className,
      )}
    >
      {children}
    </span>
  );
}


