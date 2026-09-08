import { CountryInfo, University, Property } from '../types';
import { UNIVERSITIES as EGYPT_UNIVERSITIES, INITIAL_PROPERTIES as EGYPT_PROPERTIES } from './mockData';

export const COUNTRIES: CountryInfo[] = [
  {
    code: 'EG',
    name: 'مصر',
    enName: 'Egypt',
    flag: '🇪🇬',
    currency: 'ج.م',
    currencyCode: 'EGP',
    phonePrefix: '+20',
    defaultLang: 'ar',
    direction: 'rtl',
    tagline: 'المنصة الأولى والوسيط المعتمد لسكن طلاب الجامعات في جميع محافظات مصر',
    majorCities: [
      'القاهرة',
      'الجيزة',
      'الإسكندرية',
      'المنصورة (الدقهلية)',
      'طنطا (الغربية)',
      'الزقازيق (الشرقية)',
      'أسيوط',
      'حلوان',
      'بنها (القليوبية)',
      'بني سويف',
      'المنيا',
      'سوهاج',
      'قنا',
      'أسوان'
    ],
    popularDistricts: [
      'الدقي والمهندسين',
      'بين السرايات والجامعة',
      'مدينة نصر',
      'العباسية والوايلي',
      'المعادي',
      'التجمع الخامس والقاهرة الجديدة',
      'الشيخ زايد و6 أكتوبر',
      'سموحة والشاطبي',
      'حي الجامعة بالمنصورة'
    ]
  },
  {
    code: 'SA',
    name: 'المملكة العربية السعودية',
    enName: 'Saudi Arabia',
    flag: '🇸🇦',
    currency: 'ر.س',
    currencyCode: 'SAR',
    phonePrefix: '+966',
    defaultLang: 'ar',
    direction: 'rtl',
    tagline: 'سكن الطلاب والطالبات المعتمد بالقرب من الجامعات السعودية الكبرى',
    majorCities: [
      'الرياض',
      'جدة',
      'الدمام والظهران',
      'مكة المكرمة',
      'المدينة المنورة',
      'أبها وخميس مشيط',
      'القصيم (بريدة)',
      'تبوك'
    ],
    popularDistricts: [
      'حي الدرعية والخزامى (قرب جامعة الملك سعود)',
      'حي النخيل وحطين بالرياض',
      'حي السليمانية والفيصلية بجدة',
      'حي الشاطئ والزهراء',
      'الدوحة الشمالية بالظهران (قرب البترول والمعادن)',
      'حي العوالي بمكة المكرمة'
    ]
  },
  {
    code: 'AE',
    name: 'الإمارات العربية المتحدة',
    enName: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'د.إ',
    currencyCode: 'AED',
    phonePrefix: '+971',
    defaultLang: 'ar',
    direction: 'rtl',
    tagline: 'شقق واستوديوهات فاخرة وسكن طلاب معتمد في دبي وأبوظبي والشارقة',
    majorCities: [
      'دبي',
      'أبوظبي',
      'الشارقة',
      'عجمان',
      'العين',
      'رأس الخيمة'
    ],
    popularDistricts: [
      'مدينة دبي الأكاديمية العالمية',
      'قرية المعرفة ودبي مارينا',
      'المدينة الجامعية بالشارقة',
      'جزيرة السعديات والريم بأبوظبي',
      'المرابع والجداف'
    ]
  },
  {
    code: 'JO',
    name: 'المملكة الأردنية الهاشمية',
    enName: 'Jordan',
    flag: '🇯🇴',
    currency: 'د.أ',
    currencyCode: 'JOD',
    phonePrefix: '+962',
    defaultLang: 'ar',
    direction: 'rtl',
    tagline: 'سكنات طلاب وطالبات آمنة ومريحة بجوار الجامعات الأردنية',
    majorCities: [
      'عمان',
      'إربد',
      'الزرقاء',
      'السلط',
      'العقبة',
      'الكرك'
    ],
    popularDistricts: [
      'شارع الجامعة الأردنية والجبيهة',
      'خلدا وتلاع العلي',
      'شارع شفيق ارشيدات (شارع الجامعة بإربد)',
      'الحي الشرقي بإربد',
      'ضاحية الرشيد'
    ]
  },
  {
    code: 'TR',
    name: 'تركيا',
    enName: 'Turkey',
    flag: '🇹🇷',
    currency: '₺',
    currencyCode: 'TRY',
    phonePrefix: '+90',
    defaultLang: 'tr',
    direction: 'rtl',
    tagline: 'سكن الطلاب الدوليين والعرب في إسطنبول وأنقرة وإزمير',
    majorCities: [
      'إسطنبول (Istanbul)',
      'أنقرة (Ankara)',
      'إزمير (Izmir)',
      'أنطاليا (Antalya)',
      'بورصة (Bursa)',
      'قونية (Konya)'
    ],
    popularDistricts: [
      'الفاتح وبيازيد (Fatih & Beyazit)',
      'شيشلي ومجيدية كوي (Şişli & Mecidiyeköy)',
      'أوسكودار وقاضي كوي (Üsküdar & Kadıköy)',
      'تشانكايا بأنقرة (Çankaya)',
      'أفجيلار وبيلك دوزو (Avcılar)'
    ]
  },
  {
    code: 'GB',
    name: 'المملكة المتحدة',
    enName: 'United Kingdom',
    flag: '🇬🇧',
    currency: '£',
    currencyCode: 'GBP',
    phonePrefix: '+44',
    defaultLang: 'en',
    direction: 'rtl',
    tagline: 'سكن الطلاب الدولي في لندن، مانشستر، أكسفورد وباقي مدن بريطانيا',
    majorCities: [
      'لندن (London)',
      'مانشستر (Manchester)',
      'أكسفورد (Oxford)',
      'كامبريدج (Cambridge)',
      'إدنبرة (Edinburgh)',
      'برمنغهام (Birmingham)',
      'ليدز (Leeds)'
    ],
    popularDistricts: [
      'بلومزبري وكينجز كروس (Bloomsbury / King\'s Cross)',
      'جنوب كنسينغتون (South Kensington)',
      'أوكسفورد رود بمانشستر (Oxford Road)',
      'حي كاو كيدجات بإدنبرة',
      'إيلينغ وفيكتوريا'
    ]
  },
  {
    code: 'DE',
    name: 'ألمانيا',
    enName: 'Germany',
    flag: '🇩🇪',
    currency: '€',
    currencyCode: 'EUR',
    phonePrefix: '+49',
    defaultLang: 'de',
    direction: 'rtl',
    tagline: 'شقق وسكن الطلاب في برلين، ميونخ، آخن، وهايدلبرغ',
    majorCities: [
      'برلين (Berlin)',
      'ميونخ (Munich)',
      'فرانكفورت (Frankfurt)',
      'هايدلبرغ (Heidelberg)',
      'آخن (Aachen)',
      'هامبورغ (Hamburg)'
    ],
    popularDistricts: [
      'ميتي وشارلوتنبورغ ببرلين (Mitte & Charlottenburg)',
      'شفابينغ بميونخ (Schwabing)',
      'بوكنهايم بفرانكفورت (Bockenheim)',
      'البلدة القديمة بهايدلبرغ (Altstadt)'
    ]
  },
  {
    code: 'MY',
    name: 'ماليزيا',
    enName: 'Malaysia',
    flag: '🇲🇾',
    currency: 'RM',
    currencyCode: 'MYR',
    phonePrefix: '+60',
    defaultLang: 'en',
    direction: 'rtl',
    tagline: 'مجمعات سكنية حديثة ومكيفة للطلاب في كوالالمبور وسيلانجور',
    majorCities: [
      'كوالالمبور (Kuala Lumpur)',
      'سيلانجور (Selangor)',
      'بينانج (Penang)',
      'جوهور باهرو (Johor Bahru)'
    ],
    popularDistricts: [
      'بانغسار ساوث وبانغسار (Bangsar South)',
      'بيتالينغ جايا (Petaling Jaya)',
      'صنواي وسوبانغ جايا (Sunway & Subang)',
      'سايبرجايا (Cyberjaya)'
    ]
  },
  {
    code: 'US',
    name: 'الولايات المتحدة',
    enName: 'United States',
    flag: '🇺🇸',
    currency: '$',
    currencyCode: 'USD',
    phonePrefix: '+1',
    defaultLang: 'en',
    direction: 'rtl',
    tagline: 'شقق واستوديوهات وسكن طلاب معتمد في بوسطن، نيويورك، ولوس أنجلوس',
    majorCities: [
      'بوسطن وماساتشوستس (Boston, MA)',
      'نيويورك (New York, NY)',
      'شيكاغو (Chicago, IL)',
      'لوس أنجلوس (Los Angeles, CA)',
      'سان فرانسيسكو وسيليكون فالي (SF Bay Area)'
    ],
    popularDistricts: [
      'كامبريدج وسومرفيل (Cambridge, MA)',
      'مانهاتن وبروكلين (Manhattan & Brooklyn)',
      'هايد بارك بشيكاغو (Hyde Park)',
      'ويستوود بلوس أنجلوس (Westwood, LA)'
    ]
  }
];

