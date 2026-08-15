import type { Metadata } from "next";
import SchedulePage from "../SchedulePage";
export const metadata: Metadata = { title: "Saturday Workshops · RLC 2026", description: "Saturday's seven RLC 2026 workshop schedules, rooms, sessions, and speakers." };
export default function Saturday() { return <SchedulePage initialDay="saturday" />; }
