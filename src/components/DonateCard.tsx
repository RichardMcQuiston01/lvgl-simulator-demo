import { useCallback, useState } from 'react';

import { readFlag, writeFlag } from '../lib/persistentFlag';
import type { Theme } from '../lib/theme';
import './donate-widget.css';

const DISMISSED_KEY = 'donate-card-dismissed';
const MINIMIZED_KEY = 'donate-card-minimized';

export interface DonateCardProps {
  /** Stripe payment link the card sends people to. */
  readonly donateUrl?: string;
  /** Path to the generated QR SVG, relative to the served root. */
  readonly qrSrc?: string;
  /**
   * The app's current theme. The card's own light variant is opt-in by
   * design (see donate-widget.css) — this isn't tying it to the visitor's
   * OS preference, it's following the same explicit, project-controlled
   * choice the app shell itself just made via its own toggle.
   */
  readonly theme?: Theme;
}

/**
 * Floating bottom-right "Support this project" card. `close` dismisses it
 * entirely; `minimize` collapses it to a small pill without dismissing it.
 * Both choices persist across reloads via `localStorage`, independently of
 * each other.
 */
export function DonateCard({
  donateUrl = 'https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800',
  qrSrc = '/donate.svg',
  theme = 'dark',
}: DonateCardProps) {
  // This is a client-only SPA (no SSR), so reading localStorage during the
  // lazy initializer is safe and avoids a render with a stale default.
  const [isDismissed, setIsDismissed] = useState<boolean>(() => readFlag(DISMISSED_KEY));
  const [isMinimized, setIsMinimized] = useState<boolean>(() => readFlag(MINIMIZED_KEY));

  const handleDismiss = useCallback((): void => {
    setIsDismissed(true);
    writeFlag(DISMISSED_KEY, true);
  }, []);

  const handleMinimize = useCallback((): void => {
    setIsMinimized(true);
    writeFlag(MINIMIZED_KEY, true);
  }, []);

  const handleExpand = useCallback((): void => {
    setIsMinimized(false);
    writeFlag(MINIMIZED_KEY, false);
  }, []);

  if (isDismissed) {
    return null;
  }

  if (isMinimized) {
    return (
      <button
        type="button"
        className="donate-pill"
        data-donate-theme={theme === 'light' ? 'light' : undefined}
        onClick={handleExpand}
        aria-label="Expand support message"
      >
        <span className="donate-pill__heart" aria-hidden="true">
          &#9829;
        </span>
        Support this project
      </button>
    );
  }

  return (
    <aside
      className="donate-card"
      data-donate-theme={theme === 'light' ? 'light' : undefined}
      aria-labelledby="donateCardTitle"
    >
      <div className="donate-card__actions">
        <button
          type="button"
          className="donate-card__minimize"
          aria-label="Minimize support message"
          onClick={handleMinimize}
        >
          &#8211;
        </button>
        <button
          type="button"
          className="donate-card__dismiss"
          aria-label="Dismiss support message"
          onClick={handleDismiss}
        >
          &times;
        </button>
      </div>

      <h2 className="donate-card__title" id="donateCardTitle">
        <span className="donate-card__heart" aria-hidden="true">
          &#9829;
        </span>
        Support this project
      </h2>

      <p className="donate-card__body">
        If this app, code, or repository has helped you or someone you know, please consider
        donating. I appreciate any help to offset the costs of development and/or AI Credits.
      </p>

      <div className="donate-card__qr">
        <img
          src={qrSrc}
          alt="QR code linking to the Stripe donation page"
          width={180}
          height={180}
        />
      </div>

      <a
        className="donate-card__link"
        href={donateUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate via Stripe, opens in a new tab"
      >
        Donate via Stripe <span aria-hidden="true">&rarr;</span>
      </a>
    </aside>
  );
}
