import { mkdir, writeFile } from "node:fs/promises";
import { guideArticles } from "../app/guides/articles";
import { getGuideEnhancement } from "../app/guides/enhancements";
import { mapCategories, mapEditorialSections, mapMarkers, mapPageMeta } from "../app/map/map-data";

type Locale = "zh-CN" | "zh-Hant";
type Kind = "AREA" | "BOSS" | "ITEM" | "PERSON" | "SYSTEM" | "WEAPON";
type Term = { en: string; kind: Kind; localized?: Partial<Record<Locale, string>> };

const official: Term[] = [
  { en: "Mortal Shell II", kind: "SYSTEM", localized: { "zh-CN": "致命躯壳 II", "zh-Hant": "Mortal Shell II" } },
  { en: "Mortal Shell 2", kind: "SYSTEM", localized: { "zh-CN": "致命躯壳 II", "zh-Hant": "Mortal Shell II" } },
  { en: "mortal shell ii", kind: "SYSTEM", localized: { "zh-CN": "致命躯壳 II", "zh-Hant": "Mortal Shell II" } },
  { en: "mortal shell 2", kind: "SYSTEM", localized: { "zh-CN": "致命躯壳 II", "zh-Hant": "Mortal Shell II" } },
  { en: "Harbinger", kind: "PERSON", localized: { "zh-CN": "先驱", "zh-Hant": "破滅者" } },
  { en: "Shells", kind: "SYSTEM", localized: { "zh-CN": "躯壳", "zh-Hant": "軀殼" } },
  { en: "Shell", kind: "SYSTEM", localized: { "zh-CN": "躯壳", "zh-Hant": "軀殼" } },
  { en: "Beacons", kind: "SYSTEM", localized: { "zh-CN": "信标", "zh-Hant": "燈塔" } },
  { en: "Beacon", kind: "SYSTEM", localized: { "zh-CN": "信标", "zh-Hant": "燈塔" } },
  { en: "Dungeons", kind: "SYSTEM", localized: { "zh-CN": "地牢", "zh-Hant": "地牢" } },
  { en: "Dungeon", kind: "SYSTEM", localized: { "zh-CN": "地牢", "zh-Hant": "地牢" } },
  { en: "Marrow Keep", kind: "AREA", localized: { "zh-CN": "髓堡", "zh-Hant": "髓堡" } },
  { en: "Lady of the Woods", kind: "BOSS", localized: { "zh-CN": "林中女士", "zh-Hant": "林中女士" } },
  { en: "Tiel", kind: "PERSON", localized: { "zh-CN": "提尔" } },
];

