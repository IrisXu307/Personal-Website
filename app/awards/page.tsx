import { BadgeCheck } from 'lucide-react'

const awards = [
  {
    title: 'Young Women in Mathematics (YWMAC) Award',
    issuer: 'Mathematical Association of America (MAA)',
    date: '2024',
    description:
      'Recognized as a top-scoring young woman among 300,000+ worldwide AMC participants, with support from Jane Street, D.E. Shaw Group, Two Sigma, and Citadel.',
    icon: '🏆',
    rarity: 'LEGENDARY',
    rarityColor: 'text-amber-400 border-amber-700/50 bg-amber-950/30',
    glow: 'border-amber-800/40 hover:border-amber-500/60',
  },
  {
    title: 'AMC 12 A — Jane Street Certificate of Excellence',
    issuer: 'MAA American Mathematics Competitions',
    date: '2024',
    description:
      'Recognized for outstanding achievement in the American Mathematics Competition 12 A.',
    icon: '⭐',
    rarity: 'EPIC',
    rarityColor: 'text-violet-400 border-violet-700/50 bg-violet-950/30',
    glow: 'border-violet-800/40 hover:border-violet-500/60',
  },
  {
    title: 'AIME — Certificate of Excellence',
    issuer: 'MAA American Mathematics Competitions',
    date: '2024',
    description:
      'Qualified to compete in the American Invitational Mathematics Competition (AIME) by scoring in the top tier on the AMC 12.',
    icon: '🎯',
    rarity: 'EPIC',
    rarityColor: 'text-violet-400 border-violet-700/50 bg-violet-950/30',
    glow: 'border-violet-800/40 hover:border-violet-500/60',
  },
  {
    title: 'Canadian Computing Competition (Senior) — Certificate of Distinction',
    issuer: 'CEMC, University of Waterloo',
    date: '2024',
    description:
      'Ranked in the top 25% of contestants in the CCC Senior Division.',
    icon: '💻',
    rarity: 'RARE',
    rarityColor: 'text-cyan-400 border-cyan-700/50 bg-cyan-950/30',
    glow: 'border-cyan-800/40 hover:border-cyan-500/60',
  },
  {
    title: 'Fermat Contest — Certificate of Distinction',
    issuer: 'CEMC, University of Waterloo',
    date: '2024',
    description:
      'Ranked in the top 25% of contestants in the CEMC Fermat Contest.',
    icon: '∑',
    rarity: 'RARE',
    rarityColor: 'text-cyan-400 border-cyan-700/50 bg-cyan-950/30',
    glow: 'border-cyan-800/40 hover:border-cyan-500/60',
  },
  {
    title: 'AMC 12 — Certificate of Distinction',
    issuer: 'MAA American Mathematics Competitions',
    date: '2023',
    description:
      'Scored in the top 5% on the American Mathematics Competition 12.',
    icon: '📐',
    rarity: 'RARE',
    rarityColor: 'text-cyan-400 border-cyan-700/50 bg-cyan-950/30',
    glow: 'border-cyan-800/40 hover:border-cyan-500/60',
  },
  {
    title: 'Euclid Contest — Certificate of Distinction',
    issuer: 'CEMC, University of Waterloo',
    date: '2023',
    description:
      'Ranked in the top 25% of contestants in the CEMC Euclid Contest.',
    icon: '📏',
    rarity: 'RARE',
    rarityColor: 'text-cyan-400 border-cyan-700/50 bg-cyan-950/30',
    glow: 'border-cyan-800/40 hover:border-cyan-500/60',
  },
]

const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Mar 2026',
    expiry: 'Mar 2029',
    description:
      'Validates ability to design secure, resilient, high-performing, and cost-optimized architectures on AWS — compute, storage, networking, databases, security. Exam: SAA-C03.',
    credentialUrl: 'https://www.credly.com/badges/b1b43a93-c508-41ed-93c6-7efb44c70d1b/public_url',
    icon: '☁️',
    color: 'border-amber-800/40 hover:border-amber-500/60',
    tagColor: 'text-amber-400',
  },
  {
    title: 'Statistical Learning with Python',
    issuer: 'edX / Stanford Online',
    date: 'Aug 2024',
    expiry: null,
    description:
      'Supervised and unsupervised learning: regression, classification, resampling, regularization, tree-based models, SVMs, and clustering — with Python.',
    credentialUrl: 'https://courses.edx.org/certificates/ae584166315c4b23a10349636b70ce30',
    icon: '🧮',
    color: 'border-violet-800/40 hover:border-violet-500/60',
    tagColor: 'text-violet-400',
  },
]

const rarityOrder = ['LEGENDARY', 'EPIC', 'RARE']

export default function Awards() {
  return (
    <div className="game-grid min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-violet-500 tracking-[0.4em] mb-2 uppercase">── recognition ──</p>
        <h2 className="text-4xl font-bold text-slate-100 mb-2">Achievements</h2>
        <p className="font-mono text-sm text-slate-600 mb-10">{awards.length} unlocked</p>

        {/* Awards by rarity */}
        {rarityOrder.map((rarity) => {
          const group = awards.filter((a) => a.rarity === rarity)
          if (!group.length) return null
          return (
            <section key={rarity} className="mb-10">
              <h3 className={`font-mono text-xs font-bold tracking-[0.3em] mb-4 ${
                rarity === 'LEGENDARY' ? 'text-amber-500' :
                rarity === 'EPIC' ? 'text-violet-400' : 'text-cyan-500'
              }`}>
                ◆ {rarity}
              </h3>
              <div className="space-y-3">
                {group.map((item) => (
                  <div
                    key={item.title}
                    className={`flex gap-4 rounded-xl border bg-[#0d0b1e] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${item.glow}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold text-slate-100 text-sm leading-snug">{item.title}</h4>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs text-slate-600">{item.date}</span>
                          <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.rarityColor}`}>
                            {item.rarity}
                          </span>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-violet-500 mb-1.5">{item.issuer}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Certifications */}
        <section className="mt-14">
          <p className="font-mono text-xs text-violet-500 tracking-[0.4em] mb-2 uppercase">── equipped ──</p>
          <h3 className="text-2xl font-bold text-slate-100 mb-6">Certifications</h3>
          <div className="space-y-4">
            {certifications.map((item) => (
              <div
                key={item.title}
                className={`flex gap-4 rounded-xl border bg-[#0d0b1e] p-5 transition-all hover:-translate-y-0.5 ${item.color}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <BadgeCheck size={18} className={item.tagColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-slate-100 text-sm">{item.title}</h4>
                    <span className="font-mono text-xs text-slate-600 whitespace-nowrap shrink-0">
                      {item.date}{item.expiry && ` · exp ${item.expiry}`}
                    </span>
                  </div>
                  <p className={`font-mono text-xs mb-1.5 ${item.tagColor}`}>{item.issuer}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.description}</p>
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-xs font-bold hover:opacity-70 transition-opacity ${item.tagColor}`}
                    >
                      VIEW CREDENTIAL →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
