export interface Product {
  slug: string;
  name: string;
  price: number;
  meta: string;
  stock: string;
  stockType: 'live' | 'soon';
  badge?: 'dropped' | 'soon';
  tag: string;
  description: string;
  details: string[];
  available: boolean;
  variant: 'tee' | 'hat' | 'bone';
}

export const products: Product[] = [
  {
    slug: 'drop-001-tee',
    name: 'Drop 001 Tee',
    price: 58,
    meta: 'Faded Grey · Heavyweight Cotton',
    stock: '17 of 24 remaining',
    stockType: 'live',
    badge: 'dropped',
    tag: '01',
    description:
      'Our first run tee — 240gsm cotton, garment-dyed in small batches for a lived-in fade from day one. Grid mark on chest.',
    details: [
      '240gsm heavyweight cotton',
      'Garment-dyed in Texas',
      'Double-needle stitching',
      'Relaxed fit — true to size',
    ],
    available: true,
    variant: 'tee',
  },
  {
    slug: 'washed-dad-hat',
    name: 'Washed Dad Hat',
    price: 38,
    meta: 'Walnut · 6-Panel Cotton',
    stock: '9 of 24 remaining',
    stockType: 'live',
    tag: '02',
    description:
      'Six-panel cotton cap, washed for softness. Embroidered wordmark. The kind of hat you forget you\'re wearing.',
    details: [
      '6-panel unstructured cotton',
      'Adjustable brass buckle',
      'Embroidered wordmark',
      'One size fits most',
    ],
    available: true,
    variant: 'hat',
  },
  {
    slug: 'bone-pocket-tee',
    name: 'Bone Pocket Tee',
    price: 62,
    meta: 'Bone · Garment Dyed',
    stock: 'Drops May 28',
    stockType: 'soon',
    badge: 'soon',
    tag: '03',
    description:
      'Bone-dyed pocket tee with a subtle wordmark. Same heavyweight build as Drop 001 — different character.',
    details: [
      '240gsm heavyweight cotton',
      'Left chest pocket',
      'Garment-dyed bone wash',
      'Relaxed fit — true to size',
    ],
    available: false,
    variant: 'bone',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  artClass: string;
  body: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: '24-and-done',
    title: '24 and Done',
    excerpt: 'we make 24 shirts per drop. that\'s it.',
    date: 'May 14, 2026',
    readTime: '3 min read',
    artClass: 'journal-art-1',
    body: [
      'we make 24 shirts per drop. that\'s it.',
      'not because we can\'t make more. because we don\'t want to. there\'s something about a small number that changes the way you think about what you\'re making. you stop cutting corners. you stop thinking about scale. you start thinking about the person who\'s going to put it on.',
      '24 means every shirt gets looked at. not inspected — looked at. held up. turned over. tried on by someone in the room before it goes in the bag.',
      'it also means they go fast, and when they\'re gone, they\'re gone. we\'re not restocking. we\'re not running it back. the next drop will be something different.',
      'some people hear that and think it\'s a marketing thing. scarcity. hype. whatever. it\'s not. it\'s just the number where we can still make something we\'d actually wear and not lose sleep over what we sent out.',
      'maybe one day the number changes. but right now, 24 feels honest.',
    ],
  },
  {
    slug: 'saturday-morning-south-first',
    title: 'Saturday Morning, South First',
    excerpt: 'no alarm. coffee\'s already cold by the time you get to it.',
    date: 'April 28, 2026',
    readTime: '4 min read',
    artClass: 'journal-art-2',
    body: [
      'no alarm. coffee\'s already cold by the time you get to it. doesn\'t matter.',
      'south first on a saturday has this specific thing where nobody\'s in a hurry but everybody\'s out. the guy unlocking the vintage shop. someone\'s dog tied to a bench, totally fine with it. the couple splitting a kolache on the sidewalk without talking.',
      'you put on a shirt you didn\'t think about. shorts. whatever shoes are closest to the door. the outfit takes four seconds and somehow that\'s when it looks right.',
      'there\'s a walk you do — not to anywhere, just out and back. past the mural that changes every few months. past the place that used to be a bar and is now a coffee shop and will probably be something else next year. you don\'t mind. the street holds its shape even when the names on the doors don\'t.',
      'this is the energy we make clothes for. not the big moment. the nothing moment. saturday morning, south first, cold coffee, no plans.',
    ],
  },
  {
    slug: 'what-in-between-means',
    title: 'What "In-Between" Means',
    excerpt: 'most brands pick a lane. gym brand. surf brand. outdoor brand.',
    date: 'April 10, 2026',
    readTime: '5 min read',
    artClass: 'journal-art-3',
    body: [
      'most brands pick a lane. gym brand. surf brand. outdoor brand. you know what you\'re getting before you even look.',
      'we didn\'t want that.',
      'stak lives in the in-between. the hour after the meeting and before the trail. the drive where you\'re not at work anymore but you\'re not on vacation yet. the outfit that works at the coffee shop and still works at the campsite and you didn\'t change.',
      'that\'s not an accident. that\'s the whole idea.',
      'we grew up around people who didn\'t really separate their lives into categories. the guy who surfs before work and closes deals by lunch. the woman who hikes canyons on saturday and runs a studio on monday. they don\'t dress for one version of themselves. they just get dressed.',
      'there\'s a road outside austin — you\'ve probably driven it — where the city just stops and the canyon starts. no transition. no sign that says "now entering nature." one second you\'re passing a gas station and the next second the sky opens up and the rock walls drop and your phone loses signal. the in-between happens fast and you don\'t notice it until you\'re already in it.',
      'that\'s what we want the clothes to feel like. you put them on in one place and they just come with you to the next one. no costume change. no "this is my weekend shirt." just stuff that moves with you.',
      'we don\'t pick a lane because you don\'t live in one.',
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
