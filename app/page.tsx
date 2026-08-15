"use client";

import { useMemo, useState } from "react";

type Session = { title: string; speakers?: string; kind?: "talk" | "break" | "poster" | "panel" | "pending" };
type Workshop = { id: string; short: string; name: string; room: string; color: string; url: string };

const workshops: Workshop[] = [
  { id: "crl", short: "Continual RL", name: "Continual Reinforcement Learning", room: "B-2305", color: "#f0544f", url: "https://sites.google.com/view/continual-learning/schedule" },
  { id: "wm", short: "World Models", name: "Model-Based RL + Generative World Models", room: "B-4335", color: "#5b5bd6", url: "https://worldmodels-rlc.github.io/" },
  { id: "rlvg", short: "RL + Games", name: "Reinforcement Learning and Video Games", room: "B-4345", color: "#0f9d79", url: "https://sites.google.com/view/rlvg-2026/schedule" },
  { id: "big", short: "Big Worlds", name: "Reinforcement Learning in Big Worlds", room: "B-4325", color: "#e89826", url: "https://rlinbigworlds.ca/" },
  { id: "brew", short: "Beyond Rewards", name: "RL Beyond Rewards", room: "B-2325", color: "#ad5bd6", url: "https://rlbrew-workshop.github.io/" },
  { id: "frame", short: "Finding the Frame", name: "Finding the Frame", room: "B-0305", color: "#147db3", url: "https://sites.google.com/view/findingtheframe/schedule" },
  { id: "auto", short: "AutoRL", name: "Automated Reinforcement Learning", room: "B-4315", color: "#607238", url: "https://sites.google.com/view/automatedrl/schedule" },
];

