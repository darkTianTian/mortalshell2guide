"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import {
  mapCategories,
  mapMarkers,
  type MapCategory,
  type MapMarker,
} from "./map-data";
import styles from "./map.module.css";

const STORAGE_KEY = "shellbound-map-found-v1";
const MIN_SCALE = 1;
const MAX_SCALE = 3.5;

type ViewState = { scale: number; x: number; y: number };

const readFound = () => {
  if (typeof window === "undefined") return new Set<string>();
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return new Set(Array.isArray(stored) ? stored.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
};

const persistFound = (found: Set<string>) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...found]));
  } catch {
    // Progress remains available for the current page when storage is unavailable.
  }
};

const markerById = new Map(mapMarkers.map((item) => [item.id, item]));
const categoryById = new Map(mapCategories.map((item) => [item.id, item]));

export default function InteractiveMap() {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<MapCategory>>(
    () => new Set(mapCategories.map((item) => item.id)),
  );
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [selectedId, setSelectedId] = useState("marrow-keep");
  const [found, setFound] = useState<Set<string>>(() => new Set());
  const [view, setView] = useState<ViewState>({ scale: 1, x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number } | null>(null);

  const selected = markerById.get(selectedId) ?? mapMarkers[0];
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setFound(readFound()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const markerId = new URLSearchParams(window.location.search).get("marker");
    const linkedMarker = markerId ? markerById.get(markerId) : undefined;
    if (!linkedMarker) return;
    const frame = window.requestAnimationFrame(() => {
      setSelectedId(linkedMarker.id);
      if (linkedMarker.spoiler === "major") setShowSpoilers(true);
      const viewport = viewportRef.current;
      if (viewport) {
        const { width, height } = viewport.getBoundingClientRect();
        const scale = 1.7;
        const rawX = width / 2 - (linkedMarker.x / 100) * width * scale;
        const rawY = height / 2 - (linkedMarker.y / 100) * height * scale;
        setView({
          scale,
          x: Math.min(0, Math.max(-(scale - 1) * width, rawX)),
          y: Math.min(0, Math.max(-(scale - 1) * height, rawY)),
        });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const visibleMarkers = useMemo(
    () =>
      mapMarkers.filter((item) => {
        if (!activeCategories.has(item.category)) return false;
        if (item.spoiler === "major" && !showSpoilers) return false;
        if (!normalizedQuery) return true;
        return [item.title, item.region, item.summary, item.routeHint]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    [activeCategories, normalizedQuery, showSpoilers],
  );

  const clampView = (next: ViewState): ViewState => {
    const viewport = viewportRef.current;
    if (!viewport) return next;
    const { width, height } = viewport.getBoundingClientRect();
    const minX = -(next.scale - 1) * width;
    const minY = -(next.scale - 1) * height;
    return {
      scale: next.scale,
      x: Math.min(0, Math.max(minX, next.x)),
      y: Math.min(0, Math.max(minY, next.y)),
    };
  };

  const zoomAt = (nextScale: number, centerX?: number, centerY?: number) => {
    setView((current) => {
      const viewport = viewportRef.current;
      if (!viewport) return current;
      const { width, height } = viewport.getBoundingClientRect();
      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
      const x = centerX ?? width / 2;
      const y = centerY ?? height / 2;
      const ratio = scale / current.scale;
      return clampView({
        scale,
        x: x - (x - current.x) * ratio,
        y: y - (y - current.y) * ratio,
      });
    });
  };

  const focusMarker = (item: MapMarker) => {
    setSelectedId(item.id);
    const viewport = viewportRef.current;
    if (!viewport) return;
    const { width, height } = viewport.getBoundingClientRect();
    const scale = Math.max(view.scale, 1.7);
    setView(
      clampView({
        scale,
        x: width / 2 - (item.x / 100) * width * scale,
        y: height / 2 - (item.y / 100) * height * scale,
      }),
    );
  };

  const toggleCategory = (category: MapCategory) => {
    setActiveCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const toggleFound = (id: string) => {
    setFound((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persistFound(next);
      return next;
    });
  };

  const handleSpoilers = () => {
    setShowSpoilers((current) => {
      const next = !current;
      if (!next && selected.spoiler === "major") setSelectedId("marrow-keep");
      return next;
    });
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const delta = event.deltaY < 0 ? 0.25 : -0.25;
    zoomAt(view.scale + delta, event.clientX - rect.left, event.clientY - rect.top);
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: view.x,
      originY: view.y,
    };
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || view.scale === 1) return;
    setView(
      clampView({
        scale: view.scale,
        x: drag.originX + event.clientX - drag.x,
        y: drag.originY + event.clientY - drag.y,
      }),
    );
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  return (
    <section className={styles.workbench} aria-labelledby="interactive-map-title">
      <div className={styles.mapTopbar}>
        <div>
          <p className={styles.kicker}>Launch map // Verified essentials</p>
          <h2 id="interactive-map-title">Find the next thing that changes your run.</h2>
        </div>
        <label className={styles.search}>
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search map markers</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Shell, weapon, region…"
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear map search">×</button>}
        </label>
      </div>

      <div className={styles.filterBar} aria-label="Map marker filters">
        {mapCategories.map((category) => {
          const count = mapMarkers.filter((item) => item.category === category.id).length;
          return (
            <button
              key={category.id}
              type="button"
              className={activeCategories.has(category.id) ? styles.filterActive : ""}
              onClick={() => toggleCategory(category.id)}
              aria-pressed={activeCategories.has(category.id)}
              data-category={category.id}
            >
              <i aria-hidden="true">{category.symbol}</i>
              {category.shortLabel}<span>{count}</span>
            </button>
          );
        })}
        <button
          type="button"
          className={showSpoilers ? styles.spoilersOn : styles.spoilersOff}
          onClick={handleSpoilers}
          aria-pressed={showSpoilers}
        >
          {showSpoilers ? "Boss spoilers shown" : "Reveal boss spoilers"}
        </button>
      </div>

      <div className={styles.mapLayout}>
        <div className={styles.mapColumn}>
          <div
            ref={viewportRef}
            className={styles.viewport}
            onWheel={handleWheel}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            aria-label="Zoomable and pannable Mortal Shell II world map"
          >
            <div
              className={styles.canvas}
              style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }}
            >
              <img
                src="/ms2-interactive-world-map.webp"
                alt="Complete fog-free Mortal Shell II world map showing Fainweald, Nochte, Mammon, the prologue route, and the Unfound Path"
                draggable="false"
              />
              <div className={styles.mapGrid} aria-hidden="true" />
              {visibleMarkers.map((item) => {
                const category = categoryById.get(item.category);
                const isSelected = item.id === selected.id;
                const isFound = found.has(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.pin} ${isSelected ? styles.pinSelected : ""} ${isFound ? styles.pinFound : ""}`}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    data-category={item.category}
                    aria-label={`${item.title}, ${category?.label ?? item.category}${isFound ? ", found" : ""}`}
                    aria-pressed={isSelected}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <i aria-hidden="true">{isFound ? "✓" : category?.symbol}</i>
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.mapControls} aria-label="Map zoom controls" onPointerDown={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => zoomAt(view.scale + 0.35)} aria-label="Zoom in">+</button>
              <output aria-live="polite">{Math.round(view.scale * 100)}%</output>
              <button type="button" onClick={() => zoomAt(view.scale - 0.35)} aria-label="Zoom out">−</button>
              <button type="button" onClick={() => setView({ scale: 1, x: 0, y: 0 })}>Reset</button>
            </div>

            <div className={styles.mapStatus}>
              <span>{visibleMarkers.length} visible</span>
              <span>{found.size}/{mapMarkers.length} found</span>
            </div>
          </div>
          <p className={styles.mapCaption}>
            Drag to pan · wheel or controls to zoom · boss and Corrupted Gate pins stay hidden until spoilers are revealed.
          </p>
        </div>

        <aside className={styles.sidePanel} aria-live="polite">
          <article className={styles.detailCard}>
            <div className={styles.detailTopline}>
              <span data-category={selected.category}>{categoryById.get(selected.category)?.label}</span>
              <span>{selected.pinType ?? "Overworld"}</span>
            </div>
            <h3>{selected.title}</h3>
            <p className={styles.region}>{selected.region}</p>
            <p>{selected.summary}</p>
            <div className={styles.routeHint}>
              <span>Route note</span>
              <p>{selected.routeHint}</p>
            </div>
            <div className={styles.detailActions}>
              <button type="button" onClick={() => toggleFound(selected.id)}>
                {found.has(selected.id) ? "✓ Marked found" : "Mark as found"}
              </button>
              {selected.relatedGuide && <a href={`/guides/${selected.relatedGuide}`}>Open full guide ↗</a>}
            </div>
          </article>

          <div className={styles.resultHeader}>
            <span>Visible markers</span>
            <strong>{String(visibleMarkers.length).padStart(2, "0")}</strong>
          </div>
          <div className={styles.resultList}>
            {visibleMarkers.length ? visibleMarkers.map((item) => (
              <div className={item.id === selected.id ? styles.resultSelected : ""} key={item.id}>
                <button type="button" onClick={() => focusMarker(item)}>
                  <i data-category={item.category} aria-hidden="true">{categoryById.get(item.category)?.symbol}</i>
                  <span><strong>{item.title}</strong><small>{item.region}</small></span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFound(item.id)}
                  aria-label={`${found.has(item.id) ? "Unmark" : "Mark"} ${item.title} as found`}
                  className={found.has(item.id) ? styles.resultFound : ""}
                >
                  {found.has(item.id) ? "✓" : "○"}
                </button>
              </div>
            )) : (
              <div className={styles.emptyResult} role="status">
                <strong>No visible marker.</strong>
                <p>Clear the search, turn a category back on, or reveal boss spoilers.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
