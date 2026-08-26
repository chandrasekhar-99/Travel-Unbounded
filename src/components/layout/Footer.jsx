import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-white transition hover:text-primary"
            >
              Travel Unbounded
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Discover unforgettable journeys across India and around the
              world with experiences designed around you.
            </p>

            {/* Social Media */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white">
                Follow Us
              </h3>

              <div className="mt-4 flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaFacebookF size={16} />
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaYoutube size={18} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaLinkedinIn size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link
                className="transition hover:text-white"
                href="/"
              >
                Home
              </Link>

              <Link
                className="transition hover:text-white"
                href="/about"
              >
                About
              </Link>

              <Link
                className="transition hover:text-white"
                href="/contact"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Get in Touch</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>India</p>

              <a
                href="mailto:hello@travelunbounded.com"
                className="block transition hover:text-white"
              >
                hello@travelunbounded.com
              </a>

              <a
                href="tel:+919876543210"
                className="block transition hover:text-white"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Travel Unbounded. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;