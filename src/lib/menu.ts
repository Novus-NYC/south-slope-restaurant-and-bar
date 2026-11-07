/**
 * Menu data for South Slope Restaurant & Bar.
 *
 * Source of truth: the "Menus (New)" text menu on the old site, captured
 * 2026-11-06 (prices). Where that menu listed an item by name only, the
 * description comes from the older image menus; those items are listed in
 * BUILD_NOTES.md so the owner can confirm them. Cocktails come from the
 * cocktail board image only. Prices are USD.
 */

export type DietTag = "vegan" | "vegetarian";

export interface MenuItem {
  name: string;
  description?: string;
  /** Base price in dollars. Omitted when the category intro states the price. */
  price?: number;
  /** Extra price text shown after the price, for example "12 pc $21.95" */
  priceNote?: string;
  tags?: DietTag[];
}

export interface MenuCategory {
  id: string;
  name: string;
  /** Shared notes for the category: what items come with, size pricing, add-ons. */
  notes?: string[];
  items: MenuItem[];
}

export interface MenuSection {
  id: string;
  name: string;
  blurb: string;
  categories: MenuCategory[];
}

export const dietTagLabel: Record<DietTag, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
};

export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/* Breakfast                                                           */
/* ------------------------------------------------------------------ */

const eggs: MenuCategory = {
  id: "eggs-omelettes",
  name: "Eggs & Omelettes",
  notes: ["Served with home fries or mixed greens, and toast."],
  items: [
    { name: "Two Eggs Any Style", price: 8.95 },
    {
      name: "Steak & Eggs",
      description: "Herb-marinated rib eye steak with two eggs any style.",
      price: 22.95,
    },
    {
      name: "Plain Omelette",
      description: "Add veggies (baby spinach, broccoli, peppers, tomatoes, onions, jalapeño, mushrooms or zucchini) or egg whites.",
      price: 10.5,
    },
    {
      name: "Bacon, Ham or Sausage Omelette",
      description: "One choice per omelette. Add cheese.",
      price: 12.75,
    },
    {
      name: "Florentine Omelette",
      description: "Baby spinach, feta cheese and red onions.",
      price: 13.95,
    },
    {
      name: "High Protein Omelette",
      description: "Four egg whites, fresh roast turkey, baby spinach, served with steamed veggies and 7-grain toast.",
      price: 14.95,
    },
    {
      name: "California Omelette",
      description: "Broccoli, mushroom, avocado and mozzarella cheese.",
      price: 14.5,
    },
    {
      name: "Italian Omelette",
      description: "Bacon, ham, onions, peppers and mozzarella cheese.",
      price: 14.75,
    },
    { name: "Western Omelette", description: "Ham, peppers, onions.", price: 12.95 },
    { name: "Greek Omelette", description: "Feta cheese, onions, tomatoes.", price: 13.95 },
    {
      name: "Mexican Omelette",
      description: "Onions, tomatoes, jalapeño peppers.",
      price: 13.5,
    },
    {
      name: "Alpine Omelette",
      description: "Bacon, mushroom, onion, swiss cheese.",
      price: 13.95,
    },
    {
      name: "Veggie Omelette",
      description: "Broccoli, mushrooms, green peppers and tomato.",
      price: 13.5,
      tags: ["vegetarian"],
    },
    {
      name: "Chilaquiles Rojos",
      description: "Corn tortilla chips in home-made red sauce, two poached eggs, red onions and fresh crema, with rice, beans and queso fresco.",
      price: 15.95,
    },
    {
      name: "Chilaquiles Verdes",
      description: "Corn tortilla chips in home-made green sauce, two poached eggs, red onions and fresh crema, with rice, beans and queso fresco.",
      price: 15.95,
    },
    {
      name: "Huevos Ala Mexicana",
      description: "Three scrambled eggs, sautéed tomatoes, jalapeño and onions, with rice, beans and tortillas.",
      price: 14.95,
    },
    {
      name: "Huevos Rancheros",
      description: "Two eggs over easy on lightly fried corn tortillas with rice, salsa verde, pico de gallo and fresh crema, beans and queso fresco on the side.",
      price: 15.95,
    },
    {
      name: "Eggs Benedict",
      description: "Two poached eggs and Canadian bacon on an English muffin, topped with hollandaise.",
      price: 14.5,
    },
    {
      name: "Florentine Benedict",
      description: "Two poached eggs, spinach and feta on an English muffin, topped with hollandaise.",
      price: 14.5,
      tags: ["vegetarian"],
    },
    {
      name: "Guacamole Benedict",
      description: "Two poached eggs over guacamole on a multigrain English muffin, topped with hollandaise.",
      price: 14.5,
      tags: ["vegetarian"],
    },
  ],
};

const pancakes: MenuCategory = {
  id: "pancakes",
  name: "Pancakes, Waffles & French Toast",
  notes: [
    "Add bacon, sausage or ham +4. Turkey bacon, Canadian bacon, turkey sausage or chorizo +5. Eggs +3. Fresh strawberry +3.",
  ],
  items: [
    {
      name: "Olympic Breakfast",
      description: "Pancakes, two eggs over easy and turkey bacon. Organic maple syrup +2.50.",
      price: 14.95,
    },
    {
      name: "Big Boy Breakfast",
      description: "Pancakes or French toast with ham, bacon and sausage, and two eggs any style.",
      price: 16.95,
    },
    { name: "Pancakes", price: 10.5, tags: ["vegetarian"] },
    { name: "Belgian Waffle", price: 10.5, tags: ["vegetarian"] },
    { name: "Challah French Toast", price: 10.5, tags: ["vegetarian"] },
    { name: "Banana Pancakes", price: 13.5, tags: ["vegetarian"] },
    { name: "Blueberry Pancakes", price: 13.5, tags: ["vegetarian"] },
    { name: "Chocolate Chip Pancakes", price: 13.5, tags: ["vegetarian"] },
    {
      name: "Vanilla-Walnut French Toast",
      description: "Bananas and vanilla infused maple syrup with walnuts.",
      price: 13.95,
      tags: ["vegetarian"],
    },
    { name: "Peanut Butter-Banana Pancakes", price: 13.5, tags: ["vegetarian"] },
    {
      name: "Kid's Pancakes",
      description: "Six silver dollar pancakes with Nutella, whipped cream, strawberry or banana, and a small juice.",
      price: 12.5,
      tags: ["vegetarian"],
    },
  ],
};

