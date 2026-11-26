import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./Button";
import logo from "../../public/logo.png";
import { navLinks } from "./navigationConfig";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header id="site-navigation" className="relative z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between sm:justify-between md:justify-between lg:justify-around px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="shrink-0">
          <img
            src={logo}
            alt="The George Hopenest Foundation"
            className="h-auto w-auto max-h-[90px] max-w-[100px] lg:max-h-[159px] lg:max-w-[181px] sm:max-h-[120px] sm:max-w-[130px]"
          />
        </a>

        {/* Desktop: buttons on top, links below */}
        <div className="hidden flex-col items-end gap-10 lg:flex">
          <div className="flex items-center gap-3">
            <Button onClick={() => scrollToSection("donate")}>Donate Now</Button>
            <Button onClick={() => scrollToSection("involved")}>
              Partner With Us
            </Button>
          </div>

          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="group relative">
                <a
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`flex items-center gap-1 border-b-2 pb-1 text-base font-medium transition-colors duration-300 ${
                    active === link.label
                      ? "border-primary-blue text-primary-blue"
                      : "border-transparent text-gray-800 group-hover:text-primary-blue"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  )}
                </a>

                {link.children && (
                  // pt-3 (not margin) keeps the hover area continuous
                  // between the link and the dropdown.
                  <div className="invisible absolute left-0 top-full z-50 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="min-w-52 rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={() => setActive(link.label)}
                            className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-primary-blue"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gray-800 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gray-800 transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto border-t border-gray-100 bg-white transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[80vh]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-4">
          {navLinks.map((link) => {
            const expanded = mobileExpanded === link.label;
            return (
              <div key={link.label} className="border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.label);
                      setMenuOpen(false);
                    }}
                    className={`flex-1 py-3 text-sm font-medium ${
                      active === link.label ? "text-primary-blue" : "text-gray-800"
                    }`}
                  >
                    {link.label}
                  </a>

                  {link.children && (
                    <button
                      type="button"
                      aria-label={`Toggle ${link.label} submenu`}
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileExpanded(expanded ? null : link.label)
                      }
                      className="p-3"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {link.children && (
                  <ul
                    className={`overflow-hidden pl-4 transition-all duration-300 ${
                      expanded ? "max-h-96 pb-2" : "max-h-0"
                    }`}
                  >
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={() => {
                            setActive(link.label);
                            setMenuOpen(false);
                          }}
                          className="block py-2 text-sm text-gray-600 hover:text-primary-blue"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          <div className="mt-3 flex flex-col gap-3">
            <Button
              onClick={() => {
                scrollToSection("donate");
                setMenuOpen(false);
              }}
            >
              Donate Now
            </Button>
            <Button
              onClick={() => {
                scrollToSection("involved");
                setMenuOpen(false);
              }}
            >
              Partner With Us
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}