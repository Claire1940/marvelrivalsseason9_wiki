"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  Gem,
  Gift,
  ScrollText,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  if (linkData) {
    const href = locale === "en" ? linkData.url : `/${locale}${linkData.url}`;
    return (
      <Link
        href={href}
        className={`${className || ""} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

// Shared module header (icon + title + intro) for consistent styling
function ModuleHeader({
  icon: Icon,
  title,
  intro,
  linkData,
  locale,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  intro: string;
  linkData: { url: string; title: string } | null | undefined;
  locale: string;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icon className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
        <h2 className="text-3xl md:text-5xl font-bold">
          <LinkedTitle linkData={linkData} locale={locale}>
            {title}
          </LinkedTitle>
        </h2>
      </div>
      <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
        {intro}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.marvelrivalsseason9.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Marvel Rivals Season 9 Wiki",
        description:
          "Complete Marvel Rivals Season 9 Wiki covering heroes, tier lists, the Mystery of Thebes season, maps, redeem codes, and strategy for the 6v6 super hero team shooter.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Marvel Rivals Season 9 - 6v6 Super Hero Team Shooter",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Marvel Rivals Season 9 Wiki",
        alternateName: "Marvel Rivals Season 9",
        url: siteUrl,
        description:
          "Complete Marvel Rivals Season 9 Wiki resource hub for heroes, tier lists, the Mystery of Thebes season, redeem codes, and strategy guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Marvel Rivals Season 9 Wiki - 6v6 Super Hero Team Shooter",
        },
        sameAs: [
          "https://store.steampowered.com/app/2767030/Marvel_Rivals/",
          "https://discord.com/invite/marvelrivals",
          "https://www.reddit.com/r/MarvelRivals/",
          "https://www.youtube.com/@MarvelRivals",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Marvel Rivals",
        gamePlatform: ["PC", "Steam", "PlayStation 5", "Xbox Series X|S"],
        applicationCategory: "Game",
        genre: ["Shooter", "Hero Shooter", "Action", "Strategy"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 12,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://store.steampowered.com/app/2767030/Marvel_Rivals/",
        },
      },
      {
        "@type": "VideoObject",
        name: "The Mystery of Thebes | Marvel Rivals Season 9 Trailer",
        description:
          "Official Marvel Rivals Season 9 trailer — The Mystery of Thebes, featuring the new season launch, new heroes, and the new map.",
        uploadDate: "2026-07-08",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/YusekrZKvwQ",
        url: "https://www.youtube.com/watch?v=YusekrZKvwQ",
      },
    ],
  };

  // Patch notes accordion state
  const [patchExpanded, setPatchExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid navigation anchors — must match the 8 module section ids below
  const sectionIds = [
    "release-roadmap",
    "codes-rewards",
    "new-heroes",
    "tier-list-meta",
    "battle-pass",
    "patch-notes",
    "team-up-guide",
    "beginner-guide",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                          bg-[hsl(var(--nav-theme)/0.1)]
                          border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes-rewards")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://store.steampowered.com/app/2767030/Marvel_Rivals/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section — 紧跟 Hero 之后，max-w-5xl 避免挤压广告 */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="YusekrZKvwQ"
              title="Marvel Rivals Season 9 | The Mystery of Thebes Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards (位于视频之后、Latest Updates 之前) */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                bg-[hsl(var(--nav-theme)/0.1)]
                                flex items-center justify-center
                                group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Release Date & Roadmap (table) */}
      <section id="release-roadmap" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={CalendarClock}
            title={t.modules.season9ReleaseRoadmap.title}
            intro={t.modules.season9ReleaseRoadmap.intro}
            linkData={moduleLinkMap["season9ReleaseRoadmap"]}
            locale={locale}
          />
          <div className="scroll-reveal overflow-hidden rounded-xl border border-border">
            {t.modules.season9ReleaseRoadmap.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-[260px_1fr] gap-1 md:gap-6 p-4 md:p-6 ${
                    index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                  } border-b border-border last:border-b-0`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] font-semibold whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                  <div>
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`season9ReleaseRoadmap::items::${index}`]
                      }
                      locale={locale}
                      className="font-bold text-base md:text-lg text-[hsl(var(--nav-theme-light))]"
                    >
                      {item.value}
                    </LinkedTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.details}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Codes & Free Rewards (code-cards) */}
      <section
        id="codes-rewards"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Gift}
            title={t.modules.season9CodesRewards.title}
            intro={t.modules.season9CodesRewards.intro}
            linkData={moduleLinkMap["season9CodesRewards"]}
            locale={locale}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.season9CodesRewards.items.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-base md:text-lg">
                      <LinkedTitle
                        linkData={
                          moduleLinkMap[`season9CodesRewards::items::${index}`]
                        }
                        locale={locale}
                      >
                        {item.name}
                      </LinkedTitle>
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.25)]">
                    <ClipboardCheck className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                    <code className="text-xs md:text-sm font-mono font-semibold text-[hsl(var(--nav-theme-light))]">
                      {item.code}
                    </code>
                  </div>
                  <p className="text-sm font-semibold mb-1">{item.reward}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.howToClaim}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 3: New Heroes (card-list) */}
      <section id="new-heroes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Users}
            title={t.modules.season9NewHeroes.title}
            intro={t.modules.season9NewHeroes.intro}
            linkData={moduleLinkMap["season9NewHeroes"]}
            locale={locale}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.season9NewHeroes.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-lg text-[hsl(var(--nav-theme-light))]">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`season9NewHeroes::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.hero}
                    </LinkedTitle>
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] whitespace-nowrap">
                    {item.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {item.releasePosition}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.playstyle}
                </p>
                <ul className="space-y-1.5 mb-3">
                  {item.keyAbilities.map((ability: string, ai: number) => (
                    <li key={ai} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{ability}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
                  {item.loreHook}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Tier List & Meta (tier-grid) */}
      <section
        id="tier-list-meta"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Trophy}
            title={t.modules.season9TierListMeta.title}
            intro={t.modules.season9TierListMeta.intro}
            linkData={moduleLinkMap["season9TierListMeta"]}
            locale={locale}
          />
          <div className="scroll-reveal space-y-4">
            {t.modules.season9TierListMeta.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-base md:text-lg">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`season9TierListMeta::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.tier}
                    </LinkedTitle>
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                    {item.roleFocus}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.heroes.map((hero: string, hi: number) => (
                    <span
                      key={hi}
                      className="text-xs px-2.5 py-1 rounded-md bg-[hsl(var(--nav-theme)/0.08)] border border-border"
                    >
                      {hero}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.whyItMatters}
                </p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.25)]">
                  <Star className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{item.playerTakeaway}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: Battle Pass & Skins (card-list) */}
      <section id="battle-pass" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Gem}
            title={t.modules.season9BattlePass.title}
            intro={t.modules.season9BattlePass.intro}
            linkData={moduleLinkMap["season9BattlePass"]}
            locale={locale}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.season9BattlePass.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`season9BattlePass::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.title}
                    </LinkedTitle>
                  </h3>
                </div>
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-3">
                  {item.badge}
                </span>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <ul className="space-y-1.5">
                  {item.highlights.map((h: string, hi: number) => (
                    <li key={hi} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Patch Notes (accordion) */}
      <section
        id="patch-notes"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={ScrollText}
            title={t.modules.season9PatchNotes.title}
            intro={t.modules.season9PatchNotes.intro}
            linkData={moduleLinkMap["season9PatchNotes"]}
            locale={locale}
          />
          <div className="scroll-reveal space-y-2">
            {t.modules.season9PatchNotes.items.map((item: any, index: number) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setPatchExpanded(patchExpanded === index ? null : index)
                  }
                  className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span>
                    <span className="font-semibold block">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.summary}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      patchExpanded === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {patchExpanded === index && (
                  <div className="px-5 pb-5">
                    <ul className="space-y-2">
                      {item.details.map((d: string, di: number) => (
                        <li key={di} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Team-Up Abilities Guide (card-list) */}
      <section id="team-up-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Swords}
            title={t.modules.season9TeamUpGuide.title}
            intro={t.modules.season9TeamUpGuide.intro}
            linkData={moduleLinkMap["season9TeamUpGuide"]}
            locale={locale}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.season9TeamUpGuide.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`season9TeamUpGuide::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.title}
                    </LinkedTitle>
                  </h3>
                </div>
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-3">
                  {item.badge}
                </span>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.bestFor.map((b: string, bi: number) => (
                    <span
                      key={bi}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[hsl(var(--nav-theme)/0.08)] border border-border"
                    >
                      <Check className="w-3 h-3 text-[hsl(var(--nav-theme-light))]" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Beginner Guide (step-by-step) */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={BookOpen}
            title={t.modules.season9BeginnerGuide.title}
            intro={t.modules.season9BeginnerGuide.intro}
            linkData={moduleLinkMap["season9BeginnerGuide"]}
            locale={locale}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.season9BeginnerGuide.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    <LinkedTitle
                      linkData={
                        moduleLinkMap[`season9BeginnerGuide::items::${index}`]
                      }
                      locale={locale}
                    >
                      {item.title}
                    </LinkedTitle>
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <ul className="space-y-1.5">
                    {item.tips.map((tip: string, ti: number) => (
                      <li key={ti} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/marvelrivals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/MarvelRivals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/MarvelRivals/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@MarvelRivals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