const breakfastSandwiches: MenuCategory = {
  id: "breakfast-sandwiches",
  name: "Breakfast Sandwiches & Wraps",
  items: [
    {
      name: "The Classic",
      description: "Two eggs, turkey bacon and mozzarella on 7-grain toast.",
      price: 12.95,
    },
    {
      name: "Feta & Spinach",
      description: "Two eggs, feta cheese and baby spinach on 7-grain toast.",
      price: 11.95,
      tags: ["vegetarian"],
    },
    {
      name: "Mexican Fajita Wrap",
      description: "Two eggs, onions, tomatoes, jalapeño and pepper jack cheese on a multigrain wrap.",
      price: 13.25,
      tags: ["vegetarian"],
    },
    {
      name: "Protein Breakfast Wrap",
      description: "Three egg whites, baby spinach and turkey bacon on a whole wheat wrap.",
      price: 12.95,
    },
    {
      name: "Breakfast Burrito",
      description: "Two scrambled eggs, rice and beans, guacamole, salsa verde and fresh crema on a whole wheat wrap.",
      price: 13.95,
      tags: ["vegetarian"],
    },
    {
      name: "Mexican Chorizo Wrap",
      description: "Two eggs, chorizo, onions, peppers, tomato and black beans.",
      price: 13.95,
    },
    {
      name: "Americano Breakfast Wrap",
      description: "Two eggs, bacon, American cheese and home fries on a whole wheat wrap.",
      price: 12.25,
    },
    { name: "Egg Sandwich", description: "On a kaiser roll.", price: 4.5, tags: ["vegetarian"] },
    { name: "Potato & Egg Sandwich", price: 6.5, tags: ["vegetarian"] },
    { name: "Bacon & Egg Sandwich", price: 6.5 },
    { name: "Bacon, Egg and Cheese Sandwich", price: 7.75 },
    {
      name: "Slope BEC",
      description: "Two eggs, bacon and cheese on a Belgian waffle.",
      price: 11.95,
    },
  ],
};

const breakfastBites: MenuCategory = {
  id: "breakfast-bites",
  name: "Breakfast Bites",
  items: [
    {
      name: "Yogurt Parfait",
      description: "16 oz. Greek yogurt, granola, mixed berries and honey.",
      price: 11.5,
      tags: ["vegetarian"],
    },
    {
      name: "Hot Oatmeal",
      description: "Berries +3, banana +1.50.",
      price: 6.95,
      tags: ["vegan"],
    },
    { name: "Fresh Fruit Salad", description: "16 oz.", price: 6.95, tags: ["vegan"] },
    { name: "Assorted Muffin", price: 3.95, tags: ["vegetarian"] },
  ],
};

/* ------------------------------------------------------------------ */
/* Lunch & Dinner                                                      */
/* ------------------------------------------------------------------ */

const starters: MenuCategory = {
  id: "starters",
  name: "Starters",
  items: [
    {
      name: "Wings",
      description: "Spicy BBQ, buffalo or teriyaki, with carrots, celery and blue cheese.",
      price: 11.95,
      priceNote: "6 pc, 12 pc $21.95",
    },
    {
      name: "Mac 'N' Cheese",
      description: "Five-cheese house blend. Jalapeños +1, bacon +2, truffle oil +3.",
      price: 13.95,
      tags: ["vegetarian"],
    },
    {
      name: "Cheese Nachos",
      description: "Corn tortilla chips, refried black beans, mozzarella and cheddar, pico de gallo, sour cream and guacamole. Add chicken, chorizo or beef +5.",
      price: 13.95,
      tags: ["vegetarian"],
    },
    {
      name: "Nacho Fries",
      description: "The nacho toppings on french fries. Add chicken, chorizo or beef +5.",
      price: 13.95,
      tags: ["vegetarian"],
    },
    { name: "Panko Fried Shrimp", price: 15.95 },
    {
      name: "Chicken Tenders",
      description: "Honey dijon, BBQ or ranch. Tossed in buffalo +1.",
      price: 10.95,
    },
    { name: "Mozzarella Sticks", description: "Tomato-basil sauce.", price: 8.95, tags: ["vegetarian"] },
    {
      name: "Fried-Cheese Ravioli",
      description: "Tomato-basil sauce and parmesan.",
      price: 11.95,
      tags: ["vegetarian"],
    },
    { name: "Guac & Chips", price: 11.75, tags: ["vegan"] },
    {
      name: "Home-Made Hummus",
      description: "With white or whole wheat pita.",
      price: 7.95,
      tags: ["vegan"],
    },
    { name: "Home-Made Tzatziki", description: "With white or whole wheat pita.", price: 7.95, tags: ["vegetarian"] },
    {
      name: "Touchdown",
      description: "Three buffalo wings, three mozzarella sticks and three chicken tenders with blue cheese, marinara and honey mustard.",
      price: 16.95,
    },
    {
      name: "Party Platter",
      description: "20 wings, fries, ranch, blue cheese, carrots and celery.",
      price: 39.95,
    },
    {
      name: "Stuffed Baked Potato",
      description: "Bacon and cheese, or broccoli and cheddar.",
      price: 10.95,
    },
  ],
};

