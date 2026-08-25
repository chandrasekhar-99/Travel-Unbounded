import Link from "next/link";

const Footer = () => {
  return(
     <footer className="border-t border-border bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              Travel Unbounded
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Discover unforgettable journeys across India and around the
              world with experiences designed around you.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link className="transition hover:text-white" href="/">
                Home
              </Link>

              <Link className="transition hover:text-white" href="/about">
                About
              </Link>

              <Link className="transition hover:text-white" href="/contact">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Get in Touch</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>India</p>
              <p>hello@travelunbounded.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Travel Unbounded. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer