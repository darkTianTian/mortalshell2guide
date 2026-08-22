export const MAP_UPDATED_AT = "2026-08-22";
export const MAP_POSITION_AUDIT_AT = "2026-08-22";

export const mapPageMeta = {
  title: "Mortal Shell 2 Interactive Map: Shells, Gear & Bosses",
  description:
    "Use our Mortal Shell 2 interactive map to find all Shells, primary weapons, Sidearms, Corrupted Gates, bosses, fragments, keys, NPCs, and useful hubs.",
  heading: "The Undermether, charted",
  canonical: "https://mortalshell2guide.org/map",
};

export type MapCategory =
  | "hub"
  | "shell"
  | "weapon"
  | "sidearm"
  | "tarstone"
  | "fragment"
  | "key"
  | "npc"
  | "dungeon"
  | "night"
  | "upgrade"
  | "gate"
  | "boss";

export type MapSourceId =
  | "official"
  | "base-map"
  | "gamer-guides"
  | "map-community"
  | "shells"
  | "weapons"
  | "tarstones"
  | "bosses"
  | "keys"
  | "fragments"
  | "sidearm-routes"
  | "npc-routes"
  | "dungeon-routes"
  | "night-routes"
  | "upgrade-routes"
  | "blackmarrow";

export type MapMarker = {
  id: string;
  title: string;
  category: MapCategory;
  region: string;
  summary: string;
  routeHint: string;
  x: number;
  y: number;
  sourceIds: MapSourceId[];
  relatedGuide?: string;
  spoiler?: "major";
  pinType: "Exact position" | "Interior anchor" | "Route anchor";
};

export type MapPinType = MapMarker["pinType"];

export const mapCategories: Array<{
  id: MapCategory;
  label: string;
  shortLabel: string;
  symbol: string;
}> = [
  { id: "hub", label: "Hubs & services", shortLabel: "Hubs", symbol: "H" },
  { id: "shell", label: "Permanent Shells", shortLabel: "Shells", symbol: "S" },
  { id: "weapon", label: "Primary weapons", shortLabel: "Weapons", symbol: "W" },
  { id: "sidearm", label: "Sidearms", shortLabel: "Sidearms", symbol: "R" },
  { id: "tarstone", label: "Key Tarstones", shortLabel: "Stones", symbol: "T" },
  { id: "fragment", label: "Map fragments", shortLabel: "Fragments", symbol: "F" },
  { id: "key", label: "Progression keys", shortLabel: "Keys", symbol: "K" },
  { id: "npc", label: "NPC routes", shortLabel: "NPCs", symbol: "N" },
  { id: "dungeon", label: "Optional dungeons", shortLabel: "Dungeons", symbol: "D" },
  { id: "night", label: "Night Mode", shortLabel: "Night", symbol: "M" },
  { id: "upgrade", label: "Tarforge upgrades", shortLabel: "Upgrades", symbol: "U" },
  { id: "gate", label: "Corrupted Gates", shortLabel: "Gates", symbol: "G" },
  { id: "boss", label: "Major bosses", shortLabel: "Bosses", symbol: "B" },
];

export const mapSources: Record<
  MapSourceId,
  { label: string; url: string; type: "Official" | "Editorial" | "Community"; note: string }
> = {
  official: {
    label: "Mortal Shell II official site",
    url: "https://mortalshell.com/",
    type: "Official",
    note: "World structure, Shell, weapon, dungeon, and Ova context.",
  },
  "base-map": {
    label: "Fog-free world map image reference",
    url: "https://mortalshell2.org/map/",
    type: "Community",
    note: "Complete game-map image used as the visual base; underlying map art remains property of the game rights holders.",
  },
  "gamer-guides": {
    label: "GamerGuides launch-build interactive map",
    url: "https://www.gamerguides.com/mortal-shell-ii/maps/fallgrim",
    type: "Editorial",
    note: "Current retail marker coordinates and category coverage, rechecked August 22, 2026.",
  },
  "map-community": {
    label: "GamerGuides map release and scope notes",
    url: "https://www.reddit.com/r/MortalShell/comments/1vqw0xn/mortal_shell_2_interactive_map_complete_100_guide/",
    type: "Community",
    note: "Confirms whole-game scope and that launch placements changed after beta.",
  },
  shells: {
    label: "GamesRadar launch Shell roster and unlock guide",
    url: "https://www.gamesradar.com/games/rpg/mortal-shell-2-shells/",
    type: "Editorial",
    note: "Permanent roster, names, and unlock-system cross-check.",
  },
  weapons: {
    label: "NerdsChalk retail weapon location guide",
    url: "https://nerdschalk.com/mortal-shell-2-all-weapon-locations-for-scythe-axatana-hammer-and-needle/",
    type: "Editorial",
    note: "Retail locations for the later primary weapons.",
  },
  tarstones: {
    label: "GamesRadar launch Tarstone guide",
    url: "https://www.gamesradar.com/games/rpg/mortal-shell-2-tarstones/",
    type: "Editorial",
    note: "Launch names, categories, effects, and useful early routes.",
  },
  bosses: {
    label: "Complete retail major-boss route",
    url: "https://ccstartup.com/blog/2026/08/17/all-bosses-in-mortal-shell-2-and-how-to-beat-them/",
    type: "Editorial",
    note: "Boss roster, dungeon pairings, and endgame sequence.",
  },
  keys: {
    label: "QM Games retail Chapel and Crypt Key route",
    url: "https://quoramarketing.com/mortal-shell-2-how-to-get-and-use-the-chapel-key-crypt-key/",
    type: "Editorial",
    note: "Key purpose and destination cross-check.",
  },
  fragments: {
    label: "Patch Crazy all 11 map-fragment routes",
    url: "https://patchcrazy.co.uk/all-11-map-fragment-locations-in-mortal-shell-2/",
    type: "Editorial",
    note: "Five Fainweald and six Mammon fragment routes, checked against the current map count.",
  },
  "sidearm-routes": {
    label: "Current eight-Sidearm locations and roles",
    url: "https://nerdschalk.com/all-mortal-shell-2-sidearms-and-how-they-work/",
    type: "Editorial",
    note: "Retail eight-item roster, combat roles, and location cross-checks.",
  },
  "npc-routes": {
    label: "Current NPC and quest-character database",
    url: "https://nerdschalk.com/all-mortal-shell-2-npcs-and-quest-characters/",
    type: "Editorial",
    note: "Retail NPC names and verified encounter states; incomplete quests remain labeled as route anchors.",
  },
  "dungeon-routes": {
    label: "Retail dungeon and hidden-area index",
    url: "https://nerdschalk.com/all-mortal-shell-2-dungeons-and-hidden-areas/",
    type: "Editorial",
    note: "Named dungeon regions and current entrance or reward guidance.",
  },
  "night-routes": {
    label: "Night Mode secrets and merchant routes",
    url: "https://allthings.how/mortal-shell-2-how-to-turn-on-night-mode-with-the-gloombound-flame/",
    type: "Editorial",
    note: "Launch Night Mode activation, exclusive areas, and key sources.",
  },
  "upgrade-routes": {
    label: "All five Tarforge components",
    url: "https://nerdschalk.com/mortal-shell-2-tarforge-upgrade-items-locations/",
    type: "Editorial",
    note: "Retail component functions and route landmarks, cross-checked August 22, 2026.",
  },
  blackmarrow: {
    label: "Blackmarrow Key and Shade-chest reports",
    url: "https://www.reddit.com/r/MortalShell/comments/1vqxyai/secret_area/",
    type: "Community",
    note: "Current Marrow Keep cosmetic-chest use and hidden-route reports; similar key names remain separate.",
  },
};

