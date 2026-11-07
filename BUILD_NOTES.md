# Build notes: South Slope Restaurant & Bar

Built 2026-11-06 from the Novus base template. English only. Four routes: `/`, `/menu`, `/about`,
`/contact`, plus a branded 404, `robots.txt`, `sitemap.xml`, favicon, Apple icon and a generated Open
Graph image.

## 1. Verified facts

| Fact | Value used | Source |
| --- | --- | --- |
| Brand name on the new site | South Slope Restaurant & Bar | Assignment; Uber Eats; Restaurantji. The student decided on this name. |
| Alternate name | South Slope Eatery (mentioned once in About, in the footer, and as `alternateName` in JSON-LD) | Old Wix site, logo, awning, domain |
| Address | 486 5th Avenue, Brooklyn, NY 11215 (South Slope, Park Slope) | Old site contact page, Uber Eats, Restaurantji |
| Phone | 718-499-0005 | Old site contact page, Restaurantji, the awning in the storefront photo |
| Email | greenkitchen486@gmail.com | Old site contact page |
| Hours | Mon to Sat 9:00 AM to 9:00 PM, Sun 9:00 AM to 7:00 PM | Old site contact page and Restaurantji agree. Uber Eats shows ordering until 8:40 PM. |
| Online ordering | https://www.southslopeeatery486.com/online-ordering-1 (pickup or delivery, $10 minimum) | Old site |
| Uber Eats | https://www.ubereats.com/store/south-slope-restaurant-%26-bar/L-jzii5-Slq99zAaYMphkA | Uber Eats |
| Rating | 4.8, 1,000+ ratings, shown as "on Uber Eats" | Uber Eats (not placed in JSON-LD because it is a third party figure) |
| Reviews quoted | Candi W., July 20, 2023; Iteyana H., June 22, 2023 | Uber Eats written reviews, quoted verbatim with first name and date |
| Cuisine | American, Breakfast and Brunch, Diner, Burgers, Sandwiches | Uber Eats and Restaurantji tags |
| Breakfast hours | Not verified. The site says "breakfast, lunch and dinner from 9:00 AM" (derived from the hours) and never "all day" or "until close" | The chalkboard's "Served ALL DAY" line sits beside coffee and tea, so it is ambiguous |
| Outdoor seating | Not verified as current. Described as the photo it is ("Pictured: ...", "Ask about a table outside") and left out of metadata | Undated photo from the old Wix gallery |
| Socials | none | None found on the old site; `null` in config, no icons rendered |
| Founding date, legal name, price range | unknown | `null` in config; nothing shown |

Everything above lives in `src/lib/site.ts`. The menu lives in `src/lib/menu.ts`.

## 2. Art direction

"A 5th Avenue spot that went fresh." The restaurant's own black boards with bright green headline
type are the brand cue (see the old image menus), and the outdoor photo supplies the warmth: plywood,
wood table tops, plants and string lights under brownstones. The site runs those two moods against
each other. Cream pages with deep green type and hairline rules carry the menu and the reading; black
"board" bands with leaf green type carry the ticker, the bar section, the closing call to action and
the footer. Composition leans editorial: a left-anchored hero on the real outdoor photo, a numbered
"what people come for" list set like a menu board, a tall storefront crop beside copy, a solid green
hours and address block, a big 4.8 numeral, and a dense but well spaced two-column menu with a
sticky category bar. Friendly and generous, not corporate healthy: Fraunces with its soft, wonky
axes for display; Inter for text; restrained radii; no glass, no gradients except the hero scrim.

Palette (tokens in `tailwind.config.ts`):

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `cream` | #F6F1E6 |
| Secondary surface | `cream-deep` | #ECE4D3 |
| Dark surface (boards, footer) | `charcoal` | #1B1B19 with a faint diagonal hatch (`.board`) |
| Primary | `green-deep` | #0B5D3B (hover `green-deeper` #07432B) |
| Accent on dark | `green-leaf` | #4CC96A |
| Tag background | `green-pale` | #DDF0E2 |
| Warm accent (reserved for future photo frames, unused on cream) | `wood` | #C8924F |
| Text / muted text | `ink` / `ink-muted` | #1B1B19 / #5C5A53 |
| Rules | `line` | #D9D0BC |

