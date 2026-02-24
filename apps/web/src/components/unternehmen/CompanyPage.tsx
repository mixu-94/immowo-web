// components/unternehmen/CompanyPage.tsx
import { CompanyShell } from "./CompanyShell";
import { CompanyHero } from "./CompanyHero";
import { CompanyStats } from "./CompnayStats";
import { CompanyPillars } from "./CompnayPillars";
import { CompanyProcess } from "./CompanyProcess";
import { CompanyHighlights } from "./CompanyHighlights";
import { CompanyCta } from "./CompantyCta";

export function CompanyPage() {
  return (
    <CompanyShell>
      <CompanyHero />
      <CompanyStats />
      <CompanyPillars />
      <CompanyProcess />
      <CompanyHighlights />
      <CompanyCta />
    </CompanyShell>
  );
}
