import { Eyebrow } from "./Eyebrow";
import { InteractiveLogo } from "./InteractiveLogo";
import { Reveal } from "./Reveal";

export function BrandMark() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#020202]">
        <div className="starfield absolute inset-0 opacity-80" />
        <div className="starfield-far absolute inset-0 opacity-60" />
        <div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,80,2,0.28) 0%, rgba(193,8,1,0.14) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-lumi relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow className="justify-center">Identidade</Eyebrow>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 md:mt-16">
          <InteractiveLogo className="w-56 sm:w-72 md:w-96" />
        </Reveal>
      </div>
    </section>
  );
}
