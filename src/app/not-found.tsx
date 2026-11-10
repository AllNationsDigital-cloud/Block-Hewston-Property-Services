import Link from 'next/link';
import { PageHead, Section } from '@/components/Sections';

export default function NotFound() {
  return (
    <>
      <PageHead kicker="404" headline="Not found." sub="That page is not here. Return to the main site or contact us directly." />
      <Section>
        <Link className="btn btn--dark" href="/">
          Home
        </Link>
      </Section>
    </>
  );
}
