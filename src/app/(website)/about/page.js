import Link from "next/link";

const officeLocations = [
  {
    type: "Headquarters",
    city: "Bengaluru",
    address: (
      <>
        541, 7th Main Rd, HAL 2nd Stage
        <br />
        Indiranagar, Bengaluru – 560008
        <br />
        India
      </>
    ),
  },
  {
    type: "Kerala Office",
    city: "Kochi",
    address: (
      <>
        LR Towers, S Janatha Road
        <br />
        Palavivatton, Kochi – 682025
        <br />
        India
      </>
    ),
  },
  {
    type: "Kenya Office",
    city: "Nairobi",
    address: (
      <>
        Westpark Towers, Muthithi Road
        <br />
        Nairobi, P.O. Box 6950
        <br />
        Postal Code 00100
        <br />
        Kenya
      </>
    ),
  },
];

const whyChooseUs = [
  {
    number: "01",
    title: "Personally-Vetted Experiences",
    description:
      "We recommend destinations, stays, and activities that our team has personally experienced and evaluated.",
  },
  {
    number: "02",
    title: "Trusted Local Guides",
    description:
      "Our local partners bring authentic knowledge, stories, and insights that you won't find in a standard tour package.",
  },
  {
    number: "03",
    title: "Custom Itineraries",
    description:
      "Every trip is designed around your interests, travel style, schedule, and budget.",
  },
  {
    number: "04",
    title: "24x7 Travel Support",
    description:
      "From planning to your return journey, our team is available to help whenever you need us.",
  },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary px-4 py-14 text-white sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 sm:mb-4 sm:text-sm sm:tracking-[0.2em]">
            About Travel Unbounded
          </p>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            India&apos;s Most Trusted Experiential Travel Experts
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/90 sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
            We create meaningful journeys built around people, places,
            culture, comfort, and unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
            Our Story
          </p>

          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Travel beyond the ordinary
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-gray-600 sm:mt-8 sm:space-y-6 sm:text-base md:text-lg md:leading-8">
            <p>
              Travel Unbounded was born from a simple belief — that the best
              journeys aren&apos;t sold from a catalogue. They&apos;re built
              around the people taking them.
            </p>

            <p>
              Headquartered in Bengaluru with offices in Kerala and Nairobi,
              we design trips that blend comfort, culture, and raw nature.
              Every destination, resort, and activity we recommend has been
              personally experienced by our team.
            </p>

            <p>
              From spotting the Big Five at dawn in the Masai Mara to cruising
              Ha Long Bay at sunset — we go where real stories are written,
              and we bring you along.
            </p>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              Where We Are
            </p>

            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Our Office Locations
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
              With teams across India and Kenya, we combine global travel
              expertise with local knowledge.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {officeLocations.map((office) => (
              <div
                key={office.city}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 md:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                  {office.type}
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                  {office.city}
                </h3>

                <address className="mt-4 text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
                  {office.address}
                </address>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              Why Travel With Us
            </p>

            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Why Choose Travel Unbounded?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
              We believe great travel planning is about more than booking
              flights and hotels. It&apos;s about creating experiences that
              stay with you long after you return home.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-bold text-white sm:h-12 sm:w-12 sm:text-xl">
                  {item.number}
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug text-gray-900 sm:mt-5 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base sm:leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 px-4 py-14 text-white sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            Ready to plan your next adventure?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-4 sm:text-base sm:leading-7">
            Tell us where you want to go, and we&apos;ll help you build a
            journey around the experiences that matter to you.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark sm:mt-8 sm:px-7 sm:text-base"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;