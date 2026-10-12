import { ContactForm } from '@/features/send-message'
import { SHOP } from '@/shared/config'
import { Card, Icon, SectionHeader, type IconName } from '@/shared/ui'
import s from './ContactsPage.module.css'

const INFO: { icon: IconName; title: string; lines: string[]; href?: string }[] = [
  { icon: 'pin', title: 'Address', lines: [SHOP.address, SHOP.addressNote] },
  { icon: 'clock', title: 'Opening hours', lines: [SHOP.hours, 'Walk-ins welcome when a chair is free'] },
  { icon: 'phone', title: 'Phone', lines: [SHOP.phone], href: SHOP.phoneHref },
  { icon: 'mail', title: 'Email', lines: [SHOP.email], href: `mailto:${SHOP.email}` },
]

export function ContactsPage() {
  return (
    <>
      <SectionHeader as="h1" eyebrow="Contacts" title="Visit us" subtitle="Right in the centre of Almaty, open every day." />
      <div className={s.layout}>
        <div className={s.info}>
          {INFO.map(({ icon, title, lines, href }) => (
            <Card key={title} className={s.item}>
              <span className={s.icon}>
                <Icon name={icon} />
              </span>
              <div>
                <h2 className={s.title}>{title}</h2>
                {href ? (
                  <a href={href} className={s.link}>
                    {lines[0]}
                  </a>
                ) : (
                  lines.map((line, i) => (
                    <p key={line} className={i > 0 ? s.muted : undefined}>
                      {line}
                    </p>
                  ))
                )}
              </div>
            </Card>
          ))}
        </div>
        <ContactForm />
      </div>
    </>
  )
}
