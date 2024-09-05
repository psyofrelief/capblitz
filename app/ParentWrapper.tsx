"use client";

import { AppStateProvider } from "@/utils/appContext";

export default function ParentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
