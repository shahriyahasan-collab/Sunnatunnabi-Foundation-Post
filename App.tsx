import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Layout, Image as ImageIcon, Droplets, Sprout, Heart, Utensils, Share2, Palette, Type, Settings, Upload, Eye, EyeOff, Check, Filter, Trash2, Plus, ChevronDown, ChevronUp, Languages, ArrowUp, ArrowDown } from 'lucide-react';

// --- Data: Hadith Database (Bangla, Arabic, English) ---
const QUOTES = [
  // --- WATER (পানি) ---
  {
    id: 1,
    arabic: "أَفْضَلُ الصَّدَقَةِ سَقْيُ الْمَاءِ",
    text: "সর্বোত্তম সদকাহ হলো (তৃষ্ণার্তকে) পানি পান করানো।",
    english: "The best charity is giving water to drink.",
    ref: "সুনানে নাসাঈ",
    category: "water"
  },
  {
    id: 2,
    arabic: "مَنْ حَفَرَ بِئْرَ مَاءٍ لَمْ يَشْرَبْ مِنْهُ كَبِدٌ حَرَّى مِنْ جِنٍّ وَلَا إِنْسٍ وَلَا طَائِرٍ إِلَّا آجَرَهُ اللَّهُ يَوْمَ الْقِيَامَةِ",
    text: "যে ব্যক্তি পানি পানের জন্য কুপ খনন করবে, জিন, মানুষ বা পাখির মধ্য থেকে যেই প্রাণিই তা পান করবে, আল্লাহ তাআলা কিয়ামতের দিন তাকে এর প্রতিদান দিবেন।",
    english: "Whoever digs a well, no thirsty soul of Jinn, human or bird drinks from it but Allah will reward him on the Day of Resurrection.",
    ref: "সহীহ ইবনে খুজাইমা",
    category: "water"
  },
  {
    id: 101,
    arabic: "فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ",
    text: "প্রতিটি তৃষ্ণার্ত প্রাণীকে পানি পান করানোর মধ্যে পুণ্য রয়েছে।",
    english: "There is a reward for serving any living being.",
    ref: "সহীহ বুখারী ও মুসলিম",
    category: "water"
  },
  {
    id: 301,
    arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ",
    text: "আর আমি প্রাণবান সব কিছু সৃষ্টি করলাম পানি থেকে।",
    english: "And We made from water every living thing.",
    ref: "আল-কুরআন, ২১:৩০",
    category: "water"
  },

  // --- TREE / PLANTING (বৃক্ষরোপণ) ---
  {
    id: 3,
    arabic: "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا أَوْ يَزْرَعُ زَرْعًا فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ إِلَّا كَانَ لَهُ بِهِ صَدَقَةٌ",
    text: "কোনো মুসলিম যদি একটি বৃক্ষ রোপণ করে অথবা শস্য জন্মায়, আর তা থেকে কোনো পাখি, মানুষ বা চতুষ্পদ জন্তু ভক্ষণ করে তবে তা তার জন্য সদকাহ হিসেবে গণ্য হবে।",
    english: "There is no Muslim who plants a tree or sows seeds and then a bird, a person or an animal eats from it, but is regarded as a charity for him.",
    ref: "সহীহ বুখারী",
    category: "tree"
  },
  {
    id: 103,
    arabic: "إِنْ قَامَتِ السَّاعَةُ وَبِيَدِ أَحَدِكُمْ فَسِيلَةٌ، فَإِنِ اسْتَطَاعَ أَنْ لاَ يَقُومَ حَتَّى يَغْرِسَهَا فَلْيَفْعَلْ",
    text: "যদি কিয়ামত সংঘটিত হওয়ার মুহূর্তেও তোমাদের কারো হাতে একটি চারাগাছ থাকে, তবে সে যেন তা রোপণ করে দেয়।",
    english: "If the Final Hour comes while you have a palm-seedling in your hands and it is possible to plant it before the Hour comes, you should plant it.",
    ref: "আল-আদাবুল মুফরাদ",
    category: "tree"
  },

  // --- FOOD (খাদ্য) ---
  {
    id: 4,
    arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ",
    text: "তোমরা এক টুকরা খেজুর দান করে হলেও জাহান্নামের আগুন থেকে নিজেকে বাঁচাও।",
    english: "Save yourself from Hellfire even with half a date.",
    ref: "সহীহ বুখারী",
    category: "food"
  },
  {
    id: 5,
    arabic: "أَطْعِمُوا الْجَائِعَ، وَعُودُوا الْمَرِيضَ، وَفُكُّوا الْعَانِيَ",
    text: "ক্ষুধার্তকে অন্ন দাও, রোগীর সেবা করো এবং বন্দীকে মুক্ত করো।",
    english: "Feed the hungry, visit the sick, and free the captive.",
    ref: "সহীহ বুখারী",
    category: "food"
  },
  {
    id: 106,
    arabic: "خِيَارُكُمْ مَنْ أَطْعَمَ الطَّعَامَ",
    text: "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি, যে অন্যকে খাবার খাওয়ায়।",
    english: "The best of you is the one who feeds others.",
    ref: "মুসনাদে আহমাদ",
    category: "food"
  },
  {
    id: 302,
    arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَى حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا",
    text: "তারা আল্লাহর প্রেমে অভাবগ্রস্ত, এতিম ও বন্দীদের আহার্য দান করে।",
    english: "And they give food in spite of love for it to the needy, the orphan, and the captive.",
    ref: "আল-কুরআন, ৭৬:৮",
    category: "food"
  },
  {
    id: 303,
    arabic: "أَطْعِمُوا الطَّعَامَ، وَأَفْشُوا السَّلَامَ، وَصِلُوا الْأَرْحَامَ",
    text: "তোমরা ক্ষুধার্তকে খাদ্য খাওয়াও, সালামের প্রসার ঘটাও এবং আত্মীয়তার সম্পর্ক বজায় রাখো।",
    english: "Feed food, spread peace, and maintain ties of kinship.",
    ref: "সুনানে ইবনে মাজাহ",
    category: "food"
  },

  // --- WINTER / CLOTHING (শীতবস্ত্র) ---
  {
    id: 6,
    arabic: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
    text: "যে ব্যক্তি কোনো মুমিনের দুনিয়াবী সমস্যা (যেমন শীতের কষ্ট) দূর করবে, আল্লাহ কিয়ামতের দিন তার সমস্যা দূর করে দিবেন।",
    english: "Whoever relieves a believer of some worldly distress, Allah will relieve him of some of the distress of the Day of Resurrection.",
    ref: "সহীহ মুসলিম",
    category: "winter"
  },
  {
    id: 108,
    arabic: "مَا مِنْ مُسْلِمٍ يَكْسُو مُسْلِمًا ثَوْبًا عَلَى عُرْيٍ إِلَّا كَسَاهُ اللَّهُ مِنْ خُضْرِ الْجَنَّةِ",
    text: "যে মুসলিম কোনো বস্ত্রহীন মুসলিমকে কাপড় পরাবে, আল্লাহ তাকে জান্নাতের সবুজ রেশমি পোশাক পরাবেন।",
    english: "No Muslim clothes another Muslim who is destitute of clothing but Allah will clothe him with the green garments of Paradise.",
    ref: "সুনানে আবু দাউদ",
    category: "winter"
  },
  {
    id: 201,
    arabic: "مَا مِنْ مُسْلِمٍ يَكْسُو مُسْلِمًا إِلَّا كَانَ فِي حِفْظِ اللَّهِ مَا دَامَ عَلَيْهِ مِنْهُ رُقْعَةٌ",
    text: "কোনো মুসলিম যখন অন্য মুসলিমকে কাপড় পরায়, যতক্ষণ ওই কাপড়ের একটি টুকরোও তার শরীরে থাকে, ততক্ষণ দাতা আল্লাহর জিম্মায় থাকেন।",
    english: "A Muslim is under Allah's protection as long as a shred of the cloth he gave remains on his brother.",
    ref: "সুনানে তিরমিজী",
    category: "winter"
  },
  {
    id: 202,
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    text: "দয়াকারীদের প্রতি রহমান (আল্লাহ) দয়া করেন। তোমরা পৃথিবীবাসীর প্রতি দয়া করো, আকাশের মালিক তোমাদের প্রতি দয়া করবেন।",
    english: "The Merciful One shows mercy to those who are merciful. Show mercy to those on earth, and He who is in heaven will show mercy to you.",
    ref: "সুনানে তিরমিজী",
    category: "winter"
  },
  {
    id: 203,
    arabic: "الشِّتَاءُ رَبِيعُ الْمُؤْمِنِ",
    text: "শীতকাল মুমিনের জন্য বসন্তকাল স্বরূপ।",
    english: "Winter is the spring of the believer.",
    ref: "মুসনাদে আহমাদ",
    category: "winter"
  },

  // --- LIVELIHOOD / HELP (স্বাবলম্বীকরণ) ---
  {
    id: 7,
    arabic: "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    text: "আল্লাহ বান্দার সাহায্যে ততক্ষণ থাকেন, যতক্ষণ বান্দা তার ভাইয়ের সাহায্যে থাকে।",
    english: "Allah helps the servant as long as the servant helps his brother.",
    ref: "সহীহ মুসলিম",
    category: "livelihood"
  },
  {
    id: 111,
    arabic: "اليَدُ العُلْيَا خَيْرٌ مِنَ اليَدِ السُّفْلَى",
    text: "নিচের হাতের (গ্রহীতা) চেয়ে উপরের হাত (দাতা) উত্তম।",
    english: "The upper hand (giving) is better than the lower hand (receiving).",
    ref: "সহীহ বুখারী",
    category: "livelihood"
  },
  {
    id: 304,
    arabic: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ",
    text: "সুতরাং আপনি এতিমের প্রতি কঠোর হবেন না এবং সাহায্যপ্রার্থীকে ধমক দেবেন না।",
    english: "So as for the orphan, do not oppress him. And as for the petitioner, do not repel him.",
    ref: "আল-কুরআন, ৯৩:৯-১০",
    category: "livelihood"
  },

  // --- MOSQUE (মসজিদ নির্মাণ) ---
  {
    id: 8,
    arabic: "مَنْ بَنَى لِلَّهِ مَسْجِدًا بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ",
    text: "যে ব্যক্তি আল্লাহর জন্য একটি মসজিদ নির্মাণ করবে, আল্লাহ তার জন্য জান্নাতে একটি ঘর নির্মাণ করবেন।",
    english: "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.",
    ref: "সহীহ বুখারী",
    category: "mosque"
  },
  {
    id: 305,
    arabic: "إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ",
    text: "নিঃসন্দেহে তারাই আল্লাহর মসজিদ আবাদ করে যারা আল্লাহ ও আখেরাতে ঈমান আনে।",
    english: "The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day.",
    ref: "আল-কুরআন, ৯:১৮",
    category: "mosque"
  },

  // --- HEALTH (চিকিৎসা সেবা) ---
  {
    id: 9,
    arabic: "دَاوُوا مَرْضَاكُمْ بِالصَّدَقَةِ",
    text: "তোমরা সদকাহ দিয়ে তোমাদের রোগীদের চিকিৎসা করো।",
    english: "Treat your sick with charity.",
    ref: "সহীহ আল-জামিউস সগীর",
    category: "health"
  },
  {
    id: 115,
    arabic: "عُودُوا الْمَرِيضَ، وَأَطْعِمُوا الْجَائِعَ، وَفُكُّوا الْعَانِيَ",
    text: "রোগীর সেবা করো, ক্ষুধার্তকে খাওয়াও এবং বন্দীকে মুক্ত করো।",
    english: "Visit the sick, feed the hungry, and free the captive.",
    ref: "সহীহ বুখারী",
    category: "health"
  },
  {
    id: 306,
    arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
    text: "আর যখন আমি অসুস্থ হই, তখন তিনিই (আল্লাহ) আমাকে সুস্থ করেন।",
    english: "And when I am ill, it is He who cures me.",
    ref: "আল-কুরআন, ২৬:৮০",
    category: "health"
  },
  {
    id: 307,
    arabic: "لِكُلِّ دَاءٍ دَوَاءٌ",
    text: "প্রতিটি রোগেরই ওষুধ রয়েছে।",
    english: "For every disease there is a cure.",
    ref: "সহীহ মুসলিম",
    category: "health"
  },

  // --- GENERAL CHARITY (সাধারণ দান) ---
  {
    id: 10,
    arabic: "مَا نَقَصَ مَالٌ مِنْ صَدَقَةٍ",
    text: "সদকাহ করলে সম্পদ কমে না।",
    english: "Charity does not decrease wealth.",
    ref: "সহীহ মুসলিম",
    category: "charity"
  },
  {
    id: 11,
    arabic: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
    text: "মানুষ যখন মারা যায় তখন তার আমল বন্ধ হয়ে যায়, তবে তিনটি উৎস থেকে তা অব্যাহত থাকে: সদকায়ে জারিয়া, উপকারী জ্ঞান, অথবা নেক সন্তান যে তার জন্য দোয়া করে।",
    english: "When a man dies, his deeds come to an end except for three: a continuing charity, beneficial knowledge, or a righteous child who prays for him.",
    ref: "সহীহ মুসলিম",
    category: "charity"
  },
  {
    id: 117,
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
    text: "তোমার ভাইয়ের দিকে তাকিয়ে মুচকি হাসাও একটি সদকাহ।",
    english: "Smiling in the face of your brother is charity.",
    ref: "সুনানে তিরমিজী",
    category: "charity"
  },
  {
    id: 121,
    arabic: "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا",
    text: "আমি এবং এতিমের রক্ষণাবেক্ষণকারী জান্নাতে এইভাবে (পাশাপাশি) থাকব।",
    english: "I and the one who looks after an orphan will be like this in Paradise.",
    ref: "সহীহ বুখারী",
    category: "charity"
  },
  {
    id: 308,
    arabic: "مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ",
    text: "যারা আল্লাহর রাস্তায় সম্পদ ব্যয় করে, তাদের উদাহরণ একটি বীজের মতো, যা থেকে সাতটি শীষ জন্মায়।",
    english: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes.",
    ref: "আল-কুরআন, ২:২৬১",
    category: "charity"
  },
  {
    id: 309,
    arabic: "لَنْ تَنَالُوا الْبِرَّ حَتَّى تُنْفِقُوا مِمَّا تُحِبُّونَ",
    text: "তোমরা ততক্ষণ পর্যন্ত পুণ্য লাভ করতে পারবে না, যতক্ষণ না তোমাদের প্রিয় বস্তু থেকে ব্যয় করবে।",
    english: "You will never attain righteousness until you spend from that which you love.",
    ref: "আল-কুরআন, ৩:৯২",
    category: "charity"
  }
];

