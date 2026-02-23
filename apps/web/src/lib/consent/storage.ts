// src/lib/consent/storage.ts

import {
    CONSENT_STORAGE_KEY,
    CONSENT_VERSION,
    DEFAULT_CONSENT_STATE,
    type ConsentState,
} from "./types";

/**
 * We store consent in localStorage (client-only).
 * Versioning allows you to invalidate older consents when categories change.
 */

function isConsentState(value: unknown): value is ConsentState {
    if (!value || typeof value !== "object") return false;

    const v = value as Record<string, unknown>;

    return (
        v.version === CONSENT_VERSION &&
        v.necessary === true &&
        typeof v.analytics === "boolean" &&
        typeof v.externalMedia === "boolean" &&
        typeof v.updatedAt === "string"
    );
}

export function loadConsent(): ConsentState | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as unknown;

        // If version mismatch (or shape wrong) => treat as "no consent yet"
        if (!isConsentState(parsed)) return null;

        return parsed;
    } catch {
        return null;
    }
}

export function saveConsent(next: Omit<ConsentState, "updatedAt"> & { updatedAt?: string }): ConsentState {
    if (typeof window === "undefined") return { ...DEFAULT_CONSENT_STATE };

    const normalized: ConsentState = {
        version: CONSENT_VERSION,
        necessary: true,
        analytics: Boolean(next.analytics),
        externalMedia: Boolean(next.externalMedia),
        updatedAt: next.updatedAt ?? new Date().toISOString(),
    };

    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
        // ignore write errors (e.g. private mode)
    }

    return normalized;
}

export function clearConsent() {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
        // ignore
    }
}

/**
 * Returns a consent state if present; otherwise returns a default state
 * (still "no decision made" logically — your UI can track that separately).
 *
 * In our app we will treat "null" (from loadConsent) as "no decision yet"
 * and show banner. This helper is useful if you want to always have a value.
 */
export function getConsentOrDefault(): ConsentState {
    return loadConsent() ?? DEFAULT_CONSENT_STATE;
}