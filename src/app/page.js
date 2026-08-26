import Link from "next/link";
import Image from "next/image";
import DestinationCard from "@/components/home/DestinationCard";
import {
  indiaDestinations,
  internationalDestinations,
} from "@/data/destinations";

export const metadata = {
  title: "Travel Unbounded | Experiential Travel Across India & Beyond",
  description:
    "Discover unforgettable travel experiences across India and around the world with Travel Unbounded. Explore destinations, discover unique experiences, and plan your next adventure.",
};

const Home = () => {
  return (
    <main>
      {/* ========================================
          HERO SECTION
      ======================================== */}
      <section className="relative flex min-h-[650px] items-center overflow-hidden">
        {/* Background Image */}
<div className="absolute inset-0">
  <Image
    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=75"
    alt="Travel destination in India"
    fill
    priority
    className="object-cover object-center"
    sizes="100vw"
  />
</div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Travel Unbounded
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              India&apos;s Most Trusted Experiential Travel Experts
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
              Discover extraordinary journeys designed around you. From
              breathtaking Indian landscapes to unforgettable international
              adventures, we create experiences worth remembering.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-7 py-3.5 text-center font-semibold text-white transition hover:opacity-90"
              >
                Plan Your Trip
              </Link>

              <Link
                href="#destinations"
                className="rounded-full border border-white/60 bg-white/10 px-7 py-3.5 text-center font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          INTRO SECTION
      ======================================== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Travel Your Way
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Journeys built around unforgettable experiences
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            Whether you want to explore the mountains of Ladakh, relax on the
            beaches of Andaman, experience an African safari, or discover the
            beauty of Iceland, we help turn your travel ideas into meaningful
            journeys.
          </p>
        </div>
      </section>

      {/* ========================================
          DESTINATIONS
      ======================================== */}
      <section
        id="destinations"
        className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Explore India
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Discover Incredible India
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              From tropical coastlines to the mighty Himalayas, explore some of
              India&apos;s most unforgettable destinations.
            </p>
          </div>

          {/* India Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {indiaDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          INTERNATIONAL DESTINATIONS
      ======================================== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Go Beyond Borders
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Explore the World
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Step beyond the familiar and discover remarkable destinations
              across Africa, Asia, and Europe.
            </p>
          </div>

          {/* International Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internationalDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CTA
      ======================================== */}
      <section className="bg-gray-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Your Journey Starts Here
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Where will your next adventure take you?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
            Tell us what kind of experience you&apos;re looking for and let our
            travel experts create a journey around you.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition hover:opacity-90"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;