const MAP_MIN = 6800;
const MAP_MAX = 13600;
const MAP_SPAN = MAP_MAX - MAP_MIN;
const toPercent = (value: number) =>
  Number((Math.min(99, Math.max(1, ((value - MAP_MIN) / MAP_SPAN) * 100))).toFixed(3));

const marker = (
  input: Omit<MapMarker, "x" | "y" | "pinType"> & {
    point: readonly [number, number];
    pinType?: MapPinType;
  },
): MapMarker => {
  const { point, ...rest } = input;
  return {
    ...rest,
    pinType: rest.pinType ?? "Exact position",
    x: toPercent(point[0]),
    y: toPercent(point[1]),
  };
};

const common = {
  world: ["official", "gamer-guides", "map-community"] as MapSourceId[],
  shells: ["official", "gamer-guides", "shells"] as MapSourceId[],
  weapons: ["official", "gamer-guides", "weapons"] as MapSourceId[],
  stones: ["official", "gamer-guides", "tarstones"] as MapSourceId[],
  bosses: ["official", "gamer-guides", "bosses"] as MapSourceId[],
  keys: ["official", "gamer-guides", "keys"] as MapSourceId[],
  fragments: ["gamer-guides", "fragments", "map-community"] as MapSourceId[],
  sidearms: ["official", "gamer-guides", "sidearm-routes"] as MapSourceId[],
  npcs: ["official", "gamer-guides", "npc-routes"] as MapSourceId[],
  dungeons: ["official", "gamer-guides", "dungeon-routes"] as MapSourceId[],
  night: ["official", "night-routes", "map-community"] as MapSourceId[],
  upgrades: ["official", "gamer-guides", "upgrade-routes"] as MapSourceId[],
  blackmarrow: ["gamer-guides", "blackmarrow", "night-routes"] as MapSourceId[],
};

