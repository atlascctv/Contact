const contacts = [
  { name: 'آقای فریبرز بهشتی', extension: '۱۲۰', title: 'مدیر فروش', phone: '09138778737', color: '#d7e8f3', ink: '#215a80' },
  { name: 'آقای حسینی‌نژاد', extension: '۱۰۳', title: 'کارشناس فروش', phone: '09134600576', color: '#e2e7ec', ink: '#435260' },
  { name: 'خانم نخعی', extension: '۱۰۲', title: 'کارشناس فروش', phone: '09134600254', color: '#e5edf3', ink: '#355c79' },
  { name: 'خانم بهشتی', extension: '۲۲۰', title: 'مدیر حسابداری', phone: '09134600224', color: '#dce7df', ink: '#356044' },
  { name: 'خانم بختیاری', extension: '۲۰۱', title: 'حسابداری', phone: '09133016997', color: '#e5e0ed', ink: '#5c3c76' },
  { name: 'آقای توکلی', extension: '۳۲۰', title: 'فروش سازمانی', phone: '09134600573', color: '#ece5db', ink: '#74592f' },
  { name: 'آقای منوچهری', extension: '۳۰۱', title: 'مدیر پروژه', phone: '09134600223', color: '#dce7e7', ink: '#285d58' },
  { name: 'آقای اسدی', extension: '۴۰۰', title: 'گارانتی و خدمات', phone: '09134600579', color: '#f1e0db', ink: '#87472f' }
];

const sprite = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const normalize = (phone) => `+98${phone.slice(1)}`;
const fileName = (name) => `Atlas-${name.replaceAll(' ', '-')}.vcf`;

document.querySelector('#contacts').innerHTML = contacts.map((person, index) => `
  <article class="person-row" style="--avatar-bg:${person.color};--avatar-ink:${person.ink}">
    <span class="avatar" aria-hidden="true">${sprite('user')}</span>
    <div class="person-info"><h3>${person.name} <small>(داخلی ${person.extension})</small></h3><p>${person.title}</p><a class="number" href="tel:${normalize(person.phone)}">${person.phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}</a></div>
    <div class="person-actions" aria-label="راه‌های تماس با ${person.name}">
      <a href="tel:${normalize(person.phone)}" aria-label="تماس با ${person.name}">${sprite('call')}</a>
      <a href="https://wa.me/${normalize(person.phone).slice(1)}" target="_blank" rel="noopener" aria-label="واتساپ ${person.name}">${sprite('whatsapp')}</a>
      <button type="button" data-vcf="${index}" aria-label="دانلود مخاطب ${person.name}">${sprite('download')}</button>
    </div>
  </article>`).join('');

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-vcf]');
  if (!button) return;
  const person = contacts[Number(button.dataset.vcf)];
  const vcf = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${person.name}`, `ORG:اطلس الکترونیک`, `TITLE:${person.title} (داخلی ${person.extension})`, `TEL;TYPE=CELL:${normalize(person.phone)}`, 'ADR;TYPE=WORK:;;اصفهان، خیابان طالقانی;اصفهان;;;ایران', 'URL:https://atlascctv.github.io/Contact/', 'END:VCARD'].join('\r\n');
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: fileName(person.name) });
  link.click();
  URL.revokeObjectURL(url);
});
