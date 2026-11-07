import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { fullAddress, hoursSummary, site } from "@/lib/site";

export const alt = `${site.name}, ${fullAddress()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Static Fraunces (woff) for the image renderer; the site itself uses the
  // variable font. Resolved from node_modules at build time.
  const fraunces = await readFile(
    path.join(process.cwd(), "node_modules/@fontsource/fraunces/files/fraunces-latin-700-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#1B1B19",
          color: "#F6F1E6",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="84" height="84" viewBox="0 0 100 100">
            <g fill="none" stroke="#4CC96A" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="50" r="44" strokeWidth="4" />
              <line x1="50" y1="30" x2="50" y2="76" strokeWidth="3.5" />
              <line x1="28" y1="41" x2="68" y2="41" strokeWidth="3.5" />
              <line x1="68" y1="41" x2="80" y2="41" strokeWidth="3" />
              <line x1="70" y1="35.5" x2="80" y2="35.5" strokeWidth="3" />
              <line x1="70" y1="46.5" x2="80" y2="46.5" strokeWidth="3" />
              <line x1="70" y1="35.5" x2="70" y2="46.5" strokeWidth="3" />
              <line x1="36" y1="55" x2="64" y2="69" strokeWidth="2.5" />
              <line x1="36" y1="69" x2="64" y2="55" strokeWidth="2.5" />
            </g>
            <g fill="#4CC96A">
              <polygon points="17,41 30,34 30,48" />
              <circle cx="50" cy="79" r="3.5" />
              <rect x="43" y="27.5" width="14" height="3.5" rx="1" />
            </g>
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#4CC96A",
            }}
          >
            Park Slope, Brooklyn
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, lineHeight: 0.95, letterSpacing: -3 }}>South Slope</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 64, lineHeight: 1, color: "#4CC96A" }}>
            Restaurant &amp; Bar
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 28,
            color: "rgba(246,241,230,0.85)",
          }}
        >
          <div style={{ display: "flex" }}>{fullAddress()}</div>
          <div style={{ display: "flex" }}>{hoursSummary()}. Breakfast all day.</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 700, style: "normal" }],
    },
  );
}
