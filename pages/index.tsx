import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const challenges = [
  'Get a critical initiative back on track',
  'Align teams around important work',
  'Protect a launch or campaign as it goes to market',
  'Bring clarity to a complex programme',
  'Build the right senior team around a key initiative',
  'Increase the impact of existing investment',
  'Move faster without traditional agency overhead',
];

const logos = [
  'Nike',
  'Volkswagen',
  'Audi',
  'Hugo Boss',
  'Tommy Hilfiger',
  'Unilever',
  'Johnson & Johnson',
  'Royal Mail',
  'Parcelforce',
  'Post Office',
  'Fortnum & Mason',
  'Falabella',
  'Palantir',
];

const testimonials = [
  {
    quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.',
    author: 'Joel Sinnott',
    title: 'Senior Digital Lead, Nike',
  },
  {
    quote: "He doesn't just deliver. He protects the integrity of the work as it moves through the system. That's rare.",
    author: 'Anthony Mahon',
    title: 'Global Membership Director, Hugo Boss',
  },
  {
    quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.',
    author: 'Meher Mumtaz',
    title: 'Digital Brand Director, Western Union',
  },
];

const interventions = [
  {
    title: 'Bring critical work back under control',
    description:
      'When important work starts drifting, confidence drops quickly. Decisions slow down, ownership fragments, and momentum disappears. DAB Hands steps in to restore clarity, stabilise delivery, and get the work moving again.',
  },
  {
    title: 'Protect the quality of the work',
    description:
      'Strong work often loses strength as it moves through teams, approvals, platforms, and timelines. DAB Hands helps maintain alignment, execution quality, and momentum as the work moves to market.',
  },
  {
    title: 'Align teams around the work',
    description:
      'Important initiatives rarely fail because people do not care. They fail because priorities, ownership, and decision-making become disconnected. DAB Hands creates alignment around the work so teams can move faster and execute more effectively.',
  },
  {
    title: 'Build the right senior team',
    description:
      'Some initiatives need additional capability at the right level. DAB Hands builds small senior teams around critical work to increase capability, sharpen execution, and raise the level of output.',
  },
  {
    title: 'Improve how the work moves',
    description:
      'Sometimes the issue is not the strategy or creative. It is how the work is operating. DAB Hands reduces friction, clarifies ownership, and improves delivery flow across teams and stakeholders.',
  },
  {
    title: 'Get more from existing investment',
    description:
      'Most organisations already have strong people, platforms, and ideas in place. DAB Hands helps bring them together more effectively to increase impact and improve execution quality across the customer experience.',
  },
];

