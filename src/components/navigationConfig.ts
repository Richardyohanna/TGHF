export type NavChild = { label: string; href: string };
export type NavLink = {
  label: string;
  href: string;
  children?: NavChild[];
  activeSectionIds?: string[];
};

export const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "#home",
    children: [
      { label: "Who We Are", href: "#who-we-are" },
      { label: "Our Programmes", href: "#programmes-preview" },
      { label: "Partners", href: "#partners" },
    ],
  },
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "Our Story", href: "#our-story" },
      { label: "Mission & Vision", href: "#mission" },
      { label: "Our Team", href: "#team" },
    ],
    activeSectionIds: ["#story"],
  },
  {
    label: "Our Programmes",
    href: "#programmes",
    children: [
      { label: "From Farm to School: Feed a Child", href: "#farm-to-school" },
      { label: "Back-to-School Support", href: "#back-to-school" },
      {
        label: "Women and Girls Skills Development",
        href: "#women-girls-skills",
      },
    ],
  },
  { label: "Our Impact", href: "#impact" },
  {
    label: "Get Involved",
    href: "#involved",
    children: [
      { label: "Offer Food", href: "#offer-food" },
      { label: "Donate", href: "#donate" },
      { label: "Volunteer", href: "#volunteer" },
      { label: "Partner With Us", href: "#partner" },
    ],
  },
  { label: "Contact", href: "#contact" },
];
