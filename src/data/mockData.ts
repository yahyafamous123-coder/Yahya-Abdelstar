import { University, ListingPackage, Property, User, Booking, PaymentTransaction, OwnerReview } from '../types';

export const EGYPTIAN_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية (المنصورة)',
  'الغربية (طنطا)',
  'الشرقية (الزقازيق)',
  'القليوبية (بنها)',
  'المنوفية (شبين الكوم)',
  'البحيرة (دمنهور)',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'شمال سيناء (العريش)',
  'جنوب سيناء (شرم الشيخ / الطور)',
  'البحر الأحمر (الغردقة)',
  'مطروح (العلمين)',
  'الوادي الجديد'
];

export interface PopularLocation {
  name: string;
  governorate: string;
  description: string;
}

export const POPULAR_LOCATIONS: PopularLocation[] = [
  { name: 'الدقي وبين السرايات', governorate: 'الجيزة', description: 'قريب من جامعة القاهرة ومترو الدقي وثروت' },
  { name: 'المهندسين والعجوزة', governorate: 'الجيزة', description: 'منطقة راقية وحيوية على بعد 10 دقائق من جامعة القاهرة ووسط البلد' },
  { name: 'مدينة 6 أكتوبر والحي المتميز', governorate: 'الجيزة', description: 'قريب من MUST و 6 أكتوبر وجامعة مصر ومول العرب' },
  { name: 'الشيخ زايد وحدائق الأهرام', governorate: 'الجيزة', description: 'أحياء هادئة وحديثة مناسبة للطلاب والباحثين عن الراحة' },
  { name: 'مدينة نصر ومصر الجديدة', governorate: 'القاهرة', description: 'حيوية متكاملة، قرب جامعة الأزهر وعين شمس وخطوط المترو' },
  { name: 'التجمع الخامس والقاهرة الجديدة', governorate: 'القاهرة', description: 'قريب من الجامعة الأمريكية والألمانية وجامعة المستقبل' },
  { name: 'المعادي وحلوان', governorate: 'القاهرة', description: 'حي هادئ ومخضر مناسب للدراسة مع توافر مترو خط 1' },
  { name: 'العباسية ووسط البلد وشبرا', governorate: 'القاهرة', description: 'قلب القاهرة بجوار محطات المترو المركزية وطب وهندسة عين شمس' },
  { name: 'مدينة الشروق وبدر والعبور', governorate: 'القاهرة', description: 'قريب من الجامعة البريطانية وجامعة بدر وMIU والروسية' },
  { name: 'سموحة والأزاريطة والشاطبي', governorate: 'الإسكندرية', description: 'المجمع الطبي والمجمع النظري لجامعة الإسكندرية وترام الرمل' },
  { name: 'سيدي بشر والعصافرة وميامي', governorate: 'الإسكندرية', description: 'أحياء بحرية بأسعار طلابية ممتازة ومواصلات مباشرة' },
  { name: 'شارع جيهان والمشاية وتوشكى', governorate: 'الدقهلية (المنصورة)', description: 'أمام بوابات جامعة المنصورة ومستشفياتها مباشرة' },
  { name: 'شارع البحر والجيش بطنطا', governorate: 'الغربية (طنطا)', description: 'محور مدينة طنطا وكليات المجمع الطبي والعلوم والتربية' },
  { name: 'المجمع الطبي وشارع الجامعة بأسيوط', governorate: 'أسيوط', description: 'أمام كليات الطب والعلوم والهندسة والصيدلة بأسيوط' },
  { name: 'القومية والزراعة بالزقازيق', governorate: 'الشرقية (الزقازيق)', description: 'أشهر وأرقى أحياء الزقازيق قرب الحرم الجامعي' },
  { name: 'شارع كلية التجارة والفيلات ببنها', governorate: 'القليوبية (بنها)', description: 'قريب من مجمع كليات بنها ومحطة السكة الحديد' },
  { name: 'مدينة العاشر من رمضان', governorate: 'الشرقية (الزقازيق)', description: 'قريب من المعاهد التكنولوجية وجامعة الزقازيق الأهلية' }
];

