"use client";

import React from "react";
import {
  Scale,
  Flame,
  Droplet,
  Timer,
  Baby,
  Ruler,
  FileText,
  FileCode,
  Code2,
  Moon,
  GraduationCap,
  Landmark,
  Palette,
  AlignLeft,
  ShieldCheck,
  Globe,
  Receipt,
  Percent,
  Users,
  CalendarDays,
  Coins,
  Wallet,
  HeartHandshake,
  Banknote,
  Activity,
  TrendingDown,
  Tag,
  TrendingUp,
  PiggyBank,
  LineChart,
  Fuel,
  Briefcase,
  PieChart,
  HardDrive,
  Mic,
  FileCheck,
  BookOpen,
  Clock,
  QrCode,
  Gauge,
  Cpu,
  Calculator,
  ShoppingBag,
  Sun,
  Zap,
  LucideIcon,
} from "lucide-react";

export type IconName =
  | "bmi"
  | "calorie"
  | "water"
  | "pace"
  | "due-date"
  | "shoe-size"
  | "paper-fabric"
  | "json-csv"
  | "regex"
  | "sleep-cycle"
  | "gpa"
  | "loan"
  | "color-palette"
  | "word-counter"
  | "password"
  | "timezone"
  | "tip"
  | "percentage"
  | "group-expense"
  | "age"
  | "currency"
  | "budget"
  | "zakat"
  | "salary"
  | "pregnancy-weight"
  | "habit-cost"
  | "discount"
  | "inflation"
  | "retirement"
  | "savings-growth"
  | "travel-time-fuel"
  | "freelance-rate"
  | "macro"
  | string;

const iconMap: Record<string, LucideIcon> = {
  bmi: Scale,
  calorie: Flame,
  water: Droplet,
  pace: Timer,
  timer: Timer,
  cpu: Cpu,
  "due-date": Baby,
  "shoe-size": Ruler,
  "paper-fabric": FileText,
  "json-csv": FileCode,
  regex: Code2,
  "sleep-cycle": Moon,
  gpa: GraduationCap,
  loan: Landmark,
  "color-palette": Palette,
  "word-counter": AlignLeft,
  password: ShieldCheck,
  timezone: Globe,
  tip: Receipt,
  percentage: Percent,
  "group-expense": Users,
  age: CalendarDays,
  currency: Coins,
  budget: Wallet,
  zakat: HeartHandshake,
  salary: Banknote,
  "pregnancy-weight": Activity,
  "habit-cost": TrendingDown,
  discount: Tag,
  inflation: TrendingUp,
  retirement: PiggyBank,
  "savings-growth": LineChart,
  "travel-time-fuel": Fuel,
  "freelance-rate": Briefcase,
  macro: PieChart,
  gfr: Activity,
  "gfr-kidney-function": Activity,
  "digital-storage": HardDrive,
  "hard-drive": HardDrive,
  "speech-time": Mic,
  mic: Mic,
  "ats-resume": FileCheck,
  "file-check": FileCheck,
  readability: BookOpen,
  "book-open": BookOpen,
  "work-hours": Clock,
  clock: Clock,
  "qr-code": QrCode,
  "scan-line": QrCode,
  "retirement-withdrawal": TrendingUp,
  gauge: Gauge,
  "speed-test": Gauge,
  etsy: ShoppingBag,
  "etsy-fee": ShoppingBag,
  solar: Sun,
  "solar-payback": Sun,
  kdp: BookOpen,
  "kdp-royalty": BookOpen,
  "pakistan-tax": Receipt,
  fbr: Receipt,
  "pakistan-income-tax": Receipt,
  "etsy-vs-kdp": Scale,
  "compare-profit": Scale,
  creatine: Zap,
  "creatine-calculator": Zap,
  "fitness-macro": Zap,
};

// Also map raw emoji or legacy icon names to icons
const legacyEmojiMap: Record<string, LucideIcon> = {
  "⚖️": Scale,
  "🔥": Flame,
  "💧": Droplet,
  "🏃": Timer,
  "👶": Baby,
  "👟": Ruler,
  "📏": FileText,
  "🛡️": FileCode,
  "🔍": Code2,
  "🌙": Moon,
  "🎓": GraduationCap,
  "💵": Landmark,
  "🎨": Palette,
  "📝": AlignLeft,
  "🔑": ShieldCheck,
  "🗺️": Globe,
  "📊": Percent,
  "👥": Users,
  "🎂": CalendarDays,
  "💱": Coins,
  "💰": Wallet,
  "📈": TrendingUp,
  "⛽": Fuel,
  "⏳": TrendingDown,
  "🏷️": Tag,
  "🏦": PiggyBank,
};

interface ToolIconProps {
  icon: string;
  category?: "Health" | "Finance" | "Converter" | "Utility/Dev" | "Planning" | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ToolIcon({
  icon,
  category = "Health",
  size = "md",
  className = "",
}: ToolIconProps) {
  const IconComponent = iconMap[icon] || legacyEmojiMap[icon] || Calculator;

  // Category badge styles with low-opacity category background and full color for icon
  const getBadgeStyle = () => {
    switch (category) {
      case "Finance":
        return {
          badge: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
        };
      case "Converter":
        return {
          badge: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/20 text-cyan-600 dark:text-cyan-400",
        };
      case "Utility/Dev":
        return {
          badge: "bg-slate-500/10 dark:bg-slate-500/20 border-slate-500/20 text-slate-700 dark:text-slate-300",
        };
      case "Planning":
        return {
          badge: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 text-amber-600 dark:text-amber-400",
        };
      case "Health":
      default:
        return {
          badge: "bg-teal-500/10 dark:bg-teal-500/20 border-teal-500/20 text-teal-600 dark:text-teal-400",
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg p-1.5",
    md: "w-10 h-10 rounded-xl p-2",
    lg: "w-12 h-12 rounded-xl p-2.5",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div
      className={`inline-flex items-center justify-center border flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${sizeClasses[size]} ${badgeStyle.badge} ${className}`}
    >
      <IconComponent size={iconSizes[size]} strokeWidth={2} className="w-full h-full" />
    </div>
  );
}
