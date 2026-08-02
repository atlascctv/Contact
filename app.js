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