const salads: MenuCategory = {
  id: "salads",
  name: "Salads",
  notes: ["Add grilled or panko chicken +5, grilled salmon or shrimp +8, avocado +2.75."],
  items: [
    {
      name: "South Slope Salad",
      description: "Mesclun, goat cheese, candied walnuts, dried cranberries, pomegranate vinaigrette.",
      price: 13.95,
      tags: ["vegetarian"],
    },
    {
      name: "Kale-Quinoa Salad",
      description: "Baby kale, organic quinoa, feta, green apples, dried cranberries, sliced almonds, lemon vinaigrette.",
      price: 14.5,
      tags: ["vegetarian"],
    },
    {
      name: "Greek Salad",
      description: "Romaine, feta, cucumber, tomato, red onions, oregano, kalamata olives and grape leaves, olive oil vinaigrette.",
      price: 13.75,
      tags: ["vegetarian"],
    },
    {
      name: "Cobb Salad",
      description: "Lettuce, turkey bacon, cherry tomato, avocado, hard-boiled egg, balsamic vinaigrette.",
      price: 13.95,
    },
    {
      name: "Caesar Salad",
      description: "Romaine, seasoned croutons, parmesan, creamy caesar dressing.",
      price: 11.95,
      tags: ["vegetarian"],
    },
    {
      name: "Primavera Salad",
      description: "Romaine, cherry tomato, cucumber, shredded carrot, avocado, balsamic vinaigrette.",
      price: 12.95,
      tags: ["vegan"],
    },
    {
      name: "Kitchen Chopped Salad",
      description: "Romaine, red onions, tomato, cucumbers, turkey bacon bits, black beans and pico de gallo with house dressing.",
      price: 13.95,
    },
    {
      name: "Salmon Salad",
      description: "Mesclun, grilled salmon, red onions, cucumbers, organic quinoa, lemon vinaigrette.",
      price: 18.95,
    },
    {
      name: "Guacamole & Chips Salad",
      description: "Romaine and baby kale, shredded carrots, cherry tomatoes, cucumbers, red onions, broccoli, home-made guacamole and tortilla chips with light caesar dressing.",
      price: 14.5,
      tags: ["vegetarian"],
    },
    {
      name: "Chicken Chipotle Salad",
      description: "Romaine, spinach, red onions, turkey bacon, cucumbers, cherry tomatoes and chipotle chicken with light caesar dressing.",
      price: 15.95,
    },
  ],
};

const wraps: MenuCategory = {
  id: "wraps-bowls",
  name: "Wraps & Bowls",
  notes: [
    "Served on a whole wheat wrap with blue chips. Spinach or sun-dried tomato wrap available.",
    "Bowl it over brown rice or quinoa +4.",
  ],
  items: [
    {
      name: "South Slope Wrap",
      description: "Grilled chicken, mesclun, goat cheese, candied walnuts, dried cranberries, pomegranate vinaigrette.",
      price: 13.25,
    },
    {
      name: "Honey-Chicken Wrap",
      description: "Grilled chicken, lettuce, cherry tomato, red onions and home-made honey dijon mustard.",
      price: 12.95,
    },
    {
      name: "Quinoa Wrap",
      description: "Organic quinoa, black beans, avocado, cherry tomato and fresh salsa.",
      price: 12.75,
      tags: ["vegan"],
    },
    {
      name: "Mediterranean Wrap",
      description: "Grilled chicken, mixed greens, cherry tomatoes, cucumbers, red onions and home-made hummus.",
      price: 13.25,
    },
    {
      name: "Sesame Ginger Wrap",
      description: "Grilled chicken, avocado, tomato, baby spinach and sesame ginger dressing.",
      price: 13.25,
    },
    {
      name: "Santa Fe Wrap",
      description: "Grilled chicken, romaine, pico de gallo, corn, black beans, pepper jack cheese and fresh salsa.",
      price: 13.5,
    },
    {
      name: "Chipotle Chicken Wrap",
      description: "Grilled chicken, baby spinach, corn, red cabbage, cherry tomato, pico de gallo and chipotle mayo. Sub shrimp +2.",
      price: 13.95,
    },
    {
      name: "Buffalo Chicken Wrap",
      description: "Panko chicken, lettuce, cherry tomato, buffalo sauce and blue cheese dressing.",
      price: 12.95,
    },
    {
      name: "Tropical Salmon Wrap",
      description: "Grilled salmon, fresh mango, pico de gallo, baby kale and red cabbage.",
      price: 14.5,
    },
    {
      name: "Crunchy Chicken Wrap",
      description: "Panko chicken, cheddar, red onions, mesclun greens, ranch dressing.",
      price: 12.95,
    },
    {
      name: "Caesar Wrap",
      description: "Grilled chicken, romaine, parmesan and creamy caesar dressing.",
      price: 11.95,
    },
    { name: "Tuna Salad Wrap", price: 10.5 },
    {
      name: "Spicy Mango Salmon Wrap",
      description: "Grilled salmon, mesclun, fresh mango, pico de gallo, avocado.",
      price: 14.5,
    },
    {
      name: "TBLT Wrap",
      description: "Fresh roast turkey, lettuce, tomato, turkey bacon and honey dijon.",
      price: 13.25,
    },
    {
      name: "Protein Veggie Wrap",
      description: "Steamed brown rice, black beans, avocado, cherry tomato, fresh salsa.",
      price: 12.75,
      tags: ["vegan"],
    },
    {
      name: "California Wrap",
      description: "Grilled chicken, romaine, tomato, avocado and fresh salsa.",
      price: 13.25,
    },
    {
      name: "Bison Protein Wrap",
      description: "Ground bison, roasted bell peppers, caramelized onions, brown rice and avocado.",
      price: 14.25,
    },
    {
      name: "The Kitchen Burrito",
      description: "Herb-marinated rib eye, black beans, brown rice, guacamole and pepper jack.",
      price: 14.5,
    },
    {
      name: "Steak Wrap",
      description: "Herb-marinated rib eye, roasted peppers, caramelized onions, fresh mozzarella and black beans.",
      price: 14.5,
    },
    {
      name: "Tofu Veggie Wrap",
      description: "Stir-fried tofu with sesame seeds, roasted vegetables and sesame ginger dressing.",
      price: 12.95,
      tags: ["vegan"],
    },
  ],
};

