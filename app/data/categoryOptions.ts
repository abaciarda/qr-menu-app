export type RecommendedItem = {
  name: string;
  price: number;
  image: string;
};

export type OptionGroup = {
  label: string;
  required: boolean;
  options: string[];
};

export type CategoryConfig = {
  optionGroups: OptionGroup[];
  recommended: RecommendedItem[];
};

export const categoryConfig: Record<string, CategoryConfig> = {
  hamburger: {
    optionGroups: [
      { label: "Spice Level", required: true, options: ["Mild", "Medium", "Hot", "Extra Hot"] },
      { label: "Weight", required: true, options: ["150g", "200g", "250g"] },
      { label: "Extras", required: false, options: ["Extra Cheese", "Bacon", "Avocado", "Jalapeños"] },
    ],
    recommended: [
      { name: "Coffee", price: 5.4, image: "/images/food/coffee.jpg" },
      { name: "Cold Drink", price: 4.9, image: "/images/food/colddrink.jpg" },
      { name: "Dessert", price: 7.3, image: "/images/food/dessert.jpg" },
    ],
  },
  pizza: {
    optionGroups: [
      { label: "Size", required: true, options: ["Small", "Medium", "Large", "XL"] },
      { label: "Crust", required: true, options: ["Thin", "Classic", "Thick", "Stuffed"] },
      { label: "Extras", required: false, options: ["Extra Cheese", "Mushrooms", "Olives", "Peppers"] },
    ],
    recommended: [
      { name: "Coffee", price: 5.4, image: "/images/food/coffee.jpg" },
      { name: "Cold Drink", price: 4.9, image: "/images/food/colddrink2.jpg" },
      { name: "Dessert", price: 8.5, image: "/images/food/dessert2.jpg" },
    ],
  },
  coffee: {
    optionGroups: [
      { label: "Size", required: true, options: ["Small", "Medium", "Large"] },
      { label: "Milk", required: false, options: ["Whole", "Oat", "Almond", "Soy", "Skimmed"] },
      { label: "Sugar", required: false, options: ["No Sugar", "1 Sugar", "2 Sugar", "Sweetener"] },
    ],
    recommended: [
      { name: "Chocolate Brownie", price: 7.5, image: "/images/food/dessert5.jpg" },
      { name: "Classic Cheesecake", price: 9.75, image: "/images/food/dessert2.jpg" },
      { name: "Tiramisu", price: 10.5, image: "/images/food/dessert4.jpg" },
    ],
  },
  dessert: {
    optionGroups: [
      { label: "Portion", required: true, options: ["Single", "Double", "Family"] },
      { label: "Extras", required: false, options: ["Whipped Cream", "Ice Cream", "Caramel Sauce", "Chocolate Sauce"] },
    ],
    recommended: [
      { name: "Cappuccino", price: 5.5, image: "/images/food/coffee2.jpg" },
      { name: "Iced Coffee", price: 5.75, image: "/images/food/coffee4.jpg" },
      { name: "Cold Drink", price: 4.9, image: "/images/food/colddrink.jpg" },
    ],
  },
  "cold-drink": {
    optionGroups: [
      { label: "Size", required: true, options: ["Small", "Medium", "Large"] },
      { label: "Ice", required: false, options: ["No Ice", "Less Ice", "Normal", "Extra Ice"] },
    ],
    recommended: [
      { name: "Classic Beef Burger", price: 12.5, image: "/images/food/beefburger.jpg" },
      { name: "Margherita Pizza", price: 11.5, image: "/images/food/pizza.jpg" },
      { name: "Chocolate Brownie", price: 7.5, image: "/images/food/dessert5.jpg" },
    ],
  },
};