// --- Fonts Configuration ---
const BANGLA_FONTS = [
  { id: 'noto', label: 'Noto Serif', family: "'Noto Serif Bengali', serif" },
  { id: 'hind', label: 'Hind Siliguri', family: "'Hind Siliguri', sans-serif" },
  { id: 'baloo', label: 'Baloo Da 2', family: "'Baloo Da 2', cursive" },
  { id: 'tiro', label: 'Tiro Bangla', family: "'Tiro Bangla', serif" },
  { id: 'galada', label: 'Galada', family: "'Galada', cursive" },
  { id: 'mina', label: 'Mina', family: "'Mina', sans-serif" },
];

const ENGLISH_FONTS = [
  { id: 'inter', label: 'Inter', family: "'Inter', sans-serif" },
  { id: 'montserrat', label: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'playfair', label: 'Playfair Display', family: "'Playfair Display', serif" },
  { id: 'lato', label: 'Lato', family: "'Lato', sans-serif" },
  { id: 'merriweather', label: 'Merriweather', family: "'Merriweather', serif" },
];

// --- Data: Initial Backgrounds ---
const INITIAL_BACKGROUNDS = [
  // --- GRADIENTS (12 Total) ---
  { id: 'g1', type: 'gradient', value: 'bg-gradient-to-br from-emerald-900 to-green-800', label: 'Foundation Green', category: 'charity' },
  { id: 'g2', type: 'gradient', value: 'bg-gradient-to-br from-slate-900 to-slate-800', label: 'Midnight', category: 'winter' },
  { id: 'g3', type: 'gradient', value: 'bg-gradient-to-br from-amber-800 to-orange-900', label: 'Earth', category: 'food' },
  { id: 'g4', type: 'gradient', value: 'bg-gradient-to-br from-blue-900 to-cyan-900', label: 'Deep Ocean', category: 'water' },
  { id: 'g5', type: 'gradient', value: 'bg-gradient-to-br from-rose-900 to-pink-800', label: 'Compassion', category: 'health' },
  { id: 'g6', type: 'gradient', value: 'bg-gradient-to-br from-purple-900 to-indigo-900', label: 'Royal', category: 'mosque' },
  { id: 'g7', type: 'gradient', value: 'bg-gradient-to-br from-gray-800 to-gray-600', label: 'Neutral', category: 'livelihood' },
  { id: 'g8', type: 'gradient', value: 'bg-gradient-to-br from-teal-900 to-emerald-600', label: 'Forest', category: 'tree' },
  { id: 'g9', type: 'gradient', value: 'bg-gradient-to-br from-indigo-950 to-blue-800', label: 'Twilight', category: 'winter' },
  { id: 'g10', type: 'gradient', value: 'bg-gradient-to-br from-red-950 to-orange-800', label: 'Sunset', category: 'food' },
  { id: 'g11', type: 'gradient', value: 'bg-gradient-to-br from-sky-900 to-blue-600', label: 'Clear Sky', category: 'water' },
  { id: 'g12', type: 'gradient', value: 'bg-gradient-to-br from-fuchsia-950 to-purple-800', label: 'Berry', category: 'charity' },
  
  // --- IMAGES ---
  { id: 'img1', type: 'image', value: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop', category: 'water', label: 'Water Pump' },
  { id: 'img_w2', type: 'image', value: 'https://images.unsplash.com/photo-1610212555365-d69d4d467d32?q=80&w=1000&auto=format&fit=crop', category: 'water', label: 'Clean Water' },
  { id: 'img_w4', type: 'image', value: 'https://images.unsplash.com/photo-1626364799747-792541771768?q=80&w=1000&auto=format&fit=crop', category: 'water', label: 'Rural Tube Well' },
  { id: 'img2', type: 'image', value: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1000&auto=format&fit=crop', category: 'tree', label: 'Forest Path' },
  { id: 'img_t3', type: 'image', value: 'https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?q=80&w=1000&auto=format&fit=crop', category: 'tree', label: 'Green Forest' },
  { id: 'img3', type: 'image', value: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1000&auto=format&fit=crop', category: 'food', label: 'Wheat Field' },
  { id: 'img_f2', type: 'image', value: 'https://images.unsplash.com/photo-1627483297929-37f416fec7cd?q=80&w=1000&auto=format&fit=crop', category: 'food', label: 'Rice Grains' },
  { id: 'img_f3', type: 'image', value: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1000&auto=format&fit=crop', category: 'food', label: 'Vegetables' },
  { id: 'img4', type: 'image', value: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?q=80&w=1000&auto=format&fit=crop', category: 'winter', label: 'Winter Fog' },
  { id: 'img_win2', type: 'image', value: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=1000&auto=format&fit=crop', category: 'winter', label: 'Snowy Trees' },
  { id: 'img5', type: 'image', value: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000&auto=format&fit=crop', category: 'charity', label: 'Food Donation Boxes' },
  { id: 'img_c4', type: 'image', value: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000&auto=format&fit=crop', category: 'charity', label: 'Hands Holding' },
  { id: 'img6', type: 'image', value: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d743?q=80&w=1000&auto=format&fit=crop', category: 'mosque', label: 'Mosque Arch' },
  { id: 'img_m2', type: 'image', value: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000&auto=format&fit=crop', category: 'mosque', label: 'White Mosque' },
  { id: 'img_m3', type: 'image', value: 'https://images.unsplash.com/photo-1580977259604-58582764b855?q=80&w=1000&auto=format&fit=crop', category: 'mosque', label: 'Mosque Dome' },
  { id: 'img_m4', type: 'image', value: 'https://images.unsplash.com/photo-1564507592333-c60657e885d5?q=80&w=1000&auto=format&fit=crop', category: 'mosque', label: 'Mosque Interior' },
  { id: 'img7_new', type: 'image', value: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop', category: 'livelihood', label: 'Construction Work' },
  { id: 'img8', type: 'image', value: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1000&auto=format&fit=crop', category: 'health', label: 'Medical Stethoscope' },
  { id: 'img_h3', type: 'image', value: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop', category: 'health', label: 'Medicine' },
];

const AVAILABLE_TOPICS = [
  { id: 'charity', label: 'General Charity' },
  { id: 'water', label: 'Water / Tube Well' },
  { id: 'food', label: 'Food Distribution' },
  { id: 'tree', label: 'Tree Planting' },
  { id: 'winter', label: 'Winter / Clothing' },
  { id: 'livelihood', label: 'Livelihood' },
  { id: 'mosque', label: 'Mosque Build' },
  { id: 'health', label: 'Medical / Health' }
];

const MainComponent = () => {
  // State
  const [backgroundsList, setBackgroundsList] = useState(INITIAL_BACKGROUNDS);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [background, setBackground] = useState(INITIAL_BACKGROUNDS[0]);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>('square');
  const [overlayOpacity, setOverlayOpacity] = useState(60);
  const [fontSize, setFontSize] = useState(28);
  const [selectedBanglaFont, setSelectedBanglaFont] = useState(BANGLA_FONTS[0]);
  const [selectedEnglishFont, setSelectedEnglishFont] = useState(ENGLISH_FONTS[0]);
  
  // Language Toggles & Ordering
  const [showArabic, setShowArabic] = useState(false);
  const [showBangla, setShowBangla] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  const [languageOrder, setLanguageOrder] = useState(['arabic', 'bangla', 'english']);

  const [selectedTopics, setSelectedTopics] = useState(AVAILABLE_TOPICS.map(t => t.id));
  const [isGenerating, setIsGenerating] = useState(false);
  const [libLoaded, setLibLoaded] = useState(false);
  
  // Accordion State
  const [openSections, setOpenSections] = useState({
    topics: false,
    visual: true,
    branding: false
  });

  // Visibility Toggles
  const [visibleElements, setVisibleElements] = useState({
    logo: true,
    reference: true,
    border: true
  });

  // Custom Logo State
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  // Facebook Username State
  const [fbUsername, setFbUsername] = useState('@SunnatunnabiFoundation');

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.html2canvas) {
      const script = document.createElement('script');
      script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
      script.async = true;
      script.onload = () => setLibLoaded(true);
      document.body.appendChild(script);
    } else {
      setLibLoaded(true);
    }
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const moveLanguage = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...languageOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setLanguageOrder(newOrder);
  };

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        if (prev.length === 1) return prev; 
        return prev.filter(t => t !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const handleRandomize = () => {
    const filteredQuotes = QUOTES.filter(q => selectedTopics.includes(q.category));
    const validQuotes = filteredQuotes.length > 0 ? filteredQuotes : QUOTES;
    const randomQuote = validQuotes[Math.floor(Math.random() * validQuotes.length)];
    setQuote(randomQuote);
    
    const matchingImageBgs = backgroundsList.filter(bg => 
      bg.type === 'image' && bg.category === randomQuote.category
    );
    const matchingGradientBgs = backgroundsList.filter(bg =>
      bg.type === 'gradient' && bg.category === randomQuote.category
    );

    if (matchingImageBgs.length > 0 && Math.random() > 0.3) {
      setBackground(matchingImageBgs[Math.floor(Math.random() * matchingImageBgs.length)]);
    } else if (matchingGradientBgs.length > 0) {
      setBackground(matchingGradientBgs[Math.floor(Math.random() * matchingGradientBgs.length)]);
    } else {
      setBackground(backgroundsList[Math.floor(Math.random() * backgroundsList.length)]);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCustomLogo(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBg = {
          id: `custom-bg-${Date.now()}`,
          type: 'image',
          value: e.target?.result as string,
          label: 'Custom Upload',
          category: 'custom'
        };
        setBackgroundsList(prev => [newBg, ...prev]);
        setBackground(newBg);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = (e: React.MouseEvent, idToRemove: string) => {
    e.stopPropagation();
    setBackgroundsList(prev => {
      const newList = prev.filter(bg => bg.id !== idToRemove);
      if (background.id === idToRemove && newList.length > 0) {
        setBackground(newList[0]);
      }
      return newList;
    });
  };

  const toggleVisibility = (element: keyof typeof visibleElements) => {
    setVisibleElements(prev => ({ ...prev, [element]: !prev[element] }));
  };

  const handleDownload = async () => {
    if (!canvasRef.current || !libLoaded) {
      alert("Please wait a moment for the generator to initialize.");
      return;
    }
    setIsGenerating(true);
    try {
      const canvas = await window.html2canvas(canvasRef.current, {
        useCORS: true, 
        scale: 2,
        allowTaint: false, 
        backgroundColor: null,
        logging: false
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `sunnatunnabi-post-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error("Download failed:", error);
      alert("Download Error: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderLanguageBlock = (langId: string, isFirst: boolean) => {
    switch (langId) {
      case 'arabic':
        return showArabic && (
          <div 
            key="arabic"
            className="font-['Amiri'] leading-relaxed text-emerald-100 drop-shadow-md dir-rtl transition-all"
            style={{ fontSize: `${fontSize * 1.25}px` }} 
          >
            {quote.arabic}
          </div>
        );
      case 'bangla':
        return showBangla && (
          <div key="bangla" className="relative">
             {/* Only show quote mark if it's the first visible block to avoid clutter */}
             {isFirst && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl text-white opacity-20 font-serif leading-none">“</span>}
            <p 
              className="leading-loose font-medium drop-shadow-lg transition-all"
              style={{ 
                fontSize: `${fontSize}px`,
                fontFamily: selectedBanglaFont.family
              }}
            >
              {quote.text}
            </p>
          </div>
        );
      case 'english':
        return showEnglish && (
          <div key="english" className="relative">
             {/* Only show quote mark if it's the first visible block */}
             {isFirst && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl text-white opacity-20 font-serif leading-none">“</span>}
            <p 
              className="leading-relaxed drop-shadow-lg transition-all text-slate-100"
              style={{ 
                fontSize: `${fontSize * 0.85}px`,
                fontFamily: selectedEnglishFont.family,
                fontWeight: selectedEnglishFont.label === 'Inter' ? 500 : 400
              }}
            >
              {quote.english}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Inter'] flex flex-col">
      {/* --- Navbar --- */}
      <nav className="bg-white text-slate-800 px-6 py-4 shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
               <Sprout size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight text-slate-800 tracking-tight">Sunnatunnabi<span className="text-emerald-600">Foundation</span></h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Post Generator</p>
            </div>
          </div>
          <button 
             onClick={handleRandomize}
             className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
          >
            <RefreshCw size={16} />
            Randomize
          </button>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Left Column: Canvas Preview --- */}
        <div className="lg:col-span-7 flex flex-col items-center justify-start gap-6 lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 w-full max-w-xl mx-auto">
            <div 
              className={`w-full transition-all duration-300 ease-in-out relative mx-auto shadow-sm overflow-hidden rounded-lg group`}
              style={{
                aspectRatio: aspectRatio === 'square' ? '1 / 1' : '4 / 5',
              }}
            >
              <div ref={canvasRef} className="w-full h-full relative flex flex-col justify-between bg-slate-900">
                <div className="absolute inset-0 z-0">
                  {background.type === 'gradient' ? (
                    <div className={`w-full h-full ${background.value}`} />
                  ) : (
                    <img 
                      src={background.value} 
                      alt="bg" 
                      className="w-full h-full object-cover opacity-90"
                      crossOrigin="anonymous" 
                    />
                  )}
                </div>

                <div className="absolute inset-0 z-10 bg-black transition-opacity duration-300" style={{ opacity: overlayOpacity / 100 }} />

                <div className="relative z-20 h-full flex flex-col p-8 sm:p-12 text-white">
                  {visibleElements.border && (
                    <div className="w-full flex justify-center mb-auto pt-2 opacity-90">
                       <div className="w-16 h-1 bg-[#047857] rounded-full shadow-lg" />
                    </div>
                  )}

                  <div className="flex-grow flex flex-col justify-center items-center text-center px-2 gap-6">
                    {languageOrder.map((langId) => {
                       // Calculate if this block is the first one visible
                       const visibleLanguages = languageOrder.filter(id => {
                         if(id === 'arabic') return showArabic;
                         if(id === 'bangla') return showBangla;
                         if(id === 'english') return showEnglish;
                         return false;
                       });
                       const isFirst = visibleLanguages[0] === langId;
                       
                       return renderLanguageBlock(langId, isFirst);
                    })}

                    {/* Reference */}
                    {visibleElements.reference && (
                      <div className="mt-2 flex items-center justify-center gap-3 opacity-90">
                         <div className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400"></div>
                         <p className="text-sm sm:text-base text-emerald-50 font-medium tracking-wider bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
                            style={{ fontFamily: selectedBanglaFont.family }}
                         >
                           {quote.ref}
                         </p>
                         <div className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400"></div>
                      </div>
                    )}
                  </div>

                  {visibleElements.logo && (
                    <div className="mt-auto pt-8 flex flex-col items-center gap-3 border-t border-white/10">
                      <div className="flex items-center gap-3 opacity-95">
                        {customLogo ? (
                          <img 
                            src={customLogo} 
                            alt="Logo" 
                            className="w-10 h-10 object-cover rounded-full drop-shadow-md border-2 border-white/20" 
                          />
                        ) : (
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#047857] shadow-lg border-2 border-[#047857]">
                            <Sprout size={22} fill="#047857" />
                          </div>
                        )}
                        <div className="flex flex-col items-start">
                           <span className="font-['Playfair_Display'] font-bold text-lg tracking-wide leading-none text-white drop-shadow-md">
                             Sunnatunnabi Foundation
                           </span>
                           <span className="text-xs text-emerald-200 font-medium tracking-wide mt-1 font-sans drop-shadow-sm opacity-90">
                             {fbUsername}
                           </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
             <span className="flex items-center gap-1.5"><Layout size={14} /> Preview</span>
             <span className="w-px h-3 bg-slate-300"></span>
             <span>{aspectRatio === 'square' ? '1:1 Square (Instagram)' : '4:5 Portrait (Facebook)'}</span>
          </div>
        </div>

        {/* --- Right Column: Controls --- */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col">
            
            {/* 1. TOPIC FILTERS */}
            <div className="border-b border-slate-100">
               <button 
                  onClick={() => toggleSection('topics')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-emerald-600" />
                    <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Topic Filters</h3>
                  </div>
                  {openSections.topics ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
               </button>

               {openSections.topics && (
                 <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-2">
                      {AVAILABLE_TOPICS.map(topic => (
                        <button
                          key={topic.id}
                          onClick={() => handleTopicToggle(topic.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedTopics.includes(topic.id) 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTopics.includes(topic.id) ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-100 border-slate-300'}`}>
                            {selectedTopics.includes(topic.id) && <Check size={10} className="text-white" />}
                          </div>
                          {topic.label}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={handleRandomize}
                      className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-lg shadow-slate-900/10"
                    >
                      <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500 text-emerald-400" />
                      Generate Content
                    </button>
                 </div>
               )}
            </div>

            {/* 2. VISUAL STYLE */}
            <div className="border-b border-slate-100">
               <button 
                  onClick={() => toggleSection('visual')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Palette size={16} className="text-emerald-600" />
                    <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Visual Style</h3>
                  </div>
                  {openSections.visual ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
               </button>

               {openSections.visual && (
                 <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-200 space-y-6">
                    
                    {/* Language Toggles & Order */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Languages size={14} /> Languages & Order</label>
                      <div className="space-y-2">
                         {languageOrder.map((langId, index) => {
                            const config = {
                               arabic: { label: 'Arabic', state: showArabic, set: setShowArabic },
                               bangla: { label: 'Bangla', state: showBangla, set: setShowBangla },
                               english: { label: 'English', state: showEnglish, set: setShowEnglish },
                            }[langId];
                            
                            // TypeScript guard
                            if(!config) return null;

                            return (
                               <div key={langId} className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-2">
                                  <button
                                    onClick={() => config.set(!config.state)}
                                    className={`flex-1 flex items-center gap-3 text-xs font-semibold px-2 py-1.5 rounded hover:bg-slate-50 transition-colors ${config.state ? 'text-slate-700' : 'text-slate-400'}`}
                                  >
                                     <div className={`w-8 h-5 rounded-full relative transition-colors ${config.state ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${config.state ? 'left-4' : 'left-1'}`} />
                                     </div>
                                     {config.label}
                                  </button>
                                  
                                  <div className="flex items-center gap-1 border-l border-slate-100 pl-2">
                                     <button 
                                        disabled={index === 0}
                                        onClick={() => moveLanguage(index, 'up')}
                                        className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                     >
                                        <ArrowUp size={14} />
                                     </button>
                                     <button 
                                        disabled={index === languageOrder.length - 1}
                                        onClick={() => moveLanguage(index, 'down')}
                                        className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                     >
                                        <ArrowDown size={14} />
                                     </button>
                                  </div>
                               </div>
                            );
                         })}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 w-full"></div>

                    {/* Typography Section */}
                    <div className="space-y-4">
                      
                      {/* Font Selectors */}
                      <div className="flex flex-col gap-4">
                        {showBangla && (
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Bangla Font</label>
                            <div className="grid grid-cols-2 gap-2">
                              {BANGLA_FONTS.map(font => (
                                <button
                                  key={font.id}
                                  onClick={() => setSelectedBanglaFont(font)}
                                  className={`px-3 py-2 rounded-lg text-xs border transition-all text-left truncate ${
                                    selectedBanglaFont.id === font.id
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                  style={{ fontFamily: font.family }}
                                >
                                  {font.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {showEnglish && (
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">English Font</label>
                            <div className="grid grid-cols-2 gap-2">
                              {ENGLISH_FONTS.map(font => (
                                <button
                                  key={font.id}
                                  onClick={() => setSelectedEnglishFont(font)}
                                  className={`px-3 py-2 rounded-lg text-xs border transition-all text-left truncate ${
                                    selectedEnglishFont.id === font.id
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                  style={{ fontFamily: font.family }}
                                >
                                  {font.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Font Size Slider */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between mb-3">
                          <span className="text-xs font-semibold text-slate-600 flex items-center gap-2"><Type size={14}/> Text Base Size</span>
                          <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">{fontSize}px</span>
                        </div>
                        <input 
                          type="range" 
                          min="18" 
                          max="64" 
                          value={fontSize}
                          onChange={(e) => setFontSize(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 w-full"></div>

                    {/* Backgrounds Section */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Background & Overlay</label>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                        <div className="flex justify-between mb-3">
                          <span className="text-xs font-semibold text-slate-600 flex items-center gap-2"><Droplets size={14}/> Darken Overlay</span>
                          <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">{overlayOpacity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="95" 
                          value={overlayOpacity}
                          onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                      </div>

                      <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto custom-scrollbar p-1">
                        <div className="relative aspect-square group">
                          <input 
                            type="file" 
                            ref={bgInputRef}
                            onChange={handleBackgroundUpload}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                          />
                          <button className="w-full h-full rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 group-hover:bg-emerald-50 group-hover:border-emerald-300 flex flex-col items-center justify-center text-slate-400 group-hover:text-emerald-600 gap-1 transition-all">
                            <Plus size={18} />
                            <span className="text-[9px] font-bold uppercase">New</span>
                          </button>
                        </div>
                        {backgroundsList.map((bg) => (
                          <div key={bg.id} className="relative group">
                            <button
                              onClick={() => setBackground(bg)}
                              className={`w-full aspect-square rounded-lg overflow-hidden border-2 relative transition-all ${
                                background.id === bg.id 
                                ? 'border-emerald-500 ring-2 ring-emerald-200 scale-100 shadow-md z-10' 
                                : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                              }`}
                              title={bg.label}
                            >
                              {bg.type === 'gradient' ? (
                                <div className={`w-full h-full ${bg.value}`} />
                              ) : (
                                <img src={bg.value} className="w-full h-full object-cover" alt={bg.label} />
                              )}
                            </button>
                            {bg.id !== background.id && (
                                <button
                                onClick={(e) => handleRemoveBackground(e, bg.id)}
                                className="absolute -top-1.5 -right-1.5 z-20 bg-red-500 text-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                title="Remove Background"
                              >
                                <Trash2 size={10} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               )}
            </div>

            {/* 3. BRANDING & VISIBILITY */}
            <div className="border-b border-slate-100">
               <button 
                  onClick={() => toggleSection('branding')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-emerald-600" />
                    <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Branding & Layout</h3>
                  </div>
                  {openSections.branding ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
               </button>

               {openSections.branding && (
                 <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-200 space-y-5">
                    
                    {/* Aspect Ratio Switcher */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Post Ratio</label>
                      <div className="flex p-1 bg-slate-100 rounded-lg">
                        <button
                          onClick={() => setAspectRatio('square')}
                          className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all shadow-sm ${
                            aspectRatio === 'square' ? 'bg-white text-emerald-700 shadow' : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          Square (1:1)
                        </button>
                        <button
                          onClick={() => setAspectRatio('portrait')}
                          className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all shadow-sm ${
                            aspectRatio === 'portrait' ? 'bg-white text-emerald-700 shadow' : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          Portrait (4:5)
                        </button>
                      </div>
                    </div>

                    {/* Visibility Toggles */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Elements</label>
                      <div className="flex gap-2">
                        {[
                          { key: 'logo', label: 'Logo' },
                          { key: 'reference', label: 'Reference' },
                          { key: 'border', label: 'Top Bar' }
                        ].map(item => (
                          <button
                            key={item.key}
                            onClick={() => toggleVisibility(item.key as any)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-2 transition-all active:scale-95 ${
                              visibleElements[item.key as keyof typeof visibleElements] 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            {visibleElements[item.key as keyof typeof visibleElements] ? <Check size={12} /> : <EyeOff size={12} />}
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Social Handle */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Social Handle</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                           <Share2 size={14} />
                        </span>
                        <input 
                          type="text"
                          value={fbUsername}
                          onChange={(e) => setFbUsername(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-shadow"
                          placeholder="@username"
                        />
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="pt-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Custom Logo</label>
                      <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden flex-1">
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleLogoUpload}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                            <Upload size={14} />
                            {customLogo ? 'Replace Logo' : 'Upload Image'}
                          </button>
                        </div>
                        {customLogo && (
                          <button 
                            onClick={() => { setCustomLogo(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg border border-red-100 transition-colors"
                            title="Reset to Default"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                 </div>
               )}
            </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={isGenerating || !libLoaded}
            className="w-full py-4 bg-[#DC2626] hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-900/20 text-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed mb-8"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2 animate-pulse">
                <RefreshCw size={20} className="animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                <Download size={24} />
                Download Post
              </>
            )}
          </button>

        </div>
      </main>
    </div>
  );
};

export default MainComponent;