const systems = [
  "Balance Patch 1", "Hotfix 2", "New Game Plus", "Night Mode", "Shell Points", "Sidearms",
  "Sidearm", "Tarstones", "Tarstone", "Glimpses", "Glimpse", "Gloom", "Resolve", "Harden",
  "Guard", "Riposte", "Bond", "Ova", "Ovum", "Send Ova", "Slayer Seal", "Vatra's Seal",
  "Infinite Seal", "PS5 Pro", "PS5", "Xbox Series X|S", "Steam", "NG+",
];
const named = [
  "Sester Secundus", "Sester Genessa", "Sester's Censer", "The Convert", "Great Arbiter of Flesh",
  "Tarblighted Shepherd", "Bloodcursed Lithopod", "Subjugated Guardian", "Prophet of Profane Infinities",
  "Twin Sesters", "The Warden", "Vellen", "Franz", "Ruk", "Merrick", "Thestus", "Harros", "Zhirelle",
  "Gorf", "Hilga", "Vlas", "Baghead", "Mether's Breath", "Faithful Doubles", "Stray Doubles",
  "Shadow Dash", "Biosampler", "Miracle", "Chaos", "Pain", "Heat", "Overheat", "Bloodcurse", "Frostfire",
  "Corrupted Gates", "Corrupted Gate", "Shellkeeper", "Shell Keeper",
  "Tiel the Acolyte", "Proxima the Broodseeker", "Eredrim the Venerable", "Gragu the Insatiable",
  "Smert the Apostate", "Lazlo the Justiciar", "Sariel the Endless", "Genessa the Wayward",
  "Proxima", "Eredrim", "Gragu", "Smert", "Lazlo", "Sariel", "Genessa", "Magdalena", "Droeg",
  "Hexapod", "Isaac", "Orrem", "Monolith", "Malborn Offspring", "Zmey", "Zmey the Unbidden",
  "Axe and Dagger", "Great Martyr's Blade", "Great Martyr’s Blade", "Veteran's Battle Axe",
  "Magdalena's Memento", "Magdalena’s Memento", "Lost Clotstone", "Captive's Scabstone",
  "Captive’s Scabstone", "Conqueror's Reward", "Conqueror’s Reward", "Hexapod Core",
  "Scholar's Wormstone", "Scholar’s Wormstone", "Rash Memory", "Heart of Vatra", "My Brether",
  "Gloombound Flame", "Mether's Pulse", "Mether’s Pulse", "Blackwater Key", "Blackmarrow Keys",
  "Obsidian Shell", "Devout Edition", "Revered Edition", "Standard Edition",
];
const kinds: Record<string, Kind> = { hub: "AREA", shell: "PERSON", weapon: "WEAPON", sidearm: "WEAPON", tarstone: "ITEM", fragment: "ITEM", key: "ITEM", npc: "PERSON", dungeon: "AREA", night: "AREA", upgrade: "ITEM", gate: "AREA", boss: "BOSS" };
const markerTerms: Term[] = mapMarkers.map((m) => ({ en: m.title, kind: kinds[m.category] ?? "ITEM" }));
const regionTerms: Term[] = [...new Set(mapMarkers.map((marker) => marker.region))].map((en) => ({ en, kind: "AREA" }));
const terms = [...official, ...markerTerms, ...regionTerms, ...systems.map((en) => ({ en, kind: "SYSTEM" as const })), ...named.map((en) => ({ en, kind: "ITEM" as const }))]
  .filter((term, index, all) => all.findIndex((candidate) => candidate.en === term.en) === index)
  .toSorted((a, b) => b.en.length - a.en.length);
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = new RegExp(terms.map((term) => escape(term.en)).join("|"), "g");
const tokenByTerm = new Map(terms.map((term, index) => [term.en, `__${term.kind}${String(index).padStart(4, "0")}__`]));
const termByToken = new Map(terms.map((term) => [tokenByTerm.get(term.en)!, term]));
const protect = (value: string) => value.replace(pattern, (match) => tokenByTerm.get(match) ?? match);
const restore = (value: string, locale: Locale) => {
  let output = value;
  for (const [token, term] of termByToken) output = output.replaceAll(token, term.localized?.[locale] ?? term.en);
  return output;
};

const entries: Array<[string, string]> = [];
const add = (key: string, value?: string) => { if (value) entries.push([key, value]); };
for (const article of guideArticles) {
  const key = `guide.${article.slug}`;
  for (const [field, value] of Object.entries({ title: article.title, description: article.description, heading: article.heading, eyebrow: article.eyebrow, category: article.category, keyword: article.keyword, spoiler: article.spoiler, imageAlt: article.imageAlt, quickAnswer: article.quickAnswer })) add(`${key}.${field}`, value);
  article.intro.forEach((value, index) => add(`${key}.intro.${index}`, value));
  article.sections.forEach((section, sectionIndex) => {
    add(`${key}.section.${sectionIndex}.heading`, section.heading);
    section.paragraphs.forEach((value, index) => add(`${key}.section.${sectionIndex}.paragraph.${index}`, value));
    section.bullets?.forEach((value, index) => add(`${key}.section.${sectionIndex}.bullet.${index}`, value));
  });
  const extra = getGuideEnhancement(article);
  for (const [field, value] of Object.entries({ start: extra.start, goal: extra.goal, result: extra.result, risk: extra.risk })) add(`${key}.enhancement.${field}`, value);
  extra.faqs.forEach((faq, index) => { add(`${key}.faq.${index}.question`, faq.question); add(`${key}.faq.${index}.answer`, faq.answer); });
}
for (const [field, value] of Object.entries({ title: mapPageMeta.title, description: mapPageMeta.description, heading: mapPageMeta.heading })) add(`map.meta.${field}`, value);
mapCategories.forEach((category) => { add(`map.category.${category.id}.label`, category.label); add(`map.category.${category.id}.shortLabel`, category.shortLabel); });
mapMarkers.forEach((marker) => { for (const [field, value] of Object.entries({ title: marker.title, region: marker.region, summary: marker.summary, routeHint: marker.routeHint, pinType: marker.pinType })) add(`map.marker.${marker.id}.${field}`, value); });
mapEditorialSections.forEach((section, sectionIndex) => { add(`map.editorial.${sectionIndex}.heading`, section.heading); section.paragraphs.forEach((value, index) => add(`map.editorial.${sectionIndex}.paragraph.${index}`, value)); });

