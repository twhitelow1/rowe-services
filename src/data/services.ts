// One object = one service page at /services/<slug>. Copy is in Justin's first-person,
// plain-spoken voice. Facts come from the live site; no prices or new guarantees invented.

export type Faq = { q: string; a: string };
export type Item = { title: string; text: string };

export type Service = {
  slug: string;
  name: string;
  short: string; // nav label
  icon: string;
  title: string; // <title>, ≤ 60 chars
  description: string; // meta description, 140–160 chars
  h1: string;
  answer: string; // answer-first intro (quotable)
  card: string; // card + llms.txt summary
  facts: { label: string; value: string }[];
  intro: string[];
  signsHeading: string;
  signs: string[];
  offerings: Item[];
  benefits: Item[];
  process: Item[];
  includes: string[];
  pricing: { factor: string; why: string }[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: 'seamless-gutters',
    name: 'Seamless Gutters',
    short: 'Seamless Gutters',
    icon: 'gutter',
    title: 'Seamless Gutters in The Villages, FL | Rowe Services',
    description: 'Owner-installed 6" seamless aluminum gutters in The Villages & Lake County, FL. Repairs, leaf guards, 15-year warranty. Free quote from Justin Rowe.',
    h1: 'Seamless Gutter Installation in The Villages, FL',
    answer: 'Rowe Services & Maintenance installs, replaces and repairs 6-inch seamless aluminum K-style gutters for homes in The Villages and across Lake, Marion, Sumter and Orange County, Florida. Each gutter run is formed on site as one continuous piece, so there are far fewer joints where a leak can start, and every install is backed by a 15-year warranty.',
    card: '6" seamless aluminum K-style gutters, replacements, repairs, mobile-home gutters and leaf guards — sized to your roofline and built for Florida downpours.',
    facts: [
      { label: 'Gutter profile', value: '6" seamless aluminum K-style' },
      { label: 'Warranty', value: '15 years on every install' },
      { label: 'Typical install', value: 'Most homes in a single day' },
      { label: 'Who quotes it', value: 'Justin Rowe, the owner' },
    ],
    intro: [
      "Central Florida storms can dump a lot of water fast. When gutters can't keep up, that water ends up on your fascia, your landscaping and against your foundation. A seamless system moves it where it belongs — away from the house.",
      "Seamless gutters are formed from one continuous run instead of short sections snapped together. That means fewer leak points, a cleaner line along your roof, and less to maintain. I size every system to your actual roofline and drainage, not a one-size-fits-all guess.",
    ],
    signsHeading: 'Signs you need new gutters or a repair',
    signs: [
      'Water pouring over the edge during a rain instead of running to the downspouts',
      'Stains or streaks on your siding, soffit or fascia',
      'Peeling paint or soft, rotting fascia boards behind the gutter',
      'Sagging runs, loose hangers or gutters pulling away from the roofline',
      'Soil erosion, trenches or puddles along the foundation after a storm',
      'Joints and corners that drip again every rainy season',
    ],
    offerings: [
      { title: 'Seamless gutter installation', text: "Custom-fit 6\" seamless gutters that match your roofline. We dial in the pitch so water doesn't stand, use secure hangers, and plan clean downspout routing so runoff goes where you want it." },
      { title: 'Gutter replacement', text: 'Old sectional gutters leaking at every seam? We remove the failing system and replace it with one continuous run per side — fewer joints, fewer leaks.' },
      { title: 'Gutter repair', text: 'Leaking, sagging, overflowing or pulling away? We find the cause and fix it the right way: correcting slope, re-securing runs, replacing damaged sections, resealing corners and end caps, or adjusting downspouts.' },
      { title: 'Gutter screens & leaf guards', text: "Screens cut down clogs from oak leaves, pine needles and roof grit — important here, where a sudden downpour turns a small clog into a big overflow. I'll tell you straight whether your trees make them worth it." },
      { title: 'Mobile & manufactured home gutters', text: 'Gutter systems sized and fastened for mobile and manufactured homes, including the lighter rooflines common in 55+ communities.' },
      { title: 'Downspouts & drainage', text: 'Downspout placement, sizing and extensions planned so water clears the foundation and doesn\'t wash out sandy Florida soil.' },
    ],
    benefits: [
      { title: 'Foundation protection', text: 'Reduces erosion and pooling right next to the house.' },
      { title: 'Florida-ready performance', text: 'Sized for heavy, sudden rainfall — not a northern spec sheet.' },
      { title: 'Curb appeal', text: 'Smooth, continuous lines with no seams every ten feet.' },
      { title: 'Less maintenance', text: 'Especially with gutter screens installed.' },
    ],
    process: [
      { title: 'Assess & measure', text: 'I walk the property with you, measure, and look at rooflines, valleys and where the water actually goes.' },
      { title: 'Design & plan', text: 'Gutter sizing, downspout placement and a drainage plan for your home.' },
      { title: 'Quote & build', text: 'A clear quote, 24 hours\' confirmation before we start, then installation with secure fastening, proper slope and tight seals.' },
      { title: 'Test & follow up', text: 'Final water-flow check and cleanup. Then I come back a couple of weeks later to double-check the work myself.' },
    ],
    includes: [
      'On-site measurement and drainage review by the owner',
      '6" seamless aluminum K-style gutters formed on site',
      'Hangers, end caps, corners and sealant applied with our sealant process',
      'Downspouts placed and routed away from the foundation',
      'Water-flow test and full job-site cleanup',
      'Personal follow-up check a couple of weeks after install',
      '15-year warranty on the installation',
    ],
    pricing: [
      { factor: 'Linear feet of gutter', why: 'The biggest driver — measured on site around your roofline.' },
      { factor: 'Number of downspouts', why: 'Each downspout and extension adds material and labor.' },
      { factor: 'Stories and roof access', why: 'Second-story runs and steep or tight access take more time and equipment.' },
      { factor: 'Corners and roof valleys', why: 'More corners and valley runoff points mean more fabrication and sealing.' },
      { factor: 'Removal of old gutters', why: 'Tearing out and hauling away an existing system adds labor.' },
      { factor: 'Fascia condition', why: 'Rotted fascia has to be repaired before new gutters can be hung securely.' },
      { factor: 'Gutter screens / guards', why: 'Optional; priced per foot if your trees make them worthwhile.' },
    ],
    faqs: [
      { q: 'How much do seamless gutters cost in The Villages, FL?', a: "It depends on linear footage, number of downspouts, stories, corners and whether old gutters or rotted fascia need to come off first. I measure on site and give you a clear, written price — no pressure and no obligation." },
      { q: 'What are seamless gutters?', a: 'Seamless gutters are formed on site from one continuous piece of aluminum for each run, so there are no sectional joints along the length. Fewer joints means fewer places for a leak to start.' },
      { q: 'What size gutters do I need for heavy Florida rain?', a: "It depends on your roof area, pitch and downspout layout. We install 6\" K-style seamless gutters, and I'll walk the roofline with you and tell you straight what your home actually needs." },
      { q: 'Can you repair a leaking gutter without replacing everything?', a: 'Yes. Many problems are repairable — resealing, rehanging, correcting pitch or replacing a damaged section. If the system is worn out, replacement may be the better value, and I will tell you which.' },
      { q: 'Are gutter guards worth it in Central Florida?', a: 'Often, yes, especially under oaks and pines. Screens reduce clogs and the overflow that happens when a sudden downpour hits a partly blocked gutter.' },
      { q: 'How long does gutter installation take?', a: 'Most homes are done in a single day, depending on the layout and how much downspout and drainage work is needed.' },
      { q: 'Why do my gutters overflow even when they look clean?', a: 'Common causes are improper slope, undersized or too few downspouts, crushed sections, hidden roof-grit buildup, or clogged extensions and underground drains.' },
    ],
  },
  {
    slug: 'soffit-and-fascia',
    name: 'Soffit & Fascia',
    short: 'Soffit & Fascia',
    icon: 'roof',
    title: 'Soffit & Fascia Repair in The Villages, FL | Rowe Services',
    description: 'Vinyl and aluminum soffit, fascia and trim for The Villages and Lake County, FL homes. Rot repair, vented soffit, gutter-ready fascia. Free owner quote.',
    h1: 'Soffit & Fascia Installation and Repair in The Villages, FL',
    answer: 'Rowe Services & Maintenance installs and replaces vinyl and aluminum soffit, fascia and trimwork for homes in The Villages and across Lake, Marion, Sumter and Orange County, Florida. We work on CMU, wood-frame and mobile homes, fix the moisture cause behind rot, and can add vented soffit to help the attic breathe.',
    card: 'Vinyl and aluminum soffit, fascia and trim for CMU, wood-frame and mobile homes — rot repair, vented soffit and a solid base for your gutters.',
    facts: [
      { label: 'Materials', value: 'Vinyl and aluminum' },
      { label: 'Home types', value: 'CMU, wood-frame, mobile' },
      { label: 'Ventilation', value: 'Vented soffit available' },
      { label: 'Best paired with', value: 'New seamless gutters' },
    ],
    intro: [
      "Soffit and fascia do more than finish your roofline. Soffit is the panel under the roof overhang — vented soffit lets the attic breathe in Florida heat. Fascia is the board along the roof edge that your gutters hang from.",
      "When either one fails you get wood rot, pest entry points, peeling paint and gutters that won't stay attached. If moisture is the cause, we fix the cause — not just the surface.",
    ],
    signsHeading: 'Signs your soffit or fascia needs attention',
    signs: [
      'Peeling paint, soft spots or rotting wood along the roof edge',
      'Sagging, warped or bent sections',
      'Visible gaps where birds, wasps or rodents can get in',
      'Gutters pulling away from the fascia',
      'Moisture staining under the eaves',
      'A hot, stuffy attic with no soffit ventilation',
    ],
    offerings: [
      { title: 'New installation', text: 'Soffit, fascia and trimwork for new builds and renovations, measured to fit your roofline and finished clean.' },
      { title: 'Replacement of rotted or damaged sections', text: "We remove what's rotted, bent or coming loose, address the damage underneath, and restore protection at the roof edge." },
      { title: 'Vented soffit for attic airflow', text: 'Vented soffit supports attic ventilation, which can help reduce heat and moisture buildup that strains your roof system.' },
      { title: 'Trimwork', text: 'Straight lines, tight corners and clean transitions for a uniform, finished exterior.' },
    ],
    benefits: [
      { title: 'Clean, straight rooflines', text: 'Crisp, consistent edges from every angle.' },
      { title: 'Low-upkeep materials', text: 'Vinyl or aluminum built for Florida weather — no repainting wood.' },
      { title: 'Stronger protection', text: 'Blocks moisture and pests at the most vulnerable edge of the roof.' },
      { title: 'A solid base for gutters', text: 'Sound fascia means gutters stay attached and draining.' },
    ],
    process: [
      { title: 'Roofline assessment', text: 'I inspect for rot, gaps, ventilation needs and gutter-related issues, then map the right approach.' },
      { title: 'Materials & clear quote', text: 'Vinyl or aluminum based on performance and look, with the full scope and timeline in writing.' },
      { title: 'Prep & install', text: 'Remove failing sections, repair what\'s underneath, then install with straight lines, secure fastening and tight edges.' },
      { title: 'Seal, vent check & walkthrough', text: 'We seal all edges, confirm airflow if vented soffit was used, and walk the finished work with you.' },
    ],
    includes: [
      'Roofline inspection by the owner',
      'Removal of rotted or failing soffit, fascia and trim',
      'Vinyl or aluminum soffit, fascia and trim installed',
      'Vented soffit where the attic needs airflow',
      'Sealed, finished edges and full cleanup',
      'Personal follow-up check after the job',
    ],
    pricing: [
      { factor: 'Linear feet of roofline', why: 'Measured along every eave and rake edge.' },
      { factor: 'Amount of rot underneath', why: 'Hidden damage found during removal has to be repaired first.' },
      { factor: 'Material choice', why: 'Vinyl vs. aluminum, solid vs. vented soffit.' },
      { factor: 'Stories and access', why: 'Higher and harder-to-reach eaves take more time.' },
      { factor: 'Combined with gutters', why: 'Doing both at once often saves a second mobilization.' },
    ],
    faqs: [
      { q: 'How do I know if my soffit and fascia need repair?', a: 'Peeling paint, soft or rotting wood, sagging sections, pest activity, or water overflowing from the gutters onto the fascia. If moisture is the cause, we fix the cause — not just the surface.' },
      { q: 'Can you replace soffit and fascia at the same time as gutters?', a: "Yes, and it's usually the right call. The fascia supports the gutters, so handling both together means cleaner results and a longer-lasting system." },
      { q: 'Why does vented soffit matter in Central Florida?', a: 'Vented soffit improves attic airflow, which can help reduce heat buildup and moisture problems that strain the roof system.' },
      { q: 'Do you work on mobile homes and CMU homes?', a: 'Yes. We install soffit and fascia on CMU (concrete block), wood-frame and mobile homes, for both new construction and remodels.' },
      { q: 'Vinyl or aluminum — which is better?', a: "Both hold up well in Florida and don't need painting. I'll recommend one based on your home, the look you want and where it's going." },
      { q: 'How much does soffit and fascia replacement cost?', a: 'It depends on linear footage, how much rot is underneath, material choice and access. I quote it on site so you get a real number, not a guess.' },
    ],
  },
  {
    slug: 'vinyl-siding',
    name: 'Vinyl Siding',
    short: 'Vinyl Siding',
    icon: 'siding',
    title: 'Vinyl Siding Installation in The Villages, FL | Rowe',
    description: 'Vinyl siding installation, replacement, skirting and storm repair for The Villages and Central Florida homes. Owner-quoted, never rushed. Free quote.',
    h1: 'Vinyl Siding Installation & Repair in The Villages, FL',
    answer: 'Rowe Services & Maintenance installs, replaces and repairs vinyl siding and mobile-home skirting for homes in The Villages and across Lake, Marion, Sumter and Orange County, Florida. Installed with proper flashing and ventilation, vinyl holds up to heat, humidity and storms and never needs repainting.',
    card: 'New vinyl siding, full replacement, skirting and storm-damage repair — installed with proper flashing and never rushed.',
    facts: [
      { label: 'Services', value: 'Install, replace, repair, skirting' },
      { label: 'Built for', value: 'Heat, humidity and storms' },
      { label: 'Upkeep', value: 'No repainting; soap & water' },
      { label: 'Our rule', value: 'Extra day if the job needs it' },
    ],
    intro: [
      'Vinyl siding gives a Central Florida home a fresh, clean exterior without the repaint cycle. When it\'s installed right — with proper flashing and ventilation — it holds up beautifully down here and stays low-maintenance for years.',
      'Most siding problems come from rushed installs: panels nailed too tight, missing flashing, sloppy trim. Our crews are never overloaded. If proper vinyl installation needs an extra day, it gets an extra day.',
    ],
    signsHeading: 'Common reasons homeowners replace siding',
    signs: [
      'Cracked, warped or loose panels from age or storms',
      'Faded, chalky or dated appearance',
      'Moisture or mildew concerns behind the panels',
      'Storm damage to sections or trim',
      'Damaged or missing mobile-home skirting',
    ],
    offerings: [
      { title: 'New siding installation', text: 'Straight alignment, secure fastening and a clean finished exterior for new builds and upgrades.' },
      { title: 'Siding replacement', text: 'Replace damaged or aging siding to restore protection and get a uniform look that resists heat, moisture and storms.' },
      { title: 'Storm & damage repair', text: 'Cracked or loose panels, warping and trim issues repaired and matched as closely as possible.' },
      { title: 'Skirting installation', text: 'Vinyl skirting for mobile and manufactured homes — cleaner look, better protection underneath.' },
      { title: 'Trim & finishing', text: 'Crisp corners and smooth transitions around windows, doors and penetrations.' },
    ],
    benefits: [
      { title: 'Built for Florida weather', text: 'Stands up to heat, humidity and storms.' },
      { title: 'Smart value', text: 'Long-term performance without constant repainting.' },
      { title: 'Precise details', text: 'Alignment, fastening, corners and transitions done right to prevent warping and gaps.' },
      { title: 'Fresh curb appeal', text: 'A clean, updated look with consistent lines.' },
    ],
    process: [
      { title: 'Site evaluation', text: 'We measure the home, inspect wall surfaces and flag problem areas.' },
      { title: 'Style & layout', text: 'Help choosing color and profile, then the trim layout for a clean finish.' },
      { title: 'Prep & install', text: 'Surface prep, flashing, then aligned rows with secure, properly spaced fastening.' },
      { title: 'Detail & walkthrough', text: 'Transitions and penetrations finished, final checks, and simple care tips.' },
    ],
    includes: [
      'On-site measurement and wall inspection',
      'Color and profile guidance',
      'Flashing and ventilation details done properly',
      'Vinyl siding and trim installed level and aligned',
      'Full cleanup and final walkthrough',
      'Personal follow-up check after the job',
    ],
    pricing: [
      { factor: 'Wall square footage', why: 'Total area to be covered.' },
      { factor: 'Removal of old siding', why: 'Tear-off and disposal add labor.' },
      { factor: 'Wall condition underneath', why: 'Damaged sheathing must be repaired before new siding goes on.' },
      { factor: 'Windows, doors and trim', why: 'More openings mean more trim and detail work.' },
      { factor: 'Panel profile and color', why: 'Product selection affects material cost.' },
    ],
    faqs: [
      { q: 'Is vinyl siding a good fit for Florida homes?', a: 'Yes — when it\'s installed right, with proper flashing and ventilation, vinyl holds up well to heat and rain and stays low-maintenance for years.' },
      { q: 'Do I need full replacement or just a repair?', a: 'If damage is isolated, a repair can work. Widespread warping, fading or recurring problems usually justify replacement. I\'ll tell you which makes sense.' },
      { q: 'Do you install mobile-home skirting?', a: 'Yes. We install vinyl skirting for mobile and manufactured homes along with siding work.' },
      { q: 'Will vinyl siding increase my home\'s value?', a: 'It can noticeably improve curb appeal, which helps how a home is perceived and marketed.' },
      { q: 'How do I clean vinyl siding?', a: 'Gentle soap and water with a low-pressure rinse. Avoid high-pressure washing that can force water behind the panels.' },
      { q: 'How long does siding installation take?', a: 'It depends on home size and complexity. I give you a clear timeline after the site visit — and we don\'t rush it.' },
    ],
  },
  {
    slug: 'porches-and-enclosures',
    name: 'Screen Porches & Enclosures',
    short: 'Screen Porches',
    icon: 'porch',
    title: 'Screen Enclosures & Porches in The Villages, FL | Rowe',
    description: 'Screen rooms, birdcages, porch close-ins, sheet-pan roof enclosures and rescreening in The Villages & Lake County, FL. Owner-quoted. Free estimate.',
    h1: 'Screen Porches & Enclosures in The Villages, FL',
    answer: 'Rowe Services & Maintenance builds, encloses and repairs screen rooms, birdcages, Florida rooms, porch and patio close-ins and aluminum sheet-pan roof enclosures for homes in The Villages and across Lake, Marion, Sumter and Orange County, Florida — including rescreening and storm repairs.',
    card: 'Screen rooms, birdcages, Florida rooms, porch close-ins, sheet-pan roof enclosures, rescreening and storm repair.',
    facts: [
      { label: 'New builds', value: 'Screen rooms, birdcages, Florida rooms' },
      { label: 'Close-ins', value: 'Patios, porches, lanais' },
      { label: 'Roofed', value: 'Aluminum sheet-pan roofs' },
      { label: 'Repairs', value: 'Rescreening & storm damage' },
    ],
    intro: [
      "Outdoor space is a big part of Florida living. A good enclosure keeps out the bugs, debris, harsh sun and wind so you actually use your patio — morning coffee, evenings with friends, all year.",
      "Whether you want a new build or need repairs to what you have, I'll walk your existing structure with you and tell you what's realistic.",
    ],
    signsHeading: 'Why homeowners enclose a porch',
    signs: [
      'More usable outdoor space year-round',
      'Comfort during bug season',
      'A cleaner patio with less blown-in debris',
      'Shade and wind protection for relaxing and entertaining',
      'Torn screens, loose framing or storm wear on an existing enclosure',
    ],
    offerings: [
      { title: 'Screen rooms & Florida rooms', text: 'New screened spaces attached to your home, built for airflow and comfort.' },
      { title: 'Birdcage assembly', text: 'Larger screened structures over patios and pools with open framing.' },
      { title: 'Patio & porch close-ins', text: 'Close in an existing porch or lanai for a cleaner, calmer, more usable space.' },
      { title: 'Sheet-pan roof enclosures', text: 'Aluminum sheet-pan roof enclosures that add shade and block debris.' },
      { title: 'Rescreening & repairs', text: "Torn screens, loose frames and storm damage repaired — often without rebuilding the whole structure." },
    ],
    benefits: [
      { title: 'More usable space', text: 'Fresh air with fewer interruptions.' },
      { title: 'Less mess', text: 'Keeps furniture and floors cleaner.' },
      { title: 'Comfort every season', text: 'Less bugs, wind and direct sun, with airflow intact.' },
      { title: 'Options that fit', text: 'Close-in, birdcage or roofed — plus repairs to match what you have.' },
    ],
    process: [
      { title: 'On-site review', text: 'We measure, check the structure and talk through how you want to use the space.' },
      { title: 'Design & materials', text: 'Framing, screen choices and roof options based on comfort and durability.' },
      { title: 'Clear quote & schedule', text: 'Scope, timeline and expectations in writing, scheduled around you with 24 hours\' confirmation.' },
      { title: 'Build & inspect', text: 'Clean fitting and proper screen tension, then we inspect doors, edges and finish together.' },
    ],
    includes: [
      'On-site measurement and structure check by the owner',
      'Framing, screen and roof options explained plainly',
      'Build or repair with tight screen tension and secure doors',
      'Final inspection, cleanup and care tips',
      'Personal follow-up check after the job',
    ],
    pricing: [
      { factor: 'Size and layout', why: 'Footprint, height and number of walls or panels.' },
      { factor: 'Enclosure type', why: 'Screen room, birdcage, close-in or roofed enclosure.' },
      { factor: 'Roof', why: 'Aluminum sheet-pan roof vs. screen roof.' },
      { factor: 'Screen type', why: 'Standard vs. heavier or specialty screen.' },
      { factor: 'Repair vs. rebuild', why: 'Rescreening a sound frame costs far less than replacing it.' },
    ],
    faqs: [
      { q: 'What is the difference between a screen room and a birdcage?', a: 'A screen room is usually smaller and attached to the home. A birdcage is typically a larger screened structure with more open framing, often over a patio or pool.' },
      { q: 'Can you rescreen my existing enclosure?', a: 'Yes. Rescreening is a great option when the frame is in good shape but the screens are torn, loose or worn out.' },
      { q: 'Do you repair storm damage to screen enclosures?', a: 'Yes. We repair torn screening, loose panels and damaged sections and reinforce areas that are failing.' },
      { q: 'Will an enclosure help with bugs and debris?', a: 'Yes. Screens keep out insects and airborne debris while still letting air move through.' },
      { q: 'How long does a porch or enclosure project take?', a: 'Many repairs are quick. New builds take longer depending on size, layout and materials — you get a clear timeline after the site visit.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
