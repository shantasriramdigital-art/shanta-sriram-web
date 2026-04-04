'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { PROJECTS } from '@/lib/data/projects'

const TYPES = ['All Types', 'Apartments', 'Villas']
const LOCATIONS = ['All Locations', 'Gachibowli', 'Ameerpet X Road', 'Bahadurpally', 'TSPA Junction', 'Kismathpur–TSPA Junction']
const STATUSES = ['Any Status', 'Under Construction', 'Ready to Move']

interface SearchBarProps {
  onFilter?: (filtered: typeof PROJECTS) => void
}

export default function SearchBar({ onFilter }: SearchBarProps) {
  const [type, setType] = useState('All Types')
  const [location, setLocation] = useState('All Locations')
  const [status, setStatus] = useState('Any Status')

  const handleSearch = () => {
    let filtered = PROJECTS
    if (type !== 'All Types') filtered = filtered.filter((p) => p.type === type)
    if (location !== 'All Locations') filtered = filtered.filter((p) => p.location === location)
    if (status !== 'Any Status') filtered = filtered.filter((p) => p.status === status)
    if (onFilter) onFilter(filtered)
    const el = document.getElementById('projects-grid')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const selectClass = 'bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition appearance-none cursor-pointer flex-1 min-w-[140px]'

  return (
    <section className="bg-[#F4F7FC] py-10 mt-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div>
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-[#CD0E12] mb-3">FIND YOUR PROPERTY</p>
          <div className="flex flex-wrap items-end gap-3">
            <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass} aria-label="Property type">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass} aria-label="Location">
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass} aria-label="Status">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-[#CD0E12] text-white text-sm font-sans font-medium px-6 py-3 rounded hover:bg-[#b50d10] transition-colors flex-shrink-0"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
