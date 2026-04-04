import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import SectionLabel from '@/components/ui/SectionLabel';
import LeadForm from '@/components/ui/LeadForm';
import { Briefcase, Users, Target } from 'lucide-react';

export default function CareersPage() {
  const positions = [
    {
      title: 'Senior Project Manager',
      department: 'Construction',
      location: 'Hyderabad',
      description: 'Lead project execution and coordinate with stakeholders.',
    },
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Hyderabad',
      description: 'Drive sales growth and build relationships with investors.',
    },
    {
      title: 'Architect',
      department: 'Design',
      location: 'Hyderabad',
      description: 'Design innovative residential and commercial spaces.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Hyderabad',
      description: 'Develop and execute marketing strategies across channels.',
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented professionals in a supportive and inclusive environment.',
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Develop your skills and advance your career with continuous learning opportunities.',
    },
    {
      icon: Target,
      title: 'Impactful Work',
      description: 'Contribute to projects that build communities and create lasting value.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Join Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Be part of a company that builds dreams. Join Shanta Sriram Constructions and grow your career with us.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-12 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <SectionLabel label="WHY JOIN US" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              Great Opportunities Await
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 md:py-20 bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <SectionLabel label="OPEN POSITIONS" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              Current Job Openings
            </h2>
          </div>

          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.title}
                className="bg-card border border-border rounded-lg p-6 group cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {position.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{position.description}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Application</h2>
            <p className="text-muted-foreground mb-8">
              Interested in a position? Tell us more about yourself and we&apos;ll be in touch.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
    </>
  );
}
