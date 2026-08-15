"use client";

import { useMemo, useState } from "react";

type Session = { title: string; speakers?: string; url?: string; kind?: "talk" | "break" | "poster" | "panel" | "pending" };
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
    crl: [
      { title: "1. The Three Regimes of Offline-to-Online Reinforcement Learning", speakers: "Lu Li, Tianwei Ni, Yihao Sun, Pierre-Luc Bacon" },
      { title: "2. Task diversity produces systematic transfer but inhibits continual reinforcement learning", speakers: "Purab Seth, Neil Shah, Kunal Jha, Samuel J. Gershman, Max Kleiman-Weiner, Wilka Carvalho" },
      { title: "3. Flow-Corrected Thompson Sampling for Non-Stationary Contextual Bandits", speakers: "AmirHossein Naghdi, Ali Baheri" },
      { title: "4. Calibrated Partial Resets: Preventing Policy Collapse in Continual Reinforcement Learning", speakers: "Luc McCutcheon, Evangelos Chatzaroulas, Saber Fallah" },
    ],
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
    crl: [
      { title: "5. Forgetting is Everywhere", speakers: "Ben Sanati, Thomas L Lee, Trevor McInroe, Aidan Scannell, Nikolay Malkin, David Abel, Amos Storkey" },
      { title: "6. Security-Gym: Evaluating Temporally-Uniform Agents on High-Fidelity Linux Telemetry", speakers: "Keith Lawson, Hafiz Malik" },
    ], wm: [{ title: "Poster session", kind: "poster" }], big: [{ title: "Spotlight", speakers: "Aryaman Reddi" }],
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
    crl: [
      { title: "7. Connectivity, Credit Assignment, and the Speed of Learning", speakers: "Edan Meyer, Andrew Freeman, Richard S. Sutton" },
      { title: "8. QD-Learning for Continual Reinforcement Learning", speakers: "Zijing Wu, Doina Precup, Paul Masset, Nishanth Anand" },
    ], wm: [{ title: "Closing remarks" }], frame: [{ title: "Poster session 2", kind: "poster" }], auto: [{ title: "Invited tutorial", speakers: "Antonin Raffin" }],
  },
  "4:30": { crl: [{ title: "Three Challenges of Continual RL", speakers: "A. Rupam Mahmood" }, { title: "Closing remarks" }], big: [{ title: "Closing remarks" }], auto: [{ title: "Closing remarks" }] },
  "5:00": {},
};

const conferenceColumns: Workshop[] = [
  { id: "main", short: "Main stage", name: "Keynotes & shared sessions", room: "B-2285", color: "#243b32", url: "https://rl-conference.cc/schedule.html" },
  { id: "a", short: "Track A", name: "Track A", room: "B-2305", color: "#f0544f", url: "https://rl-conference.cc/schedule.html" },
  { id: "b", short: "Track B", name: "Track B", room: "B-0325", color: "#5b5bd6", url: "https://rl-conference.cc/schedule.html" },
  { id: "c", short: "Track C", name: "Track C", room: "B-2325", color: "#0f9d79", url: "https://rl-conference.cc/schedule.html" },
  { id: "d", short: "Track D", name: "Track D", room: "B-0305", color: "#e89826", url: "https://rl-conference.cc/schedule.html" },
];

const paperSession = (date: string, track: number, time: string) =>
  `https://rl-conference.cc/paper_schedule.html?session=${encodeURIComponent(`${date}|${track}|${time}`)}`;

const speakerWebsites: Record<string, string> = {
  "George Konidaris": "https://cs.brown.edu/people/gdk/", "Katia Sycara": "https://www.ri.cmu.edu/ri-faculty/katia-sycara/",
  "Sarath Chandar": "https://sarathchandar.in/", "David Abel": "https://david-abel.github.io/", "Peter Stone": "https://www.cs.utexas.edu/~pstone/",
  "Richard S. Sutton": "http://incompleteideas.net/", "A. Rupam Mahmood": "https://armahmood.github.io/", "Harry Zhao": "https://pwnerharry.github.io/",
  "Scott Fujimoto": "https://scholar.google.com/citations?user=RiY8DgYAAAAJ", "Danijar Hafner": "https://danijar.com/", "Amir Zadeh": "https://scholar.google.com/citations?user=2fLaB6QAAAAJ",
  "Doina Precup": "https://doinaprecup.github.io/", "Cyrus Neary": "https://cyrusneary.com/", "Kevin Murphy": "https://www.cs.ubc.ca/~murphyk/",
  "Sorina Lupu": "https://scholar.google.com/citations?user=4R3hR3QAAAAJ", "Mohamed Elsayed": "https://scholar.google.com/citations?user=JmLJ9R0AAAAJ",
  "Martha White": "https://webdocs.cs.ualberta.ca/~whitem/", "John Carmack": "https://en.wikipedia.org/wiki/John_Carmack",
  "Özgür Şimşek": "https://scholar.google.com/citations?user=t2vGSWIAAAAJ", "Serena Booth": "https://serenabooth.com/", "Sara Aronowitz": "https://www.saraaronowitz.com/",
  "Joel Lehman": "https://www.joellehman.com/", "Dylan Brenneis": "https://dylanbrenneis.ca/", "Clare Lyle": "https://clarelyle.com/",
  "Junhyuk Oh": "https://junhyuk.com/", "Théo Vincent": "https://www.ias.informatik.tu-darmstadt.de/Team/TheoVincent", "Antonin Raffin": "https://araffin.github.io/",
  "Marc Bellemare": "https://www.marcgbellemare.info/", "Sheila McIlraith": "https://www.cs.toronto.edu/~sheila/", "Rika Antonova": "https://rikaantonova.com/",
  "Balaraman Ravindran": "https://ravindran.org/"
};

