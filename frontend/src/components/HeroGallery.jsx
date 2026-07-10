export default function HeroGallery() {

  const images = [

    "https://images.unsplash.com/photo-1617038220319-276d3cfab638",

    "https://images.unsplash.com/photo-1605100804763-247f67b3557e",

    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",

    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",

    "https://images.unsplash.com/photo-1611652022419-a9419f74343d",

    "https://images.unsplash.com/photo-1617038260662-41d3e68d11fd"

  ];

  return (

    <div
      className="
      grid
      grid-cols-2
      md:grid-cols-3
      gap-4
      p-6"
    >

      {images.map((img, index) => (

        <img
          key={index}
          src={img}
          alt=""
          className="
          rounded-lg
          object-cover
          h-72
          w-full"
        />

      ))}

    </div>

  );

}