const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9.5" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v8"></path><path d="M8 3v8"></path><path d="M4 7h4"></path><path d="M6 11v10"></path><path d="M19 3v18"></path><path d="M15 3v5a4 4 0 0 0 4 4"></path></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 13H5L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .3 2-.8 3-2 3-2 0-3-2-2-5-3 2-6 5-6 9 0 4 3 7 7 7Z"></path></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 20 7-13 5 8 2-3 4 8H3Z"></path><path d="m10 7 2.5 4"></path></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.5 6.8-4"></path><path d="m8.6 13.5 6.8 4"></path></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"></path></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path></svg>',
  "arrow-right": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 4.2 2.7 17.4A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.6L13.7 4.2a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
  grill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14"></path><path d="M7 8a5 5 0 0 0 10 0"></path><path d="M12 13v8"></path><path d="m8 21 4-8 4 8"></path><path d="M8 4c0 1 1 1 1 2"></path><path d="M12 3c0 1 1 1 1 2"></path><path d="M16 4c0 1 1 1 1 2"></path></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="m16.5 3.5 4 4L7 21H3v-4z"></path></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.9 4.9 1.4 1.4"></path><path d="m17.7 17.7 1.4 1.4"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.9 19.1 1.4-1.4"></path><path d="m17.7 6.3 1.4-1.4"></path></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"></path></svg>',
  dessert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14l-2 8H7l-2-8Z"></path><path d="M7 12c0-3 2-5 5-5s5 2 5 5"></path><path d="M12 7V3"></path><path d="M9 4h6"></path></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>'
};

const SUPPLY_AI_IMAGE_MAX_LENGTH = 4500000;
const HEIC_CONVERTER_SRC = "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";

const families = [
  { id: "shell", name: "Shell", shortName: "Shell", color: "#c0392b", status: "Needs timing", details: "Michelle / Shell · arrives Wednesday" },
  { id: "nick", name: "G6", shortName: "G6", color: "#6d4aa7", status: "Needs timing", details: "Nick, Marissa, Luca, Sophia, Rocco, Gio" },
  { id: "bear", name: "Jear", shortName: "Jear", color: "#2f8f4e", status: "Needs timing", details: "Bear and Jessica" },
  { id: "nat", name: "Riggs", shortName: "Riggs", color: "#0f766e", status: "Needs timing", details: "Andy, Natalie, Oli, Viv" }
];

const attendees = [
  { id: "shell", name: "Shell", firstName: "Shell", familyId: "shell", note: "Michelle" },
  { id: "nick", name: "Nick", firstName: "Nick", familyId: "nick", note: "G6" },
  { id: "marissa", name: "Marissa", firstName: "Marissa", familyId: "nick", note: "G6" },
  { id: "bear", name: "Bear", firstName: "Bear", familyId: "bear", note: "Jear" },
  { id: "jessica", name: "Jessica", firstName: "Jessica", familyId: "bear", note: "Jear" },
  { id: "andy", name: "Andy", firstName: "Andy", familyId: "nat", note: "Riggs" },
  { id: "natalie", name: "Natalie", firstName: "Natalie", familyId: "nat", note: "Riggs" }
];

const defaultMeals = [
  { id: "fri-breakfast", day: "fri", dayLabel: "Fri Jul 3", type: "Breakfast", time: "7:00 - 10:00 AM", owner: "", idea: "Eggs, bacon, sausage", kids: "Pancakes, fruit", cold: ["eggs", "bacon", "milk"] },
  { id: "fri-lunch", day: "fri", dayLabel: "Fri Jul 3", type: "Lunch", time: "12:00 - 2:00 PM", owner: "", idea: "Sandwiches or pasta salad", kids: "PB&J, fruit", cold: ["lunch meat", "cheese"] },
  { id: "fri-dinner", day: "fri", dayLabel: "Fri Jul 3", type: "Dinner", time: "6:00 - 8:30 PM", owner: "nat", idea: "Pizza and tacos", kids: "Pizza and tacos", cold: ["pizza", "taco fillings"] },
  { id: "fri-dessert", day: "fri", dayLabel: "Fri Jul 3", type: "Dessert / Snacks", time: "After dinner", owner: "", idea: "Oli cake and s’mores", kids: "Cake and s’mores", cold: [] },
  { id: "sat-breakfast", day: "sat", dayLabel: "Sat Jul 4", type: "Breakfast", time: "7:00 - 10:00 AM", owner: "", idea: "Cinnamon rolls, eggs, bacon, and toast", kids: "Cinnamon rolls and fruit", cold: ["eggs", "bacon", "milk"] },
  { id: "sat-lunch", day: "sat", dayLabel: "Sat Jul 4", type: "Lunch", time: "12:00 - 2:00 PM", owner: "", idea: "Parade, lunch out, and snacking", kids: "Snacks and fruit", cold: ["fruit"] },
  { id: "sat-dinner", day: "sat", dayLabel: "Sat Jul 4", type: "Dinner", time: "6:00 - 8:30 PM", owner: "", idea: "Hamburgers", kids: "Hamburgers and fruit", cold: ["burgers", "cheese"] },
  { id: "sat-dessert", day: "sat", dayLabel: "Sat Jul 4", type: "Dessert / Snacks", time: "After dinner", owner: "", idea: "Ice cream or s’mores", kids: "Rice crispy treats", cold: ["ice cream"] },
  { id: "sun-breakfast", day: "sun", dayLabel: "Sun Jul 5", type: "Breakfast", time: "7:00 - 10:00 AM", owner: "", idea: "Eggs, bacon, waffles or muffins, and toast", kids: "Waffles and fruit", cold: ["milk", "eggs", "bacon"] },
  { id: "sun-lunch", day: "sun", dayLabel: "Sun Jul 5", type: "Lunch", time: "12:00 - 2:00 PM", owner: "", idea: "Hot dogs and nachos", kids: "Hot dogs and chips", cold: ["hot dogs", "cheese"] },
  { id: "sun-dinner", day: "sun", dayLabel: "Sun Jul 5", type: "Dinner", time: "6:00 - 8:30 PM", owner: "", idea: "Mussels, steak, potatoes, and cake", kids: "Butter pasta and fruit", cold: ["steaks", "butter"] },
  { id: "sun-dessert", day: "sun", dayLabel: "Sun Jul 5", type: "Dessert / Snacks", time: "After dinner", owner: "", idea: "Finish sweets", kids: "Fruit, treats", cold: [] },
  { id: "mon-breakfast", day: "mon", dayLabel: "Mon Jul 6", type: "Breakfast", time: "Pack-up morning", owner: "", idea: "Coffee, pastries, leftovers", kids: "Cereal, fruit", cold: ["milk"] },
  { id: "mon-cleanup", day: "mon", dayLabel: "Mon Jul 6", type: "Pack-up", time: "Before checkout", owner: "", idea: "Fridge clear-out and trash", kids: "Road snacks", cold: [] }
];

const defaultSupplies = [
  { id: "plates", name: "Paper plates", notes: "Marissa already bought plenty.", type: "table", owner: "nick", mealType: "any", days: ["wed", "thu", "fri", "sat", "sun", "mon"] },
  { id: "napkins", name: "Napkins", notes: "Marissa already bought plenty.", type: "table", owner: "nick", mealType: "any", days: ["wed", "thu", "fri", "sat", "sun", "mon"] },
  { id: "paper-towels", name: "Paper towels", notes: "Jer is covering paper towels.", type: "table", owner: "bear", mealType: "any", days: ["wed", "thu", "fri", "sat", "sun", "mon"] },
  { id: "sparkling-ice", name: "Sparkling Ice drinks", notes: "Marissa photo-confirmed drinks.", type: "drink", owner: "nick", mealType: "any", days: ["fri", "sat", "sun"] },
  { id: "orange-juice", name: "Orange juice", notes: "Breakfast drink.", type: "drink", owner: "nick", mealType: "breakfast", days: ["fri", "sat", "sun"] },
  { id: "milk", name: "Milk", notes: "G6 has milk for breakfast.", type: "drink", owner: "nick", mealType: "breakfast", days: ["sat", "sun"] },
  { id: "smores", name: "S'mores ingredients", notes: "G6 has marshmallows, grahams, and chocolate.", type: "food", owner: "nick", mealType: "dessert", days: ["fri", "sat"] },
  { id: "chips-nachos", name: "Chips for nachos", notes: "G6 already grabbed a large bag.", type: "food", owner: "nick", mealType: "lunch", days: ["sun"] },
  { id: "bacon", name: "Bacon", notes: "Double pack.", type: "food", owner: "nick", mealType: "breakfast", days: ["sat", "sun"] },
  { id: "eggs", name: "Eggs", notes: "Jear shared eggs.", type: "food", owner: "bear", mealType: "breakfast", days: ["fri", "sat", "sun"] },
  { id: "cinnamon-rolls", name: "Cinnamon rolls", notes: "Jer has Saturday breakfast cinnamon rolls.", type: "food", owner: "bear", mealType: "breakfast", days: ["sat"] },
  { id: "toast-bread", name: "Toast bread", notes: "Jer is covering toast for breakfast.", type: "food", owner: "bear", mealType: "breakfast", days: ["sat", "sun"] },
  { id: "waffles-muffins", name: "Waffles or muffins", notes: "Jer is covering Sunday breakfast waffles or muffins.", type: "food", owner: "bear", mealType: "breakfast", days: ["sun"] },
  { id: "butter", name: "Butter", notes: "Jer has butter covered.", type: "food", owner: "bear", mealType: "breakfast", days: ["sat", "sun"] },
  { id: "steaks", name: "Steaks", notes: "Jear is covering the Sunday steak dinner.", type: "food", owner: "bear", mealType: "dinner", days: ["sun"] },
  { id: "other-meats", name: "Other meats", notes: "Jear may bring extra meat for another dinner.", type: "food", owner: "bear", mealType: "dinner", days: ["sun"] },
  { id: "hot-dogs-buns", name: "Hot dogs and buns", notes: "Jer is covering the Sunday hot dogs.", type: "food", owner: "bear", mealType: "lunch", days: ["sun"] },
  { id: "pizza", name: "Pizza", notes: "Nova is bringing Friday pizza for dinner.", type: "food", owner: "nat", mealType: "dinner", days: ["fri"] },
  { id: "tacos", name: "Tacos", notes: "Nova is bringing Friday tacos for dinner.", type: "food", owner: "nat", mealType: "dinner", days: ["fri"] },
  { id: "oli-cake", name: "Oli cake", notes: "Nova is bringing Oli cake Friday night.", type: "food", owner: "nat", mealType: "dessert", days: ["fri"] },
  { id: "blackstone-two-burner", name: "Two-burner Blackstone", notes: "Bear can bring the smaller Blackstone.", type: "gear", owner: "bear", mealType: "any", days: ["fri", "sat", "sun"] },
  { id: "cranium", name: "Cranium", notes: "Board game from Jear.", type: "gear", owner: "bear", mealType: "any", days: ["fri", "sat", "sun"] },
  { id: "charades", name: "Charades", notes: "Riggs wants to bring charades.", type: "gear", owner: "nat", mealType: "any", days: ["fri", "sat", "sun"] }
];

const guideHighlights = [
  {
    label: "Closest public swim",
    value: "White Pines Lake",
    detail: "Beaches, picnic tables, playground, disc golf, and non-motorized water play near Arnold."
  },
  {
    label: "Best mountain swim",
    value: "Lake Alpine",
    detail: "Higher-elevation reservoir with swimming, boating, hiking, fishing, picnic areas, and day-use facilities."
  },
  {
    label: "Closest overlook hike",
    value: "Arnold Rim Trail - Valley View",
    detail: "Shortest trail access toward Cougar Rock and Top of the World; dirt road access can be rough."
  },
  {
    label: "Closest clubhouse",
    value: "Sequoia Woods",
    detail: "Private 18-hole golf course; clubhouse food and drinks are nearby, pool is members only."
  }
];

const cabinThingsToDo = [
  {
    id: "arnold-parade",
    category: "Holiday weekend",
    name: "Arnold Independence Day Parade",
    when: "Saturday July 4 · 10:00 AM",
    note: "Small-town Fourth of July parade through Arnold and the best family-specific holiday event nearby.",
    websiteUrl: "https://www.gocalaveras.com/business/festivals-events/arnold-independence-day-parade/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Arnold+Independence+Day+Parade+Arnold+CA",
    icon: "sun"
  },
  {
    id: "arts-crafts",
    category: "Holiday weekend",
    name: "Sierra Nevada Arts & Crafts Festival",
    when: "Saturday July 4 · 10:00 AM - 5:00 PM · Sunday July 5 · 10:00 AM - 4:00 PM",
    note: "Holiday weekend arts-and-crafts event in Arnold if you want an easy family stop between meals and cabin time.",
    websiteUrl: "https://www.gocalaveras.com/events/54th-annual-sierra-nevada-arts-crafts-festival/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sierra+Nevada+Arts+and+Crafts+Festival+Arnold+CA",
    icon: "bag"
  },
  {
    id: "white-pines-lake-trip",
    category: "Water",
    name: "White Pines Lake",
    when: "Best in daytime · check lake and parking conditions",
    note: "Closest easy lake option for beach time, picnics, paddling, and kid-friendly downtime.",
    websiteUrl: "https://www.gocalaveras.com/business/outdoor-recreation/white-pines-lake/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=White+Pines+Lake+Arnold+CA",
    icon: "mountain"
  },
  {
    id: "big-trees-trip",
    category: "Nature",
    name: "Calaveras Big Trees State Park",
    when: "Daily day-use park hours · easiest as a morning or early afternoon stop",
    note: "Best all-ages redwood-style outing nearby with shaded walks, giant trees, and easy sightseeing.",
    websiteUrl: "https://www.parks.ca.gov/?page_id=551",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Calaveras+Big+Trees+State+Park",
    icon: "mountain"
  },
  {
    id: "arnold-rim-trail-trip",
    category: "Nature",
    name: "Arnold Rim Trail",
    when: "Open in daylight · best in the morning or evening",
    note: "Best nearby trail system for scenic walks, overlook stops, and a more active family outing.",
    websiteUrl: "https://arnoldrimtrail.org/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Arnold+Rim+Trail+Arnold+CA",
    icon: "mountain"
  },
  {
    id: "logging-museum-trip",
    category: "Nature",
    name: "Sierra Nevada Logging Museum",
    when: "Check current museum hours before going",
    note: "Quick history stop that pairs well with White Pines Lake or the easier Arnold Rim Trail access.",
    websiteUrl: "https://www.gocalaveras.com/business/attractions/sierra-nevada-logging-museum/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sierra+Nevada+Logging+Museum+Arnold+CA",
    icon: "bag"
  },
  {
    id: "sequoia-woods-trip",
    category: "Food and golf",
    name: "Sequoia Woods Country Club",
    when: "Check current dining, tee time, and guest-access hours",
    note: "Closest golf and clubhouse option near the cabin if you want a low-drive adult outing or nearby meal stop.",
    websiteUrl: "https://www.sequoiawoods.com/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sequoia+Woods+Country+Club+Arnold+CA",
    icon: "grill"
  },
  {
    id: "lake-alpine-trip",
    category: "Scenic day trip",
    name: "Lake Alpine",
    when: "Daylight outing · better as an early leave-and-return trip",
    note: "Higher-elevation lake day with cooler weather, mountain scenery, and a longer drive that feels like a real outing.",
    websiteUrl: "https://www.gocalaveras.com/business/lakes-rivers/lake-alpine-recreation-area/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Alpine+California",
    icon: "mountain"
  },
  {
    id: "bear-valley-trip",
    category: "Scenic day trip",
    name: "Bear Valley Mountain",
    when: "Check current summer activity and event hours",
    note: "Mountain base area with summer events and activities if you want to pair it with Lake Alpine or a scenic drive.",
    websiteUrl: "https://www.bearvalley.com/events-activities",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bear+Valley+Mountain+Resort+CA",
    icon: "mountain"
  },
  {
    id: "moaning-caverns-trip",
    category: "Adventure",
    name: "Moaning Caverns Adventure Park",
    when: "Guided tours daily · last tour is usually around 4:00 PM",
    note: "Good family detour for cave tours, zip lines, and something different from lake and trail time.",
    websiteUrl: "https://moaningcaverns.com/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Moaning+Caverns+Adventure+Park",
    icon: "flame"
  },
  {
    id: "mercer-caverns-trip",
    category: "Adventure",
    name: "Mercer Caverns",
    when: "Guided tours daily · check current departure times",
    note: "Classic cave stop if the group wants a guided underground outing instead of more water or hiking.",
    websiteUrl: "https://mercercaverns.com/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mercer+Caverns+Murphys+CA",
    icon: "flame"
  },
  {
    id: "california-cavern-trip",
    category: "Adventure",
    name: "California Cavern",
    when: "Guided tours daily · last tour is usually around 4:00 PM",
    note: "Another cave option in the county if you want a bigger outing beyond Arnold itself.",
    websiteUrl: "https://www.gocalaveras.com/business/caves/california-cavern/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=California+Cavern+Mountain+Ranch+CA",
    icon: "flame"
  }
];

const shellChecklist = [
  { id: "shell-door-code", label: "Door code" },
  { id: "shell-wifi", label: "Wi-Fi name and password" },
  { id: "shell-fridge", label: "Fridge and freezer space" },
  { id: "shell-grill-type", label: "Cabin grill type confirmed (assume propane until checked)" },
  { id: "shell-pizza-oven", label: "Ask Nicholas about bringing the pizza oven" },
  { id: "shell-sequoia-access", label: "Sequoia Woods pool / golf guest access" },
  { id: "shell-checkout", label: "Checkout time Monday" },
  { id: "shell-trash", label: "Trash and recycling instructions" }
];

const gearChecklist = [
  { id: "gear-pizza-oven", label: "Ask Nicholas whether he wants the pizza oven" },
  { id: "gear-blackstone", label: "Bear/Jessica two-burner Blackstone packed" },
  { id: "gear-grill-type", label: "Cabin grill type confirmed" },
  { id: "gear-propane", label: "Propane and lighter packed" },
  { id: "gear-seasonings", label: "Steak seasonings packed" },
  { id: "gear-board-games", label: "Board games: Cranium and Riggs charades" }
];

const nearbyFoodSpots = [
  {
    id: "sarafinas",
    category: "Sit-down dinner",
    name: "Sarafina's Italian Kitchen",
    drive: "~10 min",
    verdict: "Worth it if you want the nicest close sit-down dinner.",
    note: "Good fallback when the group wants one solid dinner out instead of another cabin meal.",
    websiteUrl: "https://sarafinasitaliankitchen.com/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sarafina%27s+Italian+Kitchen+Arnold+CA",
    icon: "utensils"
  },
  {
    id: "snowshoe",
    category: "Burgers and beer",
    name: "Snowshoe Brewing Co Restaurant",
    drive: "~8 min",
    verdict: "Worth it for an easy casual dinner with a big menu.",
    note: "Strong backup when adults want beer and the group needs something easy for mixed appetites.",
    websiteUrl: "https://www.gocalaveras.com/business/restaurants/snowshoe-brewing-co-restaurant/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Snowshoe+Brewing+Co+Restaurant+Arnold+CA",
    icon: "utensils"
  },
  {
    id: "el-vaquero",
    category: "Mexican",
    name: "El Vaquero",
    drive: "~8 min",
    verdict: "Worth it if you want quick, no-fuss Mexican food close by.",
    note: "Good for a simple group meal when no one wants a bigger outing.",
    websiteUrl: "https://www.gocalaveras.com/business/restaurants/el-vaquero/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=El+Vaquero+Arnold+CA",
    icon: "utensils"
  },
  {
    id: "big-trees-market-deli",
    category: "Quick deli and backup groceries",
    name: "Big Trees Market & Deli",
    drive: "~8 min",
    verdict: "Worth it for sandwiches, deli food, and forgotten grocery runs.",
    note: "Best practical stop when you need a fast meal plus cabin backup supplies in one run.",
    websiteUrl: "https://www.gocalaveras.com/business/food-drink/big-trees-market-deli/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Big+Trees+Market+%26+Deli+Arnold+CA",
    icon: "bag"
  },
  {
    id: "sequoia-woods-restaurant",
    category: "Nearby adult meal",
    name: "Sequoia Woods Country Club Restaurant",
    drive: "~6 min",
    verdict: "Worth it for a close adult meal or drinks without much driving.",
    note: "Easy nearby option when you want to get out of the cabin but stay close.",
    websiteUrl: "https://www.gocalaveras.com/business/food-drink/sequoia-woods-country-club-restaurant/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sequoia+Woods+Country+Club+Restaurant+Arnold+CA",
    icon: "grill"
  }
];

const nearbyOutings = [
  {
    id: "arnold-parade",
    category: "Holiday weekend",
    name: "Arnold Independence Day Parade",
    drive: "~5-10 min",
    when: "Saturday July 4 · 10:00 AM",
    verdict: "Worth it if you want the main small-town Fourth of July moment. Go early.",
    note: "This is the cleanest holiday-specific outing nearby and easy to pair with lunch back at the cabin.",
    websiteUrl: "https://www.gocalaveras.com/business/festivals-events/arnold-independence-day-parade/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Arnold+Independence+Day+Parade+Arnold+CA",
    icon: "sun"
  },
  {
    id: "arts-crafts",
    category: "Holiday weekend",
    name: "Sierra Nevada Arts & Crafts Festival",
    drive: "~5-10 min",
    when: "Saturday and Sunday daytime",
    verdict: "Worth it if you want easy browsing and a low-effort outing. Skip it if everyone just wants lake time.",
    note: "Simple in-town option when the group wants to get out without committing to a longer drive.",
    websiteUrl: "https://www.gocalaveras.com/events/54th-annual-sierra-nevada-arts-crafts-festival/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sierra+Nevada+Arts+and+Crafts+Festival+Arnold+CA",
    icon: "bag"
  },
  {
    id: "white-pines-lake",
    category: "Water",
    name: "White Pines Lake",
    drive: "~10 min",
    when: "Best in daylight",
    verdict: "Worth it: this is the easiest close family lake option.",
    note: "Best pick when you want beach time, picnic space, and a nearby outing that is not a big production.",
    websiteUrl: "https://www.gocalaveras.com/business/outdoor-recreation/white-pines-lake/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=White+Pines+Lake+Arnold+CA",
    icon: "mountain"
  },
  {
    id: "arnold-rim-trail",
    category: "Nature",
    name: "Arnold Rim Trail",
    drive: "~10 min",
    when: "Best in the morning or evening",
    verdict: "Worth it if the group wants a real walk with views.",
    note: "Good close outing for fresh air and movement without turning the day into a full drive.",
    websiteUrl: "https://arnoldrimtrail.org/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Arnold+Rim+Trail+Arnold+CA",
    icon: "mountain"
  },
  {
    id: "logging-museum",
    category: "Quick stop",
    name: "Sierra Nevada Logging Museum",
    drive: "~10 min",
    when: "Check current museum hours",
    verdict: "Worth it only as a short add-on stop, not the whole day.",
    note: "Best paired with White Pines Lake or the easier Arnold Rim Trail access nearby.",
    websiteUrl: "https://sierraloggingmuseum.org/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sierra+Nevada+Logging+Museum+Arnold+CA",
    icon: "bag"
  },
  {
    id: "big-trees",
    category: "Nature",
    name: "Calaveras Big Trees State Park",
    drive: "~15 min",
    when: "Best in the morning or early afternoon",
    verdict: "Worth it if you want the strongest all-ages outing close enough to feel easy.",
    note: "Probably the best close scenic outing when you want something memorable but still practical from the cabin.",
    websiteUrl: "https://www.parks.ca.gov/?page_id=551",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Calaveras+Big+Trees+State+Park",
    icon: "mountain"
  }
];

