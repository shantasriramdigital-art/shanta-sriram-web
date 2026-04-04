'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { calculateEMI, formatCurrency } from '@/lib/utils/finance'

export default function EMICalculator() {
  const [price, setPrice] = useState(8000000)
  const [downPaymentPct, setDownPaymentPct] = useState(20)
  const [tenure, setTenure] = useState(20)
  const [rate, setRate] = useState(8.5)

  const loanAmount = price * (1 - downPaymentPct / 100)
  const emi = calculateEMI(loanAmount, rate, tenure)
  const totalPayable = emi * tenure * 12
  const totalInterest = totalPayable - loanAmount

  const sliderClass = 'w-full h-1.5 bg-[#E8ECF0] rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CD0E12] [&::-webkit-slider-thumb]:cursor-pointer accent-[#CD0E12]'

  return (
    <section id="emi-calculator" className="bg-[#F8F4EF] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div>
          <SectionLabel className="mb-4">PLAN YOUR INVESTMENT</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] mb-12 text-balance font-bold">
            Calculate Your EMI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Sliders */}
            <div className="flex flex-col gap-8">
              {/* Property Price */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-sans text-sm font-medium text-[#1A1A2E]">Property Price</label>
                  <span className="font-sans text-sm font-medium text-[#CD0E12]">{formatCurrency(price)}</span>
                </div>
                <input
                  type="range"
                  min={2000000}
                  max={50000000}
                  step={500000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className={sliderClass}
                  aria-label="Property price"
                />
                <div className="flex justify-between mt-1">
                  <span className="font-sans text-[10px] text-[#6B6B6B]">20 L</span>
                  <span className="font-sans text-[10px] text-[#6B6B6B]">5 Cr</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-sans text-sm font-medium text-[#1A1A2E]">Down Payment</label>
                  <span className="font-sans text-sm font-medium text-[#CD0E12]">{downPaymentPct}% ({formatCurrency(price * downPaymentPct / 100)})</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={40}
                  step={5}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className={sliderClass}
                  aria-label="Down payment percentage"
                />
                <div className="flex justify-between mt-1">
                  <span className="font-sans text-[10px] text-[#6B6B6B]">10%</span>
                  <span className="font-sans text-[10px] text-[#6B6B6B]">40%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-sans text-sm font-medium text-[#1A1A2E]">Loan Tenure</label>
                  <span className="font-sans text-sm font-medium text-[#CD0E12]">{tenure} years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className={sliderClass}
                  aria-label="Loan tenure"
                />
                <div className="flex justify-between mt-1">
                  <span className="font-sans text-[10px] text-[#6B6B6B]">5 yr</span>
                  <span className="font-sans text-[10px] text-[#6B6B6B]">30 yr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-sans text-sm font-medium text-[#1A1A2E]">Interest Rate (p.a.)</label>
                  <span className="font-sans text-sm font-medium text-[#CD0E12]">{rate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={12}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className={sliderClass}
                  aria-label="Interest rate"
                />
                <div className="flex justify-between mt-1">
                  <span className="font-sans text-[10px] text-[#6B6B6B]">7%</span>
                  <span className="font-sans text-[10px] text-[#6B6B6B]">12%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="bg-white border border-[#E8ECF0] rounded-md p-8">
                <h3 className="font-serif text-[#1A1A2E] text-xl mb-6">Your Investment Summary</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center py-4 border-b border-[#E8ECF0]">
                    <span className="font-sans text-sm text-[#4A4A5A]">Loan Amount</span>
                    <span className="font-serif text-[#1A1A2E] text-xl font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#E8ECF0] bg-[#CD0E12]/4 px-4 -mx-4 rounded">
                    <span className="font-sans text-sm font-medium text-[#1A1A2E]">Monthly EMI</span>
                    <span className="font-serif text-[#CD0E12] text-2xl font-medium">{formatCurrency(emi)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#E8ECF0]">
                    <span className="font-sans text-sm text-[#4A4A5A]">Total Interest</span>
                    <span className="font-serif text-[#1A1A2E] text-xl font-medium">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="font-sans text-sm text-[#4A4A5A]">Total Payable</span>
                    <span className="font-serif text-[#1A1A2E] text-xl font-medium">{formatCurrency(totalPayable)}</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 w-full block text-center text-sm font-sans font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors"
                >
                  Talk to Our Sales Team
                </Link>
              </div>
              <p className="font-sans text-[10px] text-[#6B6B6B] mt-3 leading-relaxed">
                * This calculator provides indicative figures only. Actual EMI may vary based on your lender&apos;s terms, processing fees, and applicable taxes. Please consult a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
