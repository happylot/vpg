import type { VpgEvent } from "./data";

export function EventSpotlight({ event }: { event: VpgEvent }) {
  const detailHref = `/events/${event.slug}`;

  return (
    <div className="event-spotlight event-spotlight--full">
      <span className="event-spotlight__label">Sắp diễn ra gần nhất</span>
      <a className="event-spotlight__cover" href={detailHref}>
        <img src={event.cover} alt={event.title} />
      </a>
      <div className="event-spotlight__body">
        <span className="event-spotlight__category">{event.category}</span>
        <h3>
          <a className="event-spotlight__title-link" href={detailHref}>
            {event.title}
          </a>
        </h3>
        <p className="event-spotlight__meta">
          {event.dateLabel} · {event.location}
        </p>
        <div className="event-spotlight__actions">
          <a
            className="button button--primary event-spotlight__register"
            href={`${detailHref}#dang-ky`}
          >
            Đăng ký ngay
          </a>
          <a className="event-spotlight__link" href={detailHref}>
            Xem chi tiết →
          </a>
        </div>
      </div>
    </div>
  );
}
