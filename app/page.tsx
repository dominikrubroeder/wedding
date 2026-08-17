import { HeartIcon } from "lucide-react";

export default function Home() {
  return (
    <section className="flex min-h-screen items-center justify-center text-foreground/60">
      <div className="text-center">
        <HeartIcon className="mx-auto text-sage" />
        <h1 className="sr-only">Save the date | 14 | 05 | 2027</h1>
        <p className="text-xl">Hier gibt es bald etwas zu sehen</p>
        <p>Kommt am besten ab dem 31.08 wieder</p>
      </div>
    </section>
  );
}
