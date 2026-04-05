import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { INSIGHTS } from '@/lib/data/insights';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

interface InsightDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  const insight = INSIGHTS.find((item) => item.slug === slug);

  if (!insight) {
    notFound();
  }

  const relatedInsights = INSIGHTS.filter(
    (item) => item.category === insight.category && item.slug !== insight.slug
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 inline-block">
              {insight.category}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Back Button */}
        <Link href="/insights">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {insight.category.replace('-', ' ')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {insight.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{insight.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{insight.readTime}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Main Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-lg text-foreground leading-relaxed space-y-6">
            {insight.body.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to invest?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our current projects and investment opportunities that align with the insights shared.
          </p>
          <Link href="/projects">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Explore Projects
            </button>
          </Link>
        </section>
      </article>

      {/* Related Insights */}
      {relatedInsights.length > 0 && (
        <section className="bg-muted/30 py-12 md:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-foreground mb-12">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInsights.map((item) => (
                <article key={item.slug}>
                  <Link href={`/insights/${item.slug}`}>
                    <div className="group cursor-pointer bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <span className="text-xs font-semibold text-primary">{item.category}</span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-4">{item.date}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
