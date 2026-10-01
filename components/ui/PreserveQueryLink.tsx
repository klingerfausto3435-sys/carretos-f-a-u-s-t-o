"use client";

import { useEffect, useState } from "react";

/**
 * Link interno que carrega a query string adiante (MASTER_SPEC §18).
 * Sem isso, navegar para a política de privacidade e voltar perderia
 * utm_* e gclid. Degrada para link comum se o JS não rodar.
 */
export function PreserveQueryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [resolved, setResolved] = useState(href);

  useEffect(() => {
    const search = window.location.search;
    if (search) setResolved(`${href}${search}`);
  }, [href]);

  return (
    <a href={resolved} className={className}>
      {children}
    </a>
  );
}