export const UNIVERSITIES: University[] = [
  // --- الجامعات الحكومية المصرية (27 جامعة) ---
  {
    id: 'cu',
    name: 'جامعة القاهرة',
    governorate: 'الجيزة',
    campusArea: 'بين السرايات / الدقي / ثروت / قصر العيني',
    popularFaculties: ['طب قصر العيني', 'هندسة القاهرة', 'حاسبات ومعلومات', 'صيدلة', 'تجارة', 'حقوق', 'إعلام'],
    category: 'حكومية'
  },
  {
    id: 'asu',
    name: 'جامعة عين شمس',
    governorate: 'القاهرة',
    campusArea: 'العباسية / الخليفة المأمون / مصر الجديدة / الدمرداش',
    popularFaculties: ['طب عين شمس', 'هندسة عين شمس', 'ألسن', 'حاسبات ومعلومات', 'تجارة', 'علوم'],
    category: 'حكومية'
  },
  {
    id: 'alexu',
    name: 'جامعة الإسكندرية',
    governorate: 'الإسكندرية',
    campusArea: 'الشاطبي / الأزاريطة / سموحة / أبيس',
    popularFaculties: ['طب إسكندرية', 'هندسة الإسكندرية', 'فنون جميلة', 'صيدلة', 'تجارة'],
    category: 'حكومية'
  },
  {
    id: 'mansu',
    name: 'جامعة المنصورة',
    governorate: 'الدقهلية (المنصورة)',
    campusArea: 'بوابة توشكى / شارع جيهان / الترعة / الجمهورية',
    popularFaculties: ['طب المنصورة', 'هندسة المنصورة', 'حاسبات ومعلومات', 'صيدلة', 'طب أسنان'],
    category: 'حكومية'
  },
  {
    id: 'helwan',
    name: 'جامعة حلوان',
    governorate: 'القاهرة',
    campusArea: 'عين حلوان / الزمالك (فنون) / المطرية (هندسة)',
    popularFaculties: ['فنون تطبيقية', 'فنون جميلة', 'هندسة حلوان والمطرية', 'حاسبات وذكاء اصطناعي', 'خدمة اجتماعية'],
    category: 'حكومية'
  },
  {
    id: 'tanta',
    name: 'جامعة طنطا',
    governorate: 'الغربية (طنطا)',
    campusArea: 'المجمع الطبي بشارع البحر / مجمع سبرباي',
    popularFaculties: ['طب طنطا', 'هندسة طنطا', 'صيدلة', 'علوم', 'تربية'],
    category: 'حكومية'
  },
  {
    id: 'assiut',
    name: 'جامعة أسيوط',
    governorate: 'أسيوط',
    campusArea: 'المجمع الطبي / شارع الجامعة / الوليدية',
    popularFaculties: ['طب أسيوط', 'هندسة أسيوط', 'علوم', 'صيدلة', 'حاسبات'],
    category: 'حكومية'
  },
  {
    id: 'zag',
    name: 'جامعة الزقازيق',
    governorate: 'الشرقية (الزقازيق)',
    campusArea: 'ميدان القومية / الزراعة / صيدناوي',
    popularFaculties: ['طب الزقازيق', 'هندسة الزقازيق', 'تمريض', 'صيدلة', 'تجارة'],
    category: 'حكومية'
  },
  {
    id: 'menofia',
    name: 'جامعة المنوفية',
    governorate: 'المنوفية (شبين الكوم)',
    campusArea: 'شبين الكوم / المجمع الطبي / مجمع الكليات',
    popularFaculties: ['طب شبين الكوم', 'هندسة شبين الكوم', 'حاسبات ومعلومات', 'علوم'],
    category: 'حكومية'
  },
  {
    id: 'suezcanal',
    name: 'جامعة قناة السويس',
    governorate: 'الإسماعيلية',
    campusArea: 'الكيلو 4.5 / الطريق الدائري / الإسماعيلية الجديدة',
    popularFaculties: ['طب بشري', 'هندسة', 'طب بيطري', 'ألسن', 'صيدلة'],
    category: 'حكومية'
  },
  {
    id: 'southvalley',
    name: 'جامعة جنوب الوادي',
    governorate: 'قنا',
    campusArea: 'طريق قنا سفاجا / قنا',
    popularFaculties: ['طب قنا', 'علاج طبيعي', 'هندسة', 'آثار', 'علوم'],
    category: 'حكومية'
  },
  {
    id: 'benha',
    name: 'جامعة بنها',
    governorate: 'القليوبية (بنها)',
    campusArea: 'شارع كلية التجارة / الفيلات / كفر سعد / شبرا (هندسة)',
    popularFaculties: ['طب بنها', 'هندسة بنها وشبرا', 'حاسبات وذكاء اصطناعي', 'تمريض'],
    category: 'حكومية'
  },
  {
    id: 'fayoum',
    name: 'جامعة الفيوم',
    governorate: 'الفيوم',
    campusArea: 'مدينة الفيوم / الحرم الرئيسي / باغوص',
    popularFaculties: ['طب الفيوم', 'سياحة وفنادق', 'هندسة', 'حاسبات', 'آثار'],
    category: 'حكومية'
  },
  {
    id: 'benisuef',
    name: 'جامعة بني سويف',
    governorate: 'بني سويف',
    campusArea: 'مدينة بني سويف / شرق النيل / المجمع التعليمي',
    popularFaculties: ['طب بني سويف', 'علوم ذوي الاحتياجات الخاصة', 'دراسات عليا للعلوم المتقدمة', 'صيدلة'],
    category: 'حكومية'
  },
  {
    id: 'kafr',
    name: 'جامعة كفر الشيخ',
    governorate: 'كفر الشيخ',
    campusArea: 'سخا / طريق سخا / المجمع الرئيسي',
    popularFaculties: ['طب كفر الشيخ', 'ذكاء اصطناعي', 'ثروة سمكية ومصايد', 'هندسة', 'علاج طبيعي'],
    category: 'حكومية'
  },
  {
    id: 'sohag',
    name: 'جامعة سوهاج',
    governorate: 'سوهاج',
    campusArea: 'المقر القديم بمدينة ناصر / المقر الجديد بالكوامل',
    popularFaculties: ['طب سوهاج', 'هندسة', 'علوم', 'آداب', 'تربية'],
    category: 'حكومية'
  },
  {
    id: 'portsaid',
    name: 'جامعة بورسعيد',
    governorate: 'بورسعيد',
    campusArea: 'بورفؤاد / حي الزهور',
    popularFaculties: ['هندسة بورفؤاد', 'طب بورسعيد', 'تمريض', 'تربية رياضية'],
    category: 'حكومية'
  },
  {
    id: 'damanhour',
    name: 'جامعة دمنهور',
    governorate: 'البحيرة (دمنهور)',
    campusArea: 'دمنهور / طريق إسكندرية الزراعي / الأبعادية',
    popularFaculties: ['صيدلة', 'علوم', 'طب بيطري', 'تمريض', 'تربية'],
    category: 'حكومية'
  },
  {
    id: 'aswan',
    name: 'جامعة أسوان',
    governorate: 'أسوان',
    campusArea: 'صحاري / أسوان الجديدة / النفق',
    popularFaculties: ['هندسة الطاقة', 'طب أسوان', 'آثار', 'علوم ومصايد أسماك'],
    category: 'حكومية'
  },
  {
    id: 'damietta',
    name: 'جامعة دمياط',
    governorate: 'دمياط',
    campusArea: 'مدينة دمياط الجديدة',
    popularFaculties: ['فنون تطبيقية', 'طب دمياط', 'هندسة', 'حاسبات', 'علوم'],
    category: 'حكومية'
  },
  {
    id: 'suez',
    name: 'جامعة السويس',
    governorate: 'السويس',
    campusArea: 'حي السلام / عتاقة',
    popularFaculties: ['هندسة البترول والتعدين', 'طب السويس', 'حاسبات ومعلومات', 'إعلام وتكنولوجيا اتصال'],
    category: 'حكومية'
  },
  {
    id: 'sadat',
    name: 'جامعة مدينة السادات',
    governorate: 'المنوفية (شبين الكوم)',
    campusArea: 'مدينة السادات / المنطقة السكنية',
    popularFaculties: ['طب بيطري', 'صيدلة', 'سياحة وفنادق', 'تربية رياضية'],
    category: 'حكومية'
  },
  {
    id: 'arish',
    name: 'جامعة العريش',
    governorate: 'شمال سيناء (العريش)',
    campusArea: 'ضاحية السلام / العريش',
    popularFaculties: ['استزراع مائي ومصايد بحرية', 'طب بشري', 'علوم بيئية زراعية', 'تربية'],
    category: 'حكومية'
  },
  {
    id: 'matrouh',
    name: 'جامعة مطروح',
    governorate: 'مطروح (العلمين)',
    campusArea: 'الكيلو 9 / مدينة مرسى مطروح',
    popularFaculties: ['طب بيطري', 'بترول وتعدين', 'سياحة وفنادق', 'تمريض'],
    category: 'حكومية'
  },
  {
    id: 'wadinew',
    name: 'جامعة الوادي الجديد',
    governorate: 'الوادي الجديد',
    campusArea: 'مدينة الخارجة / طريق الداخلة',
    popularFaculties: ['طب بشري', 'طب بيطري', 'علوم', 'زراعة'],
    category: 'حكومية'
  },
  {
    id: 'luxor',
    name: 'جامعة الأقصر',
    governorate: 'الأقصر',
    campusArea: 'العوامية / طيبة الجديدة',
    popularFaculties: ['فنون جميلة الأقصر', 'آثار', 'ألسن', 'حاسبات ومعلومات', 'سياحة وفنادق'],
    category: 'حكومية'
  },
  {
    id: 'azhar',
    name: 'جامعة الأزهر',
    governorate: 'القاهرة',
    campusArea: 'مدينة نصر / الدراسة / فروع أسيوط وتفهنا والزقازيق',
    popularFaculties: ['طب الأزهر (بنين وبنات)', 'هندسة الأزهر', 'شريعة وقانون', 'أصول دين', 'لغات وترجمة', 'صيدلة'],
    category: 'حكومية'
  },

  // --- الجامعات الأهلية والدولية والتكنولوجية ---
  {
    id: 'galala',
    name: 'جامعة الجلالة الدولية',
    governorate: 'السويس',
    campusArea: 'هضبة الجلالة / العين السخنة',
    popularFaculties: ['طب بشري', 'طب أسنان', 'علاج طبيعي', 'هندسة وذكاء اصطناعي', 'علوم سينمائية'],
    category: 'أهلية'
  },
  {
    id: 'alamein',
    name: 'جامعة العلمين الدولية (AIU)',
    governorate: 'مطروح (العلمين)',
    campusArea: 'مدينة العلمين الجديدة',
    popularFaculties: ['علوم وهندسة الحاسب', 'صيدلة إكلينيكية', 'فنون وتصميم', 'إدارة أعمال'],
    category: 'أهلية'
  },
  {
    id: 'salman',
    name: 'جامعة الملك سلمان الدولية',
    governorate: 'جنوب سيناء (شرم الشيخ / الطور)',
    campusArea: 'فروع شرم الشيخ / رأس سدر / الطور',
    popularFaculties: ['طب بيطري', 'سياحة وضيافة', 'فنون وصناعات إبداعية', 'زراعات صحراوية'],
    category: 'أهلية'
  },
  {
    id: 'newmans',
    name: 'جامعة المنصورة الجديدة',
    governorate: 'الدقهلية (المنصورة)',
    campusArea: 'مدينة المنصورة الجديدة / الطريق الساحلي الدولي',
    popularFaculties: ['طب وجراحة', 'علوم وهندسة المنسوجات', 'هندسة حاسوب', 'معاملات قانونية دولية'],
    category: 'أهلية'
  },
  {
    id: 'eui',
    name: 'جامعة مصر للمعلوماتية (EUI)',
    governorate: 'القاهرة',
    campusArea: 'مدينة المعرفة / العاصمة الإدارية الجديدة',
    popularFaculties: ['علوم الحاسب والمعلومات', 'الهندسة وتكنولوجيا المعلومات', 'فنون رقمية وتصميم'],
    category: 'أهلية'
  },
  {
    id: 'benha_ahlya',
    name: 'جامعة بنها الأهلية',
    governorate: 'القليوبية (بنها)',
    campusArea: 'مدينة العبور / الحي الترفيهي',
    popularFaculties: ['طب بشري', 'طب أسنان', 'هندسة ذكاء اصطناعي', 'علاج طبيعي'],
    category: 'أهلية'
  },
  {
    id: 'mansu_ahlya',
    name: 'جامعة المنصورة الأهلية',
    governorate: 'الدقهلية (المنصورة)',
    campusArea: 'مدينة جمصة / الطريق الساحلي الدولي',
    popularFaculties: ['طب وجراحة', 'طب أسنان', 'صيدلة إكلينيكية', 'هندسة'],
    category: 'أهلية'
  },
  {
    id: 'zag_ahlya',
    name: 'جامعة الزقازيق الأهلية',
    governorate: 'الشرقية (الزقازيق)',
    campusArea: 'مدينة العاشر من رمضان',
    popularFaculties: ['طب بشري', 'هندسة إنشائية', 'ذكاء اصطناعي', 'صيدلة'],
    category: 'أهلية'
  },
  {
    id: 'alex_ahlya',
    name: 'جامعة الإسكندرية الأهلية',
    governorate: 'الإسكندرية',
    campusArea: 'منطقة أبيس / الإسكندرية',
    popularFaculties: ['طب وجراحة', 'طب أسنان', 'صيدلة', 'علوم البيانات'],
    category: 'أهلية'
  },
  {
    id: 'assiut_ahlya',
    name: 'جامعة أسيوط الأهلية',
    governorate: 'أسيوط',
    campusArea: 'مدينة أسيوط الجديدة',
    popularFaculties: ['طب وجراحة', 'طب أسنان', 'صيدلة وبحوث دوائية', 'هندسة وحاسبات'],
    category: 'أهلية'
  },
  {
    id: 'cairo_tech',
    name: 'جامعة القاهرة الجديدة التكنولوجية',
    governorate: 'القاهرة',
    campusArea: 'التجمع الخامس / اللوتس الجنوبية',
    popularFaculties: ['طاقة جديدة ومتجددة', 'ميكاترونكس', 'أوتوترونكس', 'تكنولوجيا معلومات'],
    category: 'تكنولوجية'
  },
  {
    id: 'delta_tech',
    name: 'جامعة الدلتا التكنولوجية',
    governorate: 'المنوفية (شبين الكوم)',
    campusArea: 'مدينة قويسنا الصناعية',
    popularFaculties: ['أوتوترونكس', 'ميكاترونكس', 'تكنولوجيا أطراف صناعية'],
    category: 'تكنولوجية'
  },
  {
    id: 'bsu_tech',
    name: 'جامعة بني سويف التكنولوجية',
    governorate: 'بني سويف',
    campusArea: 'بني سويف الجديدة / شرق النيل',
    popularFaculties: ['تكنولوجيا الميكاترونكس الكورية', 'تكنولوجيا المعلومات ICT'],
    category: 'تكنولوجية'
  },

  // --- الجامعات الخاصة المعتمدة ---
  {
    id: 'auc',
    name: 'الجامعة الأمريكية بالقاهرة (AUC)',
    governorate: 'القاهرة',
    campusArea: 'التجمع الخامس / شارع التسعين الجنوبي',
    popularFaculties: ['إدارة أعمال ومحاسبة', 'هندسة ميكانيكية وكمبيوتر', 'علوم سياسية', 'إعلام وفنون'],
    category: 'خاصة'
  },
  {
    id: 'guc',
    name: 'الجامعة الألمانية بالقاهرة (GUC)',
    governorate: 'القاهرة',
    campusArea: 'التجمع الخامس / القاهرة الجديدة',
    popularFaculties: ['هندسة تكنولوجيا المعلومات', 'إدارة وتكنولوجيا', 'صيدلة وبيوتكنولوجي', 'علوم تطبيقية وفنون'],
    category: 'خاصة'
  },
  {
    id: 'bue',
    name: 'الجامعة البريطانية في مصر (BUE)',
    governorate: 'القاهرة',
    campusArea: 'مدينة الشروق / طريق السويس',
    popularFaculties: ['إدارة أعمال واقتصاد', 'هندسة', 'طب أسنان', 'صيدلة', 'إعلام'],
    category: 'خاصة'
  },
  {
    id: 'must',
    name: 'جامعة مصر للعلوم والتكنولوجيا (MUST)',
    governorate: 'الجيزة',
    campusArea: 'مدينة 6 أكتوبر / الحي المتميز / المحور المركزي',
    popularFaculties: ['طب بشري وجراحة', 'طب أسنان', 'علاج طبيعي', 'هندسة وتكنولوجيا معلومات', 'صيدلة'],
    category: 'خاصة'
  },
  {
    id: 'o6u',
    name: 'جامعة 6 أكتوبر (O6U)',
    governorate: 'الجيزة',
    campusArea: 'مدينة 6 أكتوبر / المحور المركزي أمام الحصري',
    popularFaculties: ['طب وجراحة', 'طب أسنان', 'علاج طبيعي', 'صيدلة', 'فنون تطبيقية'],
    category: 'خاصة'
  },
  {
    id: 'fue',
    name: 'جامعة المستقبل بمصر (FUE)',
    governorate: 'القاهرة',
    campusArea: 'التجمع الخامس / شارع التسعين الشمالي',
    popularFaculties: ['طب الفم والأسنان', 'صيدلة وصناعات دوائية', 'هندسة وتكنولوجيا', 'حاسبات وتكنولوجيا معلومات'],
    category: 'خاصة'
  },
  {
    id: 'buc',
    name: 'جامعة بدر بالقاهرة (BUC)',
    governorate: 'القاهرة',
    campusArea: 'مدينة بدر / طريق القاهرة السويس',
    popularFaculties: ['طب بشري', 'علاج طبيعي', 'طب أسنان', 'بيطري', 'فنون تطبيقية', 'هندسة'],
    category: 'خاصة'
  },
  {
    id: 'acu',
    name: 'جامعة الأهرام الكندية (ACU)',
    governorate: 'الجيزة',
    campusArea: 'مدينة 6 أكتوبر / المنطقة الصناعية',
    popularFaculties: ['صيدلة', 'طب أسنان', 'إعلام', 'حاسبات وتكنولوجيا معلومات', 'هندسة'],
    category: 'خاصة'
  },
  {
    id: 'miu',
    name: 'جامعة مصر الدولية (MIU)',
    governorate: 'القاهرة',
    campusArea: 'طريق مصر الإسماعيلية الصحراوي / العبور',
    popularFaculties: ['طب أسنان', 'صيدلة', 'ألسن وإعلام', 'حاسبات ومعلومات', 'هندسة'],
    category: 'خاصة'
  },
  {
    id: 'pua',
    name: 'جامعة فاروس بالإسكندرية (PUA)',
    governorate: 'الإسكندرية',
    campusArea: 'سموحة / شارع قنال المحمودية',
    popularFaculties: ['صيدلة وتصنيع دوائي', 'طب أسنان', 'علاج طبيعي', 'هندسة', 'فنون وتصميم'],
    category: 'خاصة'
  },
  {
    id: 'nub',
    name: 'جامعة النهضة (NUB)',
    governorate: 'بني سويف',
    campusArea: 'مدينة بني سويف الجديدة / شرق النيل',
    popularFaculties: ['طب بشري', 'طب أسنان', 'صيدلة', 'علاج طبيعي', 'إعلام'],
    category: 'خاصة'
  },
  {
    id: 'delta_univ',
    name: 'جامعة الدلتا للعلوم والتكنولوجيا',
    governorate: 'الدقهلية (المنصورة)',
    campusArea: 'مدينة جمصة / الطريق الدولي الساحلي',
    popularFaculties: ['طب بشري', 'طب فم وأسنان', 'صيدلة', 'علاج طبيعي', 'هندسة'],
    category: 'خاصة'
  },
  {
    id: 'ngu',
    name: 'جامعة نيو جيزة (Newgiza University)',
    governorate: 'الجيزة',
    campusArea: 'طريق القاهرة الإسكندرية الصحراوي / 6 أكتوبر',
    popularFaculties: ['طب بشري', 'طب أسنان', 'صيدلة', 'إدارة أعمال ومالية'],
    category: 'خاصة'
  },
  {
    id: 'nile_univ',
    name: 'جامعة النيل الأهلية (Nile University)',
    governorate: 'الجيزة',
    campusArea: 'مدينة الشيخ زايد / محور 26 يوليو',
    popularFaculties: ['هندسة وعلوم تطبيقية', 'تكنولوجيا معلومات وعلوم حاسب', 'إدارة أعمال'],
    category: 'أهلية'
  },
  {
    id: 'eru',
    name: 'الجامعة المصرية الروسية (ERU)',
    governorate: 'القاهرة',
    campusArea: 'مدينة بدر / طريق السويس',
    popularFaculties: ['صيدلة', 'هندسة', 'طب فم وأسنان', 'ذكاء اصطناعي'],
    category: 'خاصة'
  },
  {
    id: 'deraya',
    name: 'جامعة دراية بالمنيا',
    governorate: 'المنيا',
    campusArea: 'مدينة المنيا الجديدة',
    popularFaculties: ['صيدلة', 'علاج طبيعي', 'طب أسنان', 'تمريض'],
    category: 'خاصة'
  },
  {
    id: 'heliopolis',
    name: 'جامعة هليوبوليس للتنمية المستدامة',
    governorate: 'القاهرة',
    campusArea: 'طريق بلبيس الصحراوي / السلام',
    popularFaculties: ['هندسة الطاقة والمياه', 'صيدلة وتصنيع حيوي', 'زراعة حيوية', 'إدارة واقتصاد'],
    category: 'خاصة'
  },
  {
    id: 'sphinx',
    name: 'جامعة سفنكس بأسيوط',
    governorate: 'أسيوط',
    campusArea: 'مدينة أسيوط الجديدة',
    popularFaculties: ['طب أسنان', 'علاج طبيعي', 'صيدلة', 'هندسة', 'تمريض'],
    category: 'خاصة'
  },
  {
    id: 'merit',
    name: 'جامعة ميريت بسوهاج',
    governorate: 'سوهاج',
    campusArea: 'مدينة سوهاج الجديدة',
    popularFaculties: ['طب بشري', 'طب أسنان', 'علاج طبيعي', 'صيدلة'],
    category: 'خاصة'
  }
];