// International Universities
export const INTERNATIONAL_UNIVERSITIES: University[] = [
  // Saudi Arabia
  {
    id: 'ksu',
    name: 'جامعة الملك سعود (الرياض)',
    countryCode: 'SA',
    governorate: 'الرياض',
    campusArea: 'الدرعية - غرب الرياض',
    popularFaculties: ['الطب البشري', 'الهندسة', 'علوم الحاسب والذكاء الاصطناعي', 'إدارة الأعمال'],
    category: 'حكومية',
    lat: 24.7162,
    lng: 46.6192
  },
  {
    id: 'kau',
    name: 'جامعة الملك عبد العزيز (جدة)',
    countryCode: 'SA',
    governorate: 'جدة',
    campusArea: 'السليمانية - جدة',
    popularFaculties: ['الطب والعلوم الطبية', 'الهندسة البحرية والمعمارية', 'تقنية المعلومات'],
    category: 'حكومية',
    lat: 21.4933,
    lng: 39.2464
  },
  {
    id: 'kfupm',
    name: 'جامعة الملك فهد للبترول والمعادن (الظهران)',
    countryCode: 'SA',
    governorate: 'الدمام والظهران',
    campusArea: 'الظهران - المنطقة الشرقية',
    popularFaculties: ['هندسة البترول', 'علوم الحاسب والذكاء الاصطناعي', 'الهندسة الكهربائية'],
    category: 'حكومية',
    lat: 26.3075,
    lng: 50.1444
  },
  {
    id: 'pnu',
    name: 'جامعة الأميرة نورة بنت عبد الرحمن (الرياض)',
    countryCode: 'SA',
    governorate: 'الرياض',
    campusArea: 'طريق المطار - شمال الرياض',
    popularFaculties: ['الصيدلة والتمريض', 'التصميم والفنون', 'اللغات والترجمة'],
    category: 'حكومية',
    lat: 24.8465,
    lng: 46.7262
  },
  {
    id: 'uqu',
    name: 'جامعة أم القرى (مكة المكرمة)',
    countryCode: 'SA',
    governorate: 'مكة المكرمة',
    campusArea: 'العابدية - مكة المكرمة',
    popularFaculties: ['الشريعة والدراسات الإسلامية', 'الطب والجراحة', 'الهندسة'],
    category: 'حكومية',
    lat: 21.3283,
    lng: 39.9515
  },

  // UAE
  {
    id: 'uaeu',
    name: 'جامعة الإمارات العربية المتحدة (العين)',
    countryCode: 'AE',
    governorate: 'العين',
    campusArea: 'المقام - مدينة العين',
    popularFaculties: ['الطب والعلوم الصحية', 'الهندسة وتقنية المعلومات', 'القانون'],
    category: 'حكومية',
    lat: 24.1950,
    lng: 55.6880
  },
  {
    id: 'ku_ae',
    name: 'جامعة خليفة للعلوم والتكنولوجيا (أبوظبي)',
    countryCode: 'AE',
    governorate: 'أبوظبي',
    campusArea: 'شارع السعادة - أبوظبي',
    popularFaculties: ['الهندسة الميكانيكية والفضاء', 'الذكاء الاصطناعي', 'العلوم الطبية الحيوية'],
    category: 'حكومية',
    lat: 24.4447,
    lng: 54.3980
  },
  {
    id: 'aus',
    name: 'الجامعة الأمريكية في الشارقة',
    countryCode: 'AE',
    governorate: 'الشارقة',
    campusArea: 'المدينة الجامعية - الشارقة',
    popularFaculties: ['الهندسة المعمارية والتصميم', 'إدارة الأعمال', 'الاتصال الجماهيري'],
    category: 'خاصة',
    lat: 25.3115,
    lng: 55.4920
  },
  {
    id: 'diac',
    name: 'مجمع مدينة دبي الأكاديمية العالمية',
    countryCode: 'AE',
    governorate: 'دبي',
    campusArea: 'المدينة الأكاديمية - دبي',
    popularFaculties: ['فروع الجامعات البريطانية والأسترالية', 'التكنولوجيا والإعلام'],
    category: 'خاصة',
    lat: 25.1200,
    lng: 55.4050
  },

  // Jordan
  {
    id: 'ju',
    name: 'الجامعة الأردنية (عمان)',
    countryCode: 'JO',
    governorate: 'عمان',
    campusArea: 'شارع الملكة رانيا - الجبيهة',
    popularFaculties: ['الطب البشري', 'طب الأسنان', 'الهندسة والتكنولوجيا', 'الحقوق'],
    category: 'حكومية',
    lat: 32.0160,
    lng: 35.8700
  },
  {
    id: 'just',
    name: 'جامعة العلوم والتكنولوجيا الأردنية (إربد)',
    countryCode: 'JO',
    governorate: 'إربد',
    campusArea: 'الرمثا - طريق إربد عمان',
    popularFaculties: ['الطب والجراحة', 'الهندسة النووية والطبية', 'التمريض'],
    category: 'حكومية',
    lat: 32.4950,
    lng: 35.9890
  },
  {
    id: 'hu_jo',
    name: 'الجامعة الهاشمية (الزرقاء)',
    countryCode: 'JO',
    governorate: 'الزرقاء',
    campusArea: 'أوتوستراد الزرقاء - المفرق',
    popularFaculties: ['العلوم الطبية المساندة', 'الهندسة', 'التمريض'],
    category: 'حكومية',
    lat: 32.1020,
    lng: 36.1860
  },

  // Turkey
  {
    id: 'istanbul_u',
    name: 'جامعة إسطنبول (Istanbul University)',
    countryCode: 'TR',
    governorate: 'إسطنبول (Istanbul)',
    campusArea: 'بيازيد والفاتح (Beyazıt & Fatih)',
    popularFaculties: ['الطب', 'الحقوق', 'الآداب واللغات', 'إدارة الأعمال'],
    category: 'حكومية',
    lat: 41.0130,
    lng: 28.9630
  },
  {
    id: 'metu',
    name: 'جامعة الشرق الأوسط التقنية (METU - Ankara)',
    countryCode: 'TR',
    governorate: 'أنقرة (Ankara)',
    campusArea: 'تشانكايا (Çankaya - Ankara)',
    popularFaculties: ['الهندسة الكهربائية والإلكترونية', 'علوم الحاسوب', 'الفيزياء'],
    category: 'حكومية',
    lat: 39.8910,
    lng: 32.7830
  },
  {
    id: 'itu',
    name: 'جامعة إسطنبول التقنية (İTU)',
    countryCode: 'TR',
    governorate: 'إسطنبول (Istanbul)',
    campusArea: 'مسلك (Maslak - Istanbul)',
    popularFaculties: ['هندسة الحاسوب والذكاء الاصطناعي', 'العمارة والتخطيط العمراني'],
    category: 'حكومية',
    lat: 41.1060,
    lng: 29.0230
  },

  // United Kingdom
  {
    id: 'ucl',
    name: 'كلية لندن الجامعية (UCL - London)',
    countryCode: 'GB',
    governorate: 'لندن (London)',
    campusArea: 'بلومزبري (Bloomsbury, Central London)',
    popularFaculties: ['الطب الحيوي', 'الهندسة والقانون', 'العلوم الاقتصادية والسياسية'],
    category: 'حكومية',
    lat: 51.5246,
    lng: -0.1340
  },
  {
    id: 'imperial',
    name: 'إمبريال كوليدج لندن (Imperial College)',
    countryCode: 'GB',
    governorate: 'لندن (London)',
    campusArea: 'جنوب كنسينغتون (South Kensington)',
    popularFaculties: ['الهندسة والعلوم والتكنولوجيا', 'الطب', 'إدارة الأعمال'],
    category: 'حكومية',
    lat: 51.4988,
    lng: -0.1749
  },
  {
    id: 'manchester_u',
    name: 'جامعة مانشستر (University of Manchester)',
    countryCode: 'GB',
    governorate: 'مانشستر (Manchester)',
    campusArea: 'شارع أكسفورد (Oxford Road)',
    popularFaculties: ['الفيزياء والرياضيات', 'الهندسة الكيميائية', 'العلوم الإنسانية'],
    category: 'حكومية',
    lat: 53.4668,
    lng: -2.2339
  },

  // Germany
  {
    id: 'tum',
    name: 'جامعة ميونخ التقنية (TUM Munich)',
    countryCode: 'DE',
    governorate: 'ميونخ (Munich)',
    campusArea: 'شارع أركيس ومجمع غارشينغ (Garching)',
    popularFaculties: ['هندسة الروبوتات والذكاء الاصطناعي', 'الهندسة الميكانيكية', 'الفيزياء'],
    category: 'حكومية',
    lat: 48.1497,
    lng: 11.5680
  },
  {
    id: 'humboldt',
    name: 'جامعة هومبولت في برلين (Humboldt Berlin)',
    countryCode: 'DE',
    governorate: 'برلين (Berlin)',
    campusArea: 'ميتي وأونتر دن ليندن (Mitte - Berlin)',
    popularFaculties: ['الفلسفة والعلوم الإنسانية', 'الطب (شاريتيه)', 'الحقوق والاقتصاد'],
    category: 'حكومية',
    lat: 52.5180,
    lng: 13.3930
  },

  // Malaysia
  {
    id: 'um_my',
    name: 'جامعة مالايا (Universiti Malaya)',
    countryCode: 'MY',
    governorate: 'كوالالمبور (Kuala Lumpur)',
    campusArea: 'ليمبا بانتاي (Lembah Pantai)',
    popularFaculties: ['الطب والعلوم الصحية', 'الهندسة وتكنولوجيا المعلومات', 'إدارة الأعمال'],
    category: 'حكومية',
    lat: 3.1209,
    lng: 101.6538
  },

  // United States
  {
    id: 'harvard',
    name: 'جامعة هارفارد (Harvard University)',
    countryCode: 'US',
    governorate: 'بوسطن وماساتشوستس (Boston, MA)',
    campusArea: 'كامبريدج (Cambridge, MA)',
    popularFaculties: ['الطب', 'الحقوق', 'إدارة الأعمال', 'العلوم والهندسة'],
    category: 'خاصة',
    lat: 42.3770,
    lng: -71.1167
  },
  {
    id: 'mit',
    name: 'معهد ماساتشوستس للتكنولوجيا (MIT)',
    countryCode: 'US',
    governorate: 'بوسطن وماساتشوستس (Boston, MA)',
    campusArea: 'كيندل سكوير (Kendall Square - Cambridge)',
    popularFaculties: ['الذكاء الاصطناعي وعلوم الحاسب', 'الهندسة الكهربائية', 'الفيزياء والتصميم'],
    category: 'خاصة',
    lat: 42.3601,
    lng: -71.0942
  }
];