const activities = [
  {
    id: "white-pines-lake",
    category: "Swimming",
    rank: "Closest public swim",
    name: "White Pines Lake",
    notes: "Small Arnold lake with beaches, picnic tables, playground, disc golf, fishing, kayaking, paddleboarding, and no-motor boating.",
    bestFor: "Kids, quick water time, picnic setup, paddleboards, casual fishing.",
    access: "Public park near Arnold. No camping at the lake.",
    tags: ["closest swim", "kid-friendly", "beach", "picnic"],
    votes: 5,
    icon: "lake"
  },
  {
    id: "lake-alpine",
    category: "Swimming",
    rank: "Best mountain lake",
    name: "Lake Alpine Recreation Area",
    notes: "Scenic 7,300-foot reservoir near Bear Valley with swimming, boating, hiking, camping, fishing, picnicking, biking, and ranger programs.",
    bestFor: "Bigger lake day, cooler air, scenery, non-motorized water time, mixed ages.",
    access: "Forest Service day use; check road, fee, and weather conditions before heading up.",
    tags: ["best swim", "scenic", "cooler", "longer drive"],
    votes: 2,
    icon: "lake"
  },
  {
    id: "sequoia-woods-pool",
    category: "Swimming",
    rank: "Closest pool if access applies",
    name: "Sequoia Woods Pool",
    notes: "Country club pool is close to the house but listed as members only.",
    bestFor: "A pool option only if the host/rental arrangement includes guest privileges.",
    access: "Verify access before promising this to kids.",
    tags: ["closest pool", "access dependent", "verify first"],
    votes: 0,
    icon: "lake"
  },
  {
    id: "arnold-rim-valley-view",
    category: "Hikes",
    rank: "Closest overlook hike",
    name: "Arnold Rim Trail - Valley View / Top of the World",
    notes: "Valley View access is the shortest route toward Cougar Rock and Top of the World.",
    bestFor: "Views, older kids, active adults, morning or evening hiking.",
    access: "Dirt road access can be slick, rutted, or poor for low-clearance cars; no potable water at the trailhead.",
    tags: ["closest hike", "views", "overlook", "rough road"],
    votes: 2,
    icon: "mountain"
  },
  {
    id: "arnold-rim-logging-museum",
    category: "Hikes",
    rank: "Easiest starter hike",
    name: "Arnold Rim Trail - Logging Museum access",
    notes: "Northern terminus starts by the Sierra Nevada Logging Museum; first mile is paved and gently graded.",
    bestFor: "Strollers, mixed ages, short out-and-back, pairing with White Pines Lake.",
    access: "Park respectfully near the museum and follow trail signage.",
    tags: ["easy", "paved first mile", "near lake", "museum"],
    votes: 2,
    icon: "mountain"
  },
  {
    id: "calaveras-big-trees",
    category: "Hikes",
    rank: "Best destination hike",
    name: "Calaveras Big Trees State Park",
    notes: "State park preserving North Grove and South Grove giant sequoias, with hiking trails, picnic areas, exhibits, swimming, and day-use facilities.",
    bestFor: "Iconic trees, shade, all-ages sightseeing, visitor center, low-stress nature time.",
    access: "Day-use fee applies; dogs are restricted to developed areas and fire roads.",
    tags: ["best hike", "giant sequoias", "shade", "visitor center"],
    votes: 6,
    icon: "trees"
  },
  {
    id: "sequoia-woods-golf",
    category: "Golf course",
    rank: "Closest golf",
    name: "Sequoia Woods Golf Course",
    notes: "Private 18-hole mountain course at 1000 Cypress Point Drive with pro shop, putting green, driving range, and member/guest tee times.",
    bestFor: "Golfers, range practice, putting, small adult group outing.",
    access: "Members and guests; call or verify host privileges before planning golf.",
    tags: ["closest golf", "private", "18 holes", "range"],
    votes: 1,
    icon: "grill"
  },
  {
    id: "sequoia-woods-clubhouse",
    category: "Golf course",
    rank: "Closest clubhouse food",
    name: "Sequoia Woods Clubhouse",
    notes: "Clubhouse is listed as open to the public for food and drinks, with bar/lounge, deck seating in warm season, and dinner service windows.",
    bestFor: "Nearby adult drinks, easy meal option, patio, checking course vibe.",
    access: "Call for reservations and current food hours; pool remains members only.",
    tags: ["clubhouse", "food", "drinks", "nearby"],
    votes: 1,
    icon: "utensils"
  },
  {
    id: "white-pines-disc-golf",
    category: "Golf course",
    rank: "Closest casual game",
    name: "White Pines Disc Golf",
    notes: "9-hole disc golf course by White Pines Lake and the Arnold Rim Trail.",
    bestFor: "Older kids, casual competition, low-cost outdoor activity.",
    access: "Bring discs or pick up supplies in Arnold.",
    tags: ["disc golf", "kids", "lake add-on", "casual"],
    votes: 1,
    icon: "mountain"
  },
  {
    id: "sierra-logging-museum",
    category: "Around town",
    rank: "Closest low-effort stop",
    name: "Sierra Nevada Logging Museum",
    notes: "Museum near White Pines Lake and the Arnold Rim Trail trailhead.",
    bestFor: "History stop, short visit, pairing with lake or easy trail walk.",
    access: "Check open hours before relying on indoor access.",
    tags: ["museum", "near lake", "short stop"],
    votes: 1,
    icon: "bag"
  },
  {
    id: "big-trees-market",
    category: "Food and errands",
    rank: "Main grocery backup",
    name: "Big Trees Market",
    notes: "Arnold grocery backup for ice, sandwiches, forgotten staples, drinks, and quick cabin supplies.",
    bestFor: "Errands, ice, deli/sandwich backup, forgotten groceries.",
    access: "Good practical stop before driving farther up Highway 4.",
    tags: ["grocery", "ice", "sandwiches", "errands"],
    votes: 1,
    icon: "bag"
  },
  {
    id: "bistro-espresso",
    category: "Food and errands",
    rank: "Closest coffee / casual food",
    name: "Bistro Espresso / Cedar Center",
    notes: "Arnold coffee and casual food area; also near an Arnold Rim Trail kiosk access point.",
    bestFor: "Coffee, breakfast pickup, casual food, trail access from town.",
    access: "Check current hours before counting on it.",
    tags: ["coffee", "casual food", "trail kiosk"],
    votes: 1,
    icon: "utensils"
  },
  {
    id: "ebbetts-pass-byway",
    category: "Scenic drives",
    rank: "Best scenic corridor",
    name: "Ebbetts Pass Scenic Byway",
    notes: "Highway 4 scenic corridor through Arnold, Bear Valley, Lake Alpine, and higher mountain terrain.",
    bestFor: "Views, cooler weather, photo stops, exploring without a fixed schedule.",
    access: "Mountain road conditions can change; check before longer drives.",
    tags: ["scenic", "views", "mountain road"],
    votes: 1,
    icon: "mountain"
  },
  {
    id: "bear-valley-area",
    category: "Scenic drives",
    rank: "Higher-elevation base",
    name: "Bear Valley",
    notes: "Mountain village area near Lake Alpine with rental/support stops and high-country access.",
    bestFor: "Lake Alpine support stop, cooler air, mountain scenery.",
    access: "Longer drive from Arnold; useful when pairing with Lake Alpine.",
    tags: ["Bear Valley", "rentals", "gas", "longer drive"],
    votes: 1,
    icon: "mountain"
  }
];

const defaultLogistics = {
  shell: { arrival: "Wednesday afternoon", leaving: "Monday morning", note: "Shell arrives first." },
  nick: { arrival: "Thursday afternoon", leaving: "Monday morning", note: "Nick and Marissa arrive Thursday." },
  bear: { arrival: "Friday afternoon", leaving: "Monday morning", note: "Bear and Jessica arrive Friday afternoon." },
  nat: { arrival: "Friday", leaving: "Monday morning", note: "Andy and Natalie arrive Friday." }
};

const dayMeta = {
  wed: { dayLabel: "Wed Jul 1", fullLabel: "Wednesday July 1" },
  thu: { dayLabel: "Thu Jul 2", fullLabel: "Thursday July 2" },
  fri: { dayLabel: "Fri Jul 3", fullLabel: "Friday July 3" },
  sat: { dayLabel: "Sat Jul 4", fullLabel: "Saturday July 4" },
  sun: { dayLabel: "Sun Jul 5", fullLabel: "Sunday July 5" },
  mon: { dayLabel: "Mon Jul 6", fullLabel: "Monday July 6" }
};
const allDayCodes = ["wed", "thu", "fri", "sat", "sun", "mon"];
const mealTypeLabels = {
  "non-food": "Non-food item",
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  dessert: "Dessert / Snacks",
  "pack-up": "Pack-up",
  any: "Any meal / shared"
};
const defaultFamilyEventTypes = [
  "Practice",
  "Game",
  "Recital",
  "Performance",
  "School",
  "Birthday",
  "Family",
  "Appointment",
  "Other"
];
const defaultFamilyPeople = ["Luca", "Sophia", "Rocco", "Gio", "Oli", "Viv", "Family"];
const defaultFamilyLocations = ["School", "Soccer field", "Baseball field", "Dance studio", "Theater", "Gym"];
const familyCalendarName = "G Family";
const familyScheduleMaxDrafts = 24;
const bringingTypeLabels = {
  food: "Food",
  drink: "Drink",
  gear: "Gear",
  table: "Table"
};
const arrivalOptions = [
  "Wednesday morning",
  "Wednesday afternoon",
  "Wednesday evening",
  "Thursday morning",
  "Thursday afternoon",
  "Thursday evening",
  "Friday morning",
  "Friday afternoon",
  "Friday evening",
  "Saturday morning",
  "Saturday afternoon",
  "Saturday evening",
  "Sunday morning",
  "Sunday afternoon",
  "Sunday evening",
  "Not sure yet"
];
const leavingOptions = [
  "Monday morning",
  "Monday afternoon",
  "Sunday afternoon",
  "Sunday evening",
  "Not sure yet"
];
const calendarMealSlots = [
  { label: "Breakfast", time: "7:00 - 10:00", value: "?" },
  { label: "Lunch", time: "12:00 - 2:00", value: "?" },
  { label: "Dinner", time: "6:00 - 8:00", value: "?" },
  { label: "Dessert / Snacks", time: "8:00 - 10:00", value: "?" }
];

const storageKey = "cabin-game-plan-v1";
const selectedFamilyKey = "cabin-game-plan-selected-family-v1";
const clientIdKey = "cabin-game-plan-client-id-v1";
const sessionTokenKey = "gtonetrip-session-token-v1";
const installPromptDismissedKey = "cabin-game-plan-install-dismissed-v1";
const profileSettingsKey = "gre-family-profile-settings-v1";
const supabaseConfig = window.APP_CONFIG || {};
const supabaseFunctionBase = `${supabaseConfig.supabaseUrl}/functions/v1/${supabaseConfig.tripApiFunction}`;
const supabasePublishableKey = supabaseConfig.supabasePublishableKey || "";
const api = {
  clientId: getClientId(),
  eventSource: null,
  statePoller: null,
  hasLoadedSharedState: false,
  lastStateKey: "",
  user: null,
  needsProfile: true
};
const passkeyState = {
  supportChecked: false,
  supported: false,
  platform: false,
  status: null,
  busy: false
};

let state = loadLocalState();
let selectedDay = "wed";
let foodView = "family";
let foodDay = "";
let todoView = "things";
let currentActivePanel = "home";
let selectedFamily = loadSelectedFamily();
let sessionToken = loadSessionToken();
let tripInfo = null;
let drawerStep = 1;
let lastFocusedElement = null;
let logisticsEditMode = "";
let itemMode = "meal";
let editingItemId = "";
let editingFamilyEventId = "";
let pendingSupplyImage = "";
let pendingSupplyAiImage = "";
let supplyDraftItems = [];
let supplyImportBusy = false;
let smartUploadOpen = false;
let pendingScheduleImage = "";
let pendingProfilePhoto = "";
let pendingProfilePhotoSource = "";
let profilePhotoChanged = false;
let profilePhotoSelectionFailed = false;
let profilePhotoCrop = { x: 0, y: 0, zoom: 1 };
const profileCropPointers = new Map();
let profileCropDrag = null;
let profileCropPinch = null;
let familyScheduleDrafts = [];
let familyScheduleSourceText = "";
let familyScheduleScanBusy = false;
let deferredInstallPrompt = null;
let waitingServiceWorker = null;
let hasReloadedForServiceWorker = false;

function loadLocalState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && saved.meals && saved.supplies) return normalizeClientState(saved);
  } catch {
    // Ignore corrupt local data and start clean.
  }
  return normalizeClientState({
    meals: defaultMeals,
    supplies: defaultSupplies,
    familyChecks: { bear: true },
    familyResponses: {},
    checklists: {},
    activityVotes: defaultActivityVotes(),
    activityVoters: {}
  });
}

// iOS Safari Private Browsing (and storage-full states) throw on localStorage
// access. Guard every read/write so the app never breaks because storage did.
function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore storage failures */
  }
}
function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore storage failures */
  }
}

function loadSelectedFamily() {
  const saved = safeGetItem(selectedFamilyKey);
  return families.some((family) => family.id === saved) ? saved : "";
}

function loadSessionToken() {
  return safeGetItem(sessionTokenKey) || "";
}

function saveLocalState() {
  safeSetItem(storageKey, JSON.stringify(state));
}

function saveSelectedFamily() {
  if (selectedFamily) {
    safeSetItem(selectedFamilyKey, selectedFamily);
  } else {
    safeRemoveItem(selectedFamilyKey);
  }
}