const signatureSandwiches: MenuCategory = {
  id: "signature-sandwiches",
  name: "Signature Sandwiches",
  notes: ["Served with blue chips."],
  items: [
    {
      name: "Chipotle Chicken BLT",
      description: "Panko fried chicken, crispy bacon, lettuce, tomato and chipotle mayo on toasted 7-grain.",
      price: 13.5,
    },
    {
      name: "The Park Slope",
      description: "Grilled chicken, turkey bacon, lettuce, avocado and aioli on toasted 7-grain.",
      price: 13.5,
    },
    {
      name: "The Twister",
      description: "Grilled chicken, pepper jack, avocado, romaine and tomato on toasted 7-grain.",
      price: 12.95,
    },
    {
      name: "California BLT",
      description: "Turkey bacon, romaine, tomato, avocado and mayo on toasted 7-grain.",
      price: 11.25,
    },
    {
      name: "Vegetarian Pita Sandwich",
      description: "Home-made hummus, tomato, cucumber, avocado and romaine on a whole wheat pita.",
      price: 11.95,
      tags: ["vegan"],
    },
    {
      name: "California Tuna Melt",
      description: "Tuna salad, avocado and melted American cheese on 7-grain.",
      price: 12.95,
    },
    {
      name: "Philly Cheesesteak",
      description: "Roasted pepper, caramelized onion and mozzarella on toasted ciabatta, with french fries. Mushroom +1.",
      price: 14.95,
    },
    {
      name: "Chicken Club Panini",
      description: "Grilled chicken, turkey bacon, lettuce, tomato, mayo and mozzarella on pita.",
      price: 13.5,
    },
    {
      name: "Chicken Pesto Panini",
      description: "Grilled chicken, roasted peppers, pesto and fresh mozzarella on whole wheat pita.",
      price: 13.5,
    },
    {
      name: "Chicken Parm Panini",
      description: "Panko fried chicken, tomato-basil sauce and mozzarella on ciabatta, with french fries.",
      price: 14.95,
    },
    {
      name: "Mexican Twist Panini",
      description: "Spicy grilled chicken, brown rice and beans, avocado, pepper jack, romaine, tomato and chipotle mayo on whole wheat pita.",
      price: 13.95,
    },
    {
      name: "Flamed Chicken Pesto Panini",
      description: "Grilled chicken, roasted eggplant, zucchini, peppers, goat cheese and pesto on whole wheat pita.",
      price: 14.5,
    },
    { name: "Chicken & Mushroom Panini", price: 13.95 },
    {
      name: "Steak Panini",
      description: "Herb-marinated rib eye, caramelized onions, roasted peppers, mozzarella and chipotle mayo on ciabatta.",
      price: 14.5,
    },
    {
      name: "Chicken & Waffle Sandwich",
      description: "Panko chicken, bacon, cheddar and spiced-maple mayo on a buttermilk Belgian waffle.",
      price: 14.75,
    },
    {
      name: "Avocado Toast",
      description: "Avocado, red pepper flakes and cilantro on country bread. Two sunny side eggs +2.50.",
      price: 12.95,
      tags: ["vegan"],
    },
    {
      name: "Italiano Panini",
      description: "Grilled chicken, roasted peppers, mozzarella and balsamic glaze on pita.",
      price: 13.5,
    },
    {
      name: "El Cubano",
      description: "Slow-braised pork shoulder, ham, swiss, spicy brown mustard and pickles on ciabatta, with french fries.",
      price: 14.95,
    },
  ],
};

const tastySandwiches: MenuCategory = {
  id: "tasty-sandwiches",
  name: "Tasty Sandwiches",
  notes: ["Served on white toast with pickles and cole slaw."],
  items: [
    { name: "Tuna Salad Sandwich", description: "With lettuce and tomato.", price: 9.5 },
    { name: "Individual Tuna Sandwich", description: "With lettuce, tomato and mayo.", price: 9.5 },
    { name: "B.L.T.", description: "Bacon, lettuce and tomato with mayo.", price: 8.5 },
    {
      name: "Fresh Roast Turkey Sandwich",
      description: "With lettuce, tomato and mayo.",
      price: 10.95,
    },
    {
      name: "Gyro Sandwich",
      description: "On pita with lettuce, tomato, onion and tzatziki.",
      price: 10.95,
    },
    {
      name: "Chicken Souvlaki Sandwich",
      description: "On pita with lettuce, tomato, onion and tzatziki.",
      price: 10.95,
    },
    { name: "Egg Salad", description: "With lettuce and tomato.", price: 8.5, tags: ["vegetarian"] },
    {
      name: "Classic Grilled Cheese",
      description: "Add bacon or ham, or tomato.",
      price: 7.25,
      tags: ["vegetarian"],
    },
  ],
};

const clubSandwiches: MenuCategory = {
  id: "club-sandwiches",
  name: "Club Sandwiches",
  notes: [
    "Served on white toast with french fries, pickles and cole slaw. Sub sweet potato fries +1, waffle fries +2, or mixed greens.",
  ],
  items: [
    {
      name: "Fresh Roast Turkey Club",
      description: "With bacon, lettuce, tomato and mayo.",
      price: 16.95,
    },
    {
      name: "Grilled Chicken Club",
      description: "With bacon, lettuce, tomato and mayo.",
      price: 16.95,
    },
    { name: "Tuna Salad Club", description: "With sliced egg, lettuce and tomato.", price: 15.95 },
    { name: "Egg Salad Club", description: "With bacon, lettuce and tomato.", price: 14.95 },
  ],
};

