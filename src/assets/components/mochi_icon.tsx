export default function ShihTzuIcon({
  className = "",
  size = 64,
  color = "white",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {/* Left Ear */}
      <path
        d="M75 70
           C45 75 30 110 40 145
           C45 160 55 175 65 185
           C55 165 70 160 60 145
           C78 152 78 130 70 118
           C92 125 88 100 75 70Z"
        fill="currentColor"
      />

      {/* Right Ear */}
      <path
        d="M181 70
           C211 75 226 110 216 145
           C211 160 201 175 191 185
           C201 165 186 160 196 145
           C178 152 178 130 186 118
           C164 125 168 100 181 70Z"
        fill="currentColor"
      />

      {/* Head */}
      <path
        d="
        M128 35
        C108 30 95 42 88 55
        C70 45 50 70 55 90
        C38 100 40 128 52 140
        C42 160 60 188 82 188
        C95 205 115 210 128 205
        C141 210 161 205 174 188
        C196 188 214 160 204 140
        C216 128 218 100 201 90
        C206 70 186 45 168 55
        C161 42 148 30 128 35Z"
        fill="currentColor"
      />

      {/* Forehead Fur */}
      <path
        d="
        M92 72
        C100 40 156 40 164 72
        C150 62 144 74 128 54
        C112 74 106 62 92 72Z"
        fill="white"
        opacity="0.7"
      />

      {/* Face Fur */}
      <path
        d="
        M84 115
        C72 135 75 165 96 182
        C92 164 98 150 106 142
        C96 138 90 128 84 115Z"
        fill="white"
        opacity="0.8"
      />

      <path
        d="
        M172 115
        C184 135 181 165 160 182
        C164 164 158 150 150 142
        C160 138 166 128 172 115Z"
        fill="white"
        opacity="0.8"
      />

      {/* Muzzle */}
      <ellipse cx="128" cy="145" rx="34" ry="26" fill="white" />

      {/* Eyes */}
      <circle cx="108" cy="115" r="5" fill="#111827" />
      <circle cx="148" cy="115" r="5" fill="#111827" />

      <circle cx="110" cy="113" r="1.5" fill="white" />
      <circle cx="150" cy="113" r="1.5" fill="white" />

      {/* Nose */}
      <ellipse cx="128" cy="138" rx="10" ry="8" fill="#6B4F4F" />

      {/* Mouth */}
      <path
        d="M128 146V156"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M128 156C118 166 108 166 102 160"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M128 156C138 166 148 166 154 160"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Chest Fur */}
      <path
        d="
        M98 182
        C90 205 105 225 128 220
        C151 225 166 205 158 182
        C150 194 142 188 138 204
        C134 190 122 190 118 204
        C114 188 106 194 98 182Z"
        fill="white"
      />
    </svg>
  );
}