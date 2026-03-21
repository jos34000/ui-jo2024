"use client"

import { cn } from "@/lib/utils"

interface OlympicLoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "flame" | "rings" | "torch" | "paris"
  text?: string
  subtext?: string
  className?: string
}

const sizeConfig = {
  sm: { container: "w-24", text: "text-xs", subtext: "text-[10px]" },
  md: { container: "w-40", text: "text-sm", subtext: "text-xs" },
  lg: { container: "w-56", text: "text-base", subtext: "text-sm" },
  xl: { container: "w-72", text: "text-lg", subtext: "text-base" },
}

const FlameLoader = ({ size = "md" }: { size: "sm" | "md" | "lg" | "xl" }) => {
  const containerSize =
    size === "sm"
      ? "w-12 h-16"
      : size === "md"
        ? "w-16 h-24"
        : size === "lg"
          ? "w-24 h-32"
          : "w-32 h-40"

  return (
    <div className={cn("relative", containerSize)}>
      <div className="absolute inset-0 blur-2xl opacity-60">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 bg-gradient-to-t from-[#FCB131] via-[#EE334E] to-transparent rounded-full" />
      </div>

      <svg viewBox="0 0 100 140" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FCB131" />
            <stop offset="40%" stopColor="#EE334E" />
            <stop offset="70%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="flameGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M50 10 C30 40 20 70 25 95 C30 115 40 125 50 130 C60 125 70 115 75 95 C80 70 70 40 50 10"
          fill="url(#flameGradient)"
          filter="url(#flameGlow)"
          className="animate-[flicker_0.8s_ease-in-out_infinite]"
          style={{ transformOrigin: "50% 100%" }}
        />

        <path
          d="M50 35 C40 55 35 75 38 90 C40 100 45 107 50 110 C55 107 60 100 62 90 C65 75 60 55 50 35"
          fill="url(#flameInner)"
          className="animate-[flicker_0.6s_ease-in-out_infinite]"
          style={{ transformOrigin: "50% 100%", animationDelay: "0.1s" }}
        />
      </svg>
    </div>
  )
}

const Rings3DLoader = ({
  size = "md",
}: {
  size: "sm" | "md" | "lg" | "xl"
}) => {
  const containerSize =
    size === "sm"
      ? "w-20 h-12"
      : size === "md"
        ? "w-32 h-20"
        : size === "lg"
          ? "w-48 h-28"
          : "w-64 h-36"

  return (
    <div className={cn("relative perspective-1000", containerSize)}>
      <div
        className="absolute inset-0 animate-[tilt3d_4s_ease-in-out_infinite]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 280 150" className="w-full h-full">
          <defs>
            <linearGradient id="ring3dBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0081C8" />
              <stop offset="50%" stopColor="#00B4E6" />
              <stop offset="100%" stopColor="#0081C8" />
            </linearGradient>
            <linearGradient
              id="ring3dBlack"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#4a4a4a" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            <linearGradient id="ring3dRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EE334E" />
              <stop offset="50%" stopColor="#FF6B7A" />
              <stop offset="100%" stopColor="#EE334E" />
            </linearGradient>
            <linearGradient
              id="ring3dYellow"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FCB131" />
              <stop offset="50%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#FCB131" />
            </linearGradient>
            <linearGradient
              id="ring3dGreen"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00A651" />
              <stop offset="50%" stopColor="#00D96E" />
              <stop offset="100%" stopColor="#00A651" />
            </linearGradient>
            <filter id="ring3dShadow">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          <g filter="url(#ring3dShadow)">
            <ellipse
              cx="90"
              cy="95"
              rx="35"
              ry="28"
              fill="none"
              stroke="url(#ring3dYellow)"
              strokeWidth="7"
              className="animate-[ringPulse_2s_ease-in-out_infinite]"
              style={{ animationDelay: "0.4s" }}
            />
            <ellipse
              cx="150"
              cy="95"
              rx="35"
              ry="28"
              fill="none"
              stroke="url(#ring3dGreen)"
              strokeWidth="7"
              className="animate-[ringPulse_2s_ease-in-out_infinite]"
              style={{ animationDelay: "0.5s" }}
            />
          </g>

          <g filter="url(#ring3dShadow)">
            <ellipse
              cx="60"
              cy="55"
              rx="35"
              ry="28"
              fill="none"
              stroke="url(#ring3dBlue)"
              strokeWidth="7"
              className="animate-[ringPulse_2s_ease-in-out_infinite]"
              style={{ animationDelay: "0.1s" }}
            />
            <ellipse
              cx="120"
              cy="55"
              rx="35"
              ry="28"
              fill="none"
              stroke="url(#ring3dBlack)"
              strokeWidth="7"
              className="animate-[ringPulse_2s_ease-in-out_infinite]"
              style={{ animationDelay: "0.2s" }}
            />
            <ellipse
              cx="180"
              cy="55"
              rx="35"
              ry="28"
              fill="none"
              stroke="url(#ring3dRed)"
              strokeWidth="7"
              className="animate-[ringPulse_2s_ease-in-out_infinite]"
              style={{ animationDelay: "0.3s" }}
            />
          </g>
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent blur-sm opacity-50" />
    </div>
  )
}

const TorchLoader = ({ size = "md" }: { size: "sm" | "md" | "lg" | "xl" }) => {
  const containerSize =
    size === "sm"
      ? "w-16 h-32"
      : size === "md"
        ? "w-24 h-48"
        : size === "lg"
          ? "w-32 h-64"
          : "w-40 h-80"

  return (
    <div className={cn("relative", containerSize)}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-1/3 blur-3xl opacity-40">
        <div className="w-full h-full bg-gradient-to-t from-[#FCB131] via-[#EE334E]/60 to-transparent rounded-full animate-pulse" />
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full h-1/4 blur-2xl opacity-70">
        <div className="w-full h-full bg-gradient-to-t from-[#FF6B35] via-[#FFD93D]/80 to-transparent rounded-full animate-[flicker_1.2s_ease-in-out_infinite]" />
      </div>

      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-2 h-2">
        <div className="absolute w-1 h-1 rounded-full bg-[#FFD93D] animate-[sparkFloat1_1.5s_ease-out_infinite]" />
        <div
          className="absolute w-0.5 h-0.5 rounded-full bg-[#FF6B35] animate-[sparkFloat2_1.8s_ease-out_infinite]"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-[#FCB131] animate-[sparkFloat3_1.3s_ease-out_infinite]"
          style={{ animationDelay: "0.6s" }}
        />
      </div>

      <svg
        viewBox="0 0 100 200"
        className="w-full h-full relative z-10"
        style={{ filter: "drop-shadow(0 10px 30px rgba(252, 177, 49, 0.3))" }}
      >
        <defs>
          <linearGradient
            id="torchGoldPremium"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="15%" stopColor="#C5A028" />
            <stop offset="35%" stopColor="#F5D547" />
            <stop offset="50%" stopColor="#FFF8DC" />
            <stop offset="65%" stopColor="#F5D547" />
            <stop offset="85%" stopColor="#C5A028" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>

          <linearGradient id="torchSilver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#71706E" />
            <stop offset="30%" stopColor="#C0C0C0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#C0C0C0" />
            <stop offset="100%" stopColor="#71706E" />
          </linearGradient>

          <linearGradient
            id="torchFlamePremium"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FCB131" />
            <stop offset="25%" stopColor="#FF8C00" />
            <stop offset="50%" stopColor="#EE334E" />
            <stop offset="75%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>

          <linearGradient id="torchFlameCore" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD93D" />
            <stop offset="40%" stopColor="#FFFACD" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <linearGradient id="torchFlameBlue" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0081C8" />
            <stop offset="100%" stopColor="#00B4E6" />
          </linearGradient>

          <pattern
            id="olympicPattern"
            x="0"
            y="0"
            width="20"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="5"
              cy="5"
              r="3"
              fill="none"
              stroke="#0081C8"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <circle
              cx="10"
              cy="5"
              r="3"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <circle
              cx="15"
              cy="5"
              r="3"
              fill="none"
              stroke="#EE334E"
              strokeWidth="0.8"
              opacity="0.4"
            />
          </pattern>

          <filter
            id="flameGlowPremium"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="metalShine">
            <feSpecularLighting
              result="specOut"
              specularExponent="20"
              lightingColor="white"
            >
              <fePointLight x="50" y="20" z="100" />
            </feSpecularLighting>
            <feComposite
              in="SourceGraphic"
              in2="specOut"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
            />
          </filter>
        </defs>

        <g filter="url(#flameGlowPremium)">
          <path
            d="M50 8
               C35 25 25 45 28 65
               C30 78 38 88 50 95
               C62 88 70 78 72 65
               C75 45 65 25 50 8"
            fill="url(#torchFlamePremium)"
            opacity="0.9"
            className="animate-[flicker_0.9s_ease-in-out_infinite]"
            style={{ transformOrigin: "50px 95px" }}
          />

          <path
            d="M50 18
               C40 32 33 48 35 62
               C37 72 43 80 50 85
               C57 80 63 72 65 62
               C67 48 60 32 50 18"
            fill="url(#torchFlamePremium)"
            className="animate-[flicker_0.7s_ease-in-out_infinite]"
            style={{ transformOrigin: "50px 85px", animationDelay: "0.15s" }}
          />

          <path
            d="M50 35
               C44 45 40 55 42 65
               C43 72 46 76 50 78
               C54 76 57 72 58 65
               C60 55 56 45 50 35"
            fill="url(#torchFlameCore)"
            className="animate-[flicker_0.5s_ease-in-out_infinite]"
            style={{ transformOrigin: "50px 78px", animationDelay: "0.1s" }}
          />

          <path
            d="M45 70 C43 60 48 50 50 45 C52 50 47 60 45 70"
            fill="url(#torchFlameBlue)"
            opacity="0.5"
            className="animate-[flicker_1.1s_ease-in-out_infinite]"
            style={{ transformOrigin: "47px 70px", animationDelay: "0.2s" }}
          />
        </g>

        <g>
          <ellipse cx="50" cy="100" rx="22" ry="4" fill="rgba(0,0,0,0.2)" />

          <path
            d="M28 92 L72 92 L68 100 L32 100 Z"
            fill="url(#torchGoldPremium)"
          />

          <path d="M30 92 L70 92 L70 94 L30 94 Z" fill="url(#torchSilver)" />

          <line
            x1="35"
            y1="94"
            x2="37"
            y2="100"
            stroke="#8B6914"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="94"
            x2="50"
            y2="100"
            stroke="#8B6914"
            strokeWidth="0.5"
          />
          <line
            x1="65"
            y1="94"
            x2="63"
            y2="100"
            stroke="#8B6914"
            strokeWidth="0.5"
          />
        </g>

        <g>
          <path
            d="M35 100
               L35 165
               C35 168 37 170 40 170
               L60 170
               C63 170 65 168 65 165
               L65 100 Z"
            fill="url(#torchGoldPremium)"
          />

          <rect
            x="37"
            y="110"
            width="26"
            height="50"
            fill="url(#olympicPattern)"
            opacity="0.4"
          />

          <rect x="35" y="125" width="30" height="8" fill="url(#torchSilver)" />
          <rect
            x="36"
            y="126"
            width="28"
            height="6"
            fill="url(#torchGoldPremium)"
          />

          <g>
            <rect
              x="38"
              y="140"
              width="24"
              height="25"
              rx="2"
              fill="url(#torchGoldPremium)"
            />

            <rect
              x="39"
              y="143"
              width="22"
              height="3"
              rx="1"
              fill="rgba(139,105,20,0.5)"
            />
            <rect
              x="39"
              y="149"
              width="22"
              height="3"
              rx="1"
              fill="rgba(139,105,20,0.5)"
            />
            <rect
              x="39"
              y="155"
              width="22"
              height="3"
              rx="1"
              fill="rgba(139,105,20,0.5)"
            />
            <rect
              x="39"
              y="161"
              width="22"
              height="3"
              rx="1"
              fill="rgba(139,105,20,0.5)"
            />
          </g>

          <rect
            x="40"
            y="170"
            width="20"
            height="6"
            rx="3"
            fill="url(#torchSilver)"
          />
        </g>

        <g opacity="0.6" transform="translate(35, 105)">
          <circle
            cx="8"
            cy="5"
            r="4"
            fill="none"
            stroke="#0081C8"
            strokeWidth="1.2"
          />
          <circle
            cx="15"
            cy="5"
            r="4"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.2"
          />
          <circle
            cx="22"
            cy="5"
            r="4"
            fill="none"
            stroke="#EE334E"
            strokeWidth="1.2"
          />
          <circle
            cx="11"
            cy="10"
            r="4"
            fill="none"
            stroke="#FCB131"
            strokeWidth="1.2"
          />
          <circle
            cx="18"
            cy="10"
            r="4"
            fill="none"
            stroke="#00A651"
            strokeWidth="1.2"
          />
        </g>

        <path
          d="M40 100 L42 170 L44 170 L42 100 Z"
          fill="rgba(255,255,255,0.4)"
        />
      </svg>
    </div>
  )
}

const ParisLoader = ({ size = "md" }: { size: "sm" | "md" | "lg" | "xl" }) => {
  const containerSize =
    size === "sm"
      ? "w-24 h-16"
      : size === "md"
        ? "w-40 h-24"
        : size === "lg"
          ? "w-56 h-32"
          : "w-72 h-40"

  return (
    <div
      className={cn("relative flex flex-col items-center gap-2", containerSize)}
    >
      <div className="text-center">
        <div className="font-mono font-bold tracking-tight flex justify-center">
          <span
            className="text-[#0081C8] animate-[letterPop_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0s" }}
          >
            P
          </span>
          <span
            className="text-foreground animate-[letterPop_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.1s" }}
          >
            A
          </span>
          <span
            className="text-[#EE334E] animate-[letterPop_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.2s" }}
          >
            R
          </span>
          <span
            className="text-[#FCB131] animate-[letterPop_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.3s" }}
          >
            I
          </span>
          <span
            className="text-[#00A651] animate-[letterPop_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: "0.4s" }}
          >
            S
          </span>
        </div>
        <div className="font-mono font-bold text-foreground tracking-tighter animate-pulse">
          2024
        </div>
      </div>

      <div className="flex gap-1.5">
        <div
          className="w-2 h-2 rounded-full bg-[#0081C8] animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "0.8s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-foreground animate-bounce"
          style={{ animationDelay: "0.1s", animationDuration: "0.8s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-[#EE334E] animate-bounce"
          style={{ animationDelay: "0.2s", animationDuration: "0.8s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-[#FCB131] animate-bounce"
          style={{ animationDelay: "0.3s", animationDuration: "0.8s" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-[#00A651] animate-bounce"
          style={{ animationDelay: "0.4s", animationDuration: "0.8s" }}
        />
      </div>
    </div>
  )
}

export const OlympicLoader = ({
  size = "md",
  variant = "flame",
  text,
  subtext,
  className,
}: OlympicLoaderProps) => {
  const config = sizeConfig[size]

  const renderLoader = () => {
    switch (variant) {
      case "flame":
        return <FlameLoader size={size} />
      case "rings":
        return <Rings3DLoader size={size} />
      case "torch":
        return <TorchLoader size={size} />
      case "paris":
        return <ParisLoader size={size} />
      default:
        return <FlameLoader size={size} />
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      {renderLoader()}

      {(text || subtext) && (
        <div className="text-center space-y-1">
          {text && (
            <p className={cn("font-medium text-foreground", config.text)}>
              {text}
            </p>
          )}
          {subtext && (
            <p className={cn("text-muted-foreground", config.subtext)}>
              {subtext}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// Full page loader component
interface PageLoaderProps {
  variant?: "flame" | "rings" | "torch" | "paris"
  text?: string
  subtext?: string
}

export const PageLoader = ({
  variant = "flame",
  text = "Chargement...",
  subtext = "Veuillez patienter",
}: PageLoaderProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-[#0081C8]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div
          className="absolute top-1/2 right-1/5 w-80 h-80 rounded-full bg-[#EE334E]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#FCB131]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-[#00A651]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-6s" }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative">
        <div className="absolute -inset-8 bg-gradient-to-r from-[#0081C8]/20 via-[#FCB131]/20 to-[#EE334E]/20 rounded-[40px] blur-3xl opacity-60 animate-pulse" />

        <div className="relative backdrop-blur-2xl bg-card/70 dark:bg-card/50 border border-white/30 dark:border-white/10 rounded-3xl p-12 sm:p-16 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/10 pointer-events-none" />

          <div className="relative z-10">
            <OlympicLoader
              variant={variant}
              size="lg"
              text={text}
              subtext={subtext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
