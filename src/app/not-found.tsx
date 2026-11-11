import Masthead from '@/components/Masthead';
import { Button, SectionHeader } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <Masthead />
      <div className="pad">
        <div className="stack" style={{ gap: 40 }}>
          <SectionHeader layout="stacked" eyebrow="404" title={['Not', 'found.']} lede="That page is not here. Return to the main site or contact us directly." />
          <div><Button href="/" arrow>Home</Button></div>
        </div>
      </div>
    </>
  );
}
