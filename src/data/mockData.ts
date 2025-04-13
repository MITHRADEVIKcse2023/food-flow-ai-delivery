
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  featured?: boolean;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  vegetarian?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    cuisine: 'American',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    featured: true
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '25-40 min',
    deliveryFee: '$3.99'
  },
  {
    id: '3',
    name: 'Sushi Delight',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: '$4.99',
    featured: true
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80',
    cuisine: 'Mexican',
    rating: 4.4,
    deliveryTime: '20-35 min',
    deliveryFee: '$3.49'
  },
  {
    id: '5',
    name: 'Curry House',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    cuisine: 'Indian',
    rating: 4.6,
    deliveryTime: '30-45 min',
    deliveryFee: '$3.99',
    featured: true
  },
  {
    id: '6',
    name: 'Pho Noodle Bar',
    image: 'https://images.unsplash.com/photo-1576577445542-afd9575f5ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    cuisine: 'Vietnamese',
    rating: 4.5,
    deliveryTime: '25-40 min',
    deliveryFee: '$3.99'
  }
];

export const foodItems: FoodItem[] = [
  {
    id: '101',
    restaurantId: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
    category: 'Burgers',
    popular: true
  },
  {
    id: '102',
    restaurantId: '1',
    name: 'BBQ Bacon Burger',
    description: 'Beef patty with crispy bacon, cheddar cheese, and tangy BBQ sauce',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    category: 'Burgers'
  },
  {
    id: '103',
    restaurantId: '1',
    name: 'Crispy Chicken Sandwich',
    description: 'Crispy chicken breast with lettuce, pickles, and mayo on a toasted bun',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'Chicken'
  },
  {
    id: '104',
    restaurantId: '1',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with a sprinkle of sea salt',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
    category: 'Sides',
    vegetarian: true
  },
  {
    id: '201',
    restaurantId: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Pizzas',
    vegetarian: true,
    popular: true
  },
  {
    id: '202',
    restaurantId: '2',
    name: 'Pepperoni Pizza',
    description: 'Pizza with tomato sauce, mozzarella, and pepperoni slices',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    category: 'Pizzas',
    popular: true
  },
  {
    id: '301',
    restaurantId: '3',
    name: 'Salmon Nigiri (2 pcs)',
    description: 'Fresh salmon over seasoned rice',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Nigiri',
    popular: true
  },
  {
    id: '302',
    restaurantId: '3',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber wrapped in rice and seaweed',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1625095177927-e9e0b5fccf48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Rolls'
  },
];

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'american', name: 'American' },
  { id: 'italian', name: 'Italian' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'indian', name: 'Indian' },
  { id: 'vietnamese', name: 'Vietnamese' },
  { id: 'chinese', name: 'Chinese' }
];

export const recommendations = [
  {
    id: '101',
    title: 'Based on your preferences',
    items: [foodItems[0], foodItems[4], foodItems[6]]
  },
  {
    id: '102',
    title: 'Popular near you',
    items: [foodItems[1], foodItems[3], foodItems[5]]
  }
];