Type: `@fontsource-variable/fraunces` (full axis file, used with SOFT 60 and WONK 1) for display and
prices; `@fontsource-variable/inter` for everything else. `@fontsource/fraunces` (static woff) is
installed only so the Open Graph image renderer can embed the display face.

Brand mark: the rooster weathervane logo (`public/images/logo-rooster.jpeg`, black on white, 512 px)
is used in the header with `mix-blend-multiply` so its white square disappears into the cream. For
the favicon, app icon, Open Graph image, footer and 404 a simplified SVG weathervane (double ring,
fork-tipped arrow, compass cross) drawn in brand colors stands in, because the JPEG cannot be
recolored and has no transparency. A vector logo from the owner would let the real rooster be used
everywhere.

## 3. Page architecture

- `/` Home: hero on the outdoor dining photo (left-anchored text over a bottom-left scrim, crop at
  50% 62% so tables and string lights stay in frame), chalkboard ticker, "What people come for" (five
  real items with prices from `menu.ts`: Slope BEC, South Slope Burger, Kale Yeah Baby!, Iron Man
  juice, Margarita) beside the nachos photo, "Tables on the avenue" with the storefront photo and
  four plain facts, green hours and address block with directions, call and both ordering links,
  the Uber Eats 4.8 with two attributed quotes, closing CTA band.
- `/menu`: 22 categories in three parts (Breakfast; Lunch & Dinner; Drinks & Bar), a sticky category
  jump bar under the header (one scrolling row below 1024 px, wrapped rows from 1024 px up, 44 px
  targets, active chip tracks the scroll position, the bar writes its measured height into
  `--jump-h`), category notes beside each list, vegan and vegetarian text badges, prices right aligned
  with `flex` so they survive 390 px, two-column layout for short lists, a "Seasonal and party
  platters" box at the end with an availability note, and an order CTA.
- `/about`: intro with "also known as South Slope Eatery", a wide crop of the outdoor photo, the
  kitchen's range (vegan, vegetarian, gluten free, keto friendly phrased as options, no health
  claims), outdoor seating with the storefront photo, the bar on a black band with a crop of the
  cocktail board image, the neighborhood and CTAs. No history or founding date.
- `/contact`: address and directions, phone (`tel:`), email (`mailto:`), hours table, `#order` block
  with both ordering links, and a short mailto-based message form (name, optional email, message)
  that explains it opens the visitor's mail app.
- 404, `robots.ts`, `sitemap.ts`, `icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx`.
- Redirects (308) in `next.config.ts`: `/our-menu` to `/menu`, `/online-ordering-1` to
  `/contact#order`. `/menu` and `/contact` keep their paths.

## 4. Decisions and exceptions

- Brand name: "South Slope Restaurant & Bar" everywhere; "South Slope Eatery" appears once in About
  copy, in the footer line "Also known as South Slope Eatery", and as JSON-LD `alternateName`.
- Ordering: the primary CTA ("Order Online") points at the existing Wix ordering page because it is
  the restaurant's own channel with no commission. That page will stop working the moment the old
  Wix site is cancelled. Uber Eats is the secondary link. Both are in `site.ordering`.
- Menu source of truth: the "Menus (New)" text page on the old site, captured 2026-11-06, for every
  price. The six image menus are older and were read only to catch categories and descriptions the
  text menu lacks. Image menus are not displayed, except one cropped detail of the cocktail board on
  the About page.
- Descriptions: where the text menu listed an item by name only, the description was taken from the
  older image menus (listed in section 6 so the owner can confirm). Where neither source had one, the
  item is shown with no description.