const quesadillas: MenuCategory = {
  id: "quesadillas",
  name: "Quesadillas",
  notes: [
    "Served on a multigrain tortilla with pico de gallo and sour cream. Whole wheat, spinach or sun-dried tomato tortilla available. Guacamole +3.",
  ],
  items: [
    {
      name: "Chicken Chipotle Quesadilla",
      description: "Grilled chicken, mozzarella, caramelized onions, roasted peppers and chipotle mayo.",
      price: 14.5,
    },
    {
      name: "Flaming Quesadilla",
      description: "Spicy grilled chicken, roasted peppers, onions, fresh jalapeño and pepper jack.",
      price: 14.5,
    },
    {
      name: "Mexican Quesadilla",
      description: "Chicken tinga (shredded chicken), seasoned tomato, onions, chipotle sauce and fresh mozzarella.",
      price: 14.25,
    },
    {
      name: "Steak Quesadilla",
      description: "Herb-marinated rib eye, caramelized onions, roasted peppers, black beans and cheddar.",
      price: 14.75,
    },
    {
      name: "Veggie Quesadilla",
      description: "Mixed grilled veggies, black beans, cheddar and chipotle mayo.",
      price: 13.25,
      tags: ["vegetarian"],
    },
    {
      name: "Cowboy Quesadilla",
      description: "Grilled chicken, roasted peppers, caramelized onions and cheddar with tangy barbecue sauce.",
      price: 12.95,
    },
    {
      name: "Chicken & Spinach Quesadilla",
      description: "Grilled chicken, baby spinach and fresh mozzarella.",
      price: 13.25,
    },
    {
      name: "Chicken Quesadilla",
      description: "Grilled chicken, mozzarella and cheddar.",
      price: 12.95,
    },
    {
      name: "Cheese Quesadilla",
      description: "Melted mozzarella and cheddar.",
      price: 10.95,
      tags: ["vegetarian"],
    },
  ],
};

const burgers: MenuCategory = {
  id: "burger-bar",
  name: "Burger Bar",
  notes: ["8 oz Angus beef burgers served on brioche."],
  items: [
    {
      name: "South Slope Burger",
      description: "8 oz Angus beef, lettuce, tomato, red onion and south slope sauce on brioche.",
      price: 11.75,
    },
    {
      name: "The Beyond Burger",
      description: "Plant based patty, lettuce, tomato and red onions on brioche (the brioche bun is not vegan or gluten free).",
      price: 13.75,
      tags: ["vegan"],
    },
    {
      name: "Buttermilk Chicken Sandwich",
      description: "Pepper jack, purple cabbage, lettuce, tomato and chipotle mayo on brioche.",
      price: 13.25,
    },
    {
      name: "Crispy Chicken Burger",
      description: "Panko fried chicken breast, lettuce, tomato and red onions on brioche.",
      price: 10.95,
    },
    {
      name: "Hangover Burger",
      description: "Angus beef, American cheese, bacon and a sunny side egg.",
      price: 14.5,
    },
    {
      name: "Backyard BBQ Burger",
      description: "Caramelized onions, BBQ sauce, swiss cheese and bacon.",
      price: 13.95,
    },
    {
      name: "Fresh Grilled Salmon Burger",
      description: "Avocado, romaine, tomato and chipotle mayo on a multigrain roll.",
      price: 13.95,
    },
    {
      name: "Philly Burger",
      description: "Grilled onions and peppers with melted mozzarella.",
      price: 12.95,
    },
    {
      name: "Mexican Burger",
      description: "Cheddar, pickled jalapeños and avocado with cilantro mayo.",
      price: 12.95,
    },
    {
      name: "Grilled Chicken Burger",
      description: "Lettuce, tomato and red onions on brioche.",
      price: 10.95,
    },
    {
      name: "Build Your Own Burger",
      description: "Angus beef, turkey burger or grilled chicken.",
      price: 10.5,
    },
    {
      name: "Turkey Burger",
      description: "All natural, hormone and antibiotic free. Lettuce, tomato and red onions on a multigrain roll.",
      price: 10.95,
    },
    {
      name: "Cheeseburger Deluxe",
      description: "With lettuce, tomato, pickles, cole slaw and french fries.",
      price: 14.95,
    },
    {
      name: "Fish Burger",
      description: "Panko fried fish filet with lettuce, tomato and onion, tartar sauce on the side.",
      price: 13.95,
    },
  ],
};

const grainBowls: MenuCategory = {
  id: "grain-bowls",
  name: "Grain Bowls",
  notes: [
    "Served over white rice, brown rice or organic quinoa. Avocado +3, grilled chicken +5, fresh turkey +5.",
  ],
  items: [
    {
      name: "Teriyaki Rice Bowl",
      description: "Diced carrots, broccoli and zucchini sautéed over brown rice with teriyaki glaze.",
      price: 14.95,
      tags: ["vegan"],
    },
    {
      name: "Baja Bowl",
      description: "Brown rice, black beans, corn, purple cabbage, avocado, pickled jalapeño, sour cream and chipotle mayo.",
      price: 15.95,
      tags: ["vegetarian"],
    },
    {
      name: "Super Protein Bowl",
      description: "Brown rice, black beans, broccoli, carrots, string beans, purple cabbage, avocado and pico de gallo.",
      price: 14.95,
      tags: ["vegan"],
    },
    {
      name: "Vegan Bowl",
      description: "Organic quinoa, sautéed mixed vegetables, black beans, chickpeas and roasted sweet potato.",
      price: 14.95,
      tags: ["vegan"],
    },
    {
      name: "Quinoa Medley",
      description: "Organic quinoa, dried cranberries, caramelized onions, mushrooms, string beans, roasted sweet potato and spinach.",
      price: 14.95,
      tags: ["vegan"],
    },
    {
      name: "Super Vegan Quinoa Bowl",
      description: "Sautéed kale, peppers, onions, string beans and roasted sweet potato over organic quinoa with a scoop of hummus.",
      price: 14.95,
      tags: ["vegan"],
    },
    {
      name: "The Natural Grain Bowl",
      description: "Organic quinoa, baby kale, sun-dried tomato, chickpeas, green squash, roasted sweet potato, avocado and olive oil.",
      price: 13.95,
      tags: ["vegan"],
    },
    {
      name: "Chipotle Grain Bowl",
      description: "Brown rice, romaine, pico de gallo, black beans, corn, shredded cheddar, chipotle mayo and avocado.",
      price: 15.95,
      tags: ["vegetarian"],
    },
    {
      name: "Nutri Army Bowl",
      description: "Brown rice, baby spinach, purple cabbage, cherry tomatoes, walnuts, hard boiled egg, chipotle mayo and a scoop of tuna.",
      price: 14.95,
    },
    {
      name: "Kalemelized Bowl",
      description: "Baby kale, caramelized onions, golden beets, roasted peppers, walnuts, goat cheese and fig balsamic.",
      price: 14.75,
      tags: ["vegetarian"],
    },
    {
      name: "Tropical Salmon Bowl",
      description: "Brown rice, grilled salmon, fresh mango, pico de gallo, baby kale and red cabbage.",
      price: 18.95,
    },
    {
      name: "Breakfast Bowl",
      description: "Organic quinoa, spinach, mushrooms, baked sweet potato, pico de gallo, home-made salsa and a sunny side egg.",
      price: 14.5,
      tags: ["vegetarian"],
    },
    {
      name: "The Greek Chicken Bowl",
      description: "Grilled chicken, Greek salad and brown rice with tzatziki and pita on the side.",
      price: 18.95,
    },
    {
      name: "Tofu Veggie Bowl",
      description: "Brown rice, stir-fried tofu with sesame seeds, roasted vegetables and sesame ginger dressing.",
      price: 16.95,
      tags: ["vegan"],
    },
  ],
};