export const mapMarkers: MapMarker[] = [
  marker({ id: "marrow-keep", title: "Marrow Keep", category: "hub", region: "Central Undermether", summary: "The primary service hub, with Shell progression and the Tarforge close together.", routeHint: "Use this as the center of the map and the safest point for comparing routes into Fainweald, Nochte, and Mammon.", point: [9719, 10020], sourceIds: common.world, relatedGuide: "walkthrough" }),
  marker({ id: "tarforge", title: "Tarforge", category: "hub", region: "Marrow Keep", summary: "Upgrade weapons and manage the materials that define a finished loadout.", routeHint: "Inside the Marrow Keep service cluster. Return before major dungeons instead of carrying unused upgrade materials.", point: [9858, 9876], sourceIds: common.world, relatedGuide: "weapon-tier-list" }),
  marker({ id: "widows-overlook", title: "Widow's Overlook", category: "hub", region: "Fainweald", summary: "A high-value Fainweald navigation anchor and a useful start for several fragment routes.", routeHint: "Orient from the overlook before entering the western and southern branches; several paths look similar at ground level.", point: [9948, 8818], sourceIds: common.world, relatedGuide: "beacons" }),
  marker({ id: "mushroom-village-gate", title: "Mushroom Village Gate", category: "hub", region: "Fainweald", summary: "The most practical anchor for Mushroom Village, Tiel, nearby gear, and Glutted Mire.", routeHint: "Clear and remember this approach before pushing deeper into the village network.", point: [10882, 9092], sourceIds: common.world, relatedGuide: "walkthrough" }),
  marker({ id: "one-legged-wolf", title: "One-Legged Wolf", category: "hub", region: "Fainweald", summary: "A tavern landmark that makes the northern Fainweald branches easier to describe and revisit.", routeHint: "Use the tavern as the stable start for the Citadel of Penance and one Fainweald fragment route.", point: [11021, 8766], sourceIds: common.world, relatedGuide: "beacons" }),
  marker({ id: "outskirts-mammon", title: "Outskirts of Mammon", category: "hub", region: "Mammon", summary: "The main staging point for Mammon routes and the six regional map fragments.", routeHint: "Treat this as the reset point before choosing the Road to Absolution or the southwest bridge network.", point: [9935, 10593], sourceIds: common.world, relatedGuide: "walkthrough" }),
  marker({ id: "sesters-gate", title: "Sester's Gate", category: "hub", region: "Mammon", summary: "A late-region landmark close to Shell, weapon, and Conquered Temple objectives.", routeHint: "Use this gate to separate the temple approach from the deeper surrounding routes.", point: [11185, 11525], sourceIds: common.world, relatedGuide: "beacons" }),

  marker({ id: "shell-tiel", title: "Tiel, the Acolyte", category: "shell", region: "Mushroom Village", summary: "A fast permanent Shell whose Shadow tools reward clean dodges and quick re-entry.", routeHint: "Search the Mushroom Village area after securing its gate; this is normally the first permanent Shell route players pursue.", point: [10366, 9132], sourceIds: common.shells, relatedGuide: "tiel" }),
  marker({ id: "shell-eredrim", title: "Eredrim, the Venerable", category: "shell", region: "Citadel of Penance", summary: "The high-durability permanent Shell claimed after the Warden encounter.", routeHint: "Use the Citadel of Penance and Warden route, then continue to the body after the encounter; this marks the interior objective cluster.", point: [9071, 8443], sourceIds: common.shells, relatedGuide: "eredrim", pinType: "Interior anchor" }),
  marker({ id: "shell-proxima", title: "Proxima, the Broodseeker", category: "shell", region: "Shattered Beacon", summary: "A control-focused permanent Shell found on the floor inside Shattered Beacon.", routeHint: "Enter Shattered Beacon in the Blackridge Cliffs network; the pin marks the verified interior route rather than an exposed overworld body.", point: [10153, 8213], sourceIds: common.shells, relatedGuide: "proxima", pinType: "Interior anchor" }),
  marker({ id: "shell-genessa", title: "Genessa, the Wayward", category: "shell", region: "Marrow Keep", summary: "A quest-unlocked Shell completed through Genessa's hub hand-in and memory.", routeHint: "Return Sester's Censer to the NPC below Marrow Keep Beacon; this is the verified hand-in anchor, not a separate body pickup.", point: [9576, 9835], sourceIds: common.shells, relatedGuide: "shell-tier-list", pinType: "Route anchor" }),
  marker({ id: "shell-smert", title: "Smert, the Apostate", category: "shell", region: "Western Fainweald", summary: "A risk-heavy permanent Shell whose time-control ability supports aggressive setups.", routeHint: "Use the western landmark chain from Marrow Keep and check the side route before committing to nearby dungeons.", point: [8828, 9405], sourceIds: common.shells, relatedGuide: "smert" }),
  marker({ id: "shell-lazlo", title: "Lazlo, the Justiciar", category: "shell", region: "Royal Crypt of Mammon", summary: "A defensive permanent Shell found beyond Vellen in the Royal Crypt route.", routeHint: "Continue down the stairs behind Vellen's arena and follow the crypt interior to Lazlo; this pin is an interior objective anchor.", point: [8589, 11239], sourceIds: common.shells, relatedGuide: "lazlo", pinType: "Interior anchor" }),
  marker({ id: "shell-gragu", title: "Gragu, the Insatiable", category: "shell", region: "One-Legged Wolf Tavern", summary: "A quest-unlocked permanent Shell whose route begins with Gragu at the tavern table.", routeHint: "Speak with Gragu inside One-Legged Wolf Tavern, recover the Heart of Vatra, and return; the pin marks the interior quest anchor.", point: [11152, 8864], sourceIds: common.shells, relatedGuide: "shell-tier-list", pinType: "Interior anchor" }),
  marker({ id: "shell-sariel", title: "Sariel, the Endless", category: "shell", region: "Vestige of Infinity", summary: "A late permanent Shell found with the Clockwork Scythe route.", routeHint: "Follow the Silent Steps toward the Vestige of Infinity; expect this to be a late-game retrieval rather than an early detour.", point: [10801, 12735], sourceIds: common.shells, relatedGuide: "sariel", pinType: "Interior anchor" }),

  marker({ id: "weapon-iconoclast", title: "The Iconoclast (Prologue)", category: "weapon", region: "Prologue", summary: "The temporary prologue primary weapon; included so the complete eight-weapon roster is represented.", routeHint: "This belongs to the linear opening and does not remain the normal permanent route choice after the prologue.", point: [7427, 10173], sourceIds: ["official", "gamer-guides"], relatedGuide: "weapon-tier-list" }),
  marker({ id: "weapon-axe-dagger", title: "Axe & Dagger", category: "weapon", region: "Shrine of Trials", summary: "A flexible dual-form weapon and a strong early target for mobile builds.", routeHint: "Open the Shrine of Trials with the Chapel Key, then complete the weapon route inside.", point: [10235, 8788], sourceIds: common.weapons, relatedGuide: "chapel-key", pinType: "Interior anchor" }),
  marker({ id: "weapon-black-needle", title: "Black Needle", category: "weapon", region: "Sester's Bastion", summary: "A precise primary weapon tied to the Sester's Gate and bastion route.", routeHint: "Use Sester's Gate as the approach landmark and finish the interior route before leaving the area.", point: [11186, 11561], sourceIds: common.weapons, relatedGuide: "weapon-tier-list", pinType: "Interior anchor" }),
  marker({ id: "weapon-clockwork-scythe", title: "Clockwork Scythe", category: "weapon", region: "Vestige of Infinity", summary: "A late primary weapon recovered near Sariel in the Chamber of Becoming route.", routeHint: "Continue through the Silent Steps and Vestige of Infinity; the Shell and weapon are separate pickups in the same route cluster.", point: [10799, 12713], sourceIds: common.weapons, relatedGuide: "weapon-tier-list", pinType: "Interior anchor" }),
  marker({ id: "weapon-axatana", title: "Axatana", category: "weapon", region: "City tower route", summary: "A fast katana-to-axe weapon recovered from a tower cubby after opening its traversal gate.", routeHint: "Circle to the tower's east side, press the exterior plate, defeat the enemy inside, and inspect the cubby; the pin marks that interior cluster.", point: [11076, 11770], sourceIds: common.weapons, relatedGuide: "axatana", pinType: "Interior anchor" }),
  marker({ id: "weapon-martyrs-blade", title: "Great Martyr's Blade", category: "weapon", region: "Martyr's Prison", summary: "A heavy control weapon recovered from a table inside Martyr's Prison.", routeHint: "Open the cell-block gate from the wall button, clear the next room, break the boxes, and inspect the table; this marks the interior route.", point: [9148, 8109], sourceIds: common.weapons, relatedGuide: "weapon-tier-list", pinType: "Interior anchor" }),
  marker({ id: "weapon-veterans-axe", title: "Veteran's Battle Axe", category: "weapon", region: "The King's Crypt", summary: "A committed heavy weapon found on a body inside The King's Crypt.", routeHint: "Follow the Blackridge Cliffs crypt route until the drop into the lower room, then inspect the body at the back; this is an interior anchor.", point: [10037, 8111], sourceIds: common.weapons, relatedGuide: "weapon-tier-list", pinType: "Interior anchor" }),
  marker({ id: "weapon-obsidian-hammer", title: "Obsidian Hammer", category: "weapon", region: "Obsidianite Mines", summary: "A heavy primary weapon recovered in the lower Obsidianite Mines route.", routeHint: "Descend through the mine route and treat this as an interior objective rather than an overworld ground pickup.", point: [9452, 11188], sourceIds: common.weapons, relatedGuide: "weapon-tier-list", pinType: "Interior anchor" }),

  marker({ id: "stone-retribution", title: "Retribution Stone", category: "tarstone", region: "Widow's Overlook", summary: "A useful launch-build Tarstone positioned near a dependable early Fainweald landmark.", routeHint: "Start at Widow's Overlook and search the nearby branch before moving toward the larger dungeon routes.", point: [9961, 8687], sourceIds: common.stones, relatedGuide: "tarstones" }),
  marker({ id: "stone-auspicious", title: "Auspicious Stone", category: "tarstone", region: "Mushroom Village", summary: "An accessible early Tarstone near the Mushroom Village approach.", routeHint: "Check the village entrance network rather than the Glutted Mire interior.", point: [10361, 8952], sourceIds: common.stones, relatedGuide: "tarstones" }),
  marker({ id: "stone-marksman", title: "Marksman's Stone", category: "tarstone", region: "Mushroom Village", summary: "A ranged-support Tarstone earned along the village-side trial route.", routeHint: "Move east from the village approach and look for the trial location before entering the major gate.", point: [10936, 8892], sourceIds: common.stones, relatedGuide: "tarstones" }),
  marker({ id: "stone-deadeye", title: "Deadeye Stone", category: "tarstone", region: "Sanguine Coast", summary: "A ranged-oriented Tarstone located north of the Sanguine Caverns route.", routeHint: "Use the Sanguine Caverns entrance as the southern anchor and search the coastline above it.", point: [9672, 7415], sourceIds: common.stones, relatedGuide: "tarstones" }),
  marker({ id: "stone-berserker", title: "Berserker's Stone", category: "tarstone", region: "Eastern Fainweald", summary: "An aggressive Tarstone positioned well east of Mushroom Village.", routeHint: "This is a long eastern detour; secure a nearby route anchor before collecting it.", point: [11915, 8892], sourceIds: common.stones, relatedGuide: "tarstones" }),
  marker({ id: "stone-justiciar", title: "Justiciar's Stone", category: "tarstone", region: "Northern Fainweald", summary: "A defensive utility Tarstone near the Broodshell field route.", routeHint: "Search the cave-side route close to the northern Broodshell encounter.", point: [10828, 8155], sourceIds: common.stones, relatedGuide: "tarstones" }),
  marker({ id: "stone-gloombound", title: "Gloombound Stone", category: "tarstone", region: "Northern Fainweald", summary: "A notable Tarstone found around the Stones of Remembrance graveyard route.", routeHint: "Use the northern landmark chain and inspect the graveyard branch rather than the main road.", point: [10445, 8081], sourceIds: common.stones, relatedGuide: "tarstones" }),

  marker({ id: "fragment-fainweald-1", title: "Fainweald Map Fragment 1", category: "fragment", region: "Hag's Path", summary: "One of five fragments that reveal the Fainweald map.", routeHint: "Begin at Widow's Overlook, take the westward bridge route, then inspect the left branch into Hag's Path.", point: [9102, 9166], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-fainweald-2", title: "Fainweald Map Fragment 2", category: "fragment", region: "Citadel of Penance route", summary: "One of five fragments that reveal the Fainweald map.", routeHint: "Use One-Legged Wolf as the starting landmark and follow the broken-bridge route toward the citadel walls.", point: [9016, 8480], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-fainweald-3", title: "Fainweald Map Fragment 3", category: "fragment", region: "Northern Widow's Overlook", summary: "One of five fragments that reveal the Fainweald map.", routeHint: "Climb from Widow's Overlook, choose the upper right branch, and search beyond the cart landmark.", point: [9891, 8417], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-fainweald-4", title: "Fainweald Map Fragment 4", category: "fragment", region: "Southern Widow's Overlook", summary: "One of five fragments that reveal the Fainweald map.", routeHint: "Travel south from Widow's Overlook and inspect the raised platform along the Shell-search route.", point: [10244, 9120], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-fainweald-5", title: "Fainweald Map Fragment 5", category: "fragment", region: "Northeast Mushroom Village", summary: "The fifth Fainweald fragment, beyond the village bridge network.", routeHint: "Start at Mushroom Village, continue northeast across two bridge sections, and check the barrier-side area.", point: [11027, 8639], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-mammon-1", title: "Mammon Map Fragment 1", category: "fragment", region: "Revenant Graves route", summary: "One of six fragments that reveal the Mammon map.", routeHint: "From Outskirts of Mammon, follow the Road to Absolution and use the cart route toward the graves.", point: [10626, 11395], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-mammon-2", title: "Mammon Map Fragment 2", category: "fragment", region: "Vestige of Infinity route", summary: "One of six fragments that reveal the Mammon map.", routeHint: "Follow the long Castigator's Keep and Silent Steps route, staying on the leftward branches near the Vestige.", point: [9940, 12388], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-mammon-3", title: "Mammon Map Fragment 3", category: "fragment", region: "Castigator's Keep route", summary: "One of six fragments that reveal the Mammon map.", routeHint: "Take the Road to Absolution toward Castigator's Keep and continue down the left route to its end gate.", point: [9969, 11927], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-mammon-4", title: "Mammon Map Fragment 4", category: "fragment", region: "Deserted Slums", summary: "One of six fragments that reveal the Mammon map.", routeHint: "Use the southwest bridge chain from Outskirts of Mammon, then take the left route in the slums.", point: [9483, 11330], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-mammon-5", title: "Mammon Map Fragment 5", category: "fragment", region: "Southern Mammon", summary: "One of six fragments that reveal the Mammon map.", routeHint: "Travel southwest from Outskirts of Mammon, pass the camp, and search beyond the southern bridge.", point: [9693, 10697], sourceIds: common.fragments, relatedGuide: "walkthrough" }),
  marker({ id: "fragment-mammon-6", title: "Mammon Map Fragment 6", category: "fragment", region: "High Lord's Keep route", summary: "The sixth Mammon fragment, on the western slum and keep route.", routeHint: "Reach the Deserted Slums by the southwest bridges, then take the branch leading toward High Lord's Keep.", point: [8918, 11147], sourceIds: common.fragments, relatedGuide: "walkthrough" }),

  marker({ id: "chapel-key", title: "Chapel Key", category: "key", region: "Mushroom Village", summary: "The progression key used to open the Shrine of Trials and reach Axe & Dagger.", routeHint: "Pass the village bonfire and walk through the suspicious freestanding stone arch to reveal the hanging key.", point: [10500, 9110], sourceIds: common.keys, relatedGuide: "chapel-key" }),
  marker({ id: "crypt-key", title: "Crypt Key", category: "key", region: "Illusionist's Cache", summary: "The progression key needed for the Hall of Echoes route.", routeHint: "Recover it inside the Illusionist's Cache stone structure, then carry it to Hall of Echoes; the pin represents the interior cluster.", point: [8845, 8875], sourceIds: common.keys, relatedGuide: "crypt-key", pinType: "Interior anchor" }),

  marker({ id: "sidearm-naylshotte", title: "Naylshotte", category: "sidearm", region: "Prologue", summary: "The explosive shotgun-style starting Sidearm and the baseline for close-range Resolve burst.", routeHint: "Claim it during the linear prologue and learn its firing rhythm before replacing it.", point: [7427, 10183], sourceIds: common.sidearms, relatedGuide: "sidearms" }),
  marker({ id: "sidearm-forgotten-crossbow", title: "Forgotten Crossbow", category: "sidearm", region: "Flooded Village", summary: "A precise long-range Sidearm suited to pulling isolated enemies and safe opening damage.", routeHint: "Northwest of Blackridge Pass, use the boarded illusion arch, take Damp Key at the elevated house, then backtrack to the locked scaffolding door.", point: [9936, 8457], sourceIds: common.sidearms, relatedGuide: "forgotten-crossbow", pinType: "Interior anchor" }),
  marker({ id: "sidearm-troubadours-lute", title: "Troubadour's Lute", category: "sidearm", region: "One-Legged Wolf Tavern", summary: "A disruptive instrument Sidearm whose attack damage was doubled in Balance Patch 1.", routeHint: "Enter the tavern and inspect the wall behind the performer; the pin marks the tavern interior rather than an outdoor pickup.", point: [11188, 8832], sourceIds: common.sidearms, relatedGuide: "sidearms", pinType: "Interior anchor" }),
  marker({ id: "sidearm-salvaged-trebuchaxe", title: "Salvaged Trebuchaxe", category: "sidearm", region: "Ravaged Hideout", summary: "A slow charged Sidearm with strong early single-target burst.", routeHint: "Travel south of Gloomshade Grove, defeat Bloodcursed Lithopod, and clear the hideout interior.", point: [9518, 8547], sourceIds: common.sidearms, relatedGuide: "sidearms", pinType: "Interior anchor" }),
  marker({ id: "sidearm-ballistazooka", title: "Ballistazooka", category: "sidearm", region: "Sentry's Grave", summary: "A heavy ballista Sidearm awarded through the Subjugated Guardian route.", routeHint: "Approach from Gate of Mammon, use the Lonesome Spire portal, and descend to the lowest level.", point: [9300, 11500], sourceIds: common.sidearms, relatedGuide: "sidearms", pinType: "Interior anchor" }),
  marker({ id: "sidearm-cursed-child", title: "Cursed Child", category: "sidearm", region: "Revered Beacon", summary: "A short-range control Sidearm that pushes enemies away from dangerous close pressure.", routeHint: "Enter the Beacon near Sester's Abbey, avoid the tracking golden light, and destroy its source at the top.", point: [10938, 11256], sourceIds: common.sidearms, relatedGuide: "sidearms", pinType: "Interior anchor" }),
  marker({ id: "sidearm-caged-hystrix", title: "Caged Hystrix", category: "sidearm", region: "Chamber of Becoming", summary: "A rapid multishot Sidearm found after the complete Sariel encounter.", routeHint: "Defeat Sariel, collect the arena rewards, then inspect the final exit room before leaving.", point: [10802, 12750], sourceIds: common.sidearms, relatedGuide: "sidearms", pinType: "Interior anchor" }),
  marker({ id: "sidearm-triarch-repeater", title: "Triarch Repeater", category: "sidearm", region: "Blackwell Cavern", summary: "A sustained automatic Sidearm that rewards a long, controlled firing window.", routeHint: "Follow the Castigator's Keep network into Blackwell Cavern and clear the route to its final lighted chamber.", point: [10306, 11543], sourceIds: common.sidearms, relatedGuide: "sidearms", pinType: "Interior anchor" }),

  marker({ id: "key-blackmarrow-marrow", title: "Blackmarrow Key — Marrow Keep Secret", category: "key", region: "Marrow Keep", summary: "A mapped Blackmarrow pickup associated with the hidden hub route and Shell Shade chests.", routeHint: "Inspect the wall and chained censer near the Genessa or training area; verify the inventory label because Blackwater is a separate key name.", point: [9677, 10090], sourceIds: common.blackmarrow, relatedGuide: "blackmarrow-key", pinType: "Interior anchor" }),
  marker({ id: "key-blackmarrow-night-merchant", title: "Blackmarrow Key — Night Merchant", category: "key", region: "Abandoned Outpost", summary: "A Blackmarrow Key sold by the merchant who appears at Abandoned Outpost during Night Mode.", routeHint: "Call the night through Thestus, travel to Abandoned Outpost, and check the merchant inventory before returning to daylight.", point: [9270, 10814], sourceIds: common.blackmarrow, relatedGuide: "blackmarrow-key", pinType: "Route anchor" }),
  marker({ id: "key-blackmarrow-shrine-sorrows", title: "Blackmarrow Key — Shrine of Sorrows", category: "key", region: "Mushroom Village night route", summary: "A Blackmarrow reward from the first-person Shrine of Sorrows Night Mode dungeon.", routeHint: "This pin marks Mushroom Village as the route anchor, not the exact interior reward room; call the night before searching.", point: [10508, 8868], sourceIds: common.blackmarrow, relatedGuide: "blackmarrow-key", pinType: "Route anchor" }),

  marker({ id: "npc-zhirelle", title: "Zhirelle, the Shellkeeper", category: "npc", region: "Marrow Keep", summary: "Reveals most Shell locations for Gloom after Balance Patch 1 and manages Bond and memory progression.", routeHint: "Use Zhirelle's Gloom-funded map reveals; previously spent reveal Glimpses are refunded in the Blackmarrow Shell Keeper alcove.", point: [9612, 10000], sourceIds: common.npcs, relatedGuide: "shell-locations" }),
  marker({ id: "npc-sester-genessa", title: "Sester Genessa", category: "npc", region: "Marrow Keep", summary: "The hub NPC who accepts Sester's Censer and connects to Genessa's playable Shell unlock.", routeHint: "Find her below the Marrow Keep Beacon by the wooden ramp after completing Revenant Graves.", point: [9575, 9827], sourceIds: common.npcs, relatedGuide: "genessa" }),
  marker({ id: "npc-vlas-cart", title: "Vlas — Broken Cart", category: "npc", region: "Mammon approach", summary: "A verified Vlas state beside a broken cart, injured by an arrow and asking for a missing cat.", routeHint: "Preserve the exact dialogue and follow later map states; the complete cat route remains under verification.", point: [9982, 10891], sourceIds: common.npcs, relatedGuide: "npc-questlines", pinType: "Route anchor" }),
  marker({ id: "npc-vlas-mammon", title: "Vlas — Mammon Route", category: "npc", region: "Western Mammon", summary: "A later mapped Vlas position in the Mammon route chain.", routeHint: "Treat this as a quest-state anchor and confirm that the earlier broken-cart dialogue is complete before searching.", point: [9274, 11519], sourceIds: common.npcs, relatedGuide: "npc-questlines", pinType: "Route anchor" }),
  marker({ id: "npc-vlas-marrow", title: "Vlas — Marrow Keep Route", category: "npc", region: "Marrow Keep", summary: "A mapped Vlas state close to the central hub after the quest develops.", routeHint: "NPC movement depends on dialogue state; this is not a substitute for completing the current request.", point: [9718, 10147], sourceIds: common.npcs, relatedGuide: "npc-questlines", pinType: "Route anchor" }),
  marker({ id: "npc-hilga-village", title: "Hilga — Mushroom Village", category: "npc", region: "Mushroom Village", summary: "Accepts the Poisoned Dagger during Gorf's cure quest near the cauldron area.", routeHint: "Cross the small bridge from Mushroom Village Beacon and look beside the large cauldron.", point: [10640, 8928], sourceIds: common.npcs, relatedGuide: "npc-questlines", pinType: "Route anchor" }),
  marker({ id: "npc-hilga-gorf", title: "Hilga — Gorf Resolution", category: "npc", region: "Widow's Overlook route", summary: "A later Hilga state connected to the resolution of Gorf's cure quest.", routeHint: "Rest after the cauldron hand-in, read Hilga's note, then return toward Gorf and exhaust dialogue.", point: [10031, 8597], sourceIds: common.npcs, relatedGuide: "npc-questlines", pinType: "Route anchor" }),
  marker({ id: "npc-egon", title: "Egon", category: "npc", region: "Castigator's Keep", summary: "Accepts Gloom in repeated portions for the Feed Me trophy and eventual return.", routeHint: "Search the central tower ground floor; Hall of Murmurs is nearby regional content, not Egon's room.", point: [10124, 11793], sourceIds: common.npcs, relatedGuide: "hall-of-murmurs", pinType: "Interior anchor" }),

  marker({ id: "dungeon-hall-of-murmurs", title: "Hall of Murmurs", category: "dungeon", region: "Castigator's Keep", summary: "A short optional dungeon with five enemies, 750 Coins, and one Laterite in current reporting.", routeHint: "Go southwest from Castigator's Keep Beacon, descend beyond the courtyard, and use the right-side lever at the apparent dead end.", point: [10105, 12037], sourceIds: common.dungeons, relatedGuide: "hall-of-murmurs", pinType: "Interior anchor" }),
  marker({ id: "dungeon-holding-cells-nochte", title: "Holding Cells — Nochte Route", category: "dungeon", region: "Northern Nochte", summary: "One of the mapped Holding Cells interiors in the northern route network.", routeHint: "This point is an interior anchor; use nearby Citadel and Nochte landmarks rather than walking directly across the world map.", point: [9200, 8172], sourceIds: common.dungeons, relatedGuide: "walkthrough", pinType: "Interior anchor" }),
  marker({ id: "dungeon-holding-cells-fainweald", title: "Holding Cells — Fainweald Route", category: "dungeon", region: "Northern Fainweald", summary: "A second mapped Holding Cells interior in the Fainweald route cluster.", routeHint: "Treat the pin as an interior anchor and verify the entrance label before recording completion.", point: [10192, 8677], sourceIds: common.dungeons, relatedGuide: "walkthrough", pinType: "Interior anchor" }),

  marker({ id: "night-abandoned-outpost", title: "Abandoned Outpost Night Merchant", category: "night", region: "Mammon", summary: "A Night Mode merchant route with exclusive Tarstones and a Blackmarrow Key.", routeHint: "Call the night at Marrow Keep before traveling; ordinary daylight does not expose the same merchant inventory.", point: [9270, 10814], sourceIds: common.night, relatedGuide: "night-mode", pinType: "Route anchor" }),
  marker({ id: "night-shrine-sorrows", title: "Shrine of Sorrows", category: "night", region: "Mushroom Village", summary: "A first-person Night Mode dungeon with puzzles and a Blackmarrow Key reward.", routeHint: "This pin marks the verified regional approach, not the exact entrance pixel; look for the daylight-sealed riddle after calling the night.", point: [10508, 8868], sourceIds: common.night, relatedGuide: "night-mode", pinType: "Route anchor" }),

  marker({ id: "upgrade-muradean-actuator", title: "Muradean Actuator Route", category: "upgrade", region: "Village Outskirts (Prologue)", summary: "Unlocks primary weapon enhancement at the Tarforge.", routeHint: "This route anchor marks Village Outskirts Beacon; open the entrance chest inside its prologue cleanse dungeon.", point: [7387, 10174], sourceIds: common.upgrades, relatedGuide: "tarforge", pinType: "Route anchor" }),
  marker({ id: "upgrade-obsidian-lathe", title: "Obsidian Lathe Route", category: "upgrade", region: "Martyr's Tomb", summary: "Unlocks Sidearm enhancement and shares a chest route with Parasitic Stone.", routeHint: "Use Widow's Overlook and the Tiel or Martyr's Tomb branch; this is a route anchor rather than the exact chest coordinate.", point: [10366, 9132], sourceIds: common.upgrades, relatedGuide: "tarforge", pinType: "Route anchor" }),
  marker({ id: "upgrade-etching-needles", title: "Etching Needles Route", category: "upgrade", region: "Sunken Village / Glutted Mire", summary: "Unlocks Tarstone tempering and leveling at the Tarforge.", routeHint: "Collect the chest after Tarblighted Shepherd and near Ruk before entering Magdalena's arena.", point: [11175, 9083], sourceIds: common.upgrades, relatedGuide: "tarforge", pinType: "Route anchor" }),
  marker({ id: "upgrade-foundry-stone", title: "Foundry Stone Route", category: "upgrade", region: "Outskirts of Mammon", summary: "Unlocks Smelt Equipment and upgrade-material refunds for a Gloom fee.", routeHint: "Search the battlefield south of Outskirts of Mammon Beacon near the castle walls; this pin marks the starting anchor.", point: [9935, 10593], sourceIds: common.upgrades, relatedGuide: "tarforge", pinType: "Route anchor" }),
  marker({ id: "upgrade-endless-core", title: "Endless Core", category: "upgrade", region: "Hidden Nave", summary: "The late component installed directly in the Tarforge to remove the normal weapon and Sidearm cap.", routeHint: "Follow the Unfound Path to Hidden Nave shortly before the final route and install the Core through the machine menu.", point: [13037, 8946], sourceIds: common.upgrades, relatedGuide: "tarforge", pinType: "Route anchor" }),

  marker({ id: "gate-glutted-mire", title: "Glutted Mire", category: "gate", region: "Mushroom Village", summary: "A Fainweald Corrupted Gate leading to Magdalena, Lady of the Woods.", routeHint: "Approach through the Mushroom Village and Sunken Village network.", point: [10914, 9102], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major" }),
  marker({ id: "gate-sanguine-caverns", title: "Sanguine Caverns", category: "gate", region: "Northern Fainweald", summary: "A Fainweald Corrupted Gate leading to The Lost Child.", routeHint: "Use Stonebled Gate and the northern coastline as the approach landmarks.", point: [9882, 7557], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major" }),
  marker({ id: "gate-prisoners-domain", title: "Prisoners' Domain", category: "gate", region: "Nochte", summary: "A Fainweald-side Corrupted Gate leading to The Nameless Captive.", routeHint: "Approach through Nochtean Gate and follow the prison landmarks westward.", point: [8573, 9737], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major" }),
  marker({ id: "gate-conquered-temple", title: "Conquered Temple", category: "gate", region: "Eastern Mammon", summary: "A Mammon Corrupted Gate leading to Droeg the Conqueror.", routeHint: "Use Sester's Gate and the temple complex as the approach anchors.", point: [11216, 11546], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major" }),
  marker({ id: "gate-withered-shoals", title: "Withered Shoals", category: "gate", region: "Western Mammon", summary: "A Mammon Corrupted Gate leading to Hexapod.", routeHint: "Approach from Gate of Mammon and the western shoals route.", point: [8974, 11601], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major" }),
  marker({ id: "gate-faded-citadel", title: "Faded Citadel", category: "gate", region: "Southern Mammon", summary: "A Mammon Corrupted Gate leading to Isaac, the Scholar Prince.", routeHint: "Use the Forbidden Archives and Citadel Annex route before entering the final interior stretch.", point: [9837, 12913], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major" }),

  marker({ id: "boss-magdalena", title: "Magdalena, Lady of the Woods", category: "boss", region: "Glutted Mire", summary: "The major boss at the end of the Glutted Mire progression route.", routeHint: "This pin marks the dungeon objective cluster, not an outdoor shortcut to the arena.", point: [11196, 9093], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Interior anchor" }),
  marker({ id: "boss-lost-child", title: "The Lost Child", category: "boss", region: "Sanguine Caverns", summary: "The major boss at the end of the Sanguine Caverns progression route.", routeHint: "Enter from Sanguine Caverns and complete the interior route; the arena is not reachable from the coastline above.", point: [9782, 7469], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Interior anchor" }),
  marker({ id: "boss-nameless-captive", title: "The Nameless Captive", category: "boss", region: "Prisoners' Domain", summary: "The major boss at the end of the Prisoners' Domain route.", routeHint: "Follow the prison interior from Nochte rather than trying to approach the pin directly overland.", point: [8262, 10097], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Interior anchor" }),
  marker({ id: "boss-droeg", title: "Droeg the Conqueror", category: "boss", region: "Conquered Temple", summary: "The major boss at the end of the Conquered Temple route.", routeHint: "Use the temple entrance pin as the actual overworld approach; this point represents the interior objective.", point: [11241, 11590], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Interior anchor" }),
  marker({ id: "boss-hexapod", title: "Hexapod", category: "boss", region: "Withered Shoals", summary: "The major boss at the end of the Withered Shoals route.", routeHint: "Enter the shoals from western Mammon and finish the interior path to the burrow.", point: [8730, 11636], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Interior anchor" }),
  marker({ id: "boss-isaac", title: "Isaac, the Scholar Prince", category: "boss", region: "Faded Citadel", summary: "The major boss at the end of the Faded Citadel route.", routeHint: "This is the final interior objective beyond the citadel approach and Scholar-Prince's Chamber.", point: [9647, 13085], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Interior anchor" }),
  marker({ id: "boss-orrem", title: "Orrem, the Discarded Golem", category: "boss", region: "Bridge of Procession", summary: "One of the three Unfound Path guardians required to clear the central route.", routeHint: "Take the Bridge of Procession branch after the Unfound Path opens.", point: [12979, 9004], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Route anchor" }),
  marker({ id: "boss-monolith", title: "The Monolith", category: "boss", region: "Obsidian Vault", summary: "An Unfound Path guardian retimed and reduced to 90% health in Balance Patch 1.", routeHint: "Take the Obsidian Vault branch after Unfound Path opens; older videos may show pre-patch timings.", point: [12944, 8969], sourceIds: common.bosses, relatedGuide: "monolith", spoiler: "major", pinType: "Route anchor" }),
  marker({ id: "boss-malborn", title: "Malborn Offspring", category: "boss", region: "Faithful's Shelter", summary: "One of the three Unfound Path guardians required to clear the central route.", routeHint: "Take the Faithful's Shelter branch after the Unfound Path opens.", point: [12876, 8973], sourceIds: common.bosses, relatedGuide: "bosses", spoiler: "major", pinType: "Route anchor" }),
  marker({ id: "boss-zmey", title: "Zmey the Unbidden", category: "boss", region: "The Hidden Nave", summary: "The final boss, reached after clearing all three Unfound Path branches.", routeHint: "Cleanse Hidden Nave, finish the three guardian routes, and prepare before entering the final objective.", point: [13057, 8999], sourceIds: common.bosses, relatedGuide: "final-boss", spoiler: "major", pinType: "Route anchor" }),
];

export const mapEditorialSections = [
  {
    heading: "What this map is designed to answer",
    paragraphs: [
      "This is a curated launch-build map, not a wall of every material pickup. It answers the decisions that most often interrupt a first playthrough: where each permanent Shell is found, which routes hold primary weapons and Sidearms, where the map fragments sit, which keys unlock major detours, how NPC and optional-dungeon routes connect, and which Corrupted Gate leads to each campaign boss. Hubs, Night Mode objectives, and Tarforge landmarks remain visible because a precise pin is not useful when the surrounding paths are difficult to distinguish.",
      "The complete fog-free world image remains available at every zoom level. Filters let you isolate one objective class, search by a location or item name, and hide major-boss information until you want it. The found control records progress only in local browser storage. No account is required, nothing is sent to a server, and clearing site storage resets the checklist. This makes the map useful on a second screen without turning it into another login or profile system.",
    ],
  },
  {
    heading: "How to use a pin without getting lost",
    paragraphs: [
      "Start with the position-standard badge instead of chasing every pin as though it were an exposed ground pickup. Exact position means the retail coordinate maps to the visible overworld point. Interior anchor means the target sits inside a named dungeon, Beacon, tower, tavern, crypt, or quest room whose floor plan is not represented as a walkable outdoor route. Route anchor means the coordinate marks a verified start, hand-in, or quest-state location rather than the reward pixel. This distinction is mandatory for every marker and prevents a correct regional coordinate from becoming a false room-level promise.",
      "On desktop, drag the map to pan and use the wheel or plus and minus controls to change scale. On touch devices, use the same visible zoom controls and drag with one finger, including when the gesture begins on a marker. Selecting a result centers it when possible and opens its route note, region, position standard, and related long-form guide. If several pins overlap, narrow the category first; boss and gate pins often occupy the same cluster by design. Reset view returns to the complete world image without changing filters or found progress.",
    ],
  },
  {
    heading: "Verification, versions, and coordinate limits",
    paragraphs: [
      "Every plotted point comes from a current launch-build coordinate set checked on August 20, 2026. The names and route roles are cross-checked against a second source selected for that category: the current Shell roster, retail weapon reporting, launch Tarstone coverage, the complete major-boss route, the Chapel and Crypt Key guide, or the eleven-fragment route guide. Official material is used for the game's world, progression, Shell, weapon, and dungeon structure. The map-release notes are also retained because they explicitly warn that some beta item placements changed before launch.",
      "Cross-checking a marker name does not make every pixel infallible. Interiors without an in-game floor plan are represented by objective anchors, and the far-eastern Unfound Path branches are route anchors rather than literal outdoor walking coordinates. The page states that distinction instead of pretending all pins behave the same way. If a live patch moves an item, the marker data, update date, sitemap entry, and machine-readable guide export are generated from this shared dataset so the correction can propagate together.",
    ],
  },
  {
    heading: "A practical first-run layer order",
    paragraphs: [
      "For a low-spoiler first run, leave the boss switch off and begin with Hubs, Shells, Keys, and Fragments. Secure Marrow Keep, Mushroom Village Gate, Widow's Overlook, and Outskirts of Mammon as mental anchors. Reveal permanent Shell locations before spending scarce Glimpses blindly, then collect the regional fragments so the in-game map becomes useful on its own. The Chapel Key and Crypt Key deserve early attention because they open routes to substantial rewards rather than another small consumable cache.",
      "Add Weapons, Sidearms, upgrades, and Key Tarstones when you have chosen a combat style. The weapon and Sidearm layers cover the verified launch rosters, while the Tarstone layer intentionally shows only a small set of high-value route targets rather than every stone. NPC, dungeon, and Night layers contain exact points where available and clearly labeled route anchors where an interior has no world-map coordinate. Finally, reveal Corrupted Gates and Major Bosses when you are ready to plan campaign progression.",
    ],
  },
];

export function mapEditorialWordCount() {
  return mapEditorialSections
    .flatMap((section) => [section.heading, ...section.paragraphs])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
