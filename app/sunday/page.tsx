import type { Metadata } from "next";
import SchedulePage from "../SchedulePage";
export const metadata: Metadata = { title: "Sunday Schedule · RLC 2026", description: "Sunday's RLC 2026 keynotes, parallel tracks, posters, and social program." };
export default function Sunday() { return <SchedulePage initialDay="sunday" />; }
