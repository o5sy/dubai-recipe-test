'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[var(--color-text-primary)] group-[.toaster]:border-[var(--color-cookie)] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-[var(--color-text-secondary)]',
          actionButton:
            'group-[.toast]:bg-[var(--color-pistachio)] group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-[var(--color-beige)] group-[.toast]:text-[var(--color-text-primary)]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
