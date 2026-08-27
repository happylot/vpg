import type { Metadata } from "next";
import { SiteNav } from "../components/site-nav";
import { events, type VpgEvent } from "./data";
import { EventSpotlight } from "./event-spotlight";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sự kiện Vproud | Sản phẩm Việt vươn ra thế giới",
  description:
    "Danh sách sự kiện, chương trình đào tạo và ngày kết nối doanh nghiệp của Vproud trên khắp cả nước.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ allPage?: string }>;
}) {
  const { allPage } = await searchParams;
  const today = new Date().toISOString().slice(0, 10);

  const upcomingEvents = events
    .filter((event) => event.isoDate >= today)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const pastEvents = events
    .filter((event) => event.isoDate < today)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  const nextEvent = upcomingEvents[0];

  return (
    <main>
      <section className="events-page-hero">
        <div className="hero__visual" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
        <SiteNav variant="sub" />
        <div className="events-page-hero__content">
          {nextEvent && <EventSpotlight event={nextEvent} />}
        </div>
        <div className="events-page-hero__panel-row">
          <div className="hero__panel" aria-label="Tổng quan sự kiện Vproud">
            <a href="#tat-ca-su-kien">
              <span>Tổng số sự kiện</span>
              <strong>{events.length}</strong>
            </a>
            <a href="#sap-dien-ra">
              <span>Sắp diễn ra</span>
              <strong>{upcomingEvents.length}</strong>
            </a>
            <a href="#da-dien-ra">
              <span>Đã diễn ra</span>
              <strong>{pastEvents.length}</strong>
            </a>
          </div>
        </div>
      </section>

      <section className="section events-list">
        <div className="section__inner">
          <AllEventsPanel
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            currentPage={Number(allPage) || 1}
          />

          <EventGroup
            id="sap-dien-ra"
            status="upcoming"
            title="Sự kiện sắp diễn ra"
            subtitle="Đăng ký sớm để giữ chỗ tham gia."
            list={upcomingEvents}
            emptyText="Hiện chưa có sự kiện nào sắp diễn ra. Quay lại sau nhé."
          />
          <EventGroup
            id="da-dien-ra"
            status="past"
            title="Sự kiện đã diễn ra"
            subtitle="Nhìn lại các chương trình Vproud đã tổ chức."
            list={pastEvents}
            emptyText="Chưa có sự kiện nào đã diễn ra."
          />
        </div>
      </section>
    </main>
  );
}

const ALL_EVENTS_PAGE_SIZE = 5;

function AllEventsPanel({
  upcomingEvents,
  pastEvents,
  currentPage,
}: {
  upcomingEvents: VpgEvent[];
  pastEvents: VpgEvent[];
  currentPage: number;
}) {
  const allEvents = [...upcomingEvents, ...pastEvents];
  const upcomingSlugs = new Set(upcomingEvents.map((event) => event.slug));

  const totalPages = Math.max(
    1,
    Math.ceil(allEvents.length / ALL_EVENTS_PAGE_SIZE),
  );
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const pageEvents = allEvents.slice(
    (page - 1) * ALL_EVENTS_PAGE_SIZE,
    page * ALL_EVENTS_PAGE_SIZE,
  );

  return (
    <div className="events-all" id="tat-ca-su-kien">
      <div className="events-all__head">
        <div>
          <p className="section-label">Toàn bộ sự kiện</p>
          <h2>Tất cả bài viết sự kiện Vproud</h2>
        </div>
        <span className="event-group__count">{allEvents.length} sự kiện</span>
      </div>
      <ul className="events-all__list">
        {pageEvents.map((event) => {
          const status = upcomingSlugs.has(event.slug) ? "upcoming" : "past";
          return (
            <li key={event.slug}>
              <a
                className={`events-all__row${status === "past" ? " events-all__row--past" : ""}`}
                href={`/events/${event.slug}`}
              >
                <figure className="events-all__thumb">
                  <img src={event.cover} alt="" />
                </figure>
                <div className="events-all__info">
                  <span className="events-all__category">
                    {event.category}
                  </span>
                  <strong>{event.title}</strong>
                  <span className="events-all__meta">
                    {event.dateLabel} · {event.location}
                  </span>
                </div>
                <span
                  className={`event-card__status event-card__status--${status} events-all__status`}
                >
                  {status === "upcoming" ? "Sắp diễn ra" : "Đã diễn ra"}
                </span>
                <span className="events-all__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <nav className="events-all__pagination" aria-label="Phân trang">
          <a
            className={`events-all__page-link${page <= 1 ? " events-all__page-link--disabled" : ""}`}
            href={
              page <= 1
                ? undefined
                : `?allPage=${page - 1}#tat-ca-su-kien`
            }
            aria-disabled={page <= 1}
          >
            ← Trang trước
          </a>
          <div className="events-all__page-numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <a
                  key={pageNumber}
                  className={`events-all__page-number${pageNumber === page ? " events-all__page-number--active" : ""}`}
                  href={`?allPage=${pageNumber}#tat-ca-su-kien`}
                >
                  {pageNumber}
                </a>
              ),
            )}
          </div>
          <a
            className={`events-all__page-link${page >= totalPages ? " events-all__page-link--disabled" : ""}`}
            href={
              page >= totalPages
                ? undefined
                : `?allPage=${page + 1}#tat-ca-su-kien`
            }
            aria-disabled={page >= totalPages}
          >
            Trang sau →
          </a>
        </nav>
      )}
    </div>
  );
}

function EventGroup({
  id,
  status,
  title,
  subtitle,
  list,
  emptyText,
}: {
  id: string;
  status: "upcoming" | "past";
  title: string;
  subtitle: string;
  list: VpgEvent[];
  emptyText: string;
}) {
  return (
    <div className="event-group" id={id}>
      <div className="event-group__head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="event-group__count">{list.length} sự kiện</span>
      </div>

      {list.length === 0 ? (
        <p className="event-group__empty">{emptyText}</p>
      ) : (
        <div className="event-grid">
          {list.map((event) => (
            <a
              className={`event-card${status === "past" ? " event-card--past" : ""}`}
              key={event.slug}
              href={`/events/${event.slug}`}
            >
              <figure className="event-card__cover">
                <img src={event.cover} alt={event.title} />
                <span className="event-card__format">{event.format}</span>
                <span
                  className={`event-card__status event-card__status--${status}`}
                >
                  {status === "upcoming" ? "Sắp diễn ra" : "Đã diễn ra"}
                </span>
              </figure>
              <div className="event-card__body">
                <span className="event-card__category">
                  {event.category}
                </span>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <dl className="event-card__meta">
                  <div>
                    <dt>Thời gian</dt>
                    <dd>{event.dateLabel}</dd>
                  </div>
                  <div>
                    <dt>Địa điểm</dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>
                <span className="event-card__cta">
                  Xem chi tiết & đăng ký →
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