const times = ["8:45", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"];

const agenda: Record<string, Record<string, Session[]>> = {
  "8:45": { auto: [{ title: "Opening remarks" }] },
  "9:00": {
    crl: [{ title: "Opening remarks" }, { title: "Resolving the Sensorimotor Dilemma", speakers: "George Konidaris" }],
    wm: [{ title: "Opening remarks" }, { title: "Invited talk", speakers: "Harry Zhao" }],
    rlvg: [{ title: "Program to be announced", speakers: "Alex Kearney · Marlos C. Machado · Martin Singh-Blom · Sam Devlin · Thomas Walsh · Ida Momennejad", kind: "pending" }],
    big: [{ title: "Opening remarks" }, { title: "Keynote", speakers: "Doina Precup" }],
    brew: [{ title: "Program to be announced", kind: "pending" }],
    frame: [{ title: "Opening remarks" }, { title: "Intelligence in Action", speakers: "Özgür Şimşek" }, { title: "Surveys in RL (and RLHF)", speakers: "Serena Booth" }],
    auto: [{ title: "Invited talk", speakers: "Martha White" }, { title: "Invited tutorial", speakers: "Clare Lyle" }],
  },
  "9:30": {
    crl: [{ title: "Long Horizon Reasoning via Neurosymbolic Learning", speakers: "Katia Sycara" }],
    wm: [{ title: "Invited talk", speakers: "Scott Fujimoto" }],
    frame: [{ title: "Sequences of Frames", speakers: "Sara Aronowitz" }, { title: "RL’s blind spot for Knightian uncertainty", speakers: "Joel Lehman" }],
  },
  "10:00": {
    crl: [{ title: "Coffee + posters", kind: "break" }], wm: [{ title: "Coffee + networking", kind: "break" }],
    big: [{ title: "Posters + coffee", kind: "poster" }], frame: [{ title: "Coffee break", kind: "break" }], auto: [{ title: "Coffee break", kind: "break" }],
  },
  "10:30": {
    crl: [{ title: "Contributed talks 1–4", speakers: "Lu Li · Purab Seth · AmirHossein Naghdi · Luc McCutcheon" }],
    wm: [{ title: "Invited talk", speakers: "Danijar Hafner" }],
    big: [{ title: "Lightning talk: RL on Robots", speakers: "Sorina Lupu" }],
    frame: [{ title: "Panel with invited speakers", speakers: "Özgür Şimşek · Serena Booth · Sara Aronowitz · Joel Lehman", kind: "panel" }],
    auto: [{ title: "Invited talk", speakers: "Théo Vincent" }],
  },
  "11:00": {
    crl: [{ title: "Stable Adaptation Under Distribution Shift", speakers: "Sarath Chandar" }],
    big: [{ title: "Minimal Sufficient World Models", speakers: "Kevin Murphy" }], auto: [{ title: "Workshop paper presentations" }],
  },
  "11:30": {},
  "12:00": Object.fromEntries(workshops.map(w => [w.id, [{ title: w.id === "frame" ? "Lunch + breakout sessions" : "Lunch break", kind: "break" }]])),
  "1:00": { crl: [{ title: "Where is Learning?", speakers: "David Abel" }], wm: [{ title: "Invited talk", speakers: "Amir Zadeh" }] },
  "1:30": {
    crl: [{ title: "Continual RL + Automatic Curriculum Learning", speakers: "Peter Stone" }], wm: [{ title: "Invited talk", speakers: "Doina Precup" }],
    big: [{ title: "How Streaming Deep RL Unlocks New Capabilities", speakers: "Mohamed Elsayed" }], frame: [{ title: "Poster session 1", kind: "poster" }], auto: [{ title: "Invited talk", speakers: "Junhyuk Oh" }],
  },
  "2:00": {
    crl: [{ title: "Generate-and-test methods for Continual Learning", speakers: "Richard S. Sutton" }], big: [{ title: "Venn, Savage, and Carse: A Second Eternal Braid", speakers: "David Abel" }],
    auto: [{ title: "Debate", speakers: "Martha White · Clare Lyle · Junhyuk Oh · Sam Devlin · Théo Vincent · Michael Beukman", kind: "panel" }],
  },
  "2:30": {
    crl: [{ title: "Contributed talks 5–6", speakers: "Ben Sanati · Keith Lawson" }], wm: [{ title: "Poster session", kind: "poster" }], big: [{ title: "Spotlight", speakers: "Aryaman Reddi" }],
    frame: [{ title: "Contributed oral presentations", speakers: "Esraa Elelimy · Banafsheh Rafiee · Fernando Rosas · Roy Fox" }],
  },
  "3:00": {
    crl: [{ title: "Panel discussion", speakers: "Richard S. Sutton · Katia Sycara · Doina Precup · George Konidaris · Adam White", kind: "panel" }],
    big: [{ title: "Coffee break", kind: "break" }], auto: [{ title: "Coffee break", kind: "break" }],
  },
  "3:30": {
    crl: [{ title: "Coffee + posters", kind: "poster" }], wm: [{ title: "Invited talk", speakers: "Cyrus Neary" }],
    big: [{ title: "Panel", speakers: "Sorina Lupu · Marcello Restelli · Martha White · Joseph Modayil · John Carmack", kind: "panel" }],
    frame: [{ title: "Human–Machine Co-creation", speakers: "Dylan Brenneis" }, { title: "Closing remarks" }], auto: [{ title: "Oral presentations" }],
  },
  "4:00": {
    crl: [{ title: "Contributed talks 7–8", speakers: "Edan Meyer · Zijing Wu" }], wm: [{ title: "Closing remarks" }], frame: [{ title: "Poster session 2", kind: "poster" }], auto: [{ title: "Invited tutorial", speakers: "Antonin Raffin" }],
  },
  "4:30": { crl: [{ title: "Three Challenges of Continual RL", speakers: "A. Rupam Mahmood" }, { title: "Closing remarks" }], big: [{ title: "Closing remarks" }], auto: [{ title: "Closing remarks" }] },
  "5:00": {},
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);
  const visible = useMemo(() => workshops.filter(w => `${w.name} ${w.room}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <main>
    <header className="hero">
      <div className="eyebrow"><span className="live-dot" /> RLC 2026 · Workshop day</div>
      <div className="hero-row"><div><h1>Workshop schedule</h1><p>Saturday, August 15 · Université de Montréal · 3200 Jean-Brillant</p></div><div className="date-tile"><b>15</b><span>AUG</span></div></div>
      <div className="controls">
        <label className="search"><span>⌕</span><input aria-label="Filter workshops" placeholder="Find a workshop or room…" value={query} onChange={e => setQuery(e.target.value)} /></label>
        <button className={compact ? "active" : ""} onClick={() => setCompact(v => !v)} aria-pressed={compact}>Compact view</button>
        <a href="https://rl-conference.cc/schedule.html" target="_blank" rel="noreferrer">Official schedule ↗</a>
      </div>
    </header>
    <section className="notice"><b>7 parallel workshops</b><span>Times shown in Montréal local time (EDT). Scroll sideways to compare every room.</span></section>
    <div className={`schedule-wrap ${compact ? "compact" : ""}`}><table><thead><tr>
      <th className="time-head"><span>TIME</span><small>EDT</small></th>
      {visible.map(w => <th key={w.id} style={{ "--accent": w.color } as React.CSSProperties}><a href={w.url} target="_blank" rel="noreferrer"><span className="workshop-name">{w.short}</span><span className="room">Room {w.room}</span></a></th>)}
    </tr></thead><tbody>{times.map(time => <tr key={time}>
      <th className="time-cell">{time}<small>{Number(time.split(":")[0]) < 8 ? "PM" : "AM"}</small></th>
      {visible.map(w => <td key={w.id}>{(agenda[time]?.[w.id] || []).map((s, i) => <article key={i} className={`session ${s.kind || "talk"}`}><strong>{s.title}</strong>{s.speakers && <span>{s.speakers}</span>}</article>)}</td>)}
    </tr>)}</tbody></table></div>
    <footer><span>Agenda details are compiled from workshop organizers’ published pages and may change.</span><span>Last checked · Aug 15, 2026</span></footer>
  </main>;
}
