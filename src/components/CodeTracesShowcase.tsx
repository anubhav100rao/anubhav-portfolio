"use client";

import { useState, useEffect, useRef } from "react";

// --- Types & Interfaces ---
interface ArrayFrame {
  array: number[];
  highlights: number[]; // indices currently being compared/swapped
  swapped: boolean;     // whether a swap occurred in this frame
  narration: string;
  codeLine: number;
}

interface GraphFrame {
  queue: string[];
  visited: string[];
  activeNode: string | null;
  highlights: {
    nodes: string[];
    edges: string[]; // e.g. "A-B"
  };
  narration: string;
  codeLine: number;
}

// --- Data & Helpers for Pre-generated Algorithm Frames ---
const INITIAL_ARRAY = [25, 12, 45, 8, 30];

const generateBubbleSortFrames = (): ArrayFrame[] => {
  const frames: ArrayFrame[] = [];
  const arr = [...INITIAL_ARRAY];
  const n = arr.length;

  // Initial state frame
  frames.push({
    array: [...arr],
    highlights: [],
    swapped: false,
    narration: "Initial Array loaded. Click 'Play' or 'Step' to start Bubble Sort.",
    codeLine: 0,
  });

  frames.push({
    array: [...arr],
    highlights: [],
    swapped: false,
    narration: "Setting array length n = " + n + ".",
    codeLine: 1,
  });

  for (let i = 0; i < n; i++) {
    frames.push({
      array: [...arr],
      highlights: [],
      swapped: false,
      narration: `Outer loop pass i = ${i}. Scanning unsorted elements.`,
      codeLine: 2,
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Comparison frame
      frames.push({
        array: [...arr],
        highlights: [j, j + 1],
        swapped: false,
        narration: `Comparing index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
        codeLine: 4,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        frames.push({
          array: [...arr],
          highlights: [j, j + 1],
          swapped: true,
          narration: `Swap required! ${temp} > ${arr[j]}, shifting them.`,
          codeLine: 6,
        });
      } else {
        frames.push({
          array: [...arr],
          highlights: [j, j + 1],
          swapped: false,
          narration: `No swap needed since ${arr[j]} <= ${arr[j + 1]}.`,
          codeLine: 4,
        });
      }
    }
    // Completed a pass, last element of this pass is now locked
    frames.push({
      array: [...arr],
      highlights: [n - i - 1],
      swapped: false,
      narration: `Pass complete. Element ${arr[n - i - 1]} is now in its correct sorted position.`,
      codeLine: 2,
    });
  }

  frames.push({
    array: [...arr],
    highlights: [],
    swapped: false,
    narration: "Array is fully sorted! Bubble Sort completed successfully.",
    codeLine: 2,
  });

  return frames;
};

// Graph details
// Nodes: A, B, C, D, E
// Edges: A-B, A-C, B-D, C-E, D-E
const BFS_FRAMES: GraphFrame[] = [
  {
    queue: [],
    visited: [],
    activeNode: null,
    highlights: { nodes: [], edges: [] },
    narration: "Graph loaded with 5 nodes. Click 'Play' to trace BFS starting from Node A.",
    codeLine: 0,
  },
  {
    queue: ["A"],
    visited: ["A"],
    activeNode: null,
    highlights: { nodes: ["A"], edges: [] },
    narration: "Initializing BFS. Mark start node A as visited and push to the queue.",
    codeLine: 1,
  },
  {
    queue: ["A"],
    visited: ["A"],
    activeNode: null,
    highlights: { nodes: ["A"], edges: [] },
    narration: "Entering loop: queue is not empty, continuing exploration.",
    codeLine: 3,
  },
  {
    queue: [],
    visited: ["A"],
    activeNode: "A",
    highlights: { nodes: ["A"], edges: [] },
    narration: "Dequeueing active node A from the front of the queue.",
    codeLine: 4,
  },
  {
    queue: ["B"],
    visited: ["A", "B"],
    activeNode: "A",
    highlights: { nodes: ["B"], edges: ["A-B"] },
    narration: "Exploring neighbor B of Node A. Node B is unvisited: marking as visited and adding to queue.",
    codeLine: 7,
  },
  {
    queue: ["B", "C"],
    visited: ["A", "B", "C"],
    activeNode: "A",
    highlights: { nodes: ["C"], edges: ["A-C"] },
    narration: "Exploring neighbor C of Node A. Node C is unvisited: marking as visited and adding to queue.",
    codeLine: 8,
  },
  {
    queue: ["B", "C"],
    visited: ["A", "B", "C"],
    activeNode: null,
    highlights: { nodes: [], edges: [] },
    narration: "All neighbors of Node A explored. Checking queue...",
    codeLine: 3,
  },
  {
    queue: ["C"],
    visited: ["A", "B", "C"],
    activeNode: "B",
    highlights: { nodes: ["B"], edges: [] },
    narration: "Dequeueing next node B from the queue.",
    codeLine: 4,
  },
  {
    queue: ["C", "D"],
    visited: ["A", "B", "C", "D"],
    activeNode: "B",
    highlights: { nodes: ["D"], edges: ["B-D"] },
    narration: "Exploring neighbor D of Node B. Node D is unvisited: marking as visited and pushing to queue.",
    codeLine: 8,
  },
  {
    queue: ["C", "D"],
    visited: ["A", "B", "C", "D"],
    activeNode: "B",
    highlights: { nodes: ["A"], edges: ["A-B"] },
    narration: "Exploring neighbor A of Node B. Node A has already been visited, skip.",
    codeLine: 6,
  },
  {
    queue: ["C", "D"],
    visited: ["A", "B", "C", "D"],
    activeNode: null,
    highlights: { nodes: [], edges: [] },
    narration: "All neighbors of Node B explored. Checking queue...",
    codeLine: 3,
  },
  {
    queue: ["D"],
    visited: ["A", "B", "C", "D"],
    activeNode: "C",
    highlights: { nodes: ["C"], edges: [] },
    narration: "Dequeueing next node C from the queue.",
    codeLine: 4,
  },
  {
    queue: ["D", "E"],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: "C",
    highlights: { nodes: ["E"], edges: ["C-E"] },
    narration: "Exploring neighbor E of Node C. Node E is unvisited: marking as visited and pushing to queue.",
    codeLine: 8,
  },
  {
    queue: ["D", "E"],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: "C",
    highlights: { nodes: ["A"], edges: ["A-C"] },
    narration: "Exploring neighbor A of Node C. Node A has already been visited, skip.",
    codeLine: 6,
  },
  {
    queue: ["D", "E"],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: null,
    highlights: { nodes: [], edges: [] },
    narration: "All neighbors of Node C explored. Checking queue...",
    codeLine: 3,
  },
  {
    queue: ["E"],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: "D",
    highlights: { nodes: ["D"], edges: [] },
    narration: "Dequeueing next node D from the queue.",
    codeLine: 4,
  },
  {
    queue: ["E"],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: "D",
    highlights: { nodes: ["B", "E"], edges: ["B-D", "D-E"] },
    narration: "Neighbors B and E of Node D are already visited or queued. Skip.",
    codeLine: 6,
  },
  {
    queue: [],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: "E",
    highlights: { nodes: ["E"], edges: [] },
    narration: "Dequeueing final node E from the queue.",
    codeLine: 4,
  },
  {
    queue: [],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: "E",
    highlights: { nodes: ["C", "D"], edges: ["C-E", "D-E"] },
    narration: "Neighbors C and D of Node E are already visited. Skip.",
    codeLine: 6,
  },
  {
    queue: [],
    visited: ["A", "B", "C", "D", "E"],
    activeNode: null,
    highlights: { nodes: [], edges: [] },
    narration: "Queue is empty. BFS exploration complete! All nodes visited.",
    codeLine: 3,
  },
];

const BUBBLE_SORT_CODE = [
  "def bubble_sort(arr):",
  "    n = len(arr)",
  "    for i in range(n):",
  "        for j in range(0, n - i - 1):",
  "            if arr[j] > arr[j + 1]:",
  "                # Swap elements",
  "                arr[j], arr[j+1] = arr[j+1], arr[j]",
];

const BFS_CODE = [
  "def bfs(graph, start):",
  "    visited = {start}",
  "    queue = [start]",
  "    while queue:",
  "        node = queue.pop(0)",
  "        for neighbor in graph[node]:",
  "            if neighbor not in visited:",
  "                visited.add(neighbor)",
  "                queue.append(neighbor)",
];

export default function CodeTracesShowcase() {
  const [mode, setMode] = useState<"array" | "graph">("array");
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // ms per frame

  const bubbleSortFrames = useRef<ArrayFrame[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate Array frames once
  if (bubbleSortFrames.current.length === 0) {
    bubbleSortFrames.current = generateBubbleSortFrames();
  }

  const currentFramesCount = mode === "array" ? bubbleSortFrames.current.length : BFS_FRAMES.length;

  // Handle Playback ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setFrameIndex((prevIndex) => {
          if (prevIndex >= currentFramesCount - 1) {
            setIsPlaying(false);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, currentFramesCount, mode]);

  // Reset when changing mode
  useEffect(() => {
    setFrameIndex(0);
    setIsPlaying(false);
  }, [mode]);

  const handlePlayPause = () => {
    if (frameIndex >= currentFramesCount - 1) {
      setFrameIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (frameIndex < currentFramesCount - 1) {
      setFrameIndex(frameIndex + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (frameIndex > 0) {
      setFrameIndex(frameIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setFrameIndex(0);
  };

  // Get active items for render
  const currentArrayFrame = bubbleSortFrames.current[frameIndex] || bubbleSortFrames.current[0];
  const currentGraphFrame = BFS_FRAMES[frameIndex] || BFS_FRAMES[0];

  const currentCode = mode === "array" ? BUBBLE_SORT_CODE : BFS_CODE;
  const currentLine = mode === "array" ? currentArrayFrame.codeLine : currentGraphFrame.codeLine;
  const currentNarration = mode === "array" ? currentArrayFrame.narration : currentGraphFrame.narration;

  // Graph Node Positions in SVG (150x50, 70x130, etc.)
  const graphNodes = [
    { id: "A", x: 150, y: 55, label: "A" },
    { id: "B", x: 75, y: 135, label: "B" },
    { id: "C", x: 225, y: 135, label: "C" },
    { id: "D", x: 75, y: 235, label: "D" },
    { id: "E", x: 225, y: 235, label: "E" },
  ];

  const graphEdges = [
    { from: "A", to: "B", id: "A-B" },
    { from: "A", to: "C", id: "A-C" },
    { from: "B", to: "D", id: "B-D" },
    { from: "C", to: "E", id: "C-E" },
    { from: "D", to: "E", id: "D-E" },
  ];

  return (
    <section id="codetraces" className="py-24 px-6 relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-600/5 dark:to-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-mono">// FEATURED STARTUP</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-mono font-medium">LAUNCHED IN BETA</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            CodeTraces<span className="text-blue-500">.dev</span>
          </h2>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            An AI-powered visual debugger and dynamic teaching canvas for algorithms, code, and data structures. 
            Turn technical instructions or natural language prompts into live, step-by-step interactive simulations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.codetraces.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              Launch App
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              Read Architecture
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* --- MAIN INTERACTIVE WORKSPACE WIDGET --- */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl shadow-zinc-950/50 flex flex-col group/workspace">
          
          {/* Top Window Chrome Bar */}
          <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-zinc-500 dark:text-zinc-500 font-mono text-xs ml-4 hidden sm:inline-block">
                codetraces-sandbox:~
              </span>
            </div>
            
            {/* Title / Tab */}
            <div className="bg-zinc-900 px-4 py-1.5 rounded-lg border border-zinc-800/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-zinc-300 font-medium font-mono text-xs">
                {mode === "array" ? "bubble_sort.py" : "bfs_traversal.py"}
              </span>
            </div>

            {/* Sandbox details */}
            <div className="text-zinc-500 font-mono text-[10px] sm:text-xs">
              Frame {frameIndex + 1}/{currentFramesCount}
            </div>
          </div>

          {/* Inner Grid Panels */}
          <div className="grid lg:grid-cols-12 min-h-[480px]">
            
            {/* PANEL 1: Left Rail (Structure Selector & Stats) - 3 cols */}
            <div className="lg:col-span-3 bg-zinc-950/50 border-r border-zinc-900 p-6 flex flex-col gap-6 justify-between">
              
              {/* Structure Switcher */}
              <div>
                <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4">
                  Select Workspace
                </h4>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setMode("array")}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                      mode === "array"
                        ? "bg-blue-600/10 border-blue-500/50 text-blue-400"
                        : "bg-transparent border-zinc-800/40 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                      <span className="font-mono text-sm font-semibold">1D Array</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded font-mono">
                      BubbleSort
                    </span>
                  </button>

                  <button
                    onClick={() => setMode("graph")}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                      mode === "graph"
                        ? "bg-blue-600/10 border-blue-500/50 text-blue-400"
                        : "bg-transparent border-zinc-800/40 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <span className="font-mono text-sm font-semibold">Graph</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded font-mono">
                      BFS
                    </span>
                  </button>
                </div>
              </div>

              {/* Complexity Card Info */}
              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-mono text-xs font-semibold text-zinc-300">Complexity Info</span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">Algorithm</span>
                  <span className="text-zinc-200">
                    {mode === "array" ? "Bubble Sort" : "Breadth-First"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">Time Complexity</span>
                  <span className="text-blue-400 font-bold">
                    {mode === "array" ? "O(N²)" : "O(V + E)"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">Space Complexity</span>
                  <span className="text-purple-400">
                    {mode === "array" ? "O(1)" : "O(V)"}
                  </span>
                </div>
              </div>
            </div>

            {/* PANEL 2: Center Canvas (Algorithm Simulation Canvas) - 5 cols */}
            <div className="lg:col-span-5 bg-zinc-900/40 p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[360px] lg:min-h-0">
              
              {/* Dynamic status watermark */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-600 select-none">
                VIEW: CANVAS SURFACE_01
              </div>

              {/* RENDER MODE: ARRAY BUBBLE SORT */}
              {mode === "array" && (
                <div className="w-full flex-1 flex flex-col justify-center items-center gap-8 py-6">
                  {/* Array Value Bars */}
                  <div className="flex items-end justify-center gap-3 w-full h-[180px] px-4">
                    {currentArrayFrame.array.map((value, idx) => {
                      const isHighlighted = currentArrayFrame.highlights.includes(idx);
                      const isSwapped = isHighlighted && currentArrayFrame.swapped;
                      
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-2 group flex-1 transition-all duration-300"
                          style={{ height: "100%" }}
                        >
                          {/* Vertical Column Bar */}
                          <div
                            className={`w-full rounded-t-xl transition-all duration-300 flex items-end justify-center pb-3 relative border ${
                              isSwapped
                                ? "bg-gradient-to-t from-red-600 to-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                                : isHighlighted
                                ? "bg-gradient-to-t from-blue-600 to-indigo-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                : "bg-gradient-to-t from-zinc-800 to-zinc-700/80 border-zinc-750 group-hover:from-zinc-750 group-hover:to-zinc-700"
                            }`}
                            style={{
                              height: `${(value / 50) * 100}%`,
                            }}
                          >
                            <span className="font-mono text-sm font-extrabold text-white">
                              {value}
                            </span>
                            {/* Index Label */}
                            <span className="absolute -bottom-6 font-mono text-[10px] text-zinc-500">
                              {idx}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* RENDER MODE: GRAPH BFS */}
              {mode === "graph" && (
                <div className="w-full flex-1 flex justify-center items-center py-4">
                  <svg className="w-full max-w-[300px] h-[290px] overflow-visible" viewBox="0 0 300 290">
                    
                    {/* SVG Filters for Node Glow */}
                    <defs>
                      <filter id="glow-visited" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* SVG Links / Edges */}
                    {graphEdges.map((edge) => {
                      const isHighlighted = currentGraphFrame.highlights.edges.includes(edge.id);
                      
                      return (
                        <line
                          key={edge.id}
                          x1={graphNodes.find((n) => n.id === edge.from)?.x}
                          y1={graphNodes.find((n) => n.id === edge.from)?.y}
                          x2={graphNodes.find((n) => n.id === edge.to)?.x}
                          y2={graphNodes.find((n) => n.id === edge.to)?.y}
                          className={`transition-all duration-300 ${
                            isHighlighted
                              ? "stroke-blue-400 stroke-[3px] opacity-100"
                              : "stroke-zinc-800 stroke-[2px] opacity-40"
                          }`}
                        />
                      );
                    })}

                    {/* SVG Nodes */}
                    {graphNodes.map((node) => {
                      const isActive = currentGraphFrame.activeNode === node.id;
                      const isVisited = currentGraphFrame.visited.includes(node.id);
                      const isHighlighted = currentGraphFrame.highlights.nodes.includes(node.id);
                      const inQueue = currentGraphFrame.queue.includes(node.id);

                      // Styling logic
                      let fillClass = "fill-zinc-950 stroke-zinc-800";
                      let textClass = "fill-zinc-400";
                      let r = 20;
                      let filterStr = "";

                      if (isActive) {
                        fillClass = "fill-blue-600 stroke-blue-400 stroke-[3px]";
                        textClass = "fill-white font-extrabold";
                        r = 22;
                        filterStr = "url(#glow-active)";
                      } else if (isHighlighted) {
                        fillClass = "fill-amber-500 stroke-amber-300 stroke-[2.5px]";
                        textClass = "fill-zinc-950 font-bold";
                        r = 22;
                        filterStr = "url(#glow-visited)";
                      } else if (isVisited) {
                        fillClass = "fill-indigo-950 stroke-indigo-500 stroke-[2px]";
                        textClass = "fill-indigo-300 font-semibold";
                        filterStr = "url(#glow-visited)";
                      } else if (inQueue) {
                        fillClass = "fill-zinc-900 stroke-purple-500/80 stroke-[2px]";
                        textClass = "fill-purple-300 font-semibold";
                      }

                      return (
                        <g key={node.id} className="cursor-pointer transition-all duration-300">
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={r}
                            className={`transition-all duration-300 ${fillClass}`}
                            filter={filterStr}
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            className={`text-xs font-mono transition-all duration-300 ${textClass}`}
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}

              {/* Floating Playback Controls Bar */}
              <div className="bg-zinc-950/90 border border-zinc-850 p-2.5 rounded-2xl flex items-center justify-center gap-4 w-full max-w-[340px] shadow-lg shadow-black/40 backdrop-blur-md relative z-10 select-none">
                
                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
                  aria-label="Reset simulation"
                  title="Reset"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                  </svg>
                </button>

                {/* Step Backward */}
                <button
                  onClick={handleStepBackward}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
                  aria-label="Step backward"
                  title="Step Backward"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {/* Play / Pause Primary Button */}
                <button
                  onClick={handlePlayPause}
                  className={`p-3 rounded-full transition-all hover:scale-105 ${
                    isPlaying
                      ? "bg-zinc-800 text-amber-400 hover:bg-zinc-700"
                      : "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20"
                  }`}
                  aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                  )}
                </button>

                {/* Step Forward */}
                <button
                  onClick={handleStepForward}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
                  aria-label="Step forward"
                  title="Step Forward"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>

                {/* Speed Toggle */}
                <button
                  onClick={() => setPlaybackSpeed((s) => (s === 1000 ? 400 : s === 400 ? 1800 : 1000))}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-all font-mono text-[10px] uppercase font-bold tracking-tight"
                  title="Adjust Speed"
                >
                  {playbackSpeed === 1000 ? "1.0x" : playbackSpeed === 400 ? "2.0x" : "0.5x"}
                </button>
              </div>

            </div>

            {/* PANEL 3: Right Panel (Sync Code Editor) - 4 cols */}
            <div className="lg:col-span-4 bg-zinc-950 border-l border-zinc-900 flex flex-col">
              
              {/* Code Panel Header */}
              <div className="bg-zinc-950/80 px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                  SYNCHRONIZED DEBUGLOG
                </span>
                <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-0.5 border border-blue-900/50 rounded font-mono">
                  Python 3
                </span>
              </div>

              {/* Code lines container */}
              <div className="p-4 flex-1 flex flex-col font-mono text-xs overflow-x-auto select-none gap-0.5 justify-center">
                {currentCode.map((line, idx) => {
                  const isActive = idx === currentLine;
                  
                  return (
                    <div
                      key={idx}
                      className={`flex items-center py-1 px-2 rounded transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-950 to-blue-900/10 border-l-[3px] border-blue-500 text-zinc-100 pl-1"
                          : "text-zinc-500 border-l-[3px] border-transparent"
                      }`}
                    >
                      {/* Line Number */}
                      <span className="w-5 text-right mr-4 text-[10px] text-zinc-700">
                        {idx + 1}
                      </span>
                      
                      {/* Code line content */}
                      <pre className="flex-1 whitespace-pre pr-4">
                        {line}
                      </pre>

                      {/* Active Indicator Arrow */}
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-pulse hidden sm:inline-block" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Queue / Visited Tracker Debug Panel for Graph */}
              {mode === "graph" && (
                <div className="p-4 bg-zinc-950 border-t border-zinc-900 font-mono text-xs flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Active Queue</span>
                    <span className="text-purple-400 font-bold">
                      [{currentGraphFrame.queue.join(", ")}]
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Visited Set</span>
                    <span className="text-emerald-400">
                      {"{"}{currentGraphFrame.visited.join(", ")}{"}"}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* PANEL 4: Bottom Panel (Narration Ticker Banner) */}
          <div className="bg-zinc-950/90 border-t border-zinc-900 px-6 py-4.5 flex items-start gap-4">
            {/* Ticker Icon */}
            <div className="bg-blue-600/15 border border-blue-500/30 p-2 rounded-xl text-blue-400 flex-shrink-0 mt-0.5 animate-pulse">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </div>
            {/* Ticker Sentence */}
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Narrator Execution Feed
              </span>
              <p className="text-sm font-mono text-zinc-200 transition-all duration-300">
                {currentNarration}
              </p>
            </div>
          </div>

        </div>

        {/* --- DYNAMIC GRID FEATURE CARDS (Aesthetics Polish) --- */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          
          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 shadow-md">
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-500 p-2.5 rounded-xl w-fit mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              11 Structured Renderers
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Supports live, fully editable visual cards for arrays, graphs, BSTs, heaps, hash maps, tries, linked lists, stacks, queues, and deques.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 shadow-md">
            <div className="bg-purple-500/10 border border-purple-500/20 text-purple-500 p-2.5 rounded-xl w-fit mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              97+ Built-in Algorithms
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Wired up with ready-to-run operations across sorting, shortest paths, tree balancing, DP grids (LCS, Knapsack), and array manipulations.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 shadow-md">
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-2.5 rounded-xl w-fit mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l5.904-.813a2 2 0 001.414-.586l5-5a2 2 0 00-2.828-2.828l-5 5a2 2 0 00-.586 1.414z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.5l2.5 2.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Mixed Vector Drawing Overlay
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Annotate visualizations in real-time. Annotations support pressure-sensitive freehand pens, shapes, text layers, and PDF/PPTX imports.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