// Seed properties for international countries
export const INTERNATIONAL_PROPERTIES: Property[] = [
  // Saudi Arabia properties
  {
    id: 'prop_sa_1',
    title: 'استوديو VIP مفروش بالدرعية بجوار جامعة الملك سعود',
    description: 'استوديو حديث ومؤثث بالكامل بأثاث راقي، تكييف سبليت هادئ، إنترنت ألياف بصرية، 5 دقائق بالسيارة أو الحافلة من بوابة جامعة الملك سعود.',
    countryCode: 'SA',
    currency: 'ر.س',
    ownerId: 'owner_sa_1',
    ownerName: 'أبو فهد العتيبي',
    ownerPhone: '0501234567',
    governorate: 'الرياض',
    city: 'الرياض',
    address: 'حي الدرعية، شارع الخزامى، الرياض',
    nearestUniversityId: 'ksu',
    nearestUniversityName: 'جامعة الملك سعود (الرياض)',
    distanceMinutes: 7,
    distanceText: '7 دقائق بالباص والسيارة للجامعة',
    transportAccess: 'حافلات الرياض ومحطة المترو المباشرة على بعد 300 متر',
    areaDistrict: 'حي الدرعية والخزامى',
    lat: 24.7250,
    lng: 46.6110,
    priceMonthly: 2400,
    depositEgp: 0,
    type: 'studio',
    gender: 'male',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['واي فاي ألياف بصرية فائقة السرعة', 'تكييف سبليت', 'شاشة ذكية 55 بوصة', 'غسالة ملابس أوتوماتيك', 'موقف خاص مظلل'],
    rules: ['مخصص للطلاب الجامعيين', 'ممنوع التدخين داخل الاستوديو', 'سكن هادئ ومريح للمذاكرة'],
    listingPackageId: 'pkg_month',
    packageName: 'باقة الشهر المميزة',
    status: 'active',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-11-01',
    viewsCount: 182,
    ownerRating: 4.9,
    createdAt: '2026-09-01'
  },
  {
    id: 'prop_sa_2',
    title: 'شقة طالبات راقية ومؤثثة بحي السليمانية قرب جامعة الملك عبد العزيز',
    description: 'شقة بنات هادئة ومؤثثة بالكامل بتصميم مريح وأمني، حراسة ومصعد، قريبة جداً من كليات البنات وجامعة الملك عبد العزيز بجدة.',
    countryCode: 'SA',
    currency: 'ر.س',
    ownerId: 'owner_sa_2',
    ownerName: 'أم محمد الغامدي',
    ownerPhone: '0559876543',
    governorate: 'جدة',
    city: 'جدة',
    address: 'حي السليمانية، قرب شارع عبد القدوس الأنصاري، جدة',
    nearestUniversityId: 'kau',
    nearestUniversityName: 'جامعة الملك عبد العزيز (جدة)',
    distanceMinutes: 6,
    distanceText: '6 دقائق مشياً أو بحافلة الطالبات',
    transportAccess: 'باصات جامعة الملك عبد العزيز تمر مباشرة من أمام المبنى',
    areaDistrict: 'حي السليمانية والجامعة',
    lat: 21.4980,
    lng: 39.2410,
    priceMonthly: 1800,
    depositEgp: 0,
    type: 'room',
    gender: 'female',
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['حراسة أمنية على مدار 24 ساعة', 'إنترنت سريع مجاني', 'مطبخ متكامل حديث', 'تكييف مركزي', 'مكتب دراسي مريح'],
    rules: ['سكن طالبات فقط', 'الهدوء بعد الساعة 10 مساءً', 'نظام أمني عائلي'],
    listingPackageId: 'pkg_month',
    packageName: 'باقة الشهر المميزة',
    status: 'active',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-11-15',
    viewsCount: 235,
    ownerRating: 4.8,
    createdAt: '2026-09-02'
  },

  // UAE properties
  {
    id: 'prop_ae_1',
    title: 'استوديو حديث في المدينة الأكاديمية بدبي للطلاب',
    description: 'استوديو طلابي عصري في قلب مدينة دبي الأكاديمية العالمية، مزود بمسبح وجيم مشترك، وقريب من جميع الجامعات الدولية وكليات التقنية.',
    countryCode: 'AE',
    currency: 'د.إ',
    ownerId: 'owner_ae_1',
    ownerName: 'المهندس راشد الشامسي',
    ownerPhone: '0509871234',
    governorate: 'دبي',
    city: 'دبي',
    address: 'المدينة الأكاديمية العالمية، دبي',
    nearestUniversityId: 'diac',
    nearestUniversityName: 'مجمع مدينة دبي الأكاديمية العالمية',
    distanceMinutes: 5,
    distanceText: '5 دقائق سيراً على الأقدام للحرم الجامعي',
    transportAccess: 'حافلات RTA المباشرة لمحطة مترو سنتر بوينت',
    areaDistrict: 'مدينة دبي الأكاديمية العالمية',
    lat: 25.1230,
    lng: 55.4090,
    priceMonthly: 3200,
    depositEgp: 0,
    type: 'studio',
    gender: 'any',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['صالة رياضية (جيم) ومسبح', 'إنترنت فائق السرعة', 'أمن على مدار الساعة وبوابات ذكية', 'تكييف مركزي شامل', 'مواقف سيارات'],
    rules: ['عقد سنوي أو فصلي للطلاب', 'بيئة دراسية هادئة'],
    listingPackageId: 'pkg_month',
    packageName: 'باقة الشهر المميزة',
    status: 'active',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-11-20',
    viewsCount: 310,
    ownerRating: 5.0,
    createdAt: '2026-09-03'
  },

  // Jordan properties
  {
    id: 'prop_jo_1',
    title: 'شقة طلاب مفروشة بشارع الجامعة الأردنية والجبيهة',
    description: 'شقة واسعة ومجهزة بالكامل قرب البوابة الشمالية للجامعة الأردنية، تدفئة مركزية، غسالة، وقريبة من المطاعم والخدمات الطلابية.',
    countryCode: 'JO',
    currency: 'د.أ',
    ownerId: 'owner_jo_1',
    ownerName: 'الحاج أبو طارق المجالي',
    ownerPhone: '0791234567',
    governorate: 'عمان',
    city: 'عمان',
    address: 'شارع الملكة رانيا، ضاحية الرشيد قرب الجامعة الأردنية، عمان',
    nearestUniversityId: 'ju',
    nearestUniversityName: 'الجامعة الأردنية (عمان)',
    distanceMinutes: 4,
    distanceText: '4 دقائق مشياً لبوابة الجامعة الأردنية',
    transportAccess: 'باص عمان السريع يمر من أمام المجمع مباشرة',
    areaDistrict: 'الجبيهة وضاحية الرشيد',
    lat: 32.0190,
    lng: 35.8670,
    priceMonthly: 280,
    depositEgp: 0,
    type: 'apartment',
    gender: 'male',
    bedrooms: 2,
    bathrooms: 1,
    beds: 3,
    availableBeds: 2,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['تدفئة مركزية', 'إنترنت سريع غير محدود', 'مطبخ مجهز وثلاجة', 'غسالة ملابس', 'شرفة واسعة'],
    rules: ['سكن هادئ للطلاب والباحثين', 'دفع شهري ميسر'],
    listingPackageId: 'pkg_month',
    packageName: 'باقة الشهر المميزة',
    status: 'active',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-11-25',
    viewsCount: 195,
    ownerRating: 4.7,
    createdAt: '2026-09-04'
  },

  // Turkey properties
  {
    id: 'prop_tr_1',
    title: 'شقة واستوديو مريح بالفاتح قرب جامعة إسطنبول (Fatih / Istanbul)',
    description: 'سكن مثالي للطلاب العرب والأجانب في منطقة الفاتح التاريخية، دقيقتان لمحطة الترام واي ومسافة قصيرة لجامعة إسطنبول العريقة.',
    countryCode: 'TR',
    currency: '₺',
    ownerId: 'owner_tr_1',
    ownerName: 'محمد يلماز (Yılmaz)',
    ownerPhone: '05341234567',
    governorate: 'إسطنبول (Istanbul)',
    city: 'إسطنبول',
    address: 'حي الفاتح وبيازيد، إسطنبول، تركيا',
    nearestUniversityId: 'istanbul_u',
    nearestUniversityName: 'جامعة إسطنبول (Istanbul University)',
    distanceMinutes: 6,
    distanceText: '6 دقائق مشياً لحرم جامعة إسطنبول',
    transportAccess: 'خط ترام واي T1 ومحطة مترو M2 بجوار البناية',
    areaDistrict: 'الفاتح وبيازيد (Fatih & Beyazit)',
    lat: 41.0150,
    lng: 28.9600,
    priceMonthly: 12500,
    depositEgp: 0,
    type: 'studio',
    gender: 'any',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['تدفئة غاز (كومبي)', 'إنترنت ألياف ضوئية', 'أثاث تركي حديث ومكتب', 'غسالة وتلفزيون ذكي'],
    rules: ['مخصص للطلاب المسجلين', 'بدون أي عمولة سمسرة'],
    listingPackageId: 'pkg_month',
    packageName: 'باقة الشهر المميزة',
    status: 'active',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-11-30',
    viewsCount: 340,
    ownerRating: 4.9,
    createdAt: '2026-09-05'
  },

  // UK properties
  {
    id: 'prop_gb_1',
    title: 'استوديو طالب مفروش في بلومزبري لندن قرب UCL',
    description: 'غرفة استوديو أنيقة ومستقلة مع حمام داخلي ومكتب دراسي، دقيقتان سيراً على الأقدام لكلية لندن الجامعية UCL ومحطة راسل سكوير.',
    countryCode: 'GB',
    currency: '£',
    ownerId: 'owner_gb_1',
    ownerName: 'Arthur Pendelton',
    ownerPhone: '07700900123',
    governorate: 'لندن (London)',
    city: 'لندن',
    address: 'Bloomsbury, Russell Square, London WC1',
    nearestUniversityId: 'ucl',
    nearestUniversityName: 'كلية لندن الجامعية (UCL - London)',
    distanceMinutes: 3,
    distanceText: '3 دقائق مشياً لحرم UCL',
    transportAccess: 'محطة مترو Russell Square و King\'s Cross قريبة جداً',
    areaDistrict: 'بلومزبري وكينجز كروس (Bloomsbury)',
    lat: 51.5240,
    lng: -0.1330,
    priceMonthly: 1100,
    depositEgp: 0,
    type: 'studio',
    gender: 'any',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['فواتير الكهرباء والإنترنت والتدفئة مشمولة', 'أمن ودخول ببطاقة إلكترونية', 'مطبخ صغير خاص', 'مغسلة مشتركة'],
    rules: ['سكن مخصص للطلاب الجامعيين فقط', 'عقد دراسي مرن'],
    listingPackageId: 'pkg_month',
    packageName: 'باقة الشهر المميزة',
    status: 'active',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-12-01',
    viewsCount: 420,
    ownerRating: 4.8,
    createdAt: '2026-09-06'
  }
];

// Helper to get country by code
export function getCountryByCode(code: string): CountryInfo {
  return COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase()) || COUNTRIES[0];
}

// Helper to get all universities for a country
export function getUniversitiesForCountry(countryCode: string): University[] {
  if (!countryCode || countryCode === 'EG') {
    return EGYPT_UNIVERSITIES.map(u => ({ ...u, countryCode: 'EG' }));
  }
  const filtered = INTERNATIONAL_UNIVERSITIES.filter(u => u.countryCode === countryCode);
  return filtered.length > 0 ? filtered : EGYPT_UNIVERSITIES.map(u => ({ ...u, countryCode: 'EG' }));
}

// Helper to get all properties for a country
export function getPropertiesForCountry(countryCode: string): Property[] {
  if (!countryCode || countryCode === 'EG') {
    return EGYPT_PROPERTIES.map(p => ({ ...p, countryCode: 'EG', currency: 'ج.م' }));
  }
  const filtered = INTERNATIONAL_PROPERTIES.filter(p => p.countryCode === countryCode);
  return filtered.length > 0 ? filtered : EGYPT_PROPERTIES.map(p => ({ ...p, countryCode: 'EG', currency: 'ج.م' }));
}
