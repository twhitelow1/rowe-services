// One object = one town page at /service-areas/<slug>.
// Each page needs genuinely local substance (county, ZIPs, housing, local weather/tree issues),
// never a token-swapped town name. Blog posts link in automatically via `town` frontmatter.
import type { Faq } from './services';

export type Location = {
  slug: string;
  town: string;
  county: 'Lake' | 'Marion' | 'Sumter';
  zips: string[];
  geo: { lat: number; lng: number };
  title: string;
  description: string;
  answer: string;
  local: string[]; // paragraphs about homes + conditions in this town
  watchFor: string[]; // local exterior issues
  services: string[]; // service slugs, most relevant first
  nearby: string[]; // location slugs
  faqs: Faq[];
};

const std = (town: string): Faq[] => [
  { q: `Who installs seamless gutters in ${town}, FL?`, a: `Rowe Services & Maintenance, an owner-operated exterior company based in Grand Island, FL, installs 6" seamless aluminum gutters in ${town}. Every job is quoted by the owner and backed by a 15-year warranty.` },
  { q: `Do you charge to come out and quote in ${town}?`, a: `No. Quotes are free and no-obligation. We walk the property with you and give you a clear, written price.` },
  { q: `How long does a gutter install take in ${town}?`, a: `Most homes are done in a single day, depending on the layout and how much downspout and drainage work is needed. You get 24 hours' confirmation before the crew arrives.` },
];