- Items that appear only on the old image menus are NOT shown (prices are stale): Kid's Corner (mini
  hamburger, hot dog, chicken tenders, grilled cheese, spaghetti, $10.95 with fries and juice), Bison
  Burger, Plain Black Angus Beef burger (the text menu's Build Your Own Burger seems to replace it),
  Protein Platter (text menu has "Two Turkey Burgers" and "Angus Beef & Grilled Chicken Combo"
  instead), Soup of the Day bowl, Breakfast Quesadilla, Veggie Breakfast Quesadilla, Protein
  Breakfast Bowl, Silver Dollar Pancakes, Whole Wheat Pancakes, Iced Cappuccino, Herbal Tea, single
  Espresso, Drip Coffee as a separate line, Scoop of Ice Cream, San Pellegrino, Chocolate Milk,
  Gatorade, Red Bull, the "make it a combo" fries and salad add-ons.
- Cocktails come from the cocktail board image only (the text menu has none). Flavor and spirit
  upcharges are from that board.
- Seasonal: the St Patrick's Day special and the Super Bowl platters sit in a separate block at the
  end of the menu with "Availability varies. Call ahead".
- Spellings normalized from the source: "Boarder" to "South of the Border", "Jambo" to "Jumbo",
  "Kindergarden" (image) kept as "Kindergarten" (text), "Terriyaki" (image) as "Teriyaki",
  "Omlette" style spellings as "Omelette". "Weightloss", "Popeyes", "Kale Yeah Baby!", "Mac 'N'
  Cheese", "Huevos Ala Mexicana", "Penne Ala Vodka" kept as the restaurant writes them.
- Anchor offset: one `scroll-padding-top` on `html` equal to the header height; on the menu page it
  grows by the jump bar height through `html:has(#menu-jump-bar)`. No per-section `scroll-margin`.
  `--jump-h` has CSS fallbacks (3.25rem, 6.5rem from 1024 px) and the bar overwrites it with its
  measured height once JavaScript runs, so the offset stays right when the chips wrap.
- Focus ring: a 3 px deep green outline with a 2 px cream inner halo on light surfaces; `.board`,
  `.bg-green-deep` and the mobile dialog swap to leaf green on charcoal. Both pass 3:1 against
  their canvas. Contact inputs keep their border color change instead.
- Mobile navigation: while the panel is open the skip link, header, main and footer carry `inert`,
  so Tab stays inside the dialog; Escape closes it and focus returns to the toggle after inert is
  removed. The toggle is labelled "Pages" (not "Menu") so it does not collide with the food menu.
- Storefront photo: the original JPEG carries a baked-in white vignette frame (about 24 px on the
  straight edges, deeper at the rounded corners). The file is untouched (byte for byte rule); the
  `<Image>` is scaled 1.07 with transform origin 56% so the frame falls outside the crop while
  "486" and the phone number on the awning stay whole. Ask the owner for a clean original.
- Cocktail board image: the source has white margins down both sides and a script title across the
  top. It is shown in a 3:2 box scaled 1.275 and positioned so the crop starts under the title and
  ends between two rows of labels; only glasses and whole labels are in frame.
- Ordering labels come from `site.ordering[].shortLabel` ("Pickup or delivery", "Uber Eats")
  wherever both channels are listed; `label` is the button text ("Order Online").
- The JS class is added by an inline script that is the first child of `<body>`, so reveals are
  hidden only when JavaScript runs; `<html>` has `suppressHydrationWarning` for that class.
- No map embed (sandbox risk); directions go to Google Maps with the address URL-encoded. A map
  embed is a post-deploy option.
- `turbopack.root` is set in `next.config.ts` because a stray `package-lock.json` in the Windows user
  folder made Next guess the wrong workspace root.
- `next` (16.1.6), `react` and `react-dom` (19.2.4) are pinned to the installed versions in
  `package.json`, and `eslint-config-next` is pinned to the same Next version, so a lockfile
  regeneration cannot jump Next a major.

## 5. Verification done

- `npm run build`, `npm run lint` (eslint .) and `npx tsc --noEmit` pass with no errors or warnings.
- `next start` checked with curl: `/`, `/menu`, `/about`, `/contact` return 200; `/our-menu` 308 to
  `/menu`; `/online-ordering-1` 308 to `/contact#order`; unknown paths 404 with the branded page;
  `robots.txt`, `sitemap.xml`, `/icon.svg`, `/apple-icon` and `/opengraph-image` return 200.
- Rendered HTML checked for per-route `<title>`, description, canonical and `og:url`; Restaurant
  JSON-LD on the home page; "Made by Novus" link in the footer; no em or en dashes and no leading
  zero times in `src` (the only "09:00" strings are the 24 hour source values and the schema.org
  `opens` field, which requires HH:MM).
- Open Graph image and Apple icon rendered and inspected as PNGs.
- Image files copied byte for byte (MD5 matched against the sources). The hero photo's EXIF
  orientation is 1 (normal), so no rotation handling is needed.
- Not done here (browser tools were off limits for this build): visual checks at 1440, 768 and 390
  px, keyboard walk of the mobile menu, reduced motion and JavaScript off checks in a real browser.
  The code follows the brief for all of them; the lead should confirm.

## 6. Menu data notes for the owner

### 6a. Items whose description came from the older image menus (confirm they are still right)

- Eggs & Omelettes: Steak & Eggs, Plain Omelette add-ons, Florentine, California, Italian, Western,
  Greek, Mexican, Alpine, Veggie, Chilaquiles Rojos and Verdes, Huevos Ala Mexicana, Huevos
  Rancheros, Eggs Benedict, Florentine Benedict, Guacamole Benedict.
- Pancakes: Big Boy Breakfast, Vanilla-Walnut French Toast.
- Breakfast Sandwiches: Feta & Spinach, Mexican Fajita Wrap, Protein Breakfast Wrap, Breakfast
  Burrito, Mexican Chorizo Wrap, Americano Breakfast Wrap.
- Breakfast Bites: Yogurt Parfait.
- Starters: none needed beyond the text menu.
- Salads: Greek, Caesar, Primavera, Kitchen Chopped, Guacamole & Chips Salad, Chicken Chipotle.
- Wraps & Bowls: Honey-Chicken, Mediterranean, Sesame Ginger, Santa Fe, Chipotle Chicken (and its
  "sub shrimp +2"), Buffalo Chicken, Crunchy Chicken, Caesar, Spicy Mango Salmon, Protein Veggie,
  California, Steak, Tofu Veggie.
- Signature Sandwiches: Chipotle Chicken BLT, The Twister, California BLT, Vegetarian Pita,
  California Tuna Melt, Chicken Club Panini, Chicken Pesto Panini, Chicken Parm Panini, Mexican
  Twist, Flamed Chicken Pesto, Italiano, Steak Panini, Avocado Toast (toppings).
- Tasty Sandwiches: all eight (the image says kaiser roll with a bread choice; the text menu says
  white toast with pickles and cole slaw; the text version is shown).
- Club Sandwiches and Quesadillas: all.
- Burger Bar: Beyond, Buttermilk Chicken Sandwich, Crispy Chicken, Backyard BBQ, Salmon Burger,
  Philly, Mexican, Grilled Chicken, Turkey Burger toppings, Fish Burger.
- Grain Bowls: all except Kalemelized (text menu has its own description).
- Entrees: Char-Grilled Chicken, Shrimp, Chicken and Eggplant Parmigiana (pasta choice), Chicken
  Marsala, Broiled Flamed Salmon, Panko Fried Jumbo Shrimp, Gyro and Souvlaki Platters, Buttermilk
  Fried Chicken Breast, Fried Chicken and Waffle Platter, Two Turkey Burgers, Angus Beef & Grilled
  Chicken Combo, Fried Fish Filet, Pasta Pomodoro.
- Smoothies: Tropical Breeze, Very Berry, Mango Tango, Peach Passion, Maui Maui, Oat of this World,
  Mass Muscle. Juices: Muscle Recovery (text menu had no description).

### 6b. Items with no description in either source

Panko Fried Shrimp, Tuna Salad Wrap, Chicken & Mushroom Panini, Shrimp Ala Mexicana over Pasta,
Chicken Fajitas, Shrimp Fajitas, Spaghetti and Meatballs, Two Eggs Any Style (sides are in the
category note), Iced Lavender, Guava and Mango Matcha Lattes, Bulldog and most cocktails.

### 6c. Unclear or odd items

- "South of the Boarder" (text) shown as South of the Border.
- "Panko Fried Jambo Shrimp" (text) shown as Jumbo.
- "Weightloss" juice: shown as written; the owner may prefer "Weight Loss".
- "Reese's Peanut Butter Pie" (text) vs "Reese's Peanut Butter Mousse" (image): text version shown.
- Smoothie boosters: text menu says flax +1, chia +1, granola +1; image says flax or chia +1.50 and
  plant protein +3. Text version shown.
- Salad add-ons: text says avocado +2.75; image says +3 and also lists tofu, tuna, fresh turkey +5 and
  rib eye +8. Text version shown.
- Wings: text lists 6 pc $11.95 and 12 pc $21.95; shown as one line with both.
- Vegan badges appear only on the items the text menu marks vegan (Guac & Chips, Home-Made
  Hummus, Quinoa Wrap, The Beyond Burger, Teriyaki Rice Bowl, Super Protein Bowl, Vegan Bowl,
  Quinoa Medley, The Natural Grain Bowl, Tofu Veggie Bowl) plus Super Vegan Quinoa Bowl, which is
  vegan by name. The Beyond Burger keeps the image menu's note that the brioche bun is not vegan or
  gluten free.
- Items that had been tagged vegan by reading the ingredients were changed in the review pass:
  downgraded to vegetarian (no meat, fish or poultry in the listed ingredients, but preparation
  unknown): Hot Oatmeal, Fresh Fruit Salad, Primavera Salad, Protein Veggie Wrap, Tofu Veggie Wrap,
  Vegetarian Pita Sandwich, Avocado Toast, French Fries, Waffle Fries, Sweet Potato Fries, Baked
  Potato, Baked Sweet Potato, Steamed Brown Rice, Organic Quinoa, Sautéed Spinach, Sautéed
  Broccoli, Steamed Mixed Veggies, Steamed Broccoli, Half Avocado, Smurf, Very Berry, Mango Tango,
  Peach Passion, Maui Maui. Tag removed (nothing to go on, or a plain produce list where a badge
  adds nothing): Seasoned Rice, Spinach Lentil soup, and all eleven fresh squeezed juices.
  Mozzarella Sticks, Mac 'N' Cheese and similar remain tagged vegetarian by their ingredients. The
  owner should confirm every tag; they are text badges and easy to change in `menu.ts`.
- 50 Wings (Super Bowl special) is listed without a description; the sources give none.
- The breakfast sandwiches category: the image says "served with home fries, choice of mixed
  greens"; the text menu has no such note, so none is shown.

### 6d. Price conflicts (older image menu price, then the text menu price used on the site)

Nearly every item is higher on the newer text menu; the text menu wins everywhere. Listed so the
owner can confirm the current prices in one pass.

- Eggs: Two Eggs 7.95 to 8.95; Steak & Eggs 18.95 to 22.95; Plain Omelette 8.50 to 10.50; Bacon, Ham or
  Sausage Omelette 11.50 to 12.75; Florentine 12.75 to 13.95; High Protein 13.50 to 14.95; California
  13.50 to 14.50; Italian 13.50 to 14.75; Western 11.95 to 12.95; Greek 12.25 to 13.95; Mexican 12.25
  to 13.50; Alpine 12.95 to 13.95; Veggie 12.50 to 13.50; Huevos Rancheros 14.50 to 15.95; Huevos Ala
  Mexicana 13.95 to 14.95; Chilaquiles 14.95 to 15.95; the three Benedicts 13.50 to 14.50.
- Pancakes: Olympic 13.95 to 14.95; Pancakes, Belgian Waffle and Challah French Toast 9.50 to 10.50;
  Vanilla-Walnut French Toast 12.75 to 13.95; Peanut Butter-Banana 12.50 to 13.50; Kid's Pancakes
  11.50 to 12.50. Big Boy 16.95 unchanged.
- Breakfast sandwiches: The Classic 11.95 to 12.95; Feta & Spinach 10.75 to 11.95; Mexican Fajita Wrap
  11.95 to 13.25; Protein Breakfast Wrap 11.50 to 12.95; Breakfast Burrito 12.50 to 13.95; Mexican
  Chorizo Wrap 12.50 to 13.95; Americano 10.95 to 12.25; Egg Sandwich 3.50 to 4.50; Bacon & Egg 5.50
  to 6.50; Avocado Toast 10.95 to 12.95 (eggs +3 to +2.50); Breakfast Bowl 12.95 to 14.50.
- Breakfast bites: Yogurt Parfait 11.25 to 11.50; Oatmeal 5.95 to 6.95; Fruit Salad 6.75 to 6.95;
  Muffin 3.75 to 3.95.
- Starters: Guac & Chips 10.95 to 11.75; Cheese Nachos 12.75 to 13.95; Wings 10.95/18.95 to
  11.95/21.95; Mac 'N' Cheese 11.95 to 13.95; Chicken Tenders 9.95 to 10.95; Mozzarella Sticks 7.95
  to 8.95; Fried-Cheese Ravioli 10.25 to 11.95; Stuffed Baked Potato 9.95 to 10.95; Touchdown 15.95
  to 16.95. Hummus, Tzatziki and Party Platter unchanged.
- Salads: South Slope 12.95 to 13.95; Kale-Quinoa 13.50 to 14.50; Greek 13.25 to 13.75; Caesar 11.25
  to 11.95; Primavera 12.50 to 12.95; Kitchen Chopped 12.95 to 13.95; Salmon 17.95 to 18.95; Guac &
  Chips Salad 13.95 to 14.50; Chicken Chipotle 14.95 to 15.95. Cobb unchanged.
- Wraps: South Slope 12.75 to 13.25; Honey-Chicken 12.25 to 12.95; Quinoa 11.95 to 12.75;
  Mediterranean 12.75 to 13.25; Sesame Ginger 12.95 to 13.25; Buffalo Chicken 12.50 to 12.95; Santa Fe
  12.95 to 13.50; Tropical Salmon 13.95 to 14.50; Crunchy Chicken 12.50 to 12.95; Caesar 11.25 to
  11.95; Spicy Mango Salmon 13.95 to 14.50; TBLT 12.95 to 13.25; Protein Veggie 11.50 to 12.75;
  California 12.95 to 13.25; Bison Protein 13.75 to 14.25; Kitchen Burrito 13.95 to 14.50; Steak Wrap
  13.95 to 14.50. Chipotle Chicken and Tofu Veggie unchanged.
- Signature sandwiches: Chipotle Chicken BLT 12.75 to 13.50; Park Slope 12.95 to 13.50; California
  BLT 10.95 to 11.25; Vegetarian Pita 11.25 to 11.95; California Tuna Melt 11.95 to 12.95; Philly
  Cheesesteak 14.50 to 14.95; Chicken Club Panini 12.95 to 13.50; Chicken Pesto Panini 12.95 to 13.50;
  Chicken Parm Panini 13.95 to 14.95; Italiano 12.95 to 13.50; Flamed Chicken Pesto 13.95 to 14.50; El
  Cubano 13.95 to 14.95; Steak Panini 13.50 to 14.50. Twister, Mexican Twist and Chicken & Waffle
  unchanged.
- Tasty sandwiches: Tuna Salad 8.75 to 9.50; Individual Tuna 8.95 to 9.50; B.L.T. 7.95 to 8.50; Fresh
  Roast Turkey 9.95 to 10.95; Egg Salad 7.95 to 8.50; Grilled Cheese 6.75 to 7.25. Gyro and Souvlaki
  unchanged.
- Club sandwiches: Turkey and Chicken 15.95 to 16.95; Tuna 14.95 to 15.95. Egg Salad unchanged.
- Quesadillas: Chicken Chipotle and Flaming 13.75 to 14.50; Mexican 13.75 to 14.25; Steak 13.95 to
  14.75. Veggie, Cowboy, Chicken & Spinach, Chicken and Cheese unchanged.
- Burgers: South Slope 10.75 to 11.75; Crispy Chicken 9.95 to 10.95; Hangover 13.95 to 14.50; Philly
  12.50 to 12.95; Fish 13.50 to 13.95; Grilled Chicken 9.95 to 10.95; Beyond 12.75 to 13.75; Mexican
  11.95 to 12.95; Buttermilk Chicken Sandwich 12.75 to 13.25; Turkey 9.95 to 10.95; Cheeseburger
  Deluxe 13.95 to 14.95; Plain Angus 9.50 (image) vs Build Your Own 10.50 (text). Salmon and Backyard
  BBQ unchanged.
- Grain bowls: Teriyaki 12.95 to 14.95; Baja 13.50 to 15.95; Super Protein 13.25 to 14.95; Vegan 13.75
  to 14.95; Quinoa Medley 13.95 to 14.95; Super Vegan Quinoa 13.75 to 14.95; Natural Grain 13.75 to
  13.95; Chipotle Grain 13.75 to 15.95; Kalemelized 13.75 to 14.75; Tropical Salmon and Greek Chicken
  17.95 to 18.95. Nutri Army and Tofu Veggie unchanged.
- Entrees: Rib Eye 25.75 to 27.95; South of the Border 20.95 to 22.95; Penne Vodka 13.95 to 15.95;
  Char-Grilled Chicken 17.95 to 19.95; Shrimp Parmigiana 20.75 to 22.95; Pan-Seared Salmon 23.95 to
  26.95; Chicken Marsala 22.95 to 23.95; Chicken and Eggplant Parmigiana 17.95 to 18.95; Broiled
  Salmon with Pesto 24.95 to 26.95; Panko Jumbo Shrimp 20.95 to 21.95; Gyro and Souvlaki Platters
  17.95 to 19.95; Fried Chicken and Waffle 18.25 to 19.95; Fried Fish 19.95 to 22.95; Pasta Pomodoro
  13.95 to 14.95; Protein Platter 18.95 to 19.95 (now two separate items); Buttermilk Fried Chicken
  17.95 to 19.95; Spaghetti and Meatballs 17.95 to 18.95.
- Sides: French Fries 5 to 6; Cheese Fries 7 to 8; Parmesan-Truffle Fries 7.50 to 8; Steamed
  Broccoli and Mixed Veggies 6 to 6.50; Sautéed Broccoli or Spinach 7 to 7.50. Others unchanged.
- Drinks: Drip Coffee 2.75 (image) vs Fresh Brewed Coffee 2.50 (text); single Espresso 2.75 (image)
  vs Double Espresso 2.95 (text); Fresh Fruit Salad as a dessert 6.75 vs 6.95. Smoothie and juice
  size pricing, milkshakes, desserts, iced teas, lemonade, soda, Snapple and water agree.

## 7. Open items for the client

1. Confirm the brand name: "South Slope Restaurant & Bar" on the new site, with "South Slope Eatery"
   as the also-known-as. If the owner prefers Eatery, change `site.name` and `site.alternateName`.
2. Ordering platform decision. The "Order Online" button points at the Wix ordering page
   (southslopeeatery486.com/online-ordering-1). If the Wix site is taken down, that link dies the same
   day. Options: keep Wix for ordering only, move to a commission-free platform, or make Uber Eats
   the primary. Update `site.ordering` once decided.
3. Confirm every price in section 6d and the items dropped in section 4 (especially Kid's Corner,
   which is worth having on the site if it still exists, and the cold beverages).
4. Confirm the descriptions in 6a and add descriptions for the items in 6b.
5. Confirm the vegan and vegetarian tags (6c) and whether gluten free and keto friendly options
   should be marked per item.
6. Confirm hours (Mon to Sat 9:00 AM to 9:00 PM, Sun 9:00 AM to 7:00 PM) and whether holiday hours
   or a kitchen closing time should be shown.
7. Confirm that greenkitchen486@gmail.com is still the right contact address. It is used for the
   `mailto:` link and the contact form.
8. More photos: interior, the bar, food (burgers, bowls, juices and smoothies), the team. Only three
   photos and the logo were available. Slots that would use them: the home hero (alternates), the
   "what people come for" list, the About bar section, the Contact page.
9. A vector or transparent logo file, so the real rooster can replace the simplified weathervane in
   the favicon, app icon and Open Graph image.
10. Social profiles: none were found. Add Instagram or Facebook URLs to `site.socials` if they exist.
11. Production URL: set `NEXT_PUBLIC_SITE_URL` on Vercel. Until then canonical and Open Graph URLs
    read `https://example.com`.
12. When the domain moves, point southslopeeatery486.com (or whatever domain is kept) at the new
    site; the 308 redirects for `/our-menu` and `/online-ordering-1` are already in place.
13. Optional post-deploy: a Google Maps embed on the Contact page, and a reservations or catering
    line if the restaurant offers either.
14. Is breakfast served all day, or until close? The old chalkboard is ambiguous, so the site only
    says "breakfast, lunch and dinner from 9:00 AM". If the owner confirms all day breakfast, the
    copy in `site.ts` (tagline, description), the home hero and facts, the menu intro, the footer
    and the Open Graph image can say so again.
15. Does the outdoor setup in the photo still operate, and in which months? The site describes the
    photo and says "ask about a table outside"; confirm before promising outdoor seating anywhere.
16. Confirm the vegan badges on the eleven items that carry them (section 6c), and whether any of
    the items downgraded to vegetarian or untagged (oatmeal, avocado toast, fries, vegetable sides,
    the fruit smoothies, the juices, Spinach Lentil soup) are in fact prepared vegan.
17. A clean original of the storefront photo without the white vignette frame. The current file is
    shown with a CSS crop that hides the frame; a frameless original would let the whole facade
    show.

## 8. Review fixes (2026-11-06)

A reviewer checked the site against AGENTS.md after the first build. What changed:

- Content: every "breakfast all day" / "until close" line became "breakfast, lunch and dinner from
  9:00 AM" (time derived from `openingTime()` in `site.ts`); outdoor seating is described as the
  photo and dropped from metadata and the ticker; vegan badges reduced to the sourced set (6c);
  the invented 50 Wings description removed; "269 things on the menu, all made to order" no longer
  claims canned drinks are made to order; "Inside, the black awning" corrected to "Above the door";
  the Eatery name is described as current ("The awning still reads South Slope Eatery").
- Accessibility: two tone focus ring (3:1 on cream, white and the dark boards); the mobile dialog
  makes the rest of the page inert while open; the navigation toggle reads "Pages"; diet badges
  are 12 px; the seasonal block's items are h3 under its h2; the featured list counts 1 to 5 with
  the number hidden from screen readers (the `<ol>` already numbers it); the contact form posts
  to `mailto:` without JavaScript and native validation is back.
- Layout: hours cells never wrap; the footer is two columns at 768 px and twelve at 1024 px;
  ordering cards stack until 1024 px; the Find us address steps down at 768 px; the menu category
  bar wraps from 1024 px with a measured height (one scrolling row on phones and tablets); the ticker is one scrolling line on phones with
  no trailing bullet; the storefront and cocktail board crops are described in section 4.
- Code: `fontSize.body` and `fontSize.eyebrow` / `letterSpacing.eyebrow` tokens replace
  `text-[0.95rem]` and the five tracking variants; one `Eyebrow` component renders every section
  label; `ButtonLink` renders `tel:` and `mailto:` links as plain anchors so the Call buttons
  reuse it; ordering labels come from `shortLabel` in the config; dependencies are pinned.
- Skipped on purpose: re-encoding or resizing any image (byte for byte rule), the hero eyebrow
  treatment, the Contact page column balance, unifying h1 scales, moving the remaining facts
  (the $10 minimum, the Uber Eats name) into the config, tokenizing the last few hex values, and
  the brand string cleanup. They are nice-to-haves for a later pass.
