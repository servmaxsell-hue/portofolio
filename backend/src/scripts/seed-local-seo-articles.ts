import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Local SEO articles...');

    const articles = [
        {
            title: "Guide Ultime : Optimiser sa Fiche Google Business Profile en 2026",
            slug: "article-google-business-optimization",
            excerpt: "Le guide complet pour transformer votre fiche Google en aimant à clients. NAP, catégories, photos : tout ce qu'il faut savoir.",
            image: "https://images.unsplash.com/photo-1576400883215-051f1665a8c9?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["SEO Local", "Google Business Profile", "Visibilité"]),
            read_time: 12,
            published: true,
            published_at: new Date('2026-01-10'),
            content: `
<div
    style="font-size: 22px; line-height: 1.8; color: #1a1a2e; margin-bottom: 40px; font-weight: 500; text-align: justify;">
    Votre fiche Google Business Profile (anciennement Google My Business) est votre vitrine numérique la plus
    importante.
    Avant même de voir votre site web, 80% de vos clients locaux vous trouvent via Maps ou le "Pack Local" de Google.
    <br><br>
    En 2026, avoir une fiche ne suffit plus. Il faut qu'elle soit optimisée pour la conversion et l'algorithme. Voici le
    guide complet pour transformer votre fiche en aimant à clients.
</div>

<div
    style="background: #1a1a2e; padding: 45px; border-radius: 24px; color: white; margin-bottom: 60px; box-shadow: 0 25px 50px -12px rgba(26, 26, 46, 0.25);">
    <h3
        style="color: #e94560; margin-top: 0; margin-bottom: 30px; font-size: 26px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid #e94560; display: inline-block; padding-bottom: 10px;">
        Les piliers d'une fiche parfaite (Validation Vidéo Incluse) :</h3>
    <div style="display: grid; grid-template-columns: 1fr; gap: 25px; margin-top: 20px;">
        <div style="display: flex; align-items: start; gap: 20px;">
            <div
                style="background: rgba(233, 69, 96, 0.15); border: 1px solid #e94560; color: #e94560; width: 35px; height: 35px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold;">
                1</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>NAP Cohérent</strong> : Name, Address, Phone.
                La sainte trinité du SEO local.</p>
        </div>
        <div style="display: flex; align-items: start; gap: 20px;">
            <div
                style="background: rgba(233, 69, 96, 0.15); border: 1px solid #e94560; color: #e94560; width: 35px; height: 35px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold;">
                2</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>Catégories Stratégiques</strong> : Ne laissez
                pas Google deviner votre métier.</p>
        </div>
        <div style="display: flex; align-items: start; gap: 20px;">
            <div
                style="background: rgba(233, 69, 96, 0.15); border: 1px solid #e94560; color: #e94560; width: 35px; height: 35px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold;">
                3</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>Contenu Visuel</strong> : Des photos qui
                vendent votre expertise avant le premier contact.</p>
        </div>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">1. La Donnée "NAP" et la Cohérence</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Google déteste l'incohérence. Si votre entreprise s'appelle "Pizza Luigi" sur Google, mais "Luigi Pizza SAS" sur
        votre site et "Chez Luigi" sur Facebook, vous perdez des points.
    </p>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        Votre <strong>Nom, Adresse et Téléphone</strong> doivent être strictement identiques partout sur le web. C'est
        le signal de confiance numéro 1 pour l'algorithme local.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">2. Choisir les bonnes catégories</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Beaucoup d'entreprises se trompent ici. La <strong>catégorie principale</strong> a le plus de poids SEO.
        Choisissez celle qui décrit ce que vous <em>êtes</em>, pas ce que vous <em>avez</em>.
    </p>
    <div
        style="background: #f1f5f9; padding: 25px; border-radius: 15px; border-left: 8px solid #e94560; margin-top: 25px;">
        <p style="margin: 0; font-style: italic; color: #334155;">
            Exemple : Vous êtes une pizzeria qui livre ?<br>
            ❌ Restaurant<br>
            ✅ Pizzeria<br>
            Et en catégorie secondaire : "Livraison de pizza", "Restaurant italien".
        </p>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">2b. Zone de Service vs Adresse Physique</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        C'est l'erreur classique des consultants ou plombiers. Si vous recevez des clients chez vous, mettez votre
        <strong>adresse</strong>.
        Si vous allez chez eux, définissez une <strong>zone de service</strong> (SAB : Service Area Business).
    </p>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        <strong>Attention :</strong> Ne faites pas les deux sauf si c'est la réalité (ex: une pizzeria avec salle +
        livraison). Google est strict : c'est l'un ou l'autre si vous n'avez pas de signalétique extérieure.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">2c. Le Pouvoir Caché des "Attributs"</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        "Wi-Fi gratuit", "Terrasse", "Dirigé par des femmes", "LGBTQ+ friendly". Ces petits badges semblent anodins,
        mais ils sont cruciaux pour la <strong>recherche vocale</strong> et les filtres.
        Google croise ces données. Remplissez-les TOUS.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">3. La Description "Sémantique"</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Vous avez 750 caractères. Utilisez-les. Ne faites pas une liste de mots-clés, mais racontez votre histoire en
        incluant naturellement vos termes importants et votre zone géographique.
    </p>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        <strong>Astuce Pro :</strong> Structurez votre texte. Les 250 premiers caractères sont les plus lus. Mettez-y
        votre proposition de valeur unique (UVP) et votre ville principale.
    </p>
</div>

<div style="background: #f8fcf9; border-radius: 20px; padding: 40px; margin-bottom: 60px; border: 2px solid #e2f2e6;">
    <h4 style="margin-top: 0; color: #2d5a39; font-size: 24px;">📝 Modèle de Description (À copier-coller)</h4>
    <p
        style="font-size: 18px; color: #2d5a39; line-height: 1.7; font-family: monospace; background: rgba(255,255,255,0.5); padding: 20px; border-radius: 10px;">
        [Nom de l'entreprise] est votre expert en [Service Principal] à [Ville]. Depuis [Année], nous aidons [Client
        Type] à [Bénéfice Principal].<br><br>
        Nos services incluent :<br>
        - [Service 1]<br>
        - [Service 2]<br>
        - [Service 3]<br><br>
        Situés dans le quartier [Quartier], nous intervenons aussi à [Ville voisine 1] et [Ville voisine 2].<br>
        📞 Appelez-nous au [Téléphone] pour un devis gratuit.
    </p>
</div>

<div
    style="background: #fff5f5; border-left: 8px solid #fa5252; padding: 45px; border-radius: 24px; margin-bottom: 60px;">
    <h3 style="margin-top: 0; color: #c92a2a; font-size: 28px;">📸 L'importance critique des photos</h3>
    <p style="font-size: 19px; color: #4b1a1a; line-height: 1.8;">
        Les fiches avec photos reçoivent 42% de demandes d'itinéraire en plus. Ne mettez pas de photos "stock". Montrez
        votre devanture, votre équipe, vos produits réels.
        <br><br>
        <strong>Le secret ?</strong> Géotaguez vos photos si possible, et nommez les fichiers avec des mots-clés (ex:
        <code>pizzeria-four-bois-lyon.jpg</code>) avant de les uploader. Google "lit" les images.
    </p>
</div>

<div
    style="background: #1a1a2e; padding: 60px; border-radius: 40px; text-align: center; border: 4px solid #e94560; position: relative; overflow: hidden; color: white;">
    <h2 style="margin-top: 0; font-size: 42px; color: #ffffff; margin-bottom: 25px;">Besoin d'un Audit Gratuit ?</h2>
    <p style="font-size: 22px; color: #cbd5e1; max-width: 800px; margin: 0 auto 45px auto;">
        Je peux analyser votre fiche Google et vous dire exactement pourquoi vos concurrents sont devant vous.
    </p>
    <a href="/contact"
        style="background: #e94560; color: white; padding: 22px 50px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 20px; box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4); border: 2px solid #e94560;">
        Demander mon Audit SEO Local
    </a>
</div>
`
        },
        {
            title: "Les 7 Erreurs Fatales qui Tuent Votre Référencement Local",
            slug: "article-local-seo-mistakes",
            excerpt: "Attention à ces erreurs courantes qui peuvent faire suspendre votre fiche ou ruiner votre classement. La liste noire à éviter.",
            image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=2029&auto=format&fit=crop",
            tags: JSON.stringify(["SEO Local", "Erreurs", "Google Maps"]),
            read_time: 8,
            published: true,
            published_at: new Date('2026-01-12'),
            content: `
<div
    style="font-size: 22px; line-height: 1.8; color: #1a1a2e; margin-bottom: 40px; font-weight: 500; text-align: justify;">
    Le référencement local est impitoyable. Il suffit parfois d'une seule erreur technique ou d'une mauvaise pratique
    pour voir sa fiche disparaître des résultats Google, ou pire, être suspendue.
    <br><br>
    J'ai audité des centaines de fiches. Voici les 7 erreurs "fatales" que je vois encore trop souvent et qui sabotent
    votre croissance.
</div>

<div
    style="background: #fff5f5; padding: 45px; border-radius: 24px; border-left: 8px solid #c92a2a; margin-bottom: 60px; box-shadow: 0 25px 50px -12px rgba(201, 42, 42, 0.15);">
    <h3
        style="color: #c92a2a; margin-top: 0; margin-bottom: 30px; font-size: 28px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">
        ⛔ La "Blacklist" des choses à ne jamais faire</h3>
    <p style="font-size: 18px; color: #4b1a1a;">
        Si vous faites l'une de ces choses, <strong>arrêtez immédiatement</strong>.
    </p>
</div>

<div style="display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px;">

    <!-- Erreur 1 -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 30px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">1. Le "Keyword Stuffing" dans le Nom</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Appeler votre fiche "Plombier Paris Pas Cher Urgence" au lieu de "Plomberie
            Martin".<br>
            <strong>La conséquence :</strong> C'est la violation #1 des guidelines Google. Votre fiche sera suspendue,
            tôt ou tard. Gardez votre nom commercial réel, point final.
        </p>
    </div>

    <!-- Erreur 2 -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 30px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">2. Acheter ou solliciter de faux avis</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Payer pour des avis 5 étoiles ou demander à tous vos cousins de laisser un avis.
            <br>
            <strong>La conséquence :</strong> L'algorithme de détection de spam de Google est terrifiant d'efficacité en
            2026. Non seulement les avis seront supprimés, mais votre fiche perdra toute autorité.
        </p>
    </div>

    <!-- Erreur 3 -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 30px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">3. Créer des fiches doublons</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Créer une nouvelle fiche parce que vous avez perdu le mot clé de la première.
            <br>
            <strong>La conséquence :</strong> Google ne sait plus quelle fiche classer. Les deux fiches se
            "cannibalisent"
            et finissent dans les abîmes du classement. Récupérez toujours la propriété de votre fiche existante.
        </p>
    </div>

    <!-- Erreur 4 -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 30px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">4. Ignorer les avis négatifs</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Faire l'autruche face à un commentaire 1 étoile.<br>
            <strong>La conséquence :</strong> Les prospects lisent d'abord les avis négatifs. Une réponse calme,
            professionnelle et orientée solution peut transformer un "hater" en atout marketing. Le silence, lui,
            valide la critique.
        </p>
    </div>

    <!-- Erreur 5 -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 30px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">5. Les Horaires "Fantômes" (Surtout les jours fériés)</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Ne pas mettre à jour ses horaires exceptionnels pour le 15 août ou Noël.
            <br>
            <strong>La conséquence :</strong> Un client se déplace, trouve porte close, et vous laisse un avis incendiaire "Menteurs, c'est fermé !". Google envoie des emails pour vous rappeler de confirmer vos horaires festifs : FAITES-LE.
        </p>
    </div>

    <!-- Erreur 6 -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 30px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">6. Laisser la FAQ à l'abandon</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Ne jamais regarder la section "Questions et Réponses".
            <br>
            <strong>La conséquence :</strong> N'importe qui peut répondre aux questions des internautes... souvent de travers.
            <em>Exemple : "Sont-ils ouverts le lundi ?" -> Réponse d'un internaute : "Je crois pas".</em>
            Prenez le contrôle de cette section.
        </p>
    </div>

    <!-- Erreur 7 -->
    <div style="border-bottom: 0px solid #e2e8f0; padding-bottom: 10px;">
        <h4 style="color: #e94560; font-size: 24px; margin-bottom: 15px;">7. Le piège du "Set and Forget"</h4>
        <p style="font-size: 18px; color: #4a5568; line-height: 1.7;">
            <strong>L'erreur :</strong> Créer sa fiche en 2022 et ne plus y toucher.
            <br>
            <strong>La conséquence :</strong> Google privilégie la fraîcheur (Freshness algorithm). Une fiche morte descend lentement mais sûrement. Ajoutez des photos, des posts, répondez aux avis.
        </p>
    </div>

</div>

<div style="background: #f8fcf9; border-radius: 20px; padding: 40px; margin-bottom: 60px; border: 2px solid #e2f2e6;">
    <h4 style="margin-top: 0; color: #2d5a39; font-size: 24px;">💡 Le conseil d'expert</h4>
    <p style="font-size: 19px; color: #2d5a39; line-height: 1.7;">
        Le SEO Local n'est pas un sprint, c'est un marathon. Les astuces "black hat" pour tromper Google peuvent
        fonctionner 2 semaines, mais elles détruiront votre business pour 2 ans. Misez sur la qualité, la récence des
        avis et la précision des informations.
    </p>
</div>

<div
    style="background: #1a1a2e; padding: 60px; border-radius: 40px; text-align: center; border: 4px solid #e94560; position: relative; overflow: hidden; color: white;">
    <h2 style="margin-top: 0; font-size: 42px; color: #ffffff; margin-bottom: 25px;">Votre fiche respecte-t-elle les
        règles ?</h2>
    <p style="font-size: 22px; color: #cbd5e1; max-width: 800px; margin: 0 auto 45px auto;">
        Ne prenez pas le risque d'une suspension. Faisons un check-up complet.
    </p>
    <a href="/contact"
        style="background: #e94560; color: white; padding: 22px 50px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 20px; box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4); border: 2px solid #e94560;">
        Vérifier ma conformité
    </a>
</div>
`
        },
        {
            title: "Top 10 des Actions pour Dominer le Pack Local Google",
            slug: "article-local-seo-strategies",
            excerpt: "Ne vous contentez pas d'exister. Dominez votre zone avec ces 10 stratégies avancées (Posts, Q&A, Produits, etc.).",
            image: "https://images.unsplash.com/photo-1557838433-28108cdb658d?q=80&w=2072&auto=format&fit=crop",
            tags: JSON.stringify(["SEO Local", "Stratégie", "Croissance"]),
            read_time: 15,
            published: true,
            published_at: new Date('2026-01-15'),
            content: `
<div
    style="font-size: 22px; line-height: 1.8; color: #1a1a2e; margin-bottom: 40px; font-weight: 500; text-align: justify;">
    Avoir une fiche Google, c'est bien. Être dans le "Pack Local" (les 3 premiers résultats sur la carte), c'est mieux.
    Mais <strong>dominer</strong> votre zone de chalandise demande une stratégie active.
    <br><br>
    Google Business Profile n'est pas un annuaire statique, c'est un réseau social. Voici les 10 leviers que j'active
    pour mes clients pour écraser la concurrence.
</div>

<div
    style="background: #1a1a2e; padding: 45px; border-radius: 24px; color: white; margin-bottom: 60px; box-shadow: 0 25px 50px -12px rgba(26, 26, 46, 0.25);">
    <h3
        style="color: #e94560; margin-top: 0; margin-bottom: 30px; font-size: 26px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid #e94560; display: inline-block; padding-bottom: 10px;">
        🚀 Le Top 5 des Actions à Impact Immédiat</h3>
    <div style="display: grid; grid-template-columns: 1fr; gap: 25px; margin-top: 20px;">
        <div style="display: flex; align-items: center; gap: 20px;">
            <div
                style="background: #e94560; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold; font-size: 18px;">
                1</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>Google Posts Hebdomadaires</strong> :
                Signalez à Google que vous êtes actif.</p>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
            <div
                style="background: #e94560; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold; font-size: 18px;">
                2</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>Réponse aux Avis < 24h</strong> : Le taux de
                réponse est un facteur de ranking.</p>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
            <div
                style="background: #e94560; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold; font-size: 18px;">
                3</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>Section Produits/Services</strong> :
                Remplissez
                tout. Google lit ces textes.</p>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
            <div
                style="background: #e94560; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold; font-size: 18px;">
                4</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>FAQ Proactive</strong> : Posez vos propres
                questions (Q&A) et répondez-y.</p>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
            <div
                style="background: #e94560; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-weight: bold; font-size: 18px;">
                5</div>
            <p style="margin: 0; color: #e2e8f0; font-size: 17px;"><strong>Chat / Messages</strong> : Activez-le. Les
                clients veulent de l'instantané.</p>
        </div>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">La Stratégie des "Posts" (Le grand oublié)</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Beaucoup d'entreprises ignorent cette fonctionnalité. Un "Google Post" apparaît directement dans les résultats
        de
        recherche.
    </p>
    <ul style="margin-top: 20px; list-style: none; padding: 0;">
        <li style="margin-bottom: 15px; font-size: 18px; color: #4a5568;">✅ <strong>Offres</strong> : " -20% sur les
            burgers ce midi"</li>
        <li style="margin-bottom: 15px; font-size: 18px; color: #4a5568;">✅ <strong>Nouveautés</strong> : "Arrivée de
            la nouvelle collection hiver"</li>
        <li style="margin-bottom: 15px; font-size: 18px; color: #4a5568;">✅ <strong>Événements</strong> : "Portes
            ouvertes ce samedi"</li>
    </ul>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        Postez <strong>une fois par semaine</strong>. Cela envoie un signal fort de "fraîcheur" à l'algorithme.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">Le Calendrier de Contenu "Rotation 4 Semaines"</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Ne cherchez pas l'inspiration chaque lundi. Suivez ce cycle infini :
    </p>
    <div style="background: white; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; margin-top: 20px;">
        <ul style="margin: 0; list-style: none; padding: 0;">
            <li style="margin-bottom: 15px; font-size: 18px; color: #4a5568;">📅 <strong>Semaine 1 : Offre Commerciale</strong> (Promo, Bundle, Solde)</li>
            <li style="margin-bottom: 15px; font-size: 18px; color: #4a5568;">🤝 <strong>Semaine 2 : Preuve Sociale</strong> (Partage d'un avis client + photo du projet)</li>
            <li style="margin-bottom: 15px; font-size: 18px; color: #4a5568;">💡 <strong>Semaine 3 : Éducation</strong> (Réponse à une question fréquente / Astuce)</li>
            <li style="margin-bottom: 0; font-size: 18px; color: #4a5568;">👥 <strong>Semaine 4 : Culture / Équipe</strong> (Photo de l'équipe, Anniversaire, Coulisses)</li>
        </ul>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">Framework de Réponse aux Avis</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Arrêtez de répondre "Merci" ou d'ignorer les critiques. Voici mes scripts :
    </p>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
        <div style="background: #f0fdf4; padding: 20px; border-radius: 15px; border: 1px solid #bbf7d0;">
            <h4 style="margin: 0 0 10px 0; color: #166534;">🌟 Pour un avis positif</h4>
            <p style="font-size: 16px; color: #14532d; font-style: italic;">
                "Merci [Prénom] ! Ravi que [Service spécifique mentionné] vous ait plu. Toute l'équipe [Nom entreprise] est heureuse de vous avoir aidé à [Bénéfice]. À très vite !"
            </p>
        </div>
        <div style="background: #fef2f2; padding: 20px; border-radius: 15px; border: 1px solid #fecaca;">
            <h4 style="margin: 0 0 10px 0; color: #991b1b;">⚠️ Pour un avis négatif</h4>
            <p style="font-size: 16px; color: #7f1d1d; font-style: italic;">
                "Bonjour [Prénom], merci de ce retour. Nous sommes navrés que votre expérience n'ait pas été à la hauteur. Ce n'est pas nos standards habituels. Pouvez-vous nous contacter au [Tel] pour qu'on trouve une solution ?"
            </p>
        </div>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">Scripts de Messagerie (Chat)</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Le chat Google est puissant mais exige de la rapidité. Configurez ce message de bienvenue automatique :
    </p>
    <div style="background: #eff6ff; padding: 20px; border-radius: 10px; border-left: 5px solid #3b82f6; margin-top: 15px;">
        <p style="margin: 0; color: #1e3a8a; font-family: monospace;">
            "Bonjour ! Merci de nous contacter. Nous avons bien reçu votre message. En quoi pouvons-nous vous aider aujourd'hui ? (Devis, Question, RDV ?)"
        </p>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">Hackez la section Q&A</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Saviez-vous que n'importe qui peut poser une question sur votre fiche ? Y compris vous-même !
    </p>
    <div
        style="background: #f1f5f9; padding: 25px; border-radius: 15px; border-left: 8px solid #e94560; margin-top: 25px;">
        <p style="margin: 0; font-style: italic; color: #334155;">
            <strong>Stratégie :</strong> Listez les 10 questions qu'on vous pose tout le temps au téléphone ("Avez-vous
            un parking ?", "Acceptez-vous les tickets resto ?"). Posez-les avec votre compte perso, et répondez avec le
            compte pro. C'est 100% légal et c'est excellent pour la sémantique.
        </p>
    </div>
</div>


<div
    style="background: #1a1a2e; padding: 60px; border-radius: 40px; text-align: center; border: 4px solid #e94560; position: relative; overflow: hidden; color: white;">
    <h2 style="margin-top: 0; font-size: 42px; color: #ffffff; margin-bottom: 25px;">Prêt à conquérir votre ville ?</h2>
    <p style="font-size: 22px; color: #cbd5e1; max-width: 800px; margin: 0 auto 45px auto;">
        Le SEO Local est la source de trafic la plus rentable qui soit. Si vous voulez mettre en place ces stratégies,
        je
        peux vous accompagner.
    </p>
    <a href="/contact"
        style="background: #e94560; color: white; padding: 22px 50px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 20px; box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4); border: 2px solid #e94560;">
        Booster ma visibilité locale
    </a>
</div>
`
        }
    ];

    console.log(`Starting to seed ${articles.length} Local SEO articles...`);

    for (const data of articles) {
        const article = await prisma.article.upsert({
            where: { slug: data.slug },
            update: data,
            create: data,
        });
        console.log(`✓ Seeded: ${article.title}`);
    }

    console.log('✅ Local SEO articles seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
