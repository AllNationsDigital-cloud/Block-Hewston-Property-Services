import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import HeroBg from '@/components/HeroBg';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import { Section, SecHead } from '@/components/Sections';
import StateMap from '@/components/StateMap';
import Tiles from '@/components/Tiles';
import { cta, home, images, propertyServices } from '@/content/site';

export default function HomePage() {
  const h = home;
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <HeroBg />
        <div className="wrap hero__in">
          <p className="kicker">{h.hero.kicker}</p>
          <h1>
            {h.hero.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="lede">{h.hero.sub}</p>
          <div className="btns">
            <Link className="btn btn--gold" href={cta.owner.href}>
              {cta.owner.label}
            </Link>
            <Link className="btn btn--line-light" href={cta.investor.href}>
              {cta.investor.label}
            </Link>
          </div>
        </div>
        <div className="wrap">
          <ul className="hero__facts">
            {h.hero.markets.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* THREE TIERS */}
      <Section>
        <SecHead heading={h.tiersHeading} intro={h.tiersIntro} />
        <Tiles
          cols={3}
          items={h.tiers.map((t) => ({ title: t.title, body: t.body, img: images[t.img], href: t.href, cta: t.linkLabel }))}
        />
      </Section>

      {/* OWNERS */}
      <Section tone="tint">
        <SecHead kicker={h.owners.kicker} heading={h.owners.heading} intro={h.owners.body} />
        <Rail items={propertyServices.process.steps.map((s) => ({ title: s.title, body: s.body, icon: s.icon }))} />
        <Reveal className="btns" >
          <div style={{ marginTop: '2rem' }}>
            <Link className="btn btn--dark" href={cta.owner.href}>
              {cta.owner.label}
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* INVESTORS */}
      <Section tone="dark">
        <SecHead kicker={h.investors.kicker} heading={h.investors.heading} intro={h.investors.body} />
        <Reveal>
          <div className="cells cells--3">
            {h.investors.pillars.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div className="btns" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--gold" href={cta.investor.href}>
              {cta.investor.label}
            </Link>
            <Link className="btn btn--line-light" href="/development/">
              The plan
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* MARKETS */}
      <Section>
        <div className="split">
          <Reveal>
            <p className="kicker">Markets</p>
            <h2>{h.markets.heading}</h2>
            <span className="rule" />
            <p className="lede">{h.markets.body}</p>
            <ul className="ticks">
              {h.hero.markets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <Link className="btn" href="/markets/">
              View markets
            </Link>
          </Reveal>
          <Reveal delay={150} className="map">
            <StateMap />
          </Reveal>
        </div>
      </Section>

      <CtaBand heading={h.closing.heading} body={h.closing.body} />
    </>
  );
}
