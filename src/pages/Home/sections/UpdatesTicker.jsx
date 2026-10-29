const updates = ['Immediate possession', 'Rishita Manhattan cashback offer', 'Book your dream home today']

export default function UpdatesTicker() {
  const line = <>{[...updates, ...updates].map((text, index) => <span key={index}><i aria-hidden="true">✦</i>{text}</span>)}</>
  return <div className="ar-ticker"><span className="ar-ticker-label"><i aria-hidden="true"/>Latest updates</span><div className="ar-ticker-window"><div className="ar-ticker-track"><div>{line}</div><div aria-hidden="true">{line}</div></div></div></div>
}
