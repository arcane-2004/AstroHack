import {
  BriefcaseBusiness,
  Heart,
  Wallet,
  Activity,
  Sparkles,
  ArrowUpRight,
  Stars,
  Zap,
} from "lucide-react";

const predictions = [
  {
    key: "career",
    label: "Career",
    icon: BriefcaseBusiness,
  },
  {
    key: "love",
    label: "Love",
    icon: Heart,
  },
  {
    key: "money",
    label: "Money",
    icon: Wallet,
  },
  {
    key: "health",
    label: "Health",
    icon: Activity,
  },
];

function getScoreColor(score) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 65) return "text-amber-400";
  return "text-rose-400";
}

function getBarColor(score) {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 65) return "bg-amber-400";
  return "bg-rose-400";
}

function getStrongestArea(prediction) {
  const areas = ["career", "love", "money", "health"];

  return areas.reduce((best, current) =>
    prediction[current].score > prediction[best].score
      ? current
      : best
  );
}

function formatArea(area) {
  return area.charAt(0).toUpperCase() + area.slice(1);
}

export default function DailyPredictionCard({ prediction }) {
  if (!prediction) return null;

  const strongestArea = getStrongestArea(prediction);
  const strongestData = prediction[strongestArea];

  return (
    <div className="relative w-full  max-w-3xl overflow-hidden rounded-[32px] m-20 border border-white/[0.08] bg-[#0b0a12] text-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]">

      {/* =====================================================
          COSMIC BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden p-20">

        {/* Main purple glow */}
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-purple-600/[0.14] blur-[120px]" />

        {/* Bottom indigo glow */}
        <div className="absolute -bottom-48 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-600/[0.12] blur-[120px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-[45%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/[0.025] blur-[100px]" />

        {/* Stars */}
        <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[30%] top-[10%] h-[3px] w-[3px] rounded-full bg-purple-300/50" />
        <div className="absolute left-[64%] top-[15%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[83%] top-[30%] h-[3px] w-[3px] rounded-full bg-purple-300/60" />
        <div className="absolute left-[18%] top-[63%] h-[3px] w-[3px] rounded-full bg-indigo-300/40" />
        <div className="absolute left-[76%] top-[70%] h-1 w-1 rounded-full bg-white/30" />

        {/* Subtle radial texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.08),transparent_45%)]" />
      </div>

      <div className="relative">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="border-b border-white/[0.06] px-6 pb-6 pt-6 sm:px-8 sm:pt-7">

          <div className="flex items-start justify-between">

            <div>

              {/* Label */}
              <div className="mb-4 flex items-center gap-2.5">

                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/[0.10] shadow-[0_0_25px_rgba(168,85,247,0.12)]">
                  <Sparkles className="h-4 w-4 text-purple-300" />

                  <span className="absolute inset-0 rounded-xl border border-purple-300/10" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                    Daily Cosmic Reading
                  </p>

                  <p className="mt-1 text-[11px] text-gray-600">
                    Your energy for today
                  </p>
                </div>

              </div>

              {/* Heading */}
              <h2 className="text-[25px] font-semibold tracking-[-0.025em] text-white sm:text-[27px]">
                How's your day looking?
              </h2>

              <p className="mt-1.5 text-sm text-gray-500">
                The stars have a message for you.
              </p>

            </div>

            {/* Top-right icon */}
            <div className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] sm:flex">
              <Stars className="h-5 w-5 text-purple-300/70" />
            </div>

          </div>

        </div>


        {/* =====================================================
            OVERALL SCORE
        ====================================================== */}

        <div className="px-6 pt-6 sm:px-8">

          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-5 sm:p-6">

            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-purple-500/[0.10] blur-[70px]" />

            <div className="relative flex items-center gap-5">

              {/* Score circle */}

              <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center">

                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-purple-500/[0.04] blur-xl" />

                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-white/[0.07]" />

                {/* Progress */}
                <div
                  className="absolute inset-[4px] rounded-full"
                  style={{
                    background: `conic-gradient(
                      rgb(168 85 247) ${
                        prediction.overall.score * 3.6
                      }deg,
                      rgba(255,255,255,0.045) ${
                        prediction.overall.score * 3.6
                      }deg
                    )`,
                  }}
                />

                {/* Inner ring */}
                <div className="absolute inset-[7px] rounded-full bg-[#11101a] shadow-inner" />

                {/* Score */}
                <div className="relative text-center">

                  <div
                    className={`text-[27px] font-bold leading-none ${getScoreColor(
                      prediction.overall.score
                    )}`}
                  >
                    {prediction.overall.score}
                  </div>

                  <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.2em] text-gray-600">
                    Energy
                  </div>

                </div>

              </div>


              {/* Overall info */}

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="text-sm font-medium text-gray-300">
                    Overall energy
                  </span>

                  <span
                    className={`rounded-full border border-white/[0.05] bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] ${getScoreColor(
                      prediction.overall.score
                    )}`}
                  >
                    {prediction.overall.rating}
                  </span>

                </div>

                <p className="mt-2 text-[13px] leading-6 text-gray-400 sm:text-sm">
                  {prediction.summary}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            LIFE AREAS
        ====================================================== */}

        <div className="px-6 pt-7 sm:px-8">

          {/* Section heading */}

          <div className="mb-3.5 flex items-end justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                Areas of your life
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Today's cosmic influence
              </p>
            </div>

            <span className="rounded-full border border-white/[0.05] bg-white/[0.025] px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest text-gray-600">
              TODAY
            </span>

          </div>


          {/* Cards */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {predictions.map(({ key, label, icon: Icon }) => {

              const data = prediction[key];

              return (

                <div
                  key={key}
                  className="group relative overflow-hidden rounded-[20px] border border-white/[0.065] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/[0.18] hover:bg-white/[0.04] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                >

                  {/* Card glow */}

                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/0 blur-2xl transition-all duration-500 group-hover:bg-purple-500/[0.10]" />

                  <div className="relative">

                    {/* Top */}

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2.5">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.04] transition-colors group-hover:border-purple-400/[0.12] group-hover:bg-purple-500/[0.08]">

                          <Icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-purple-300" />

                        </div>

                        <div>

                          <span className="block text-xs font-medium text-gray-300">
                            {label}
                          </span>

                          <span className="mt-0.5 block text-[9px] text-gray-600">
                            Today's energy
                          </span>

                        </div>

                      </div>

                      <ArrowUpRight
                        className={`h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 ${getScoreColor(
                          data.score
                        )}`}
                      />

                    </div>


                    {/* Score */}

                    <div className="mt-5 flex items-end justify-between">

                      <div className="flex items-baseline gap-2">

                        <span
                          className={`text-[27px] font-semibold tracking-tight ${getScoreColor(
                            data.score
                          )}`}
                        >
                          {data.score}
                        </span>

                        <span className="text-[10px] text-gray-600">
                          / 100
                        </span>

                      </div>

                      <span
                        className={`mb-1 text-[9px] font-medium uppercase tracking-wider ${getScoreColor(
                          data.score
                        )}`}
                      >
                        {data.rating}
                      </span>

                    </div>


                    {/* Progress */}

                    <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-white/[0.055]">

                      <div
                        className={`h-full rounded-full ${getBarColor(
                          data.score
                        )} shadow-[0_0_10px_rgba(244,63,94,0.25)] transition-all duration-700`}
                        style={{
                          width: `${data.score}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        </div>


        {/* =====================================================
            STRONGEST ENERGY
        ====================================================== */}

        <div className="px-6 pb-6 pt-5 sm:px-8 sm:pb-7">

          <div className="relative overflow-hidden rounded-[22px] border border-purple-400/[0.12] bg-gradient-to-br from-purple-500/[0.10] via-purple-500/[0.045] to-indigo-500/[0.025] p-4 sm:p-5">

            {/* Background glow */}

            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-500/[0.12] blur-[50px]" />

            <div className="relative flex items-center gap-3.5">

              {/* Icon */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/[0.12] bg-purple-500/[0.10]">

                <Zap className="h-4 w-4 text-purple-300" />

              </div>


              {/* Text */}

              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
                    Your strongest energy
                  </p>

                  <span className="h-1 w-1 rounded-full bg-purple-300/40" />

                  <span className="text-[9px] text-gray-600">
                    {strongestData.score}/100
                  </span>

                </div>

                <p className="mt-1 text-[13px] leading-5 text-gray-400">

                  <span className="font-semibold text-gray-200">
                    {formatArea(strongestArea)}
                  </span>{" "}
                  is your strongest area today. Put this energy to work.

                </p>

              </div>

              <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-purple-300/50 sm:block" />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}