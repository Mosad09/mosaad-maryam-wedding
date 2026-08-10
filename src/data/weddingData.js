// -----------------------------------------------------------------------
// weddingData.js
// Single source of truth for all wedding content. Edit this file to
// update names, dates, photos, music, events, venue, FAQ, and contacts —
// no component changes required.
// -----------------------------------------------------------------------

// Prefix every asset path with Vite's configured base URL (the repo name on
// GitHub Pages, e.g. "/mosaad-maryam-weeding/") so images and audio resolve
// correctly when the site is hosted under a project subpath instead of the
// domain root. Always write asset paths as asset("assets/...") below —
// never a hardcoded leading-slash path string.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const weddingData = {
  couple: {
    groom: { nameAr: "مسعد", nameEn: "Mosaad" },
    bride: { nameAr: "مريم", nameEn: "Maryam" },
    monogram: "م & م",
  },

  countdownDateISO: "2026-10-05T19:00:00+02:00",
  weddingDateDisplay: { en: "October 5, 2026", ar: "٥ أكتوبر ٢٠٢٦" },

  hero: {
    image: asset("assets/images/gallery/hero.jpg"),
    headline: {
      en: "Together begins forever.",
      ar: "معًا تبدأ الأبدية.",
    },
  },

  openingMessage: {
    en: "With love, we invite you to celebrate with us",
    ar: "بكل حب، ندعوكم للاحتفال معنا",
  },

  music: {
    src: asset("assets/music/wedding-song.mp3"),
    title: "Our Song",
    autoplayOnOpen: true,
  },

  // Single combined childhood photo — replaces the old two-photo layout.
  childhood: {
    title: { en: "Long before forever had a name.", ar: "من زمان... وقبل ما نعرف إن الحكاية هتجمعنا." },
    photo: asset("assets/images/childhood/childhood.jpg"),
  },

  events: {
    engagement: {
      title: { en: "Engagement", ar: "الخطوبة" },
      date: { en: "April 11, 2024", ar: "١١ أبريل ٢٠٢٤" },
      time: { en: "", ar: "" },
      location: { en: "Bahtim, Shubra El Kheima, Egypt", ar: "بهتيم، شبرا الخيمة، مصر" },
      description: {
        en: "A joyful evening surrounded by family as we marked the beginning of our journey.",
        ar: "أمسية سعيدة أحاطتنا فيها العائلة احتفالًا ببداية رحلتنا.",
      },
      photo: asset("assets/images/events/engagement.jpg"),
    },
    katbKetab: {
      title: { en: "Katb Ketab", ar: "كتب الكتاب" },
      date: { en: "October 5, 2026", ar: "٥ أكتوبر ٢٠٢٦" },
      time: { en: "7:00 PM", ar: "٧:٠٠ مساءً" },
      description: {
        en: "The signing of our marriage contract, witnessed by our closest family.",
        ar: "توثيق عقد قراننا بحضور أقرب أفراد العائلة.",
      },
      photo: asset("assets/images/events/katb-ketab.jpg"),
    },
    wedding: {
      title: { en: "The Wedding", ar: "حفل الزفاف" },
      date: { en: "October 5, 2026", ar: "٥ أكتوبر ٢٠٢٦" },
      time: { en: "7:00 PM", ar: "٧:٠٠ مساءً" },
      venue: { en: "Kempinski Concert Hall", ar: "قاعة كمبينسكي للحفلات" },
      address: {
        en: "Shubra El Kheima 2, Ismailia Canal Road, next to Al Tanmeya Club, Bahtim, Egypt",
        ar: "شبرا الخيمه ثان ترعة الاسماعيلية بجوار نادي التنمية، بهتيم، مصر",
      },
      photo: asset("assets/images/events/wedding-venue.jpg"),
    },
  },

  schedule: [
    { time: { en: "7:00 PM", ar: "٧:٠٠ مساءً" }, label: { en: "Guest Arrival", ar: "استقبال الضيوف" } },
    { time: { en: "7:00 PM", ar: "٧:٠٠ مساءً" }, label: { en: "Wedding", ar: "حفل الزفاف" } },
    { time: { en: "9:00 PM", ar: "٩:٠٠ مساءً" }, label: { en: "Dinner", ar: "العشاء" } },
    { time: { en: "10:00 PM", ar: "١٠:٠٠ مساءً" }, label: { en: "Celebration", ar: "الاحتفال" } },
  ],

  venue: {
    name: { en: "Kempinski Concert Hall", ar: "قاعة كمبينسكي للحفلات" },
    address: {
      en: "Shubra El Kheima 2, Ismailia Canal Road, next to Al Tanmeya Club, Bahtim, Egypt",
      ar: "شبرا الخيمه ثان ترعة الاسماعيلية بجوار نادي التنمية، بهتيم، مصر",
    },
    photo: asset("assets/images/events/wedding-venue.jpg"),
    mapsUrl: "https://maps.app.goo.gl/NEjZftPk12Mmaqr39",
  },

  photoStory: [
    {
      image: asset("assets/images/gallery/story-1.jpg"),
      text: { en: "Together begins forever.", ar: "معًا تبدأ الأبدية." },
    },
    {
      image: asset("assets/images/gallery/story-2.jpg"),
      text: { en: "And now, our forever begins.", ar: "والآن، تبدأ أبديتنا." },
    },
  ],

  faq: [
    {
      q: { en: "Where is the wedding?", ar: "أين يقام حفل الزفاف؟" },
      a: {
        en: "The wedding will be held at Kempinski Concert Hall, Bahtim, Egypt.",
        ar: "سيقام حفل الزفاف في قاعة كمبينسكي للحفلات، بهتيم، مصر.",
      },
    },
    {
      q: { en: "Is parking available?", ar: "هل يتوفر موقف للسيارات؟" },
      a: {
        en: "Yes, complimentary parking is available on-site for all guests.",
        ar: "نعم، يتوفر موقف سيارات مجاني في الموقع لجميع الضيوف.",
      },
    },
    {
      q: { en: "What time should I arrive?", ar: "في أي وقت يجب أن أصل؟" },
      a: {
        en: "Guests are welcome to arrive from 7:00 PM.",
        ar: "يسعدنا استقبال الضيوف بدءًا من الساعة ٧:٠٠ مساءً.",
      },
    },
    {
      q: { en: "What is the venue address?", ar: "ما هو عنوان القاعة؟" },
      a: {
        en: "Kempinski Concert Hall, Shubra El Kheima 2, Ismailia Canal Road, next to Al Tanmeya Club, Bahtim, Egypt.",
        ar: "قاعة كمبينسكي للحفلات، شبرا الخيمه ثان ترعة الاسماعيلية بجوار نادي التنمية، بهتيم، مصر.",
      },
    },
  ],

  guestbook: { storageKey: "wedding_guestbook_mosaad_maryam" },

  contacts: {
    whatsapp: "01211331239",
    whatsappUrl: "https://wa.me/201211331239",
  },

  seo: {
    title: "مسعد & مريم | Wedding Invitation",
    description: {
      en: "Join Mosaad & Maryam as they celebrate their wedding on October 5, 2026.",
      ar: "انضموا إلى مسعد ومريم للاحتفال بزفافهما في ٥ أكتوبر ٢٠٢٦.",
    },
  },
};

export default weddingData;