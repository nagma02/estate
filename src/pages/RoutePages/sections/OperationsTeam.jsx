import PageHero from '../../../components/shared/PageHero'
import { heroImages } from '../../../components/shared/heroImages'
import hrProfile from '../../../assets/reference/operations-hr-profile.jpg'
import accountsProfile from '../../../assets/reference/operations-accounts-profile.jpg'
import { CheckIcon, MailIcon } from '../../../components/shared/Icons'

const departments = [
  {
    title: 'HUMAN RESOURCES',
    name: 'JAYA SINGH',
    role: 'MANAGER - HR/ADMINISTRATION',
    image: hrProfile,
    alt: 'Jaya Singh, Manager - HR/Administration',
    description: 'Highly motivated and experienced HR professional with an MBA in HR and 5+ years of experience in managing human resources, digital branding and digital marketing in the real estate industry. Proven track record of success in developing and implementing HR strategies, managing CRM systems, and leveraging marketing apps to drive business growth.',
    expertise: ['Human Resource Management (HRM)', 'Customer Relationship Management (CRM)', 'Digital Marketing Management', 'Talent Acquisition and Management', 'Employee Engagement and Retention', 'Performance Management and Development', 'Strategic HR Planning and Organizational Development'],
    email: 'hr@advikrealtor.com',
  },
  {
    title: 'ACCOUNTS',
    name: 'MR. PRANJAL AGNIHOTRI',
    role: 'MANAGER - ACCOUNTS',
    image: accountsProfile,
    alt: 'Mr. Pranjal Agnihotri, Manager - Accounts',
    description: 'Highly motivated and experienced Operations Manager with a proven track record of success in managing day-to-day operations, improving efficiency, and driving growth.',
    expertise: ['Financial Accounting and Reporting', 'Financial Analysis and Planning', 'Taxation and Compliance', 'Operations Management', 'Budgeting and Cost Control'],
    email: 'operations@advikrealtor.com',
  },
]

const titleCase = text => text.toLowerCase().replace(/(^|[\s.-])\w/g, match => match.toUpperCase())

export default function OperationsTeam({ onNavigate }) {
  return <div className="ar-page ar-team">
    <PageHero eyebrow="Our team" title={<>The people behind <em>every handover</em></>} text="Our operations team keeps every enquiry, booking and document moving smoothly — from first call to final keys." images={heroImages.team} crumbs={[['Home', '/'], ['Operations team']]} onNavigate={onNavigate}>
      <div className="ar-team-index">{departments.map((department, index) => <a key={department.title} href={`#team-${index}`}><small>0{index + 1}</small>{titleCase(department.title)}</a>)}</div>
    </PageHero>
    <div className="ar-wrap ar-team-list">
      {departments.map((department, index) => <article className="ar-profile ar-reveal" id={`team-${index}`} key={department.title}>
        <div className="ar-profile-media"><img src={department.image} alt={department.alt}/></div>
        <div className="ar-profile-body">
          <span className="ar-chip">{titleCase(department.title)}</span>
          <h2>{titleCase(department.name)}</h2>
          <p className="ar-profile-role">{department.role}</p>
          <p>{department.description}</p>
          <h3>Key expertise</h3>
          <ul>{department.expertise.map(item => <li key={item}><CheckIcon width="14" height="14"/>{item}</li>)}</ul>
          <a className="ar-btn ar-btn-outline" href={`mailto:${department.email}`}><MailIcon width="16" height="16"/>{department.email}</a>
        </div>
      </article>)}
    </div>
  </div>
}
