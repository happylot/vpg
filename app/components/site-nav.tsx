type SiteNavProps = {
  /** "home" keeps in-page anchors (#pillars etc). "sub" points them back at "/". */
  variant?: "home" | "sub";
};

export function SiteNav({ variant = "home" }: SiteNavProps) {
  const base = variant === "home" ? "" : "/";

  return (
    <nav className="nav" aria-label="Điều hướng Vproud">
      <a className="brand" href="/" aria-label="Trang chủ Vproud">
        <img
          className="brand__logo"
          src="/asset/brand/logo-vproud.png"
          alt="Vproud"
        />
        <small>Sản phẩm Việt vươn ra thế giới</small>
      </a>
      <div className="nav__links">
        <a href={`${base}#pillars`}>Trụ cột</a>
        <a href={`${base}#model`}>Mô hình</a>
        <a href="/events">Sự kiện</a>
        <a href={`${base}#partners`}>Đối tác</a>
      </div>
    </nav>
  );
}
