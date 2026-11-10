import Container from './Container';
import PhotoSlot, { PlaceholderTag } from './PhotoSlot';
import Reveal from './Reveal';

export default function PageHero({
  kicker,
  headline,
  sub,
  photo,
}: {
  kicker: string;
  headline: string;
  sub: string;
  photo?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-iron bg-ink pt-36 pb-20 sm:pt-44 sm:pb-28">
      {photo && (
        <>
          <PhotoSlot label={photo} tag={false} className="absolute inset-0 opacity-60" />
          <PlaceholderTag label={photo} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </>
      )}
      <Container className="relative">
        <Reveal className="max-w-4xl">
          <p className="kicker mb-5">{kicker}</p>
          <h1 className="display text-5xl sm:text-6xl lg:text-7xl">{headline}</h1>
          <div className="rule-gold my-7" />
          <p className="max-w-2xl text-lg text-steel sm:text-xl">{sub}</p>
        </Reveal>
      </Container>
    </header>
  );
}
