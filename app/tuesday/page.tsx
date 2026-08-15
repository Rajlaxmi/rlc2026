import type { Metadata } from "next";
import SchedulePage from "../SchedulePage";
export const metadata: Metadata = { title: "Tuesday Schedule · RLC 2026", description: "Tuesday's RLC 2026 keynotes, parallel research tracks, town hall, and poster session." };
export default function Tuesday() { return <SchedulePage initialDay="tuesday" />; }
