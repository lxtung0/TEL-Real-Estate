import React from "react";

const SureStepIcon: React.FC = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="SureStep logo"
  >
    {/* House outline */}
    <path
      d="M4 28 L32 4 L60 28 V60 H4 Z"
      fill="none"
      stroke="#1E4E8C"
      strokeWidth={4}
    />
    {/* Ramp */}
    <polygon
      points="12,56 12,40 44,40 44,56"
      fill="#1E4E8C"
    />
    {/* Wheelchair circle */}
    <circle
      cx={24}
      cy={32}
      r={8}
      fill="none"
      stroke="#1E4E8C"
      strokeWidth={4}
    />
    {/* Wheelchair occupant */}
    <path
      d="M24 24 v-8 M24 16 h8"
      stroke="#1E4E8C"
      strokeWidth={4}
      strokeLinecap="round"
    />
    {/* Checkmark */}
    <path
      d="M44 44 L52 52 L60 36"
      fill="none"
      stroke="#28A745"
      strokeWidth={6}
      strokeLinecap="round"
    />
  </svg>
);

export default SureStepIcon;
