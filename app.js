const OFFICE = '0315203';

const contacts = [
  { name: 'آقای فریبرز بهشتی', extension: '۱۲۰', title: 'مدیر فروش', phone: '09138778737', accent: '#1f9268' },
  { name: 'آقای حسینی‌نژاد', extension: '۱۰۳', title: 'کارشناس فروش', phone: '09134600576', accent: '#2f6fd6' },
  { name: 'خانم نخعی', extension: '۱۰۲', title: 'کارشناس فروش', phone: '09134600254', accent: '#0f9aa0' },
  { name: 'خانم بهشتی', extension: '۲۲۰', title: 'مدیر حسابداری', phone: '09134600224', accent: '#7a56d0' },
  { name: 'خانم بختیاری', extension: '۲۰۱', title: 'حسابداری', phone: '09133016997', accent: '#d24e86' },
  { name: 'آقای توکلی', extension: '۳۲۰', title: 'فروش سازمانی', phone: '09134600573', accent: '#c88a1e' },
  { name: 'آقای منوچهری', extension: '۳۰۱', title: 'مدیر پروژه', phone: '09134600223', accent: '#2593c2' },
  { name: 'آقای اسدی', extension: '۴۰۰', title: 'گارانتی و خدمات', phone: '09134600579', accent: '#cf6a3c' }
];

const ADDRESS = 'اصفهان، خیابان طالقانی، نبش بن‌بست ۱۵';
const WEBSITE = 'https://atlascctv.ir';

const sprite = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const normalize = (phone) => `+98${phone.slice(1)}`;
const pretty = (phone) => phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
const persona = (name) => name.trim().startsWith('خانم') ? 'user-f' : 'user-m';
const toLatin = (s) => s.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
const fileName = (name) => `Atlas-${name.replaceAll(' ', '-')}.vcf`;

document.querySelector('#contacts').innerHTML = contacts.map((person, index) => `
  <article class="person" style="--d:${index * 70}ms;--c:${person.accent}">
    <span class="mono" aria-hidden="true">${sprite(persona(person.name))}</span>
    <div class="who">
      <h3>${person.title} <small>داخلی ${person.extension}</small></h3>
      <p>${person.name}</p>
      <a class="tel" dir="ltr" href="tel:${normalize(person.phone)}">${pretty(person.phone)}</a>
    </div>
    <div class="acts" aria-label="راه‌های تماس با ${person.name}">
      <a class="a-call" href="tel:${normalize(person.phone)}" aria-label="تماس با ${person.name}">${sprite('call')}</a>
      <a class="a-wa" href="https://wa.me/${normalize(person.phone).slice(1)}" target="_blank" rel="noopener" aria-label="واتساپ ${person.name}">${sprite('whatsapp')}</a>
      <a class="a-office" href="tel:${OFFICE},,${toLatin(person.extension)}" aria-label="تماس با دفتر و داخلی ${person.extension}">${sprite('building')}</a>
      <button class="a-save" type="button" data-vcf="${index}" aria-label="ذخیره مخاطب ${person.name}">${sprite('download')}</button>
    </div>
  </article>`).join('');

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-vcf]');
  if (!button) return;
  const person = contacts[Number(button.dataset.vcf)];
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${person.name}`,
    `N:${person.name};;;;`,
    'ORG:اطلس الکترونیک',
    `TITLE:${person.title} (داخلی ${person.extension})`,
    `TEL;TYPE=CELL:${normalize(person.phone)}`,
    `ADR;TYPE=WORK:;;${ADDRESS};اصفهان;;;ایران`,
    `URL:${WEBSITE}`,
    'END:VCARD'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: fileName(person.name) });
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