function rememberSessionToken(value) {
  const next = String(value || "").trim();
  if (!next) {
    safeRemoveItem(sessionTokenKey);
    sessionToken = "";
    return false;
  }
  safeSetItem(sessionTokenKey, next);
  sessionToken = next;
  return true;
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosLike() {
  const platform = navigator.platform || "";
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function installPromptDismissed() {
  return safeGetItem(installPromptDismissedKey) === "true";
}

function renderInstallPrompt() {
  const panel = document.querySelector("#installPrompt");
  if (!panel) return;
  const title = document.querySelector("#installPromptTitle");
  const copy = document.querySelector("#installPromptCopy");
  const action = document.querySelector("#installApp");
  const dismiss = document.querySelector("#dismissInstallPrompt");
  const shouldShowUpdate = Boolean(waitingServiceWorker);
  const shouldShowInstall = Boolean(api.user && !isStandaloneApp() && !installPromptDismissed());

  if (!shouldShowUpdate && !shouldShowInstall) {
    panel.classList.add("is-hidden");
    return;
  }

  panel.classList.remove("is-hidden");
  if (shouldShowUpdate) {
    if (title) title.textContent = "Update ready";
    if (copy) copy.textContent = "A newer trip board is ready to load.";
    if (action) action.textContent = "Update";
    if (dismiss) dismiss.classList.add("is-hidden");
    return;
  }

  if (title) title.textContent = deferredInstallPrompt ? "Install app" : "Install on iPhone";
  if (copy) {
    copy.textContent = isIosLike()
      ? "Tap Share in Safari, then Add to Home Screen."
      : "Add this trip board to your home screen after the URL is live.";
  }
  if (action) action.textContent = deferredInstallPrompt ? "Install" : "How to install";
  if (dismiss) dismiss.classList.remove("is-hidden");
}

async function handleInstallAction() {
  if (waitingServiceWorker) {
    waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    return;
  }
  if (!deferredInstallPrompt) {
    showToast(isIosLike() ? "Tap Share, then Add to Home Screen." : "Use your browser install menu.");
    return;
  }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice.catch(() => null);
  deferredInstallPrompt = null;
  if (choice?.outcome === "accepted") safeSetItem(installPromptDismissedKey, "true");
  renderInstallPrompt();
}

function dismissInstallPrompt() {
  safeSetItem(installPromptDismissedKey, "true");
  renderInstallPrompt();
}

function profileStorageId(user = api.user) {
  return String(user?.personId || user?.id || user?.firstName || "profile").trim().toLowerCase() || "profile";
}

function loadProfileSettings(user = api.user) {
  try {
    const allProfiles = JSON.parse(safeGetItem(profileSettingsKey) || "{}");
    const saved = allProfiles?.[profileStorageId(user)];
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function saveProfileSettings(settings, user = api.user) {
  if (!user) return;
  let allProfiles = {};
  try {
    allProfiles = JSON.parse(safeGetItem(profileSettingsKey) || "{}") || {};
  } catch {
    allProfiles = {};
  }
  allProfiles[profileStorageId(user)] = {
    displayName: shortText(settings.displayName, 60),
    email: shortText(settings.email, 160),
    photo: imageDataUrlSafe(settings.photo)
  };
  safeSetItem(profileSettingsKey, JSON.stringify(allProfiles));
}

function displayNameForUser(user = api.user) {
  const saved = loadProfileSettings(user);
  return shortText(user?.displayName || saved.displayName || user?.firstName || "Profile", 60) || "Profile";
}

function profileTitleForUser(user = api.user) {
  const firstName = shortText(user?.firstName, 60) || "Profile";
  const familyName = shortText(familyById(user?.familyId)?.name, 60) || "Family";
  return `${firstName} - ${familyName}`;
}

function profilePhotoForUser(user = api.user) {
  const saved = loadProfileSettings(user);
  return imageDataUrlSafe(user?.photo) || imageDataUrlSafe(saved.photo);
}

function normalizeSignedInUser(user) {
  if (!user || typeof user !== "object") return null;
  return {
    ...user,
    personId: shortText(user.personId, 80),
    firstName: shortText(user.firstName, 80),
    familyId: shortText(user.familyId, 40),
    email: shortText(user.email, 160),
    displayName: shortText(user.displayName, 60),
    photo: imageDataUrlSafe(user.photo)
  };
}

function renderProfileAdminPanel() {
  const panel = document.querySelector("#profilePasswordPanel");
  const password = document.querySelector("#profilePassword");
  const confirm = document.querySelector("#profilePasswordConfirm");
  panel?.classList.remove("is-hidden");
  if (password) password.value = "";
  if (confirm) confirm.value = "";
}

function profileInitial(name = displayNameForUser()) {
  return (String(name || "P").trim().match(/[a-z0-9]/i)?.[0] || "P").toUpperCase();
}

function setProfilePhotoPreview(photo, name = displayNameForUser()) {
  const safePhoto = imageDataUrlSafe(photo);
  const initial = profileInitial(name);
  const avatarImage = document.querySelector("#profileAvatarImage");
  const avatarInitial = document.querySelector("#profileAvatarInitial");
  const previewImage = document.querySelector("#profilePhotoImage");
  const previewInitial = document.querySelector("#profilePhotoInitial");
  if (avatarImage) {
    avatarImage.src = safePhoto || "";
    avatarImage.classList.toggle("is-hidden", !safePhoto);
  }
  if (previewImage) {
    previewImage.src = safePhoto || "";
    previewImage.classList.toggle("is-hidden", !safePhoto);
  }
  if (avatarInitial) {
    avatarInitial.textContent = initial;
    avatarInitial.classList.toggle("is-hidden", Boolean(safePhoto));
  }
  if (previewInitial) {
    previewInitial.textContent = initial;
    previewInitial.classList.toggle("is-hidden", Boolean(safePhoto));
  }
}

function profileSourceDataUrlSafe(value) {
  const raw = String(value || "").trim();
  if (!raw.startsWith("data:image/")) return "";
  return raw.length <= 2000000 ? raw : "";
}

function profileCropSource() {
  return profileSourceDataUrlSafe(pendingProfilePhotoSource) || imageDataUrlSafe(pendingProfilePhoto);
}

function resetProfileCrop() {
  profilePhotoCrop = { x: 0, y: 0, zoom: 1 };
  resetProfileCropGestureState();
}

function renderProfileCropper() {
  const source = profileCropSource();
  const shouldShowCropper = Boolean(profilePhotoChanged && source);
  const cropper = document.querySelector("#profileCropper");
  const image = document.querySelector("#profileCropImage");
  const zoom = document.querySelector("#profilePhotoZoom");
  if (cropper) cropper.classList.toggle("is-hidden", !shouldShowCropper);
  if (image) {
    image.src = shouldShowCropper ? source : "";
    image.style.transform = `translate(${profilePhotoCrop.x}px, ${profilePhotoCrop.y}px) scale(${profilePhotoCrop.zoom})`;
  }
  if (zoom) zoom.value = String(profilePhotoCrop.zoom);
}

function populateProfileForm() {
  if (!api.user) return;
  const name = displayNameForUser();
  pendingProfilePhoto = profilePhotoForUser();
  pendingProfilePhotoSource = pendingProfilePhoto;
  profilePhotoChanged = false;
  profilePhotoSelectionFailed = false;
  resetProfileCrop();
  const titleNode = document.querySelector("#profileDrawerTitle");
  const nameInput = document.querySelector("#profileNameInput");
  const fileInput = document.querySelector("#profilePhotoInput");
  const passwordInput = document.querySelector("#profilePassword");
  const passwordConfirmInput = document.querySelector("#profilePasswordConfirm");
  if (titleNode) titleNode.textContent = profileTitleForUser();
  if (nameInput) nameInput.value = name;
  if (fileInput) fileInput.value = "";
  if (passwordInput) passwordInput.value = "";
  if (passwordConfirmInput) passwordConfirmInput.value = "";
  setProfilePhotoPreview(pendingProfilePhoto, name);
  renderProfileAdminPanel();
  renderProfileCropper();
}

function openProfileDrawer() {
  if (!api.user) {
    showAuthScreen("Sign in first.");
    return;
  }
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  populateProfileForm();
  document.body.classList.add("drawer-open");
  document.querySelector("#drawerBackdrop")?.classList.remove("is-hidden");
  document.querySelector("#profileDrawer")?.classList.remove("is-hidden");
  window.setTimeout(() => document.querySelector("#profileNameInput")?.focus(), 0);
}

function closeProfileDrawer() {
  document.querySelector("#profileDrawer")?.classList.add("is-hidden");
  resetProfileCropGestureState();
  const anotherDrawerOpen = Boolean(document.querySelector(".checkin-drawer:not(.is-hidden), .item-drawer:not(.is-hidden)"));
  if (!anotherDrawerOpen) {
    document.body.classList.remove("drawer-open");
    document.querySelector("#drawerBackdrop")?.classList.add("is-hidden");
  }
  lastFocusedElement?.focus?.();
  lastFocusedElement = null;
}

async function saveProfileForm(event) {
  event?.preventDefault?.();
  if (!api.user) return;
  const displayName = document.querySelector("#profileNameInput")?.value.trim() || api.user.firstName || "Profile";
  const profilePassword = document.querySelector("#profilePassword")?.value.trim() || "";
  const profilePasswordConfirm = document.querySelector("#profilePasswordConfirm")?.value.trim() || "";
  if (profilePassword !== profilePasswordConfirm) {
    showToast("Password confirmation does not match.");
    return;
  }
  if (profilePassword && profilePassword.length < 4) {
    showToast("Password must be at least 4 characters.");
    return;
  }
  if (profilePhotoSelectionFailed) {
    showToast("That picture did not load. Choose it again, then save.");
    return;
  }
  if (profilePhotoChanged && profileCropSource()) {
    try {
      pendingProfilePhoto = await cropProfilePhoto();
    } catch {
      showToast("Could not crop that picture.");
      return;
    }
    if (hasProfilePhotoSizeError(pendingProfilePhoto) || !pendingProfilePhoto) {
      showToast("That picture is still too large. Try a different photo or zoom in a little more.");
      return;
    }
  }
  try {
    const body = {
      displayName,
      profilePassword
    };
    if (profilePhotoChanged) body.photo = pendingProfilePhoto;
    const response = await authAwareRequest("/profile", {
      method: "POST",
      body
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) throw new Error(payload.message || "Could not save profile.");
    applyProfile(payload.user);
    applyTripInfo(payload.tripInfo);
    profilePhotoChanged = false;
    pendingProfilePhotoSource = "";
    renderProfileCropper();
    closeProfileDrawer();
    showToast(payload.message || "Profile saved.");
  } catch (error) {
    showToast(error.message || "Could not save profile.");
  }
}

function removeProfilePhoto() {
  pendingProfilePhoto = "";
  pendingProfilePhotoSource = "";
  profilePhotoChanged = true;
  profilePhotoSelectionFailed = false;
  resetProfileCrop();
  const fileInput = document.querySelector("#profilePhotoInput");
  if (fileInput) fileInput.value = "";
  setProfilePhotoPreview("", document.querySelector("#profileNameInput")?.value || displayNameForUser());
  renderProfileCropper();
}

function updateAuthMessage(message) {
  const node = document.querySelector("#authMessage");
  if (node) node.textContent = message || "";
}

function passkeyClient() {
  return window.SimpleWebAuthnBrowser || null;
}

function passkeySetupLabel() {
  return isIosLike() ? "Save Face ID" : "Save passkey";
}

function passkeySignInLabel() {
  return isIosLike() ? "Use Face ID / passkey" : "Use saved passkey";
}

function passkeyHelpText() {
  return isIosLike()
    ? "After your first password sign-in, you can save Face ID on this phone for one-tap sign-in."
    : "After your first password sign-in, you can save a passkey on this device for one-tap sign-in.";
}

async function ensurePasskeySupport() {
  if (passkeyState.supportChecked) return passkeyState.supported;
  passkeyState.supportChecked = true;
  const client = passkeyClient();
  if (!client?.browserSupportsWebAuthn) {
    renderPasskeyUi();
    return false;
  }
  try {
    passkeyState.supported = await client.browserSupportsWebAuthn();
    if (passkeyState.supported && client.platformAuthenticatorIsAvailable) {
      passkeyState.platform = await client.platformAuthenticatorIsAvailable().catch(() => false);
    }
  } catch {
    passkeyState.supported = false;
    passkeyState.platform = false;
  }
  renderPasskeyUi();
  return passkeyState.supported;
}

function renderPasskeyUi() {
  const divider = document.querySelector("#passkeyDivider");
  const actions = document.querySelector("#passkeyActions");
  const signInButton = document.querySelector("#passkeySignIn");
  const help = document.querySelector("#passkeyHelp");
  const setupButton = document.querySelector("#setupPasskey");

  if (help) help.textContent = passkeyHelpText();
  if (signInButton) {
    signInButton.textContent = passkeySignInLabel();
    signInButton.disabled = passkeyState.busy;
  }
  if (setupButton) {
    const statusCount = Number(passkeyState.status?.count || 0);
    setupButton.textContent = statusCount > 0 ? "Add another passkey" : passkeySetupLabel();
    setupButton.disabled = passkeyState.busy;
  }

  const supportsPasskeys = passkeyState.supported;
  divider?.classList.toggle("is-hidden", !supportsPasskeys || Boolean(api.user));
  actions?.classList.toggle("is-hidden", !supportsPasskeys || Boolean(api.user));
  setupButton?.classList.toggle("is-hidden", !supportsPasskeys || !api.user);
}

async function refreshPasskeyStatus() {
  const supported = await ensurePasskeySupport();
  if (!supported || !api.user) {
    passkeyState.status = null;
    renderPasskeyUi();
    return null;
  }
  try {
    const response = await authAwareRequest("/passkey/status", { cache: "no-store" });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || "Passkey status unavailable.");
    passkeyState.status = payload;
  } catch {
    passkeyState.status = null;
  }
  renderPasskeyUi();
  return passkeyState.status;
}

function setPasskeyBusy(isBusy) {
  passkeyState.busy = Boolean(isBusy);
  renderPasskeyUi();
}

function attendeeById(id) {
  return attendees.find((person) => person.id === id) || null;
}

function renderAuthPeople() {
  const picker = document.querySelector("#authPersonPicker");
  if (!picker) return;
  const selectedPersonId = document.querySelector("#authPersonId")?.value || api.user?.personId || "";
  picker.innerHTML = attendees.map((person) => {
    const family = familyById(person.familyId);
    const selected = selectedPersonId === person.id;
    return `
      <button
        class="auth-person ${selected ? "is-selected" : ""}"
        type="button"
        data-auth-person="${person.id}"
        aria-pressed="${selected ? "true" : "false"}">
        <strong>${escapeText(person.name)}</strong>
        <span>${escapeText(person.note || family?.shortName || family?.name || "")}</span>
      </button>
    `;
  }).join("");
}

function selectAuthPerson(personId, options = {}) {
  const person = attendeeById(personId);
  if (!person) return;
  const personInput = document.querySelector("#authPersonId");
  const firstName = document.querySelector("#authFirstName");
  const family = document.querySelector("#authFamily");
  if (personInput) personInput.value = person.id;
  if (firstName && (!firstName.value || options.force)) firstName.value = person.firstName;
  if (family) family.value = person.familyId;
  selectedFamily = person.familyId;
  saveSelectedFamily();
  renderAuthPeople();
  renderFamilies();
  if (options.focusPassword !== false) {
    setTimeout(() => document.querySelector("#authPassword")?.focus(), 0);
  }
}

function handleAuthFamilyChange() {
  const family = document.querySelector("#authFamily")?.value || "";
  const personInput = document.querySelector("#authPersonId");
  const person = attendeeById(personInput?.value || "");
  if (person && person.familyId !== family && personInput) personInput.value = "";
  renderAuthPeople();
}

function showAuthScreen(message = "") {
  const screen = document.querySelector("#authScreen");
  if (!screen) return;
  const family = document.querySelector("#authFamily");
  if (family && selectedFamily && !family.value) family.value = selectedFamily;
  document.body.classList.add("auth-open");
  screen.classList.remove("is-hidden");
  renderAuthPeople();
  updateAuthMessage(message);
  renderPasskeyUi();
  setTimeout(() => {
    const target = document.querySelector("#authPersonId")?.value
      ? document.querySelector("#authPassword")
      : document.querySelector("#authFirstName") || document.querySelector("#authPassword");
    target?.focus?.();
  }, 0);
}

function hideAuthScreen() {
  document.body.classList.remove("auth-open");
  document.querySelector("#authScreen")?.classList.add("is-hidden");
  updateAuthMessage("");
}

function applyProfile(user) {
  const normalizedUser = normalizeSignedInUser(user);
  api.user = normalizedUser;
  api.needsProfile = !normalizedUser;
  if (!normalizedUser) tripInfo = null;
  if (normalizedUser) {
    saveProfileSettings({
      displayName: normalizedUser.displayName,
      email: normalizedUser.email,
      photo: normalizedUser.photo
    }, normalizedUser);
  }
  if (normalizedUser?.familyId) {
    selectedFamily = normalizedUser.familyId;
    saveSelectedFamily();
  }
  renderProfile();
  renderTripInfo();
  renderInstallPrompt();
  renderPasskeyUi();
}

function renderProfile() {
  const sessionBar = document.querySelector("#appSessionBar");
  if (!api.user) {
    sessionBar?.classList.add("is-hidden");
    closeProfileDrawer();
    return;
  }
  const name = displayNameForUser();
  const photo = profilePhotoForUser();
  sessionBar?.classList.remove("is-hidden");
  document.querySelector("#profileAvatarButton")?.setAttribute("aria-label", `Open profile for ${name}`);
  const titleNode = document.querySelector("#profileDrawerTitle");
  if (titleNode) titleNode.textContent = profileTitleForUser();
  setProfilePhotoPreview(photo, name);
  renderProfileAdminPanel();
}

function applyTripInfo(info) {
  tripInfo = info && typeof info === "object" ? info : null;
  renderTripInfo();
}

function renderTripInfo() {
  const signedIn = Boolean(api.user);
  const address = signedIn && tripInfo?.address ? tripInfo.address : "Sign in to view house address";
  const city = tripInfo?.cityLabel || "Arnold, California";
  const heroText = city;
  const addressNode = document.querySelector("#cabinAddressValue");
  const heroNode = document.querySelector("#heroLocationText");
  const doorNode = document.querySelector("#doorCodeValue");
  const wifiNode = document.querySelector("#wifiValue");
  const checkoutNode = document.querySelector("#checkoutValue");
  if (addressNode) addressNode.textContent = address;
  if (heroNode) heroNode.textContent = heroText;
  if (doorNode) doorNode.textContent = signedIn ? (tripInfo?.doorCode || "TBD") : "TBD";
  if (wifiNode) wifiNode.textContent = signedIn ? (tripInfo?.wifi || "TBD") : "TBD";
  if (checkoutNode) checkoutNode.textContent = tripInfo?.checkout || "Monday July 6 · time TBD";
  updateHeroForPanel(currentActivePanel);
}

function familyCalendarState() {
  return state.familyCalendar || normalizeFamilyCalendar({});
}

function familyCalendarEvents() {
  return [...familyCalendarState().events].sort((left, right) => {
    const leftDate = left.date || "9999-12-31";
    const rightDate = right.date || "9999-12-31";
    if (leftDate !== rightDate) return leftDate.localeCompare(rightDate);
    const leftTime = left.allDay ? "00:00" : (left.startTime || "23:59");
    const rightTime = right.allDay ? "00:00" : (right.startTime || "23:59");
    return leftTime.localeCompare(rightTime);
  });
}

function familyCalendarMemories() {
  const calendar = familyCalendarState();
  const events = calendar.events || [];
  return {
    people: familyMemoryList([
      ...defaultFamilyPeople,
      ...calendar.memories.people,
      ...events.map((event) => event.person)
    ]),
    titles: familyMemoryList([
      ...calendar.memories.titles,
      ...events.map((event) => event.title)
    ]),
    locations: familyMemoryList([
      ...defaultFamilyLocations,
      ...calendar.memories.locations,
      ...events.map((event) => event.location)
    ]),
    eventTypes: familyMemoryList([
      ...defaultFamilyEventTypes,
      ...calendar.memories.eventTypes,
      ...events.map((event) => event.eventType)
    ])
  };
}

function replaceDatalistOptions(id, values) {
  const node = document.querySelector(`#${id}`);
  if (!node) return;
  node.innerHTML = values.map((value) => `<option value="${escapeText(value)}"></option>`).join("");
}

function familyEventDateLabel(value) {
  if (!value) return "Date TBD";
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function familyEventTimeLabel(event) {
  if (event.allDay) return "All day";
  if (!event.startTime && !event.endTime) return "Time TBD";
  if (event.startTime && event.endTime) return `${event.startTime} - ${event.endTime}`;
  return event.startTime || event.endTime || "Time TBD";
}

function familyEventChipMarkup(values, field) {
  return values.slice(0, 6).map((value) => `
    <button class="memory-chip" type="button" data-family-memory="${escapeText(field)}" data-memory-value="${escapeText(value)}">${escapeText(value)}</button>
  `).join("");
}

function renderHomeHub() {
  const stats = document.querySelector("#homeStatUpcoming");
  const nextEvent = document.querySelector("#homeStatNext");
  const title = document.querySelector("#homeFamilyCalendarTitle");
  const subcopy = document.querySelector("#homeFamilyCalendarCopy");
  const count = familyCalendarEvents().length;
  const firstUpcoming = familyCalendarEvents().find((event) => event.date) || familyCalendarEvents()[0] || null;
  if (stats) stats.textContent = String(count);
  if (nextEvent) nextEvent.textContent = firstUpcoming
    ? `${familyEventDateLabel(firstUpcoming.date)} · ${firstUpcoming.title}`
    : "No family events added yet";
  if (title) title.textContent = familyCalendarState().name || familyCalendarName;
  if (subcopy) subcopy.textContent = count
    ? `${count} shared family event${count === 1 ? "" : "s"} remembered for everyone`
    : "Sports, recitals, school dates, and anything the family should all see";
}

function resetFamilyEventForm() {
  editingFamilyEventId = "";
  document.querySelector("#familyEventForm")?.reset();
  const allDay = document.querySelector("#familyEventAllDay");
  if (allDay) allDay.checked = false;
  const titleNode = document.querySelector("#familyEventFormTitle");
  const saveNode = document.querySelector("#familyEventSave");
  const cancelNode = document.querySelector("#familyEventCancel");
  const deleteNode = document.querySelector("#familyEventDelete");
  if (titleNode) titleNode.textContent = "Add to G Family";
  if (saveNode) saveNode.textContent = "Save event";
  cancelNode?.classList.add("is-hidden");
  deleteNode?.classList.add("is-hidden");
  toggleFamilyEventTimeState();
}

function populateFamilyEventForm(event) {
  if (!event) return;
  editingFamilyEventId = event.id;
  document.querySelector("#familyEventTitle").value = event.title || "";
  document.querySelector("#familyEventType").value = event.eventType || "";
  document.querySelector("#familyEventPerson").value = event.person || "";
  document.querySelector("#familyEventLocation").value = event.location || "";
  document.querySelector("#familyEventDate").value = event.date || "";
  document.querySelector("#familyEventStartTime").value = event.startTime || "";
  document.querySelector("#familyEventEndTime").value = event.endTime || "";
  document.querySelector("#familyEventNotes").value = event.notes || "";
  const allDay = document.querySelector("#familyEventAllDay");
  if (allDay) allDay.checked = Boolean(event.allDay);
  const titleNode = document.querySelector("#familyEventFormTitle");
  const saveNode = document.querySelector("#familyEventSave");
  const cancelNode = document.querySelector("#familyEventCancel");
  const deleteNode = document.querySelector("#familyEventDelete");
  if (titleNode) titleNode.textContent = "Edit family event";
  if (saveNode) saveNode.textContent = "Save changes";
  cancelNode?.classList.remove("is-hidden");
  deleteNode?.classList.remove("is-hidden");
  toggleFamilyEventTimeState();
}

function toggleFamilyEventTimeState() {
  const allDay = Boolean(document.querySelector("#familyEventAllDay")?.checked);
  document.querySelectorAll("[data-time-field]").forEach((node) => {
    node.toggleAttribute("disabled", allDay);
    node.closest("label")?.classList.toggle("is-disabled", allDay);
  });
}

function currentFamilyEventPayload() {
  const allDay = Boolean(document.querySelector("#familyEventAllDay")?.checked);
  return {
    title: shortText(document.querySelector("#familyEventTitle")?.value, 120),
    eventType: shortText(document.querySelector("#familyEventType")?.value || "Other", 40) || "Other",
    person: shortText(document.querySelector("#familyEventPerson")?.value, 80),
    location: shortText(document.querySelector("#familyEventLocation")?.value, 120),
    date: isoDateSafe(document.querySelector("#familyEventDate")?.value),
    startTime: allDay ? "" : timeSafe(document.querySelector("#familyEventStartTime")?.value),
    endTime: allDay ? "" : timeSafe(document.querySelector("#familyEventEndTime")?.value),
    allDay,
    notes: shortText(document.querySelector("#familyEventNotes")?.value, 400),
    source: "manual"
  };
}

function renderFamilyCalendar() {
  const upcomingNode = document.querySelector("#familyCalendarUpcoming");
  const memories = familyCalendarMemories();
  const events = familyCalendarEvents();
  replaceDatalistOptions("familyTitleSuggestions", memories.titles);
  replaceDatalistOptions("familyTypeSuggestions", memories.eventTypes);
  replaceDatalistOptions("familyPersonSuggestions", memories.people);
  replaceDatalistOptions("familyLocationSuggestions", memories.locations);
  const nameNode = document.querySelector("#familyCalendarName");
  const statCount = document.querySelector("#familyCalendarStatCount");
  const statNote = document.querySelector("#familyCalendarStatNote");
  if (nameNode) nameNode.textContent = familyCalendarState().name || familyCalendarName;
  if (statCount) statCount.textContent = String(events.length);
  if (statNote) statNote.textContent = events[0]
    ? `${familyEventDateLabel(events[0].date)} · ${events[0].title}`
    : "No family events added yet";
  const emptyNode = `
    <article class="needed-row">
      <div>
        <strong>No family events yet</strong>
        <span>Add sports, recitals, school events, and shared family dates here.</span>
      </div>
    </article>
  `;
  if (upcomingNode) {
    upcomingNode.innerHTML = events.length ? events.map((event) => `
      <article class="family-event-card">
        <div class="family-event-topline">
          <span class="family-event-date">${escapeText(familyEventDateLabel(event.date))}</span>
          <span class="family-event-type">${escapeText(event.eventType || "Event")}</span>
        </div>
        <strong>${escapeText(event.title)}</strong>
        <div class="family-event-meta">
          <span>${escapeText(event.person || "Family")}</span>
          <span>${escapeText(familyEventTimeLabel(event))}</span>
          <span>${escapeText(event.location || "Location TBD")}</span>
        </div>
        ${event.notes ? `<p>${escapeText(event.notes)}</p>` : ""}
        <div class="calendar-event-actions">
          <button class="secondary-action compact-action" type="button" data-edit-family-event="${escapeText(event.id)}">Edit</button>
          <button class="secondary-action compact-action danger-outline" type="button" data-delete-family-event="${escapeText(event.id)}">Delete</button>
        </div>
      </article>
    `).join("") : emptyNode;
  }
  const peopleChips = document.querySelector("#familyPeopleChips");
  const typeChips = document.querySelector("#familyTypeChips");
  const locationChips = document.querySelector("#familyLocationChips");
  if (peopleChips) peopleChips.innerHTML = familyEventChipMarkup(memories.people, "person");
  if (typeChips) typeChips.innerHTML = familyEventChipMarkup(memories.eventTypes, "type");
  if (locationChips) locationChips.innerHTML = familyEventChipMarkup(memories.locations, "location");
  renderFamilyImportHistory();
  renderFamilyScheduleDrafts();
}

function renderFamilyImportHistory() {
  const container = document.querySelector("#familyImportHistory");
  if (!container) return;
  const imports = familyCalendarState().imports || [];
  if (!imports.length) {
    container.innerHTML = `
      <article class="needed-row">
        <div>
          <strong>No schedule imports yet</strong>
          <span>Photo imports you save will show here for quick reference.</span>
        </div>
      </article>
    `;
    return;
  }
  container.innerHTML = imports.map((entry) => `
    <article class="needed-row">
      <div>
        <strong>${escapeText(entry.label || "Schedule import")}</strong>
        <span>${escapeText(entry.person || "Family")} · ${entry.draftEvents.length} drafted event${entry.draftEvents.length === 1 ? "" : "s"}</span>
      </div>
    </article>
  `).join("");
}

function setPendingScheduleImage(dataUrl) {
  pendingScheduleImage = imageDataUrlSafe(dataUrl);
  const wrap = document.querySelector("#scheduleImagePreviewWrap");
  const preview = document.querySelector("#scheduleImagePreview");
  if (preview) preview.src = pendingScheduleImage || "";
  wrap?.classList.toggle("is-hidden", !pendingScheduleImage);
}

function resetFamilyScheduleImport() {
  pendingScheduleImage = "";
  familyScheduleDrafts = [];
  familyScheduleSourceText = "";
  familyScheduleScanBusy = false;
  document.querySelector("#scheduleImportForm")?.reset();
  document.querySelector("#scheduleExtractedText").value = "";
  const input = document.querySelector("#scheduleImage");
  if (input) input.value = "";
  setPendingScheduleImage("");
  renderFamilyScheduleDrafts();
  setFamilyScanBusy(false);
}

function setFamilyScanBusy(isBusy) {
  familyScheduleScanBusy = Boolean(isBusy);
  const button = document.querySelector("#scanSchedule");
  if (button) {
    button.disabled = familyScheduleScanBusy;
    button.textContent = familyScheduleScanBusy ? "Scanning..." : "Scan schedule";
  }
}

function parseTimeTo24Hour(hoursText, minutesText, meridiemText) {
  let hours = Number(hoursText || 0);
  const minutes = String(minutesText || "00").padStart(2, "0");
  const meridiem = String(meridiemText || "").toLowerCase();
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function normalizeScheduleLine(line) {
  return String(line || "")
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function parseScheduleDate(monthText, dayText) {
  const monthMap = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
    may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, sept: 9,
    september: 9, oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12
  };
  const now = new Date();
  const year = now.getFullYear();
  if (monthText.includes("/")) {
    const [month, day] = monthText.split("/");
    return `${year}-${String(Number(month)).padStart(2, "0")}-${String(Number(day)).padStart(2, "0")}`;
  }
  const normalizedMonth = monthMap[String(monthText || "").toLowerCase()];
  if (!normalizedMonth) return "";
  return `${year}-${String(normalizedMonth).padStart(2, "0")}-${String(Number(dayText)).padStart(2, "0")}`;
}

function buildScheduleDrafts(text, context = {}) {
  const person = shortText(context.person, 80);
  const label = shortText(context.label, 120);
  const lines = String(text || "").split(/\r?\n/).map(normalizeScheduleLine).filter(Boolean);
  const drafts = [];
  let currentDate = "";
  lines.forEach((line) => {
    const dateMatch = line.match(/\b(\d{1,2}\/\d{1,2}|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*)\s+(\d{1,2})?\b/i);
    if (dateMatch) {
      currentDate = dateMatch[1].includes("/")
        ? parseScheduleDate(dateMatch[1], "")
        : parseScheduleDate(dateMatch[1], dateMatch[2]);
    }
    const timeMatch = line.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)(?:\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm))?/i);
    if (!timeMatch && !currentDate) return;
    const date = currentDate || "";
    if (!date) return;
    const startTime = timeMatch ? parseTimeTo24Hour(timeMatch[1], timeMatch[2], timeMatch[3]) : "";
    const endTime = timeMatch && timeMatch[4] ? parseTimeTo24Hour(timeMatch[4], timeMatch[5], timeMatch[6] || timeMatch[3]) : "";
    let title = line
      .replace(dateMatch?.[0] || "", "")
      .replace(timeMatch?.[0] || "", "")
      .replace(/^[\s\-:|]+|[\s\-:|]+$/g, "")
      .trim();
    let location = "";
    const locationMatch = title.match(/\s@+\s(.+)$/);
    if (locationMatch) {
      location = shortText(locationMatch[1], 120);
      title = title.replace(locationMatch[0], "").trim();
    }
    if (!title) title = label || "Scheduled event";
    drafts.push(normalizeFamilyCalendarEvent({
      id: `draft-${Date.now()}-${drafts.length}`,
      title,
      eventType: label || "Other",
      person,
      date,
      startTime,
      endTime,
      location,
      notes: "",
      source: "photo"
    }));
  });
  return drafts.filter(Boolean).slice(0, familyScheduleMaxDrafts);
}

function renderFamilyScheduleDrafts() {
  const container = document.querySelector("#familyScheduleDrafts");
  if (!container) return;
  if (!familyScheduleDrafts.length) {
    container.innerHTML = `
      <article class="needed-row">
        <div>
          <strong>No draft events yet</strong>
          <span>Scan a schedule photo, then review the extracted events here before saving them.</span>
        </div>
      </article>
    `;
    return;
  }
  container.innerHTML = familyScheduleDrafts.map((event, index) => `
    <article class="schedule-draft-card">
      <div class="schedule-draft-grid">
        <label>
          Title
          <input type="text" value="${escapeText(event.title)}" data-draft-field="title" data-draft-index="${index}">
        </label>
        <label>
          Type
          <input type="text" value="${escapeText(event.eventType)}" list="familyTypeSuggestions" data-draft-field="eventType" data-draft-index="${index}">
        </label>
        <label>
          Who for
          <input type="text" value="${escapeText(event.person)}" list="familyPersonSuggestions" data-draft-field="person" data-draft-index="${index}">
        </label>
        <label>
          Date
          <input type="date" value="${escapeText(event.date)}" data-draft-field="date" data-draft-index="${index}">
        </label>
        <label>
          Start
          <input type="time" value="${escapeText(event.startTime)}" data-draft-field="startTime" data-draft-index="${index}">
        </label>
        <label>
          End
          <input type="time" value="${escapeText(event.endTime)}" data-draft-field="endTime" data-draft-index="${index}">
        </label>
        <label class="schedule-draft-location">
          Location
          <input type="text" value="${escapeText(event.location)}" list="familyLocationSuggestions" data-draft-field="location" data-draft-index="${index}">
        </label>
      </div>
      <div class="calendar-event-actions">
        <button class="secondary-action compact-action" type="button" data-remove-draft="${index}">Remove</button>
      </div>
    </article>
  `).join("");
}

async function ensureOcrClient() {
  if (window.Tesseract?.recognize) return window.Tesseract;
  await new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-ocr-script="true"]');
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.dataset.ocrScript = "true";
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });
  return window.Tesseract;
}

async function scanFamilySchedule() {
  const file = document.querySelector("#scheduleImage")?.files?.[0];
  const person = shortText(document.querySelector("#scheduleImportPerson")?.value, 80);
  const label = shortText(document.querySelector("#scheduleImportLabel")?.value, 120);
  if (!file) {
    showToast("Choose a schedule photo first.");
    return;
  }
  if (!person) {
    showToast("Add who the schedule is for.");
    return;
  }
  if (!label) {
    showToast("Add what the schedule is for.");
    return;
  }
  try {
    setFamilyScanBusy(true);
    const ocrClient = await ensureOcrClient();
    const image = await compressImageFile(file, 1280, 0.86);
    setPendingScheduleImage(image);
    const result = await ocrClient.recognize(image, "eng");
    familyScheduleSourceText = shortText(result?.data?.text || "", 5000);
    document.querySelector("#scheduleExtractedText").value = familyScheduleSourceText;
    familyScheduleDrafts = buildScheduleDrafts(familyScheduleSourceText, { person, label });
    if (!familyScheduleDrafts.length) {
      familyScheduleDrafts = [normalizeFamilyCalendarEvent({
        id: `draft-${Date.now()}`,
        title: label,
        eventType: label,
        person,
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        notes: "",
        source: "photo"
      })];
      showToast("Photo scanned. I could not confidently split it into events, so I created one draft row to edit.");
    } else {
      showToast(`Photo scanned. ${familyScheduleDrafts.length} draft event${familyScheduleDrafts.length === 1 ? "" : "s"} ready to review.`);
    }
    renderFamilyScheduleDrafts();
  } catch {
    showToast("Schedule scan failed. You can still paste the text and build drafts manually.");
  } finally {
    setFamilyScanBusy(false);
  }
}

function rebuildDraftsFromText() {
  const person = shortText(document.querySelector("#scheduleImportPerson")?.value, 80);
  const label = shortText(document.querySelector("#scheduleImportLabel")?.value, 120);
  familyScheduleSourceText = shortText(document.querySelector("#scheduleExtractedText")?.value, 5000);
  familyScheduleDrafts = buildScheduleDrafts(familyScheduleSourceText, { person, label });
  renderFamilyScheduleDrafts();
  showToast(familyScheduleDrafts.length ? "Draft events rebuilt from the text." : "No draft events found in that text yet.");
}

async function saveFamilyEvent() {
  const payload = currentFamilyEventPayload();
  if (!payload.title) {
    showToast("Add an event title first.");
    return;
  }
  if (!payload.date) {
    showToast("Add a date for the event.");
    return;
  }
  if (payload.startTime && payload.endTime && payload.endTime < payload.startTime) {
    showToast("End time must be after start time.");
    return;
  }
  const action = editingFamilyEventId ? "updateFamilyEvent" : "addFamilyEvent";
  const nextPayload = editingFamilyEventId ? { id: editingFamilyEventId, ...payload } : payload;
  const saved = await performAction(action, nextPayload, null, editingFamilyEventId ? "Family event updated." : "Family event added.");
  if (saved) resetFamilyEventForm();
}

function editFamilyEvent(id) {
  const event = familyCalendarEvents().find((entry) => entry.id === id);
  if (!event) return;
  populateFamilyEventForm(event);
  document.querySelector("#familyEventTitle")?.focus();
}

function deleteFamilyEvent(id = editingFamilyEventId) {
  if (!id) return;
  const event = familyCalendarEvents().find((entry) => entry.id === id);
  if (!event) return;
  if (!window.confirm(`Delete "${event.title}"?`)) return;
  performAction("deleteFamilyEvent", { id }, null, "Family event deleted.");
  resetFamilyEventForm();
}

async function saveFamilyScheduleImport() {
  const person = shortText(document.querySelector("#scheduleImportPerson")?.value, 80);
  const label = shortText(document.querySelector("#scheduleImportLabel")?.value, 120);
  familyScheduleSourceText = shortText(document.querySelector("#scheduleExtractedText")?.value, 5000);
  if (!person || !label) {
    showToast("Add who it is for and what it is for first.");
    return;
  }
  const draftEvents = familyScheduleDrafts
    .map((event) => normalizeFamilyCalendarEvent(event))
    .filter((event) => event && event.title && event.date)
    .slice(0, familyScheduleMaxDrafts);
  if (!draftEvents.length) {
    showToast("Review the drafts and make sure each one has at least a title and date.");
    return;
  }
  const saved = await performAction("saveSchedulePhotoDraft", {
    title: label,
    people: [person],
    sourceImage: pendingScheduleImage,
    sourceText: familyScheduleSourceText,
    events: draftEvents
  }, null, `Saved ${draftEvents.length} event${draftEvents.length === 1 ? "" : "s"} to ${familyCalendarName}.`);
  if (saved) resetFamilyScheduleImport();
}

function setAuthFieldsFromUser(user) {
  if (!user) return;
  const firstName = document.querySelector("#authFirstName");
  const email = document.querySelector("#authEmail");
  const family = document.querySelector("#authFamily");
  const person = document.querySelector("#authPersonId");
  if (person && user.personId) person.value = user.personId;
  if (firstName && !firstName.value) firstName.value = user.firstName || "";
  if (email && !email.value) email.value = user.email || "";
  if (family && user.familyId) family.value = user.familyId;
}

async function tripApiRequest(path, { method = "GET", body, cache = "no-store" } = {}) {
  const headers = new Headers({ apikey: supabasePublishableKey });
  if (sessionToken) headers.set("authorization", `Bearer ${sessionToken}`);
  if (body !== undefined) headers.set("content-type", "application/json");
  const response = await fetch(`${supabaseFunctionBase}${path}`, {
    method,
    headers,
    cache,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });
  return response;
}

