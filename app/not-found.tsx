import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";

export default function NotFound() {
  return (
    <section className="pt-32 pb-24">
      <Container>
        <p className="text-xs tracking-brand text-ash uppercase">404</p>
        <h1 className="mt-6 font-display text-5xl text-beige md:text-7xl">This room is not on the plan.</h1>
        <p className="mt-6 max-w-md text-ash">The page is missing. The houses are still here.</p>
        <Button asChild className="mt-10">
          <Link href="/">Back to Liwan</Link>
        </Button>
      </Container>
    </section>
  );
}
