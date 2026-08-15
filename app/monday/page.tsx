import type { Metadata } from "next";
import SchedulePage from "../SchedulePage";
export const metadata: Metadata = { title: "Monday Schedule · RLC 2026", description: "Monday's RLC 2026 keynotes, parallel research tracks, lunch, and poster session." };
export default function Monday() { return <SchedulePage initialDay="monday" />; }