export const locations: Location[] = [
  {
    slug: 'the-villages-fl',
    town: 'The Villages',
    county: 'Sumter',
    zips: ['32162', '32163', '32159'],
    geo: { lat: 28.9342, lng: -81.9598 },
    title: 'Gutters & Exterior Services in The Villages, FL | Rowe',
    description: 'Seamless gutters, soffit & fascia, vinyl siding and lanai screen enclosures in The Villages, FL. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and handles soffit, fascia, vinyl siding and screen enclosures for homes throughout The Villages, FL — across the Sumter, Lake and Marion County sections of the community. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'The Villages is where most of our work happens. Homes here are largely concrete-block construction with stucco, from courtyard villas and patio villas to larger designer homes, and nearly every one has a lanai or birdcage. That makes gutters, fascia and screen enclosures the three things that matter most to keep up.',
      'Summer storms here drop a lot of water in a short time. Without gutters — or with undersized ones — that runoff splashes back onto lanai screens, stains stucco, and washes out the landscaping beds that line most Villages homes. Many newer villages farther south also have young trees that will drop more leaves every year.',
      'Exterior changes in The Villages often need community architectural review approval. We can provide the product details, colors and layout you need to submit.',
    ],
    watchFor: [
      'Runoff splashing onto lanai and birdcage screens',
      'Overflow staining stucco and washing out landscape beds',
      'Torn or sun-brittle screen spline on birdcages',
      'Fascia rot behind older, sectional gutters',
    ],
    services: ['seamless-gutters', 'porches-and-enclosures', 'soffit-and-fascia', 'vinyl-siding'],
    nearby: ['lady-lake-fl', 'wildwood-fl', 'summerfield-fl', 'fruitland-park-fl'],
    faqs: [
      ...std('The Villages'),
      { q: 'Do I need approval to add gutters or an enclosure in The Villages?', a: 'Many exterior changes in The Villages require community architectural review. We provide the specs, colors and layout you need for your submission, and schedule the work once you have approval.' },
      { q: 'Do you install gutters on courtyard and patio villas?', a: 'Yes. We size and route gutters and downspouts for villas, designer homes and manufactured homes in and around The Villages.' },
    ],
  },
  {
    slug: 'lady-lake-fl',
    town: 'Lady Lake',
    county: 'Lake',
    zips: ['32159', '32158'],
    geo: { lat: 28.9175, lng: -81.9229 },
    title: 'Seamless Gutters & Exterior Repair in Lady Lake, FL | Rowe',
    description: 'Seamless gutters, gutter repair, soffit & fascia, siding and screen porches in Lady Lake, FL. Owner-quoted, 15-year warranty. Free, no-pressure quote.',
    answer: 'Rowe Services & Maintenance installs and repairs seamless gutters and handles soffit, fascia, vinyl siding, skirting and screen porches for homes in Lady Lake, FL, in northern Lake County next to The Villages. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Lady Lake sits right alongside The Villages in northern Lake County, with a mix of site-built block homes, older wood-frame houses and a large number of manufactured-home communities. That mix means we see every kind of gutter, fascia and skirting problem here.',
      'The most common call we get in Lady Lake is a gutter corner or seam that was sealed in spring and is dripping again by August. Central Florida heat and humidity break down ordinary sealant fast — which is exactly why we moved to seamless runs and our own sealant process.',
    ],
    watchFor: [
      'Seams and corners on sectional gutters that leak every rainy season',
      'Mobile and manufactured homes without gutters or with undersized ones',
      'Damaged or missing vinyl skirting',
      'Fascia rot where gutters have overflowed for years',
    ],
    services: ['seamless-gutters', 'vinyl-siding', 'soffit-and-fascia', 'porches-and-enclosures'],
    nearby: ['the-villages-fl', 'fruitland-park-fl', 'leesburg-fl', 'weirsdale-fl'],
    faqs: [
      ...std('Lady Lake'),
      { q: 'Why do my gutters in Lady Lake keep leaking at the same joint?', a: 'Sectional gutter joints rely on sealant, and Central Florida heat, UV and humidity break it down quickly. Seamless gutters remove most of those joints entirely, and we seal the ones that remain with our own process.' },
      { q: 'Do you do gutters and skirting on manufactured homes in Lady Lake?', a: 'Yes. We install gutters sized for manufactured-home rooflines and vinyl skirting.' },
    ],
  },
  {
    slug: 'fruitland-park-fl',
    town: 'Fruitland Park',
    county: 'Lake',
    zips: ['34731'],
    geo: { lat: 28.8611, lng: -81.9065 },
    title: 'Gutters & Exterior Services in Fruitland Park, FL | Rowe',
    description: 'Seamless gutters, soffit & fascia, siding and screen enclosures in Fruitland Park, FL. Storm-ready exterior work, owner-quoted. Free estimate.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and repairs soffit, fascia, siding and screen enclosures for homes in Fruitland Park, FL, between Lady Lake and Leesburg on Lake Griffin. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Fruitland Park is a small Lake County city between Lady Lake and Leesburg, with a mix of established neighborhoods, newer subdivisions and lakeside homes near Lake Griffin. Being inland gives a false sense of safety — tropical systems still push heavy rain and wind across this part of Lake County every season.',
      'Before storm season, the weak points we see most here are gutters that overflow at the corners, fascia that has quietly rotted behind them, and screen enclosures with loose panels that catch the wind.',
    ],
    watchFor: [
      'Gutters that overflow at corners during heavy storms',
      'Hidden fascia rot behind older gutters',
      'Loose or torn screen panels before storm season',
      'Downspouts dumping water against the foundation',
    ],
    services: ['seamless-gutters', 'soffit-and-fascia', 'porches-and-enclosures', 'vinyl-siding'],
    nearby: ['lady-lake-fl', 'leesburg-fl', 'the-villages-fl', 'grand-island-fl'],
    faqs: [
      ...std('Fruitland Park'),
      { q: 'What should Fruitland Park homeowners fix before storm season?', a: 'Start with water: make sure gutters are clear, properly sloped and attached to sound fascia, and that downspouts carry water away from the foundation. Then check screen enclosures for loose panels and torn screens.' },
    ],
  },
  {
    slug: 'leesburg-fl',
    town: 'Leesburg',
    county: 'Lake',
    zips: ['34748', '34788', '34749'],
    geo: { lat: 28.8108, lng: -81.8779 },
    title: 'Seamless Gutters, Soffit & Fascia in Leesburg, FL | Rowe',
    description: 'Seamless gutters, soffit & fascia rot repair, vinyl siding and screen porches in Leesburg, FL. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and replaces rotted soffit and fascia, vinyl siding and screen enclosures for homes in Leesburg, FL, between Lake Harris and Lake Griffin in Lake County. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Leesburg has some of the oldest housing stock we work on — established neighborhoods with wood-frame homes and painted wood fascia, alongside newer subdivisions and 55+ communities. Older wood trim plus lake-country humidity is a recipe for soffit and fascia rot.',
      'Rot usually starts where a gutter has overflowed for years or where a soffit has no ventilation. By the time paint is peeling, the wood behind it is often soft. We replace the damaged sections, fix the water problem that caused it, and cover the roof edge in low-maintenance vinyl or aluminum.',
    ],
    watchFor: [
      'Soft, rotting wood fascia and soffit on older homes',
      'Gutters pulling away from weakened fascia',
      'Unvented soffits trapping attic heat and moisture',
      'Siding and trim weathered by lakeside humidity',
    ],
    services: ['soffit-and-fascia', 'seamless-gutters', 'vinyl-siding', 'porches-and-enclosures'],
    nearby: ['fruitland-park-fl', 'tavares-fl', 'lady-lake-fl', 'wildwood-fl'],
    faqs: [
      ...std('Leesburg'),
      { q: 'Can you replace rotted fascia and install new gutters in one visit?', a: "Yes, and on older Leesburg homes it's usually the right approach. The fascia holds the gutters, so we repair the roof edge first and hang the new seamless gutters on solid material." },
    ],
  },
  {
    slug: 'tavares-fl',
    town: 'Tavares',
    county: 'Lake',
    zips: ['32778'],
    geo: { lat: 28.8042, lng: -81.7256 },
    title: 'Gutters, Soffit & Siding in Tavares, FL | Rowe Services',
    description: 'Seamless gutters, soffit & fascia, vinyl siding and screen enclosures in Tavares, FL. Owner-operated since 2013, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and handles soffit, fascia, vinyl siding and screen enclosures for homes in Tavares, FL, the Lake County seat between Lake Dora, Lake Eustis and Lake Harris. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Tavares is surrounded by water — Lake Dora, Lake Eustis and Lake Harris all touch the city — and that humidity is hard on roof edges, wood trim and screens. Homes range from older wood-frame houses near downtown to block homes and newer communities.',
      'We see a lot of soffit and fascia that has started to rot from the inside, gutters that have pulled loose as a result, and lakeside screen enclosures that need rescreening after a few seasons of sun and storms.',
    ],
    watchFor: [
      'Moisture-driven soffit and fascia rot',
      'Gutters loosening from soft fascia',
      'Sun- and storm-worn screen enclosures near the lakes',
      'Mildew behind aging siding',
    ],
    services: ['soffit-and-fascia', 'seamless-gutters', 'porches-and-enclosures', 'vinyl-siding'],
    nearby: ['eustis-fl', 'mount-dora-fl', 'leesburg-fl', 'grand-island-fl'],
    faqs: [
      ...std('Tavares'),
      { q: 'Does lakeside humidity in Tavares affect soffit and fascia?', a: 'Yes. Constant moisture speeds up rot in wood soffit and fascia, especially where ventilation is poor or gutters overflow. Vinyl or aluminum, plus vented soffit where needed, holds up much better.' },
    ],
  },
  {
    slug: 'eustis-fl',
    town: 'Eustis',
    county: 'Lake',
    zips: ['32726', '32736'],
    geo: { lat: 28.8528, lng: -81.6851 },
    title: 'Gutters & Screen Enclosures in Eustis, FL | Rowe Services',
    description: 'Seamless gutters, porch and patio enclosures, soffit & fascia and siding in Eustis, FL. Owner-quoted, minutes from our Grand Island base. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters, encloses porches and patios, and repairs soffit, fascia and siding for homes in Eustis, FL, on the shore of Lake Eustis — just south of our home base in Grand Island. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Eustis is practically next door to our base in Grand Island. Homes here range from historic wood-frame houses near downtown and the lakefront to block homes and newer subdivisions on the edges of town.',
      'A lot of Eustis homeowners call us to enclose an existing porch or patio so they can use it year-round without bugs and blown-in debris — and to add gutters so roof runoff stops splashing into the space.',
    ],
    watchFor: [
      'Open porches and patios that collect debris and bugs',
      'Roof runoff splashing into porches without gutters',
      'Aging wood trim on older homes',
      'Tree debris clogging gutters',
    ],
    services: ['porches-and-enclosures', 'seamless-gutters', 'soffit-and-fascia', 'vinyl-siding'],
    nearby: ['grand-island-fl', 'mount-dora-fl', 'tavares-fl', 'umatilla-fl'],
    faqs: [
      ...std('Eustis'),
      { q: 'Can you close in my existing porch in Eustis?', a: 'Yes. Patio and porch close-ins are one of our most common projects. We walk the existing structure with you and tell you what\'s realistic.' },
    ],
  },
  {
    slug: 'mount-dora-fl',
    town: 'Mount Dora',
    county: 'Lake',
    zips: ['32757'],
    geo: { lat: 28.8025, lng: -81.6445 },
    title: 'Gutters & Porch Enclosures in Mount Dora, FL | Rowe',
    description: 'Seamless gutters, porch & patio enclosures, soffit & fascia and siding in Mount Dora, FL. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and builds porch and patio enclosures, soffit, fascia and siding for homes in Mount Dora, FL, on Lake Dora in Lake County. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Mount Dora has rolling hills, mature oak canopy and a lot of character homes — older wood-frame houses around downtown and the lakefront, plus newer neighborhoods on the outskirts. Hills and trees change how water moves: steeper runoff and heavier leaf load both demand properly sized gutters and downspouts.',
      'Porch and patio enclosures are a big request here. Homeowners want to enjoy the outdoor space without the bugs and leaf litter, and a well-built enclosure does that while keeping the look of the house.',
    ],
    watchFor: [
      'Heavy oak leaf load clogging gutters',
      'Fast runoff on sloped lots eroding beds and walkways',
      'Wood trim and fascia on older homes',
      'Porches and patios that need screening',
    ],
    services: ['porches-and-enclosures', 'seamless-gutters', 'soffit-and-fascia', 'vinyl-siding'],
    nearby: ['eustis-fl', 'tavares-fl', 'grand-island-fl', 'umatilla-fl'],
    faqs: [
      ...std('Mount Dora'),
      { q: 'Do I need gutter guards in Mount Dora?', a: 'Under mature oaks, often yes. Guards cut down clogs and the overflow that happens when a sudden downpour hits a gutter full of leaves. We\'ll tell you honestly if your trees make them worth it.' },
    ],
  },
  {
    slug: 'umatilla-fl',
    town: 'Umatilla',
    county: 'Lake',
    zips: ['32784'],
    geo: { lat: 28.9294, lng: -81.6656 },
    title: 'Seamless Gutters & Exterior Work in Umatilla, FL | Rowe',
    description: 'Seamless gutters, leaf guards, siding, skirting, soffit & fascia and screen porches in Umatilla, FL. Owner-quoted from nearby Grand Island. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and leaf guards and handles siding, skirting, soffit, fascia and screen porches for homes in Umatilla, FL, in northern Lake County near the Ocala National Forest — a short drive from our Grand Island base.',
    local: [
      'Umatilla is rural northern Lake County at the edge of the Ocala National Forest, a few miles from our home base in Grand Island. Lots are bigger, pines and oaks are everywhere, and homes range from site-built block and wood-frame houses to manufactured homes on acreage.',
      'Pine needles are the big gutter problem out here — they mat down and hold water. Leaf guards and properly sized downspouts make the biggest difference.',
    ],
    watchFor: [
      'Pine needles and oak leaves matting in gutters',
      'Manufactured homes needing gutters and skirting',
      'Woodpecker and pest damage to wood trim',
      'Long runs of runoff on larger lots',
    ],
    services: ['seamless-gutters', 'vinyl-siding', 'soffit-and-fascia', 'porches-and-enclosures'],
    nearby: ['grand-island-fl', 'eustis-fl', 'mount-dora-fl', 'weirsdale-fl'],
    faqs: [
      ...std('Umatilla'),
      { q: 'Do gutter guards work with pine needles?', a: 'Screens reduce how much needle debris gets into the gutter, which cuts down on clogs and overflow. No guard is zero-maintenance, and we\'ll explain what to expect for your trees.' },
    ],
  },
  {
    slug: 'grand-island-fl',
    town: 'Grand Island',
    county: 'Lake',
    zips: ['32735'],
    geo: { lat: 28.8872, lng: -81.7298 },
    title: 'Gutters & Exterior Services in Grand Island, FL | Rowe',
    description: 'Rowe Services & Maintenance is based in Grand Island, FL. Seamless gutters, soffit & fascia, siding and screen porches from your local owner-operator.',
    answer: 'Rowe Services & Maintenance is based in Grand Island, FL, in Lake County between Eustis and Umatilla. We install seamless gutters and handle soffit, fascia, vinyl siding and screen enclosures for our neighbors here and across Central Florida, with the owner on every job.',
    local: [
      'Grand Island is home base. It\'s a quiet, unincorporated part of Lake County with lakefront homes, acreage and wooded lots, and a mix of block, wood-frame and manufactured homes.',
      'Being local matters: you\'re dealing with a neighbor whose name is on the truck, and if something needs a second look after the job, it\'s a short drive for us to come back and make it right.',
    ],
    watchFor: [
      'Tree debris on wooded lots clogging gutters',
      'Lakefront humidity on wood trim and screens',
      'Manufactured homes needing gutters and skirting',
      'Downspouts draining into sandy soil next to the slab',
    ],
    services: ['seamless-gutters', 'soffit-and-fascia', 'porches-and-enclosures', 'vinyl-siding'],
    nearby: ['eustis-fl', 'umatilla-fl', 'tavares-fl', 'mount-dora-fl'],
    faqs: [
      ...std('Grand Island'),
      { q: 'Where is Rowe Services located?', a: 'We are based in Grand Island, FL, in Lake County, and serve Lake, Marion, Sumter and Orange County communities.' },
    ],
  },
  {
    slug: 'wildwood-fl',
    town: 'Wildwood',
    county: 'Sumter',
    zips: ['34785'],
    geo: { lat: 28.8653, lng: -82.0401 },
    title: 'Seamless Gutters & Gutter Guards in Wildwood, FL | Rowe',
    description: 'Seamless gutters, gutter guards, soffit & fascia, siding and screen enclosures in Wildwood, FL. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and gutter guards and handles soffit, fascia, siding and screen enclosures for homes in Wildwood, FL, in Sumter County — including the newer villages and neighborhoods south of State Road 44. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Wildwood covers older neighborhoods under heavy oak and pine canopy as well as fast-growing new communities, including the southern villages of The Villages. Older lots shed leaves, needles and twigs straight onto the roof all year.',
      'When storm season hits, that canopy turns an open gutter into a catch basin. Gutter guards and properly placed downspouts keep heavy rain moving instead of spilling over the edge.',
    ],
    watchFor: [
      'Dense tree canopy clogging open gutters',
      'Overflow during summer storms',
      'New-construction homes delivered without gutters',
      'Screen enclosures exposed to falling limbs',
    ],
    services: ['seamless-gutters', 'porches-and-enclosures', 'soffit-and-fascia', 'vinyl-siding'],
    nearby: ['the-villages-fl', 'leesburg-fl', 'lady-lake-fl', 'summerfield-fl'],
    faqs: [
      ...std('Wildwood'),
      { q: 'My new Wildwood home came without gutters. Can you add them?', a: 'Yes. We add seamless gutters and downspouts to new-construction homes, sized and routed for your roofline and lot.' },
    ],
  },
  {
    slug: 'summerfield-fl',
    town: 'Summerfield',
    county: 'Marion',
    zips: ['34491'],
    geo: { lat: 28.9989, lng: -82.0151 },
    title: 'Gutters, Siding & Exterior Work in Summerfield, FL | Rowe',
    description: 'Seamless gutters, vinyl siding, soffit & fascia and screen porches in Summerfield, FL (Marion County). Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and vinyl siding and handles soffit, fascia and screen porches for homes in Summerfield, FL, in southern Marion County along the US-301/441 corridor north of The Villages. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Summerfield sits just north of The Villages in Marion County, with 55+ communities, manufactured-home parks and site-built homes on larger lots along the US-301/441 corridor and around Lake Weir.',
      'Vinyl siding is a frequent project here. What homeowners wish they knew beforehand is that the install matters more than the panel: flashing, fastening and ventilation decide whether siding lasts in Florida heat.',
    ],
    watchFor: [
      'Faded, warped or storm-damaged siding',
      'Manufactured homes needing skirting and gutters',
      'Gutter overflow on homes with large roof areas',
      'Screen enclosures worn by sun',
    ],
    services: ['vinyl-siding', 'seamless-gutters', 'soffit-and-fascia', 'porches-and-enclosures'],
    nearby: ['belleview-fl', 'the-villages-fl', 'weirsdale-fl', 'ocklawaha-fl'],
    faqs: [
      ...std('Summerfield'),
      { q: 'Is vinyl siding worth it in Summerfield?', a: 'Installed correctly — with proper flashing, fastening and ventilation — vinyl holds up well to Florida heat and storms and never needs repainting.' },
    ],
  },
  {
    slug: 'belleview-fl',
    town: 'Belleview',
    county: 'Marion',
    zips: ['34420', '34421'],
    geo: { lat: 29.0553, lng: -82.0623 },
    title: 'Vinyl Siding & Seamless Gutters in Belleview, FL | Rowe',
    description: 'Vinyl siding, seamless gutters, soffit & fascia and screen enclosures in Belleview, FL. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs vinyl siding and seamless gutters and handles soffit, fascia and screen enclosures for homes in Belleview, FL, in Marion County south of Ocala. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Belleview is a Marion County town on the US-301/441 corridor between Ocala and The Villages, with established neighborhoods of block and wood-frame homes plus many manufactured homes and newer subdivisions.',
      'Siding replacement and gutter installs are the most common projects we do here — often together, since new siding is the right time to make sure roof runoff isn\'t soaking the walls.',
    ],
    watchFor: [
      'Aging, faded or cracked siding',
      'Homes without gutters letting runoff hit the walls',
      'Fascia rot on older wood-frame homes',
      'Storm-damaged screen enclosures',
    ],
    services: ['vinyl-siding', 'seamless-gutters', 'soffit-and-fascia', 'porches-and-enclosures'],
    nearby: ['summerfield-fl', 'ocklawaha-fl', 'weirsdale-fl', 'the-villages-fl'],
    faqs: [
      ...std('Belleview'),
      { q: 'Should I do gutters and siding at the same time?', a: 'Often, yes. New siding is the ideal time to make sure gutters and downspouts keep roof runoff off the walls, and doing both together avoids a second disruption.' },
    ],
  },
  {
    slug: 'weirsdale-fl',
    town: 'Weirsdale',
    county: 'Marion',
    zips: ['32195'],
    geo: { lat: 28.9800, lng: -81.9187 },
    title: 'Gutters & Exterior Services in Weirsdale, FL | Rowe',
    description: 'Seamless gutters, siding, skirting, soffit & fascia and screen porches in Weirsdale, FL near Lake Weir. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and handles siding, skirting, soffit, fascia and screen porches for homes in Weirsdale, FL, in southeastern Marion County near Lake Weir. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Weirsdale is rural Marion County horse country near the south shore of Lake Weir — farms, acreage and homes set among big oaks, along with manufactured homes and lakefront houses.',
      'On larger rural properties, gutters do more than protect the house: well-placed downspouts keep water away from foundations, walkways and outbuildings instead of carving channels in sandy soil.',
    ],
    watchFor: [
      'Oak debris clogging gutters',
      'Runoff eroding sandy soil around the home',
      'Manufactured homes needing gutters and skirting',
      'Wood trim exposed to lake humidity',
    ],
    services: ['seamless-gutters', 'vinyl-siding', 'porches-and-enclosures', 'soffit-and-fascia'],
    nearby: ['ocklawaha-fl', 'summerfield-fl', 'lady-lake-fl', 'the-villages-fl'],
    faqs: [
      ...std('Weirsdale'),
      { q: 'Do you install gutters on homes with acreage?', a: 'Yes. We plan downspout placement and extensions so runoff clears the foundation and doesn\'t wash out walkways or sandy soil.' },
    ],
  },
  {
    slug: 'ocklawaha-fl',
    town: 'Ocklawaha',
    county: 'Marion',
    zips: ['32179'],
    geo: { lat: 29.0425, lng: -81.9287 },
    title: 'Gutters & Screen Enclosures in Ocklawaha, FL | Rowe',
    description: 'Seamless gutters, screen enclosures, siding, skirting, soffit & fascia in Ocklawaha, FL on Lake Weir. Owner-quoted, 15-year warranty. Free quote.',
    answer: 'Rowe Services & Maintenance installs seamless gutters and builds and repairs screen enclosures, siding, skirting, soffit and fascia for homes in Ocklawaha, FL, on the north shore of Lake Weir in Marion County. Every job is quoted by the owner and backed by a 15-year warranty.',
    local: [
      'Ocklawaha wraps the north side of Lake Weir in Marion County, with lakefront homes, older cottages, manufactured homes and wooded lots.',
      'Lakeside homes here get a lot of use out of screen porches and enclosures, and the sun and storms off the lake wear screens and spline out faster than homeowners expect.',
    ],
    watchFor: [
      'Brittle screen spline and torn screens on lakeside enclosures',
      'Manufactured homes needing gutters and skirting',
      'Tree debris clogging gutters on wooded lots',
      'Moisture damage to wood trim',
    ],
    services: ['porches-and-enclosures', 'seamless-gutters', 'vinyl-siding', 'soffit-and-fascia'],
    nearby: ['weirsdale-fl', 'belleview-fl', 'summerfield-fl', 'umatilla-fl'],
    faqs: [
      ...std('Ocklawaha'),
      { q: 'How often do screen enclosures need rescreening near Lake Weir?', a: 'It depends on sun exposure and storms, but UV breaks down screen and spline over time. If the frame is sound, rescreening restores the enclosure without a rebuild.' },
    ],
  },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
export const locationByTown = (town?: string) => (town ? locations.find((l) => l.town.toLowerCase() === town.toLowerCase()) : undefined);
