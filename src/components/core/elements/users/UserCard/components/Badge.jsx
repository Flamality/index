import React from "react";
import {
  Fa0,
  FaBroom,
  FaCrown,
  FaEyeDropper,
  FaGavel,
  FaRectangleList,
  FaBug,
} from "react-icons/fa6";
import ToolTip from "../../../overlays/ToolTip/ToolTip";
import { GiStarSwirl } from "react-icons/gi";

const badges = {
  ADM: {
    title: "Administrator",
    icon: FaGavel,
    color: "var(--color-danger)",
  },
  EBT: {
    title: "Early Beta Tester",
    icon: FaEyeDropper,
    color: "var(--color-warning)",
  },
  FND: {
    title: "Founder",
    icon: GiStarSwirl,
    color: "var(--color-success)",
  },
  CNT: {
    title: "Contributor",
    icon: FaRectangleList,
    color: "var(--color-info)",
  },
  ZRO: {
    title: "Z3R0",
    icon: Fa0,
    color: "var(--color-text-muted)",
  },
  BUG: {
    title: "Bug Hunter",
    icon: FaBug,
    color: "var(--color-danger)",
  },
};

export default function Badge({ badge }) {
  const badgeInfo = badges[badge];

  return (
    <ToolTip position="top" content={badgeInfo.title}>
      <div className="user-card-badge">
        <badgeInfo.icon style={{ color: badgeInfo.color }} />
      </div>
    </ToolTip>
  );
}
