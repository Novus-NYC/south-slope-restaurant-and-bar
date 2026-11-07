import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B5D3B",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <g fill="none" stroke="#F6F1E6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="50" cy="50" r="42" strokeWidth="4" />
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
      </div>
    ),
    size,
  );
}
