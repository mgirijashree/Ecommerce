import ring1 from "../assets/images/ring1.jpg";
import ring2 from "../assets/images/ring2.jpg";
import necklace1 from "../assets/images/necklace1.jpg";
import necklace2 from "../assets/images/necklace2.jpg";
import earring1 from "../assets/images/earring1.jpg";
import bracelet1 from "../assets/images/bracelet1.jpg";
import pendant1 from "../assets/images/pendant1.jpg";
import watch1 from "../assets/images/watch1.jpg";

const products = [
  {
    id: 1,
    name: "Diamond Ring",
    description: "18K White Gold Ring",
    price: 45000,
    image: ring1,
    badge: "Sale",
    large: true
  },
  {
    id: 2,
    name: "Gold Ring",
    description: "Traditional Ring",
    price: 28000,
    image: ring2,
    badge: "New"
  },
  {
    id: 3,
    name: "Gold Necklace",
    description: "Premium Necklace",
    price: 75000,
    image: necklace1
  },
  {
    id: 4,
    name: "Diamond Necklace",
    description: "Luxury Collection",
    price: 98000,
    image: necklace2,
    large: true
  },
  {
    id: 5,
    name: "Pearl Earrings",
    description: "Classic Earrings",
    price: 5200,
    image: earring1,
    badge: "Out of Stock"
  },
  {
    id: 6,
    name: "Silver Bracelet",
    description: "925 Sterling Silver",
    price: 3800,
    image: bracelet1
  },
  {
    id: 7,
    name: "Heart Pendant",
    description: "Rose Gold Pendant",
    price: 7900,
    image: pendant1
  },
  {
    id: 8,
    name: "Luxury Watch",
    description: "Women's Watch",
    price: 32000,
    image: watch1
  }
];

export default products;