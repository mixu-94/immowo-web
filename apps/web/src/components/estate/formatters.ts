export function formatEUR(value: number | null | undefined): string {
    if (typeof value !== "number") return "-";
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);
}
