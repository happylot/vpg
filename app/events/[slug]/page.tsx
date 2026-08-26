import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "../../components/site-nav";
import { events, getEventBySlug } from "../data";
import { RegistrationForm } from "../registration-form";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: `${event.title} | Sự kiện Vproud`,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "website",
      images: [event.cover],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <main>
      <section
        className="event-detail-hero"
        style={{ backgroundImage: `url(${event.cover})` }}
      >
        <div className="event-detail-hero__shade" aria-hidden="true" />
        <SiteNav variant="sub" />
        <div className="event-detail-hero__content">
          <a className="event-detail-hero__back" href="/events">
            ← Tất cả sự kiện
          </a>
          <p className="kicker">{event.category}</p>
          <h1>{event.title}</h1>
          <p className="event-detail-hero__lead">{event.summary}</p>
          <div className="event-detail-hero__actions">
            <a className="button button--primary" href="#dang-ky">
              Đăng ký tham gia
            </a>
          </div>
        </div>
      </section>

      <section className="section event-detail">
        <div className="section__inner section__inner--split">
          <div className="event-detail__main">
            <dl className="event-meta">
              <div>
                <dt>Thời gian</dt>
                <dd>
                  {event.dateLabel} · {event.timeLabel}
                </dd>
              </div>
              <div>
                <dt>Địa điểm</dt>
                <dd>{event.venue}</dd>
              </div>
              <div>
                <dt>Hình thức</dt>
                <dd>{event.format}</dd>
              </div>
              <div>
                <dt>Chi phí</dt>
                <dd>{event.price}</dd>
              </div>
              <div>
                <dt>Quy mô</dt>
                <dd>{event.capacity}</dd>
              </div>
            </dl>

            {event.description.map((paragraph, index) => (
              <p className="section-copy" key={index}>
                {paragraph}
              </p>
            ))}

            <h3 className="event-detail__subheading">Đối tượng tham gia</h3>
            <p className="section-copy">{event.audience}</p>

            <h3 className="event-detail__subheading">Bạn sẽ nhận được gì</h3>
            <ul className="event-highlights">
              {event.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <aside className="event-detail__sidebar">
            <div className="event-agenda">
              <h3>Chương trình</h3>
              <ol>
                {event.agenda.map((item) => (
                  <li key={item.time}>
                    <span className="event-agenda__time">{item.time}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="event-speakers">
              <h3>Diễn giả & chuyên gia</h3>
              {event.speakers.map((speaker) => (
                <div className="event-speaker" key={speaker.name}>
                  <strong>{speaker.name}</strong>
                  <span>{speaker.role}</span>
                  <p>{speaker.bio}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="register-section" id="dang-ky">
        <div className="section__inner">
          <div className="section__head">
            <p className="section-label">Đăng ký tham gia</p>
            <h2>Giữ chỗ của bạn cho {event.title}.</h2>
            <p className="section-copy">
              Điền thông tin bên dưới, ban tổ chức Vproud sẽ liên hệ xác nhận với
              bạn trước ngày diễn ra sự kiện.
            </p>
          </div>
          <RegistrationForm eventSlug={event.slug} eventTitle={event.title} />
        </div>
      </section>
    </main>
  );
}
