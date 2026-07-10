export default function CategoryBar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-3 overflow-x-auto mb-8">

      <button
        onClick={() => setSelectedCategory("")}
        className={`px-5 py-2 rounded-full ${
          selectedCategory === ""
            ? "bg-black text-white"
            : "bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-5 py-2 rounded-full ${
            selectedCategory === category.id
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}