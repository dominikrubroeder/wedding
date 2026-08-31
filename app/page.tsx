import { Animate } from "@/components/ui/animate";
import Image from "next/image";
import { RsvpForm } from "@/components/rsvp-form/rsvp-form";
import { HeartIcon, MapPin, Sun } from "lucide-react";
import Link from "next/link";
import { Dash } from "@/components/ui/dash";

export default function Home() {
  return (
    <>
      <Animate delay={0.44} className="space-y-4 pt-4">
        <h1 className="text-md relative z-10 text-center uppercase">
          Save <span className="font-handwritten lowercase">the</span> date | 14
          | 05 | 2027
        </h1>
        <h2>Better together</h2>

        <section
          className="mx-auto w-full max-w-full justify-center px-4 sm:grid sm:grid-cols-[1fr_2fr_1fr] sm:gap-4 sm:gap-8 xl:px-0"
          id="gallery"
        >
          <Image
            src="/wir-portugal-strandcafe.jpeg"
            alt="Wir Portugal Strandcafe"
            width={500}
            height={500}
            className="mb-4 w-full sm:my-auto"
            loading="eager"
          />

          <div className="grid w-full grid-cols-2 gap-4 sm:gap-8">
            <Image
              src="/wir-strand.jpeg"
              alt="Wir Strand"
              width={500}
              height={800}
              className="mt-12"
              loading="eager"
            />
            <Image
              src="/wir-tracht.jpeg"
              alt="Wir Tracht"
              width={500}
              height={800}
              loading="eager"
            />
            <Image
              src="/wir-antrag.jpeg"
              alt="Wir Antrag"
              width={500}
              height={800}
              loading="eager"
            />
            <Image
              src="/antrag-blumen.jpeg"
              alt="Antrag Blumen"
              width={500}
              height={800}
              className="-mt-12"
              loading="eager"
            />
          </div>

          <Image
            src="/wir-seehaus.jpeg"
            alt="Wir Seehaus"
            width={500}
            height={800}
            className="mt-4 w-full sm:my-auto"
            loading="eager"
          />
        </section>
      </Animate>

      <section className="bg-background px-4 xl:px-0">
        <div className="mx-auto max-w-3xl space-y-4 border-y py-6">
          <HeartIcon className="mx-auto text-sage" />

          <nav className="text-center">
            <ul className="flex items-center justify-center gap-3">
              <li>
                <a href="#rsvp">Zu- und Absage</a>
              </li>
              <li>
                <a href="#location">Location</a>
              </li>
              <li>
                <a href="#dress-code">Dresscode</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <Animate delay={0.56}>
        <section
          className="mx-auto w-full max-w-3xl scroll-mt-16 items-center justify-center gap-8 space-y-6 px-4 xl:px-0"
          id="rsvp"
        >
          <div className="space-y-2">
            <h2>Wir laden euch herzlich ein</h2>
            <div className="flex items-center justify-center gap-2.5">
              <span>zu unserer Hochzeit</span> <Dash />
              <span>Madlen & Dominik</span>
            </div>
          </div>
          <RsvpForm />
        </section>
      </Animate>

      <Animate>
        <section
          className="mx-auto w-full max-w-5xl scroll-mt-16 space-y-10 rounded px-4 xl:px-0"
          id="location"
        >
          <h2>Die Location</h2>

          <div className="space-y-8 rounded border p-11">
            <div className="relative flex flex-col items-center lg:flex-row">
              <Image
                src="/alperie-outdoor.jpeg"
                alt="Alperie Outdoor"
                width={500}
                height={800}
              />
              <Image
                src="/alperie-outdoor-2.jpg"
                alt="Alperie Outdoor 2"
                width={500}
                height={800}
                className="relative z-10 -mt-32 w-[90%] sm:-ml-8 sm:h-96 sm:w-auto"
              />
            </div>

            <div className="space-y-2">
              <h3 className="flex items-center gap-4">
                <MapPin className="text-sage" />
                <span className="flex items-center gap-3">
                  <span>Anfahrt</span>
                </span>
              </h3>

              <div>
                <div className="font-body text-base font-normal">
                  Freie Trauung in:
                </div>
                <Link
                  href="https://maps.app.goo.gl/Hm6rLsGk9PwQtwdT7"
                  target="_blank"
                  className="w-auto hover:underline"
                >
                  <div>Die Alperie</div>
                  <div>Neuhauser Str. 45</div>
                  <div>83737 Schliersee</div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Animate>

      <Animate>
        <section
          className="mx-auto w-full max-w-5xl scroll-mt-16 space-y-6 px-4 xl:px-0"
          id="dress-code"
        >
          <h2>Dress Code</h2>

          <div className="flex items-center justify-center gap-4 space-y-6 rounded border p-11 text-center">
            <Sun className="text-sage" /> Sommerlich, lässig, schick
          </div>
        </section>
      </Animate>
    </>
  );
}