function SpeakerNames({ text }: { text: string }) {
  return <span className="speaker-list">{text.split(/\s*[·,]\s*/).map((name, i) => <span className="speaker-name" key={`${name}-${i}`}><span>{name}</span>{speakerWebsites[name] && <a href={speakerWebsites[name]} target="_blank" rel="noreferrer">Website ↗</a>}</span>)}</span>;
}

const dayData: Record<string, { label: string; date: string; times: string[]; agenda: Record<string, Record<string, Session[]>> }> = {
  sunday: { label: "Sunday", date: "August 16", times: ["9:15", "9:30", "10:30", "11:00", "12:00", "1:00", "2:30", "4:00", "6:00"], agenda: {
    "9:15": { main: [{ title: "Opening comments" }] }, "9:30": { main: [{ title: "Keynote", speakers: "Marc Bellemare" }] },
    "10:30": { main: [{ title: "Coffee break", kind: "break" }] },
    "11:00": { a: [{ title: "Theory of RL", url: paperSession("Aug 16", 1, "11:00 AM") }], b: [{ title: "Task specification + reward functions", url: paperSession("Aug 16", 2, "11:00 AM") }], c: [{ title: "Core RL algorithms", url: paperSession("Aug 16", 3, "11:00 AM") }], d: [{ title: "Evaluation, benchmarks + environments", url: paperSession("Aug 16", 4, "11:00 AM") }] },
    "12:00": { main: [{ title: "Lunch · Room B-2294", kind: "break" }] }, "1:00": { main: [{ title: "Poster session · 31 posters", speakers: "Poster area", kind: "poster" }] },
    "2:30": { main: [{ title: "Travel to Cirque du Soleil", speakers: "Quai Jacques-Cartier" }] }, "4:00": { main: [{ title: "Cirque du Soleil", speakers: "Quai Jacques-Cartier" }] },
    "6:00": { main: [{ title: "Reception", speakers: "2 R. de la Commune O" }] },
  }},
  monday: { label: "Monday", date: "August 17", times: ["9:00", "10:00", "10:20", "11:10", "11:40", "12:30", "2:00", "3:00", "6:00"], agenda: {
    "9:00": { main: [{ title: "Keynote", speakers: "Sheila McIlraith" }] }, "10:00": { main: [{ title: "Coffee break", kind: "break" }] },
    "10:20": { a: [{ title: "Bandits", url: paperSession("Aug 17", 1, "10:20 AM") }], b: [{ title: "Fairness, interpretability + HAI · Hierarchical RL", url: paperSession("Aug 17", 2, "10:20 AM") }], c: [{ title: "Core RL algorithms", url: paperSession("Aug 17", 3, "10:20 AM") }], d: [{ title: "Applied RL", url: paperSession("Aug 17", 4, "10:20 AM") }] },
    "11:10": { main: [{ title: "Queer in AI coffee · Room B-4315", kind: "break" }] },
    "11:40": { a: [{ title: "Understanding deep RL", url: paperSession("Aug 17", 1, "11:40 AM") }], b: [{ title: "Task specification + reward functions", url: paperSession("Aug 17", 2, "11:40 AM") }], c: [{ title: "Planning + model-based RL", url: paperSession("Aug 17", 3, "11:40 AM") }], d: [{ title: "Multi-agent RL", url: paperSession("Aug 17", 4, "11:40 AM") }] },
    "12:30": { main: [{ title: "WiML lunch", speakers: "Outside · B-4315 if rain", kind: "break" }] }, "2:00": { main: [{ title: "Keynote", speakers: "Danijar Hafner" }] },
    "3:00": { main: [{ title: "Poster session · 60 posters", speakers: "Poster area", kind: "poster" }] }, "6:00": {},
  }},
  tuesday: { label: "Tuesday", date: "August 18", times: ["9:00", "10:00", "10:20", "11:10", "11:40", "12:30", "1:00", "2:00", "3:00", "6:00"], agenda: {
    "9:00": { main: [{ title: "Keynote", speakers: "Rika Antonova" }] }, "10:00": { main: [{ title: "Coffee break", kind: "break" }] },
    "10:20": { a: [{ title: "Theory of RL", url: paperSession("Aug 18", 1, "10:20 AM") }], b: [{ title: "Safe, robust + risk-sensitive RL", url: paperSession("Aug 18", 2, "10:20 AM") }], c: [{ title: "Offline RL", url: paperSession("Aug 18", 3, "10:20 AM") }], d: [{ title: "Evaluation, benchmarks + environments", url: paperSession("Aug 18", 4, "10:20 AM") }] },
    "11:10": { main: [{ title: "Coffee break", kind: "break" }] },
    "11:40": { a: [{ title: "Understanding deep RL", url: paperSession("Aug 18", 1, "11:40 AM") }], b: [{ title: "RL fine-tuning of LLMs/VLMs/VLAs · Imitation learning", url: paperSession("Aug 18", 2, "11:40 AM") }], c: [{ title: "Continual RL · Streaming RL · Exploration", url: paperSession("Aug 18", 3, "11:40 AM") }], d: [{ title: "Multi-agent RL", url: paperSession("Aug 18", 4, "11:40 AM") }] },
    "12:30": { main: [{ title: "Lunch · Room B-2294", kind: "break" }] }, "1:00": { main: [{ title: "Town hall", speakers: "Salle Claude-Champagne", kind: "panel" }] },
    "2:00": { main: [{ title: "Keynote", speakers: "Balaraman Ravindran" }] }, "3:00": { main: [{ title: "Poster session · 60 posters", speakers: "Poster area", kind: "poster" }] }, "6:00": {},
  }},
};