export const DEFAULT_LISTING_PACKAGES: ListingPackage[] = [
  {
    id: 'pack_1week',
    name: 'باقة الأسبوع الفضي',
    durationDays: 7,
    durationText: '7 أيام عرض',
    priceEgp: 1000,
    description: 'عرض الشقة في نتائج البحث الأسبوعية مع إشعار الطلاب المهتمين بالجامعة القريبة.',
    badge: 'اقتصادية'
  },
  {
    id: 'pack_2weeks',
    name: 'باقة الأسبوعين الذهبية',
    durationDays: 14,
    durationText: '14 يوماً عرض',
    priceEgp: 1800,
    description: 'عرض مميز للشقة وتثبيتها في صدارة نتائج البحث قرب الجامعة، مع تنبيهات واتساب للطلاب.',
    isPopular: true,
    badge: 'الأكثر طلباً وتأجيراً'
  },
  {
    id: 'pack_1month',
    name: 'باقة الشهر البلاتينية',
    durationDays: 30,
    durationText: '30 يوماً عرض',
    priceEgp: 3000,
    description: 'عرض مستمر لمدة شهر كامل مع ظهور في الصفحة الرئيسية وتواصل فوري غير محدود مع الطلاب.',
    badge: 'أقصى انتشار'
  },
  {
    id: 'pack_term',
    name: 'باقة الفصل الدراسي (التيرم)',
    durationDays: 90,
    durationText: '90 يوماً عرض',
    priceEgp: 6500,
    description: 'حل شامل لموسم التنسيق وبداية العام الدراسي لضمان تأجير كامل الغرف أو الأسرة طوال التيرم.',
    badge: 'عائد مضمون'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr_student_1',
    name: 'يحيى إبراهيم',
    email: 'yahya.student@talebhome.com',
    phone: '01012345678',
    role: 'student',
    university: 'جامعة القاهرة (كلية الطب البشري)',
    isVerified: true,
    createdAt: '2025-08-10'
  },
  {
    id: 'usr_owner_1',
    name: 'الحاج محمود الدسوقي',
    email: 'eldesouky.re@gmail.com',
    phone: '01198765432',
    role: 'owner',
    nationalId: '27508120104567',
    isVerified: true,
    ratingAverage: 4.8,
    ratingsCount: 14,
    createdAt: '2025-07-20'
  },
  {
    id: 'usr_owner_2',
    name: 'المهندس طارق منصور',
    email: 'tarek.mansour@gmail.com',
    phone: '01065432198',
    role: 'owner',
    nationalId: '28203151203456',
    isVerified: true,
    ratingAverage: 4.9,
    ratingsCount: 9,
    createdAt: '2025-08-01'
  },
  {
    id: 'usr_owner_3',
    name: 'أ/ أميرة الشناوي',
    email: 'amira.elshinawy@yahoo.com',
    phone: '01287654321',
    role: 'owner',
    nationalId: '28809200109876',
    isVerified: true,
    ratingAverage: 4.95,
    ratingsCount: 18,
    createdAt: '2025-06-15'
  },
  {
    id: 'usr_owner_4',
    name: 'أستاذ حسام الأسيوطي',
    email: 'hossam.assiut@gmail.com',
    phone: '01099887766',
    role: 'owner',
    nationalId: '27911042501234',
    isVerified: true,
    ratingAverage: 4.6,
    ratingsCount: 7,
    createdAt: '2025-09-01'
  },
  {
    id: 'usr_admin',
    name: 'إدارة منصة طالب هوم',
    email: 'admin@talebhome.com',
    phone: '01200008899',
    role: 'admin',
    isVerified: true,
    createdAt: '2025-01-01'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop_1',
    title: 'سرير في غرفة مشتركة فاخرة - بين السرايات أمام جامعة القاهرة مباشرة',
    description: 'سكن طلاب راقي ومجدد بالكامل، على بُعد 3 دقائق مشياً من البوابة الرئيسية لجامعة القاهرة (بوابة التجارة والحقوق). الشقة مكيفة بالكامل ومجهزة بإنترنت فايبر سريع وغسالة ومطبخ متكامل وثلاجة خاصة.',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    ownerPhone: '01198765432',
    governorate: 'الجيزة',
    city: 'الدقي / بين السرايات',
    address: 'شارع مراد متفرع من شارع ثروت، أمام كلية التجارة، بين السرايات',
    nearestUniversityId: 'cu',
    nearestUniversityName: 'جامعة القاهرة',
    distanceMinutes: 3,
    distanceText: '3 دقائق مشياً للبوابة الرئيسية',
    priceMonthly: 1600,
    depositEgp: 1000,
    type: 'bed',
    gender: 'male',
    bedrooms: 3,
    bathrooms: 2,
    beds: 6,
    availableBeds: 2,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف سبليت',
      'واي فاي فايبر فائق السرعة',
      'غسالة ملابس أوتوماتيك',
      'سخان غاز طبيعي',
      'مكتب دراسي وإضاءة للمذاكرة لكل طالب',
      'دولاب خاص لكل سرير بمفتاح',
      'أمن وحراسة بالعمارة 24 ساعة',
      'مصعد حديث'
    ],
    rules: [
      'مخصص للطلاب الجامعيين فقط مع إبراز كارنيه الكلية',
      'ممنوع التدخين داخل الغرف',
      'ممنوع استضافة غرباء بعد الساعة 11 مساءً حرصاً على راحة الزملاء'
    ],
    listingPackageId: 'pack_2weeks',
    packageName: 'باقة الأسبوعين الذهبية (1,800 ج.م)',
    status: 'active',
    fawryReferenceNumber: '942857102',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-22',
    viewsCount: 284,
    ownerRating: 4.8,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_2',
    title: 'استوديو مستقل فاخر لطالبات الطب والصيدلة - حي الأزاريطة بجوار مجمع الكليات',
    description: 'استوديو خاص ومهيأ تماماً لطالبات كليات الطب وطب الأسنان والصيدلة بجامعة الإسكندرية. تشطيب سوبر لوكس، كاميرات مراقبة بالعقار، هادئ جداً ومناسب لأجواء الامتحانات والدراسة الشاقة.',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    ownerPhone: '01198765432',
    governorate: 'الإسكندرية',
    city: 'الأزاريطة',
    address: 'شارع كلية الطب، خلف مجمع الكليات الطبية بالأزاريطة، الإسكندرية',
    nearestUniversityId: 'alexu',
    nearestUniversityName: 'جامعة الإسكندرية',
    distanceMinutes: 4,
    distanceText: '4 دقائق مشياً لمجمع الكليات الطبية',
    priceMonthly: 4200,
    depositEgp: 3000,
    type: 'studio',
    gender: 'female',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف كاريير إنفرتر',
      'واي فاي مجاني غير محدود',
      'شاشة ذكية 43 بوصة',
      'مطبخ أمريكي مجهز بفرن وميكروويف وغلاية',
      'غسالة ملابس ومجفف',
      'انتركم وكاميرات مراقبة خارجية',
      'أمن خاص وكونسيرج بالعقار'
    ],
    rules: [
      'مخصص للطالبات فقط',
      'التزام بالهدوء وأوقات المذاكرة',
      'عقد رسمي مع توقيع ولي الأمر'
    ],
    listingPackageId: 'pack_1month',
    packageName: 'باقة الشهر البلاتينية (3,000 ج.م)',
    status: 'active',
    fawryReferenceNumber: '913840291',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-10-08',
    viewsCount: 512,
    ownerRating: 4.8,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_3',
    title: 'شقة سكنية كاملة مفروشة 3 غرف لطلاب جامعة المنصورة (شارع جيهان)',
    description: 'شقة واسعة ومجهزة بالكامل تتسع لـ 5 أو 6 طلاب. موقع حيوي جداً في شارع جيهان أمام بوابة توشكى ومستشفى الجامعة. كافة الخدمات من مطاعم ومكتبات ومغاسل أسفل العمارة مباشرة.',
    ownerId: 'usr_owner_2',
    ownerName: 'المهندس طارق منصور',
    ownerPhone: '01065432198',
    governorate: 'الدقهلية (المنصورة)',
    city: 'المنصورة / شارع جيهان',
    address: 'شارع جيهان، برج النور، الطابق الرابع، بالقرب من بوابة توشكى',
    nearestUniversityId: 'mansu',
    nearestUniversityName: 'جامعة المنصورة',
    distanceMinutes: 5,
    distanceText: '5 دقائق مشياً لبوابة توشكى ومستشفى الجامعة',
    priceMonthly: 6000,
    depositEgp: 4000,
    type: 'apartment',
    gender: 'male',
    bedrooms: 3,
    bathrooms: 2,
    beds: 5,
    availableBeds: 5,
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف في الصالة والغرف الرئيسية',
      'واي فاي منزلي سريع',
      'سخانات مياه بكل حمام',
      'غسالة فل أوتوماتيك وثلاجة 16 قدم',
      'شرفة واسعة مطلة على شارع جيهان',
      'مكاتب وكراسي طبية للمذاكرة',
      'مصعد يعمل بالطاقة الاحتياطية'
    ],
    rules: [
      'الحفاظ على نظافة المكان والأثاث',
      'سداد الإيجار في أول 3 أيام من الشهر'
    ],
    listingPackageId: 'pack_1week',
    packageName: 'باقة الأسبوع الفضي (1,000 ج.م)',
    status: 'active',
    fawryReferenceNumber: '782910432',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-15',
    viewsCount: 198,
    ownerRating: 4.9,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_4',
    title: 'غرفة سنجل خاصة لطالبة بجوار مترو الدمرداش وجامعة عين شمس',
    description: 'غرفة سنجل خاصة ومستقلة داخل شقة هادئة ومحترمة مخصصة لطالبات كلية التمريض وطب عين شمس. الشقة على بعد خطوتين من محطة مترو الدمرداش وسور مستشفيات جامعة عين شمس.',
    ownerId: 'usr_owner_3',
    ownerName: 'أ/ أميرة الشناوي',
    ownerPhone: '01287654321',
    governorate: 'القاهرة',
    city: 'العباسية / الوايلي',
    address: 'شارع المستشفى الإيطالي، بالقرب من محطة مترو الدمرداش والعباسية',
    nearestUniversityId: 'asu',
    nearestUniversityName: 'جامعة عين شمس',
    distanceMinutes: 6,
    distanceText: '6 دقائق مشياً لمترو الدمرداش وطب عين شمس',
    priceMonthly: 2300,
    depositEgp: 1500,
    type: 'room',
    gender: 'female',
    bedrooms: 3,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'مكتب خشبي واسع للمذاكرة مع رف كتب',
      'سرير 120 سم بمرتبة يانسن مريحة',
      'واي فاي غير محدود',
      'غاز طبيعي وسخان مياه',
      'ثلاجة وغسالة وموقد مشترك بنظام هادئ',
      'عمارة عائلية ومؤمنة تماماً'
    ],
    rules: [
      'بنات فقط',
      'الهدوء التام بعد الساعة 10 مساءً للمذاكرة',
      'ممنوع دخول الذكور نهائياً'
    ],
    listingPackageId: 'pack_2weeks',
    packageName: 'باقة الأسبوعين الذهبية (1,800 ج.م)',
    status: 'active',
    fawryReferenceNumber: '654321890',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-22',
    viewsCount: 340,
    ownerRating: 4.95,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_5',
    title: 'شاليه واستوديو مودرن لطلاب جامعة 6 أكتوبر و MUST (الحي المتميز)',
    description: 'وحدة سكنية فاخرة بنظام الشاليه في فيلا مستقلة بالحي المتميز بـ 6 أكتوبر. قريبة جداً من جامعة MUST وجامعة 6 أكتوبر ومول العرب. حديقة خاصة وموقف سيارات وأعلى درجات الهدوء والراحة.',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    ownerPhone: '01198765432',
    governorate: 'الجيزة',
    city: 'مدينة 6 أكتوبر / الحي المتميز',
    address: 'المنطقة الثالثة، الحي المتميز، خلف مستشفى دار الفؤاد وجامعة MUST',
    nearestUniversityId: 'must',
    nearestUniversityName: 'جامعة مصر للعلوم والتكنولوجيا (MUST)',
    distanceMinutes: 7,
    distanceText: '7 دقائق بالسيارة / ميكروباص من بوابة MUST',
    priceMonthly: 4800,
    depositEgp: 3000,
    type: 'chalet',
    gender: 'any',
    bedrooms: 1,
    bathrooms: 1,
    beds: 2,
    availableBeds: 2,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف وتدفئة',
      'حديقة خاصة وتراس خارجي',
      'واي فاي ألياف ضوئية',
      'شاشة سمارت مدمجة',
      'مكان ركن سيارات آمن',
      'حراسة خاصة وكاميرات أمنية'
    ],
    rules: [
      'مناسب للطلاب أو الإخوة أو المعيدين',
      'ممنوع الحفلات والضوضاء العالية'
    ],
    listingPackageId: 'pack_2weeks',
    packageName: 'باقة الأسبوعين الذهبية (1,800 ج.م)',
    status: 'pending_approval',
    fawryReferenceNumber: '839201948',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-22',
    viewsCount: 14,
    ownerRating: 4.8,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_6',
    title: 'سرير في غرفة ثنائية - طلاب جامعة أسيوط (المجمع الطبي)',
    description: 'سكن شباب بالقرب من المجمع الطبي وكليات الهندسة والطب بأسيوط. تشطيب نظيف، مروحة سقف وسخان غاز ومطبخ متكامل، سعر اقتصادي جداً ومناسب للطلاب المغتربين.',
    ownerId: 'usr_owner_4',
    ownerName: 'أستاذ حسام الأسيوطي',
    ownerPhone: '01099887766',
    governorate: 'أسيوط',
    city: 'أسيوط / شارع الجامعة',
    address: 'شارع الجمهورية متفرع من شارع الجامعة، بجوار المجمع الطبي',
    nearestUniversityId: 'assiut',
    nearestUniversityName: 'جامعة أسيوط',
    distanceMinutes: 5,
    distanceText: '5 دقائق مشياً للمجمع الطبي',
    priceMonthly: 1100,
    depositEgp: 500,
    type: 'bed',
    gender: 'male',
    bedrooms: 2,
    bathrooms: 1,
    beds: 4,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'واي فاي مجاني',
      'سخان مياه',
      'غسالة ملابس نصف أوتوماتيك',
      'مطبخ مجهز ببوتاجاز وثلاجة',
      'شرفة تهوية جيدة'
    ],
    rules: [
      'مخصص لطلاب جامعة أسيوط',
      'ممنوع السهر والضجيج'
    ],
    listingPackageId: 'pack_1week',
    packageName: 'باقة الأسبوع الفضي (1,000 ج.م)',
    status: 'pending_approval',
    fawryReferenceNumber: '502918374',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-15',
    viewsCount: 9,
    ownerRating: 4.6,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_7',
    title: 'شقة مفروشة راقية وهادئة بالمعادي - بجوار المترو مباشرة (مثالية للدراسة)',
    description: 'شقة واسعة ومجهزة بالكامل في أرقى أحياء المعادي (دجلة المعادي). مناسبة جداً للطلاب الذين يفضلون السكن في منطقة هادئة وراقية بعيداً عن صخب الجامعة، وتبعد 4 دقائق مشياً فقط عن محطة مترو المعادي التي تصلك مباشرة بجامعات القاهرة، حلوان، وعين شمس.',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    ownerPhone: '01198765432',
    governorate: 'القاهرة',
    city: 'المعادي / دجلة',
    address: 'شارع 206 متفرع من شارع دجلة، بالقرب من محطة مترو المعادي',
    nearestUniversityId: 'helwan',
    nearestUniversityName: 'جامعة حلوان / القاهرة',
    distanceMinutes: 25,
    distanceText: '25 دقيقة بالمترو المباشر - حي هادئ وراقي',
    transportAccess: 'محطة مترو المعادي خط 1 على بعد 4 دقائق مشياً',
    areaDistrict: 'المعادي',
    priceMonthly: 5500,
    depositEgp: 3500,
    type: 'apartment',
    gender: 'any',
    bedrooms: 2,
    bathrooms: 1,
    beds: 3,
    availableBeds: 3,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف كاريير سبليت',
      'إنترنت فايبر فائق السرعة',
      'غاز طبيعي وسخان مياه',
      'غسالة ومجفف أوتوماتيك',
      'عمارة شيك وهادئة مع مصعد وكاميرات مراقبة'
    ],
    rules: [
      'الالتزام بالهدوء التام ونظافة المكان',
      'ممنوع الحفلات الموسيقية'
    ],
    listingPackageId: 'pack_1month',
    packageName: 'باقة الشهر البلاتينية (3,000 ج.م)',
    status: 'active',
    fawryReferenceNumber: '928475102',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-10-15',
    viewsCount: 310,
    ownerRating: 4.85,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_8',
    title: 'استوديو فندقي فاخر بالتجمع الخامس - قرب الجامعة الألمانية GUC والأمريكية AUC',
    description: 'استوديو أنيق ومؤثث بأحدث الأجهزة في الحي الرابع بالتجمع الخامس. قريب من شارع التسعين ومحور طلعت حرب. مناسب جداً لطلاب الجامعات الخاصة والأهلية بالقاهرة الجديدة والباحثين عن مستوى سكني راقي ومستقل.',
    ownerId: 'usr_owner_2',
    ownerName: 'المهندس طارق منصور',
    ownerPhone: '01065432198',
    governorate: 'القاهرة',
    city: 'التجمع الخامس / القاهرة الجديدة',
    address: 'الحي الرابع، فيلات التجمع الخامس، بالقرب من الجامعة الألمانية GUC وشارع التسعين',
    nearestUniversityId: 'guc',
    nearestUniversityName: 'الجامعة الألمانية بالقاهرة (GUC)',
    distanceMinutes: 8,
    distanceText: '8 دقائق بالسيارة / أوبر من GUC و AUC',
    transportAccess: 'مواصلات وميكروباصات التجمع وسيارات أوبر متوفرة 24 ساعة',
    areaDistrict: 'التجمع الخامس',
    priceMonthly: 6200,
    depositEgp: 4000,
    type: 'studio',
    gender: 'any',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee152da7c5d6?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف إنفرتر وتدفئة',
      'مطبخ متكامل بماكينة قهوة وميكروويف',
      'واي فاي عالي السرعة',
      'شاشة 55 بوصة سمارت',
      'حديقة خاصة ومدخل مستقل'
    ],
    rules: [
      'مخصص للطلاب الملتزمين',
      'إبراز هوية جامعية سارية'
    ],
    listingPackageId: 'pack_1month',
    packageName: 'باقة الشهر البلاتينية (3,000 ج.م)',
    status: 'active',
    fawryReferenceNumber: '839401725',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-10-18',
    viewsCount: 420,
    ownerRating: 4.9,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_9',
    title: 'شقة مفروشة 3 غرف بمدينة نصر - حي عباس العقاد وقرب مترو الاستاد',
    description: 'شقة سكنية متكاملة للطلاب المغتربين في قلب مدينة نصر الحيوية. مطاعم وكافيهات ومكتبات دراسية على بعد خطوات. سهولة الانتقال لجامعة الأزهر، جامعة عين شمس، أو وسط البلد بمترو الخط الثالث.',
    ownerId: 'usr_owner_3',
    ownerName: 'أ/ أميرة الشناوي',
    ownerPhone: '01287654321',
    governorate: 'القاهرة',
    city: 'مدينة نصر / عباس العقاد',
    address: 'شارع أنور المفتي، خلف جنينة مول، مدينة نصر',
    nearestUniversityId: 'azhar',
    nearestUniversityName: 'جامعة الأزهر / عين شمس',
    distanceMinutes: 12,
    distanceText: '12 دقيقة بالمواصلات لجامعة الأزهر و 15 دقيقة لعين شمس',
    transportAccess: 'مترو أرض المعارض ومترو الاستاد على بعد 10 دقائق',
    areaDistrict: 'مدينة نصر',
    priceMonthly: 4800,
    depositEgp: 3000,
    type: 'apartment',
    gender: 'male',
    bedrooms: 3,
    bathrooms: 2,
    beds: 4,
    availableBeds: 2,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف ومراوح بكل غرفة',
      'إنترنت واي فاي سريع',
      'ثلاجة 18 قدم وغسالة فول أوتوماتيك',
      'سخان غاز طبيعي',
      'بواب وعمارة عائلية ممتازة'
    ],
    rules: [
      'التزام بأوقات الراحة العامة',
      'سداد الإيجار بانتظام'
    ],
    listingPackageId: 'pack_2weeks',
    packageName: 'باقة الأسبوعين الذهبية (1,800 ج.م)',
    status: 'active',
    fawryReferenceNumber: '619284710',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-28',
    viewsCount: 265,
    ownerRating: 4.95,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_10',
    title: 'سرير في غرفة ثنائية - شارع البحر أمام جامعة طنطا والمجمع الطبي',
    description: 'سكن شباب ممتاز بمدينة طنطا، يقع في أرقى مناطق شارع البحر أمام كليات الطب والصيدلة والعلوم. الشقة نظيفة جداً ومجهزة بإنترنت سريع وغسالة ومطبخ كبير.',
    ownerId: 'usr_owner_2',
    ownerName: 'المهندس طارق منصور',
    ownerPhone: '01065432198',
    governorate: 'الغربية (طنطا)',
    city: 'طنطا / شارع البحر',
    address: 'شارع الجيش متقاطع مع شارع البحر، بجوار مستشفى الجامعة، طنطا',
    nearestUniversityId: 'tanta',
    nearestUniversityName: 'جامعة طنطا',
    distanceMinutes: 4,
    distanceText: '4 دقائق مشياً لكليات المجمع الطبي ومستشفيات طنطا',
    transportAccess: 'ميكروباصات ومحطة قطار طنطا قريبة جداً',
    areaDistrict: 'شارع البحر',
    priceMonthly: 1400,
    depositEgp: 1000,
    type: 'bed',
    gender: 'male',
    bedrooms: 2,
    bathrooms: 1,
    beds: 4,
    availableBeds: 2,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'مكتب دراسة خاص لكل طالب',
      'واي فاي مجاني غير محدود',
      'سخان غاز طبيعي',
      'غسالة ومطبخ متكامل'
    ],
    rules: [
      'مخصص لطلاب جامعة طنطا فقط',
      'ممنوع التدخين'
    ],
    listingPackageId: 'pack_2weeks',
    packageName: 'باقة الأسبوعين الذهبية (1,800 ج.م)',
    status: 'active',
    fawryReferenceNumber: '492817293',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-09-24',
    viewsCount: 180,
    ownerRating: 4.8,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_11',
    title: 'شقة طالبات راقية بحي القومية بالزقازيق - أمان تام وقرب الحرم الجامعي',
    description: 'شقة خاصة مجهزة بالكامل لطالبات كليات الطب والصيدلة والتمريض بجامعة الزقازيق. تقع بحي القومية الأرقى بالزقازيق. تشطيب سوبر لوكس ومراقبة بالكاميرات ونظام أمني محكم.',
    ownerId: 'usr_owner_3',
    ownerName: 'أ/ أميرة الشناوي',
    ownerPhone: '01287654321',
    governorate: 'الشرقية (الزقازيق)',
    city: 'الزقازيق / حي القومية',
    address: 'شارع طلبة عويضة، حي القومية، الزقازيق',
    nearestUniversityId: 'zag',
    nearestUniversityName: 'جامعة الزقازيق',
    distanceMinutes: 6,
    distanceText: '6 دقائق بالميكروباص من البوابة الرئيسية لجامعة الزقازيق',
    transportAccess: 'ميكروباصات وتاكسي الحرم متوفرة أمام العمارة مباشرة',
    areaDistrict: 'حي القومية',
    priceMonthly: 3800,
    depositEgp: 2500,
    type: 'apartment',
    gender: 'female',
    bedrooms: 2,
    bathrooms: 1,
    beds: 3,
    availableBeds: 2,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف سبليت',
      'واي فاي مجاني',
      'عمارة عائلية بها أمن وسيدة حراسة',
      'شاشات تلفزيون وغسالة أوتوماتيك'
    ],
    rules: [
      'بنات فقط مع إبراز كارنيه الكلية',
      'عدم استقبال زوار بعد الساعة 9 مساءً'
    ],
    listingPackageId: 'pack_1month',
    packageName: 'باقة الشهر البلاتينية (3,000 ج.م)',
    status: 'active',
    fawryReferenceNumber: '719284018',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-10-10',
    viewsCount: 220,
    ownerRating: 4.95,
    createdAt: '2026-09-08'
  },
  {
    id: 'prop_12',
    title: 'استوديو راقي بالشيخ زايد - مناسب لجامعة النيل و 6 أكتوبر والجامعات الأهلية',
    description: 'استوديو هادئ ومودرن داخل كمبوند سكني بالشيخ زايد. يوفر بيئة استثنائية للتركيز والدراسة للطلاب الذين يفضلون الخصوصية والبعد عن ضوضاء الحرم الجامعي، مع سرعة الوصول لكليات زايد و 6 أكتوبر.',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    ownerPhone: '01198765432',
    governorate: 'الجيزة',
    city: 'الشيخ زايد',
    address: 'الحي الثامن، بالقرب من هايبر وان ومحور 26 يوليو، الشيخ زايد',
    nearestUniversityId: 'nile_univ',
    nearestUniversityName: 'جامعة النيل / جامعة 6 أكتوبر',
    distanceMinutes: 15,
    distanceText: '15 دقيقة بالسيارة / المواصلات من جامعات أكتوبر وزايد',
    transportAccess: 'محور 26 يوليو ومحطة مونوريل المستقبلية وميكروباصات زايد',
    areaDistrict: 'الشيخ زايد',
    priceMonthly: 5200,
    depositEgp: 3500,
    type: 'studio',
    gender: 'any',
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    availableBeds: 1,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'تكييف وتدفئة',
      'مطبخ كيتشينيت بأحدث الأجهزة',
      'أمن وحراسة 24 ساعة للكمبوند',
      'مساحات خضراء وممشى دراجات'
    ],
    rules: [
      'الحفاظ على نظافة المكان والهدوء',
      'ممنوع التدخين بالداخل'
    ],
    listingPackageId: 'pack_1month',
    packageName: 'باقة الشهر البلاتينية (3,000 ج.م)',
    status: 'active',
    fawryReferenceNumber: '891029384',
    listingPaymentStatus: 'paid',
    expiresAt: '2026-10-20',
    viewsCount: 390,
    ownerRating: 4.85,
    createdAt: '2026-09-08'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book_101',
    propertyId: 'prop_1',
    propertyTitle: 'سرير في غرفة مشتركة فاخرة - بين السرايات أمام جامعة القاهرة',
    propertyImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    propertyAddress: 'شارع مراد، بين السرايات، الجيزة',
    nearestUniversity: 'جامعة القاهرة',
    monthlyRent: 1600,
    depositEgp: 1000,
    studentId: 'usr_student_1',
    studentName: 'يحيى إبراهيم',
    studentPhone: '01012345678',
    studentUniversity: 'جامعة القاهرة (طب قصر العيني)',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    ownerPhone: '01198765432',
    startDate: '2026-03-01',
    durationMonths: 6,
    status: 'confirmed',
    depositPaid: true,
    fawryRefCode: '293847561',
    rentalPeriodEnded: true, // Ended rental period so the student can rate the owner directly!
    hasBeenRated: false,
    createdAt: '2026-03-01'
  },
  {
    id: 'book_100',
    propertyId: 'prop_3',
    propertyTitle: 'شقة سكنية كاملة مفروشة 3 غرف لطلاب جامعة المنصورة (شارع جيهان)',
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    propertyAddress: 'شارع جيهان، برج النور، المنصورة',
    nearestUniversity: 'جامعة المنصورة',
    monthlyRent: 6000,
    depositEgp: 4000,
    studentId: 'usr_student_1',
    studentName: 'يحيى إبراهيم',
    studentPhone: '01012345678',
    studentUniversity: 'جامعة القاهرة (طب قصر العيني)',
    ownerId: 'usr_owner_2',
    ownerName: 'المهندس طارق منصور',
    ownerPhone: '01065432198',
    startDate: '2025-10-01',
    durationMonths: 4,
    status: 'confirmed',
    depositPaid: true,
    fawryRefCode: '582910432',
    rentalPeriodEnded: true,
    hasBeenRated: true,
    ratingScore: 5,
    ratingComment: 'شخص محترم جداً، الشقة كانت نظيفة جداً واستجاب فوراً لما احتجنا صيانة السخان في الشتاء.',
    createdAt: '2025-10-01'
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx_1001',
    type: 'listing_fee',
    typeArabic: 'رسوم باقة عرض وإعلان شقة (أسبوعين)',
    amountEgp: 1800,
    fawryReferenceNumber: '942857102',
    userId: 'usr_owner_1',
    userName: 'الحاج محمود الدسوقي',
    userRole: 'owner',
    userPhone: '01198765432',
    propertyId: 'prop_1',
    propertyTitle: 'سرير في غرفة مشتركة - بين السرايات جامعة القاهرة',
    packageName: 'باقة الأسبوعين الذهبية',
    status: 'paid',
    createdAt: '2026-09-07 14:20',
    paidAt: '2026-09-07 14:35',
    expiresAt: '2026-09-09 14:20'
  },
  {
    id: 'tx_1002',
    type: 'listing_fee',
    typeArabic: 'رسوم باقة عرض وإعلان استوديو (شهر)',
    amountEgp: 3000,
    fawryReferenceNumber: '913840291',
    userId: 'usr_owner_1',
    userName: 'الحاج محمود الدسوقي',
    userRole: 'owner',
    userPhone: '01198765432',
    propertyId: 'prop_2',
    propertyTitle: 'استوديو مستقل لطالبات الطب - الأزاريطة إسكندرية',
    packageName: 'باقة الشهر البلاتينية',
    status: 'paid',
    createdAt: '2026-09-07 16:10',
    paidAt: '2026-09-07 16:22',
    expiresAt: '2026-09-09 16:10'
  },
  {
    id: 'tx_1003',
    type: 'booking_deposit',
    typeArabic: 'عربون حجز سكن طلاب وسيط عبر فوري',
    amountEgp: 1000,
    fawryReferenceNumber: '293847561',
    userId: 'usr_student_1',
    userName: 'يحيى إبراهيم',
    userRole: 'student',
    userPhone: '01012345678',
    propertyId: 'prop_1',
    propertyTitle: 'سرير في غرفة مشتركة - بين السرايات',
    status: 'paid',
    createdAt: '2026-09-08 09:15',
    paidAt: '2026-09-08 09:30',
    expiresAt: '2026-09-10 09:15'
  },
  {
    id: 'tx_1004',
    type: 'listing_fee',
    typeArabic: 'رسوم باقة عرض وإعلان شاليه (أسبوعين)',
    amountEgp: 1800,
    fawryReferenceNumber: '839201948',
    userId: 'usr_owner_1',
    userName: 'الحاج محمود الدسوقي',
    userRole: 'owner',
    userPhone: '01198765432',
    propertyId: 'prop_5',
    propertyTitle: 'شاليه واستوديو مودرن - الحي المتميز 6 أكتوبر',
    packageName: 'باقة الأسبوعين الذهبية',
    status: 'paid',
    createdAt: '2026-09-08 11:00',
    paidAt: '2026-09-08 11:12',
    expiresAt: '2026-09-10 11:00'
  }
];