async function authPost(path, body = {}) {
  const response = await tripApiRequest(path, {
    method: "POST",
    body
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Request failed.");
  return payload;
}

async function loadProfile() {
  const response = await authAwareRequest("/me", { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (payload.user) {
    applyProfile(payload.user);
    applyTripInfo(payload.tripInfo);
    setAuthFieldsFromUser(payload.user);
    hideAuthScreen();
    return payload.user;
  }
  applyProfile(null);
  showAuthScreen();
  return null;
}

async function requireProfile() {
  if (api.user) return true;
  await loadProfile();
  return Boolean(api.user);
}

async function submitAuthForm(event) {
  event.preventDefault();
  const firstName = document.querySelector("#authFirstName")?.value.trim() || "";
  const password = document.querySelector("#authPassword")?.value || "";
  const personId = document.querySelector("#authPersonId")?.value || "";
  const familyId = document.querySelector("#authFamily")?.value || "";
  if (!firstName) {
    updateAuthMessage("Enter your first name.");
    document.querySelector("#authFirstName")?.focus();
    return;
  }
  try {
    setPasskeyBusy(true);
    updateAuthMessage("Signing in...");
    const payload = await authPost("/login", {
      firstName,
      password,
      personId,
      familyId
    });
    rememberSessionToken(payload.token || "");
    applyProfile(payload.user);
    applyTripInfo(payload.tripInfo);
    hideAuthScreen();
    setActivePanel("home");
    showToast("Signed in.");
    connectSharedState();
  } catch (error) {
    updateAuthMessage(error.message || "Could not sign in.");
  } finally {
    setPasskeyBusy(false);
  }
}

async function signInWithPasskey() {
  const client = passkeyClient();
  if (!(await ensurePasskeySupport()) || !client?.startAuthentication) {
    updateAuthMessage("Passkeys are not available in this browser.");
    return;
  }
  try {
    setPasskeyBusy(true);
    updateAuthMessage(isIosLike() ? "Checking Face ID..." : "Checking your saved passkey...");
    const optionsResponse = await tripApiRequest("/passkey/auth/options", {
      method: "POST",
      body: {}
    });
    const optionsPayload = await optionsResponse.json().catch(() => ({}));
    if (!optionsResponse.ok) throw new Error(optionsPayload.message || "Passkey sign-in is not ready.");
    if (Number(optionsPayload.availableCount || 0) === 0) {
      throw new Error("No saved passkeys yet. Sign in once with the password, then save Face ID.");
    }
    const credential = await client.startAuthentication({ optionsJSON: optionsPayload.options });
    const verifyResponse = await tripApiRequest("/passkey/auth/verify", {
      method: "POST",
      body: {
        challenge: optionsPayload.options?.challenge || "",
        response: credential
      }
    });
    const verifyPayload = await verifyResponse.json().catch(() => ({}));
    if (!verifyResponse.ok) throw new Error(verifyPayload.message || "Face ID sign-in did not finish.");
    rememberSessionToken(verifyPayload.token || "");
    applyProfile(verifyPayload.user);
    applyTripInfo(verifyPayload.tripInfo);
    hideAuthScreen();
    setActivePanel("home");
    showToast("Signed in.");
    connectSharedState();
    await refreshPasskeyStatus();
  } catch (error) {
    updateAuthMessage(error.message || "Face ID sign-in did not finish.");
  } finally {
    setPasskeyBusy(false);
  }
}

async function setupPasskey() {
  const client = passkeyClient();
  if (!api.user) {
    showAuthScreen("Sign in first, then save Face ID.");
    return;
  }
  if (!(await ensurePasskeySupport()) || !client?.startRegistration) {
    showToast("Passkeys are not available in this browser.");
    return;
  }
  try {
    setPasskeyBusy(true);
    showToast(isIosLike() ? "Saving Face ID for this device..." : "Saving passkey...");
    const optionsResponse = await authAwareRequest("/passkey/register/options", {
      method: "POST",
      body: {}
    });
    const optionsPayload = await optionsResponse.json().catch(() => ({}));
    if (!optionsResponse.ok) throw new Error(optionsPayload.message || "Could not start passkey setup.");
    const credential = await client.startRegistration({ optionsJSON: optionsPayload.options });
    const verifyResponse = await authAwareRequest("/passkey/register/verify", {
      method: "POST",
      body: {
        challenge: optionsPayload.options?.challenge || "",
        response: credential
      }
    });
    const verifyPayload = await verifyResponse.json().catch(() => ({}));
    if (!verifyResponse.ok) throw new Error(verifyPayload.message || "Could not save that passkey.");
    await refreshPasskeyStatus();
    showToast(isIosLike() ? "Face ID saved for faster sign-in." : "Passkey saved for faster sign-in.");
  } catch (error) {
    showToast(error.message || "Could not save that passkey.");
  } finally {
    setPasskeyBusy(false);
  }
}

async function logoutProfile() {
  try {
    await authAwareRequest("/logout", { method: "POST" });
  } catch {
    /* ignore network logout failures */
  }
  rememberSessionToken("");
  passkeyState.status = null;
  applyProfile(null);
  stopStatePolling();
  const firstName = document.querySelector("#authFirstName");
  const password = document.querySelector("#authPassword");
  if (firstName) firstName.value = "";
  if (password) password.value = "";
  setSyncStatus("offline", "Signed out");
  showAuthScreen("Signed out.");
  renderPasskeyUi();
}

function getClientId() {
  let clientId = safeGetItem(clientIdKey);
  if (!clientId) {
    clientId = crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    safeSetItem(clientIdKey, clientId);
  }
  return clientId;
}

function legacyBringingDefaults(item = {}) {
  const id = String(item.id || "");
  const map = {
    plates: { mealType: "any", days: allDayCodes, type: "table" },
    napkins: { mealType: "any", days: allDayCodes, type: "table" },
    "paper-towels": { mealType: "any", days: allDayCodes, type: "table" },
    milk: { mealType: "breakfast", days: ["sat", "sun"], type: "drink" },
    smores: { mealType: "dessert", days: ["fri", "sat"], type: "food" },
    "chips-nachos": { mealType: "lunch", days: ["sun"], type: "food" },
    bacon: { mealType: "breakfast", days: ["sat", "sun"], type: "food" },
    eggs: { mealType: "breakfast", days: ["fri", "sat", "sun"], type: "food" },
    "cinnamon-rolls": { mealType: "breakfast", days: ["sat"], type: "food" },
    "toast-bread": { mealType: "breakfast", days: ["sat", "sun"], type: "food" },
    "waffles-muffins": { mealType: "breakfast", days: ["sun"], type: "food" },
    butter: { mealType: "breakfast", days: ["sat", "sun"], type: "food" },
    steaks: { mealType: "dinner", days: ["sun"], type: "food" },
    "other-meats": { mealType: "dinner", days: ["sun"], type: "food" },
    "hot-dogs-buns": { mealType: "lunch", days: ["sun"], type: "food" },
    pizza: { mealType: "dinner", days: ["fri"], type: "food" },
    tacos: { mealType: "dinner", days: ["fri"], type: "food" },
    "oli-cake": { mealType: "dessert", days: ["fri"], type: "food" },
    "blackstone-two-burner": { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" },
    cranium: { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" },
    charades: { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" },
    "sparkling-ice": { mealType: "any", days: ["fri", "sat", "sun"], type: "drink" },
    "orange-juice": { mealType: "breakfast", days: ["fri", "sat", "sun"], type: "drink" }
  };
  const matched = map[id];
  if (matched) return matched;
  if (item.type === "gear") return { mealType: "any", days: ["fri", "sat", "sun"], type: "gear" };
  if (item.type === "cold") return { mealType: "any", days: ["fri", "sat", "sun"], type: "food" };
  return { mealType: "any", days: [], type: "table" };
}

function mealTypeSafe(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return Object.hasOwn(mealTypeLabels, normalized) ? normalized : "any";
}

function bringingTypeSafe(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (Object.hasOwn(bringingTypeLabels, normalized)) return normalized;
  if (normalized === "cold") return "food";
  if (normalized === "dry goods") return "table";
  return "food";
}

function dayListSafe(value, fallback = []) {
  const list = Array.isArray(value) ? value : fallback;
  const unique = [];
  allDayCodes.forEach((day) => {
    if (list.includes(day)) unique.push(day);
  });
  return unique;
}

function imageDataUrlSafe(value) {
  const raw = String(value || "").trim();
  if (!raw.startsWith("data:image/")) return "";
  return raw.length <= 400000 ? raw : "";
}

function supplyAiImageDataUrlSafe(value) {
  const raw = String(value || "").trim();
  if (!raw.startsWith("data:image/")) return "";
  return raw.length <= SUPPLY_AI_IMAGE_MAX_LENGTH ? raw : "";
}

function hasProfilePhotoSizeError(value) {
  const raw = String(value || "").trim();
  return Boolean(raw && raw.startsWith("data:image/") && !imageDataUrlSafe(raw));
}

function shortText(value, max = 120) {
  return String(value || "").trim().slice(0, max);
}

function isoDateSafe(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function timeSafe(value) {
  const text = String(value || "").trim();
  return /^\d{2}:\d{2}$/.test(text) ? text : "";
}

function familyMemoryList(value, fallback = []) {
  const seen = new Set();
  const list = [];
  const source = Array.isArray(value) ? value : fallback;
  source.forEach((entry) => {
    const cleaned = shortText(entry, 80);
    const key = cleaned.toLowerCase();
    if (!cleaned || seen.has(key)) return;
    seen.add(key);
    list.push(cleaned);
  });
  return list.slice(0, 40);
}

function normalizeFamilyCalendarEvent(event) {
  const title = shortText(event?.title || event?.idea, 120);
  if (!title) return null;
  const personLabel = shortText(event?.person || event?.forPersonLabel || (Array.isArray(event?.people) ? event.people.join(", ") : ""), 80);
  return {
    id: shortText(event?.id || `family-event-${Date.now()}`, 80),
    title,
    eventType: shortText(event?.eventType || event?.type || "Other", 40) || "Other",
    person: personLabel,
    date: isoDateSafe(event?.date),
    startTime: timeSafe(event?.startTime),
    endTime: timeSafe(event?.endTime),
    allDay: Boolean(event?.allDay),
    location: shortText(event?.location || event?.locationName || "", 120),
    notes: shortText(event?.notes || "", 400),
    source: shortText(event?.source || "manual", 20) || "manual",
    image: imageDataUrlSafe(event?.image || event?.sourceImage || ""),
    createdBy: families.some((family) => family.id === event?.createdBy) ? event.createdBy : "",
    createdAt: event?.createdAt || "",
    updatedAt: event?.updatedAt || ""
  };
}

function normalizeFamilyCalendarImport(entry) {
  return {
    id: shortText(entry?.id || `schedule-import-${Date.now()}`, 80),
    person: shortText(entry?.person || (Array.isArray(entry?.people) ? entry.people.join(", ") : ""), 80),
    label: shortText(entry?.label || entry?.title || entry?.sourceFileName || "", 120),
    image: imageDataUrlSafe(entry?.image || ""),
    extractedText: shortText(entry?.extractedText || entry?.sourceText || "", 5000),
    draftEvents: Array.isArray(entry?.draftEvents || entry?.events)
      ? (entry.draftEvents || entry.events).map(normalizeFamilyCalendarEvent).filter(Boolean).slice(0, familyScheduleMaxDrafts)
      : [],
    createdBy: families.some((family) => family.id === entry?.createdBy) ? entry.createdBy : "",
    createdAt: entry?.createdAt || "",
    updatedAt: entry?.updatedAt || ""
  };
}

function normalizeFamilyCalendar(value) {
  const memorySource = value?.memories || value?.memory || value?.familyCalendarMemory || {};
  const storedEvents = Array.isArray(value?.events || value?.familyCalendarEvents) ? (value.events || value.familyCalendarEvents) : [];
  const events = storedEvents.map(normalizeFamilyCalendarEvent).filter(Boolean);
  const derivedPeople = events.map((event) => event.person).filter(Boolean);
  const derivedTitles = events.map((event) => event.title).filter(Boolean);
  const derivedLocations = events.map((event) => event.location).filter(Boolean);
  const derivedTypes = events.map((event) => event.eventType).filter(Boolean);
  return {
    name: shortText(value?.name || familyCalendarName, 80) || familyCalendarName,
    events,
    memories: {
      people: familyMemoryList(memorySource.people || memorySource.rememberedNames, derivedPeople),
      titles: familyMemoryList(memorySource.titles || memorySource.rememberedEventTitles, derivedTitles),
      locations: familyMemoryList(memorySource.locations || memorySource.rememberedLocations, derivedLocations),
      eventTypes: familyMemoryList(memorySource.eventTypes || memorySource.rememberedEventTypes, [...defaultFamilyEventTypes, ...derivedTypes])
    },
    imports: Array.isArray(value?.imports || value?.schedulePhotoDrafts)
      ? (value.imports || value.schedulePhotoDrafts).map(normalizeFamilyCalendarImport).slice(0, 10)
      : []
  };
}

function normalizeMealItem(meal) {
  const day = dayMeta[meal?.day] ? meal.day : "sun";
  return {
    ...meal,
    day,
    dayLabel: meal?.dayLabel || dayMeta[day].dayLabel,
    type: String(meal?.type || "Meal").trim() || "Meal",
    time: String(meal?.time || "Flexible").trim() || "Flexible",
    owner: families.some((family) => family.id === meal?.owner) ? meal.owner : "",
    idea: String(meal?.idea || "").trim(),
    kids: String(meal?.kids || "").trim(),
    cold: Array.isArray(meal?.cold) ? meal.cold.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 8) : [],
    custom: Boolean(meal?.custom),
    createdBy: families.some((family) => family.id === meal?.createdBy) ? meal.createdBy : "",
    createdAt: meal?.createdAt || "",
    updatedAt: meal?.updatedAt || ""
  };
}

function normalizeSupplyItem(item) {
  const fallback = legacyBringingDefaults(item);
  const owner = families.some((family) => family.id === item?.owner) ? item.owner : "";
  const days = dayListSafe(item?.days, fallback.days);
  const qty = String(item?.qty || item?.quantity || "").trim();
  const notes = String(item?.notes || (!qty ? item?.qty : "") || "").trim();
  return {
    ...item,
    id: String(item?.id || `supply-${Date.now()}`),
    name: String(item?.name || "").trim(),
    notes: notes || "",
    qty: qty || "",
    type: bringingTypeSafe(item?.type || fallback.type),
    owner,
    mealType: mealTypeSafe(item?.mealType || fallback.mealType),
    days,
    image: imageDataUrlSafe(item?.image || item?.imageDataUrl || ""),
    custom: Boolean(item?.custom),
    createdBy: families.some((family) => family.id === item?.createdBy) ? item.createdBy : (owner || ""),
    createdAt: item?.createdAt || "",
    updatedAt: item?.updatedAt || ""
  };
}

function normalizeClientState(nextState) {
  return {
    meals: Array.isArray(nextState.meals) ? nextState.meals.map(normalizeMealItem) : defaultMeals.map(normalizeMealItem),
    supplies: Array.isArray(nextState.supplies) ? nextState.supplies.map(normalizeSupplyItem).filter((item) => item.name) : defaultSupplies.map(normalizeSupplyItem),
    familyChecks: nextState.familyChecks && typeof nextState.familyChecks === "object" ? nextState.familyChecks : { bear: true },
    familyResponses: nextState.familyResponses && typeof nextState.familyResponses === "object" ? nextState.familyResponses : {},
    checklists: nextState.checklists && typeof nextState.checklists === "object" ? nextState.checklists : {},
    familyCalendar: normalizeFamilyCalendar(nextState),
    activityVotes: nextState.activityVotes && typeof nextState.activityVotes === "object"
      ? { ...defaultActivityVotes(), ...nextState.activityVotes }
      : defaultActivityVotes(),
    activityVoters: normalizeActivityVoters(nextState.activityVoters),
    version: Number(nextState.version || 1),
    updatedAt: nextState.updatedAt || null
  };
}

function normalizeActivityVoters(value) {
  const next = {};
  if (!value || typeof value !== "object") return next;
  activities.forEach((activity) => {
    const voters = value[activity.id];
    if (!voters || typeof voters !== "object") return;
    const safeVoters = {};
    families.forEach((family) => {
      if (voters[family.id]) safeVoters[family.id] = true;
    });
    if (Object.keys(safeVoters).length) next[activity.id] = safeVoters;
  });
  return next;
}

function escapeText(value) {
  return String(value ?? "").replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function defaultActivityVotes() {
  return Object.fromEntries(activities.map((item) => [item.id, item.votes]));
}

function activityVoteCount(id) {
  const fallback = activities.find((item) => item.id === id)?.votes || 0;
  const baseline = Number(state.activityVotes?.[id] ?? fallback);
  const familyVotes = state.activityVoters?.[id] && typeof state.activityVoters[id] === "object"
    ? Object.keys(state.activityVoters[id]).length
    : 0;
  return baseline + familyVotes;
}

function activityHasVote(id) {
  const familyId = selectedFamily || api.user?.familyId || "";
  return Boolean(familyId && state.activityVoters?.[id]?.[familyId]);
}

function activityVoteButton(activity, compact = false) {
  const hasVote = activityHasVote(activity.id);
  const count = activityVoteCount(activity.id);
  const label = hasVote ? "Remove vote" : "Vote";
  const countLabel = `${count} ${count === 1 ? "vote" : "votes"}`;
  return `
    <button class="vote-button ${hasVote ? "is-selected" : ""}" type="button" data-vote="${activity.id}" aria-pressed="${hasVote}">
      ${compact ? escapeText(String(count)) : `<span>${escapeText(countLabel)}</span><span>${escapeText(label)}</span>`}
    </button>
  `;
}

function authAwareRequest(path, init = {}) {
  return tripApiRequest(path, init);
}

function sharedStateKey(nextState) {
  if (!nextState || typeof nextState !== "object") return "";
  return `${Number(nextState.version || 0)}:${nextState.updatedAt || ""}`;
}

async function fetchStateWithAuth() {
  const response = await authAwareRequest("/state", { cache: "no-store" });
  if (response.status === 401 || response.status === 403) {
    const payload = await response.json().catch(() => ({}));
    if (payload.needsProfile) {
      showAuthScreen("Sign in to update the shared board.");
      throw new Error("PROFILE_REQUIRED");
    }
    throw new Error(payload.message || "UNAUTHORIZED");
  }
  return response;
}

function applySharedState(nextState, options = {}) {
  const nextKey = sharedStateKey(nextState);
  if (!options.force && nextKey && api.lastStateKey === nextKey) return false;
  state = normalizeClientState(nextState);
  api.lastStateKey = sharedStateKey(state) || nextKey;
  saveLocalState();
  renderAll();
  return true;
}

function setSyncStatus(mode, label) {
  const status = document.querySelector("#syncStatus");
  if (!status) return;
  status.classList.remove("is-live", "is-offline", "is-connecting");
  status.classList.add(`is-${mode}`);
  const text = status.querySelector("span:last-child");
  if (text) text.textContent = label;
}

function stopStatePolling() {
  if (api.statePoller) {
    window.clearInterval(api.statePoller);
    api.statePoller = null;
  }
}

function startStatePolling() {
  stopStatePolling();
  api.statePoller = window.setInterval(async () => {
    if (!api.user) return;
    try {
      const response = await fetchStateWithAuth();
      const payload = await response.json();
      applyTripInfo(payload.tripInfo);
      applySharedState(payload.state);
      setSyncStatus("live", "Live sync");
    } catch {
      setSyncStatus("offline", "Sync error");
    }
  }, 15000);
}

async function connectSharedState() {
  if (!(await requireProfile())) {
    setSyncStatus("offline", "Sign in");
    return;
  }

  setSyncStatus("connecting", "Connecting");
  try {
    const response = await fetchStateWithAuth();
    if (!response.ok) throw new Error("Shared state unavailable");
    const payload = await response.json();
    applyTripInfo(payload.tripInfo);
    applySharedState(payload.state, { force: true });
    api.hasLoadedSharedState = true;
    setSyncStatus("live", "Live sync");
    startStatePolling();
  } catch {
    setSyncStatus("offline", api.user ? "Sync error" : "Sign in");
  }
}

async function performAction(type, payload, fallback, successMessage) {
  try {
    const response = await authAwareRequest("/action", {
      method: "POST",
      body: { type, payload, clientId: api.clientId }
    });
    if (response.status === 401 || response.status === 403) {
      const errorPayload = await response.json().catch(() => ({}));
      if (errorPayload.needsProfile) {
        showAuthScreen("Sign in to update the shared board.");
        setSyncStatus("offline", "Sign in");
        return false;
      }
      setSyncStatus("offline", "Sign in");
      showToast(errorPayload.message || "Sign in required.");
      return false;
    }
    const result = await response.json();
    if (result.tripInfo) applyTripInfo(result.tripInfo);
    if (result.state) applySharedState(result.state);
    showToast(response.ok ? (successMessage || result.message || "Saved for everyone.") : (result.message || "Could not save."));
    return response.ok;
  } catch {
    setSyncStatus("offline", "Sync error");
    showToast("Could not reach the shared board. Reconnect and try again.");
    return false;
  }
}

function familyById(id) {
  return families.find((family) => family.id === id);
}

function activeFamilyId() {
  if (isBearPowerUser()) return selectedFamily || api.user?.familyId || "";
  return api.user?.familyId || selectedFamily || "";
}

function isBearPowerUser(user = api.user) {
  return String(user?.personId || "").trim().toLowerCase() === "bear";
}

function canManageCustomItem(item) {
  const familyId = activeFamilyId();
  if (!item) return false;
  if (isBearPowerUser()) return true;
  if (!familyId) return false;
  const createdBy = item.createdBy || "";
  if (createdBy) return createdBy === familyId || item.owner === familyId;
  return !item.owner || item.owner === familyId;
}

function canAddSupplyForFamily(familyId) {
  if (!familyById(familyId)) return false;
  if (isBearPowerUser()) return true;
  const lockedFamilyId = api.user?.familyId || "";
  return lockedFamilyId ? familyId === lockedFamilyId : familyId === activeFamilyId();
}

function familyMembersLabel(familyId) {
  const labels = {
    shell: "Shell",
    nick: "Nick and Marissa",
    bear: "Bear and Jessica",
    nat: "Andy and Natalie"
  };
  return labels[familyId] || familyById(familyId)?.name || "Family";
}

function dayLabelShort(day) {
  return {
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
    mon: "Mon"
  }[day] || day;
}

function daysSummary(days = []) {
  if (!days.length) return "Any day / whole trip";
  return days.map(dayLabelShort).join(" · ");
}

function mealTypeDisplay(mealType) {
  return mealTypeLabels[mealTypeSafe(mealType)] || "Any meal / shared";
}

function bringingMealToneClass(mealType) {
  const normalized = mealTypeSafe(mealType);
  if (normalized === "breakfast") return "is-breakfast";
  if (normalized === "lunch") return "is-lunch";
  if (normalized === "dinner") return "is-dinner";
  return "is-shared";
}

function supplyPurposeValue(item = {}) {
  if (item.type === "table") return "non-food";
  return mealTypeSafe(item.mealType || "any");
}

function supplyPurposeLabel(item = {}) {
  if (item.type === "table") return "Non-food item";
  return mealTypeDisplay(item.mealType);
}

function supplyOwnerId(item = {}) {
  const owner = families.some((family) => family.id === item?.owner) ? item.owner : "";
  if (owner) return owner;
  const createdBy = families.some((family) => family.id === item?.createdBy) ? item.createdBy : "";
  return item?.custom && createdBy ? createdBy : "";
}

function bringingItemsForFamily(familyId) {
  return state.supplies.filter((item) => supplyOwnerId(item) === familyId);
}

function isMealAssignableItem(item = {}) {
  return ["food", "drink", "cold"].includes(String(item.type || "").toLowerCase());
}

function itemLinkedToMealSelection(item, day, mealType) {
  if (!isMealAssignableItem(item)) return false;
  const itemMealType = mealTypeSafe(item.mealType || "any");
  const days = Array.isArray(item.days) ? item.days : [];
  const matchesMeal = itemMealType === "any" || itemMealType === mealType;
  const matchesDay = !days.length || days.includes(day);
  return matchesMeal && matchesDay;
}

function bringingItemsForMeal(meal) {
  const mealType = meal.type.toLowerCase().includes("dessert")
    ? "dessert"
    : meal.type.toLowerCase().includes("breakfast")
      ? "breakfast"
      : meal.type.toLowerCase().includes("lunch")
        ? "lunch"
        : meal.type.toLowerCase().includes("pack")
          ? "pack-up"
          : "dinner";
  return state.supplies.filter((item) => {
    return itemLinkedToMealSelection(item, meal.day, mealType);
  });
}

function bringingImageMarkup(item) {
  if (!item.image) return "";
  return `<img class="bringing-thumb" src="${item.image}" alt="${escapeText(item.name)}">`;
}

function bringingMetaMarkup(item) {
  const quantity = item.qty ? ` · ${escapeText(item.qty)}` : "";
  const note = item.notes ? ` · ${escapeText(item.notes)}` : "";
  const toneClass = bringingMealToneClass(item.mealType);
  return `
    <div class="bringing-inline-meta">
      <span class="bringing-chip ${toneClass}">${escapeText(supplyPurposeLabel(item))}</span>
      <span class="bringing-inline-summary">${escapeText(daysSummary(item.days))}${quantity}${note}</span>
    </div>
  `;
}

function mealPlanningItemsMarkup(meal) {
  const items = bringingItemsForMeal(meal);
  if (!items.length) {
    return `<span class="meta-chip">No bringing items linked yet</span>`;
  }
  return items.map((item) => `<span class="meta-chip">${escapeText(item.name)}</span>`).join("");
}

function availableItemsForMealSelection(day, type) {
  const mealType = mealTypeKey({ type });
  return state.supplies
    .filter((item) => {
      const itemMealType = mealTypeSafe(item.mealType || "any");
      if (!isMealAssignableItem(item)) return false;
      if (itemMealType !== mealType) return false;
      return !itemLinkedToMealSelection(item, day, mealType);
    })
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
}

function mealAvailableRow(item, options = {}) {
  const family = familyById(supplyOwnerId(item));
  const familyName = family?.name || "Not assigned";
  const familyColor = family?.color || "#6e6e73";
  const action = options.action
    ? `<span class="meal-add-actions">
        <span class="meal-family-pill">${escapeText(familyName)}</span>
        <button class="meal-add-button" type="button" data-add-meal-supply="${escapeText(item.id)}">${escapeText(options.action)}</button>
      </span>`
    : `<span class="meal-family-pill">${escapeText(familyName)}</span>`;
  return `<li class="meal-available-row${options.muted ? " is-muted" : ""}" style="--owner-color:${escapeText(familyColor)}">
    <span class="meal-available-dot" aria-hidden="true"></span>
    <span class="meal-available-copy">
      <strong>${escapeText(item.name)}</strong>
      <small>${escapeText(options.status || familyName)}</small>
    </span>
    ${action}
  </li>`;
}

function renderMealAvailablePanel() {
  const panel = document.querySelector("#mealAvailablePanel");
  if (!panel) return;
  const day = document.querySelector("#mealIdeaDay")?.value || "sun";
  const type = document.querySelector("#mealIdeaType")?.value || "Meal";
  const mealType = mealTypeKey({ type });
  const label = mealTypeDisplay(mealType).replace("Dessert / Snacks", "Dessert");
  const alreadyItems = state.supplies
    .filter((item) => itemLinkedToMealSelection(item, day, mealType))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
  const availableItems = availableItemsForMealSelection(day, type);
  const dayLabel = dayMeta[day]?.dayLabel || "Selected day";
  panel.innerHTML = `
    <div class="meal-available-head">
      <strong>${escapeText(dayLabel)} ${escapeText(label)}</strong>
      <span>Edit what belongs to this meal</span>
    </div>
    <section class="meal-available-section is-current">
      <h3>Already set up for ${escapeText(label)}</h3>
      ${alreadyItems.length
        ? `<ul class="meal-available-list">${alreadyItems.map((item) => mealAvailableRow(item, { status: familyById(supplyOwnerId(item))?.name || "Not assigned" })).join("")}</ul>`
        : `<p class="meal-available-empty">Nothing is set up for this ${escapeText(label.toLowerCase())} yet.</p>`}
    </section>
    <section class="meal-available-section is-addable">
      <h3>Available to add</h3>
      ${availableItems.length
        ? `<ul class="meal-available-list">${availableItems.map((item) => mealAvailableRow(item, {
            muted: true,
            status: `Unavailable for ${dayLabel}`,
            action: "Add"
          })).join("")}</ul>`
        : `<p class="meal-available-empty">No extra ${escapeText(label.toLowerCase())} items are waiting to be added.</p>`}
    </section>
  `;
}

function insertIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const key = node.getAttribute("data-icon");
    node.innerHTML = icons[key] || icons.plus;
  });
}

function ownerMarkup(ownerId) {
  if (!ownerId) return "";
  const family = familyById(ownerId);
  return `<span class="claimed-pill ${ownerId}">${escapeText(family?.name || "Claimed")}</span>`;
}

function mealClaimAction(meal) {
  const owner = meal.owner ? familyById(meal.owner) : null;
  const isOwnClaim = Boolean(meal.owner && meal.owner === activeFamilyId());
  if (!meal.owner) {
    return `<button class="claim-button" type="button" data-claim-meal="${meal.id}">Claim this meal</button>`;
  }
  if (isOwnClaim) {
    return `<button class="claim-button" type="button" data-claim-meal="${meal.id}" aria-label="Unclaim ${escapeText(meal.type)}">Unclaim</button>`;
  }
  return `<button class="claim-button" type="button" disabled aria-label="Claimed by ${escapeText(owner?.name || "another family")}">Claimed</button>`;
}

function isCustomMeal(item) {
  return /^meal-\d+/.test(String(item?.id || ""));
}

function isCustomSupply(item) {
  return /^supply-\d+/.test(String(item?.id || ""));
}

function editIconButton(kind, id, label) {
  const escapedId = escapeText(id);
  const escapedLabel = escapeText(label);
  const dataAttr = kind === "meal" ? "data-edit-meal" : "data-edit-supply";
  return `
    <button class="edit-icon-button" type="button" ${dataAttr}="${escapedId}" aria-label="${escapedLabel}" title="${escapedLabel}">
      <span data-icon="edit"></span>
    </button>
  `;
}

function itemManageActions(kind, item) {
  const escapedId = escapeText(item.id);
  if (kind === "meal") {
    const editLabel = isNonFoodEvent(item) ? "Edit event" : "Edit meal";
    return `
      <div class="item-manage-actions" aria-label="Manage meal">
        ${editIconButton("meal", item.id, editLabel)}
        ${isCustomMeal(item) && canManageCustomItem(item) ? `<button class="text-mini-button danger" type="button" data-delete-meal="${escapedId}">Delete</button>` : ""}
      </div>
    `;
  }
  if (!canManageCustomItem(item)) return "";
  return `
    <div class="item-manage-actions" aria-label="Manage bringing item">
      ${editIconButton("supply", item.id, "Edit item")}
      <button class="text-mini-button danger" type="button" data-delete-supply="${escapedId}">Delete</button>
    </div>
  `;
}

function mealIcon(type) {
  const normalized = type.toLowerCase();
  if (normalized.includes("event")) return "calendar";
  if (normalized.includes("breakfast") || normalized.includes("lunch")) return "sun";
  if (normalized.includes("dinner")) return "moon";
  if (normalized.includes("dessert")) return "dessert";
  return "bag";
}

function isNonFoodEvent(item) {
  return String(item?.type || "").trim().toLowerCase() === "event";
}

function renderMealPreview() {
  const container = document.querySelector("#mealPreview");
  if (!container) return;
  const meals = state.meals.filter((meal) => meal.day === selectedDay && !isNonFoodEvent(meal));
  container.innerHTML = meals.map((meal) => `
    <article class="meal-row">
      <span class="meal-icon" data-icon="${mealIcon(meal.type)}"></span>
      <div class="meal-name">
        <strong>${escapeText(meal.type)}</strong>
        <span>${escapeText(meal.idea)}</span>
      </div>
      <div class="meal-time">
        <strong>${escapeText(meal.time)}</strong>
        <span>Kids: ${escapeText(meal.kids)}</span>
      </div>
      ${meal.owner ? ownerMarkup(meal.owner) : ""}
      ${mealClaimAction(meal).replace("Claim this meal", "Claim this slot")}
    </article>
  `).join("");
  insertIcons();
}

function renderMealBoard() {
  const container = document.querySelector("#mealBoard");
  if (!container) return;
  const days = [
    ["wed", "Wednesday", "July 1"],
    ["thu", "Thursday", "July 2"],
    ["fri", "Friday", "July 3"],
    ["sat", "Saturday", "July 4"],
    ["sun", "Sunday", "July 5"],
    ["mon", "Monday", "July 6"]
  ];
  container.innerHTML = days.map(([day, label, date]) => {
    const rows = state.meals.filter((meal) => meal.day === day && !isNonFoodEvent(meal)).map((meal) => `
      <article class="meal-row">
        <div class="meal-name">
          <strong>${escapeText(meal.type)}</strong>
          <span>${escapeText(meal.idea || "No recipe set yet.")}</span>
        </div>
        <div class="meal-meta">
          <span class="meta-chip">${escapeText(meal.time)}</span>
          ${meal.kids ? `<span class="meta-chip">Kids: ${escapeText(meal.kids)}</span>` : ""}
          ${mealPlanningItemsMarkup(meal)}
        </div>
        <div class="meal-row-actions">
          ${itemManageActions("meal", meal)}
        </div>
      </article>
    `).join("");
    return `
      <section class="meal-day-card">
        <header class="meal-day-header">
          <strong>${label}</strong>
          <span>${date}</span>
        </header>
        ${rows || `<article class="meal-row meal-row-empty"><div class="meal-name"><strong>No meal yet</strong><span>This day is still open.</span></div></article>`}
      </section>
    `;
  }).join("");
  insertIcons();
}

function logisticsForFamily(familyId) {
  const response = state.familyResponses?.[familyId] || {};
  const fallback = defaultLogistics[familyId] || {};
  return {
    arrival: response.arrival || fallback.arrival || "Not set",
    leaving: response.leaving || fallback.leaving || "Not set",
    note: fallback.note || ""
  };
}

function familyTravelLabel(familyId) {
  const labels = {
    shell: "Shell",
    nick: "G6",
    bear: "Jear",
    nat: "Riggs"
  };
  return labels[familyId] || familyById(familyId)?.name || "Family";
}

function matchesTravelDay(value, day) {
  const normalized = String(value || "").trim().toLowerCase();
  const dayWords = {
    wed: "wednesday",
    thu: "thursday",
    fri: "friday",
    sat: "saturday",
    sun: "sunday",
    mon: "monday"
  };
  return Boolean(normalized && dayWords[day] && normalized.includes(dayWords[day]));
}

function buildTravelEntries(day) {
  const entries = [];
  families.forEach((family) => {
    const logistics = logisticsForFamily(family.id);
    if (matchesTravelDay(logistics.arrival, day)) {
      entries.push({
        type: "arrival",
        title: `${familyTravelLabel(family.id)} arrival`,
        detail: logistics.arrival
      });
    }
  });

  if (day === "mon") {
    entries.push({
      type: "departure",
      title: "Everyone leaves",
      detail: "Monday morning"
    });
  }
  return entries;
}

function timingOptionsMarkup(selected, options) {
  return options.map((option) => `
    <option value="${escapeText(option)}" ${selected === option ? "selected" : ""}>${escapeText(option)}</option>
  `).join("");
}

function renderCalendarBoard() {
  const container = document.querySelector("#calendarBoard");
  if (!container) return;
  const days = [
    ["wed", "Wednesday", "July 1"],
    ["thu", "Thursday", "July 2"],
    ["fri", "Friday", "July 3"],
    ["sat", "Saturday", "July 4"],
    ["sun", "Sunday", "July 5"],
    ["mon", "Monday", "July 6"]
  ];
  container.innerHTML = days.map(([day, label, date]) => {
    const travelEntries = buildTravelEntries(day);
    const mealEntries = state.meals.filter((meal) => meal.day === day && !isNonFoodEvent(meal));
    const eventEntries = state.meals.filter((meal) => meal.day === day && isNonFoodEvent(meal));
    return `
      <section class="calendar-day-card day-${day}">
        <div class="cal-day-photo" aria-hidden="true"></div>
        <header class="calendar-day-header">
          <strong>${label}</strong>
          <span>${date}</span>
        </header>
        <div class="calendar-day-grid">
          ${travelEntries.length ? travelEntries.map((item) => `
            <article class="calendar-slot calendar-slot-travel">
              <span class="calendar-slot-kind">${item.type === "departure" ? "Departure" : "Arrival"}</span>
              <strong>${escapeText(item.title)}</strong>
              <span class="calendar-slot-time">${escapeText(item.detail)}</span>
              ${item.type === "departure" ? "" : `<div class="item-manage-actions"><button class="edit-icon-button" type="button" data-open-arrival aria-label="Edit arrival timing" title="Edit arrival timing"><span data-icon="edit"></span></button></div>`}
            </article>
          `).join("") : `
            <article class="calendar-slot calendar-slot-empty">
              <span class="calendar-slot-kind">Travel</span>
              <strong>?</strong>
              <span class="calendar-slot-time">No arrival listed</span>
              <div class="item-manage-actions"><button class="edit-icon-button" type="button" data-open-arrival aria-label="Set arrival timing" title="Set arrival timing"><span data-icon="edit"></span></button></div>
            </article>
          `}
          ${eventEntries.map((meal) => `
            <article class="calendar-slot calendar-slot-event">
              <span class="calendar-slot-kind">Event</span>
              <strong>${escapeText(meal.idea || "No event name yet")}</strong>
              <span class="calendar-slot-time">${escapeText(meal.kids || meal.time || "Time TBD")}</span>
              ${itemManageActions("meal", meal)}
            </article>
          `).join("")}
          ${mealEntries.map((meal) => `
            <article class="calendar-slot">
              <span class="calendar-slot-kind">${escapeText(meal.type)}</span>
              <strong>${escapeText(meal.idea || "No meal plan yet")}</strong>
              <span class="calendar-slot-time">${escapeText(meal.time)}${bringingItemsForMeal(meal).length ? ` · ${escapeText(bringingItemsForMeal(meal).map((item) => item.name).join(", "))}` : ""}</span>
              ${itemManageActions("meal", meal)}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderOpenMeals() {
  const container = document.querySelector("#openMealList");
  if (!container) return;
  const mealsToFinish = state.meals.filter((meal) => !isNonFoodEvent(meal) && (!meal.idea || !bringingItemsForMeal(meal).length));
  if (!mealsToFinish.length) {
    container.innerHTML = `
      <article class="needed-row">
        <div>
          <strong>Every meal has a plan</strong>
          <span>The calendar and meal board are already filled in.</span>
        </div>
      </article>
    `;
    return;
  }
  container.innerHTML = mealsToFinish.map((meal) => `
    <article class="needed-row">
      <div>
        <strong>${escapeText(meal.dayLabel)} ${escapeText(meal.type)}</strong>
        <span>${escapeText(meal.idea || "Recipe still blank")}${bringingItemsForMeal(meal).length ? ` · ${escapeText(bringingItemsForMeal(meal).map((item) => item.name).join(", "))}` : " · No bringing items linked yet"}</span>
      </div>
      ${editIconButton("meal", meal.id, "Edit meal")}
    </article>
  `).join("");
}

function renderCalendarEventList() {
  const container = document.querySelector("#calendarEventList");
  if (!container) return;
  const events = state.meals.filter((meal) => isNonFoodEvent(meal));
  if (!events.length) {
    container.innerHTML = `
      <article class="needed-row">
        <div>
          <strong>No calendar events yet</strong>
          <span>Use Add Non-Food Event to put parade times, outings, or plans on the calendar.</span>
        </div>
      </article>
    `;
    return;
  }
  container.innerHTML = events.map((meal) => `
    <article class="needed-row">
      <div>
        <strong>${escapeText(meal.dayLabel)} · ${escapeText(meal.idea || "Untitled event")}</strong>
        <span>${escapeText(meal.kids || meal.time || "Time TBD")}</span>
      </div>
      <div class="calendar-event-actions">
        ${editIconButton("meal", meal.id, "Edit event")}
        ${isCustomMeal(meal) && canManageCustomItem(meal) ? `<button class="claim-button danger-outline" type="button" data-delete-meal="${meal.id}">Delete</button>` : ""}
      </div>
    </article>
  `).join("");
}

function renderChecklist(containerId, items) {
  const container = document.querySelector(containerId);
  if (!container) return;
  container.innerHTML = items.map((item) => {
    const checked = Boolean(state.checklists?.[item.id]);
    return `
      <label class="${checked ? "is-checked" : ""}">
        <input type="checkbox" data-checklist="${item.id}" ${checked ? "checked" : ""}>
        <span>${escapeText(item.label)}</span>
      </label>
    `;
  }).join("");
}

function renderSupplies() {
  const container = document.querySelector("#supplyList");
  if (!container) return;
  const sorted = [...state.supplies].sort((a, b) => {
    const aOwner = supplyOwnerId(a);
    const bOwner = supplyOwnerId(b);
    if (!!aOwner === !!bOwner) return a.type.localeCompare(b.type);
    return aOwner ? 1 : -1;
  });
  if (!sorted.length) {
    container.innerHTML = `
      <article class="bringing-row bringing-row-empty">
        <div>
          <strong>No shared items yet</strong>
          <span>Add staples, drinks, paper goods, or extras here.</span>
        </div>
      </article>
    `;
    return;
  }
  container.innerHTML = sorted.map((item) => {
    const ownerId = supplyOwnerId(item);
    const owner = ownerId ? familyById(ownerId) : null;
    const isOwnClaim = Boolean(ownerId && ownerId === activeFamilyId());
    return `
      <article class="supply-row ${ownerId ? "is-claimed" : ""}">
        <div>
          <span class="supply-type">${escapeText(item.type)}</span>
          <strong>${escapeText(item.name)}</strong>
          <span>${item.qty ? `${escapeText(item.qty)} · ` : ""}${owner ? escapeText(owner.name) : "Unclaimed"}</span>
          ${itemManageActions("supply", item)}
        </div>
        <button
          class="claim-button"
          type="button"
          data-claim-supply="${item.id}"
          ${owner && !isOwnClaim ? "disabled" : ""}
          aria-label="${owner && !isOwnClaim ? `Claimed by ${owner.name}` : isOwnClaim ? "Unclaim item" : "Claim item"}">
          ${isOwnClaim ? "Unclaim" : owner ? "Claimed" : "Claim"}
        </button>
      </article>
    `;
  }).join("");
}

function collectClaimsByFamily(familyId) {
  return bringingItemsForFamily(familyId).map((item) => ({
    id: item.id,
    mealType: item.mealType,
    title: item.name,
    detail: `${mealTypeDisplay(item.mealType)} · ${daysSummary(item.days)}`,
    note: item.notes || ""
  }));
}

function renderBringingBoard() {
  const myClaims = document.querySelector("#myClaimsList");
  const byFamily = document.querySelector("#bringingByFamily");
  if (!myClaims && !byFamily) return;

  const familyId = activeFamilyId();
  const ownClaims = familyId ? collectClaimsByFamily(familyId) : [];
  if (myClaims) {
    myClaims.innerHTML = ownClaims.length
      ? ownClaims.map((item) => `
        <article class="bringing-row ${bringingMealToneClass(item.mealType)}">
          <div class="bringing-row-main">
            ${bringingImageMarkup(state.supplies.find((entry) => entry.id === item.id) || {})}
            <div>
            <strong>${escapeText(item.title)}</strong>
            ${bringingMetaMarkup(state.supplies.find((entry) => entry.id === item.id) || {})}
            </div>
          </div>
          <div class="bringing-row-actions">
            ${editIconButton("supply", item.id, "Edit item")}
            <button class="claim-button" type="button" data-delete-supply="${item.id}">Delete</button>
          </div>
        </article>
      `).join("")
      : `
        <article class="bringing-row bringing-row-empty">
          <div>
            <strong>No items added yet</strong>
            <span>Add what you are bringing and tag the days it supports.</span>
          </div>
        </article>
      `;
  }

  if (byFamily) {
    const visibleFamilies = familyId
      ? families.filter((family) => family.id !== familyId)
      : families;
    byFamily.innerHTML = visibleFamilies.map((family) => {
      const claims = collectClaimsByFamily(family.id);
      return `
        <section class="bringing-group">
          <header class="bringing-group-header">
            <div>
              <strong>${escapeText(family.name)}</strong>
              <span>${claims.length ? `${claims.length} item${claims.length === 1 ? "" : "s"}` : "Nothing added yet"}</span>
            </div>
            <i class="family-swatch" style="background:${family.color}" aria-hidden="true"></i>
          </header>
          <div class="bringing-group-list">
            ${claims.length
              ? claims.map((item) => `
                <article class="bringing-row ${bringingMealToneClass(item.mealType)}">
                  <div class="bringing-row-main">
                    ${bringingImageMarkup(state.supplies.find((entry) => entry.id === item.id) || {})}
                    <div>
                    <strong>${escapeText(item.title)}</strong>
                    ${bringingMetaMarkup(state.supplies.find((entry) => entry.id === item.id) || {})}
                    </div>
                  </div>
                </article>
              `).join("")
              : `
                <article class="bringing-row bringing-row-empty">
                  <div>
                    <strong>Nothing here yet</strong>
                    <span>No bringing items added yet.</span>
                  </div>
                </article>
              `}
          </div>
        </section>
      `;
    }).join("");
  }
}

function renderLogistics() {
  const familyList = document.querySelector("#logisticsFamilyList");
  const promptList = document.querySelector("#logisticsPromptList");
  const familyId = activeFamilyId();
  if (!familyId) {
    if (familyList) {
      familyList.innerHTML = `
        <article class="bringing-row bringing-row-empty">
          <div>
            <strong>Sign in first</strong>
            <span>Log in so we know which household timing to update.</span>
          </div>
        </article>
      `;
    }
    if (promptList) {
      promptList.innerHTML = "";
      promptList.classList.add("is-hidden");
    }
    return;
  }
  const logistics = logisticsForFamily(familyId);
  if (familyList) {
    const family = familyById(familyId);
    const firstName = api.user?.firstName || family?.name || "Your login";
    familyList.innerHTML = `
      <section class="bringing-group logistics-card">
        <div class="logistics-person">
          <strong>${escapeText(firstName)}</strong>
          <span>Family</span>
          <b class="logistics-family-name">${escapeText(family?.name || "Your family")}</b>
        </div>
        <article class="bringing-row logistics-row">
          <div class="logistics-row-main">
            <strong>Showing up ${escapeText(logistics.arrival)}</strong>
            <button class="text-mini-button" type="button" data-open-logistics-edit="arrival">Update</button>
          </div>
          ${logisticsEditMode === "arrival" ? `
            <div class="logistics-inline-editor">
              <select id="logisticsArrivalSelect">
                ${timingOptionsMarkup(logistics.arrival, arrivalOptions)}
              </select>
              <div class="logistics-inline-actions">
                <button class="text-mini-button" type="button" data-save-logistics-edit="arrival">Save</button>
                <button class="text-mini-button" type="button" data-cancel-logistics-edit>Cancel</button>
              </div>
            </div>
          ` : ""}
        </article>
        <article class="bringing-row logistics-row">
          <div class="logistics-row-main">
            <strong>Leaving ${escapeText(logistics.leaving)}</strong>
            <button class="text-mini-button" type="button" data-open-logistics-edit="leaving">Update</button>
          </div>
          ${logisticsEditMode === "leaving" ? `
            <div class="logistics-inline-editor">
              <select id="logisticsLeavingSelect">
                ${timingOptionsMarkup(logistics.leaving, leavingOptions)}
              </select>
              <div class="logistics-inline-actions">
                <button class="text-mini-button" type="button" data-save-logistics-edit="leaving">Save</button>
                <button class="text-mini-button" type="button" data-cancel-logistics-edit>Cancel</button>
              </div>
            </div>
          ` : ""}
        </article>
      </section>
    `;
  }
  if (promptList) {
    promptList.innerHTML = "";
    promptList.classList.add("is-hidden");
  }
}

function openLogisticsEdit(mode) {
  logisticsEditMode = logisticsEditMode === mode ? "" : mode;
  renderLogistics();
}

function saveLogisticsTiming(mode = logisticsEditMode) {
  const familyId = activeFamilyId();
  if (!familyId) {
    showToast("Sign in first.");
    return;
  }
  const existing = state.familyResponses?.[familyId] || {};
  const logistics = logisticsForFamily(familyId);
  const arrival = mode === "arrival"
    ? (document.querySelector("#logisticsArrivalSelect")?.value || logistics.arrival || "")
    : (existing.arrival || logistics.arrival || "");
  const leaving = mode === "leaving"
    ? (document.querySelector("#logisticsLeavingSelect")?.value || logistics.leaving || "")
    : (existing.leaving || logistics.leaving || "");
  performAction("checkin", {
    familyId,
    arrival,
    leaving,
    kidFood: existing.kidFood || "",
    allergies: existing.allergies || "",
    gear: existing.gear || []
  }, () => {
    state.familyChecks[familyId] = true;
    state.familyResponses[familyId] = {
      ...existing,
      arrival,
      leaving,
      updatedAt: new Date().toISOString()
    };
  }, "Timing updated.");
  logisticsEditMode = "";
}

function cancelLogisticsEdit() {
  logisticsEditMode = "";
  renderLogistics();
}

function renderTopNeeded() {
  const container = document.querySelector("#topNeeded");
  if (!container) return;
  const openMeals = state.meals.filter((meal) => !isNonFoodEvent(meal) && !meal.owner).map((meal) => ({
    id: meal.id,
    title: `${meal.dayLabel} ${meal.type}`,
    detail: meal.idea,
    action: "meal"
  }));
  const openSupplies = state.supplies.filter((item) => !supplyOwnerId(item)).map((item) => ({
    id: item.id,
    title: item.name,
    detail: `${item.qty} · ${item.type}`,
    action: "supply"
  }));
  const needed = [...openMeals, ...openSupplies];
  if (!needed.length) {
    container.innerHTML = `
      <article class="needed-row">
        <div>
          <strong>Everything is covered</strong>
          <span>No open meals or supplies right now.</span>
        </div>
      </article>
    `;
    return;
  }
  container.innerHTML = needed.map((item) => `
    <article class="needed-row">
      <div>
        <strong>${escapeText(item.title)}</strong>
        <span>${escapeText(item.detail)}</span>
      </div>
      ${item.action === "meal"
        ? `<button class="claim-button" type="button" data-claim-meal="${item.id}">Claim</button>`
        : `<button class="claim-button" type="button" data-claim-supply="${item.id}">Claim</button>`}
    </article>
  `).join("");
}

function activityIconMarkup(activity) {
  const key = activity.icon === "lake" ? "mountain" : activity.icon === "trees" ? "mountain" : activity.icon;
  return icons[key] || icons.mountain;
}

function renderGuideHighlights() {
  const container = document.querySelector("#guideHighlights");
  if (!container) return;
  container.innerHTML = guideHighlights.map((item) => `
    <article class="guide-highlight">
      <span>${escapeText(item.label)}</span>
      <strong>${escapeText(item.value)}</strong>
      <p>${escapeText(item.detail)}</p>
    </article>
  `).join("");
}

function renderCabinActivityList() {
  const container = document.querySelector("#nearbyOutingList");
  if (!container) return;
  container.innerHTML = nearbyOutings.map((item) => `
    <article class="cabin-activity-card">
      <span class="activity-thumb cabin-activity-thumb">${activityIconMarkup(item)}</span>
      <div class="cabin-activity-copy">
        <span class="activity-rank">${escapeText(item.category)}</span>
        <strong>${escapeText(item.name)}</strong>
        <span class="cabin-activity-when">${escapeText(item.drive)} · ${escapeText(item.when || "Check current hours")}</span>
        <span class="cabin-activity-worth">${escapeText(item.verdict)}</span>
        <span>${escapeText(item.note)}</span>
        <div class="cabin-activity-links">
          <a class="text-mini-button cabin-link-button" href="${item.websiteUrl}" target="_blank" rel="noreferrer">Website</a>
          <a class="text-mini-button cabin-link-button" href="${item.mapUrl}" target="_blank" rel="noreferrer">Google Maps</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderNearbyFoodList() {
  const container = document.querySelector("#nearbyFoodList");
  if (!container) return;
  container.innerHTML = nearbyFoodSpots.map((item) => `
    <article class="cabin-activity-card">
      <span class="activity-thumb cabin-activity-thumb">${activityIconMarkup(item)}</span>
      <div class="cabin-activity-copy">
        <span class="activity-rank">${escapeText(item.category)}</span>
        <strong>${escapeText(item.name)}</strong>
        <span class="cabin-activity-when">${escapeText(item.drive)}</span>
        <span class="cabin-activity-worth">${escapeText(item.verdict)}</span>
        <span>${escapeText(item.note)}</span>
        <div class="cabin-activity-links">
          <a class="text-mini-button cabin-link-button" href="${item.websiteUrl}" target="_blank" rel="noreferrer">Website</a>
          <a class="text-mini-button cabin-link-button" href="${item.mapUrl}" target="_blank" rel="noreferrer">Google Maps</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderTodoThingsToDo() {
  const container = document.querySelector("#todoThingsToDoList");
  if (!container) return;
  const grouped = cabinThingsToDo.reduce((groups, item) => {
    if (!groups.has(item.category)) groups.set(item.category, []);
    groups.get(item.category).push(item);
    return groups;
  }, new Map());

  container.innerHTML = Array.from(grouped.entries()).map(([category, items]) => `
    <section class="todo-activity-group" aria-label="${escapeText(category)}">
      <div class="todo-activity-group-heading">
        <h3>${escapeText(category)}</h3>
        <span>${items.length} ${items.length === 1 ? "idea" : "ideas"}</span>
      </div>
      <div class="todo-activity-list">
        ${items.map((item) => `
          <article class="cabin-activity-card todo-link-card">
            <span class="activity-thumb cabin-activity-thumb">${activityIconMarkup(item)}</span>
            <div class="cabin-activity-copy">
              <span class="activity-rank">${escapeText(item.category)}</span>
              <strong>${escapeText(item.name)}</strong>
              <span class="cabin-activity-when">${escapeText(item.when || "Check current hours")}</span>
              <span>${escapeText(item.note)}</span>
              <div class="cabin-activity-links">
                <a class="text-mini-button cabin-link-button" href="${item.websiteUrl}" target="_blank" rel="noreferrer">Website</a>
                <a class="text-mini-button cabin-link-button" href="${item.mapUrl}" target="_blank" rel="noreferrer">Google Maps</a>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function isGameSupply(item = {}) {
  const text = `${item.id || ""} ${item.name || ""} ${item.notes || ""} ${item.qty || ""}`.toLowerCase();
  return String(item.type || "").toLowerCase() === "gear" &&
    /\b(game|games|board|card|cards|cranium|charades|cornhole|dice|puzzle|puzzles)\b/.test(text);
}

function renderTodoViewTabs() {
  document.querySelectorAll("[data-todo-view]").forEach((button) => {
    const selected = button.dataset.todoView === todoView;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", selected ? "true" : "false");
  });
  document.querySelectorAll("[data-todo-pane]").forEach((pane) => {
    pane.classList.toggle("is-hidden", pane.dataset.todoPane !== todoView);
  });
}

function renderTodoGamesByFamily() {
  const container = document.querySelector("#todoGamesByFamily");
  if (!container) return;
  const gameMap = new Map(defaultSupplies.filter(isGameSupply).map((item) => [item.id, normalizeSupplyItem(item)]));
  state.supplies.filter(isGameSupply).forEach((item) => {
    gameMap.set(item.id, normalizeSupplyItem(item));
  });
  const games = Array.from(gameMap.values());
  container.innerHTML = families.map((family) => {
    const familyGames = games.filter((item) => supplyOwnerId(item) === family.id);
    return `
      <article class="todo-family-games-card" style="--family-color:${family.color}">
        <div class="todo-family-games-head">
          <div>
            <span class="activity-rank">Family</span>
            <strong>${escapeText(family.shortName || family.name)}</strong>
          </div>
          <span>${familyGames.length} ${familyGames.length === 1 ? "game" : "games"}</span>
        </div>
        ${familyGames.length
          ? `<div class="todo-game-list">
              ${familyGames.map((game) => `
                <div class="todo-game-row">
                  <span class="activity-thumb todo-game-thumb">${icons.bag}</span>
                  <div>
                    <strong>${escapeText(game.name)}</strong>
                    <span>${escapeText(game.notes || game.qty || "Game for the cabin")}</span>
                  </div>
                </div>
              `).join("")}
            </div>`
          : `<p class="todo-games-empty">No games listed yet.</p>`}
      </article>
    `;
  }).join("");
}

function renderTodoHub() {
  renderTodoViewTabs();
  renderTodoThingsToDo();
  renderTodoGamesByFamily();
}

function renderActivityPreview() {
  const container = document.querySelector("#activityPreview");
  if (!container) return;
  container.innerHTML = activities.slice(0, 3).map((activity) => `
    <article class="activity-card">
      <span class="activity-thumb">${activityIconMarkup(activity)}</span>
      <div>
        <strong>${escapeText(activity.name)}</strong>
        <span>${escapeText(activity.notes)}</span>
      </div>
      ${activityVoteButton(activity, true)}
    </article>
  `).join("");
}

function renderActivityGrid() {
  const container = document.querySelector("#activityGrid");
  if (!container) return;
  const grouped = activities.reduce((groups, activity) => {
    if (!groups.has(activity.category)) groups.set(activity.category, []);
    groups.get(activity.category).push(activity);
    return groups;
  }, new Map());

  container.innerHTML = Array.from(grouped.entries()).map(([category, items]) => `
    <section class="activity-group" aria-label="${escapeText(category)}">
      <div class="activity-group-heading">
        <h2>${escapeText(category)}</h2>
        <span>${items.length} options</span>
      </div>
      <div class="activity-group-grid">
        ${items.map((activity) => `
          <article class="activity-card">
            <span class="activity-thumb">${activityIconMarkup(activity)}</span>
            <div class="activity-copy">
              <span class="activity-rank">${escapeText(activity.rank)}</span>
              <strong>${escapeText(activity.name)}</strong>
              <span>${escapeText(activity.notes)}</span>
              <dl class="activity-meta">
                <div>
                  <dt>Best for</dt>
                  <dd>${escapeText(activity.bestFor)}</dd>
                </div>
                <div>
                  <dt>Access</dt>
                  <dd>${escapeText(activity.access)}</dd>
                </div>
              </dl>
              <div class="activity-tags">
                ${activity.tags.map((tag) => `<span>${escapeText(tag)}</span>`).join("")}
              </div>
              ${activityVoteButton(activity)}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function renderFamilies() {
  const lockedFamilyId = isBearPowerUser() ? "" : (api.user?.familyId || "");
  const familyPanelTitle = document.querySelector("#familyPanelTitle");
  const familyPanelCopy = document.querySelector("#familyPanelCopy");
  const checkinFamilyTitle = document.querySelector("#checkinFamilyTitle");
  if (familyPanelTitle) familyPanelTitle.textContent = lockedFamilyId ? "Signed in family" : "Choose family";
  if (familyPanelCopy) {
    familyPanelCopy.textContent = isBearPowerUser()
      ? "Bear can manage every family from here."
      : lockedFamilyId
      ? "Claims, votes, and check-ins use your profile family. Sign out to switch."
      : "Sign in, then confirm your household.";
  }
  if (checkinFamilyTitle) checkinFamilyTitle.textContent = lockedFamilyId ? "Confirm your signed-in family" : "Which family are you?";

  const quickPicker = document.querySelector("#quickFamilyPicker");
  if (quickPicker) {
    quickPicker.innerHTML = families.map((family) => {
      const isLockedOut = Boolean(lockedFamilyId && family.id !== lockedFamilyId);
      return `
      <button class="quick-family ${selectedFamily === family.id ? "is-selected" : ""} ${isLockedOut ? "is-locked" : ""}" type="button" data-family="${family.id}" ${isLockedOut ? "disabled" : ""}>
        <i class="family-swatch" style="background:${family.color}" aria-hidden="true"></i>
        <span>${escapeText(family.shortName || family.name)}</span>
      </button>
    `;
    }).join("");
  }

  const grid = document.querySelector("#familiesGrid");
  if (grid) {
    grid.innerHTML = families.map((family) => {
      const response = state.familyResponses?.[family.id];
      const details = response
        ? `${escapeText(response.arrival || "Arrival TBD")} · ${escapeText(response.leaving || "Leaving TBD")}`
        : family.details;
      const kidFood = response?.kidFood ? `<span>Kids: ${escapeText(response.kidFood)}</span>` : "";
      return `
        <article class="family-card">
          <div class="family-color" style="background:${family.color}"></div>
          <strong>${escapeText(family.name)}</strong>
          <span>${escapeText(details)}</span>
          ${kidFood}
          <div class="family-status">${state.familyChecks[family.id] ? "Checked in" : family.status}</div>
        </article>
      `;
    }).join("");
  }

  const picker = document.querySelector("#familyPicker");
  if (picker) {
    picker.innerHTML = families.map((family) => {
      const isLockedOut = Boolean(lockedFamilyId && family.id !== lockedFamilyId);
      return `
      <button class="family-option ${selectedFamily === family.id ? "is-selected" : ""} ${isLockedOut ? "is-locked" : ""}" type="button" data-family="${family.id}" ${isLockedOut ? "disabled" : ""}>
        <span>
          <strong>${escapeText(family.name)}</strong>
          <span>${escapeText(isLockedOut ? "Sign out to switch to this family." : family.details)}</span>
        </span>
        <i class="family-swatch" style="background:${family.color}" aria-hidden="true"></i>
      </button>
    `;
    }).join("");
  }
}

function updateCounts() {
  const foodMeals = state.meals.filter((meal) => !isNonFoodEvent(meal));
  const mealClaimed = foodMeals.filter((meal) => meal.owner).length;
  const supplyClaimed = state.supplies.filter((item) => supplyOwnerId(item)).length;
  const openMeals = foodMeals.length - mealClaimed;
  const openSupplies = 0;
  const claimedTotal = mealClaimed + supplyClaimed;
  const neededTotal = openMeals + openSupplies;
  const myClaimTotal = activeFamilyId() ? bringingItemsForFamily(activeFamilyId()).length : 0;
  const missingCheckins = families.filter((family) => !state.familyChecks[family.id]).length;
  const coldCount = state.supplies.filter((item) => item.type === "cold" && supplyOwnerId(item)).length +
    state.meals.filter((meal) => meal.owner).reduce((count, meal) => count + Math.min((meal.cold || []).length, 2), 0);

  document.querySelectorAll("#mealClaimedCount").forEach((node) => { node.textContent = mealClaimed; });
  document.querySelectorAll("#supplyClaimedCount").forEach((node) => { node.textContent = supplyClaimed; });
  document.querySelectorAll("#openMealCount").forEach((node) => { node.textContent = openMeals; });
  document.querySelectorAll("#openSupplyCount").forEach((node) => { node.textContent = openSupplies; });
  document.querySelectorAll("#missingCheckinCount").forEach((node) => { node.textContent = missingCheckins; });
  document.querySelectorAll("#neededTotalCount").forEach((node) => { node.textContent = neededTotal; });
  document.querySelectorAll("#coveredTotalCount").forEach((node) => { node.textContent = claimedTotal; });
  document.querySelectorAll("#myClaimCount").forEach((node) => { node.textContent = myClaimTotal; });
  const coldNode = document.querySelector("#coldCount");
  if (coldNode) coldNode.textContent = coldCount;
  const coldMeter = document.querySelector("#coldMeter");
  if (coldMeter) coldMeter.style.width = `${Math.min(100, Math.round((coldCount / 18) * 100))}%`;
}

// ---- Food hub (per-day, per-meal coverage view) ----
const FOOD_DAY_ORDER = ["wed", "thu", "fri", "sat", "sun", "mon"];

function foodDaysWithMeals() {
  const present = new Set(state.meals.filter((m) => !isNonFoodEvent(m)).map((m) => m.day));
  const days = FOOD_DAY_ORDER.filter((d) => present.has(d));
  return days.length ? days : ["fri", "sat", "sun"];
}

function ensureFoodDay() {
  const days = foodDaysWithMeals();
  if (!foodDay || !days.includes(foodDay)) foodDay = days[0];
  return days;
}

function mealTypeKey(meal) {
  const t = String(meal?.type || "").toLowerCase();
  if (t.includes("dessert")) return "dessert";
  if (t.includes("breakfast")) return "breakfast";
  if (t.includes("lunch")) return "lunch";
  if (t.includes("pack")) return "pack-up";
  return "dinner";
}

function mealToneClass(meal) {
  return {
    breakfast: "tone-breakfast",
    lunch: "tone-lunch",
    dinner: "tone-dinner",
    dessert: "tone-dessert",
    "pack-up": "tone-shared"
  }[mealTypeKey(meal)] || "tone-shared";
}

function mealTypeShort(meal) {
  return {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    dessert: "Dessert",
    "pack-up": "Pack-up"
  }[mealTypeKey(meal)] || meal.type;
}

function foodDayName(day) {
  const label = dayMeta[day]?.fullLabel || dayMeta[day]?.dayLabel || day || "";
  return String(label).split(/\s+/)[0] || "Day";
}

function renderFoodDays() {
  const el = document.querySelector("#foodDays");
  if (!el) return;
  const days = ensureFoodDay();
  el.innerHTML = days.map((d) => {
    const parts = (dayMeta[d]?.dayLabel || d).split(" ");
    const short = parts[0];
    const date = parts.slice(1).join(" ");
    return `<button class="food-day ${d === foodDay ? "is-active" : ""}" type="button" data-food-day="${d}">
      <b>${escapeText(short)}</b><small>${escapeText(date)}</small></button>`;
  }).join("");
}

function renderFoodMealGrid() {
  const el = document.querySelector("#foodMealGrid");
  if (!el) return;
  ensureFoodDay();
  const order = { breakfast: 0, lunch: 1, dinner: 2, dessert: 3, "pack-up": 4 };
  const meals = state.meals
    .filter((m) => m.day === foodDay && !isNonFoodEvent(m))
    .sort((a, b) => (order[mealTypeKey(a)] ?? 9) - (order[mealTypeKey(b)] ?? 9));
  if (!meals.length) {
    el.innerHTML = `<div class="fh-empty">No meals planned for this day yet.</div>`;
    return;
  }
  el.innerHTML = meals.map((meal) => {
    const items = bringingItemsForMeal(meal);
    const bring = items.length
      ? `<ul class="fh-bring-list">${items.map((it) => {
          const fam = familyById(supplyOwnerId(it));
          const familyName = fam ? fam.name : "Not assigned yet";
          const familyColor = fam?.color || "#6e6e73";
          const editable = canManageCustomItem(it);
          return `<li class="fh-bring fh-food-row fh-food-row-simple" style="--owner-color:${escapeText(familyColor)}">
            <span class="fh-owner-dot" aria-hidden="true"></span>
            <span class="fh-food-copy">
              <strong class="fh-bring-name">${escapeText(it.name)}</strong>
              <span class="fh-who">${escapeText(supplyPurposeLabel(it))}</span>
            </span>
            <span class="fh-owner-trailing">
              <span class="fh-owner-badge">${escapeText(familyName)}</span>
              ${editable ? editIconButton("supply", it.id, `Edit ${it.name}`) : ""}
            </span>
          </li>`;
        }).join("")}</ul>`
      : `<div class="fh-empty-line">No one has added anything for this meal yet.</div>`;
    const mealTitle = `${foodDayName(meal.day)} ${mealTypeShort(meal)}`;

    return `<article class="fh-meal fh-meal-simple ${mealToneClass(meal)}">
      <header class="fh-top fh-meal-head">
        <span class="fh-meal-title-wrap">
          <h3>${escapeText(mealTitle)}</h3>
          ${meal.time ? `<span class="fh-time">${escapeText(meal.time)}</span>` : ""}
        </span>
        <span class="fh-meal-manage">${editIconButton("meal", meal.id, "Edit meal")}</span>
      </header>
      <div class="fh-meal-items">${bring}</div>
    </article>`;
  }).join("");
  insertIcons();
}

function renderFoodFamilyGrid() {
  const el = document.querySelector("#foodFamilyGrid");
  if (!el) return;
  const activeId = activeFamilyId();
  const ordered = [...families].sort((a, b) => (b.id === activeId ? 1 : 0) - (a.id === activeId ? 1 : 0));
  el.innerHTML = ordered.map((fam) => {
    const items = bringingItemsForFamily(fam.id);
    const isMine = fam.id === activeId;
    const canAddForFamily = canAddSupplyForFamily(fam.id);
    const body = items.length
      ? `<ul class="fh-fam-list">${items.map((it) => {
          const editable = canManageCustomItem(it);
          return `<li class="fh-fam-item${editable ? " is-editable" : ""}"${editable ? ` data-edit-supply="${escapeText(it.id)}"` : ""}>
            <span class="fh-bring-name">${escapeText(it.name)}</span>
            <span class="fh-tag">${escapeText(supplyPurposeLabel(it))}</span>
            ${editable ? `<span class="fh-edit-hint" data-icon="edit" aria-hidden="true"></span>` : ""}
          </li>`;
        }).join("")}</ul>`
      : `<div class="fh-empty-line">Nothing added yet.</div>`;
    return `<section class="fh-fam${isMine ? " is-mine" : ""}">
      <header class="fh-fam-head" style="background:${fam.color}">
        <b>${escapeText(fam.name)}</b>${isMine ? `<span class="fh-you">You</span>` : ""}
        <span class="fh-fam-count">${items.length} item${items.length === 1 ? "" : "s"}</span>
        ${canAddForFamily ? `<button class="fh-add-family-item" type="button" data-add-family-supply="${escapeText(fam.id)}">Add items</button>` : ""}
      </header>
      <div class="fh-fam-body">${body}</div>
    </section>`;
  }).join("");
  insertIcons();
}

function renderFoodHub() {
  const mealGrid = document.querySelector("#foodMealGrid");
  if (!mealGrid) return;
  const familyGrid = document.querySelector("#foodFamilyGrid");
  const foodDays = document.querySelector("#foodDays");
  const tabs = document.querySelector("#foodViewTabs");
  const addBar = document.querySelector("#trip-food .food-add-bar");
  const isFamilyView = foodView === "family";
  tabs?.classList.toggle("at-family", isFamilyView);
  document.querySelectorAll("[data-food-view]").forEach((button) => {
    const isActive = button.dataset.foodView === foodView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  foodDays?.classList.toggle("is-hidden", isFamilyView);
  mealGrid.classList.toggle("is-hidden", isFamilyView);
  familyGrid?.classList.toggle("is-hidden", !isFamilyView);
  addBar?.classList.toggle("is-hidden", !isFamilyView);
  if (isFamilyView) {
    renderFoodFamilyGrid();
    return;
  }
  renderFoodDays();
  renderFoodMealGrid();
}

function renderAll() {
  renderHomeHub();
  renderFamilyCalendar();
  renderFamilies();
  renderProfile();
  renderTripInfo();
  renderInstallPrompt();
  renderCalendarBoard();
  renderCalendarEventList();
  renderLogistics();
  renderChecklist("#shellQuestionList", shellChecklist);
  renderChecklist("#gearChecklistList", gearChecklist);
  renderMealPreview();
  renderOpenMeals();
  renderMealBoard();
  renderSupplies();
  renderBringingBoard();
  renderFoodHub();
  renderTodoHub();
  renderNearbyFoodList();
  renderCabinActivityList();
  renderGuideHighlights();
  renderActivityPreview();
  renderActivityGrid();
  updateCounts();
}

function updateMobileNav(activeTab) {
  const mobileNav = document.querySelector(".mobile-nav");
  if (!mobileNav) return;
  mobileNav.dataset.activePanel = activeTab;
  const visibleButtons = Array.from(document.querySelectorAll(".mobile-nav-item")).filter((button) => {
    const panels = String(button.dataset.mobilePanels || "").split(",").map((item) => item.trim()).filter(Boolean);
    const visible = !panels.length || panels.includes(activeTab);
    button.classList.toggle("is-hidden", !visible);
    return visible;
  });
  const isHomeOnly = visibleButtons.length <= 1;
  mobileNav.classList.toggle("is-home-only", isHomeOnly);
  mobileNav.style.gridTemplateColumns = `repeat(${Math.max(visibleButtons.length, 1)}, 1fr)`;
}

const panelHashes = {
  home: "home",
  "g-family": "g-family",
  "trip-food": "july-event",
  "trip-calendar": "calendar",
  todo: "todo",
  checkin: "checkin",
  cabin: "cabin",
  activities: "activities"
};
const hashPanels = Object.fromEntries(Object.entries(panelHashes).map(([panel, hash]) => [hash, panel]));

function panelFromHash() {
  const key = window.location.hash.replace(/^#/, "").trim();
  return hashPanels[key] || "";
}

function updatePanelHash(tab, mode = "push") {
  const hash = panelHashes[tab];
  if (!hash || window.location.hash === `#${hash}`) return;
  const nextUrl = `${window.location.pathname}${window.location.search}#${hash}`;
  if (mode === "replace") {
    window.history.replaceState(null, "", nextUrl);
    return;
  }
  window.history.pushState(null, "", nextUrl);
}

function updateHeroForPanel(activeTab) {
  const titleNode = document.querySelector("#heroTitle");
  const subtitleNode = document.querySelector("#heroSubtitle");
  const locationNode = document.querySelector("#heroLocationText");
  const tripLocation = tripInfo?.cityLabel || "Arnold, California";
  const tripHero = { subtitle: "4th of July 2026", location: tripLocation };
  const heroMap = {
    home: { title: "GRE Family App", subtitle: "Guantonio, Riggs, Eberly", location: "Family hub" },
    "g-family": { title: "G Family", subtitle: "Family calendar", location: "Shared family calendar" },
    "trip-food": { title: "4th of July 2026", subtitle: "July 1 - 6, 2026", location: tripLocation },
    "trip-calendar": { title: "Calendar Events", ...tripHero },
    todo: { title: "Things To Do", ...tripHero }
  };
  const hero = heroMap[activeTab] || heroMap.home;
  if (titleNode) titleNode.textContent = hero.title;
  if (subtitleNode) subtitleNode.textContent = hero.subtitle;
  if (locationNode) locationNode.textContent = hero.location;
}

function setActivePanel(tab, options = {}) {
  currentActivePanel = tab;
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.panel !== tab);
  });
  document.querySelectorAll(".nav-item[data-tab], .mobile-nav-item[data-tab], .home-destination-button[data-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tab);
  });
  updateHeroForPanel(tab);
  updateMobileNav(tab);
  if (!options.skipHash) updatePanelHash(tab, options.replaceHash ? "replace" : "push");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

function registerServiceWorker() {
  const isLocalPreview = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  if (isLocalPreview) {
    navigator.serviceWorker?.getRegistrations?.()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => {});
    return;
  }
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  navigator.serviceWorker.register("service-worker.js")
    .then((registration) => {
      if (registration.waiting) {
        waitingServiceWorker = registration.waiting;
        renderInstallPrompt();
      }
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            waitingServiceWorker = worker;
            renderInstallPrompt();
          }
        });
      });
    })
    .catch(() => {});

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (hasReloadedForServiceWorker) return;
    hasReloadedForServiceWorker = true;
    window.location.reload();
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("is-hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.add("is-hidden"), 2300);
}

function claimMeal(id) {
  const familyId = activeFamilyId();
  if (!familyId) {
    showToast("Sign in with your family first.");
    document.querySelector("#quickFamilyPicker")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const meal = state.meals.find((item) => item.id === id);
  if (!meal) return;
  if (meal.owner && meal.owner !== familyId) {
    showToast(`${meal.type} is already claimed by ${familyById(meal.owner)?.name || "another family"}.`);
    return;
  }
  const family = familyById(familyId);
  const willClaim = !meal.owner;
  performAction("claimMeal", { id, owner: familyId }, () => {
    meal.owner = willClaim ? familyId : "";
  }, willClaim ? `${family.name} claimed ${meal.type}.` : `${meal.type} moved back to open.`);
}

function claimSupply(id) {
  const familyId = activeFamilyId();
  if (!familyId) {
    showToast("Sign in with your family first.");
    document.querySelector("#quickFamilyPicker")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const item = state.supplies.find((supply) => supply.id === id);
  if (!item) return;
  const ownerId = supplyOwnerId(item);
  if (ownerId && ownerId !== familyId) {
    showToast(`${item.name} is already claimed by ${familyById(ownerId)?.name || "another family"}.`);
    return;
  }
  const willClaim = !ownerId;
  performAction("toggleSupply", { id, owner: familyId }, () => {
    item.owner = willClaim ? familyId : "";
  }, willClaim ? `${familyById(familyId).name} claimed ${item.name}.` : `${item.name} moved back to still needed.`);
}

function voteActivity(id) {
  const familyId = selectedFamily || api.user?.familyId || "";
  if (!familyId) {
    showToast("Pick your family first.");
    return;
  }
  performAction("voteActivity", { id }, () => {
    state.activityVoters = state.activityVoters || {};
    state.activityVoters[id] = state.activityVoters[id] || {};
    if (state.activityVoters[id][familyId]) {
      delete state.activityVoters[id][familyId];
      if (!Object.keys(state.activityVoters[id]).length) delete state.activityVoters[id];
      return;
    }
    state.activityVoters[id][familyId] = true;
  }, activityHasVote(id) ? "Vote removed." : "Vote added.");
}

function toggleChecklist(id, checked) {
  state.checklists ||= {};
  performAction("toggleChecklist", { id, checked }, () => {
    state.checklists[id] = checked;
  }, checked ? "Checklist item marked done." : "Checklist item reopened.");
}

function openDrawer() {
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  drawerStep = 1;
  updateDrawer();
  document.body.classList.add("drawer-open");
  document.querySelector("#drawerBackdrop").classList.remove("is-hidden");
  document.querySelector("#checkinDrawer").classList.remove("is-hidden");
  window.setTimeout(() => document.querySelector("#closeDrawer")?.focus(), 0);
}

function closeDrawer() {
  document.body.classList.remove("drawer-open");
  document.querySelector("#drawerBackdrop").classList.add("is-hidden");
  document.querySelector("#checkinDrawer").classList.add("is-hidden");
  lastFocusedElement?.focus?.();
  lastFocusedElement = null;
}

function updateDrawer() {
  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.toggle("is-hidden", Number(step.dataset.step) !== drawerStep);
  });
  const stepNode = document.querySelector("#drawerStep");
  const progress = document.querySelector("#drawerProgress");
  const prev = document.querySelector("#prevStep");
  const next = document.querySelector("#nextStep");
  if (stepNode) stepNode.textContent = drawerStep;
  if (progress) progress.style.width = `${drawerStep * 25}%`;
  if (prev) prev.disabled = drawerStep === 1;
  if (next) next.textContent = drawerStep === 4 ? "Submit check-in" : "Next";
}

function submitCheckin() {
  const familyId = activeFamilyId();
  if (!familyId) {
    drawerStep = 1;
    updateDrawer();
    showToast("Sign in with your family first.");
    return;
  }
  const gear = Array.from(document.querySelectorAll(".checkbox-grid input:checked")).map((input) => input.value);
  const payload = {
    familyId,
    arrival: document.querySelector("#arrivalDay")?.value || "",
    leaving: document.querySelector("#leavingDay")?.value || "",
    kidFood: document.querySelector("#kidFood")?.value || "",
    allergies: document.querySelector("#allergies")?.value || "",
    gear
  };
  performAction("checkin", payload, () => {
    state.familyChecks[familyId] = true;
    state.familyResponses[familyId] = {
      arrival: payload.arrival,
      leaving: payload.leaving,
      kidFood: payload.kidFood,
      allergies: payload.allergies,
      gear,
      updatedAt: new Date().toISOString()
    };
  }, `${familyById(familyId).name} check-in saved for everyone.`);
  closeDrawer();
}

function createMealIdea(payload) {
  const day = dayMeta[payload.day] ? payload.day : "sun";
  return {
    id: `meal-${Date.now()}`,
    day,
    dayLabel: dayMeta[day].dayLabel,
    type: payload.type || "Meal idea",
    time: payload.time || "Flexible",
    owner: "",
    idea: payload.idea,
    kids: payload.kids || (payload.type === "Event" ? "" : "Add kid backup"),
    cold: [],
    custom: true,
    createdBy: activeFamilyId(),
    createdAt: new Date().toISOString()
  };
}

function createSupplyItem(payload) {
  return {
    id: `supply-${Date.now()}`,
    name: payload.name,
    notes: payload.notes || "",
    qty: payload.quantity || payload.qty || "",
    type: payload.type || "food",
    owner: activeFamilyId(),
    mealType: payload.mealType || "any",
    days: dayListSafe(payload.days),
    image: payload.image || "",
    custom: true,
    createdBy: activeFamilyId(),
    createdAt: new Date().toISOString()
  };
}

function setPendingSupplyImage(dataUrl) {
  pendingSupplyImage = imageDataUrlSafe(dataUrl);
  const wrap = document.querySelector("#supplyImagePreviewWrap");
  const preview = document.querySelector("#supplyImagePreview");
  if (preview) preview.src = pendingSupplyImage || "";
  wrap?.classList.toggle("is-hidden", !pendingSupplyImage);
}

function supplyDraftDefault(overrides = {}) {
  const hasMealType = Object.hasOwn(overrides, "mealType") || Object.hasOwn(overrides, "purpose");
  const rawMealType = overrides.mealType || overrides.purpose || "";
  const quantity = overrides.quantity || overrides.qty || overrides.amount || "";
  return {
    name: shortText(overrides.name, 120),
    quantity: shortText(quantity, 80),
    notes: shortText(overrides.notes || "", 160),
    type: bringingTypeSafe(overrides.type || "food"),
    mealType: hasMealType ? mealTypeSafe(rawMealType || "any") : "",
    days: dayListSafe(overrides.days || []),
    confidence: Number(overrides.confidence || 0)
  };
}

function setPendingSupplyAiImage(dataUrl) {
  pendingSupplyAiImage = supplyAiImageDataUrlSafe(dataUrl);
  const wrap = document.querySelector("#supplyAiPreviewWrap");
  const preview = document.querySelector("#supplyAiPreview");
  if (preview) preview.src = pendingSupplyAiImage || "";
  wrap?.classList.toggle("is-hidden", !pendingSupplyAiImage);
  updateSupplyAiStatus(pendingSupplyAiImage ? "Photo ready. Tap Use AI to add items." : "");
}

function updateSupplyAiStatus(message = "") {
  const node = document.querySelector("#supplyAiStatus");
  if (node) node.textContent = message;
}

function setSupplyImportBusy(isBusy) {
  supplyImportBusy = Boolean(isBusy);
  document.querySelector("#runSupplyAiImport")?.toggleAttribute("disabled", supplyImportBusy || !pendingSupplyAiImage);
  document.querySelector("#supplyAiUpload")?.toggleAttribute("disabled", supplyImportBusy);
  document.querySelector("#supplyAiCamera")?.toggleAttribute("disabled", supplyImportBusy);
}

function smartUploadAvailable(mode = itemMode, isEdit = Boolean(editingItemId)) {
  return !isEdit && (mode === "meal" || mode === "supply");
}

function setSmartUploadOpen(isOpen) {
  smartUploadOpen = Boolean(isOpen) && smartUploadAvailable();
  const wrap = document.querySelector("#smartUploadWrap");
  const panel = document.querySelector("#smartUploadPanel");
  const toggle = document.querySelector("#smartUploadToggle");
  wrap?.classList.toggle("is-hidden", !smartUploadAvailable());
  panel?.classList.toggle("is-hidden", !smartUploadOpen);
  if (toggle) {
    toggle.setAttribute("aria-expanded", smartUploadOpen ? "true" : "false");
  }
}

function mealTypeFromImport(value) {
  const normalized = mealTypeSafe(value);
  if (normalized === "breakfast") return "Breakfast";
  if (normalized === "lunch") return "Lunch";
  if (normalized === "dessert" || normalized === "pack-up") return "Dessert / Snacks";
  return "Dinner";
}

function applySmartUploadToMeal(items) {
  const usable = items.filter((item) => item.name);
  if (!usable.length) {
    updateSupplyAiStatus("No clear meal ideas found. Add it manually below.");
    return;
  }
  const first = usable[0];
  const day = dayListSafe(first.days || [])[0];
  const idea = usable.map((item) => item.name).join(", ");
  const notes = usable.map((item) => item.notes).filter(Boolean).join("; ");
  if (day && document.querySelector("#mealIdeaDay")) document.querySelector("#mealIdeaDay").value = day;
  if (document.querySelector("#mealIdeaType")) document.querySelector("#mealIdeaType").value = mealTypeFromImport(first.mealType);
  if (document.querySelector("#mealIdeaText")) document.querySelector("#mealIdeaText").value = idea;
  if (notes && document.querySelector("#mealIdeaKids")) document.querySelector("#mealIdeaKids").value = notes;
  updateSupplyAiStatus(`Filled the meal idea from ${usable.length} item${usable.length === 1 ? "" : "s"}. Review before saving.`);
}

function renderSupplyDraftRows() {
  const list = document.querySelector("#supplyDraftRows");
  if (!list) return;
  if (!supplyDraftItems.length) supplyDraftItems = [supplyDraftDefault()];
  list.innerHTML = supplyDraftItems.map((item, index) => {
    const days = new Set(dayListSafe(item.days));
    const isNonFood = item.type === "table" || item.mealType === "non-food";
    const purpose = isNonFood ? "non-food" : (item.mealType ? mealTypeSafe(item.mealType) : "");
    const showDayPicker = Boolean(purpose && purpose !== "non-food");
    const noSpecificDay = !days.size;
    const confidence = item.confidence ? `<span>${Math.round(item.confidence * 100)}% sure</span>` : "";
    return `
      <article class="supply-draft-row" data-supply-draft-index="${index}">
        <div class="supply-draft-row-head">
          <strong>Item ${index + 1}</strong>
          ${confidence}
          <button class="icon-button light" type="button" data-remove-supply-draft="${index}" aria-label="Remove item ${index + 1}">
            <span data-icon="x"></span>
          </button>
        </div>
        <label>
          Item name
          <input data-supply-draft-field="name" type="text" value="${escapeText(item.name || "")}" placeholder="Hot dogs, popcorn, eggs">
        </label>
        <label>
          Quantity
          <input data-supply-draft-field="quantity" type="text" value="${escapeText(item.quantity || "")}" placeholder="2 packs, 36 ct, one bag">
        </label>
        <label>
          What is it for?
          <select data-supply-draft-field="purpose">
            <option value="" ${purpose === "" ? "selected" : ""}>Choose one</option>
            <option value="any" ${purpose === "any" ? "selected" : ""}>Any meal / shared</option>
            <option value="breakfast" ${purpose === "breakfast" ? "selected" : ""}>Breakfast</option>
            <option value="lunch" ${purpose === "lunch" ? "selected" : ""}>Lunch</option>
            <option value="dinner" ${purpose === "dinner" ? "selected" : ""}>Dinner</option>
            <option value="dessert" ${purpose === "dessert" ? "selected" : ""}>Dessert / Snacks</option>
            <option value="pack-up" ${purpose === "pack-up" ? "selected" : ""}>Pack-up</option>
            <option value="non-food" ${purpose === "non-food" ? "selected" : ""}>Non-food item</option>
          </select>
        </label>
        <fieldset class="day-picker ${showDayPicker ? "" : "is-hidden"}" aria-disabled="${showDayPicker ? "false" : "true"}">
          <legend>Is this for a specific day?</legend>
          <div class="day-chip-grid">
            <button type="button" class="day-chip day-chip-no ${noSpecificDay ? "is-selected" : ""}" data-supply-draft-no-day aria-pressed="${noSpecificDay ? "true" : "false"}">No</button>
            ${allDayCodes.map((day) => `
              <button type="button" class="day-chip ${days.has(day) ? "is-selected" : ""}" data-supply-draft-day="${day}" aria-pressed="${days.has(day) ? "true" : "false"}" ${showDayPicker ? "" : "disabled"}>${escapeText(dayLabelShort(day))}</button>
            `).join("")}
          </div>
        </fieldset>
      </article>
    `;
  }).join("");
}

function supplyDraftsFromDom() {
  return Array.from(document.querySelectorAll("[data-supply-draft-index]")).map((row) => {
    const purpose = row.querySelector('[data-supply-draft-field="purpose"]')?.value || "";
    const isNonFood = purpose === "non-food";
    const hasSpecificDay = Boolean(purpose && !isNonFood);
    return supplyDraftDefault({
      name: row.querySelector('[data-supply-draft-field="name"]')?.value || "",
      quantity: row.querySelector('[data-supply-draft-field="quantity"]')?.value || "",
      notes: "",
      type: isNonFood ? "table" : "food",
      mealType: isNonFood ? "any" : (purpose || "any"),
      days: hasSpecificDay ? Array.from(row.querySelectorAll("[data-supply-draft-day].is-selected")).map((button) => button.dataset.supplyDraftDay) : []
    });
  });
}

function syncSupplyDraftsFromDom() {
  supplyDraftItems = supplyDraftsFromDom();
}

function addSupplyDraftRow(item = {}) {
  syncSupplyDraftsFromDom();
  supplyDraftItems.push(supplyDraftDefault(item));
  renderSupplyDraftRows();
  document.querySelector(`[data-supply-draft-index="${supplyDraftItems.length - 1}"] input`)?.focus();
}

function removeSupplyDraftRow(index) {
  syncSupplyDraftsFromDom();
  supplyDraftItems.splice(index, 1);
  if (!supplyDraftItems.length) supplyDraftItems.push(supplyDraftDefault());
  renderSupplyDraftRows();
}

function changeSupplyDraftPurpose(row) {
  if (!row) return;
  const purpose = row.querySelector('[data-supply-draft-field="purpose"]')?.value || "";
  const showDayPicker = Boolean(purpose && purpose !== "non-food");
  const picker = row.querySelector(".day-picker");
  picker?.classList.toggle("is-hidden", !showDayPicker);
  picker?.setAttribute("aria-disabled", showDayPicker ? "false" : "true");
  row.querySelectorAll("[data-supply-draft-day]").forEach((button) => {
    button.disabled = !showDayPicker;
    if (!showDayPicker) {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    }
  });
  const noDay = row.querySelector("[data-supply-draft-no-day]");
  if (noDay) {
    noDay.classList.add("is-selected");
    noDay.setAttribute("aria-pressed", "true");
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read that photo file."));
    reader.readAsDataURL(file);
  });
}

function isHeicLikeFile(file, dataUrl = "") {
  const type = String(file?.type || "").toLowerCase();
  const name = String(file?.name || "").toLowerCase();
  const prefix = String(dataUrl || "").slice(0, 40).toLowerCase();
  return type.includes("heic") || type.includes("heif") || name.endsWith(".heic") || name.endsWith(".heif") || prefix.includes("image/heic") || prefix.includes("image/heif");
}

async function ensureHeicConverter() {
  if (typeof window.heic2any === "function") return window.heic2any;
  await new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-heic-converter="true"]');
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = HEIC_CONVERTER_SRC;
    script.async = true;
    script.dataset.heicConverter = "true";
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });
  if (typeof window.heic2any !== "function") {
    throw new Error("HEIC converter did not load.");
  }
  return window.heic2any;
}

async function convertHeicFileToJpegDataUrl(file) {
  updateSupplyAiStatus("Converting HEIC photo...");
  try {
    const heic2any = await ensureHeicConverter();
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.86 });
    const blob = Array.isArray(converted) ? converted[0] : converted;
    if (!blob) throw new Error("HEIC conversion failed.");
    const compressed = await compressImageFile(blob, 1300, 0.78);
    const safeCompressed = supplyAiImageDataUrlSafe(compressed);
    if (safeCompressed) return safeCompressed;
    const originalJpeg = await readFileAsDataUrl(blob);
    const safeOriginal = supplyAiImageDataUrlSafe(originalJpeg);
    if (safeOriginal) return safeOriginal;
    throw new Error("Converted HEIC photo is too large.");
  } catch {
    throw new Error("Could not convert that HEIC photo. Take a screenshot of it or choose a JPG/PNG photo, then upload again.");
  }
}

async function prepareSupplyAiImageFile(file) {
  if (!file) return "";
  const looksHeic = isHeicLikeFile(file);
  const fileType = String(file.type || "").toLowerCase();
  if (looksHeic) {
    return convertHeicFileToJpegDataUrl(file);
  }
  if (fileType && !fileType.startsWith("image/")) {
    throw new Error("Choose a photo file first.");
  }
  const original = await readFileAsDataUrl(file);
  try {
    const compressed = await compressImageFile(file, 1300, 0.78);
    const safeCompressed = supplyAiImageDataUrlSafe(compressed);
    if (safeCompressed) return safeCompressed;
  } catch {
    if (isHeicLikeFile(file, original)) {
      throw new Error("This looks like a HEIC photo. Take a screenshot of it or choose a JPG/PNG photo, then upload again.");
    }
  }
  if (isHeicLikeFile(file, original)) {
    throw new Error("This looks like a HEIC photo. Take a screenshot of it or choose a JPG/PNG photo, then upload again.");
  }
  const safeOriginal = supplyAiImageDataUrlSafe(original);
  if (safeOriginal) return safeOriginal;
  throw new Error("That photo is too large to upload. Try a screenshot or a smaller JPG/PNG photo.");
}

async function handleSupplyAiImageFile(file) {
  if (!file) return;
  try {
    updateSupplyAiStatus("Preparing photo...");
    const prepared = await prepareSupplyAiImageFile(file);
    setPendingSupplyAiImage(prepared);
    setSupplyImportBusy(false);
  } catch (error) {
    setPendingSupplyAiImage("");
    const message = error instanceof Error ? error.message : "Could not load that photo.";
    updateSupplyAiStatus(message);
    showToast(message);
  }
}

async function runSupplyAiImport() {
  if (!pendingSupplyAiImage || supplyImportBusy) return;
  try {
    setSupplyImportBusy(true);
    updateSupplyAiStatus("Reading photo...");
    const response = await authAwareRequest("/supply/import-photo", {
      method: "POST",
      body: { image: pendingSupplyAiImage }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) throw new Error(payload.message || "Could not read that photo.");
    const items = Array.isArray(payload.items) ? payload.items.map((item) => supplyDraftDefault(item)).filter((item) => item.name) : [];
    if (!items.length) {
      updateSupplyAiStatus("No clear items found. Add them manually below.");
      return;
    }
    if (itemMode === "meal") {
      applySmartUploadToMeal(items);
      return;
    }
    syncSupplyDraftsFromDom();
    const existing = supplyDraftItems.filter((item) => item.name);
    supplyDraftItems = [...existing, ...items].slice(0, 30);
    renderSupplyDraftRows();
    updateSupplyAiStatus(`Added ${items.length} draft item${items.length === 1 ? "" : "s"}. Review before saving.`);
  } catch (error) {
    updateSupplyAiStatus(error instanceof Error ? error.message : "Could not read that photo.");
  } finally {
    setSupplyImportBusy(false);
  }
}

function setSupplyDaySelection(days = []) {
  const selected = new Set(dayListSafe(days));
  document.querySelectorAll("[data-supply-day]").forEach((button) => {
    const active = selected.has(button.dataset.supplyDay);
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function selectedSupplyDays() {
  return Array.from(document.querySelectorAll("[data-supply-day].is-selected")).map((button) => button.dataset.supplyDay);
}

function updateSupplyDayAvailability() {
  const selectedPurpose = document.querySelector("#supplyMealType")?.value || "any";
  const isNonFood = selectedPurpose === "non-food";
  const picker = document.querySelector("#supplyDayPicker");
  const fieldset = document.querySelector(".day-picker");
  fieldset?.classList.toggle("is-disabled", isNonFood);
  fieldset?.setAttribute("aria-disabled", isNonFood ? "true" : "false");
  document.querySelectorAll("[data-supply-day]").forEach((button) => {
    button.disabled = isNonFood;
    if (isNonFood) {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    }
  });
  if (picker) picker.setAttribute("aria-disabled", isNonFood ? "true" : "false");
}

async function compressImageFile(file, maxSize = 360, quality = 0.72) {
  if (!file) return "";
  const dataUrl = await readFileAsDataUrl(file);
  const source = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The browser could not decode that photo."));
    image.src = dataUrl;
  });
  const canvas = document.createElement("canvas");
  const ratio = Math.min(1, maxSize / Math.max(source.width, source.height));
  canvas.width = Math.max(1, Math.round(source.width * ratio));
  canvas.height = Math.max(1, Math.round(source.height * ratio));
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

async function imageFromDataUrl(dataUrl) {
  const safeUrl = profileSourceDataUrlSafe(dataUrl);
  if (!safeUrl) return null;
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = safeUrl;
  });
}

async function cropProfilePhoto() {
  const source = await imageFromDataUrl(profileCropSource());
  if (!source) return "";
  const size = 384;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return pendingProfilePhoto;
  const baseScale = Math.max(size / source.width, size / source.height);
  const scale = baseScale * Math.max(1, Math.min(3, profilePhotoCrop.zoom));
  const drawWidth = source.width * scale;
  const drawHeight = source.height * scale;
  const cropFrame = document.querySelector("#profileCropImage")?.parentElement;
  const previewSize = cropFrame?.clientWidth || 172;
  const offsetScale = size / previewSize;
  const drawX = (size - drawWidth) / 2 + (profilePhotoCrop.x * offsetScale);
  const drawY = (size - drawHeight) / 2 + (profilePhotoCrop.y * offsetScale);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);
  context.drawImage(source, drawX, drawY, drawWidth, drawHeight);
  for (const quality of [0.82, 0.74, 0.66, 0.58]) {
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (imageDataUrlSafe(dataUrl)) return dataUrl;
  }
  return "";
}

function clampProfileZoom(value) {
  return Math.round(Math.max(1, Math.min(3, Number(value) || 1)) * 100) / 100;
}

function profilePointerPoint(event) {
  return { x: event.clientX, y: event.clientY };
}

function profilePointerDistance(points) {
  if (points.length < 2) return 0;
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
}

function resetProfileCropGestureState() {
  profileCropPointers.clear();
  profileCropDrag = null;
  profileCropPinch = null;
  document.querySelector("#profileCropFrame")?.classList.remove("is-dragging");
}

function moveProfileCrop(action) {
  if (action === "zoom-in") profilePhotoCrop.zoom = clampProfileZoom(profilePhotoCrop.zoom + 0.1);
  if (action === "zoom-out") profilePhotoCrop.zoom = clampProfileZoom(profilePhotoCrop.zoom - 0.1);
  if (action === "reset") resetProfileCrop();
  renderProfileCropper();
}

function startProfileCropPointer(event) {
  if (!profileCropSource()) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  const frame = document.querySelector("#profileCropFrame");
  frame?.setPointerCapture?.(event.pointerId);
  frame?.classList.add("is-dragging");
  profileCropPointers.set(event.pointerId, profilePointerPoint(event));
  if (profileCropPointers.size === 1) {
    const point = profileCropPointers.get(event.pointerId);
    profileCropDrag = {
      pointerId: event.pointerId,
      startX: point.x,
      startY: point.y,
      cropX: profilePhotoCrop.x,
      cropY: profilePhotoCrop.y
    };
    profileCropPinch = null;
  } else if (profileCropPointers.size === 2) {
    profileCropPinch = {
      distance: profilePointerDistance([...profileCropPointers.values()]),
      zoom: profilePhotoCrop.zoom
    };
    profileCropDrag = null;
  }
  event.preventDefault();
}

function moveProfileCropPointer(event) {
  if (!profileCropPointers.has(event.pointerId)) return;
  profileCropPointers.set(event.pointerId, profilePointerPoint(event));
  const points = [...profileCropPointers.values()];
  if (points.length >= 2 && profileCropPinch?.distance) {
    const nextDistance = profilePointerDistance(points);
    profilePhotoCrop.zoom = clampProfileZoom(profileCropPinch.zoom * (nextDistance / profileCropPinch.distance));
  } else if (profileCropDrag && profileCropDrag.pointerId === event.pointerId) {
    const point = profileCropPointers.get(event.pointerId);
    profilePhotoCrop.x = profileCropDrag.cropX + point.x - profileCropDrag.startX;
    profilePhotoCrop.y = profileCropDrag.cropY + point.y - profileCropDrag.startY;
  }
  renderProfileCropper();
  event.preventDefault();
}

function endProfileCropPointer(event) {
  const frame = document.querySelector("#profileCropFrame");
  profileCropPointers.delete(event.pointerId);
  try {
    frame?.releasePointerCapture?.(event.pointerId);
  } catch {
    // Some mobile browsers release capture before firing cleanup events.
  }
  if (profileCropPointers.size === 1) {
    const [pointerId, point] = [...profileCropPointers.entries()][0];
    profileCropDrag = {
      pointerId,
      startX: point.x,
      startY: point.y,
      cropX: profilePhotoCrop.x,
      cropY: profilePhotoCrop.y
    };
    profileCropPinch = null;
  } else if (profileCropPointers.size === 0) {
    profileCropDrag = null;
    profileCropPinch = null;
    frame?.classList.remove("is-dragging");
  }
}

function bindProfileCropperGestures() {
  const frame = document.querySelector("#profileCropFrame");
  if (!frame) return;
  frame.addEventListener("pointerdown", startProfileCropPointer);
  frame.addEventListener("pointermove", moveProfileCropPointer);
  frame.addEventListener("pointerup", endProfileCropPointer);
  frame.addEventListener("pointercancel", endProfileCropPointer);
  frame.addEventListener("lostpointercapture", endProfileCropPointer);
}

function openItemDrawer(mode, itemId = "") {
  itemMode = mode;
  editingItemId = itemId;
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const title = document.querySelector("#itemDrawerTitle");
  const help = document.querySelector("#itemDrawerHelp");
  const save = document.querySelector("#saveItem");
  const deleteItem = document.querySelector("#deleteItem");
  const typeWrap = document.querySelector("#mealIdeaTypeWrap");
  const typeLabel = document.querySelector("#mealIdeaTypeLabel");
  const textLabel = document.querySelector("#mealIdeaTextLabel");
  const kidsLabel = document.querySelector("#mealIdeaKidsLabel");
  const textWrap = document.querySelector("#mealIdeaTextWrap");
  const kidsWrap = document.querySelector("#mealIdeaKidsWrap");
  const ideaInput = document.querySelector("#mealIdeaText");
  const kidsInput = document.querySelector("#mealIdeaKids");
  const availablePanel = document.querySelector("#mealAvailablePanel");
  const isEvent = mode === "event";
  const isEdit = Boolean(itemId);
  const isMealEdit = mode === "meal" && isEdit;
  const isSupplyAdd = mode === "supply" && !isEdit;
  const canDeleteSupply = mode === "supply" && isEdit && canManageCustomItem(state.supplies.find((item) => item.id === itemId));
  if (title) title.textContent = isEvent
    ? (isEdit ? "Edit non-food event" : "Add non-food event")
    : mode === "meal"
      ? (isEdit ? "Edit meal plan" : "Add meal slot")
      : (isEdit ? "Edit item" : "Add items");
  if (help) help.textContent = isEvent
    ? "Add a trip event that should show on the calendar but not under meals."
    : mode === "meal"
      ? (isEdit ? "Set the recipe for this meal. Bringing items link in automatically." : "Add a meal manually or tap Smart Upload to read a photo.")
      : isSupplyAdd
        ? "Add one item manually, add another row, or use a photo to fill drafts."
        : "Start with the item name. Meal, day, and picture details are optional.";
  if (save) save.textContent = isEdit ? "Save changes" : (isEvent ? "Add event" : mode === "meal" ? "Add meal" : "Save items");
  deleteItem?.classList.toggle("is-hidden", !canDeleteSupply);
  deleteItem?.closest(".drawer-footer")?.classList.toggle("has-delete", canDeleteSupply);
  if (deleteItem) deleteItem.dataset.deleteEditingSupply = canDeleteSupply ? itemId : "";
  document.querySelectorAll("[data-item-section]").forEach((section) => {
    const isMealSection = section.dataset.itemSection === "meal";
    const shouldShow = mode === "supply" ? section.dataset.itemSection === "supply" : isMealSection;
    section.classList.toggle("is-hidden", !shouldShow);
  });
  document.querySelector("#itemForm")?.reset();
  setPendingSupplyImage("");
  setPendingSupplyAiImage("");
  setSmartUploadOpen(false);
  setSupplyDaySelection([]);
  updateSupplyDayAvailability();
  document.querySelector("#supplyMultiFields")?.classList.toggle("is-hidden", !isSupplyAdd);
  document.querySelector("#supplySingleFields")?.classList.toggle("is-hidden", isSupplyAdd);
  document.querySelector("#supplySingleDetails")?.classList.toggle("is-hidden", isSupplyAdd);
  if (isSupplyAdd) {
    supplyDraftItems = [supplyDraftDefault()];
    renderSupplyDraftRows();
    setSupplyImportBusy(false);
  }
  if (typeWrap) typeWrap.classList.toggle("is-hidden", isEvent);
  if (typeLabel) typeLabel.textContent = "Meal";
  if (textLabel) textLabel.textContent = isEvent ? "Event name" : "Idea";
  if (kidsLabel) kidsLabel.textContent = isEvent ? "Time / details" : "Kid backup";
  if (ideaInput) ideaInput.placeholder = isEvent ? "Parade, lake day, golf tee time" : "Chili, tacos, pasta night";
  if (kidsInput) kidsInput.placeholder = isEvent ? "10:00 AM in Arnold, leave cabin by 9:15" : "Butter pasta, nuggets, fruit";
  textWrap?.classList.toggle("is-hidden", isMealEdit);
  kidsWrap?.classList.toggle("is-hidden", isMealEdit);
  availablePanel?.classList.toggle("is-hidden", !isMealEdit);
  if (isEdit && (mode === "meal" || mode === "event")) {
    const meal = state.meals.find((item) => item.id === itemId);
    if (meal) {
      document.querySelector("#mealIdeaDay").value = meal.day || "sun";
      document.querySelector("#mealIdeaType").value = meal.type || "Dinner";
      document.querySelector("#mealIdeaText").value = meal.idea || "";
      document.querySelector("#mealIdeaKids").value = isEvent ? (meal.kids || meal.time || "") : (meal.kids || "");
    }
  }
  if (isMealEdit) renderMealAvailablePanel();
  if (isEdit && mode === "supply") {
    const supply = state.supplies.find((item) => item.id === itemId);
    if (supply) {
      document.querySelector("#supplyName").value = supply.name || "";
      document.querySelector("#supplyQty").value = supply.notes || supply.qty || "";
      document.querySelector("#supplyMealType").value = supplyPurposeValue(supply);
      setSupplyDaySelection(supply.days || []);
      updateSupplyDayAvailability();
      setPendingSupplyImage(supply.image || "");
    }
  }
  document.body.classList.add("drawer-open");
  document.querySelector("#drawerBackdrop")?.classList.remove("is-hidden");
  document.querySelector("#itemDrawer")?.classList.remove("is-hidden");
  window.setTimeout(() => {
    const firstField = mode === "meal" ? "#mealIdeaDay" : (isSupplyAdd ? "[data-supply-draft-field='name']" : "#supplyName");
    const focusField = isEvent ? "#mealIdeaDay" : firstField;
    document.querySelector(focusField)?.focus();
  }, 0);
}

function closeItemDrawer() {
  document.querySelector("#itemDrawer")?.classList.add("is-hidden");
  editingItemId = "";
  const checkinOpen = !document.querySelector("#checkinDrawer")?.classList.contains("is-hidden");
  if (!checkinOpen) {
    document.body.classList.remove("drawer-open");
    document.querySelector("#drawerBackdrop")?.classList.add("is-hidden");
  }
  lastFocusedElement?.focus?.();
  lastFocusedElement = null;
}

function closeAllDrawers() {
  document.querySelector("#checkinDrawer")?.classList.add("is-hidden");
  document.querySelector("#itemDrawer")?.classList.add("is-hidden");
  document.querySelector("#profileDrawer")?.classList.add("is-hidden");
  document.querySelector("#drawerBackdrop")?.classList.add("is-hidden");
  document.body.classList.remove("drawer-open");
  editingItemId = "";
  lastFocusedElement?.focus?.();
  lastFocusedElement = null;
}

async function submitItemForm(event) {
  event.preventDefault();
  if (itemMode === "meal" || itemMode === "event") {
    const isEvent = itemMode === "event";
    const existingMeal = editingItemId ? state.meals.find((item) => item.id === editingItemId) : null;
    const payload = {
      day: document.querySelector("#mealIdeaDay")?.value || "sun",
      type: isEvent ? "Event" : (document.querySelector("#mealIdeaType")?.value || "Meal idea"),
      idea: isEvent || !editingItemId
        ? (document.querySelector("#mealIdeaText")?.value.trim() || "")
        : (existingMeal?.idea || document.querySelector("#mealIdeaText")?.value.trim() || ""),
      kids: isEvent
        ? (document.querySelector("#mealIdeaKids")?.value.trim() || "Time TBD")
        : (editingItemId ? (existingMeal?.kids || "") : (document.querySelector("#mealIdeaKids")?.value.trim() || ""))
    };
    if (!payload.idea && (isEvent || !editingItemId)) {
      showToast(isEvent ? "Add an event name first." : "Add a meal idea first.");
      return;
    }
    if (editingItemId) {
      const meal = existingMeal;
      performAction("updateMealIdea", { id: editingItemId, ...payload }, () => {
        if (!meal) return;
        const day = dayMeta[payload.day] ? payload.day : "sun";
        meal.day = day;
        meal.dayLabel = dayMeta[day].dayLabel;
        meal.type = payload.type || "Meal";
        meal.idea = payload.idea;
        meal.kids = isEvent ? (payload.kids || "Time TBD") : (payload.kids || "");
        meal.updatedAt = new Date().toISOString();
      }, isEvent ? "Event updated." : "Meal updated.");
      closeItemDrawer();
      return;
    }
    performAction("addMealIdea", payload, () => {
      state.meals.push(createMealIdea(payload));
    }, isEvent ? "Event added." : "Meal idea added.");
    closeItemDrawer();
    return;
  }

  if (editingItemId) {
    const payload = {
      name: document.querySelector("#supplyName")?.value.trim() || "",
      quantity: document.querySelector("#supplyQty")?.value.trim() || "",
      notes: "",
      type: "food",
      mealType: "any",
      days: selectedSupplyDays(),
      image: pendingSupplyImage
    };
    const selectedPurpose = document.querySelector("#supplyMealType")?.value || "any";
    if (selectedPurpose === "non-food") {
      payload.type = "table";
      payload.mealType = "any";
      payload.days = [];
    } else {
      payload.mealType = selectedPurpose;
    }
    if (!payload.name) {
      showToast("Add an item name first.");
      return;
    }
    const supply = state.supplies.find((item) => item.id === editingItemId);
    performAction("updateSupply", { id: editingItemId, ...payload }, () => {
      if (!supply) return;
      supply.name = payload.name;
      supply.notes = payload.notes || "";
      supply.qty = payload.quantity || "";
      supply.type = supply.type || payload.type || "food";
      supply.mealType = payload.mealType || "any";
      supply.days = dayListSafe(payload.days);
      supply.image = payload.image || "";
      supply.updatedAt = new Date().toISOString();
    }, "Bringing item updated.");
    closeItemDrawer();
    return;
  }
  const drafts = supplyDraftsFromDom().filter((item) => item.name);
  if (!drafts.length) {
    showToast("Add at least one item first.");
    return;
  }
  const save = document.querySelector("#saveItem");
  save?.toggleAttribute("disabled", true);
  let savedCount = 0;
  for (const draft of drafts) {
    const payload = {
      name: draft.name,
      quantity: draft.quantity,
      notes: draft.notes,
      type: draft.type,
      mealType: draft.mealType,
      days: draft.days,
      image: ""
    };
    const saved = await performAction("addSupply", payload, () => {
      state.supplies.push(createSupplyItem(payload));
    }, `Added ${draft.name}.`);
    if (saved) savedCount += 1;
    else break;
  }
  save?.toggleAttribute("disabled", false);
  if (savedCount) {
    showToast(`Added ${savedCount} item${savedCount === 1 ? "" : "s"}.`);
    closeItemDrawer();
  }
}

function addMealIdea() {
  openItemDrawer("meal");
}

function addSupply() {
  openItemDrawer("supply");
}

function addSupplyForFamily(familyId) {
  const family = familyById(familyId);
  if (!family) return;
  if (!canAddSupplyForFamily(familyId)) {
    showToast("Sign out to add items for another family.");
    return;
  }
  selectedFamily = familyId;
  saveSelectedFamily();
  renderFamilies();
  openItemDrawer("supply");
  const title = document.querySelector("#itemDrawerTitle");
  const help = document.querySelector("#itemDrawerHelp");
  if (title) title.textContent = `Add item for ${family.name}`;
  if (help) help.textContent = `Add food, drinks, supplies, games, or anything ${family.name} is bringing.`;
}

function addNonFoodEvent() {
  openItemDrawer("event");
}

function editMeal(id) {
  const meal = state.meals.find((item) => item.id === id);
  if (!meal) return;
  openItemDrawer(isNonFoodEvent(meal) ? "event" : "meal", id);
}

function deleteMeal(id) {
  const meal = state.meals.find((item) => item.id === id);
  if (!meal || !isCustomMeal(meal)) return;
  if (!canManageCustomItem(meal)) {
    showToast("Only the family that added or owns this meal can delete it.");
    return;
  }
  if (!window.confirm(`Delete "${meal.idea}"?`)) return;
  performAction("deleteMealIdea", { id }, () => {
    state.meals = state.meals.filter((item) => item.id !== id);
  }, "Meal idea deleted.");
}

function editSupply(id) {
  const supply = state.supplies.find((item) => item.id === id);
  if (!supply) return;
  if (!canManageCustomItem(supply)) {
    showToast("Only your own family can edit this bringing item.");
    return;
  }
  openItemDrawer("supply", id);
}

function addSupplyToSelectedMeal(id) {
  const supply = state.supplies.find((item) => item.id === id);
  if (!supply || !isMealAssignableItem(supply)) return;
  const day = document.querySelector("#mealIdeaDay")?.value || "sun";
  const type = document.querySelector("#mealIdeaType")?.value || "Meal";
  const mealType = mealTypeKey({ type });
  const days = dayListSafe(supply.days || []);
  const nextDays = days.includes(day) ? days : [...days, day];
  const payload = {
    name: supply.name || "",
    quantity: supply.qty || "",
    notes: supply.notes || "",
    type: supply.type || "food",
    mealType,
    days: nextDays,
    image: supply.image || ""
  };
  performAction("updateSupply", { id, ...payload }, () => {
    supply.name = payload.name;
    supply.notes = payload.notes;
    supply.qty = payload.quantity;
    supply.type = payload.type;
    supply.mealType = payload.mealType;
    supply.days = dayListSafe(payload.days);
    supply.image = payload.image;
    supply.updatedAt = new Date().toISOString();
    renderMealAvailablePanel();
    renderFoodHub();
  }, `${supply.name} added to ${dayMeta[day]?.dayLabel || "this day"} ${mealTypeDisplay(mealType).toLowerCase()}.`);
}

async function deleteSupply(id) {
  const supply = state.supplies.find((item) => item.id === id);
  if (!supply) return false;
  if (!canManageCustomItem(supply)) {
    showToast("Only your own family can delete this bringing item.");
    return false;
  }
  if (!window.confirm(`Delete "${supply.name}"?`)) return false;
  return performAction("deleteSupply", { id }, () => {
    state.supplies = state.supplies.filter((item) => item.id !== id);
  }, "Bringing item deleted.");
}

async function deleteEditingSupplyFromDrawer() {
  const id = document.querySelector("#deleteItem")?.dataset.deleteEditingSupply || editingItemId;
  if (!id) return;
  const deleted = await deleteSupply(id);
  if (deleted) closeItemDrawer();
}

function calendarFeedUrls() {
  const cfg = window.APP_CONFIG || {};
  let https;
  if (cfg.supabaseUrl) {
    const fn = cfg.tripApiFunction || "trip-api";
    https = `${String(cfg.supabaseUrl).replace(/\/$/, "")}/functions/v1/${fn}/calendar.ics`;
  } else {
    https = `${window.location.origin}/trip.ics`;
  }
  return { https, webcal: https.replace(/^https?:\/\//, "webcal://") };
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-tab]");
    if (nav) setActivePanel(nav.dataset.tab);

    const jump = event.target.closest("[data-tab-jump]");
    if (jump) setActivePanel(jump.dataset.tabJump);

    const mealButton = event.target.closest("[data-claim-meal]");
    if (mealButton) claimMeal(mealButton.dataset.claimMeal);

    const editMealButton = event.target.closest("[data-edit-meal]");
    if (editMealButton) editMeal(editMealButton.dataset.editMeal);

    const openArrivalButton = event.target.closest("[data-open-arrival]");
    if (openArrivalButton) openDrawer();

    const deleteMealButton = event.target.closest("[data-delete-meal]");
    if (deleteMealButton) deleteMeal(deleteMealButton.dataset.deleteMeal);

    const supplyButton = event.target.closest("[data-claim-supply]");
    if (supplyButton) claimSupply(supplyButton.dataset.claimSupply);

    const foodViewBtn = event.target.closest("[data-food-view]");
    if (foodViewBtn) { foodView = foodViewBtn.dataset.foodView; renderFoodHub(); }

    const todoViewBtn = event.target.closest("[data-todo-view]");
    if (todoViewBtn) { todoView = todoViewBtn.dataset.todoView; renderTodoHub(); }

    const foodDayBtn = event.target.closest("[data-food-day]");
    if (foodDayBtn) { foodDay = foodDayBtn.dataset.foodDay; renderFoodHub(); }

    const addFamilySupplyButton = event.target.closest("[data-add-family-supply]");
    if (addFamilySupplyButton) addSupplyForFamily(addFamilySupplyButton.dataset.addFamilySupply);

    const editSupplyButton = event.target.closest("[data-edit-supply]");
    if (editSupplyButton) editSupply(editSupplyButton.dataset.editSupply);

    const addMealSupplyButton = event.target.closest("[data-add-meal-supply]");
    if (addMealSupplyButton) addSupplyToSelectedMeal(addMealSupplyButton.dataset.addMealSupply);

    const deleteSupplyButton = event.target.closest("[data-delete-supply]");
    if (deleteSupplyButton) deleteSupply(deleteSupplyButton.dataset.deleteSupply);

    const vote = event.target.closest("[data-vote]");
    if (vote) voteActivity(vote.dataset.vote);

    const family = event.target.closest("[data-family]");
    if (family) {
      if (api.user?.familyId && !isBearPowerUser() && family.dataset.family !== api.user.familyId) {
        showToast("Sign out to switch to another family.");
        return;
      }
      selectedFamily = family.dataset.family;
      saveSelectedFamily();
      renderAll();
    }

    const familyCheckin = event.target.closest("[data-open-family-checkin]");
    if (familyCheckin) {
      if (api.user?.familyId && !isBearPowerUser() && familyCheckin.dataset.openFamilyCheckin !== api.user.familyId) {
        showToast("Sign out to check in another family.");
        return;
      }
      selectedFamily = familyCheckin.dataset.openFamilyCheckin;
      saveSelectedFamily();
      renderAll();
      openDrawer();
    }

    const focusFamily = event.target.closest("[data-focus-family]");
    if (focusFamily) {
      document.querySelector("#quickFamilyPicker")?.scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("Pick your family first.");
    }

    const authPerson = event.target.closest("[data-auth-person]");
    if (authPerson) selectAuthPerson(authPerson.dataset.authPerson, { force: true });

    const supplyDay = event.target.closest("[data-supply-day]");
    if (supplyDay) {
      if (supplyDay.disabled) return;
      supplyDay.classList.toggle("is-selected");
      const active = supplyDay.classList.contains("is-selected");
      supplyDay.setAttribute("aria-pressed", active ? "true" : "false");
    }

    const openLogisticsButton = event.target.closest("[data-open-logistics-edit]");
    if (openLogisticsButton) openLogisticsEdit(openLogisticsButton.dataset.openLogisticsEdit);

    const saveLogisticsButton = event.target.closest("[data-save-logistics-edit]");
    if (saveLogisticsButton) saveLogisticsTiming(saveLogisticsButton.dataset.saveLogisticsEdit);

    const cancelLogisticsButton = event.target.closest("[data-cancel-logistics-edit]");
    if (cancelLogisticsButton) cancelLogisticsEdit();

    const editFamilyEventButton = event.target.closest("[data-edit-family-event]");
    if (editFamilyEventButton) editFamilyEvent(editFamilyEventButton.dataset.editFamilyEvent);

    const deleteFamilyEventButton = event.target.closest("[data-delete-family-event]");
    if (deleteFamilyEventButton) deleteFamilyEvent(deleteFamilyEventButton.dataset.deleteFamilyEvent);

    const familyMemoryButton = event.target.closest("[data-family-memory]");
    if (familyMemoryButton) {
      const value = familyMemoryButton.dataset.memoryValue || "";
      const fieldMap = {
        person: "#familyEventPerson",
        type: "#familyEventType",
        location: "#familyEventLocation"
      };
      const input = document.querySelector(fieldMap[familyMemoryButton.dataset.familyMemory] || "");
      if (input) {
        input.value = value;
        input.focus();
      }
    }

    const removeDraftButton = event.target.closest("[data-remove-draft]");
    if (removeDraftButton) {
      familyScheduleDrafts.splice(Number(removeDraftButton.dataset.removeDraft), 1);
      renderFamilyScheduleDrafts();
    }
  });

  document.addEventListener("change", (event) => {
    const checklist = event.target.closest("[data-checklist]");
    if (checklist) toggleChecklist(checklist.dataset.checklist, checklist.checked);

    const draftField = event.target.closest("[data-draft-field]");
    if (draftField) {
      const index = Number(draftField.dataset.draftIndex);
      const field = draftField.dataset.draftField;
      if (!familyScheduleDrafts[index] || !field) return;
      familyScheduleDrafts[index][field] = draftField.value;
    }
  });

  document.querySelectorAll(".day-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDay = button.dataset.day;
      document.querySelectorAll(".day-tabs button").forEach((node) => {
        node.classList.toggle("is-selected", node === button);
      });
      renderMealPreview();
    });
  });

  document.querySelector("#openCheckin")?.addEventListener("click", openDrawer);
  document.querySelector("#openCheckinTwo")?.addEventListener("click", openDrawer);
  document.querySelector("#closeDrawer")?.addEventListener("click", closeDrawer);
  document.querySelector("#closeItemDrawer")?.addEventListener("click", closeItemDrawer);
  document.querySelector("#closeProfileDrawer")?.addEventListener("click", closeProfileDrawer);
  document.querySelector("#cancelItem")?.addEventListener("click", closeItemDrawer);
  document.querySelector("#deleteItem")?.addEventListener("click", deleteEditingSupplyFromDrawer);
  document.querySelector("#drawerBackdrop")?.addEventListener("click", closeAllDrawers);
  document.querySelector("#prevStep")?.addEventListener("click", () => {
    drawerStep = Math.max(1, drawerStep - 1);
    updateDrawer();
  });
  document.querySelector("#nextStep")?.addEventListener("click", () => {
    if (drawerStep === 4) {
      submitCheckin();
      return;
    }
    drawerStep += 1;
    updateDrawer();
  });
  document.querySelector("#addMealIdea")?.addEventListener("click", addMealIdea);
  document.querySelector("#addNonFoodEvent")?.addEventListener("click", addNonFoodEvent);
  document.querySelector("#addSupply")?.addEventListener("click", addSupply);
  document.querySelector("#smartUploadToggle")?.addEventListener("click", () => setSmartUploadOpen(!smartUploadOpen));
  document.querySelector("#subscribeApple")?.addEventListener("click", () => {
    window.location.href = calendarFeedUrls().webcal;
  });
  document.querySelector("#copyCalLink")?.addEventListener("click", async () => {
    const { https } = calendarFeedUrls();
    try { await navigator.clipboard.writeText(https); showToast("Calendar link copied."); }
    catch { showToast(https); }
  });
  document.querySelector("#itemForm")?.addEventListener("submit", submitItemForm);
  document.querySelector("#addSupplyDraftRow")?.addEventListener("click", () => addSupplyDraftRow());
  document.querySelector("#supplyDraftRows")?.addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove-supply-draft]");
    if (remove) {
      removeSupplyDraftRow(Number(remove.dataset.removeSupplyDraft || 0));
      return;
    }
    const noDay = event.target.closest("[data-supply-draft-no-day]");
    if (noDay) {
      const row = noDay.closest("[data-supply-draft-index]");
      row?.querySelectorAll("[data-supply-draft-day]").forEach((button) => {
        button.classList.remove("is-selected");
        button.setAttribute("aria-pressed", "false");
      });
      noDay.classList.add("is-selected");
      noDay.setAttribute("aria-pressed", "true");
      return;
    }
    const day = event.target.closest("[data-supply-draft-day]");
    if (day) {
      day.classList.toggle("is-selected");
      day.setAttribute("aria-pressed", day.classList.contains("is-selected") ? "true" : "false");
      const row = day.closest("[data-supply-draft-index]");
      const hasSelectedDay = Boolean(row?.querySelector("[data-supply-draft-day].is-selected"));
      const noSpecificDay = row?.querySelector("[data-supply-draft-no-day]");
      noSpecificDay?.classList.toggle("is-selected", !hasSelectedDay);
      noSpecificDay?.setAttribute("aria-pressed", hasSelectedDay ? "false" : "true");
    }
  });
  document.querySelector("#supplyDraftRows")?.addEventListener("change", (event) => {
    const purpose = event.target.closest('[data-supply-draft-field="purpose"]');
    if (purpose) changeSupplyDraftPurpose(purpose.closest("[data-supply-draft-index]"));
  });
  document.querySelector("#runSupplyAiImport")?.addEventListener("click", runSupplyAiImport);
  document.querySelector("#supplyAiUpload")?.addEventListener("change", async (event) => {
    await handleSupplyAiImageFile(event.target.files?.[0]);
    event.target.value = "";
  });
  document.querySelector("#supplyAiCamera")?.addEventListener("change", async (event) => {
    await handleSupplyAiImageFile(event.target.files?.[0]);
    event.target.value = "";
  });
  document.querySelector("#mealIdeaDay")?.addEventListener("change", renderMealAvailablePanel);
  document.querySelector("#mealIdeaType")?.addEventListener("change", renderMealAvailablePanel);
  document.querySelector("#familyEventForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveFamilyEvent();
  });
  document.querySelector("#familyEventCancel")?.addEventListener("click", resetFamilyEventForm);
  document.querySelector("#familyEventDelete")?.addEventListener("click", () => deleteFamilyEvent());
  document.querySelector("#familyEventAllDay")?.addEventListener("change", toggleFamilyEventTimeState);
  document.querySelector("#scanSchedule")?.addEventListener("click", scanFamilySchedule);
  document.querySelector("#rebuildScheduleDrafts")?.addEventListener("click", rebuildDraftsFromText);
  document.querySelector("#saveScheduleDrafts")?.addEventListener("click", saveFamilyScheduleImport);
  document.querySelector("#clearScheduleImport")?.addEventListener("click", resetFamilyScheduleImport);
  document.querySelector("#supplyMealType")?.addEventListener("change", updateSupplyDayAvailability);
  document.querySelector("#clearSupplyImage")?.addEventListener("click", () => {
    const input = document.querySelector("#supplyImage");
    if (input) input.value = "";
    setPendingSupplyImage("");
  });
  document.querySelector("#supplyImage")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPendingSupplyImage("");
      return;
    }
    try {
      const compressed = await compressImageFile(file);
      setPendingSupplyImage(compressed);
    } catch {
      showToast("Could not load that picture.");
      setPendingSupplyImage("");
    }
  });
  document.querySelector("#scheduleImage")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPendingScheduleImage("");
      return;
    }
    try {
      const compressed = await compressImageFile(file, 1280, 0.86);
      setPendingScheduleImage(compressed);
    } catch {
      showToast("Could not load that schedule photo.");
      setPendingScheduleImage("");
    }
  });
  document.querySelector("#profileAvatarButton")?.addEventListener("click", openProfileDrawer);
  document.querySelector("#profileForm")?.addEventListener("submit", saveProfileForm);
  document.querySelector("#removeProfilePhoto")?.addEventListener("click", removeProfilePhoto);
  document.querySelector("#profileNameInput")?.addEventListener("input", (event) => {
    setProfilePhotoPreview(pendingProfilePhoto, event.target.value || displayNameForUser());
  });
  document.querySelector("#profilePhotoZoom")?.addEventListener("input", (event) => {
    profilePhotoCrop.zoom = clampProfileZoom(event.target.value);
    renderProfileCropper();
  });
  bindProfileCropperGestures();
  document.querySelectorAll("[data-profile-crop]").forEach((button) => {
    button.addEventListener("click", () => moveProfileCrop(button.dataset.profileCrop));
  });
  document.querySelector("#profilePhotoInput")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      pendingProfilePhotoSource = await compressImageFile(file, 900, 0.82);
      pendingProfilePhoto = pendingProfilePhotoSource;
      profilePhotoChanged = true;
      profilePhotoSelectionFailed = false;
      resetProfileCrop();
      setProfilePhotoPreview(pendingProfilePhoto, document.querySelector("#profileNameInput")?.value || displayNameForUser());
      renderProfileCropper();
    } catch {
      profilePhotoChanged = false;
      profilePhotoSelectionFailed = true;
      showToast("Could not load that picture.");
    }
  });
  document.querySelector("#authForm")?.addEventListener("submit", submitAuthForm);
  document.querySelector("#authFamily")?.addEventListener("change", handleAuthFamilyChange);
  document.querySelector("#passkeySignIn")?.addEventListener("click", signInWithPasskey);
  document.querySelector("#setupPasskey")?.addEventListener("click", setupPasskey);
  document.querySelector("#mobileSetupPasskey")?.addEventListener("click", setupPasskey);
  document.querySelector("#logoutProfile")?.addEventListener("click", logoutProfile);
  document.querySelector("#mobileLogoutProfile")?.addEventListener("click", logoutProfile);
  document.querySelector("#installApp")?.addEventListener("click", handleInstallAction);
  document.querySelector("#dismissInstallPrompt")?.addEventListener("click", dismissInstallPrompt);
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    renderInstallPrompt();
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    safeSetItem(installPromptDismissedKey, "true");
    renderInstallPrompt();
  });
  document.querySelector("#shareLink")?.addEventListener("click", async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
      await navigator.share({ title: "GRE Family App", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast("Trip link copied.");
      } else {
        showToast(url);
      }
    } catch {
      showToast("Share canceled.");
    }
  });

  document.addEventListener("keydown", (event) => {
    const drawer = document.querySelector(".checkin-drawer:not(.is-hidden), .item-drawer:not(.is-hidden), .profile-drawer:not(.is-hidden)");
    const isDrawerOpen = Boolean(drawer);
    if (event.key === "Escape" && isDrawerOpen) closeAllDrawers();
    if (event.key !== "Tab" || !isDrawerOpen) return;
    const focusable = Array.from(drawer.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"))
      .filter((node) => node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

async function initializeSession() {
  await loadProfile();
  if (api.user) {
    connectSharedState();
    return;
  }
}

insertIcons();
renderAll();
const initialPanel = panelFromHash() || "home";
setActivePanel(initialPanel, { replaceHash: !window.location.hash });
bindEvents();
renderAuthPeople();
resetFamilyEventForm();
registerServiceWorker();
initializeSession();

window.addEventListener("hashchange", () => {
  setActivePanel(panelFromHash() || "home", { skipHash: true });
});
