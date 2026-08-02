const OFFICE = '0315203';

const contacts = [
  { name: 'آقای فریبرز بهشتی', nameEn: 'Mr. Fariborz Beheshti', extension: '۱۲۰', title: 'مدیر فروش', titleEn: 'Sales Manager', phone: '09138778737', gender: 'm', accent: '#1f9268' },
  { name: 'آقای حسینی‌نژاد', nameEn: 'Mr. Hosseini-Nejad', extension: '۱۰۳', title: 'کارشناس فروش', titleEn: 'Sales Expert', phone: '09134600576', gender: 'm', accent: '#2f6fd6' },
  { name: 'خانم نخعی', nameEn: 'Ms. Nakhaei', extension: '۱۰۲', title: 'کارشناس فروش', titleEn: 'Sales Expert', phone: '09134600254', gender: 'f', accent: '#0f9aa0' },
  { name: 'خانم بهشتی', nameEn: 'Ms. Beheshti', extension: '۲۲۰', title: 'مدیر حسابداری', titleEn: 'Accounting Manager', phone: '09134600224', gender: 'f', accent: '#7a56d0' },
  { name: 'خانم بختیاری', nameEn: 'Ms. Bakhtiari', extension: '۲۰۱', title: 'حسابداری', titleEn: 'Accounting', phone: '09133016997', gender: 'f', accent: '#d24e86' },
  { name: 'آقای توکلی', nameEn: 'Mr. Tavakoli', extension: '۳۲۰', title: 'فروش سازمانی', titleEn: 'Corporate Sales', phone: '09134600573', gender: 'm', accent: '#c88a1e' },
  { name: 'آقای منوچهری', nameEn: 'Mr. Manouchehri', extension: '۳۰۱', title: 'مدیر پروژه', titleEn: 'Project Manager', phone: '09134600223', gender: 'm', accent: '#2593c2' },
  { name: 'آقای اسدی', nameEn: 'Mr. Asadi', extension: '۴۰۰', title: 'گارانتی و خدمات', titleEn: 'Warranty & Service', phone: '09134600579', gender: 'm', accent: '#cf6a3c' }
];

const ADDRESS = 'اصفهان، خیابان طالقانی، نبش بن‌بست ۱۵';
const WEBSITE = 'https://atlascctv.ir';

const sprite = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const normalize = (phone) => `+98${phone.slice(1)}`;
const pretty = (phone) => phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
const persona = (person) => `user-${person.gender}`;
const toLatin = (s) => s.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
const fileName = (name) => `Atlas-${name.replaceAll(' ', '-')}.vcf`;
let lang = localStorage.getItem('atlas-lang') === 'en' ? 'en' : 'fa';

const contactCopy = (person) => lang === 'en'
  ? { name: person.nameEn, title: person.titleEn, extension: `Ext. ${toLatin(person.extension)}` }
  : { name: person.name, title: person.title, extension: `داخلی ${person.extension}` };

const renderContacts = () => {
  document.querySelector('#contacts').innerHTML = contacts.map((person, index) => {
    const copy = contactCopy(person);
    const labels = lang === 'en'
      ? { actions: `Ways to contact ${copy.name}`, call: `Call ${copy.name}`, whatsapp: `WhatsApp ${copy.name}`, office: `Call office, extension ${toLatin(person.extension)}`, save: `Save ${copy.name}` }
      : { actions: `راه‌های تماس با ${copy.name}`, call: `تماس با ${copy.name}`, whatsapp: `واتساپ ${copy.name}`, office: `تماس با دفتر و ${copy.extension}`, save: `ذخیره مخاطب ${copy.name}` };
    return `
      <article class="person" style="--d:${index * 70}ms;--c:${person.accent}">
        <span class="mono" aria-hidden="true">${sprite(persona(person))}</span>
        <div class="who">
          <h3>${copy.title} <small>${copy.extension}</small></h3>
          <p>${copy.name}</p>
          <a class="tel" dir="ltr" href="tel:${normalize(person.phone)}">${pretty(person.phone)}</a>
        </div>
        <div class="acts" aria-label="${labels.actions}">
          <a class="a-call" href="tel:${normalize(person.phone)}" aria-label="${labels.call}">${sprite('call')}</a>
          <a class="a-wa" href="https://wa.me/${normalize(person.phone).slice(1)}" target="_blank" rel="noopener" aria-label="${labels.whatsapp}">${sprite('whatsapp')}</a>
          <a class="a-office" href="tel:${OFFICE},,${toLatin(person.extension)}" aria-label="${labels.office}">${sprite('building')}</a>
          <button class="a-save" type="button" data-vcf="${index}" aria-label="${labels.save}">${sprite('download')}</button>
        </div>
      </article>`;
  }).join('');
};

