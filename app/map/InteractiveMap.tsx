"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import {
  mapCategories,
  mapMarkers,
  type MapCategory,
  type MapMarker,
  type MapPinType,
} from "./map-data";
import FeedbackLink from "../components/FeedbackLink";
import styles from "./map.module.css";

const STORAGE_KEY = "shellbound-map-found-v1";
const MIN_SCALE = 1;
const MAX_SCALE = 3.5;
const DRAG_THRESHOLD = 6;

type ViewState = { scale: number; x: number; y: number };
type DragState = {
  pointerId: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  moved: boolean;
};

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

const positionStandards: Record<MapPinType, string> = {
  "Exact position": "Cross-checked retail coordinate for the visible overworld point.",
  "Interior anchor": "Verified interior or dungeon cluster; follow the route note for the room-level pickup.",
  "Route anchor": "Verified route start or quest-state location, not a claim that the reward lies on this pixel.",
};

function MapPinTypeCounter(markers: MapMarker[]) {
  const counts: Record<MapPinType, number> = {
    "Exact position": 0,
    "Interior anchor": 0,
    "Route anchor": 0,
  };
  for (const item of markers) counts[item.pinType] += 1;
  return counts;
}

export type InteractiveMapCopy = {
  kicker: string;
  title: string;
  searchPlaceholder: string;
  clearSearch: string;
  revealSpoilers: string;
  hideSpoilers: string;
  positionStandard: string;
  exactPosition: string;
  interiorAnchor: string;
  routeAnchor: string;
  exactDescription: string;
  interiorDescription: string;
  routeDescription: string;
  dragCaption: string;
  visible: string;
  found: string;
  routeNote: string;
  markFound: string;
  markedFound: string;
  openGuide: string;
  visibleMarkers: string;
  noMarker: string;
  noMarkerHelp: string;
  reset: string;
};

const defaultCopy: InteractiveMapCopy = {
  kicker: "Launch map // Verified essentials", title: "Find the next thing that changes your run.", searchPlaceholder: "Search Shell, weapon, region…", clearSearch: "Clear map search",
  revealSpoilers: "Reveal boss spoilers", hideSpoilers: "Boss spoilers shown", positionStandard: "Position standard", exactPosition: "Exact position", interiorAnchor: "Interior anchor", routeAnchor: "Route anchor",
  exactDescription: positionStandards["Exact position"], interiorDescription: positionStandards["Interior anchor"], routeDescription: positionStandards["Route anchor"],
  dragCaption: "Drag to pan · wheel or controls to zoom · detail badges distinguish exact coordinates from interior and route anchors.", visible: "visible", found: "found", routeNote: "Route note",
  markFound: "Mark as found", markedFound: "✓ Marked found", openGuide: "Open full guide ↗", visibleMarkers: "Visible markers", noMarker: "No visible marker.", noMarkerHelp: "Clear the search, turn a category back on, or reveal boss spoilers.", reset: "Reset",
};