export default function SchedulePage({ initialDay }: { initialDay: string }) {
  const day = initialDay;
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);
  const columns = day === "saturday" ? workshops : conferenceColumns;
  const currentTimes = day === "saturday" ? times : dayData[day].times;
  const currentAgenda = day === "saturday" ? agenda : dayData[day].agenda;
  const visible = useMemo(() => columns.filter(w => `${w.name} ${w.room}`.toLowerCase().includes(query.toLowerCase())), [query, day]);
  return <main>
    <header className="hero">
      <div className="eyebrow"><span className="live-dot" /> RLC 2026 · Montréal</div>
      <div className="hero-row"><div><h1>Conference schedule</h1><p>{day === "saturday" ? "Saturday, August 15 · Workshop day" : `${dayData[day].label}, ${dayData[day].date}`} · Université de Montréal</p></div><div className="date-tile"><b>{day === "saturday" ? "15" : dayData[day].date.split(" ")[1]}</b><span>AUG</span></div></div>
      <nav className="day-tabs" aria-label="Conference day">
        {[['saturday','Sat 15','Workshops'],['sunday','Sun 16','Conference'],['monday','Mon 17','Conference'],['tuesday','Tue 18','Conference']].map(([id,label,note]) => <a key={id} href={`/${id}`} className={day===id?'selected':''} aria-current={day===id?'page':undefined}><b>{label}</b><span>{note}</span></a>)}
      </nav>
      <div className="controls">
        <label className="search"><span>⌕</span><input aria-label="Filter schedule columns" placeholder={day === "saturday" ? "Find a workshop or room…" : "Find a track or room…"} value={query} onChange={e => setQuery(e.target.value)} /></label>
        <button className={compact ? "active" : ""} onClick={() => setCompact(v => !v)} aria-pressed={compact}>Compact view</button>
        <a href="https://rl-conference.cc/schedule.html" target="_blank" rel="noreferrer">Official schedule ↗</a>
      </div>
    </header>
    <section className="notice"><b>{day === "saturday" ? "7 parallel workshops" : "Conference program"}</b><span>Times shown in Montréal local time (EDT). Scroll sideways to compare every room.</span></section>
    <div className={`schedule-wrap ${compact ? "compact" : ""}`}><table><thead><tr>
      <th className="time-head"><span>TIME</span><small>EDT</small></th>
      {visible.map(w => <th key={w.id} style={{ "--accent": w.color } as React.CSSProperties}><a href={w.url} target="_blank" rel="noreferrer"><span className="workshop-name">{w.short}</span><span className="room">Room {w.room}</span></a></th>)}
    </tr></thead><tbody>{currentTimes.map(time => <tr key={time}>
      <th className="time-cell">{time}<small>{Number(time.split(":")[0]) < 8 ? "PM" : "AM"}</small></th>
      {visible.map(w => <td key={w.id}>{(currentAgenda[time]?.[w.id] || []).map((s, i) => <article key={i} className={`session ${s.kind || "talk"}`}><strong><a className="source-link" href={s.url || w.url} target="_blank" rel="noreferrer" aria-label={`${s.title} — open original schedule`}>{s.title}<i aria-hidden="true">↗</i></a></strong>{s.speakers && <SpeakerNames text={s.speakers} />}</article>)}</td>)}
    </tr>)}</tbody></table></div>
    <footer><span>Agenda details are compiled from workshop organizers’ published pages and may change.</span><span>Last checked · Aug 15, 2026</span></footer>
  </main>;
}
