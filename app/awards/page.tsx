import { Award, BadgeCheck } from 'lucide-react'

const awards = [
  {
    title: 'Award Title',
    issuer: 'Issuing Organization',
    date: 'Month Year',
    description: 'Brief description of what this award recognizes and why you received it.',
    type: 'award' as const,
  },
  {
    title: 'Another Award',
    issuer: 'Issuing Organization',
    date: 'Month Year',
    description: 'Brief description of what this award recognizes and why you received it.',
    type: 'award' as const,
  },
]

const certifications = [
  {
    title: 'Statistical Learning with Python',
    issuer: 'edX / Stanford Online',
    date: 'Aug 2024',
    expiry: null,
    description:
      'Covers supervised and unsupervised statistical learning methods including regression, classification, resampling, regularization, tree-based models, SVMs, and clustering — with hands-on Python implementation.',
    credentialUrl: 'https://courses.edx.org/certificates/ae584166315c4b23a10349636b70ce30',
    type: 'cert' as const,
  },
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Mar 2026',
    expiry: 'Mar 2029',
    description:
      'Validates the ability to design secure, resilient, high-performing, and cost-optimized architectures on AWS — covering core services across compute, storage, networking, databases, and security. Exam: SAA-C03.',
    credentialUrl: 'https://www.credly.com/badges/b1b43a93-c508-41ed-93c6-7efb44c70d1b/public_url',
    type: 'cert' as const,
  },
]

function AwardCard({ item }: { item: typeof awards[0] }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 transition-all">
      <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
        <Award size={18} className="text-amber-500" />
      </div>
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-slate-900">{item.title}</h3>
          <span className="text-xs text-slate-400 whitespace-nowrap mt-0.5">{item.date}</span>
        </div>
        <p className="text-sm text-violet-600 font-medium mb-2">{item.issuer}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

function CertCard({ item }: { item: typeof certifications[0] }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 transition-all">
      <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
        <BadgeCheck size={18} className="text-violet-500" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-slate-900">{item.title}</h3>
          <span className="text-xs text-slate-400 whitespace-nowrap mt-0.5">
            {item.date}
            {item.expiry && <> · Expires {item.expiry}</>}
          </span>
        </div>
        <p className="text-sm text-violet-600 font-medium mb-2">{item.issuer}</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.description}</p>
        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-violet-500 hover:text-violet-700 transition-colors"
          >
            View Credential →
          </a>
        )}
      </div>
    </div>
  )
}

export default function Awards() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm font-semibold text-violet-500 mb-2 tracking-widest uppercase">
        Recognition
      </p>
      <h2 className="text-4xl font-bold text-slate-900 mb-10">Awards & Certifications</h2>

      <section className="mb-12">
        <h3 className="text-lg font-semibold text-slate-900 mb-5">Awards</h3>
        <div className="space-y-4">
          {awards.map((item) => (
            <AwardCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-5">Certifications</h3>
        <div className="space-y-4">
          {certifications.map((item) => (
            <CertCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
