import type { GuideArticle } from "../types";

export const trendingArticles: GuideArticle[] = [
  {
    slug: "genessa",
    title: "Mortal Shell 2 Genessa Guide: Location, Build & Skills",
    description: "Unlock Genessa in Mortal Shell 2 through Revenant Graves, Sester Secundus, and Sester's Censer, then build her around summons, weapons, and Bonds.",
    heading: "Unlock Genessa and build around her Faithful Doubles",
    eyebrow: "Shell dossier // The Wayward",
    category: "Shells",
    keyword: "genessa mortal shell 2",
    spoiler: "Gameplay spoilers",
    updated: "August 22, 2026",
    updatedAt: "2026-08-22",
    image: "/ms2-shot-04.webp",
    imageAlt: "A mysterious Mortal Shell II figure playing an instrument in a firelit cavern",
    quickAnswer: "Reach Revenant Graves from Outskirts of Mammon, touch Sester's Censer, defeat Sester Secundus, return the Censer to Genessa below Marrow Keep Beacon, and finish her memory to unlock Genessa, the Wayward.",
    intro: [
      "Genessa, the Wayward is one of Mortal Shell 2's eight permanent Shells, but she does not use the normal discovery loop. Zhirelle can spend Gloom to reveal most Shell locations after Balance Patch 1, while Genessa requires a quest item and a boss encounter in Revenant Graves. That difference explains why a purchased hint or a pin beside Marrow Keep does not immediately give you her playable body. The reliable route is Sester's Censer, Sester Secundus, and a final hand-in to the NPC Genessa at the hub.",
      "The route below is cross-checked against the current eight-Shell roster, a launch-build walkthrough of the Censer quest, and completed-game reporting about Genessa's summon utility. It separates the NPC from the playable Shell and avoids older first-game advice about sipping Tar at Fallgrim checkpoints. No Tar or Glimpse payment is required for this unlock. You do need access to Mammon and enough combat strength to finish the hidden encounter without treating the Censer as a simple ground pickup.",
    ],
    sections: [
      {
        heading: "Reach Revenant Graves and find the Censer",
        paragraphs: [
          "Fast travel to Outskirts of Mammon and take the route toward Revenant Graves. Current launch guidance follows the wooden bridges, forest path, and portal into a red-petaled clearing. Two Gloombound Ritualists protect the encounter area. Clear them before inspecting the figures in the clearing; leaving an attached enemy alive can make an interaction look broken when the real problem is that the encounter has not reset to its usable state.",
          "Several spectral Sesters face a glowing object in the clearing. Their gaze is the environmental clue: interact with the object they surround, not with the figures themselves. The correct item name is Sester's Censer. Search pages sometimes call it a sensor, chalice, or lantern, but those are descriptions or transcription errors rather than separate quest items. Accepting the prompt begins the Sester Secundus encounter, so heal and equip a dependable single-target setup before touching it.",
        ],
      },
      {
        heading: "Defeat Sester Secundus and complete the hand-in",
        paragraphs: [
          "Defeat Sester Secundus in the circular arena and collect Sester's Censer from the completed encounter. This is the progression flag Genessa needs; merely reaching Revenant Graves or finding a map marker is not enough. If the Censer is not in your inventory after the fight, confirm the reward interaction before leaving. Resting, fast travel, and a long return trip should not be necessary when the reward has been claimed correctly.",
          "Travel back to Marrow Keep. From its Beacon, use the wooden ramp to reach Sester Genessa below the main platform and choose the option to offer Sester's Censer. A memory sequence begins in which you temporarily experience Genessa's perspective. Let that sequence finish. When control returns, Genessa, the Wayward joins the permanent Shell roster and can be selected and developed like the other playable bodies. There is no additional Glimpse fee at the hand-in.",
        ],
        bullets: [
          "Start: Outskirts of Mammon Beacon.",
          "Quest area: Revenant Graves.",
          "Encounter: Sester Secundus.",
          "Reward item: Sester's Censer.",
          "Final hand-in: Sester Genessa below Marrow Keep Beacon.",
        ],
      },
      {
        heading: "Build around Faithful Doubles, not raw durability",
        paragraphs: [
          "Genessa's defining value is her ability to create Faithful Doubles that fight beside her and can copy attacks. In practice, the doubles divide attention, create safer healing or repositioning windows, and add pressure while an enemy is facing the wrong target. That makes her especially useful in boss attempts where a clean opening matters more than surviving a direct trade. Treat the summons as temporary tactical space, not invulnerable allies that can carry the entire encounter.",
          "Test a fast and a heavy weapon before committing materials. Faster attacks give more chances to observe how often doubles contribute during ordinary pressure, while a long-reaching weapon lets Genessa stay behind the distraction and punish safely. Current player reporting favors Black Needle and Great Martyr's Blade, but that preference is still developing. Keep your upgraded familiar weapon until the replacement proves that it can exploit the summon window without leaving Genessa exposed after the doubles disappear.",
        ],
      },
      {
        heading: "Bond, Tarstone, and boss priorities",
        paragraphs: [
          "Glimpses unlock Shell Bond tiers and memories, so do not arrive at Genessa after scattering the limited supply across every earlier body. First test her base summon rhythm in a repeatable route, then fund the Bond branch that improves the ability you actually use. Shell Points and Glimpses are different resources: normal progression can expand individual skills, while Glimpses gate broader Bond access. The related Glimpse guide explains why current launch players should not expect ordinary enemy loops to refill every experimental purchase.",
          "Choose Tarstones that work during a solitary boss fight rather than effects that require repeated kills. Genessa already brings distraction; her remaining build should provide dependable damage, Break pressure, or survival without needing adds. Completed boss reporting recommends her for difficult encounters because the doubles can redirect the target, but a summon does not cancel persistent hazards or wide arena attacks. Keep watching the boss, use the copied pressure as permission for one measured punish, and leave before the recovery window closes.",
        ],
      },
    ],
    sources: [
      { label: "Mortal Shell II official world and Shell overview", url: "https://mortalshell.com/", type: "Official" },
      { label: "GamesRadar launch roster and Shell unlock system", url: "https://www.gamesradar.com/games/rpg/mortal-shell-2-shells/", type: "Editorial" },
      { label: "NerdsChalk Genessa and Sester's Censer launch route", url: "https://nerdschalk.com/mortal-shell-2-genessa-and-sesters-censer-guide-location-requirements-and-unlock-steps/", type: "Editorial" },
      { label: "Windows Central completed-game Shell testing", url: "https://www.windowscentral.com/gaming/mortal-shell-2-is-both-a-love-letter-and-an-inspiration-to-the-soulslike-genre", type: "Editorial" },
    ],
    related: ["glimpse", "shell-locations", "shell-tier-list"],
  },
  {
    slug: "glimpse",
    title: "Mortal Shell 2 Glimpse Guide: Farming and Best Uses",
    description: "Learn how Mortal Shell 2 Glimpses work, where fixed rewards come from, why infinite farms fail, and how to spend this limited currency without wasting a run.",
    heading: "Glimpses: where they come from and how not to waste them",
    eyebrow: "Progression guide // Limited currency",
    category: "Progression",
    keyword: "mortal shell 2 glimpse",
    spoiler: "Spoiler-light",
    updated: "August 22, 2026",
    updatedAt: "2026-08-22",
    image: "/ms2-world.webp",
    imageAlt: "A Mortal Shell II warrior approaching a huge enemy between burning torches",
    quickAnswer: "There is no verified infinite Glimpse farm in the current launch build. Prioritize fixed rewards for one main Shell's Bond and memories; Balance Patch 1 moved optional Shell map reveals to Gloom.",
    intro: [
      "Glimpses are one of Mortal Shell 2's most restrictive progression currencies because Shell Bond tiers and memories compete for a limited supply, while documented major-boss encounters can offer a one-Glimpse spectral Shell summon. Zhirelle originally charged Glimpses to reveal undiscovered Shell locations, but Balance Patch 1 moved those map fees to Gloom. Players who paid the old fee can collect a Glimpse refund from the Shell Keeper alcove in Blackmarrow.",
      "Current launch reporting does not identify a reliable infinite Glimpse farm. The repeatable Grisha and Mist routes widely copied from the 2020 Mortal Shell belong to the first game, not the sequel. For Mortal Shell 2, collect fixed world rewards thoroughly, distinguish Glimpses from repeatable Gloom and Tar, and reserve purchases until you understand which Shell will carry the run. The balance patch improves that budget by removing map reveals from it; it does not announce an infinite farm or full Bond respec.",
    ],
    sections: [
      {
        heading: "Know which resource you are actually farming",
        paragraphs: [
          "Glimpses, Gloom, Tar, and Shell Points are not interchangeable. Glimpses support Bond progression, memories, and certain spectral summons. Shell Points buy abilities for the body that earned them. Gloom advances broader leveling and now pays for Zhirelle's map reveals, while Tar funds purchases and other progression costs. Enemy-dense routes can still be excellent because they return Gloom, Tar, experience, and materials, but calling every profitable loop a Glimpse farm creates the wrong expectation.",
          "Use the currency label shown at the reward and inventory screen rather than relying on an older guide's terminology. If a route consistently gives Gloom after a reset, it is a Gloom route even if its author describes it as a Glimpse shortcut. The launch guide from GamesRadar says Glimpses are obtained primarily through cleansing Beacons, while current route testing adds fixed chests and scripted NPC rewards. Ordinary respawns have not produced a confirmed renewable supply.",
        ],
      },
      {
        heading: "Collect the fixed sources before repeating combat loops",
        paragraphs: [
          "Cleanse Corrupted Beacons as you open each region, inspect distinctive chests, and finish NPC interactions that award progression currency. The Glimpse-bearing Grisha Pup interaction near Mushroom Village is one documented example, but the larger rule is more durable: exploration completion matters more than repeating one enemy pack. Mark completed Beacons and opened objective chests so you do not waste time revisiting a fixed reward that cannot respawn.",
          "A combat loop still has value when it makes the next fixed reward easier to reach. Farm Gloom and Tar to strengthen the chosen setup, buy necessary supplies, and clear a route safely. Judge that loop by the currencies it repeatedly displays, not by a promised Glimpse-per-hour number copied from a beta or the first game. If a patch later introduces renewable Glimpses, the patch-notes page will record the change before this guide promotes a new farm.",
        ],
      },
      {
        heading: "A safe spending order for the first playthrough",
        paragraphs: [
          "Begin by testing Tiel and Proxima, whose locations are revealed after the prologue, before asking Zhirelle to expose the entire roster. If neither fits, use Gloom to reveal one Shell whose documented role solves a specific problem: Eredrim for durability, Gragu for enemy-dense sustain, or another body whose signature loop you intend to use. Genessa follows a quest unlock and does not require a standard location purchase.",
          "Once a main Shell is chosen, prioritize its Bond and memory access over convenience. Keep a small reserve if you value one-Glimpse boss summons, but do not summon automatically on every first attempt. Observe the fight, decide whether distraction would create a real advantage, and spend only when the answer is yes. The ideal balance is not one universal number; it is enough currency to reach the next meaningful Bond tier without blocking a deliberate discovery or rescue option.",
        ],
        bullets: [
          "Test automatically revealed Shells before paying Gloom for more pins.",
          "Develop one primary Shell before funding several partial Bonds.",
          "Treat boss summons as tactical purchases, not default entry fees.",
          "Farm Gloom and Tar separately instead of assuming they become Glimpses.",
        ],
      },
      {
        heading: "Avoid patched claims, trainers, and irreversible assumptions",
        paragraphs: [
          "The Mushroom Village mantis and several beta-era shortcuts are reported as changed, while original-game Mist farms rely on systems that are not present in the sequel's current economy. Third-party trainers advertising currency multipliers do not verify an in-game method and can introduce malware, save corruption, achievement problems, or platform enforcement. This site does not link executable trainers or treat altered saves as evidence of a legitimate farm.",
          "Community frustration about the limited supply is real, but a request for a respec or renewable source is not proof that one exists. Balance Patch 1 answers one part of that feedback by changing Shell map reveals from Glimpses to Gloom and refunding old reveal payments. It does not promise a renewable Glimpse drop or reset every Bond. Plan the first cycle as a constrained Bond budget and keep enough unspent currency to react to the Shell you discover later.",
        ],
      },
    ],
    sources: [
      { label: "Official Mortal Shell II systems overview", url: "https://mortalshell.com/", type: "Official" },
      { label: "GamesRadar Shell discovery and Glimpse costs", url: "https://www.gamesradar.com/games/rpg/mortal-shell-2-shells/", type: "Editorial" },
      { label: "NerdsChalk launch-build Glimpse methods and spending", url: "https://nerdschalk.com/mortal-shell-2-glimpse-farm-explained-all-methods-and-spending-tips/", type: "Editorial" },
      { label: "Launch community discussion of finite Glimpses", url: "https://www.reddit.com/r/MortalShell/comments/1vrp7x3/being_able_to_fully_upgrade_only_2_shells_per/", type: "Community" },
      { label: "Team Mortal Shell Hotfix 2 and current feedback", url: "https://www.reddit.com/r/MortalShell/comments/1vseiky/hotfix_2_live_now/", type: "Official" },
      { label: "Team Mortal Shell Balance Patch 1 notes", url: "https://www.reddit.com/r/MortalShell/comments/1vttz2d/balance_patch_1/", type: "Official" },
    ],
    related: ["genessa", "shell-points", "shell-locations"],
  },
  {
    slug: "patch-notes",
    title: "Mortal Shell 2 Patch Notes: Latest Updates & Hotfixes",
    description: "Track Mortal Shell 2 Balance Patch 1 and hotfixes, including boss nerfs, weapon buffs, economy changes, performance fixes, and platform rollout status.",
    heading: "Latest patch notes and verified launch hotfixes",
    eyebrow: "Live record // Retail updates",
    category: "Updates",
    keyword: "mortal shell 2 patch notes",
    spoiler: "Spoiler-light",
    updated: "August 22, 2026",
    updatedAt: "2026-08-22",
    image: "/ms2-combat.webp",
    imageAlt: "A ruined Mortal Shell II fortress beneath a gray sky",
    quickAnswer: "Balance Patch 1 is the latest verified retail update. It is live on PC, with PS5 and Xbox announced to follow, and changes Gloom, Gold, smelting, bosses, enemies, weapons, Guard, Tarstones, crashes, and performance.",
    intro: [
      "This Mortal Shell 2 patch-notes page is a retail update log, not a copy of every Open Beta experiment. Build numbers such as the public-test hotfixes circulated before launch may describe a separate branch with different quests, item positions, and bugs. The record below begins with live launch coverage and links directly to Team Mortal Shell or official store announcements whenever possible. A community request is never presented as an implemented change unless the published notes say it shipped.",
      "Platform rollout can differ between PC, PlayStation 5, and Xbox Series X|S. Team Mortal Shell released Balance Patch 1 on PC first and said console versions were coming shortly, so a console player should not assume the new values are installed until the platform downloads an update. Check the local version history, restart the client, and allow the update to complete before testing. The page's date records our source check, not a promise that every platform exposes the same build label.",
    ],
    sections: [
      {
        heading: "Balance Patch 1: economy and platform status",
        paragraphs: [
          "Team Mortal Shell published Balance Patch 1 after launch with the PC build live first and PS5 and Xbox updates announced to follow shortly. The economy changes are substantial: Shell map locations now cost Gloom instead of Glimpses, and Glimpses spent on those reveals before the patch can be collected from the Shell Keeper alcove in Blackmarrow. Enemy Gold drops were increased significantly, Mammon enemies now award twice as much Gold, and Tarforge smelting costs 75% less Gloom.",
          "These changes preserve limited Glimpses for Bonds and memories while making equipment correction less punitive. The official note does not publish a universal new reveal price, exact Gold multiplier outside Mammon, or revised fee table for every smelt level, so this site will not invent those numbers. Open the relevant menu on the installed build and trust the displayed cost. Console players should compare values only after confirming that Balance Patch 1 has reached their system.",
        ],
        bullets: [
          "Shell map reveals: Gloom instead of Glimpses, with old reveal Glimpses refunded in Blackmarrow.",
          "Enemy Gold: significantly increased; Mammon enemies award double Gold.",
          "Tarforge smelting: 75% lower Gloom cost.",
          "Rollout: live on PC first; PlayStation 5 and Xbox announced to follow.",
        ],
      },
      {
        heading: "Boss, enemy, weapon, Guard, and Tarstone balance",
        paragraphs: [
          "The Lost Child now deals 10% less base damage and has 15% less maximum health. The Monolith deals 19% less base damage, has 10% less maximum health, and has several attacks retimed. Enemy health also fell for Cultist Mace by 21.1%, Caerinid Spider by 33.3%, Infested Stalker by 52.4%, and Rusted Knave Halberd by 20.8%; the Knave's overhead hit detection was fixed. Other enemies featured in the beta were restored to their beta health values, except the Caerinid Spider, whose listed reduction reflects the intended retail tuning.",
          "Great Martyr's Blade gained 20% attack damage and Troubadour's Lute gained 100%. Caged Hystrix and Triarch Repeater no longer need a minimum amount of Resolve before firing. Light-attack tracking improved for Axatana, Black Needle, and Clockwork Scythe. Guard can now be used while walking. Parasitic, Grudge, and Bulwark received significantly stronger damage reduction, while Clerik's and Squall were also buffed; the official post does not state exact new values for those Tarstones.",
        ],
        bullets: [
          "Lost Child: base damage −10%; maximum health −15%.",
          "Monolith: base damage −19%; maximum health −10%; selected attacks retimed.",
          "Great Martyr's Blade: attack damage +20%; Troubadour's Lute: attack damage +100%.",
          "Axatana, Black Needle, and Clockwork Scythe: improved light-attack tracking.",
          "Guard: usable while walking.",
        ],
      },
      {
        heading: "Hotfix 2 remains part of the retail history",
        paragraphs: [
          "Team Mortal Shell published Hotfix 2 on August 20, 2026. It grouped miscellaneous crash fixes with stability and performance improvements, repaired a UI lock caused by equipping Slayer Seal from the Beacon menu, and prevented ripostes from stealing an enemy weapon. Balance Patch 1 adds further crash, bug, and performance work, but neither official note provides a hardware benchmark or exhaustive crash list. Treat those lines as general reliability improvements rather than a guaranteed fix for every configuration.",
          "The two releases answer different questions. Hotfix 2 was primarily corrective; Balance Patch 1 changes progression cost and combat balance. Neither announces a renewable Glimpse farm, complete Bond respec, new Beacons, or New Game Plus redesign. The balance post says future updates are planned for Night Mode, additional Tarstones, and PP items, but a plan is not a shipped feature. Those topics remain future work until another official post marks them live.",
        ],
      },
      {
        heading: "Do not mix retail notes with Open Beta patches",
        paragraphs: [
          "The Open Beta used public-test and default branches before the August 20 release. Those notes addressed experimental targeting, camera behavior, missing rewards, lighting, and other test-build issues. They remain useful history, but they are not a reliable checklist for the retail executable. Item and weapon positions also changed between beta and launch according to current map makers, which is why an old patch fixing one chest does not prove that the final pickup remains in the same room.",
          "When comparing a bug report, first identify whether the source names Mortal Shell II, the Open Beta app, a public-test branch, or the 2020 Mortal Shell. Search results combine all four. A retail guide should match the current game app and date, while a beta archive should be labeled as historical. We preserve that separation throughout the site's Shell, key, weapon, and map coverage so a fixed beta problem is not accidentally reintroduced as launch advice.",
        ],
      },
      {
        heading: "How to confirm that the hotfix is installed",
        paragraphs: [
          "Close and reopen the platform client, check for pending downloads, and inspect the game's update history or properties. On Steam, the official announcements and activity feed are the best starting points; avoid selecting an old beta branch unless a current developer post specifically asks for testing there. On consoles, use the system's check-for-update action and compare the installed version after the download finishes. Do not infer success from download size alone.",
          "Test the exact fixed behavior in a low-risk state. For the Slayer Seal issue, open a Beacon menu and verify that equipping the Seal returns control normally. For the riposte issue, use an ordinary encounter rather than a critical boss attempt and confirm that the enemy's weapon state remains sensible. Back up platform-supported saves before experimenting with unofficial workarounds, and remove mods when determining whether a retail fix works in an unmodified game.",
        ],
      },
      {
        heading: "Reporting a problem that survives the update",
        paragraphs: [
          "A useful report names platform, installed version, save progression, location, Shell, weapon, Seal, and the shortest repeatable sequence that triggers the problem. Include whether the issue occurs after a restart and whether a new save reproduces it, but never delete a valuable save merely to create evidence. For performance problems, add resolution, graphics preset, GPU, driver, and whether the slowdown occurs in one area or across the game.",
          "Team Mortal Shell says it reads feedback posted through Discord, Reddit, Steam Discussions, and other official accounts. Keep requests separate from bug claims: 'please add more Beacons' is design feedback, while 'the menu stops responding after this exact selection' is a reproducible defect. This page will add future retail hotfixes in reverse chronological order, retain their source links, and revise affected guides when a change alters progression rather than merely fixing stability.",
        ],
      },
    ],
    sources: [
      { label: "Team Mortal Shell: Balance Patch 1 notes", url: "https://www.reddit.com/r/MortalShell/comments/1vttz2d/balance_patch_1/", type: "Official" },
      { label: "Team Mortal Shell: Hotfix 2 live notes", url: "https://www.reddit.com/r/MortalShell/comments/1vseiky/hotfix_2_live_now/", type: "Official" },
      { label: "Mortal Shell II official Steam community hub", url: "https://steamcommunity.com/app/2584270", type: "Official" },
      { label: "Official Steam announcements feed", url: "https://store.steampowered.com/news/posts/?enddate=1783521964&feed=steam_community_announcements", type: "Official" },
      { label: "Team Mortal Shell community feedback statement", url: "https://www.reddit.com/r/MortalShell/comments/1vsnarq/our_thanks_to_the_community/", type: "Official" },
    ],
    related: ["glimpse", "beacons", "walkthrough"],
  },
  {
    slug: "editions",
    title: "Mortal Shell 2 Editions Guide: Price, Devout & Revered",
    description: "Compare Mortal Shell 2 Standard, Devout, and PS5 Revered editions by price, contents, Obsidian skins, physical extras, availability, and launch timing.",
    heading: "Standard, Devout, and Revered editions compared",
    eyebrow: "Buyer's guide // Verified contents",
    category: "Buying Guide",
    keyword: "mortal shell 2 price",
    spoiler: "Spoiler-light",
    updated: "August 22, 2026",
    updatedAt: "2026-08-22",
    image: "/ms2-false-gods.webp",
    imageAlt: "A towering false god looming over a Mortal Shell II warrior",
    quickAnswer: "Standard is the $49.99 base game, Devout adds eight Obsidian Shell skins at $59.99, and Revered is the PS5-only physical collector edition with artbook, steelbook, prints, and digital extras.",
    intro: [
      "Mortal Shell 2 launched worldwide on August 20, 2026 for PC, PlayStation 5, and Xbox Series X|S. Three edition names appear in searches, but they are not three interchangeable digital tiers. Standard is the base game. Devout is the digital premium package built around eight Obsidian Shell skins and originally offered up to seventy-two hours of advanced access. Revered is a PlayStation 5 physical collector edition with physical presentation items and limited retail stock.",
      "This guide uses the official release and pricing announcement, the official Mortal Shell II site, the current PlayStation Store listing, and Team Mortal Shell's physical-stock statement. Regional taxes, currency conversion, retailer promotions, and post-launch stock can change, so the listed launch prices are reference points rather than a guarantee for every storefront. Check the exact platform and contents at checkout, especially when a reseller uses 'deluxe,' 'collector,' or 'revered' informally.",
    ],
    sections: [
      {
        heading: "Standard Edition: the complete base game",
        paragraphs: [
          "The official launch announcement set Standard Edition pricing at $49.99, €49.99, and £39.99. It contains Mortal Shell II without the premium cosmetic package. Standard is the sensible choice when you want the complete campaign, all eight playable Shells, weapons, dungeons, and progression systems but do not assign value to alternate skins or collector materials. The core game is not described as missing a character, boss, region, or mechanical upgrade because you bought Standard.",
          "Standard launched digitally on Steam, PS5, and Xbox Series X|S. Physical availability depends on platform and region, so confirm whether a retail box contains a disc, a download code, or a regional product. The PS5 Standard listing and a PS5 Revered collector box are different products even when both contain the base game. If you already own Standard, compare the store's Devout upgrade language before buying a second full-game package.",
        ],
      },
      {
        heading: "Devout Edition: digital skins, not extra gameplay",
        paragraphs: [
          "Devout launched at $59.99, €59.99, and £47.99. Its lasting premium content is an Obsidian skin set for all eight permanent Shells. The package originally advertised up to seventy-two hours of advanced access beginning August 17, but that timing advantage ended when the worldwide release arrived on August 20. A post-launch buyer should evaluate Devout for the skins and any currently listed store bonus, not pay extra under the mistaken belief that early access can still be recovered.",
          "The skins change appearance rather than unlocking a stronger version of a Shell. You still need to obtain the corresponding playable body before its alternate look becomes useful. Store pages may also display preorder bonuses, but a new order placed after release should not assume expired preorder rewards are included. Read the live product description for the account region and preserve the receipt if a listed cosmetic does not appear after the tutorial and Beacon systems open.",
        ],
      },
      {
        heading: "Revered Edition: PS5 physical collector package",
        paragraphs: [
          "Revered is the physical collector edition announced for PlayStation 5. The official site lists a physical artbook, steelcase, fine-art prints, and digital extras; launch reporting describes a collector box and the Obsidian content associated with the premium offering. It is not the name of the broad PC or Xbox digital deluxe tier. If a marketplace listing claims otherwise, verify the platform photograph, region code, seller, and sealed contents before paying collector pricing.",
          "Demand exceeded the allocated supply before launch. Team Mortal Shell said several markets had fully reserved their stock, that replenishment before August 20 was unlikely, and that no post-launch restock plan was guaranteed at that time. Scarcity can produce inflated reseller listings. Do not confuse a higher resale price with an official MSRP or with additional playable content. Collect Revered for the physical objects and packaging, not for an exclusive combat advantage.",
        ],
      },
      {
        heading: "Which Mortal Shell 2 edition should you buy?",
        paragraphs: [
          "Choose Standard when the game is the priority. Choose Devout when the eight Obsidian Shell skins are worth the price difference in your region; advanced access is no longer a benefit after worldwide launch. Choose Revered only when you own a compatible PS5, want the artbook, steelbook, prints, and collector presentation, and can confirm legitimate stock at an acceptable price. None of those decisions changes the recommended first route or removes the need to unlock permanent Shells in play.",
          "Before checkout, verify platform, physical versus digital format, account region, language support, shipping date, cancellation terms, and the seller's exact bonus list. A PS5 product page can show several editions together, so make sure the selected tile matches the price and package you intend. For gameplay help after purchase, use the walkthrough for progression, the Shell locations guide for the roster, and the patch-notes page for current fixes rather than relying on old preorder copy.",
        ],
        bullets: [
          "Best value for gameplay: Standard Edition.",
          "Best for official alternate Shell looks: Devout Edition.",
          "Best for physical collectors with PS5: Revered Edition.",
          "No longer relevant after August 20: Devout advanced-access timing.",
        ],
      },
    ],
    sources: [
      { label: "Official release date, pricing, and preorder announcement", url: "https://store.steampowered.com/news/posts/?enddate=1783521964&feed=steam_community_announcements", type: "Official" },
      { label: "Mortal Shell II official edition overview", url: "https://mortalshell.com/", type: "Official" },
      { label: "PlayStation Store Devout Edition listing", url: "https://store.playstation.com/en-us/product/EP3495-PPSA34008_00-0281085410214617", type: "Official" },
      { label: "Team Mortal Shell Revered Edition availability update", url: "https://www.reddit.com/r/MortalShell/comments/1uy09xb/an_update_on_the_availability_of_the_revered/", type: "Official" },
      { label: "GameSpot report on PS5 Revered stock", url: "https://www.gamespot.com/articles/upcoming-souls-like-so-popular-it-sells-out-of-ps5-preorders/", type: "Editorial" },
    ],
    related: ["patch-notes", "walkthrough", "shell-locations"],
  },
  {
    slug: "gragu",
    title: "Mortal Shell 2 Gragu Guide: Heart of Vatra & Build",
    description: "Unlock Gragu in Mortal Shell 2 by finding the Heart of Vatra, clearing the Temple route, securing Berserker's Stone, and building his kill-based sustain.",
    heading: "Unlock Gragu with the Heart of Vatra and build for Hunger",
    eyebrow: "Shell dossier // The Insatiable",
    category: "Shells",
    keyword: "mortal shell 2 gragu",
    spoiler: "Gameplay spoilers",
    updated: "August 22, 2026",
    updatedAt: "2026-08-22",
    image: "/ms2-shot-12.webp",
    imageAlt: "A heavily armored Mortal Shell II warrior swinging a broad axe through enemies",
    quickAnswer: "Meet Gragu at One-Legged Wolf Tavern, retrieve the Heart of Vatra from the temple east of the tavern, loot Berserker's Stone first, then give Gragu the Heart so his body becomes a playable Shell.",
    intro: [
      "Gragu, the Insatiable is a permanent Shell whose unlock is framed as an NPC request rather than a corpse pickup. Repeatedly speak to him inside One-Legged Wolf Tavern until he asks for the Heart of Vatra. The item is a quest key found at the Temple of Vatra east of the tavern, not a consumable, weapon, Tarstone, or cure for another character. Returning it completes Gragu's request in the most literal way and leaves his body available to inhabit.",
      "Two current launch guides agree on the tavern, eastern temple, statue pickup, and final hand-in. A separate route report adds an important progression warning: if corruption blocks the eastern approach, defeat Magdalena in Glutted Mire, return the recovered Ova to Marrow Keep, and obtain Mether's Breath before trying again. That requirement depends on when you reach the route, so a sealed barricade means progression is missing; it does not mean the Heart has moved.",
    ],
    sections: [
      {
        heading: "Start Gragu's request at One-Legged Wolf",
        paragraphs: [
          "Find One-Legged Wolf Tavern in Fainweald and speak to Gragu inside. He initially offers little direction, so continue the conversation until the Heart of Vatra becomes the clear request. Exhausting dialogue before leaving prevents a common mistake: reaching the temple, collecting an unexplained key item, and then searching the inventory for a manual use. The Heart resolves through Gragu's dialogue and has no separate equip command.",
          "If the route east is sealed by corruption, progress Glutted Mire and Magdalena first. Recover the Ova, use Marrow Keep's progression system, and obtain Mether's Breath so corruption barriers can be cleared. The temple itself sits east or northeast of the tavern beyond bridge and cliffside paths. Activate the tavern Beacon and spend vulnerable resources before the trip because taking the Heart changes the return journey.",
        ],
      },
      {
        heading: "Cross the Bone Gate and loot the Temple first",
        paragraphs: [
          "Leave the tavern, cross the rope and wooden bridges, and continue east through the mountain pass. Use the Bone Gate, also described as a Traverse Gate, to cross the chasm to the island holding the Temple of Vatra. Follow the main ruin path upward. Petrified figures along the route are more than decoration; their state changes after the objective is taken, so observe the exit and side paths while the approach is still quiet.",
          "Before collecting the Heart, complete the optional three-offering chest in the temple. Find and light the three candle offerings around the area, then open the chest for Berserker's Stone. Current guides warn that returning to this chest can become difficult or blocked after the area changes. The safest sequence is candles, chest, Tarstone, and only then the quest item. This also prevents you from fighting awakened enemies while still searching every corner for offerings.",
        ],
      },
      {
        heading: "Take the Heart and return it to Gragu",
        paragraphs: [
          "At the top of the temple, interact with the corruption-covered kneeling statue and take the Heart of Vatra from its hands. The nearby petrified cultists awaken and attack after the pickup. Do not remain surrounded to prove that the enemies are manageable. Move back toward the gate, use the available side route if the original passage is blocked, and return to the tavern with the quest item intact.",
          "Speak to Gragu and agree to give him the Heart. The cutscene shows him consume it and die, after which you can inherit Gragu, the Insatiable as a playable Shell. The hand-in also supports the related Heartless achievement or trophy. The Heart has no alternate stat bonus, crafting recipe, or recipient documented in the current build. Holding it simply leaves this Shell unlock unfinished.",
        ],
        bullets: [
          "Nearest stable landmark: One-Legged Wolf Tavern.",
          "Quest destination: Temple of Vatra to the east.",
          "Optional reward to collect first: Berserker's Stone.",
          "Quest result: Gragu becomes a permanent playable Shell.",
        ],
      },
      {
        heading: "Build Gragu for enemy-dense routes",
        paragraphs: [
          "Gragu changes the normal sustain rhythm through Hunger and his kill-charged Resonant Heart. That makes him naturally comfortable in routes with enough ordinary enemies to keep the engine moving. Favor a weapon you can finish kills with consistently: fast forms help secure a weakened target before it escapes, while wide attacks make crowded encounters easier to convert into continued momentum. Axe and Dagger or Axatana provide flexible speeds without forcing one heavy commitment in every situation.",
          "Kill-triggered Tarstones make sense during exploration because Gragu already wants a sequence of defeated enemies. Reconsider them before a solitary boss with no adds; an effect that never receives its trigger is an empty slot. Bring dependable damage, Break, or defense for those arenas and treat any spectral summon as a separate Glimpse decision. Gragu can produce impressive route-clearing momentum, but his build is more conditional than Eredrim's durability or Tiel's dodge utility. Test him where Hunger has fuel before judging him in an isolated duel.",
        ],
      },
    ],
    sources: [
      { label: "Mortal Shell II official Shell and combat overview", url: "https://mortalshell.com/", type: "Official" },
      { label: "GamesRadar confirmed eight-Shell launch roster", url: "https://www.gamesradar.com/games/rpg/mortal-shell-2-shells/", type: "Editorial" },
      { label: "NerdsChalk Heart of Vatra and Gragu route", url: "https://nerdschalk.com/mortal-shell-2-heart-of-vatra-and-gragu-shell-guide-how-to-get-uses-and-location/", type: "Editorial" },
      { label: "GameTyrant Heart of Vatra walkthrough", url: "https://gametyrant.com/news/mortal-shell-2-how-to-get-the-heart-of-vatra-for-gragu", type: "Editorial" },
      { label: "Windows Central launch review and Gragu combat notes", url: "https://www.windowscentral.com/gaming/mortal-shell-2-is-both-a-love-letter-and-an-inspiration-to-the-soulslike-genre", type: "Editorial" },
    ],
    related: ["genessa", "shell-tier-list", "tarstones"],
  },
];
