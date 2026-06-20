export interface Product {
  slug: string;
  name: string;
  price: number;
  meta: string;
  badge?: 'dropped' | 'soon';
  tag: string;
  description: string;
  details: string[];
  available: boolean;
  variant: 'tee' | 'hat';
  image: string;
  detailImage: string;
  imageAlt: string;
  pageTitle: string;
  shopifyBuy?: {
    componentId: string;
    productId: string;
  };
}

export const products: Product[] = [
  {
    slug: 'drop-001-tee',
    name: 'Drop 001 Tee',
    price: 38,
    meta: 'Faded Grey · Heavyweight Cotton',
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
    image: '/shirt1.jpg',
    detailImage: '/shirt2.jpg',
    imageAlt: 'STAK Drop 001 heavyweight garment dyed tee in faded grey',
    pageTitle: 'Drop 001 Tee — Garment Dyed Heavyweight Cotton | STAK',
    shopifyBuy: {
      componentId: 'product-component-1780507748910',
      productId: '9699208757493',
    },
  },
  {
    slug: 'washed-dad-hat',
    name: 'Washed Dad Hat',
    price: 32,
    meta: 'Walnut · 6-Panel Cotton',
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
    image: '/products/washed-dad-hat.jpg',
    detailImage: '/products/washed-dad-hat-detail.jpg',
    imageAlt: 'STAK washed dad hat in walnut brown',
    pageTitle: 'Washed Dad Hat — Walnut 6-Panel Cotton | STAK',
    shopifyBuy: {
      componentId: 'product-component-1780508170086',
      productId: '9699228385525',
    },
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
  image?: string;
  imageAlt?: string;
  pageTitle: string;
  body: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: 'why-we-started-with-a-garment-dyed-tee',
    title: 'why we started with a garment dyed tee',
    excerpt: 'we didn\'t start with a trend. we started with a question.',
    date: 'June 20, 2026',
    readTime: '4 min read',
    artClass: 'journal-art-photo',
    image: '/shirt1.png',
    imageAlt: 'stak drop 001 garment dyed t shirt',
    pageTitle: 'Why We Started With a Garment Dyed Tee — Field Notes | STAK',
    body: [
      'when we started thinking about what drop 001 should be, we didn\'t start with a trend. we started with a question.',
      'what\'s the one thing you actually reach for?',
      'not the piece you bought because it looked good on a rack. not the thing you wear once and forget about. the one that\'s already on the chair by your bed. the one that goes with everything because it doesn\'t try to go with anything.',
      'for most people, that\'s a t-shirt. a specific t-shirt. one that fits right, feels broken in from day one, and gets better every time you wash it.',
      'that\'s where we started.',
      '## the problem with most tees',
      'most t-shirts are finished before they\'re worn. they come off the line looking exactly the way the manufacturer intended. uniform color, stiff fabric, perfect and lifeless.',
      'wear them enough and they eventually soften up. the color fades unevenly. they start to feel like yours.',
      'we wanted to skip that part. we wanted a shirt that already felt lived in when you pulled it out of the bag.',
      'that\'s what garment dyeing does.',
      '## what garment dyeing actually is',
      'most clothing is made from fabric that\'s been dyed before it\'s cut and sewn. the color goes in early, the garment gets constructed later. the result is consistent, predictable, and a little flat.',
      'garment dyeing works differently. the shirt is constructed first, cut, sewn, finished, and then the whole thing goes into the dye bath as a complete garment.',
      'because seams, hems, and fabric panels absorb color at different rates, the result is never perfectly uniform. there\'s variation in the tone. subtle shifts from panel to panel. a depth that flat-dyed fabric just doesn\'t have.',
      'it looks like something that\'s been worn and loved. because in a way, the process mimics exactly that.',
      '## why it mattered for drop 001',
      'we\'re building stak around a simple idea: things that hold up. not just physically, though that matters. but aesthetically. pieces that don\'t look like a mistake six months from now.',
      'a garment dyed t shirt ages in a way that works in its favor. the more you wear it, the more it looks like it belongs to you specifically. the color settles. the fabric softens. it becomes something you wouldn\'t lend out because it already feels too personal.',
      'that\'s what we were after with drop 001.',
      'we also wanted to be honest about something: garment dyeing isn\'t a technique we\'re locked into. it\'s one approach, one that made sense for this shirt, at this moment. future drops might use different methods, different constructions, different finishes. what won\'t change is the standard we hold them to.',
      'every piece has to earn its place. it has to be something you reach for without thinking.',
      'the garment dyed tee was that for drop 001. it was the clearest expression of what we\'re trying to build. something that starts right and gets better from there.',
      '[drop 001 is live at stakclothing.com/shop](https://www.stakclothing.com/shop)',
      'small run. when it\'s gone, it\'s gone.',
    ],
  },
  {
    slug: 'short-run-and-done',
    title: 'Short Run and Done',
    excerpt: 'we make a small run of shirts each drop. that\'s it.',
    date: 'May 14, 2026',
    readTime: '3 min read',
    artClass: 'journal-art-1',
    image: '/shortrunanddone.png',
    imageAlt: 'Runners on Lady Bird Lake trail with Austin skyline',
    pageTitle: 'Short Run and Done — Why We Keep Runs Small | STAK',
    body: [
      'we make a small run of shirts each drop. that\'s it.',
      'a short run means every shirt gets more than inspected. it gets held up. turned over. tried on by someone in the room before it goes in the bag.',
      'not because we can\'t make more. because we don\'t want to. there\'s something about a small number that changes the way you think about what you\'re making. you stop cutting corners. you stop thinking about scale. you start thinking about the person who\'s going to put it on.',
      'it also means they go fast, and when they\'re gone, they\'re gone. we\'re not restocking. we\'re not running it back. the next drop will be something different.',
      'some people hear that and think it\'s a marketing thing. scarcity. hype. whatever. it\'s not. it\'s just the number where we can still make something we\'d actually wear and not lose sleep over what we sent out.',
      'maybe one day the run gets bigger. but right now, keeping it small feels honest.',
    ],
  },
  {
    slug: 'saturday-morning-south-congress',
    title: 'Saturday Morning, South Congress',
    excerpt: 'no alarm. off to a late start. doesn\'t matter.',
    date: 'April 28, 2026',
    readTime: '4 min read',
    artClass: 'journal-art-2',
    image: '/sfirst.jpg',
    imageAlt: 'Man reading on South Congress Avenue sidewalk Austin',
    pageTitle: 'Saturday Morning, South Congress — Field Notes | STAK',
    body: [
      'no alarm. off to a late start. doesn\'t matter.',
      'south congress on a saturday has this specific thing where nobody\'s in a hurry but everybody\'s out. the guy setting up the vintage shops across from Homeslice. someone\'s dog tied to a bench, totally fine with it. the couple splitting a kolache on the sidewalk without talking.',
      'you put on a shirt you didn\'t think about. shorts. whatever shoes are closest to the door. the outfit takes four seconds and somehow that\'s when it looks right.',
      'there\'s a walk you do — not to anywhere, just out and back. past the I love you so much mural at Jo\'s. past the place that used to be a bar and is now a coffee shop and will probably be something else next year. you don\'t mind. the street holds its shape even when the names on the doors don\'t.',
      'this is the energy we make clothes for. not the big moment. the nothing moment. saturday morning, south congress, no plans.',
    ],
  },
  {
    slug: 'what-in-between-means',
    title: 'What "In-Between" Means',
    excerpt: 'most brands pick a lane. gym brand. surf brand. outdoor brand.',
    date: 'April 10, 2026',
    readTime: '5 min read',
    artClass: 'journal-art-3',
    image: '/inbetween.png',
    imageAlt: 'Empty two-lane road through Texas Hill Country at golden hour',
    pageTitle: 'What In-Between Means — Our Philosophy | STAK',
    body: [
      'most brands pick a lane. gym brand. surf brand. outdoor brand. you know what you\'re getting before you even look.',
      'we didn\'t want that.',
      'stak lives in the in-between. the hour after the meeting and before the trail. the drive where you\'re not at work anymore but you\'re not on vacation yet. the outfit that works at the coffee shop but still works at the campsite and you didn\'t have to change.',
      'that\'s not an accident. that\'s the whole idea.',
      'we grew up around people who didn\'t really separate their lives into categories. they don\'t dress for one version of themselves. they just get dressed.',
      'there\'s a road outside austin — you\'ve probably driven it — where the city just stops and the hill country starts. no transition. no sign that says \'now entering nature.\' one second you\'re passing a gas station and the next second the sky opens up and your phone loses signal. the in-between happens fast and you don\'t notice it until you\'re already in it.',
      'that\'s what we want the clothes to feel like. you put them on in one place and they just come with you to the next one. no costume change. no \'this is my weekend shirt.\' just stuff that moves with you.',
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
