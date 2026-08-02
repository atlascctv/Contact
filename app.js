const contacts = [
  { name: 'فرید برزگری', title: 'مدیر فروش', phone: '09138778737', color: '#d7e8f3', ink: '#215a80' },
  { name: 'چینی‌نژاد', title: 'کارشناس فروش', phone: '09134900579', color: '#e2e7ec', ink: '#435260' },
  { name: 'فروش شعبه', title: 'کارشناس فروش', phone: '09134900283', color: '#e5edf3', ink: '#355c79' },
  { name: 'واحد حسابداری', title: 'مدیر حسابداری', phone: '09134900224', color: '#dce7df', ink: '#356044' },
  { name: 'امیرکبیر', title: 'حسابداری', phone: '09132199971', color: '#e5e0ed', ink: '#5c3c76' },
  { name: 'توکلی', title: 'فروش سازمانی', phone: '09124900573', color: '#ece5db', ink: '#74592f' },
  { name: 'منصوری', title: 'مدیر پروژه', phone: '09134900123', color: '#dce7e7', ink: '#285d58' }
];

const sprite = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const normalize = (phone) => `+98${phone.slice(1)}`;
const fileName = (name) => `Atlas-${name.replaceAll(' ', '-')}.vcf`;

document.querySelector('#contacts').innerHTML = contacts.map((person, index) => `
  <article class="person-row" style="--avatar-bg:${person.color};--avatar-ink:${person.ink}">
    <span class="avatar" aria-hidden="true">${sprite('user')}</span>
    <div class="person-info"><h3>${person.name}</h3><p>${person.title}</p><a class="number" href="tel:${normalize(person.phone)}">${person.phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}</a></div>
    <div class="person-actions" aria-label="راه‌های تماس با ${person.name}">
      <a href="tel:${normalize(person.phone)}" aria-label="تماس با ${person.name}">${sprite('call')}</a>
      <a href="https://wa.me/${normalize(person.phone).slice(1)}" target="_blank" rel="noopener" aria-label="واتساپ ${person.name}">${sprite('chat')}</a>
      <button type="button" data-vcf="${index}" aria-label="دانلود مخاطب ${person.name}">${sprite('download')}</button>
    </div>
  </article>`).join('');

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-vcf]');
  if (!button) return;
  const person = contacts[Number(button.dataset.vcf)];
  const vcf = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${person.name}`, `ORG:اطلس الکترونیک`, `TITLE:${person.title}`, `TEL;TYPE=CELL:${normalize(person.phone)}`, 'ADR;TYPE=WORK:;;اصفهان، خیابان طالقانی;اصفهان;;;ایران', 'URL:https://atlascctv.github.io/Contact/', 'END:VCARD'].join('\r\n');
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: fileName(person.name) });
  link.click();
  URL.revokeObjectURL(url);
});
