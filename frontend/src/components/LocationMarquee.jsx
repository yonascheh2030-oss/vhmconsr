import Marquee from "react-fast-marquee";
import { Zap } from "lucide-react";

const ITEMS = [
  "24/7 Spoeddienst",
  "Zaventem",
  "Diegem",
  "Haren",
  "Schaarbeek",
  "Brussel-Zuid",
  "Machelen",
  "Vilvoorde",
  "Evere",
];

export const LocationMarquee = () => (
  <div className="border-y border-zinc-200 bg-white py-6 overflow-hidden" data-testid="location-marquee">
    <Marquee speed={35} gradient={false} pauseOnHover>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-outfit font-light uppercase tracking-wide text-2xl md:text-4xl text-brand-ink mx-6">
            {item}
          </span>
          <Zap className="w-5 h-5 text-brand-blue" />
        </span>
      ))}
    </Marquee>
  </div>
);
