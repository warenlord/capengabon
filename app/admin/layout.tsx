import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Administration CAPEN",
    template: "%s — Administration CAPEN",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#14120f] text-white">{children}</div>;
}
