import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/creed-logo.png.asset.json";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
      aria-label="Creed Design & Construction East Africa Ltd — home"
    >
      <span
        className={
          inverted
            ? "flex items-center justify-center rounded-md bg-white px-3 py-2 shadow-lift"
            : "flex items-center justify-center"
        }
      >
        <img
          src={logoAsset.url}
          alt="Creed Design & Construction Company East Africa Ltd"
          width={320}
          height={96}
          className="h-16 w-auto object-contain md:h-20"
        />
      </span>
    </Link>
  );
}
