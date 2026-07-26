import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Layers, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import frameAsset from "@/assets/project-warehouse-frame.jpg.asset.json";
import roofAsset from "@/assets/project-warehouse-roof.jpg.asset.json";
import steelAsset from "@/assets/project-warehouse-steel.jpg.asset.json";
import slide2Asset from "@/assets/project-slide-2.png.asset.json";
import slide3Asset from "@/assets/project-slide-3.png.asset.json";
import slide4Asset from "@/assets/project-slide-4.png.asset.json";
import slide5Asset from "@/assets/project-slide-5.png.asset.json";
import { whatsappLink } from "@/lib/contact";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects — Creed Design & Construction East Africa" },
      {
        name: "description",
        content:
          "Selected projects delivered by Creed Design and Construction Company East Africa Ltd, including the Kayunga processing warehouse in concrete and steel.",
      },
      { property: "og:title", content: "Our Projects — Creed Design & Construction" },
      {
        property: "og:description",
        content:
          "See featured Creed builds across Uganda — industrial warehouses, commercial and residential developments.",
      },
      { property: "og:image", content: frameAsset.url },
      { name: "twitter:image", content: frameAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const gallery = [
  { src: frameAsset.url, caption: "Steel truss roof frame erected on concrete block walls." },
  { src: steelAsset.url, caption: "Sunset progress: full steel purlin assembly and vent block walls." },
  { src: roofAsset.url, caption: "Completed roof with ridge vents; boundary walling underway." },
];

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Featured builds"
        lead="OUR"
        highlight="PROJECTS"
        description="A look at some of the work delivered by our site teams across Uganda — from industrial warehouses to residential and commercial developments."
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Case study · Industrial
            </p>
            <h2 className="mt-4 text-4xl font-bold text-primary sm:text-5xl">
              Processing Warehouse
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Location:</strong> Kayunga, Kangulumira
                </span>
              </li>
              <li className="flex gap-3">
                <Layers className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Materials:</strong> Concrete and Steel
                </span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A ground-up industrial processing warehouse combining reinforced concrete walls with a
              purpose-engineered steel truss roof and ventilated block infill. Creed handled
              structural design, foundations, block-work, steel fabrication and roofing through to
              boundary walling and site works.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Sector
                </dt>
                <dd className="mt-1 text-lg font-bold text-primary">Industrial</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Scope
                </dt>
                <dd className="mt-1 text-lg font-bold text-primary">Design + Build</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Structure
                </dt>
                <dd className="mt-1 text-lg font-bold text-primary">Steel + RCC</dd>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-sm accent-gradient px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-foreground"
              >
                Start a similar project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink("Hi Creed, I'd like to discuss a warehouse / industrial build.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="grid gap-4">
            {gallery.map((g, i) => (
              <figure key={g.src} className={i === 0 ? "shadow-lift" : "shadow-lift"}>
                <img
                  src={g.src}
                  alt={g.caption}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-64 w-full object-cover sm:h-72"
                />
                <figcaption className="border-l-4 border-accent bg-card px-4 py-3 text-xs text-muted-foreground">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Selected case studies
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            More featured projects
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A cross-section of dormitories, warehouses and specialist steelworks delivered by our
            teams across Uganda.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Kisubi SSS. Mapeera Boy's Dormitory Glass Skylight",
              sector: "Education · Steelworks",
              location: "Kisubi, Namulanda, Entebbe, Kampala",
              materials: "Steel Hollow Sections, G26 Iron Sheets, Laminated Glass, Aluminum",
              body: "A structural steel skylight and roof assembly for a boys' dormitory — combining engineered hollow sections with laminated glass panels to bring daylight into the interior while maintaining a durable weatherproof envelope.",
              img: slide2Asset.url,
            },
            {
              title: "Processing Warehouse",
              sector: "Industrial · Design + Build",
              location: "Kayunga, Kangulumira",
              materials: "Concrete and Steel",
              body: "A ground-up industrial processing warehouse in reinforced concrete with a purpose-engineered steel truss roof, ventilated block infill and ridge ventilation — completed with boundary walling and full site works.",
              img: slide3Asset.url,
            },
            {
              title: "Coffee Drier Warehouse",
              sector: "Agro-industrial",
              location: "Gomba",
              materials: "Concrete and Steel",
              body: "A coffee drying warehouse featuring reinforced concrete foundations, cast slabs and a steel-framed high-clearance roof structure sized for drying operations and equipment.",
              img: slide4Asset.url,
            },
            {
              title: "St. Theresa Girls Primary School — Girls Dormitory",
              sector: "Education · Steelworks",
              location: "Kisubi, Entebbe, Kampala",
              materials: "Structural Steel, G26 Iron Sheets",
              body: "Structural steel roof and floor framing for a multi-storey girls' dormitory — heavy-section beams and purlins engineered for long spans, safety and long service life.",
              img: slide5Asset.url,
            },
          ].map((p) => (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden border-t-4 border-accent bg-card shadow-lift"
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-64"
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {p.sector}
                </p>
                <h3 className="mt-2 text-xl font-bold text-primary">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex gap-2">
                    <dt className="flex items-center gap-2 font-bold text-foreground">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      Location:
                    </dt>
                    <dd className="text-muted-foreground">{p.location}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="flex items-center gap-2 font-bold text-foreground">
                      <Layers className="h-4 w-4 text-accent" aria-hidden="true" />
                      Materials:
                    </dt>
                    <dd className="text-muted-foreground">{p.materials}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>



      <section className="faceted border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-primary">More sectors we build in</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Residential",
                body: "Family homes, apartments and estate developments finished to a high standard.",
              },
              {
                title: "Commercial",
                body: "Offices, retail units and mixed-use buildings designed for daily performance.",
              },
              {
                title: "Industrial",
                body: "Warehouses, processing plants and workshops with engineered steel structures.",
              },
            ].map((sector) => (
              <article key={sector.title} className="border-t-4 border-accent bg-card p-6 shadow-lift">
                <h3 className="text-lg font-bold text-primary">{sector.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sector.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
