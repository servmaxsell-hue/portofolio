import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding GBP Suspension articles...');

    const articles = [
        {
            title: "Urgence : Ma Fiche Google est Suspendue dès la Création",
            slug: "article-gbp-suspension-creation",
            excerpt: "Pourquoi Google a flagué votre fiche immédiatement ? Adresses interdites, secteurs à risque et comment monter votre dossier de défense.",
            image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2070&auto=format&fit=crop",
            tags: JSON.stringify(["Google Business Profile", "Suspension", "Urgence"]),
            read_time: 10,
            published: true,
            published_at: new Date('2026-01-20'),
            content: `
<div
    style="font-size: 22px; line-height: 1.8; color: #1a1a2e; margin-bottom: 40px; font-weight: 500; text-align: justify;">
    C'est le cauchemar de tout entrepreneur : vous venez de créer votre fiche Google Business Profile (GBP), vous avez
    soigneusement rempli vos horaires, ajouté de belles photos... et BOUM.
    <br><br>
    <span style="background: #fff5f5; color: #c92a2a; padding: 2px 8px; border-radius: 4px; font-weight: bold;">"Votre
        fiche a été suspendue pour activité suspecte."</span>
    <br><br>
    Pas de panique. C'est frustrant, c'est injuste, mais c'est résoluble. En 2026, Google a serré la vis au maximum.
    Voici pourquoi vous avez été suspendu <strong>immédiatement</strong> et comment vous en sortir.
</div>

<div
    style="background: #1a1a2e; padding: 45px; border-radius: 24px; color: white; margin-bottom: 60px; box-shadow: 0 25px 50px -12px rgba(26, 26, 46, 0.25);">
    <h3
        style="color: #e94560; margin-top: 0; margin-bottom: 30px; font-size: 26px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid #e94560; display: inline-block; padding-bottom: 10px;">
        🔍 Pourquoi Google vous a-t-il flagué ?</h3>
    <p style="color: #e2e8f0; font-size: 18px; margin-bottom: 20px;">
        Ce n'est pas un humain qui vous a suspendu. C'est un algorithme. Et cet algorithme a des "triggers" (déclencheurs)
        très précis. Si vous cochez l'une de ces cases, vous êtes automatiquement "soft suspended" (fiche non publiée) ou
        "hard suspended" (fiche supprimée).
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">1. L'Adresse "Interdite" (Le coupable n°1)</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        C'est la cause de 60% des suspensions à la création. Google Maps a une base de données de toutes les adresses de
        coworking, de boîtes postales (PO Box) et de centres d'affaires.
    </p>
    <div
        style="background: #fff5f5; border-left: 8px solid #c92a2a; padding: 25px; border-radius: 10px; margin-top: 25px;">
        <h4 style="margin: 0 0 10px 0; color: #c92a2a;">🚫 INTERDIT :</h4>
        <ul style="margin: 0; padding-left: 20px; color: #7f1d1d;">
            <li style="margin-bottom: 5px;">Boîte postale (La Poste, UPS Store...)</li>
            <li style="margin-bottom: 5px;">Bureau virtuel sans présence physique</li>
            <li style="margin-bottom: 5px;">Espace de coworking (Sauf si vous avez un bureau privatif FERMÉ avec votre ENSEIGNE sur la porte et du personnel aux heures d'ouverture)</li>
        </ul>
    </div>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 20px;">
        <strong>La solution :</strong> Si vous travaillez de chez vous, mettez votre adresse personnelle MAIS cachez-la
        en sélectionnant <em>"Je fournis des biens et services à mes clients"</em> (Zone de chalandise) et en décochant
        l'affichage de l'adresse. C'est la seule méthode conforme pour les "Service Area Businesses" (SAB).
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">2. Le Nom "Spammy" (Keyword Stuffing)</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Vous avez appelé votre fiche expliciement : <em>"Plombier Lyon Urgence Pas Cher"</em> alors que votre KBIS dit
        <em>"SARL Martin"</em> ?
    </p>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        L'IA de Google compare le nom de votre fiche avec :
    </p>
    <ul style="font-size: 18px; color: #4a5568; margin-top: 15px;">
        <li>Votre site web</li>
        <li>La base SIRENE (en France)</li>
        <li>Vos réseaux sociaux</li>
        <li>La photo de votre enseigne (via Street View)</li>
    </ul>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        S'il y a une incohérence, suspension immédiate pour "Contenu trompeur". Remettez votre vrai nom juridique ou
        commercial.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">3. Les Catégories "High Risk"</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Certaines industries sont truffées de spammeurs. Si vous êtes dans l'une de ces catégories, vous êtes sous
        surveillance renforcée dès la création :
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold;">🔑 Serruriers</div>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold;">🚰 Plombiers</div>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold;">🧹 Nettoyage</div>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold;">🚪 Réparation Garage</div>
    </div>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 20px;">
        Pour ces métiers, la <strong>vidéo de vérification</strong> est quasi-systématique. Préparez-vous à filmer votre
        camion floqué, vos outils et votre licence pro.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">4. Le Numéro de Téléphone "Recyclé"</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Avez-vous pris un numéro VoIP pas cher (Skype, Aircall...) ? Il est possible que ce numéro ait appartenu à un
        spammeur avant vous. Si Google a "blacklisté" ce numéro, votre nouvelle fiche hérite de la pénalité.
    </p>
</div>

<div style="background: #f8fcf9; border-radius: 20px; padding: 40px; margin-bottom: 60px; border: 2px solid #e2f2e6;">
    <h4 style="margin-top: 0; color: #2d5a39; font-size: 24px;">🔧 Le Plan d'Action pour Rétablir la fiche</h4>
    <p style="font-size: 18px; color: #2d5a39; line-height: 1.7;">
        N'envoyez pas de demande de rétablissement tout de suite ! Vous n'avez souvent qu'une seule chance.
    </p>
    <ol style="margin-top: 20px; font-size: 18px; color: #2d5a39;">
        <li style="margin-bottom: 10px;"><strong>Corrigez d'abord :</strong> Nom ultra-clean, adresse conforme, site web fonctionnel.</li>
        <li style="margin-bottom: 10px;"><strong>Rassemblez les preuves :</strong> KBIS (moins de 3 mois), Facture d'électricité au nom de l'entreprise (ou internet), Photo de la devanture ou du véhicule.</li>
        <li style="margin-bottom: 10px;"><strong>Remplissez le formulaire :</strong> Soyez factuel. "Voici mon KBIS prouvant mon existence légale à cette adresse."</li>
    </ol>
    <a href="https://support.google.com/business/troubleshooter/2690129" target="_blank" style="display: inline-block; background: #2d5a39; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 15px; font-weight: bold;">Lien Officiel Reinstatement Tool</a>
</div>

<div
    style="background: #1a1a2e; padding: 60px; border-radius: 40px; text-align: center; border: 4px solid #e94560; position: relative; overflow: hidden; color: white;">
    <h2 style="margin-top: 0; font-size: 42px; color: #ffffff; margin-bottom: 25px;">Vous êtes bloqué ?</h2>
    <p style="font-size: 22px; color: #cbd5e1; max-width: 800px; margin: 0 auto 45px auto;">
        Une fiche suspendue mal gérée peut l'être à vie. Ne jouez pas avec le feu. Je peux préparer votre dossier de
        rétablissement pour maximiser vos chances.
    </p>
    <a href="/contact"
        style="background: #e94560; color: white; padding: 22px 50px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 20px; box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4); border: 2px solid #e94560;">
        SOS Suspension Google
    </a>
</div>
            `
        },
        {
            title: "Suspension Google après modification : Le Guide de Survie",
            slug: "article-gbp-suspension-modification",
            excerpt: "Vous avez changé une catégorie et tout a disparu ? Comprenez le 'Core Fact Trigger' et comment récupérer vos avis.",
            image: "https://images.unsplash.com/photo-1543286386-713df548e617?q=80&w=2068&auto=format&fit=crop",
            tags: JSON.stringify(["Google Business Profile", "Suspension", "Erreurs"]),
            read_time: 8,
            published: true,
            published_at: new Date('2026-01-22'),
            content: `
<div
    style="font-size: 22px; line-height: 1.8; color: #1a1a2e; margin-bottom: 40px; font-weight: 500; text-align: justify;">
    Votre fiche était en ligne depuis 3 ans. Vous aviez 50 avis 5 étoiles. Tout allait bien.
    Hier soir, vous avez juste voulu changer une catégorie ou modifier légèrement votre nom...
    <br><br>
    Et ce matin : <span style="background: #fff5f5; color: #c92a2a; padding: 2px 8px; border-radius: 4px; font-weight: bold;">"Suspendue. Non visible publiquement."</span>
    <br><br>
    C'est le "Edit Trigger". Google a un système de sécurité paranoïaque. Voici comment éviter ça et comment récupérer votre fiche sans perdre vos avis.
</div>

<div
    style="background: #eff6ff; padding: 45px; border-radius: 24px; border-left: 8px solid #3b82f6; margin-bottom: 60px;">
    <h3 style="margin-top: 0; color: #1e3a8a; font-size: 28px;">⚡ Le Concept de "Core Fact"</h3>
    <p style="font-size: 19px; color: #1e40af; line-height: 1.8;">
        Pour Google, toutes les infos ne se valent pas. Les champs "Core Data" sont ceux qui identifient l'existence
        légale de votre business.
    </p>
    <ul style="margin-top: 15px; font-size: 18px; color: #1e40af; list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px;">🔴 <strong>Nom de l'entreprise</strong> (Risque critique)</li>
        <li style="margin-bottom: 10px;">🔴 <strong>Catégorie Primaire</strong> (Risque critique)</li>
        <li style="margin-bottom: 10px;">🔴 <strong>Adresse</strong> (Risque critique)</li>
        <li style="margin-bottom: 10px;">🟠 <strong>Téléphone</strong> (Risque élevé)</li>
        <li style="margin-bottom: 10px;">🟠 <strong>Site Web</strong> (Risque moyen)</li>
    </ul>
    <p style="font-size: 19px; color: #1e40af; line-height: 1.8; margin-top: 15px;">
        Modifier ne serait-ce qu'un seul de ces champs remet votre fiche en mode "Vérification en cours". Si l'algo a un
        doute, il suspend.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">1. La Règle des "Too Many Edits"</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        C'est classique. Vous faites une modif. Google dit "En attente". Vous vous impatientez. Vous refaites une modif.
        Puis une autre.
    </p>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8; margin-top: 15px;">
        <strong>STOP.</strong> Faire plus de 3 modifications sur des champs sensibles en moins de 30 minutes est un
        comportement typique de "hijacking" (piratage de fiche). Google verrouille tout par sécurité.
    </p>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">2. Le changement d'adresse (Déménagement)</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        En changeant d'adresse, vous déclenchez une re-vérification postale OU vidéo quasi obligatoire.
    </p>
    <div
        style="background: #fff5f5; border: 1px solid #feb2b2; padding: 25px; border-radius: 10px; margin-top: 25px;">
        <p style="margin: 0; color: #9b2c2c; font-weight: bold;">
            ⚠️ Erreur fatale à ne pas commettre :
        </p>
        <p style="margin-top: 10px; color: #7f1d1d;">
            Ne changez PAS l'adresse avant d'avoir officiellement mis à jour votre site web, votre footer, et vos
            mentions légales. Google va scanner votre site APRES votre demande. S'il voit l'ancienne adresse sur le
            site et la nouvelle sur GBP -> <strong>Suspension pour incohérence.</strong>
        </p>
    </div>
</div>

<div style="border-left: 6px solid #e94560; padding-left: 30px; margin-bottom: 55px;">
    <h2 style="font-size: 34px; color: #1a1a2e; margin-bottom: 25px;">3. Que faire maintenant ? (Le Processus)</h2>
    <p style="font-size: 19px; color: #4a5568; line-height: 1.8;">
        Votre fiche est suspendue. Ne supprimez surtout pas la fiche ! Vous perdriez vos avis.
    </p>
    
    <h3 style="color: #1a1a2e; font-size: 24px; margin-top: 30px;">Étape A : Audit interne</h3>
    <p style="font-size: 18px; color: #4a5568;">
        Regardez ce que vous avez modifié. Remettez les valeurs d'origine si c'était une erreur. Assurez-vous que votre
        nom correspond à votre devanture.
    </p>

    <h3 style="color: #1a1a2e; font-size: 24px; margin-top: 30px;">Étape B : Le Formulaire de Rétablissement</h3>
    <p style="font-size: 18px; color: #4a5568;">
        C'est votre ticket de sortie. Mais il faut le remplir comme un avocat.
    </p>
    <ul style="font-size: 18px; color: #4a5568; margin-top: 15px;">
        <li>Joignez une <strong>photo de l'extérieur</strong> montrant l'enseigne permanente.</li>
        <li>Joignez une <strong>photo de l'intérieur</strong> (bureau, équipement).</li>
        <li>Joignez votre <strong>KBIS</strong>.</li>
        <li>Si vous avez changé d'adresse : joignez l'ancien et le nouveau bail.</li>
    </ul>
</div>

<div style="background: #f0fdf4; border-radius: 20px; padding: 40px; margin-bottom: 60px; border: 2px solid #bbf7d0;">
    <h4 style="margin-top: 0; color: #166534; font-size: 24px;">💡 La bonne nouvelle</h4>
    <p style="font-size: 19px; color: #14532d; line-height: 1.7;">
        Une suspension suite à une modification est souvent plus facile à lever qu'une suspension à la création, car vous
        avez un historique (TrustRank). Si vous prouvez que vous êtes bien le propriétaire légitime et que la modif est
        réelle, Google rétablira la fiche et <strong>tous vos avis réapparaîtront</strong> (parfois avec 48h de délai).
    </p>
</div>

<div
    style="background: #1a1a2e; padding: 60px; border-radius: 40px; text-align: center; border: 4px solid #e94560; position: relative; overflow: hidden; color: white;">
    <h2 style="margin-top: 0; font-size: 42px; color: #ffffff; margin-bottom: 25px;">Peur de tout perdre ?</h2>
    <p style="font-size: 22px; color: #cbd5e1; max-width: 800px; margin: 0 auto 45px auto;">
        Vous ne voulez pas gérer l'administratif avec Google ? Déléguez-moi la gestion du rétablissement. Je sais exactement quels documents envoyer.
    </p>
    <a href="/contact"
        style="background: #e94560; color: white; padding: 22px 50px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 20px; box-shadow: 0 15px 30px rgba(233, 69, 96, 0.4); border: 2px solid #e94560;">
        Récupérer ma fiche Google
    </a>
</div>
            `
        }
    ];

    console.log(`Starting to seed ${articles.length} GBP Suspension articles...`);

    for (const data of articles) {
        const article = await prisma.article.upsert({
            where: { slug: data.slug },
            update: data,
            create: data,
        });
        console.log(`✓ Seeded: ${article.title}`);
    }

    console.log('✅ GBP Suspension articles seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