const entrees: MenuCategory = {
  id: "entrees",
  name: "Entrees",
  notes: [
    "Sides: brown rice, white rice, black beans, baked sweet potato, quinoa, garden salad or a cup of soup. Spinach +2, broccoli +2.",
  ],
  items: [
    {
      name: "Herb-Marinated Steak",
      description: "12 oz char-broiled boneless rib eye with two sides.",
      price: 27.95,
    },
    { name: "Char-Grilled Chicken", description: "With two sides.", price: 19.95 },
    {
      name: "Pan-Seared Salmon",
      description: "Lemon vinaigrette or teriyaki glaze, with two sides.",
      price: 26.95,
    },
    { name: "Shrimp Ala Mexicana over Pasta", price: 23.95 },
    { name: "Chicken Fajitas", price: 22.95 },
    { name: "Shrimp Fajitas", price: 25.95 },
    {
      name: "South of the Border",
      description: "Chicken and bison with bell peppers and onions, topped with salsa, with baked sweet potato and black beans.",
      price: 22.95,
    },
    {
      name: "Penne Ala Vodka",
      description: "Light tomato cream sauce. Chicken +5, shrimp +8, salmon +8.",
      price: 15.95,
      tags: ["vegetarian"],
    },
    {
      name: "Shrimp Parmigiana",
      description: "Over spaghetti, linguini, penne or rigatoni.",
      price: 22.95,
    },
    {
      name: "Chicken Marsala over Linguini",
      description: "Sautéed chicken breast with mushrooms in a marsala wine sauce.",
      price: 23.95,
    },
    {
      name: "Eggplant Parmigiana",
      description: "Over spaghetti, linguini, penne or rigatoni.",
      price: 18.95,
      tags: ["vegetarian"],
    },
    {
      name: "Chicken Parmigiana",
      description: "Over spaghetti, linguini, penne or rigatoni.",
      price: 18.95,
    },
    { name: "Broiled Flamed Salmon with Pesto", description: "With two sides.", price: 26.95 },
    {
      name: "Panko Fried Jumbo Shrimp",
      description: "With two sides and tartar sauce.",
      price: 21.95,
    },
    {
      name: "Greek Gyro Platter",
      description: "With Greek salad, french fries, tzatziki and pita.",
      price: 19.95,
    },
    {
      name: "Chicken Souvlaki Platter",
      description: "With Greek salad, french fries, tzatziki and pita.",
      price: 19.95,
    },
    { name: "Buttermilk Fried Chicken Breast", description: "With two sides.", price: 19.95 },
    { name: "Spaghetti and Meatballs", price: 18.95 },
    {
      name: "Fried Chicken and Waffle Platter",
      description: "Buttermilk fried chicken and a Belgian waffle with syrup, chipotle mayo on the side.",
      price: 19.95,
    },
    { name: "Two Turkey Burgers", description: "Two turkey patties with two sides.", price: 19.95 },
    {
      name: "Angus Beef & Grilled Chicken Combo",
      description: "With two sides.",
      price: 19.95,
    },
    { name: "Fried Fish Filet", description: "With two sides and tartar sauce.", price: 22.95 },
    {
      name: "Pasta Pomodoro",
      description: "Rigatoni with cherry tomatoes, garlic, tomato-basil sauce, red pepper flakes and shaved parmesan.",
      price: 14.95,
      tags: ["vegetarian"],
    },
  ],
};

const sides: MenuCategory = {
  id: "sides",
  name: "Sides",
  items: [
    { name: "French Fries", price: 6, tags: ["vegan"] },
    { name: "Cheese Fries", price: 8, tags: ["vegetarian"] },
    { name: "Waffle Fries", price: 7, tags: ["vegan"] },
    { name: "Parmesan-Truffle Fries", price: 8, tags: ["vegetarian"] },
    { name: "Onion Rings", price: 7, tags: ["vegetarian"] },
    { name: "Sweet Potato Fries", price: 7, tags: ["vegan"] },
    { name: "Baked Potato", price: 6, tags: ["vegan"] },
    { name: "Mashed Potato with Gravy", price: 6 },
    { name: "Baked Sweet Potato", price: 7, tags: ["vegan"] },
    { name: "Steamed Brown Rice", price: 5, tags: ["vegan"] },
    { name: "Seasoned Rice", price: 5, tags: ["vegan"] },
    { name: "Organic Quinoa", price: 5, tags: ["vegan"] },
    { name: "Sautéed Spinach", price: 7.5, tags: ["vegan"] },
    { name: "Sautéed Broccoli", price: 7.5, tags: ["vegan"] },
    { name: "Steamed Mixed Veggies", price: 6.5, tags: ["vegan"] },
    { name: "Steamed Broccoli", price: 6.5, tags: ["vegan"] },
    { name: "Half Avocado", price: 4, tags: ["vegan"] },
  ],
};

