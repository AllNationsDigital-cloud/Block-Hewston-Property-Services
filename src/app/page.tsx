import Masthead from '@/components/Masthead';
import Reveal from '@/components/Reveal';
import { Button, CTABand, Hero, ImageCards, ProcessSteps, SectionHeader, Statement } from '@/components/ui';
import { cta, home, photos } from '@/content/site';

export default function HomePage() {
  const h = home;
  return (
    <>
      <Hero
        photo={photos.dallasSkyline}
        title={h.hero.title}
        lede={h.hero.lede}
        masthead={<Masthead overlay />}
        position="center 40%"
        actions={
          <>
            <Button href={cta.owner.href} tone="dark" arrow>{cta.owner.label}</Button>
            <Button href={cta.investor.href} tone="dark" variant="secondary">{cta.investor.label}</Button>
          </>
        }
      />

      <div className="pad">
        <SectionHeader title={h.intro.title} lede={h.intro.lede} action={<Button href={h.intro.action.href} arrow>{h.intro.action.label}</Button>} />
      </div>

      <ImageCards items={h.engage.map((t) => ({ ...t, photo: photos[t.photo] }))} />

      <div className="pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={h.assets.eyebrow} title={h.assets.title} />
          <ProcessSteps steps={h.assets.items} />
          <div>
            <Button href={h.assets.action.href} variant="text" arrow>{h.assets.action.label}</Button>
          </div>
        </div>
      </div>

      <section className="alt pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={h.how.eyebrow} title={h.how.title} />
          <ProcessSteps steps={h.how.steps} />
        </div>
      </section>

      <section className="pad">
        <div className="grid-2">
          {h.audiences.map((a, i) => (
            <Reveal key={a.eyebrow} delay={i * 120}>
              <div className="step" style={{ gap: 24 }}>
                <div className="eyebrow">{a.eyebrow}</div>
                <h2 className="display" style={{ fontSize: 'clamp(30px,3.6vw,52px)', lineHeight: 1, fontWeight: 800 }}>
                  {a.title.map((l) => <span key={l}>{l}</span>)}
                </h2>
                <p className="lead" style={{ fontSize: 21 }}>{a.body}</p>
                <div>
                  <Button href={i === 0 ? cta.owner.href : cta.investor.href} variant={i === 0 ? 'primary' : 'secondary'} arrow>
                    {i === 0 ? cta.owner.label : cta.investor.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="alt pad">
        <div className="stack" style={{ gap: 40 }}>
          <Statement lines={h.markets.lines} />
          <Reveal>
            <p className="lead" style={{ marginBottom: 28 }}>{h.markets.body}</p>
            <Button href="/markets/" variant="text" arrow>View markets</Button>
          </Reveal>
        </div>
      </section>

      <CTABand title={h.cta.title} lede={h.cta.lede} />
    </>
  );
}
