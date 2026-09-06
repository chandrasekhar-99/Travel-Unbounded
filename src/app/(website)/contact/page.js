import BookingForm from "@/components/bookingForm/BookingForm";

const Contact = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Plan Your Journey
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Tell Us About Your Dream Trip
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
            Share a few details about your travel plans and our
            travel experts will help you create an unforgettable
            experience.
          </p>
        </div>
      </section>

      <BookingForm />
    </main>
  );
};

export default Contact;