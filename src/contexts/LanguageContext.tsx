import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.back": "Retour",
    
    // Hero
    "hero.badge": "Architecture d'Excellence",
    "hero.title": "Transformez Vos Rêves\nen Réalité",
    "hero.subtitle": "Des projets architecturaux uniques, conçus avec passion et expertise pour créer des espaces qui vous ressemblent",
    "hero.cta.project": "Démarrer mon projet",
    "hero.cta.formation": "Inscription aux formations",
    
    // Difference Section
    "difference.title": "Notre Différence",
    "difference.projects.title": "Projets d'Architecture",
    "difference.projects.1": "Une Expertise au Service de Votre Vision",
    "difference.projects.2": "Un Processus Clair et Rassurant",
    "difference.projects.3": "Maîtrise des Enjeux Techniques et Réglementaires",
    "difference.projects.4": "Une Valeur Ajoutée Créative et Fonctionnelle",
    "difference.projects.desc": "Confier votre projet, c'est investir dans la sérénité. Nous transformons vos idées en plans précis et beaux, pour un résultat final qui dépasse vos attentes",
    "difference.formations.title": "Formations aux Logiciels",
    "difference.formations.1": "Des Formateurs qui Sont des Experts du Terrain",
    "difference.formations.2": "Une Pédagogie par la Pratique",
    "difference.formations.3": "Un Cursus Complet",
    "difference.formations.4": "Un Accès et un Suivi Post-Formation",
    "difference.formations.desc": "Nous ne vous apprenons pas juste à cliquer, nous vous enseignons à concevoir plus efficacement, avec moins d'erreurs et une meilleure collaboration.",
    
    // Team Section
    "team.title": "Une Équipe Dédiée à Votre Succès",
    "team.p1": "AB Anas BENLECHGAR est un bureau de design d'intérieur et d'aménagement professionnel spécialisé dans la création de concepts personnalisés pour les espaces professionnels.",
    "team.p2": "Nous avons une équipe talentueuse d'architectes d'intérieur et d'ingénieurs. Nous sommes passionnés par l'architecture d'intérieur et nous croyons en l'importance de la qualité, de la créativité et du professionnalisme.",
    "team.p3": "Nous nous engageons à offrir un service personnalisé, transparent et de qualité supérieure. Chez AB Anas BENLECHGAR, nous donnons vie à vos idées en créant des espaces professionnels fonctionnels, esthétiques et durables.",
    "team.cta": "Découvrir notre portfolio",
    
    // Office Section
    "office.title": "Bureau Casablanca",
    "office.desc": "Notre bureau est situé sur le boulevard Ghandi à Casablanca. Depuis cet emplacement, notre équipe d'experts et de spécialistes en architecture et en formation se tient à votre disposition chaque jour pour accompagner vos projets, résoudre vos problématiques et contribuer à l'amélioration continue de vos résultats",
    "office.floor": "6ème étage, Espace Ranime",
    "office.street": "16 Rue des Asphodèles",
    "office.boulevard": "Bd Ghandi – Casablanca",
    "office.country": "Maroc",
    
    // CTA Section
    "cta.title": "Prêt à commencer?",
    "cta.subtitle": "Remplissez notre formulaire en quelques minutes et recevez une réponse rapide",
    "cta.submit": "Soumettre ma demande",
    "cta.formations": "Accéder aux formations",
    
    // Footer
    "footer.rights": "© 2025 Architecture d'Excellence. Tous droits réservés.",
    "footer.contact": "Contact:",
    "footer.contactAria": "Contacter via WhatsApp",

    // Not Found
    "notfound.title": "404",
    "notfound.message": "Oups ! Page non trouvée",
    "notfound.return": "Retour à l'accueil",
    
    // Portfolio Page
    "portfolio.interior": "Architecture d'intérieur",
    "portfolio.design.title": "Conception / Aménagement  / Travaux",
    "portfolio.design.desc": "Transformez vos espaces avec des conceptions innovantes et personnalisées qui reflètent votre vision et votre style unique.",
    "portfolio.folder.title": "Portefeuille général",
    "portfolio.folder.desc": "Découvrez l'ensemble de nos réalisations et projets d'architecture d'intérieur",
    "portfolio.folder.link": "Voir le portfolio",
    "portfolio.ref.title": "Référence",
    "portfolio.ref.desc": "Nos certifications, attestations et références professionnelles",
    "portfolio.ref.link": "Voir les références",
    "portfolio.about.title": "À propos de moi",
    "portfolio.about.p1": "AB Anas BENLECHGAR est un bureau de design d'intérieur et d'aménagement professionnel spécialisé dans la création de concepts personnalisés pour les espaces professionnels et résidentiels.",
    "portfolio.about.p2": "Avec une passion pour l'architecture d'intérieur, nous nous engageons à offrir des solutions de design innovantes qui allient esthétique et fonctionnalité. Notre approche repose sur la qualité, la créativité, le professionnalisme et un service personnalisé adapté aux besoins uniques de chaque client.",
    "portfolio.services": "Services",
    "portfolio.service.1": "Conceptions 2D et 3D",
    "portfolio.service.2": "Plans plafond, électricité, menuiserie",
    "portfolio.service.3": "Plans carrelage, cuisine, dressing",
    "portfolio.service.4": "Revêtements de sol et habillage",
    "portfolio.service.5": "CPS, métré TCE",
    "portfolio.service.6": "Planning et PV de chantier",
    "portfolio.skills": "Compétences",
    "portfolio.contact.title": "Contactez-nous",
    "portfolio.contact.subtitle": "Notre équipe est à votre écoute pour donner vie à vos projets",
    "portfolio.phone": "Téléphone",
    "portfolio.address": "Adresse",
    "portfolio.follow": "Suivez-nous",
    "social.platform": "Plateforme AB",
    "social.whatsapp": "WhatsApp",
    "social.instagram": "Instagram",
    "social.youtube": "YouTube",
    "social.tiktok": "TikTok",
    "portfolio.footer": "© 2025 AB Anas BENLECHGAR. Tous droits réservés.",

    // Form Pages
    "form.back": "Retour",
    "form.next": "Suivant",
    "form.continue": "Continuer",
    "form.validate": "Valider l'inscription",
    "form.viewSummary": "Voir le récapitulatif",
    
    // Step Labels
    "step.project": "Projet",
    "step.details": "Détails",
    "step.documents": "Documents",
    "step.formations": "Formations",
    "step.planning": "Planning",
    "step.information": "Informations",
    
    // FormStep1 - Formations
    "formation.title": "Choisissez votre formation",
    "formation.subtitle": "Sélectionnez une formation pour découvrir son planning détaillé et vous inscrire",
    "formation.skills": "Compétences",
    "formation.level": "Niveau",
    "formation.duration": "Durée",

    // Formation options
    "formation.options.autocad.name": "AutoCAD",
    "formation.options.autocad.description": "Maîtrisez le dessin technique 2D/3D",
    "formation.options.autocad.skills": "Plans, coupes, façades",
    "formation.options.autocad.level": "Débutant à Avancé",
    "formation.options.autocad.duration": "40 heures",

    "formation.options.revit.name": "Revit",
    "formation.options.revit.description": "BIM et modélisation architecturale",
    "formation.options.revit.skills": "Maquettes numériques, coordination",
    "formation.options.revit.level": "Intermédiaire",
    "formation.options.revit.duration": "50 heures",

    "formation.options.3dsmax.name": "3ds Max",
    "formation.options.3dsmax.description": "Rendus 3D photoréalistes",
    "formation.options.3dsmax.skills": "Modélisation, textures, éclairage",
    "formation.options.3dsmax.level": "Intermédiaire à Avancé",
    "formation.options.3dsmax.duration": "45 heures",

    "formation.options.dce.name": "Formation DCE",
    "formation.options.dce.description": "Documentation technique professionnelle",
    "formation.options.dce.skills": "Standards, nomenclature, dossiers",
    "formation.options.dce.level": "Débutant",
    "formation.options.dce.duration": "30 heures",

    "formation.options.presentielle_online.name": "Formation Présentielle & En ligne",
    "formation.options.presentielle_online.description": "Parcours complet multi-logiciels",
    "formation.options.presentielle_online.skills": "AutoCAD + Revit + 3ds Max",
    "formation.options.presentielle_online.level": "Tous niveaux",
    "formation.options.presentielle_online.duration": "120 heures",

    "formation.options.pack.name": "Pack Formations & Bibliothèque",
    "formation.options.pack.description": "Accès à plus de 200 heures de cours et ressources, documents techniques inclus",
    "formation.options.pack.skills": "Plus de 200 heures de formation + documents",
    "formation.options.pack.level": "Du niveau débutant au niveau avancé",
    "formation.options.pack.duration": "Accès permanent",

    // FormStep2 - Planning
    "planning.title": "Planning",
    "planning.subtitle": "Découvrez le parcours pédagogique détaillé de votre formation",
    "planning.duration": "Durée",
    "planning.modules": "Modules",
    "planning.objective": "Objectif",
    "planning.professional": "Formation professionnelle",
    "planning.atYourPace": "À votre rythme",
    "planning.progressive": "modules progressifs",
    "planning.detailed": "Programme détaillé",
    "planning.packageDetails": "Détails de la formation",
    "planning.durationUnit": "heures",

    // Planning modules - AutoCAD
    "planning.modules.autocad.0.name": "Introduction à AutoCAD",
    "planning.modules.autocad.0.content": "Interface, outils de base, premiers dessins",
    "planning.modules.autocad.1.name": "Dessin 2D avancé",
    "planning.modules.autocad.1.content": "Calques, blocs, annotations, cotations",
    "planning.modules.autocad.2.name": "Modélisation 3D",
    "planning.modules.autocad.2.content": "Volumes, surfaces, rendu basique",
    "planning.modules.autocad.3.name": "Projet pratique",
    "planning.modules.autocad.3.content": "Plan complet d'une villa moderne",

    // Planning modules - Revit
    "planning.modules.revit.0.name": "Introduction au BIM",
    "planning.modules.revit.0.content": "Concepts BIM, interface Revit, navigation",
    "planning.modules.revit.1.name": "Modélisation architecturale",
    "planning.modules.revit.1.content": "Murs, sols, toits, escaliers",
    "planning.modules.revit.2.name": "Documentation",
    "planning.modules.revit.2.content": "Plans, coupes, détails, nomenclatures",
    "planning.modules.revit.3.name": "Familles et rendu",
    "planning.modules.revit.3.content": "Création de familles, rendu photoréaliste",

    // Planning modules - 3ds Max
    "planning.modules.3dsmax.0.name": "Interface et modélisation",
    "planning.modules.3dsmax.0.content": "Primitives, modificateurs, modélisation poly",
    "planning.modules.3dsmax.1.name": "Matériaux et textures",
    "planning.modules.3dsmax.1.content": "Shader, UV mapping, textures réalistes",
    "planning.modules.3dsmax.2.name": "Éclairage et caméras",
    "planning.modules.3dsmax.2.content": "Lumières, caméras, composition",
    "planning.modules.3dsmax.3.name": "Rendu et post-production",
    "planning.modules.3dsmax.3.content": "V-Ray, Corona, retouches finales",

    // Planning modules - DCE
    "planning.modules.dce.0.name": "Standards de documentation",
    "planning.modules.dce.0.content": "Normes, formats, échelles",
    "planning.modules.dce.1.name": "Plans d'exécution",
    "planning.modules.dce.1.content": "Détails techniques, nomenclature",
    "planning.modules.dce.2.name": "Dossiers réglementaires",
    "planning.modules.dce.2.content": "Permis de construire, CCTP",

    // Planning modules - Présentiel & En ligne
    "planning.modules.presentielle_online.0.name": "AutoCAD Foundation",
    "planning.modules.presentielle_online.0.content": "Maîtrise complète du dessin 2D/3D",
    "planning.modules.presentielle_online.1.name": "Revit Architecture",
    "planning.modules.presentielle_online.1.content": "BIM et maquette numérique",
    "planning.modules.presentielle_online.2.name": "3ds Max Rendu",
    "planning.modules.presentielle_online.2.content": "Visualisation photoréaliste",
    "planning.modules.presentielle_online.3.name": "Projet de synthèse",
    "planning.modules.presentielle_online.3.content": "Villa complète de A à Z",

    // Planning modules - Pack
    "planning.modules.pack.0.name": "Module - Pack Complet",
    "planning.modules.pack.0.content": "Parcours complet multi-logiciels de A à Z",

    // FormStep3 - Informations
    "info.title": "Vos informations",
    "info.subtitle": "Dernière étape : vérifiez et confirmez vos informations",
    "info.fullName": "Nom & Prénom",
    "info.fullNamePlaceholder": "Entrez votre nom complet",
    "info.phone": "Numéro",
    "info.phonePlaceholder": "Entrez votre numéro de téléphone",
    "info.formation": "Formation",
    "info.notSelected": "Non sélectionnée",
    "info.email": "Email",
    "info.emailPlaceholder": "Entrez votre adresse email",
    "info.summary": "Récapitulatif de l'inscription",
    "info.fullNameLabel": "Nom complet",
    "info.phoneLabel": "Numéro de téléphone",
    "info.formationLabel": "Formation choisie",
    "info.emailLabel": "Adresse email",
    
    // Validation errors
    "error.nameRequired": "Le nom et prénom sont requis",
    "error.phoneRequired": "Le numéro est requis",
    "error.emailRequired": "L'email est requis",
    "error.emailInvalid": "Email invalide",
    "error.projectTypeRequired": "Veuillez sélectionner un type de projet",
    "error.cityRequired": "La ville est requise",
    "error.surfaceRequired": "La surface est requise",
    "error.floorsRequired": "Le nombre d'étages est requis",
    
    // FormStep1Project
    "project.type.title": "Type de projet",
    "project.type.subtitle": "Quel type de projet souhaitez-vous réaliser?",
    "project.type.apartment": "Appartement",
    "project.type.villa": "Villa",
    "project.type.house": "Maison",
    "project.type.store": "Magasin",
    "project.type.office": "Plateau Bureau",
    "project.surface": "Surface (m²)",
    "project.surfacePlaceholder": "Ex: 150",
    "project.city": "Ville",
    "project.cityPlaceholder": "Ex: Casablanca",
    "project.floors": "Nombre d'étages",
    "project.floorsPlaceholder": "Ex: 2",
    
    // FormStep2Project
    "project.technical.title": "Informations techniques",
    "project.technical.subtitle": "Ajoutez des détails complémentaires",
    "project.landRef": "Référence du terrain (Titre foncier)",
    "project.landRefPlaceholder": "Ex: TF-12345/67",
    "project.optional": "(Optionnel)",
    "project.remarks": "Remarques",
    "project.remarksPlaceholder": "Ajoutez toute information complémentaire utile pour votre projet...",
    
    // FormStep3Project
    "project.docs.title": "Documents & Images",
    "project.docs.subtitle": "Ajoutez des plans, esquisses ou photos du terrain (optionnel)",
    "project.docs.upload": "Cliquez pour ajouter des fichiers",
    "project.docs.formats": "PNG, JPG, PDF (max. 10MB)",
    "project.tasks": "Tâches personnalisées (optionnel)",
    "project.tasksPlaceholder": "Ajouter une tâche personnalisée",
    
    // Review Page
    "review.title": "Récapitulatif",
    "review.subtitle": "Vérifiez vos informations avant l'envoi",
    "review.inscriptionDetails": "Détails de l'inscription",
    "review.projectDetails": "Détails du Projet",
    "review.formation": "Formation",
    "review.phone": "Téléphone",
    "review.fullName": "Nom & Prénom",
    "review.email": "Email",
    "review.projectType": "Type de Projet",
    "review.surface": "Surface",
    "review.city": "Ville",
    "review.floors": "Nombre d'étages",
    "review.landRef": "Référence du terrain",
    "review.notSpecified": "Non spécifié",
    "review.remarks": "Remarques",
    "review.tasks": "Tâches sélectionnées",
    "review.documents": "Documents joints",
    "review.filesCount": "fichier(s)",
    "review.noFiles": "Aucun fichier joint (les documents sont conservés sur votre espace).",
    "review.uploading": "Upload en cours...",
    "review.sendWhatsApp": "Envoyer sur WhatsApp",
    "review.call": "Appeler",
    "review.sentTo": "Envoyé à:",
    
    // Success Page
    "success.title": "Demande Envoyée!",
    "success.message": "Votre demande de projet a été envoyée avec succès. Notre architecte vous contactera très bientôt.",
    "success.backHome": "Retour à l'accueil",
    
    // Toast messages
    "toast.prepared": "Message préparé!",
    "toast.preparedDesc": "WhatsApp va s'ouvrir avec votre demande.",
    "toast.error": "Erreur",
    // Languages
    "lang.fr": "Français",
    "lang.ar": "العربية",
    // helper for alignment classes depending on direction
    "lang.classAlign": ""
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.back": "رجوع",
    "lang.classAlign": "md:left-4 md:right-auto",
    
    // Hero
    "hero.badge": "هندسة التميز",
    "hero.title": "حوّل أحلامك\nإلى حقيقة",
    "hero.subtitle": "مشاريع معمارية فريدة، مصممة بشغف وخبرة لإنشاء مساحات تعكس شخصيتك",
    "hero.cta.project": "ابدأ مشروعي",
    "hero.cta.formation": "التسجيل في التدريبات",
    
    // Difference Section
    "difference.title": "ما يميزنا",
    "difference.projects.title": "مشاريع الهندسة المعمارية",
    "difference.projects.1": "خبرة في خدمة رؤيتك",
    "difference.projects.2": "عملية واضحة ومطمئنة",
    "difference.projects.3": "إتقان التحديات التقنية والتنظيمية",
    "difference.projects.4": "قيمة مضافة إبداعية ووظيفية",
    "difference.projects.desc": "تفويض مشروعك يعني الاستثمار في الطمأنينة. نحول أفكارك إلى مخططات دقيقة وجميلة، لنتيجة نهائية تفوق توقعاتك",
    "difference.formations.title": "تدريبات على البرمجيات",
    "difference.formations.1": "مدربون خبراء في الميدان",
    "difference.formations.2": "منهجية تعليمية عملية",
    "difference.formations.3": "منهج دراسي كامل",
    "difference.formations.4": "متابعة ما بعد التدريب",
    "difference.formations.desc": "نحن لا نعلمك فقط النقر، بل نعلمك التصميم بكفاءة أكبر، مع أخطاء أقل وتعاون أفضل.",
    
    // Team Section
    "team.title": "فريق مخصص لنجاحك",
    "team.p1": "AB Anas BENLECHGAR هو مكتب تصميم داخلي وتهيئة مهني متخصص في إنشاء مفاهيم مخصصة للمساحات المهنية.",
    "team.p2": "لدينا فريق موهوب من مهندسي الديكور والمهندسين. نحن شغوفون بالهندسة الداخلية ونؤمن بأهمية الجودة والإبداع والاحترافية.",
    "team.p3": "نلتزم بتقديم خدمة شخصية وشفافة وعالية الجودة. في AB Anas BENLECHGAR، نحيي أفكارك بإنشاء مساحات مهنية وظيفية وجمالية ودائمة.",
    "team.cta": "اكتشف ملفنا",
    
    // Office Section
    "office.title": "مكتب الدار البيضاء",
    "office.desc": "يقع مكتبنا في شارع غاندي بالدار البيضاء. من هذا الموقع، فريقنا من الخبراء والمتخصصين في الهندسة والتدريب متاح كل يوم لمرافقة مشاريعك، حل مشاكلك والمساهمة في تحسين نتائجك باستمرار",
    "office.floor": "الطابق السادس، مساحة رنيم",
    "office.street": "16 شارع الأسفوديل",
    "office.boulevard": "شارع غاندي - الدار البيضاء",
    "office.country": "المغرب",
    
    // CTA Section
    "cta.title": "مستعد للبدء؟",
    "cta.subtitle": "املأ استمارتنا في دقائق واحصل على رد سريع",
    "cta.submit": "أرسل طلبي",
    "cta.formations": "الوصول إلى التدريبات",
    
    // Footer
    "footer.rights": "© 2025 هندسة التميز. جميع الحقوق محفوظة.",
    "footer.contact": "اتصل:",
    "footer.contactAria": "الاتصال عبر واتساب",

    // Not Found
    "notfound.title": "٤٠٤",
    "notfound.message": "عذراً! الصفحة غير موجودة",
    "notfound.return": "العودة إلى الصفحة الرئيسية",
    
    // Portfolio Page
    "portfolio.interior": "الهندسة الداخلية",
    "portfolio.design.title": "تصميم داخلي مخصص",
    "portfolio.design.desc": "حوّل مساحاتك بتصاميم مبتكرة ومخصصة تعكس رؤيتك وأسلوبك الفريد.",
    "portfolio.folder.title": "المحفظة العامة",
    "portfolio.folder.desc": "اكتشف جميع إنجازاتنا ومشاريع الهندسة الداخلية",
    "portfolio.folder.link": "عرض المحفظة",
    "portfolio.ref.title": "المراجع",
    "portfolio.ref.desc": "شهاداتنا وإثباتاتنا ومراجعنا المهنية",
    "portfolio.ref.link": "عرض المراجع",
    "portfolio.about.title": "من نحن",
    "portfolio.about.p1": "AB Anas BENLECHGAR هو مكتب تصميم داخلي وتهيئة مهني متخصص في إنشاء مفاهيم مخصصة للمساحات المهنية والسكنية.",
    "portfolio.about.p2": "بشغفنا للهندسة الداخلية، نلتزم بتقديم حلول تصميم مبتكرة تجمع بين الجمال والوظيفية. يعتمد نهجنا على الجودة والإبداع والاحترافية وخدمة شخصية تتكيف مع الاحتياجات الفريدة لكل عميل.",
    "portfolio.services": "الخدمات",
    "portfolio.service.1": "تصاميم ثنائية وثلاثية الأبعاد",
    "portfolio.service.2": "مخططات السقف والكهرباء والنجارة",
    "portfolio.service.3": "مخططات البلاط والمطبخ والخزائن",
    "portfolio.service.4": "تغطية الأرضيات والتكسية",
    "portfolio.service.5": "CPS، قياسات TCE",
    "portfolio.service.6": "التخطيط ومحاضر الورشة",
    "portfolio.skills": "المهارات",
    "portfolio.contact.title": "اتصل بنا",
    "portfolio.contact.subtitle": "فريقنا مستعد للاستماع إليك لتحقيق مشاريعك",
    "portfolio.phone": "الهاتف",
    "portfolio.address": "العنوان",
    "portfolio.follow": "تابعنا",
    "portfolio.footer": "© 2025 AB Anas BENLECHGAR. جميع الحقوق محفوظة.",

    // Social
    "social.platform": "منصة AB",
    "social.whatsapp": "واتساب",
    "social.instagram": "إنستغرام",
    "social.youtube": "يوتيوب",
    "social.tiktok": "تيك توك",

    // Form Pages
    "form.back": "رجوع",
    "form.next": "التالي",
    "form.continue": "متابعة",
    "form.validate": "تأكيد التسجيل",
    "form.viewSummary": "عرض الملخص",
    
    // Step Labels
    "step.project": "المشروع",
    "step.details": "التفاصيل",
    "step.documents": "المستندات",
    "step.formations": "التدريبات",
    "step.planning": "البرنامج",
    "step.information": "المعلومات",
    
    // FormStep1 - Formations
    "formation.title": "اختر تدريبك",
    "formation.subtitle": "اختر تدريبًا لاكتشاف برنامجه التفصيلي والتسجيل",
    "formation.skills": "المهارات",
    "formation.level": "المستوى",
    "formation.duration": "المدة",

    // Formation options
    "formation.options.autocad.name": "AutoCAD",
    "formation.options.autocad.description": "إتقان الرسم الفني ثنائي/ثلاثي الأبعاد",
    "formation.options.autocad.skills": "مخططات، مقاطع، واجهات",
    "formation.options.autocad.level": "من المبتدئ إلى المتقدم",
    "formation.options.autocad.duration": "40 ساعة",

    "formation.options.revit.name": "Revit",
    "formation.options.revit.description": "BIM ونمذجة المعمارية",
    "formation.options.revit.skills": "نماذج رقمية، تنسيق",
    "formation.options.revit.level": "متوسط",
    "formation.options.revit.duration": "50 ساعة",

    "formation.options.3dsmax.name": "3ds Max",
    "formation.options.3dsmax.description": "تصيير ثلاثي الأبعاد احترافي",
    "formation.options.3dsmax.skills": "نمذجة، خامات، إضاءة",
    "formation.options.3dsmax.level": "من المتوسط إلى المتقدم",
    "formation.options.3dsmax.duration": "45 ساعة",

    "formation.options.dce.name": "دورة DCE",
    "formation.options.dce.description": "الوثائق التقنية المهنية",
    "formation.options.dce.skills": "المعايير، الجداول، الملفات",
    "formation.options.dce.level": "مبتدئ",
    "formation.options.dce.duration": "30 ساعة",

    "formation.options.presentielle_online.name": "دورات حضورية وعبر الإنترنت",
    "formation.options.presentielle_online.description": "مسار متكامل متعدد البرامج",
    "formation.options.presentielle_online.skills": "AutoCAD + Revit + 3ds Max",
    "formation.options.presentielle_online.level": "لكل المستويات",
    "formation.options.presentielle_online.duration": "120 ساعة",

    "formation.options.pack.name": "حزمة الدورات والمكتبة",
    "formation.options.pack.description": "أكثر من 200 ساعة تدريبية وملفات تقنية متاحة",
    "formation.options.pack.skills": "أكثر من 200 ساعة + ملفات تقنية",
    "formation.options.pack.level": "من المبتدئ إلى المتقدم",
    "formation.options.pack.duration": "دائمًا متاح",

    // FormStep2 - Planning
    "planning.title": "البرنامج",
    "planning.subtitle": "اكتشف المسار التعليمي التفصيلي لتدريبك",
    "planning.duration": "المدة",
    "planning.modules": "الوحدات",
    "planning.objective": "الهدف",
    "planning.professional": "تدريب مهني",
    "planning.atYourPace": "بوتيرتك الخاصة",
    "planning.progressive": "وحدات تدريجية",
    "planning.detailed": "البرنامج التفصيلي",
    "planning.packageDetails": "تفاصيل الحزمة",
    "planning.durationUnit": "ساعات",
    
    // FormStep3 - Informations
    "info.title": "معلوماتك",
    "info.subtitle": "الخطوة الأخيرة: تحقق من معلوماتك وأكدها",
    "info.fullName": "الاسم الكامل",
    "info.fullNamePlaceholder": "أدخل اسمك الكامل",
    "info.phone": "رقم الهاتف",
    "info.phonePlaceholder": "أدخل رقم هاتفك",
    "info.formation": "التدريب",
    "info.notSelected": "غير محدد",
    "info.email": "البريد الإلكتروني",
    "info.emailPlaceholder": "أدخل بريدك الإلكتروني",
    "info.summary": "ملخص التسجيل",
    "info.fullNameLabel": "الاسم الكامل",
    "info.phoneLabel": "رقم الهاتف",
    "info.formationLabel": "التدريب المختار",
    "info.emailLabel": "البريد الإلكتروني",
    
    // Validation errors
    "error.nameRequired": "الاسم مطلوب",
    "error.phoneRequired": "رقم الهاتف مطلوب",
    "error.emailRequired": "البريد الإلكتروني مطلوب",
    "error.emailInvalid": "بريد إلكتروني غير صالح",
    "error.projectTypeRequired": "يرجى اختيار نوع المشروع",
    "error.cityRequired": "المدينة مطلوبة",
    "error.surfaceRequired": "المساحة مطلوبة",
    "error.floorsRequired": "عدد الطوابق مطلوب",
    
    // FormStep1Project
    "project.type.title": "نوع المشروع",
    "project.type.subtitle": "ما نوع المشروع الذي تريد تحقيقه؟",
    "project.type.apartment": "شقة",
    "project.type.villa": "فيلا",
    "project.type.house": "منزل",
    "project.type.store": "متجر",
    "project.type.office": "مكتب",
    "project.surface": "المساحة (م²)",
    "project.surfacePlaceholder": "مثال: 150",
    "project.city": "المدينة",
    "project.cityPlaceholder": "مثال: الدار البيضاء",
    "project.floors": "عدد الطوابق",
    "project.floorsPlaceholder": "مثال: 2",
    
    // FormStep2Project
    "project.technical.title": "المعلومات التقنية",
    "project.technical.subtitle": "أضف تفاصيل إضافية",
    "project.landRef": "مرجع الأرض (السند العقاري)",
    "project.landRefPlaceholder": "مثال: TF-12345/67",
    "project.optional": "(اختياري)",
    "project.remarks": "ملاحظات",
    "project.remarksPlaceholder": "أضف أي معلومات إضافية مفيدة لمشروعك...",
    
    // FormStep3Project
    "project.docs.title": "المستندات والصور",
    "project.docs.subtitle": "أضف المخططات أو الرسومات أو صور الأرض (اختياري)",
    "project.docs.upload": "انقر لإضافة ملفات",
    "project.docs.formats": "PNG, JPG, PDF (الحد الأقصى 10MB)",
    "project.tasks": "مهام مخصصة (اختياري)",
    "project.tasksPlaceholder": "إضافة مهمة مخصصة",
    
    // Review Page
    "review.title": "الملخص",
    "review.subtitle": "تحقق من معلوماتك قبل الإرسال",
    "review.inscriptionDetails": "تفاصيل التسجيل",
    "review.projectDetails": "تفاصيل المشروع",
    "review.formation": "التدريب",
    "review.phone": "الهاتف",
    "review.fullName": "الاسم الكامل",
    "review.email": "البريد الإلكتروني",
    "review.projectType": "نوع المشروع",
    "review.surface": "المساحة",
    "review.city": "المدينة",
    "review.floors": "عدد الطوابق",
    "review.landRef": "مرجع الأرض",
    "review.notSpecified": "غير محدد",
    "review.remarks": "ملاحظات",
    "review.tasks": "المهام المحددة",
    "review.documents": "المستندات المرفقة",
    "review.filesCount": "ملف(ات)",
    "review.noFiles": "لا يوجد ملفات مرفقة (الوثائق محفوظة في حسابك).",
    "review.uploading": "جاري الرفع...",
    "review.sendWhatsApp": "إرسال عبر واتساب",
    "review.call": "اتصال",
    "review.sentTo": "أرسل إلى:",
    
    // Success Page
    "success.title": "تم إرسال الطلب!",
    "success.message": "تم إرسال طلب مشروعك بنجاح. سيتصل بك المهندس المعماري قريبًا جدًا.",
    "success.backHome": "العودة للرئيسية",
    
    // Toast messages
    "toast.prepared": "الرسالة جاهزة!",
    "toast.preparedDesc": "سيفتح واتساب مع طلبك.",
    "toast.error": "خطأ",
    // Languages
    "lang.fr": "فرنسية",
    "lang.ar": "العربية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app_language");
    return (saved === "ar" || saved === "fr") ? saved : "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["fr"]] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};