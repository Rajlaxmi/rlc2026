import type { Metadata } from "next";
import "./panel-notes.css";
export const metadata: Metadata = { title: "Continual RL Panel Notes · RLC 2026", description: "TL;DR and conversation notes from the RLC 2026 Continual RL panel." };
const bullets = [
  "In-context learning is a weak, simplified form of continual learning: short-term, non-parametric adaptation rather than deeper memory integration.",
  "LLM progress has come largely from scale, data, and engineering rather than solving continual learning.",
  "Research engineers remain central to training through data-mixture management and diagnosing stalled performance.",
  "Data curation and mixture quality strongly shape model behavior; new information must be integrated meaningfully.",
  "Ongoing adaptation may be necessary for aligned, useful agents; inability to learn from mistakes may itself create safety risks.",
];
const conversation = [
  "LLMs do a very simplified kind of learning through changing context, prompts, and retrieved documents. It is not parametric; it is short-term, limited memory—a very weak kind of continual learning.",
  "People patch this with agent harnesses and external memory: useful lemmas, programs, and other material are stored for later retrieval. Even then, agents may fail to retrieve the right information.",
  "Current training also depends on smart research engineers who manage data mixtures, diagnose stalled curves, and source more data. An agent could potentially do some of this itself.",
  "Preventing adaptation is not necessarily safer. Systems already make mistakes, and their inability to fix themselves or update their understanding may be part of the problem.",
  "Continual learning may be fundamental to better alignment with human needs and goals, and to a better understanding of the world.",
];
export default function PanelNotes(){return <main className="notes-page"><a className="notes-back" href="/saturday">← Back to conference tracker</a><header><span>RLC 2026 · Continual RL Workshop</span><h1>Panel notes</h1><p>Saturday, August 15 · 3:00 PM · Room B-2305</p></header><article><h2>TL;DR</h2><ul>{bullets.map(x=><li key={x}>{x}</li>)}</ul><h2>Actual conversation</h2><blockquote>{conversation.map(x=><p key={x}>“{x}”</p>)}</blockquote></article></main>}
