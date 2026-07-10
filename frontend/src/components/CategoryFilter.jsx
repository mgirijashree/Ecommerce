export default function CategoryFilter({ categories, selected, setSelected }) {
    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {/* "All" button */}
            <button
                onClick={() => setSelected("")}
                className={`px-5 py-2 rounded transition-all duration-200 ${
                    selected === "" 
                        ? "bg-black text-white" 
                        : "bg-gray-200 hover:bg-black hover:text-white"
                }`}
            >
                All
            </button>

            {/* Category buttons */}
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setSelected(category.id)}
                    className={`px-5 py-2 rounded transition-all duration-200 ${
                        selected === category.id 
                            ? "bg-black text-white" 
                            : "bg-gray-200 hover:bg-black hover:text-white"
                    }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}