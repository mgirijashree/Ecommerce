const categories = [
  "Rings",
  "Earrings",
  "Bracelets",
  "Bangles",
  "Necklaces",
  "Hoops",
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">

        Shop By Category

      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((item) => (

          <div
            key={item}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >

            <div className="text-5xl mb-4">

              💎

            </div>

            <h3 className="font-semibold">

              {item}

            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}