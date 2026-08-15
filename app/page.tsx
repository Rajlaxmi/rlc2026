import type { Metadata } from "next";
import SchedulePage from "./SchedulePage";
export const metadata: Metadata = { title: "Saturday Workshops · RLC 2026", description: "Saturday's RLC 2026 workshop schedule with rooms, sessions, and speakers." };
export default function Home() { return <SchedulePage initialDay="saturday" />; }
