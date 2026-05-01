/**
 * Shared constants and label maps used across the app.
 */

export const MARITAL_OPTIONS = [
    { value: 'single', label: 'Célibataire' },
    { value: 'married', label: 'Marié(e)' },
    { value: 'divorced', label: 'Divorcé(e)' },
    { value: 'widowed', label: 'Veuf(ve)' },
];

export const RANK_OPTIONS = [
    { value: 'A30', label: 'A30' },
    { value: 'A29', label: 'A29' },
    { value: 'A28', label: 'A28' },
    { value: 'A27', label: 'A27' },
    { value: 'A26', label: 'A26' },
    { value: 'A25', label: 'A25' },
    { value: 'A24', label: 'A24' },
    { value: 'A23', label: 'A23' },
    { value: 'A22', label: 'A22' },
    { value: 'B21', label: 'B21' },
    { value: 'B20', label: 'B20' },
    { value: 'B19', label: 'B19' },
    { value: 'C18', label: 'C18' },
    { value: 'C17', label: 'C17' },
    { value: 'C16', label: 'C16' },
    { value: 'D15', label: 'D15' },
    { value: 'D14', label: 'D14' },
    { value: 'D13', label: 'D13' },
    { value: 'E12', label: 'E12' },
    { value: 'E11', label: 'E11' },
    { value: 'E10', label: 'E10' },
    { value: 'F09', label: 'F09' },
    { value: 'F08', label: 'F08' },
    { value: 'F07', label: 'F07' },
    { value: 'G06', label: 'G06' },
    { value: 'G05', label: 'G05' },
    { value: 'G04', label: 'G04' },
    { value: 'G03', label: 'G03' },
    { value: 'G02', label: 'G02' },
    { value: 'G01', label: 'G01' },
];

export const ROLE_LABELS = {
    admin: 'admin',
    DRRG: 'Directeur Régional',
    DRCX: 'Directeur de Complexe',
    DRPD: 'Directeur Pédagogique',
    AGAD: 'Agent Administratif',
    FRMT: 'Formateur',
};

export const REGION_OPTIONS = [
    { value: 'Tangier-Tetouan-Al Hoceima', label: 'Tangier-Tetouan-Al Hoceima' },
    { value: 'Oriental', label: 'Oriental' },
    { value: 'Fès-Meknès', label: 'Fès-Meknès' },
    { value: 'Rabat-Salé-Kénitra', label: 'Rabat-Salé-Kénitra' },
    { value: 'Béni Mellal-Khénifra', label: 'Béni Mellal-Khénifra' },
    { value: 'Casablanca-Settat', label: 'Casablanca-Settat' },
    { value: 'Marrakesh-Safi', label: 'Marrakesh-Safi' },
    { value: 'Drâa-Tafilalet', label: 'Drâa-Tafilalet' },
    { value: 'Souss-Massa', label: 'Souss-Massa' },
    { value: 'Guelmim-Oued Noun', label: 'Guelmim-Oued Noun' },
    { value: 'Laâyoune-Sakia El Hamra', label: 'Laâyoune-Sakia El Hamra' },
    { value: 'Dakhla-Oued Ed-Dahab', label: 'Dakhla-Oued Ed-Dahab' },
];

export const SECTOR_OPTIONS = [
    { value: 'Aéronautique', label: 'Aéronautique' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Agro-Industrie', label: 'Agro-Industrie' },
    { value: 'Artisanat', label: 'Artisanat' },
    { value: 'Arts et Industries Graphiques', label: 'Arts et Industries Graphiques' },
    { value: 'Audiovisuel et Cinéma', label: 'Audiovisuel et Cinéma' },
    { value: 'Bâtiment et Travaux Publics', label: 'Bâtiment et Travaux Publics' },
    { value: 'Cuir', label: 'Cuir' },
    { value: 'Digital et Intelligence Artificielle', label: 'Digital et Intelligence Artificielle' },
    { value: 'Economie Verte', label: 'Economie Verte' },
    { value: 'Froid et Génie Thermique', label: 'Froid et Génie Thermique' },
    { value: 'Génie Electrique', label: 'Génie Electrique' },
    { value: 'Génie Mécanique', label: 'Génie Mécanique' },
    { value: 'Gestion et Commerce', label: 'Gestion et Commerce' },
    { value: 'Industrie Navale', label: 'Industrie Navale' },
    { value: 'Logistique et Transport', label: 'Logistique et Transport' },
    { value: 'Matériaux de Construction', label: 'Matériaux de Construction' },
    { value: 'Métiers de l\'Automobile', label: 'Métiers de l\'Automobile' },
    { value: 'Métiers du Golf', label: 'Métiers du Golf' },
    { value: 'Métiers Transverses de l\'Industrie', label: 'Métiers Transverses de l\'Industrie' },
    { value: 'Pêche', label: 'Pêche' },
    { value: 'Plasturgie', label: 'Plasturgie' },
    { value: 'Santé', label: 'Santé' },
    { value: 'Services à la Personne', label: 'Services à la Personne' },
    { value: 'Sport Equestre', label: 'Sport Equestre' },
    { value: 'Textile Habillement', label: 'Textile Habillement' },
    { value: 'Tourisme Hôtellerie Restauration', label: 'Tourisme Hôtellerie Restauration' },
];

export const ESTABLISHMENT_TYPE_OPTIONS = [
    { value: 'Cité des Métiers et des Compétences', label: 'Cité des Métiers et des Compétences' },
    { value: 'Etablissement de Formation', label: 'Etablissement de Formation' },
    { value: 'Centre Conventionné', label: 'Centre Conventionné' },
];

export const TRAINING_TYPE_OPTIONS = [
    { value: 'Diplomante', label: 'Diplomante' },
    { value: 'Qualifiante', label: 'Qualifiante' },
];

export const TRAINING_LEVEL_OPTIONS = [
    { value: 'Qualification', label: 'Qualification' },
    { value: 'Spécialisation', label: 'Spécialisation' },
    { value: 'Technicien', label: 'Technicien' },
    { value: 'Technicien Spécialisé', label: 'Technicien Spécialisé' },
];

export const ASSET_STATE_OPTIONS = [
    { value: 'Actif', label: 'Actif' },
    { value: 'Inactif', label: 'Inactif' },
    { value: 'Endommagé', label: 'Endommagé' },
    { value: 'Perdu', label: 'Perdu' },
];
