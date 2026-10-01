"use client";

import { useEffect } from "react";
import { captureAttribution, trackDiagnostic } from "@/lib/track";

/**
 * Captura UTMs/gclid na entrada (§18) e mede profundidade de rolagem.
 * Eventos de scroll são DIAGNÓSTICOS — não devem virar conversão no Ads.
 */
export function Analytics() {
  useEffect(() => {
    captureAttribution();

    const fired = { 50: false, 90: false };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;

      if (!fired[50] && pct >= 50) {
        fired[50] = true;
        trackDiagnostic("scroll_50");
      }
      if (!fired[90] && pct >= 90) {
        fired[90] = true;
        trackDiagnostic("scroll_90");
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
