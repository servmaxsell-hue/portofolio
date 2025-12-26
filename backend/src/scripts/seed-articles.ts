import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding articles...');

    const articles = [
        {
            title: "Pourquoi n8n est le meilleur outil d'automatisation en 2025",
            slug: "pourquoi-n8n-meilleur-outil-automatisation-2025",
            excerpt: "Découvrez pourquoi n8n surpasse Zapier et Make pour les entreprises soucieuses de leur sécurité et de leur budget.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["Automation", "n8n", "Productivité"]),
            read_time: 5,
            published: true,
            published_at: new Date(),
            content: `
                <p>L'automatisation est devenue le nerf de la guerre pour les entreprises modernes. Si Zapier a longtemps dominé le marché, une solution open-source gagne du terrain à une vitesse fulgurante : <strong>n8n</strong>.</p>
                
                <h2>1. La puissance du "Node-based"</h2>
                <p>Contrairement à une liste linéaire d'actions, n8n vous permet de visualiser vos flux de travail comme un véritable diagramme. Vous pouvez créer des boucles, des conditions complexes et fusionner des données de multiples sources avec une aisance déconcertante.</p>

                <h2>2. Auto-hébergement = Sécurité & Économies</h2>
                <p>C'est l'argument massue. Vous pouvez héberger n8n sur vos propres serveurs. Résultat ?</p>
                <ul>
                    <li>Vos données ne quittent jamais votre infrastructure (GDPR friendly).</li>
                    <li>Vous ne payez pas à l'exécution (pas de facture surprise si un workflow s'emballe).</li>
                </ul>

                <h2>3. Une communauté incroyable</h2>
                <p>Avec des milliers de templates disponibles gratuitement, vous ne partez jamais de zéro. Que ce soit pour synchroniser votre CRM ou automatiser vos posts LinkedIn, quelqu'un l'a probablement déjà fait.</p>

                <h2>Conclusion</h2>
                <p>Si vous cherchez à passer au niveau supérieur en automatisation sans vous ruiner, n8n est le choix évident pour 2025.</p>
            `
        },
        {
            title: "5 Techniques SEO Sous-Cotées pour Exploser votre Trafic",
            slug: "5-techniques-seo-sous-cotees",
            excerpt: "Oubliez les mots-clés basiques. Voici les vraies stratégies qui font la différence aujourd'hui.",
            image: "https://images.unsplash.com/photo-1571721795195-a2ca2d337096?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["SEO", "Marketing", "Google"]),
            read_time: 7,
            published: true,
            published_at: new Date(),
            content: `
                <p>Tout le monde sait qu'il faut mettre des mots-clés dans ses titres. Mais en 2025, cela ne suffit plus. Google est devenu plus intelligent, et vous devez l'être aussi.</p>

                <h2>1. Le Topic Cluster</h2>
                <p>Ne créez pas juste un article isolé. Créez une "page pilier" massive sur un sujet, et liez-la à 10 articles satellites plus spécifiques. Google adore cette structure qui démontre votre expertise topique.</p>

                <h2>2. L'optimisation pour le "People Also Ask"</h2>
                <p>Regardez les questions que Google affiche dans ses résultats. Répondez-y directement et succinctement dans vos articles. C'est le moyen le plus rapide d'apparaître en position zéro.</p>

                <h2>3. Mettez à jour votre vieux contenu</h2>
                <p>Un article de 2022 perd de la valeur chaque jour. Rafraichissez vos anciens posts avec de nouvelles données, de nouvelles images et une date récente. Le "Content Refresh" est souvent plus rentable que la création de nouveau contenu.</p>

                <h2>Conclusion</h2>
                <p>Le SEO n'est pas mort, il a juste évolué. Appliquez ces méthodes et regardez votre courbe Analytics grimper.</p>
            `
        },
        {
            title: "Pourquoi votre Site Web ne Convertit Pas (et comment y remédier)",
            slug: "pourquoi-votre-site-ne-convertit-pas",
            excerpt: "Vous avez du trafic mais pas de clients ? Le problème vient probablement de votre UX/UI.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["UX/UI", "Conversion", "Web Design"]),
            read_time: 6,
            published: true,
            published_at: new Date(),
            content: `
                <p>C'est la frustration numéro 1 des entrepreneurs : payer pour des ads, voir les gens arriver sur le site... et repartir sans rien faire.</p>

                <h2>1. Votre proposition de valeur est floue</h2>
                <p>Si je ne comprends pas ce que vous vendez en 3 secondes, je pars. Votre "Hero Section" doit dire clairement : <strong>Qui vous aidez + Comment + Le résultat.</strong></p>

                <h2>2. Trop d'appels à l'action (CTA)</h2>
                <p>"Inscrivez-vous", "En savoir plus", "Contactez-nous"... Stop ! Donnez un seul objectif clair par page. Le cerveau humain n'aime pas choisir, il aime être guidé.</p>

                <h2>3. La vitesse de chargement</h2>
                <p>Chaque seconde de chargement supplémentaire coûte 7% de conversion. Optimisez vos images, utilisez du cache, et passez à un framework moderne comme Next.js.</p>

                <h2>L'audit rapide</h2>
                <p>Ouvrez votre site sur mobile. Essayez de nous contacter. Si ça vous prend plus de 30 secondes ou 3 clics, vous perdez de l'argent.</p>
            `
        },
        {
            title: "Make vs n8n : Le Comparatif Ultime pour Choisir Son Outil",
            slug: "make-vs-n8n-comparatif-ultime",
            excerpt: "Faut-il choisir la simplicité de Make ou la puissance de n8n ? Analyse détaillée.",
            image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["Automation", "NoCode", "Comparatif"]),
            read_time: 8,
            published: true,
            published_at: new Date(),
            content: `
                <p>Le duel des titans de l'automatisation. D'un côté Make (ex-Integromat), le favori visuel. De l'autre n8n, le challenger technique.</p>

                <h2>Make : La simplicité avant tout</h2>
                <ul>
                    <li><strong>Pour qui ?</strong> Les équipes marketing, les solopreneurs, ceux qui ne veulent pas toucher une ligne de code.</li>
                    <li><strong>Avantages :</strong> Interface ultra intuitive, énormément d'intégrations natives.</li>
                    <li><strong>Inconvénients :</strong> Peut devenir cher très vite, et certaines logiques complexes sont dures à implémenter.</li>
                </ul>

                <h2>n8n : La liberté totale</h2>
                <ul>
                    <li><strong>Pour qui ?</strong> Les développeurs, les agences d'automatisation, les CTOs.</li>
                    <li><strong>Avantages :</strong> Auto-hébergeable, gratuit si self-hosted, manipulation de données (JSON) infiniment plus puissante.</li>
                    <li><strong>Inconvénients :</strong> Courbe d'apprentissage plus raide.</li>
                </ul>

                <h2>Verdict</h2>
                <p>Commencez avec Make pour valider vos idées. Passez sur n8n quand vous avez besoin de scalabilité et de contrôle.</p>
            `
        },
        {
            title: "Google Ads vs Facebook Ads : Où Investir votre Budget ?",
            slug: "google-ads-vs-facebook-ads",
            excerpt: "Intention vs Attention. Comprendre la différence fondamentale pour ne pas gaspiller votre budget pub.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
            tags: JSON.stringify(["SEA", "Publicité", "Marketing"]),
            read_time: 5,
            published: true,
            published_at: new Date(),
            content: `
                <p>C'est la question à 1 million d'euros. La réponse dépend entièrement de votre produit.</p>

                <h2>Google Ads : L'Intention d'achat</h2>
                <p>Quand quelqu'un tape "Plombier urgence Paris" sur Google, il a sa carte bleue en main. Google Ads capture une <strong>demande existante</strong>.</p>
                <p><em>Idéal pour : Services, e-commerce spécifique, dépannage.</em></p>

                <h2>Facebook/Instagram Ads : L'Attention et la Découverte</h2>
                <p>Personne ne va sur Facebook pour acheter un gadget. Mais si vous montrez une vidéo incroyable de ce gadget, vous créez le désir. Facebook Ads crée une <strong>demande nouvelle</strong>.</p>
                <p><em>Idéal pour : Mode, Gadgets, Innovation, Coaching.</em></p>

                <h2>Conclusion</h2>
                <p>Ne mettez pas tous vos œufs dans le même panier, mais commencez là où se trouve la psychologie de votre client idéal.</p>
            `
        },
        {
            title: "Comment Automatiser sa Prospection LinkedIn sans être banni",
            slug: "automatiser-prospection-linkedin-sans-ban",
            excerpt: "Générez des leads en dormant, mais attention aux règles de LinkedIn. Voici comment rester safe.",
            image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["LinkedIn", "Automation", "Sales"]),
            read_time: 6,
            published: true,
            published_at: new Date(),
            content: `
                <p>LinkedIn est une mine d'or B2B. Mais automatiser n'importe comment peut vous coûter votre compte. Voici les règles de survie.</p>

                <h2>1. Imitez le comportement humain</h2>
                <p>Un humain ne visite pas 500 profils en 3 minutes à 3h du matin. Utilisez des outils qui respectent des délais aléatoires et des "heures de bureau".</p>

                <h2>2. Le Cloud vs Chrome Extension</h2>
                <p>Privilégiez toujours les outils basés sur le Cloud (Waalaxy, lemlist, etc.) plutôt que les extensions Chrome. Ils sont beaucoup plus difficiles à détecter par l'algorithme de LinkedIn.</p>

                <h2>3. La qualité avant la quantité</h2>
                <p>N'envoyez pas "Bonjour [Prénom], j'ai vu votre profil...". C'est grillé. Segmentez vos listes ultra-finements (par exemple : "Directeurs Marketing à Lyon qui ont posté sur le SEO cette semaine") et personnalisez vraiment.</p>

                <h2>Conclusion</h2>
                <p>L'automatisation doit servir à créer la relation, pas à spammer. Soyez pertinent, soyez humain.</p>
            `
        }
    ];

    console.log(`Start seeding ${articles.length} articles...`);

    for (const data of articles) {
        const article = await prisma.article.upsert({
            where: { slug: data.slug },
            update: data,
            create: data,
        });
        console.log(`Seeded article: ${article.title}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
