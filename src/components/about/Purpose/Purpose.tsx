import './Purpose.css';

const purposeCards = [
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'To improve lives through early detection, expert diagnosis, and compassionate care,making specialist digestive healthcare more accessible to everyone.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description: 'To become a leading Centre for digestive health, setting the standard for innovation, clinical excellence, education, and patient-centred care.',
  },
] as const;

/** About-only purpose section from Figma frame 244:2677. */
export function Purpose() {
  return (
    <section className="osec-purpose" aria-labelledby="purpose-heading">
      <div className="osec-purpose__content">
        <header className="osec-purpose__header">
          <h2 id="purpose-heading">Driven by Purpose. Focused on Better Health.</h2>
          <p>Everything we do is guided by a commitment to improving lives through specialist expertise, compassionate care, and continuous innovation.</p>
        </header>

        <div className="osec-purpose__cards">
          {purposeCards.map((card) => (
            <article className={`osec-purpose__card osec-purpose__card--${card.id}`} key={card.id}>
              <div className="osec-purpose__card-heading">
                <span className="osec-purpose__icon" aria-hidden="true" />
                <h3>{card.title}</h3>
              </div>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
