import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data/projects';
import LeadForm from '@/components/ui/LeadForm';
import { ArrowLeft, MapPin, Home, DollarSign } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-muted">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{project.name}</h1>
            <p className="text-lg text-muted-foreground">{project.location}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Back Button */}
        <Link href="/projects">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Overview */}
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Project Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Location</p>
                    <p className="text-foreground font-semibold">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Units</p>
                    <p className="text-foreground font-semibold">{project.units}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Price</p>
                    <p className="text-foreground font-semibold">{project.priceRange}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Project Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6 sticky top-20">
              <h3 className="text-xl font-bold text-foreground mb-6">Project Details</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      project.status === 'ongoing' ? 'bg-yellow-500' :
                      project.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-foreground capitalize font-semibold">{project.status}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Configuration</p>
                  <p className="text-foreground">{project.units}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Possession</p>
                  <p className="text-foreground">{project.possession}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Price</p>
                  <p className="text-2xl font-bold text-primary">{project.priceRange}</p>
                </div>

                <div className="border-t border-border pt-6">
                  <Link href="#inquiry-form">
                    <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      Request Information
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Units</span>
                  <span className="font-semibold text-foreground">{project.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-semibold text-foreground text-right">{project.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <section
          id="inquiry-form"
          className="mt-16 bg-card border border-border rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Interested in this project?</h2>
          <p className="text-muted-foreground mb-8">Fill out the form below and our team will reach out to you shortly.</p>
          <LeadForm />
        </section>
      </div>
      <Footer />
    </main>
    </>
  );
}