export const INITIAL_REVIEWS: OwnerReview[] = [
  {
    id: 'rev_1',
    bookingId: 'book_100',
    ownerId: 'usr_owner_2',
    ownerName: 'المهندس طارق منصور',
    studentId: 'usr_student_1',
    studentName: 'يحيى إبراهيم',
    studentUniversity: 'جامعة القاهرة (طب قصر العيني)',
    propertyId: 'prop_3',
    propertyTitle: 'شقة سكنية كاملة مفروشة 3 غرف لطلاب جامعة المنصورة',
    rating: 5,
    cleanlinessRating: 5,
    communicationRating: 5,
    maintenanceRating: 5,
    comment: 'شخص محترم جداً وقمة في الأمانة. الشقة كانت نظيفة جداً واستجاب فوراً لما احتجنا صيانة في الشتاء.',
    createdAt: '2026-02-15'
  },
  {
    id: 'rev_2',
    bookingId: 'book_past_1',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    studentId: 'usr_student_2',
    studentName: 'عمر خالد النجار',
    studentUniversity: 'جامعة القاهرة (هندسة)',
    propertyId: 'prop_1',
    propertyTitle: 'سرير في غرفة مشتركة فاخرة - بين السرايات',
    rating: 5,
    cleanlinessRating: 5,
    communicationRating: 5,
    maintenanceRating: 4,
    comment: 'الحاج محمود راجل محترم جداً وبيتعامل مع الطلاب كأنهم أولاده. الهدوء متوفر ومفيش أي مشاكل طوال فترة إقامتي.',
    createdAt: '2026-01-20'
  },
  {
    id: 'rev_3',
    bookingId: 'book_past_2',
    ownerId: 'usr_owner_1',
    ownerName: 'الحاج محمود الدسوقي',
    studentId: 'usr_student_3',
    studentName: 'أحمد ماهر رضوان',
    studentUniversity: 'جامعة القاهرة (حاسبات)',
    propertyId: 'prop_1',
    propertyTitle: 'سرير في غرفة مشتركة فاخرة - بين السرايات',
    rating: 4,
    cleanlinessRating: 4,
    communicationRating: 5,
    maintenanceRating: 4,
    comment: 'الموقع ممتاز جداً على بعد خطوات من البوابة، المالك ملتزم جداً بالعقد ورجع العربون في موعده.',
    createdAt: '2025-12-10'
  },
  {
    id: 'rev_4',
    bookingId: 'book_past_3',
    ownerId: 'usr_owner_3',
    ownerName: 'أ/ أميرة الشناوي',
    studentId: 'usr_student_4',
    studentName: 'سارة عبد المنعم',
    studentUniversity: 'جامعة عين شمس (طب)',
    propertyId: 'prop_4',
    propertyTitle: 'غرفة سنجل خاصة لطالبة بجوار مترو الدمرداش وجامعة عين شمس',
    rating: 5,
    cleanlinessRating: 5,
    communicationRating: 5,
    maintenanceRating: 5,
    comment: 'أستاذة أميرة قمة في الذوق والأمانة. السكن أمان تام للبنات والهدوء ممتاز جداً للمذاكرة والامتحانات.',
    createdAt: '2026-02-01'
  },
  {
    id: 'rev_5',
    bookingId: 'book_past_4',
    ownerId: 'usr_owner_4',
    ownerName: 'أستاذ حسام الأسيوطي',
    studentId: 'usr_student_5',
    studentName: 'كريم مجدي',
    studentUniversity: 'جامعة أسيوط (هندسة)',
    propertyId: 'prop_6',
    propertyTitle: 'سرير في غرفة ثنائية - طلاب جامعة أسيوط',
    rating: 4,
    cleanlinessRating: 4,
    communicationRating: 5,
    maintenanceRating: 4,
    comment: 'مكان مناسب وسعر اقتصادي جداً، والتعامل مريح وسلس.',
    createdAt: '2026-01-05'
  }
];
