export default function AboutTeamCta({ onNavigate }) {
  return <section className="about-team-cta"><div className="route-container"><span>THE PEOPLE BEHIND THE PROMISE</span><h2>Meet the Advik team</h2><button onClick={() => onNavigate('/operations')}>MEET OUR TEAM <b>→</b></button></div></section>
}