const soups: MenuCategory = {
  id: "soups",
  name: "Soups",
  notes: ["16 oz $6.50. 32 oz +5.50."],
  items: [
    { name: "Chicken and Rice", price: 6.5 },
    { name: "Spinach Lentil", price: 6.5, tags: ["vegan"] },
    { name: "Chicken Noodle", price: 6.5 },
  ],
};

/* ------------------------------------------------------------------ */
/* Drinks & Bar                                                        */
/* ------------------------------------------------------------------ */

const icedDrinks: MenuCategory = {
  id: "specialty-iced-drinks",
  name: "Specialty Iced Drinks",
  notes: ["Milk choice: regular, almond or soy."],
  items: [
    {
      name: "Iced Matcha Latte",
      description: "Organic Japanese matcha and oat milk over ice.",
      price: 5.5,
    },
    { name: "Iced Lavender Matcha Latte", price: 6.5 },
    { name: "Iced Guava Matcha Latte", price: 6.5 },
    { name: "Iced Mango Matcha Latte", price: 6.5 },
    { name: "Iced Lemon Ginger Passion Fruit Iced Tea", price: 4 },
    { name: "Iced Hibiscus Green Tea", price: 4 },
  ],
};

const juices: MenuCategory = {
  id: "fresh-juices",
  name: "Fresh Squeezed Juices",
  notes: ["16 oz $6.95. 20 oz +1.80. 24 oz +3.55."],
  items: [
    { name: "Iron Man", description: "Green apple, lemon, carrot, beets, ginger.", price: 6.95, tags: ["vegan"] },
    { name: "Kitchen King", description: "Spinach, parsley, carrot, green apple, celery.", price: 6.95, tags: ["vegan"] },
    { name: "Flu Fighter", description: "Grapefruit, lemon, orange, ginger, cayenne pepper.", price: 6.95, tags: ["vegan"] },
    { name: "Simply Green", description: "Spinach, parsley, cucumber, celery.", price: 6.95, tags: ["vegan"] },
    { name: "Morning Booster", description: "Cucumber, ginger, carrot, orange.", price: 6.95, tags: ["vegan"] },
    { name: "Weightloss", description: "Grapefruit, spinach, green apple, celery.", price: 6.95, tags: ["vegan"] },
    { name: "Adrenaline", description: "Celery, spinach, carrot, green apple.", price: 6.95, tags: ["vegan"] },
    { name: "Muscle Recovery", description: "Carrot, orange, spinach, cantaloupe.", price: 6.95, tags: ["vegan"] },
    { name: "Detox", description: "Beets, cucumbers, spinach, carrot.", price: 6.95, tags: ["vegan"] },
    { name: "Revitalize", description: "Carrot, green apple, orange.", price: 6.95, tags: ["vegan"] },
    { name: "Fresh Squeezed Orange Juice or Carrot Juice", price: 6.95, tags: ["vegan"] },
  ],
};

const smoothies: MenuCategory = {
  id: "smoothies",
  name: "Smoothies",
  notes: [
    "16 oz $6.50. 20 oz +1. 24 oz +2.",
    "Boosters: Greek yogurt +1.75, whey protein +2, flax +1, chia +1, granola +1.",
  ],
  items: [
    {
      name: "Kale Yeah Baby!",
      description: "Baby kale, banana, pineapple, honey, almond milk.",
      price: 6.5,
      tags: ["vegetarian"],
    },
    {
      name: "Captain America",
      description: "Strawberry, blueberry, banana, honey, milk.",
      price: 6.5,
      tags: ["vegetarian"],
    },
    { name: "Smurf", description: "Blueberry, mango, fresh lemonade.", price: 6.5, tags: ["vegan"] },
    {
      name: "Tropical Breeze",
      description: "Mango, pineapple, honey and pineapple juice.",
      price: 6.5,
      tags: ["vegetarian"],
    },
    {
      name: "Very Berry",
      description: "Blueberry, strawberry, raspberry and apple juice.",
      price: 6.5,
      tags: ["vegan"],
    },
    {
      name: "Kindergarten",
      description: "Peanut butter, banana, honey, soy milk.",
      price: 6.5,
      tags: ["vegetarian"],
    },
    {
      name: "Mango Tango",
      description: "Mango, pineapple, strawberry and orange juice.",
      price: 6.5,
      tags: ["vegan"],
    },
    {
      name: "Green Giant",
      description: "Avocado, spinach, banana, honey, soy milk.",
      price: 6.5,
      tags: ["vegetarian"],
    },
    { name: "Peach Passion", description: "Peach, raspberry and mango juice.", price: 6.5, tags: ["vegan"] },
    {
      name: "Maui Maui",
      description: "Banana, strawberry, pineapple juice and coconut milk.",
      price: 6.5,
      tags: ["vegan"],
    },
    {
      name: "Oat of this World",
      description: "Blueberry, banana, oats, honey and soy milk.",
      price: 6.5,
      tags: ["vegetarian"],
    },
    {
      name: "Popeyes",
      description: "24 oz. Isopure protein, banana, spinach, honey, milk.",
      price: 9.5,
      tags: ["vegetarian"],
    },
    {
      name: "Mass Muscle",
      description: "24 oz. Peanut butter, banana, strawberry, Greek yogurt, isopure protein and soy milk.",
      price: 9.5,
      tags: ["vegetarian"],
    },
  ],
};

