import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.marvelrivalsseason9.wiki'
  const path = '/about'

  return {
    title: 'About Marvel Rivals Season 9 Wiki - Your Ultimate Hero Shooter Resource',
    description: 'Learn about Marvel Rivals Season 9 Wiki, a community-driven resource hub providing hero guides, tier lists, Season 9 updates, redeem codes, and strategies for Marvel Rivals.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Marvel Rivals Season 9 Wiki',
      title: 'About Marvel Rivals Season 9 Wiki',
      description: 'Learn about our mission to provide the best Marvel Rivals Season 9 resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Marvel Rivals Season 9 Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Marvel Rivals Season 9 Wiki',
      description: 'Learn about our mission to provide the best Marvel Rivals Season 9 resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Marvel Rivals Season 9 Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Marvel Rivals
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Marvel Rivals Season 9 Wiki</h2>
            <p>
              Marvel Rivals Season 9 Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              master the 6v6 super hero team shooter &quot;Marvel Rivals&quot;. We are a community-driven platform that provides comprehensive hero guides,
              tier lists, Season 9 &quot;Mystery of Thebes&quot; coverage, map strategies, redeem codes, and competitive insights to enhance your gaming experience.
            </p>
            <p>
              Whether you&apos;re a new player just learning the ropes of team composition or a seasoned veteran looking to optimize your ranked climb,
              Marvel Rivals Season 9 Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower Marvel Rivals players with accurate, up-to-date information
              and powerful tools</strong> that help them succeed in the game. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest hero balances, Season 9 changes, and patch notes</li>
              <li><strong>Build useful tools:</strong> Develop tier lists, hero counters, and guides that help players make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where players can learn, share strategies, and grow together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Marvel Rivals Season 9 Wiki as the <strong>go-to destination</strong> for every Marvel Rivals player seeking
              to improve their gameplay. We want to be the resource that players trust and rely on, whether they need
              hero guides, want to check the latest tier list, or are looking for Season 9 redeem codes.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🦸</div>
              <h3 className="text-xl font-semibold text-white mb-2">Hero Guides</h3>
              <p className="text-slate-300">
                In-depth guides for every hero — abilities, combos, synergies, and matchups.
                Master your main and flex with confidence.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-2">Tier Lists</h3>
              <p className="text-slate-300">
                Regularly updated tier lists for every role and rank, reflecting the Season 9 meta
                and the latest balance changes.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎁</div>
              <h3 className="text-xl font-semibold text-white mb-2">Redeem Codes</h3>
              <p className="text-slate-300">
                A constantly refreshed list of active redeem codes for free cosmetics, currencies,
                and Season 9 rewards.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🗺️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Maps & Modes</h3>
              <p className="text-slate-300">
                Detailed breakdowns of every map and game mode, including the new Season 9
                &quot;Mystery of Thebes&quot; map and its objectives.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Season 9 Updates</h3>
              <p className="text-slate-300">
                Full coverage of the &quot;Mystery of Thebes&quot; season — new heroes, balance patches,
                battle pass, and everything Season 9 brings.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages so players around the world can enjoy
                Marvel Rivals Season 9 resources in their own language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Marvel Rivals Season 9 Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from players of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New tech, hero synergies, and pro tips shared by players</li>
              <li><strong>Patch updates:</strong> We monitor official patch notes and adjust our content accordingly</li>
              <li><strong>Meta shifts:</strong> We track the ranked meta and update tier lists based on real player experiences</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you&apos;ve found a new hero tech, a fresh redeem code,
              or have suggestions for new guides, we&apos;d love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Marvel Rivals Season 9 Wiki is maintained by a dedicated team of passionate gamers and developers who love
              Marvel Rivals as much as you do. We&apos;re players first, constantly testing team comps, grinding ranked,
              and staying updated with the latest meta.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game analysis:</strong> Deep understanding of Marvel Rivals heroes, mechanics, and the competitive meta</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: &quot;Thebes&quot; — Unraveling the mystery, together.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Marvel Rivals Season 9 Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with NetEase Games, Marvel Entertainment, or any official entities related to Marvel Rivals.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Marvel Rivals Season 9 Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@marvelrivalsseason9.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@marvelrivalsseason9.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@marvelrivalsseason9.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@marvelrivalsseason9.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@marvelrivalsseason9.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@marvelrivalsseason9.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@marvelrivalsseason9.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@marvelrivalsseason9.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest hero guides, tier lists, redeem codes, and Marvel Rivals Season 9 news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