async function request(text: string, target: string, attempt = 1): Promise<string> {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.search = new URLSearchParams({ client: "gtx", sl: "en", tl: target, dt: "t", q: text }).toString();
  const response = await fetch(url);
  if (!response.ok) { if (attempt < 8) { await new Promise((resolve) => setTimeout(resolve, attempt * 1500)); return request(text, target, attempt + 1); } throw new Error(`Translation failed ${response.status}`); }
  const body = await response.json() as [Array<[string]>];
  return body[0].map((segment) => segment[0]).join("");
}
async function translate(locale: Locale) {
  const output: Record<string, string> = {};
  let cursor = 0;
  async function worker() {
    while (cursor < entries.length) {
      const entryIndex = cursor++;
      const [key, value] = entries[entryIndex];
      const directTerm = terms.find((term) => term.en === value);
      if (directTerm) {
        output[key] = directTerm.localized?.[locale] ?? directTerm.en;
        continue;
      }
      const target = locale === "zh-Hant" ? "zh-TW" : "zh-CN";
      const protectedValue = protect(value);
      let translated = (await request(protectedValue, target)).replace(/\p{Cf}/gu, "").trim();
      const expected = protectedValue.match(/__(?:AREA|BOSS|ITEM|PERSON|SYSTEM|WEAPON)\d+__/g) ?? [];
      const actual = translated.match(/__(?:AREA|BOSS|ITEM|PERSON|SYSTEM|WEAPON)\d+__/g) ?? [];
      if (expected.length !== actual.length || expected.some((token, index) => token !== actual[index])) {
        const parts = protectedValue.split(/(__(?:AREA|BOSS|ITEM|PERSON|SYSTEM|WEAPON)\d+__)/g).filter(Boolean);
        const translatedParts = await Promise.all(parts.map(async (part) => {
          if (termByToken.has(part)) return termByToken.get(part)!.localized?.[locale] ?? termByToken.get(part)!.en;
          return request(part, target);
        }));
        translated = translatedParts.join("");
        output[key] = translated.trim();
        continue;
      }
      const restored = restore(translated, locale);
      if (/__(?:AREA|BOSS|ITEM|PERSON|SYSTEM|WEAPON)\d+__/.test(restored)) throw new Error(`Unresolved term in ${locale}:${key}: ${restored}`);
      output[key] = restored;
    }
  }
  await Promise.all(Array.from({ length: 6 }, () => worker()));
  return Object.fromEntries(Object.entries(output).toSorted(([a], [b]) => a.localeCompare(b)));
}
const directory = new URL("../app/i18n/generated/", import.meta.url);
await mkdir(directory, { recursive: true });
const selectedLocales = process.env.LOCALE ? [process.env.LOCALE as Locale] : ["zh-CN", "zh-Hant"] as const;
for (const locale of selectedLocales) {
  const output = await translate(locale);
  const leftovers = Object.values(output).filter((value) => /__(?:AREA|BOSS|ITEM|PERSON|SYSTEM|WEAPON)\d+__/.test(value));
  if (leftovers.length) throw new Error(`${locale} contains ${leftovers.length} unresolved placeholders: ${leftovers.slice(0, 2).join(" | ")}`);
  await writeFile(new URL(`${locale}.json`, directory), `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Generated ${locale}: ${Object.keys(output).length} fields`);
}
