'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import { INSIGHTS } from '@/lib/data/insights';
import SectionLabel from '@/components/ui/SectionLabel';
import { ChevronRight } from 'lucide-react';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'market-trends', 'regulatory', 'investment-guide', 'case-study'];

  const filteredInsights = INSIGHTS.filter((insight) => {
    const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory;
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Real Estate Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with expert analysis, market trends, and investment guidance from industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {filteredInsights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInsights.map((insight) => (
                <article
                  key={insight.slug}
                  className="group cursor-pointer"
                >
                  <Link href={`/insights/${insight.slug}`}>
                    <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                      {/* Category Header */}
                      <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                        <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                          {insight.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs text-muted-foreground">{insight.readTime}</span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {insight.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {insight.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">{insight.date}</span>
                          <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No insights found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
    </>
  );
}
