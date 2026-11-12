"use client";

import { Wheat } from "lucide-react";

interface ProductImageProps {
  weight: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const gradients: Record<string, string> = {
  "1KG": "from-fuchsia-500 via-purple-500 to-indigo-600",
  "5KG": "from-amber-400 via-orange-500 to-rose-500",
  "10KG": "from-cyan-400 via-sky-500 to-blue-600",
};

const accentColors: Record<string, string> = {
  "1KG": "from-fuchsia-500 to-indigo-600",
  "5KG": "from-orange-500 to-rose-500",
  "10KG": "from-sky-500 to-blue-600",
};

const bagColors: Record<string, { top: string; bottom: string; accent: string }> = {
  "1KG": { top: "#FFF8F0", bottom: "#C41E3A", accent: "#D4A017" },
  "5KG": { top: "#FFF8F0", bottom: "#C41E3A", accent: "#D4A017" },
  "10KG": { top: "#FFF8F0", bottom: "#C41E3A", accent: "#D4A017" },
};

export default function ProductImage({
  weight,
  className = "",
  size = "md",
}: ProductImageProps) {
  const gradient = gradients[weight] || gradients["5KG"];
  const accent = accentColors[weight] || accentColors["5KG"];
  const colors = bagColors[weight] || bagColors["5KG"];

  const sizeClasses = {
    sm: "p-4",
    md: "p-8",
    lg: "p-12",
  };

  const bagSizes = {
    sm: { width: 60, height: 75 },
    md: { width: 120, height: 150 },
    lg: { width: 180, height: 225 },
  };

  const { width: bw, height: bh } = bagSizes[size];

  return (
    <div
      className={`bg-gradient-to-br ${gradient} ${sizeClasses[size]} flex items-center justify-center relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-20 h-20 border-2 border-current rounded-full" />
        <div className="absolute bottom-8 right-6 w-16 h-16 border-2 border-current rounded-full" />
        <div className="absolute top-1/2 right-4 w-12 h-12 border border-current rounded-full" />
      </div>

      <div className="relative animate-float">
        <svg
          width={bw}
          height={bh}
          viewBox="0 0 120 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <path
            d="M15 20 C15 12, 25 5, 60 5 C95 5, 105 12, 105 20 L105 130 C105 140, 95 145, 60 145 C25 145, 15 140, 15 130 Z"
            fill={colors.top}
            stroke="#E8D5C0"
            strokeWidth="1"
          />
          <path
            d="M15 80 L105 80 L105 130 C105 140, 95 145, 60 145 C25 145, 15 140, 15 130 Z"
            fill={colors.bottom}
            opacity="0.9"
          />
          <path
            d="M15 75 L105 75 L105 85 L15 85 Z"
            fill={colors.accent}
            opacity="0.8"
          />

          <ellipse cx="60" cy="14" rx="35" ry="6" fill="#E8D5C0" opacity="0.3" />
          <rect x="45" y="2" width="30" height="10" rx="2" fill="#E8D5C0" opacity="0.5" />

          <text
            x="60"
            y="38"
            textAnchor="middle"
            fill="#4A4A4A"
            fontSize="10"
            fontWeight="600"
            fontFamily="Arial, sans-serif"
          >
            BINTA
          </text>

          <text
            x="60"
            y="56"
            textAnchor="middle"
            fill={colors.bottom}
            fontSize="16"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            RICE
          </text>
          <text
            x="60"
            y="72"
            textAnchor="middle"
            fill={colors.bottom}
            fontSize="14"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            FLOUR
          </text>

          <circle cx="85" cy="100" r="12" fill="#2D6A4F" opacity="0.9" />
          <text
            x="85"
            y="98"
            textAnchor="middle"
            fill="white"
            fontSize="5"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
          >
            100%
          </text>
          <text
            x="85"
            y="105"
            textAnchor="middle"
            fill="white"
            fontSize="4.5"
            fontWeight="600"
            fontFamily="Arial, sans-serif"
          >
            NATURAL
          </text>

          <circle cx="40" cy="120" r="14" fill={colors.accent} opacity="0.9" />
          <text
            x="40"
            y="119"
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            {weight.replace("KG", "")}
          </text>
          <text
            x="40"
            y="128"
            textAnchor="middle"
            fill="white"
            fontSize="5"
            fontWeight="600"
            fontFamily="Arial, sans-serif"
          >
            KG
          </text>
        </svg>

        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r ${accent} rounded-full blur-xl opacity-30`}
        />
      </div>

      <div className="absolute top-3 right-3">
        <Wheat className="w-6 h-6 text-secondary/20" />
      </div>
    </div>
  );
}