const Accordion = ({
  title,
  description,
  isOpen,
  onToggle,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-dab-taupe">
    <button
      onClick={onToggle}
      className="w-full py-6 flex items-center justify-between hover:opacity-70 transition-opacity"
    >
      <span className="text-lg font-semibold text-dab-charcoal text-left">{title}</span>
      <span className={`text-dab-green transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown size={24} />
      </span>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <p className="pb-6 text-dab-taupe leading-relaxed">{description}</p>
    </motion.div>
  </div>
);

export default function Home() {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-dab-cream text-dab-charcoal">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dab-cream/95 backdrop-blur-sm border-b border-dab-taupe/20">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-dab-green" />
            <span className="font-semibold text-lg">DAB hands</span>
          </div>
          <button className="px-6 py-2 bg-dab-charcoal text-dab-cream text-sm font-medium hover:opacity-80 transition">
            Start a conversation
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl font-bold leading-tight mb-2">Senior-led digital delivery for high-stakes work.</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <p className="text-xl text-dab-taupe mb-4">
              Small senior teams built around critical digital initiatives.
            </p>
            <p className="text-dab-taupe leading-relaxed mb-4">
              Helping organisations maximise the impact of important work as it moves to market. Built to help digital
              teams move faster, increase quality, and get more from existing investment.
            </p>
          </div>

          {/* Challenge Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-dab-taupe">I need to…</label>
            <select
              value={selectedChallenge}
              onChange={(e) => setSelectedChallenge(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-dab-taupe text-dab-charcoal appearance-none bg-no-repeat bg-right cursor-pointer hover:border-dab-charcoal transition"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23121212' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 12px center',
                paddingRight: '36px',
              }}
            >
              {challenges.map((challenge) => (
                <option key={challenge} value={challenge}>
                  {challenge}
                </option>
              ))}
            </select>
          </div>

          <button className="text-dab-charcoal font-medium hover:text-dab-green transition flex items-center gap-2">
            → Start a conversation
          </button>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="bg-dab-charcoal text-dab-cream py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-bold leading-tight">Where are we?</h2>

          <div className="space-y-6 text-dab-taupe">
            <p className="text-lg">
              The tools are changing. The problems aren't. Complexity is higher than ever.
            </p>
            <p>
              Inside the business, friction slows the work. Outside, competition for attention is relentless. More of
              the right work needs to get through. And more of the budget needs to go into the work itself.
            </p>
            <p className="text-2xl font-semibold text-dab-cream pt-4">
              Great ideas aren't the problem. Getting them through is.
            </p>
            <p>
              Teams pull in different directions. Decision-making slows down. Ownership becomes fragmented. What
              started strong becomes diluted as it moves through the organisation. By the time it reaches the customer,
              the outcome is weaker than it should have been.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <h2 className="text-4xl font-bold leading-tight">Where important work gets stronger</h2>

        <div className="space-y-8 text-dab-taupe">
          <p>
            DAB Hands steps in to create clarity, alignment, and momentum around critical initiatives. Bringing the
            right people together. Strengthening decision-making. Reducing friction. Raising the quality of execution.
          </p>
          <p>
            Keeping momentum high, alignment clear, and the quality of important work intact as it moves through the
            organisation.
          </p>
          <p>
            Building small senior teams around critical initiatives to increase capability, sharpen execution, and
            raise the level of the work.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-dab-taupe/10 py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gradient-to-br from-dab-green/20 to-dab-charcoal/20 rounded-lg flex items-center justify-center">
              <span className="text-6xl font-bold text-dab-green/30">DAB</span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Darren Brett</h3>
                <p className="text-dab-taupe">
                  More than 20 years leading complex digital delivery across global brands, platforms, campaigns, and
                  customer experience programmes.
                </p>
              </div>

              <div className="space-y-4 text-dab-taupe">
                <p>
                  Running an agency and owning operations, delivery, and product has shaped how I align teams, manage
                  complexity, and keep important work moving under pressure.
                </p>
                <p>
                  A key strength is the ability to move fluidly between strategic, creative, operational, and
                  executional thinking, bringing the right people together and raising the level of the work around
                  critical initiatives.
                </p>
                <p className="pt-4">
                  DAB Hands is built around that model. Senior leadership, specialist capability, and clear
                  accountability focused on the work itself.
                </p>
              </div>

              <button className="text-dab-charcoal font-medium hover:text-dab-green transition flex items-center gap-2 pt-2">
                → Start a conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">The teams behind the work</h2>
          <p className="text-dab-taupe max-w-2xl">
            DAB Hands is supported by a trusted network of senior operators, strategists, creatives, producers, and
            specialists. People I have delivered with for years. Leaders in their fields. Brought in around the
            initiative when needed. Small senior teams. Clear accountability. Built around the work itself.
          </p>
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="bg-dab-charcoal text-dab-cream py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h3 className="text-xl font-semibold">Delivered at scale for</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-dab-taupe">
            {logos.map((logo) => (
              <div key={logo} className="py-4 px-6 border border-dab-taupe/30 rounded hover:border-dab-green transition">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <h2 className="text-3xl font-bold">Trusted to lead important work</h2>

        <div className="space-y-8">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-2xl font-semibold leading-relaxed text-dab-charcoal">
              "{testimonials[currentTestimonial].quote}"
            </p>
            <div className="pt-4">
              <p className="font-semibold text-dab-charcoal">{testimonials[currentTestimonial].author}</p>
              <p className="text-dab-taupe text-sm">{testimonials[currentTestimonial].title}</p>
            </div>
          </motion.div>

          <div className="flex gap-2 pt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2 transition-all ${idx === currentTestimonial ? 'w-8 bg-dab-green' : 'w-2 bg-dab-taupe'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-dab-taupe/10 py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl font-bold">Experience across</h2>
          <div className="grid md:grid-cols-2 gap-6 text-dab-charcoal">
            {[
              'Platform and e-commerce',
              'Digital brand experience',
              'Campaigns and launches',
              'Always-on ecosystems',
              'Membership and lifecycle',
              'Cross-functional delivery leadership',
            ].map((item) => (
              <div key={item} className="py-4 flex gap-4 items-center">
                <span className="w-1 h-1 bg-dab-green rounded-full flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built For */}
      <section className="max-w-4xl mx-auto px-6 py-24 space-y-6">
        <h2 className="text-3xl font-bold">Built for</h2>
        <p className="text-xl text-dab-taupe max-w-2xl">
          Complex digital initiatives where strategy, creative, product, platforms, and customer experience need to
          move together at high quality and pace.
        </p>
        <button className="text-dab-charcoal font-medium hover:text-dab-green transition flex items-center gap-2 pt-4">
          → Start a conversation
        </button>
      </section>

      {/* Why Organisations Hire */}
      <section className="bg-dab-charcoal text-dab-cream py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-bold">Why organisations bring DAB Hands in</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Stronger alignment around important work',
              'Faster movement through complex delivery environments',
              'Higher-quality execution across the customer experience',
              'More impact from existing investment',
            ].map((item) => (
              <div key={item} className="flex gap-4">
                <span className="text-dab-green text-xl mt-1">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interventions - Accordion */}
      <section id="interventions" className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Ways DAB Hands steps in</h2>
          <p className="text-dab-taupe">
            Usually when important work starts drifting, slowing down, or fragmenting as it moves to market. DAB Hands
            steps in to restore clarity, alignment, and quality of execution around the work.
          </p>
        </div>

        <div className="space-y-0">
          {interventions.map((item, idx) => (
            <Accordion
              key={idx}
              title={item.title}
              description={item.description}
              isOpen={expandedIndex === idx}
              onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      {/* Stats and Final CTA */}
      <section className="bg-dab-charcoal text-dab-cream py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
              <p className="text-sm text-dab-taupe">Harvard Business Review</p>
              <p className="text-3xl font-bold">
                Only around 60% of strategic targets are realised
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-dab-taupe">McKinsey & Company</p>
              <p className="text-3xl font-bold">
                20–30% of revenue is lost to execution inefficiencies
              </p>
            </div>
          </div>

          <div className="border-t border-dab-taupe/20 pt-12 space-y-8">
            <div>
              <p className="text-2xl font-semibold mb-4">
                When important work needs to land properly, bring DAB Hands in.
              </p>
              <p className="text-dab-taupe">
                If a critical initiative is drifting, slowing down, or becoming fragmented, let's talk. Just a clear
                conversation about what is getting in the way and what needs to move next.
              </p>
            </div>

            <button className="px-6 py-3 border border-dab-green text-dab-green font-medium hover:bg-dab-green/10 transition">
              → Start a conversation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dab-charcoal text-dab-cream border-t border-dab-taupe/20 py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-4 text-center text-dab-taupe">
          <p>
            📧 <a href="mailto:db@dabhands.delivery" className="hover:text-dab-green transition">db@dabhands.delivery</a>
            {' '} 📞 <a href="tel:+447788711433" className="hover:text-dab-green transition">07788 711433</a>
          </p>
          <p className="text-sm">© 2024 DAB Hands. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
