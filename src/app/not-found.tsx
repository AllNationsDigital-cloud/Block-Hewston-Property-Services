import Button from '@/components/Button';
import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero kicker="404" headline="Not found." sub="That page is not here. Return to the main site or contact us directly." />
      <div className="bg-ink pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Button href="/">Home</Button>
        </div>
      </div>
    </>
  );
}
