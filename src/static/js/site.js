/* Block & Hewston Property Services — minimal progressive-enhancement JS (no dependencies). */
(() => {
  const d = document, $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];

  /* Mobile menu */
  const btn = $('.menu-btn'), nav = $('#site-nav');
  const setMenu = (open) => { btn.setAttribute('aria-expanded', open); nav.classList.toggle('is-open', open); };
  if (btn && nav) {
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); btn.focus(); } });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  }

  /* Before / after sliders */
  $$('.ba').forEach((ba) => {
    const r = $('.ba__range', ba);
    const set = () => ba.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', set); set();
  });

  /* Forms: validation, optional multi-step, submit */
  const MAX_FILES = 10, MAX_MB = 10;
  const label = (el) => el.dataset.label || 'this field';
  const wrapOf = (el) => el.closest('.field') || el.closest('fieldset');
  const errOf = (el) => $('.field__error', wrapOf(el));
  const msgFor = (el) => {
    const v = el.validity;
    if (el.type === 'file') return el.dataset.err || '';
    if (v.valueMissing) return el.tagName === 'SELECT' ? `Please choose ${label(el)}.` : `Please enter ${label(el)}.`;
    if (v.typeMismatch && el.type === 'email') return 'Enter a valid email address, like name@company.com.';
    if (v.patternMismatch) return el.title || 'Please check this field.';
    if (v.rangeUnderflow) return el.type === 'date' ? 'Choose today or a future date.' : `Enter at least ${el.min}.`;
    return v.valid ? '' : 'Please check this field.';
  };
  const setErr = (el, msg) => {
    const w = wrapOf(el), e = errOf(el);
    w.classList.toggle('has-error', !!msg);
    if (el.type !== 'radio' && el.type !== 'checkbox') el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (e) { e.textContent = msg; if (!el.getAttribute('aria-describedby')?.includes(e.id)) el.setAttribute('aria-describedby', ((el.getAttribute('aria-describedby') || '') + ' ' + e.id).trim()); }
  };
  const checkFiles = (el) => {
    el.dataset.err = '';
    const fs = [...el.files];
    if (fs.length > MAX_FILES) el.dataset.err = `Please attach no more than ${MAX_FILES} photos.`;
    else if (fs.some((f) => !f.type.startsWith('image/'))) el.dataset.err = 'Photos must be image files (JPG, PNG, HEIC).';
    else if (fs.some((f) => f.size > MAX_MB * 1048576)) el.dataset.err = `Each photo must be under ${MAX_MB} MB.`;
    return !el.dataset.err;
  };
  const validate = (scope) => {
    let first = null;
    $$('input,select,textarea', scope).forEach((el) => {
      if (el.type === 'radio' || el.type === 'checkbox' || el.type === 'hidden' || el.disabled) return;
      const bad = el.type === 'file' ? !checkFiles(el) : !el.checkValidity();
      setErr(el, bad ? msgFor(el) : '');
      if (bad && !first) first = el;
    });
    $$('fieldset[data-group-required]', scope).forEach((fs) => {
      const ok = $$('input', fs).some((i) => i.checked);
      fs.classList.toggle('has-error', !ok);
      const e = $('.field__error', fs); if (e) e.textContent = fs.dataset.groupRequired;
      if (!ok && !first) first = $('input', fs);
    });
    $$('input[type=checkbox][required]', scope).forEach((el) => {
      setErr(el, el.checked ? '' : el.dataset.errMsg || 'Please confirm to continue.');
      if (!el.checked && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  };

  $$('form[data-form]').forEach((form) => {
    form.noValidate = true;
    const steps = $$('.step', form);
    const stepped = form.hasAttribute('data-steps') && steps.length > 1;
    const prog = $$('.progress li', form), alertBox = $('.form__alert', form);
    const panel = form.closest('[data-panel]') || form.parentElement;
    const success = $('.success', panel);
    let cur = 0;

    const show = (i, focus = true) => {
      cur = i;
      steps.forEach((s, n) => s.classList.toggle('is-active', n === i));
      prog.forEach((p, n) => { p.classList.toggle('is-current', n === i); p.classList.toggle('is-done', n < i); if (n === i) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current'); });
      if (focus) { const h = $('legend', steps[i]); if (h) { h.tabIndex = -1; h.focus(); } steps[i].scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    };
    if (stepped) { form.classList.add('is-stepped'); show(0, false); }

    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-next]')) { if (validate(steps[cur])) show(cur + 1); }
      if (e.target.closest('[data-prev]')) show(cur - 1);
    });
    form.addEventListener('input', (e) => { const el = e.target; if (el.type !== 'file' && wrapOf(el)?.classList.contains('has-error') && el.checkValidity?.()) setErr(el, ''); });
    form.addEventListener('change', (e) => {
      const el = e.target;
      if (el.type === 'file') { const l = $('[data-file-list]', form); if (l) l.innerHTML = [...el.files].map((f) => `<li>${f.name.replace(/</g, '&lt;')} (${(f.size / 1048576).toFixed(1)} MB)</li>`).join(''); checkFiles(el); setErr(el, el.dataset.err); }
      const fs = el.closest('fieldset[data-group-required]'); if (fs) fs.classList.remove('has-error');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (stepped) { for (let i = 0; i < steps.length; i++) { if (!validate(steps[i])) { show(i); return; } } }
      else if (!validate(form)) return;
      alertBox?.classList.remove('is-on');
      const submit = $('[type=submit]', form), orig = submit.textContent;
      submit.disabled = true; submit.textContent = 'Sending…';
      const fd = new FormData(form);
      const endpoint = form.dataset.endpoint || form.getAttribute('action') || '/';
      const local = /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname) || location.protocol === 'file:';
      try {
        if (!form.dataset.endpoint && local) { await new Promise((r) => setTimeout(r, 600)); console.info('[demo mode] Form not sent. Payload:', Object.fromEntries([...fd].map(([k, v]) => [k, v instanceof File ? v.name : v]))); }
        else { const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } }); if (!res.ok) throw new Error(res.status); }
        const who = $('[data-echo-name]', success); if (who) who.textContent = (fd.get('name') || '').toString().split(' ')[0] || 'there';
        form.hidden = true; $$('.hide-on-success', panel).forEach((n) => (n.hidden = true));
        success.classList.add('is-on'); success.tabIndex = -1; success.focus(); success.scrollIntoView({ block: 'start', behavior: 'smooth' });
        if (window.plausible) window.plausible('Form Submit', { props: { form: form.name } });
        if (window.gtag) window.gtag('event', 'generate_lead', { form: form.name });
      } catch (err) {
        alertBox?.classList.add('is-on'); alertBox?.focus?.();
        submit.disabled = false; submit.textContent = orig;
      }
    });
  });

  /* Footer year / date min */
  $$('input[type=date][data-min-today]').forEach((i) => { const t = new Date(); i.min = new Date(t - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); });
})();