const coffeeBar: MenuCategory = {
  id: "coffee-bar",
  name: "Coffee Bar & Cold Drinks",
  items: [
    { name: "Fresh Brewed Coffee", price: 2.5 },
    { name: "Iced Coffee", price: 3.75 },
    { name: "Double Espresso", price: 2.95 },
    { name: "Americano", price: 3.5 },
    { name: "Cappuccino", price: 4.5 },
    { name: "Latte", price: 4.5 },
    { name: "Mocha", price: 4.5 },
    { name: "Hot Chocolate", price: 4 },
    { name: "Hot Tea", price: 2.5 },
    {
      name: "Cappuccino Freeze",
      description: "Vanilla ice cream, double espresso and Ghirardelli fudge.",
      price: 7.75,
    },
    { name: "Fresh Brewed Iced Tea", price: 3.75 },
    { name: "Mixed Berry Iced Tea", price: 3.75 },
    { name: "Fresh Lemonade", price: 3.75 },
    { name: "Arnold Palmer", price: 3.75 },
    { name: "Snapple", price: 3.5 },
    { name: "Canned Soda", price: 2.5 },
    { name: "Bottled Water", price: 2 },
  ],
};

const cocktails: MenuCategory = {
  id: "cocktails",
  name: "Cocktails",
  notes: ["16 oz cocktails."],
  items: [
    {
      name: "Margarita",
      description: "Frozen or on the rocks. Add a flavor +2: strawberry, mango, passion fruit, raspberry, lavender, tamarindo or pomegranate. Patron or mezcal +2.",
      price: 12,
    },
    { name: "Bulldog", price: 16 },
    { name: "Blue Hawaiian", price: 12 },
    { name: "Piña Colada", price: 12 },
    { name: "Mojito", description: "Add a flavor +2.", price: 12 },
    { name: "Tequila Sunrise", price: 12 },
    { name: "Aperol Spritz", price: 12 },
    { name: "Appletini", price: 12 },
    { name: "Bloody Mary", price: 12 },
    { name: "Cosmopolitan", price: 12 },
    { name: "Long Island Iced Tea", price: 12 },
    { name: "Sex on the Beach", price: 12 },
    { name: "Moscow Mule", price: 12 },
  ],
};

const desserts: MenuCategory = {
  id: "desserts-shakes",
  name: "Desserts & Shakes",
  items: [
    { name: "Rice Pudding", price: 5.5, tags: ["vegetarian"] },
    { name: "Chocolate Mousse", price: 5.5, tags: ["vegetarian"] },
    { name: "Reese's Peanut Butter Pie", price: 5.5, tags: ["vegetarian"] },
    { name: "Strawberry Cheesecake", price: 5.95, tags: ["vegetarian"] },
    { name: "Classic Shake", description: "Vanilla or chocolate.", price: 7, tags: ["vegetarian"] },
    { name: "P-Nut Butter Shake", price: 7.5, tags: ["vegetarian"] },
    { name: "Birthday Cake Shake", price: 7.5, tags: ["vegetarian"] },
    { name: "Oreo Shake", price: 7.5, tags: ["vegetarian"] },
  ],
};

/* ------------------------------------------------------------------ */
/* Seasonal                                                            */
/* ------------------------------------------------------------------ */

export const seasonal: MenuCategory = {
  id: "seasonal",
  name: "Seasonal and party platters",
  notes: [
    "Availability varies. Call ahead to confirm what is on this week.",
  ],
  items: [
    {
      name: "St Patrick's Day Special",
      description: "Corned beef and cabbage with boiled potatoes and vegetables.",
      price: 21.95,
    },
    {
      name: "Touchdown Tray",
      description: "Seven wings, seven mozzarella sticks and seven chicken tenders.",
      price: 37.95,
    },
    {
      name: "50 Wings",
      description: "Buffalo, spicy BBQ or teriyaki.",
      price: 75.95,
    },
    {
      name: "Party Platter",
      description: "20 wings, fries, ranch, blue cheese, carrots and celery.",
      price: 39.95,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export const menuSections: MenuSection[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    blurb: "Served all day, every day. Eggs, omelettes, stacks and sandwiches.",
    categories: [eggs, pancakes, breakfastSandwiches, breakfastBites],
  },
  {
    id: "lunch-dinner",
    name: "Lunch & Dinner",
    blurb: "Starters, salads, wraps, sandwiches, burgers, bowls and plated entrees.",
    categories: [
      starters,
      salads,
      wraps,
      signatureSandwiches,
      tastySandwiches,
      clubSandwiches,
      quesadillas,
      burgers,
      grainBowls,
      entrees,
      sides,
      soups,
    ],
  },
  {
    id: "drinks-bar",
    name: "Drinks & Bar",
    blurb: "Fresh squeezed juices, made to order smoothies, coffee, cocktails and shakes.",
    categories: [icedDrinks, juices, smoothies, coffeeBar, cocktails, desserts],
  },
];

export const allCategories: MenuCategory[] = menuSections.flatMap((s) => s.categories);

export function findItem(categoryId: string, name: string): MenuItem {
  const category = allCategories.find((c) => c.id === categoryId);
  const item = category?.items.find((i) => i.name === name);
  if (!item) {
    throw new Error(`Menu item not found: ${categoryId} / ${name}`);
  }
  return item;
}

/** Items the home page highlights, all pulled from the real menu data. */
export const featured = [
  {
    item: findItem("breakfast-sandwiches", "Slope BEC"),
    category: "Breakfast all day",
    href: "/menu#breakfast-sandwiches",
  },
  {
    item: findItem("burger-bar", "South Slope Burger"),
    category: "Burger Bar",
    href: "/menu#burger-bar",
  },
  {
    item: findItem("smoothies", "Kale Yeah Baby!"),
    category: "Smoothies",
    href: "/menu#smoothies",
  },
  {
    item: findItem("fresh-juices", "Iron Man"),
    category: "Fresh Squeezed Juices",
    href: "/menu#fresh-juices",
  },
  {
    item: findItem("cocktails", "Margarita"),
    category: "Cocktails",
    href: "/menu#cocktails",
  },
];

export const menuItemCount: number = allCategories.reduce(
  (sum, c) => sum + c.items.length,
  0,
);