export default function InteractiveMap({ markers = mapMarkers, categories = mapCategories, localePrefix = "", copy }: {
  markers?: MapMarker[];
  categories?: typeof mapCategories;
  localePrefix?: string;
  copy?: Partial<InteractiveMapCopy>;
}) {
  const labels = { ...defaultCopy, ...copy };
  const markerById = useMemo(() => new Map(markers.map((item) => [item.id, item])), [markers]);
  const categoryById = useMemo(() => new Map(categories.map((item) => [item.id, item])), [categories]);
  const allCategoryIds = useMemo(() => categories.map((item) => item.id), [categories]);
  const positionCounts = useMemo(() => MapPinTypeCounter(markers), [markers]);
  const pinTypeLabels: Record<MapPinType, string> = { "Exact position": labels.exactPosition, "Interior anchor": labels.interiorAnchor, "Route anchor": labels.routeAnchor };
  const pinTypeDescriptions: Record<MapPinType, string> = { "Exact position": labels.exactDescription, "Interior anchor": labels.interiorDescription, "Route anchor": labels.routeDescription };
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<MapCategory>>(
    () => new Set(allCategoryIds),
  );
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [selectedId, setSelectedId] = useState("marrow-keep");
  const [found, setFound] = useState<Set<string>>(() => new Set());
  const [view, setView] = useState<ViewState>({ scale: 1, x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressPinClickRef = useRef(false);

  const selected = markerById.get(selectedId) ?? markers[0];
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
  }, [markerById]);

  const visibleMarkers = useMemo(
    () =>
      markers.filter((item) => {
        if (!activeCategories.has(item.category)) return false;
        if (item.spoiler === "major" && !showSpoilers) return false;
        if (!normalizedQuery) return true;
        return [item.title, item.region, item.summary, item.routeHint]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    [activeCategories, markers, normalizedQuery, showSpoilers],
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

  const applyCategoryPreset = (categories: MapCategory[]) => {
    setActiveCategories(new Set(categories));
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
    suppressPinClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: view.x,
      originY: view.y,
      moved: false,
    };
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || view.scale === 1) return;
    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(deltaX, deltaY) >= DRAG_THRESHOLD) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setView(
      clampView({
        scale: view.scale,
        x: drag.originX + deltaX,
        y: drag.originY + deltaY,
      }),
    );
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    suppressPinClickRef.current = drag.moved;
    dragRef.current = null;
    if (drag.moved) {
      event.preventDefault();
      window.setTimeout(() => { suppressPinClickRef.current = false; }, 0);
    }
  };

  const selectPin = (event: ReactMouseEvent<HTMLButtonElement>, id: string) => {
    if (suppressPinClickRef.current) {
      event.preventDefault();
      return;
    }
    setSelectedId(id);
  };

  return (
    <section className={styles.workbench} aria-labelledby="interactive-map-title">
      <div className={styles.mapTopbar}>
        <div>
          <p className={styles.kicker}>{labels.kicker}</p>
          <h2 id="interactive-map-title">{labels.title}</h2>
        </div>
        <label className={styles.search}>
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search map markers</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label={labels.clearSearch}>×</button>}
        </label>
      </div>

      <div className={styles.filterToolbar}>
        <div className={styles.filterPresets} role="group" aria-label="Quick marker filter actions">
          <button
            type="button"
            onClick={() => applyCategoryPreset(allCategoryIds)}
            aria-pressed={activeCategories.size === allCategoryIds.length}
          >
            Show all
          </button>
          <button
            type="button"
            onClick={() => applyCategoryPreset([])}
            aria-pressed={activeCategories.size === 0}
          >
            Hide all
          </button>
        </div>
        <span aria-live="polite">{activeCategories.size} / {allCategoryIds.length} categories shown</span>
      </div>

      <div className={styles.filterBar} aria-label="Map marker filters">
        {categories.map((category) => {
          const count = markers.filter((item) => item.category === category.id).length;
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
          {showSpoilers ? labels.hideSpoilers : labels.revealSpoilers}
        </button>
      </div>

      <div className={styles.positionLegend} role="note" aria-label="Map position standards">
        <strong>{labels.positionStandard}</strong>
        {(Object.keys(positionStandards) as MapPinType[]).map((pinType) => (
          <span key={pinType} data-position-type={pinType}>
            <i aria-hidden="true" />
            {pinTypeLabels[pinType]} <b>{positionCounts[pinType]}</b>
          </span>
        ))}
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
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      "--pin-inverse-scale": 1 / view.scale,
                    } as CSSProperties}
                    data-category={item.category}
                    aria-label={`${item.title}, ${category?.label ?? item.category}${isFound ? ", found" : ""}`}
                    aria-pressed={isSelected}
                    onClick={(event) => selectPin(event, item.id)}
                  >
                    <span className={styles.pinScaler}>
                      <span className={styles.pinGlyph}>
                        <i aria-hidden="true">{isFound ? "✓" : category?.symbol}</i>
                        <span className={styles.pinLabel}>{item.title}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={styles.mapControls} aria-label="Map zoom controls" onPointerDown={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => zoomAt(view.scale + 0.35)} aria-label="Zoom in">+</button>
              <output aria-live="polite">{Math.round(view.scale * 100)}%</output>
              <button type="button" onClick={() => zoomAt(view.scale - 0.35)} aria-label="Zoom out">−</button>
              <button type="button" onClick={() => setView({ scale: 1, x: 0, y: 0 })}>{labels.reset}</button>
            </div>

            <div className={styles.mapStatus}>
              <span>{visibleMarkers.length} {labels.visible}</span>
              <span>{found.size}/{markers.length} {labels.found}</span>
            </div>
          </div>
          <p className={styles.mapCaption}>
            {labels.dragCaption}
          </p>
        </div>

        <aside className={styles.sidePanel} aria-live="polite">
          <article className={styles.detailCard}>
            <div className={styles.detailTopline}>
              <span data-category={selected.category}>{categoryById.get(selected.category)?.label}</span>
              <span>{pinTypeLabels[selected.pinType]}</span>
            </div>
            <h3>{selected.title}</h3>
            <p className={styles.region}>{selected.region}</p>
            <p>{selected.summary}</p>
            <div className={styles.routeHint}>
              <span>{labels.routeNote}</span>
              <p>{selected.routeHint}</p>
            </div>
            <div className={styles.positionStandard} data-position-type={selected.pinType}>
              <span>{labels.positionStandard}</span>
              <strong>{pinTypeLabels[selected.pinType]}</strong>
              <p>{pinTypeDescriptions[selected.pinType]}</p>
            </div>
            <div className={styles.detailActions}>
              <button type="button" onClick={() => toggleFound(selected.id)}>
                {found.has(selected.id) ? labels.markedFound : labels.markFound}
              </button>
              {selected.relatedGuide && <a href={`${localePrefix}/guides/${selected.relatedGuide}`}>{labels.openGuide}</a>}
              <FeedbackLink context={`Map marker: ${selected.title} (${selected.id})`}>
                Report this marker ↗
              </FeedbackLink>
            </div>
          </article>

          <div className={styles.resultHeader}>
            <span>{labels.visibleMarkers}</span>
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
                <strong>{labels.noMarker}</strong>
                <p>{labels.noMarkerHelp}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
