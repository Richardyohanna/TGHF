import { useEffect, useRef, useState } from "react";
import type {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { navLinks } from "./navigationConfig";

const getParentLink = (href: string) =>
  navLinks.find(
    (link) =>
      link.href === href ||
      link.activeSectionIds?.includes(href) ||
      link.children?.some((child) => child.href === href),
  );

const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dropdownLeft, setDropdownLeft] = useState(8);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const activeParent = getParentLink(activeHref)?.label ?? "Home";

  const returnToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.location.hash !== "#home") {
      window.history.pushState(null, "", "#home");
    }

    setActiveHref("#home");
    setOpenMenu(null);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const positionDropdown = (label: string | null) => {
    if (!label) return;
    const item = itemRefs.current.get(label);
    if (!item) return;

    const width = Math.min(224, window.innerWidth - 16);
    const left = item.getBoundingClientRect().left;
    setDropdownLeft(Math.max(8, Math.min(left, window.innerWidth - width - 8)));
  };

  useEffect(() => {
    const originalNavigation = document.getElementById("site-navigation");
    if (!originalNavigation) {
      throw new Error("Sticky navigation requires the primary navigation header.");
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting);
    });
    observer.observe(originalNavigation);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targets = new Map<string, HTMLElement>();
    for (const link of navLinks) {
      const hrefs = [
        link.href,
        ...(link.children?.map((child) => child.href) ?? []),
        ...(link.activeSectionIds ?? []),
      ];
      for (const href of hrefs) {
        const element = document.getElementById(href.slice(1));
        if (element) targets.set(href, element);
      }
    }

    const updateFromScroll = () => {
      const stickyOffset = 48;
      const visibleSections = Array.from(targets.entries())
        .map(([href, target]) => {
          const bounds = target.getBoundingClientRect();
          return {
            href,
            visibleHeight: Math.max(
              0,
              Math.min(bounds.bottom, window.innerHeight) -
                Math.max(bounds.top, stickyOffset),
            ),
          };
        })
        .filter((section) => section.visibleHeight > 0)
        .sort((first, second) => second.visibleHeight - first.visibleHeight);
      const mostVisible = visibleSections[0];
      if (!mostVisible) return;

      setActiveHref((currentHref) => {
        const currentSection = visibleSections.find(
          (section) => section.href === currentHref,
        );
        if (
          !currentSection ||
          mostVisible.href === currentSection.href ||
          mostVisible.visibleHeight > currentSection.visibleHeight + 24
        ) {
          return mostVisible.href;
        }
        return currentHref;
      });
    };

    const updateFromLocation = () => {
      if (getParentLink(window.location.hash)) {
        setActiveHref(window.location.hash);
      } else {
        updateFromScroll();
      }
    };

    const observer = new IntersectionObserver(updateFromScroll, {
      rootMargin: "-48px 0px 0px 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    for (const target of targets.values()) observer.observe(target);

    window.addEventListener("hashchange", updateFromLocation);
    window.addEventListener("popstate", updateFromLocation);
    updateFromLocation();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromLocation);
      window.removeEventListener("popstate", updateFromLocation);
    };
  }, []);

  useEffect(() => {
    const item = activeItemRef.current;
    const scroller = scrollerRef.current;
    if (!item || !scroller) return;

    const itemBounds = item.getBoundingClientRect();
    const scrollerBounds = scroller.getBoundingClientRect();
    let offset = 0;
    if (itemBounds.left < scrollerBounds.left) {
      offset = itemBounds.left - scrollerBounds.left - 8;
    } else if (itemBounds.right > scrollerBounds.right) {
      offset = itemBounds.right - scrollerBounds.right + 8;
    }

    if (offset) {
      scroller.scrollBy({
        left: offset,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }, [activeParent]);

  useEffect(() => {
    positionDropdown(openMenu);
    if (!openMenu) return;

    const updatePosition = () => positionDropdown(openMenu);
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [openMenu]);

  const openOnPointer = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleBlur = (
    event: FocusEvent<HTMLLIElement>,
  ) => {
    if (
      !(event.relatedTarget instanceof Node) ||
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setOpenMenu(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape") {
      setOpenMenu(null);
    }
  };

  return (
    <div
      className={`quick-nav${isVisible ? " quick-nav--visible" : ""} `}
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <nav aria-label="Quick navigation" className="quick-nav__nav ">
        <ul
          className="quick-nav__scroller"
          ref={scrollerRef}
          onScroll={() => positionDropdown(openMenu)}
        >
          {navLinks.map((link) => {
            const isActive = activeParent === link.label;
            const isOpen = openMenu === link.label;
            const menuId = `quick-nav-${link.label
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <li
                key={link.label}
                ref={(element) => {
                  if (element) itemRefs.current.set(link.label, element);
                  else itemRefs.current.delete(link.label);
                }}
                data-active={isActive}
                className="quick-nav__item"
                onMouseEnter={() => {
                  if (link.children && openOnPointer()) setOpenMenu(link.label);
                }}
                onMouseLeave={() => {
                  if (openOnPointer()) setOpenMenu(null);
                }}
                onFocus={(event) => {
                  if (
                    link.children &&
                    event.target instanceof HTMLElement &&
                    event.target.matches(":focus-visible")
                  ) {
                    setOpenMenu(link.label);
                  }
                }}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              >
                <div className="quick-nav__item-row">
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={isVisible ? 0 : -1}
                    onClick={(event) => {
                      setActiveHref(link.href);
                      setOpenMenu(null);
                      if (link.href === "#home") returnToTop(event);
                    }}
                    className={`quick-nav__link${isActive ? " quick-nav__link--active" : ""}`}
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <button
                      type="button"
                      aria-label={`${isOpen ? "Close" : "Open"} ${link.label} submenu`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      tabIndex={isVisible ? 0 : -1}
                      onClick={(event) => {
                        if (openOnPointer()) {
                          setOpenMenu(link.label);
                        } else if (event.detail === 0) {
                          setOpenMenu(link.label);
                        } else {
                          setOpenMenu(isOpen ? null : link.label);
                        }
                      }}
                      className="quick-nav__toggle"
                    >
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={isOpen ? "quick-nav__chevron--open" : ""}
                      />
                    </button>
                  )}
                </div>
                {link.children && (
                  <ul
                    id={menuId}
                    aria-label={`${link.label} submenu`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`quick-nav__dropdown${isOpen ? " quick-nav__dropdown--open" : ""}`}
                    style={{ left: `${dropdownLeft}px` }}
                  >
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          aria-current={activeHref === child.href ? "page" : undefined}
                          tabIndex={isVisible && isOpen ? 0 : -1}
                          onClick={() => {
                            setActiveHref(child.href);
                            setOpenMenu(null);
                          }}
                          className={`quick-nav__child${activeHref === child.href ? " quick-nav__child--active" : ""}`}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default StickyNav;
