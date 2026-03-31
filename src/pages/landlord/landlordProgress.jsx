import { useState } from "react";

const days = [
  {
    day: 1,
    status: "complete",
    participation: "Completed",
    timing: "On time",
    timingDelay: false,
    trend: null,
    note: "Initial engagement started. Applicant responded to all prompts within expected timeframe.",
    unlock: null,
  },
  {
    day: 2,
    status: "complete",
    participation: "2/2 days",
    timing: "Slight delay",
    timingDelay: true,
    trend: "Forming",
    note: "Consistency beginning to form. Minor delay in afternoon check-in but all tasks completed.",
    unlock: null,
  },
  {
    day: 3,
    status: "complete",
    participation: "3/3 days",
    timing: "On time",
    timingDelay: false,
    trend: null,
    note: "Strong early pattern. Behavioral Report Preview is now unlocked.",
    unlock: "Behavioral Report Preview",
  },
  { day: 4, status: "locked" },
  { day: 5, status: "locked" },
  { day: 6, status: "locked" },
  { day: 7, status: "locked" },
];

const currentDay = 3;
const totalDays = 7;

function CheckIcon({ size = 16, color = "#4f46e5" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="8" width="12" height="8" rx="2" fill="#c9cdd8" />
      <path
        d="M6 8V6a3 3 0 016 0v2"
        stroke="#c9cdd8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ color = "#6b7280" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.4" />
      <path d="M7 4v3.2l2 1.8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 10L5 6l3 3 5-6"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M3 2h6l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
        stroke="#7c3aed"
        strokeWidth="1.3"
        fill="none"
      />
      <path d="M9 2v3h3" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5 7h5M5 9.5h3" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DayCard({ data, index }) {
  const [hovered, setHovered] = useState(false);

  if (data.status === "locked") {
    return (
      <div
        style={{
          borderRadius: "14px",
          border: "1.5px solid #eef0f5",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#fafbfc",
          opacity: 0.7,
          animation: `fadeUp 0.4s ease both`,
          animationDelay: `${index * 80}ms`,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#eef0f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LockIcon />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "15px", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif" }}>
            Day {data.day}
          </div>
          <div style={{ fontSize: "12px", color: "#c9cdd8", fontFamily: "'DM Sans', sans-serif" }}>Locked</div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        border: `1.5px solid ${hovered ? "#c4b5fd" : "#eef0f5"}`,
        padding: "20px 22px",
        background: hovered ? "#faf9ff" : "#fff",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 4px 24px rgba(124,58,237,0.08)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        animation: `fadeUp 0.4s ease both`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckIcon size={15} color="#7c3aed" />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "16px",
              color: "#1a1d27",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Day {data.day}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#16a34a",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <CheckIcon size={13} color="#16a34a" />
          Complete
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "32px", marginBottom: "10px" }}>
        <div>
          <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
            Participation
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1d27", fontFamily: "'DM Sans', sans-serif" }}>
            {data.participation}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
            Response Timing
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "14px",
              fontWeight: 600,
              color: data.timingDelay ? "#f59e0b" : "#1a1d27",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <ClockIcon color={data.timingDelay ? "#f59e0b" : "#6b7280"} />
            {data.timing}
          </div>
        </div>
      </div>

      {/* Trend badge */}
      {data.trend && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12.5px",
            fontWeight: 600,
            color: "#10b981",
            marginBottom: "10px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <TrendIcon />
          Trend: {data.trend}
        </div>
      )}

      {/* Note */}
      <p
        style={{
          fontSize: "13.5px",
          color: "#6b7280",
          lineHeight: "1.55",
          margin: "0 0 0 0",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {data.note}
      </p>

      {/* Unlock badge */}
      {data.unlock && (
        <div
          style={{
            marginTop: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "#f5f3ff",
            border: "1px solid #ddd6fe",
            borderRadius: "8px",
            padding: "7px 12px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#7c3aed",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <FileIcon />
          Unlocked: {data.unlock}
        </div>
      )}
    </div>
  );
}

export default function PreTenancyProgress() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f2f8; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #ddd6fe; border-radius: 4px; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#fff",
          borderRadius: "22px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ padding: "26px 26px 0 26px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#1a1d27",
                letterSpacing: "-0.3px",
              }}
            >
              Pre-Tenancy Progress
            </h2>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
                fontSize: "20px",
                lineHeight: 1,
                padding: "2px 4px",
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "18px" }}>
            7-Day Behavioral Assessment Cycle
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
            {Array.from({ length: totalDays }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "5px",
                  borderRadius: "3px",
                  background: i < currentDay ? "#7c3aed" : "#eef0f5",
                  transition: "background 0.3s",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {i < currentDay && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                      animation: `barGrow 0.6s ease ${i * 0.1}s both`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: "12.5px", color: "#9ca3af", marginBottom: "20px" }}>
            Day {currentDay} of {totalDays}
          </div>
        </div>

        {/* Scrollable card list */}
        <div
          style={{
            padding: "0 16px 24px 16px",
            maxHeight: "520px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {days.map((d, i) => (
            <DayCard key={d.day} data={d} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}