const applyLang = (nextLang) => {
  lang = nextLang === 'en' ? 'en' : 'fa';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en]').forEach((element) => {
    if (!element.dataset.fa) element.dataset.fa = element.textContent.trim();
    element.textContent = lang === 'en' ? element.dataset.en : element.dataset.fa;
  });
  document.querySelectorAll('[data-aria-en]').forEach((element) => {
    if (!element.dataset.ariaFa) element.dataset.ariaFa = element.getAttribute('aria-label');
    element.setAttribute('aria-label', lang === 'en' ? element.dataset.ariaEn : element.dataset.ariaFa);
  });
  document.title = lang === 'en' ? 'Atlas Electronic | Contact' : 'اطلس الکترونیک | Atlas Electronic';
  localStorage.setItem('atlas-lang', lang);
  renderContacts();
};

document.querySelector('.lang-toggle').addEventListener('click', () => applyLang(lang === 'fa' ? 'en' : 'fa'));
applyLang(lang);

const initSecurityField = () => {
  const canvas = document.querySelector('.security-field');
  const hero = document.querySelector('.hero');
  const camera = document.querySelector('.sentinel-camera');
  const ctx = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !hero || !ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { width: 0, height: 0, dpr: 1, marks: [], x: 0, y: 0, targetX: 0, targetY: 0, cameraX: 0, cameraY: 0, progress: 0, active: true, frame: 0, needsSync: true };
  const point = (x, y, radius, angle) => ({ x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius });

  const buildMarks = () => {
    const count = state.width < 700 ? 24 : 44;
    state.marks = Array.from({ length: count }, (_, index) => ({
      x: ((index * 53) % 97) / 100,
      y: ((index * 31 + 17) % 89) / 100,
      phase: index * 0.73
    }));
  };

  const resize = () => {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, state.width < 700 ? 1.2 : 1.5);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    state.x = state.targetX = state.width * 0.52;
    state.y = state.targetY = state.height * 0.42;
    state.needsSync = true;
    buildMarks();
  };

  const scrollTarget = () => ({
    x: state.width * (.7 + state.progress * .17 - Math.sin(state.progress * Math.PI) * .02),
    y: state.height * (.25 + state.progress * .5)
  });

  const drawLens = (x, y, radius, start, end) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(27,25,25,.075)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(224,29,36,.13)';
    ctx.beginPath();
    ctx.arc(x, y, radius - 12, start + .06, end - .06);
    ctx.stroke();
    ctx.restore();
  };

  const drawCoverage = (x, y, angle, range, spread) => {
    const left = point(x, y, range, angle - spread);
    const right = point(x, y, range, angle + spread);
    const beam = ctx.createRadialGradient(x, y, 0, x, y, range);
    beam.addColorStop(0, 'rgba(224,29,36,.065)');
    beam.addColorStop(.54, 'rgba(224,29,36,.022)');
    beam.addColorStop(1, 'rgba(224,29,36,0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.strokeStyle = 'rgba(224,29,36,.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 9]);
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(left.x, left.y);
    ctx.moveTo(x, y); ctx.lineTo(right.x, right.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(224,29,36,.1)';
    ctx.beginPath();
    ctx.arc(x, y, range, angle - spread, angle + spread);
    ctx.stroke();
    ctx.restore();
  };

  const drawGrid = () => {
    const spacing = state.width < 700 ? 92 : 104;
    ctx.save();
    ctx.strokeStyle = 'rgba(27,25,25,.035)';
    ctx.lineWidth = 1;
    for (let x = 0; x < state.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, state.height);
      ctx.stroke();
    }
    for (let y = 0; y < state.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(state.width, y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawViewfinder = () => {
    const width = Math.min(state.width * .76, 620);
    const height = Math.min(state.height * .5, 500);
    const x = (state.width - width) / 2;
    const y = state.height * .22;
    const corner = Math.min(34, width * .08);
    ctx.save();
    ctx.strokeStyle = 'rgba(27,25,25,.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + corner); ctx.lineTo(x, y); ctx.lineTo(x + corner, y);
    ctx.moveTo(x + width - corner, y); ctx.lineTo(x + width, y); ctx.lineTo(x + width, y + corner);
    ctx.moveTo(x, y + height - corner); ctx.lineTo(x, y + height); ctx.lineTo(x + corner, y + height);
    ctx.moveTo(x + width - corner, y + height); ctx.lineTo(x + width, y + height); ctx.lineTo(x + width, y + height - corner);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(224,29,36,.16)';
    ctx.beginPath();
    ctx.moveTo(x + width * state.progress - 14, y); ctx.lineTo(x + width * state.progress + 14, y);
    ctx.moveTo(x + width * state.progress - 14, y + height); ctx.lineTo(x + width * state.progress + 14, y + height);
    ctx.stroke();
    ctx.restore();
  };

  const drawSensorMarks = (time) => {
    const lockIndex = Math.min(state.marks.length - 1, Math.floor(state.progress * state.marks.length));
    state.marks.forEach((mark, index) => {
      const drift = reducedMotion ? 0 : 1;
      const x = mark.x * state.width + Math.sin(time * .00038 + mark.phase) * 5 * drift;
      const y = mark.y * state.height + Math.cos(time * .0003 + mark.phase) * 4 * drift;
      const distance = Math.hypot(x - state.x, y - state.y);
      const strength = Math.max(index === lockIndex ? .9 : 0, 1 - distance / 190);
      ctx.fillStyle = strength ? `rgba(224,29,36,${.06 + strength * .38})` : 'rgba(27,25,25,.11)';
      ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
      if (strength > .15) {
        ctx.strokeStyle = `rgba(224,29,36,${strength * .14})`;
        ctx.beginPath();
        ctx.moveTo(state.x, state.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });
  };

  const drawScanSweep = (time) => {
    const y = state.height * (.16 + state.progress * .66);
    const pulse = .5 + Math.sin(time * .0024) * .5;
    const beam = ctx.createLinearGradient(0, y, state.width, y);
    beam.addColorStop(0, 'rgba(224,29,36,0)');
    beam.addColorStop(.22, `rgba(224,29,36,${.035 + pulse * .025})`);
    beam.addColorStop(.5, `rgba(224,29,36,${.16 + pulse * .07})`);
    beam.addColorStop(.78, `rgba(224,29,36,${.035 + pulse * .025})`);
    beam.addColorStop(1, 'rgba(224,29,36,0)');
    ctx.save();
    ctx.strokeStyle = beam;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y); ctx.lineTo(state.width, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(224,29,36,.72)';
    ctx.fillRect(state.x - 2, y - 2, 4, 4);
    ctx.restore();
  };

  const drawReticle = (time) => {
    const pulse = 2 + Math.sin(time * .003) * 1.5;
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.strokeStyle = 'rgba(224,29,36,.32)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]);
    ctx.lineDashOffset = -time * .012;
    ctx.beginPath();
    ctx.arc(0, 0, 31 + pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(27,25,25,.18)';
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-43, 0); ctx.lineTo(-20, 0);
    ctx.moveTo(20, 0); ctx.lineTo(43, 0);
    ctx.moveTo(0, -43); ctx.lineTo(0, -20);
    ctx.moveTo(0, 20); ctx.lineTo(0, 43);
    ctx.stroke();
    ctx.fillStyle = 'rgba(224,29,36,.7)';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const render = (time = 0) => {
    state.frame = 0;
    ctx.clearRect(0, 0, state.width, state.height);
    const target = scrollTarget();
    state.targetX = target.x;
    state.targetY = target.y;
    state.x += (state.targetX - state.x) * .075;
    state.y += (state.targetY - state.y) * .075;
    const cameraX = state.cameraX || state.width * .24;
    const cameraY = state.cameraY || state.height * .22;
    const bearing = Math.atan2(state.y - cameraY, state.x - cameraX);
    drawGrid();
    drawLens(cameraX, cameraY, Math.min(state.width, state.height) * .23, bearing - .56, bearing + .56);
    drawLens(cameraX, cameraY, Math.min(state.width, state.height) * .37, bearing - .5, bearing + .5);
    drawCoverage(cameraX, cameraY, bearing, state.width * .82, .44);
    drawViewfinder();
    drawScanSweep(time);
    drawSensorMarks(time);
    drawReticle(time);
    if (!reducedMotion && state.active) state.frame = requestAnimationFrame(render);
  };

  const updateVisibility = () => {
    const rect = hero.getBoundingClientRect();
    state.active = rect.bottom > 0 && rect.top < window.innerHeight;
    state.progress = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
    const fade = Math.max(0, Math.min(1, 1 - Math.max(0, -rect.top) / Math.max(rect.height, 1)));
    canvas.style.opacity = String(fade * .9);
    if (camera) {
      const x = state.progress * 48;
      const y = state.progress * 72;
      camera.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      camera.style.opacity = String(fade * .38);
      const box = camera.getBoundingClientRect();
      state.cameraX = box.left + box.width * .57;
      state.cameraY = box.top + box.height * .677;
    }
    if (state.needsSync) {
      const target = scrollTarget();
      state.x = state.targetX = target.x;
      state.y = state.targetY = target.y;
      state.needsSync = false;
    }
    if (reducedMotion) render(performance.now());
    if (state.active && !state.frame && !reducedMotion) state.frame = requestAnimationFrame(render);
  };

  resize();
  const refreshViewport = () => { resize(); updateVisibility(); };
  window.addEventListener('resize', refreshViewport, { passive: true });
  window.visualViewport?.addEventListener('resize', refreshViewport, { passive: true });
  window.visualViewport?.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('scroll', updateVisibility, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshViewport();
    else state.active = false;
  });
  if (!reducedMotion) {
    state.frame = requestAnimationFrame(render);
  } else {
    render(0);
  }
  updateVisibility();
};

initSecurityField();

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-vcf]');
  if (!button) return;
  const person = contacts[Number(button.dataset.vcf)];
  const copy = contactCopy(person);
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${copy.name}`,
    `N:${copy.name};;;;`,
    'ORG:اطلس الکترونیک',
    `TITLE:${copy.title} (${copy.extension})`,
    `TEL;TYPE=CELL:${normalize(person.phone)}`,
    `ADR;TYPE=WORK:;;${ADDRESS};اصفهان;;;ایران`,
    `URL:${WEBSITE}`,
    'END:VCARD'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: fileName(copy.name) });
  link.click();
  URL.revokeObjectURL(url);
});

/* Reveal sections on scroll */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}
