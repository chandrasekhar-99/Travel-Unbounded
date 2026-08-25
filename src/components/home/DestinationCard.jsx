import Image from "next/image";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <p className="text-sm font-medium text-white/80">
            {destination.country}
          </p>

          <h3 className="text-2xl font-bold text-white">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="min-h-[84px] text-sm leading-6 text-gray-600">
          {destination.description}
        </p>

        <div className="mt-5 border-t border-gray-100 pt-5">
          <p className="text-sm text-gray-500">Starting from</p>

          <p className="mt-1 text-xl font-bold text-primary">
            {destination.price}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/contact?destination=${encodeURIComponent(
              destination.name
            )}`}
            className="flex-1 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Enquire
          </Link>

          <Link
            href={`/contact?destination=${encodeURIComponent(
              destination.name
            )}`}
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;