import Link from 'next/link';
import { cta } from '@/content/site';

export default function CtaBand({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="cta">
      <div className="wrap">
        <h2>{heading}</h2>
        <p>{body}</p>
        <div className="btns">
          <Link className="btn btn--gold" href={cta.owner.href}>
            {cta.owner.label}
          </Link>
          <Link className="btn btn--line-light" href={cta.investor.href}>
            {cta.investor.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
