import { RulesReference } from "./Models/RulesReference";

const RulesReferences: RulesReference[] = [
    {
        name: 'Advanced Fire Control',
        abbreviation: 'AFC',
        rule: 'Industrialmechs and support vehicles do not suffer TN modifiers.',
        pageNumber: 76 
    },
    {
        name: 'Amphibious',
        abbreviation: 'AMP',
        rule: 'Capable of water movement at reduce move rate',
        pageNumber: 76
    },
    {
        name: 'Angel ECM',
        abbreviation: 'AECM',
        rule: 'Effects of standard ECM (p.77) but is treated as two standard ECM if using ECM/ECCM optional rule',
        pageNumber: 76
    },
    {
        name: 'Anti-\'Mech',
        abbreviation: 'AM',
        rule: 'Can make special physical attack against any ground unit in base to base contact (p.45)',
        pageNumber: 76
    },
    {
        name: 'Anti-Missile System',
        abbreviation: 'AMS',
        rule: 'Reduce damage from missile units',
        pageNumber: 76
    },
    {
        name: 'Armored Components',
        abbreviation: 'ARM',
        rule: 'Ignores first critical hit chance',
        pageNumber: 76
    },
    {
        name: 'Armored Motive Systems',
        abbreviation: 'ARS',
        rule: '-1 to motive damage rolls',
        pageNumber: 77
    },
    {
        name: 'Barrier Armor Rating',
        abbreviation: 'BAR',
        rule: 'Always roll critical hit when damaged',
        pageNumber: 77
    },
    {
        name: 'Basic Fire Control',
        abbreviation: 'BFC',
        rule: 'Inferior targeting and tracking p.44',
        pageNumber: 77
    },
    {
        name: 'Battlemech HarJel',
        abbreviation: 'BHJ',
        rule: 'Ignores hull breach underwater or in vacuum',
        pageNumber: 77
    },
    {
        name: 'Battlemech Shield',
        abbreviation: 'SHLD',
        rule: 'Reduce damage from most attacks but increase TN',
        pageNumber: 77
    },
    {
        name: 'Bomb',
        abbreviation: 'BOMB#',
        rule: 'Carries this number of bombs',
        pageNumber: 77
    },
    {
        name: 'Cargo',
        abbreviation: 'CAR#',
        rule: 'Can be carried by a unit with sufficient infantry transport space (IT#)',
        pageNumber: 77
    },
    {
        name: 'Cellular Ammunition Storage Equipment',
        abbreviation: 'CASE',
        rule: 'Can survive Ammo Critical Hits but will suffer additional damage (p.50)',
        pageNumber: 77
    },
    {
        name: 'Cellular Ammunition Storage Equipment II',
        abbreviation: 'CASEII',
        rule: 'Can ignore Ammo Critical Hits (p.50)',
        pageNumber: 77
    },
    {
        name: 'Electronic Countermeasures',
        abbreviation: 'ECM',
        rule: 'Effects Active Probes, Drones, Narc and iNarc systems (p. 136) and C3 networks (p.80) in a 12" radius',
        pageNumber: 77
    },
    {
        name: 'Elementary Engine',
        abbreviation: 'EE',
        rule: 'Needs air to operate and is affected differently by Engine Critical Hits',
        pageNumber: 77
    },
    {
        name: 'Fuel Cell Engine',
        abbreviation: 'FC',
        rule: 'Needs air to operate and is affected differently by Engine Critical Hits',
        pageNumber: 77
    },
    {
        name: 'Energy',
        abbreviation: 'ENE',
        rule: 'Ignore Ammo Critical Hits',
        pageNumber: 77
    },
    {
        name: 'Extended Mechanized',
        abbreviation: 'XMEC',
        rule: 'May function as mechanized battle armor (p.38)',
        pageNumber: 78
    },
    {
        name: 'Fire Resistant',
        abbreviation: 'FR',
        rule: 'Not affected by heat generation of heat generating weapons',
        pageNumber: 78
    },
    {
        name: 'Flak',
        abbreviation: 'FLK#/#/#',
        rule: 'If unit misses aerospace, VTOL or WIGE unit by 2 or less, it deals reduced damage',
        pageNumber: 78
    },
    {
        name: 'Heat',
        abbreviation: 'HT#/#/#',
        rule: 'Generates heat in target Heat scale at end of turn',
        pageNumber: 78
    },
    {
        name: 'Indirect Fire',
        abbreviation: 'IF#',
        rule: 'Can attack without LOS. See Indirect fire (p.41)',
        pageNumber: 78
    },
    {
        name: 'Industrial Triple-Strength Myomers',
        abbreviation: 'I-TSM',
        rule: 'Additional damage but higher TN on standard and melee type physical attacks',
        pageNumber: 78
    },
    {
        name: 'Infantry Transport',
        abbreviation: 'IT#',
        rule: 'Can transport this number of Cargo',
        pageNumber: 78
    },
    {
        name: 'Jump Jets, Weak',
        abbreviation: 'JMPW#',
        rule: 'Under-powered jump jets. Reduced TMM when jumping.',
        pageNumber: 78
    },
    {
        name: 'Jump Jets, Strong',
        abbreviation: 'JMPS#',
        rule: 'Over-powered jump jets. Increased TMM when jumping.',
        pageNumber: 78
    },
    {
        name: 'Light ECM',
        abbreviation: 'LECM',
        rule: 'Identical to ECM (p.77) but only 2" radius',
        pageNumber: 78
    },
    {
        name: 'Mechanized',
        abbreviation: 'MEC',
        rule: 'May function as mechanized Battle Armor, can ride units with OMNI special ability (p.38)',
        pageNumber: 78
    },
    {
        name: 'Melee',
        abbreviation: 'MEL',
        rule: 'Increased damage for melee-type physical attacks (p.45)',
        pageNumber: 78
    },
    {
        name: 'Mimetic Armor System',
        abbreviation: 'MAS',
        rule: 'Makes unit more difficult to hit with Weapon attacks if stationary',
        pageNumber: 78
    },
    {
        name: 'Light Mimetic Armor System',
        abbreviation: 'LMAS',
        rule: 'Makes unit more difficult to hit with Weapon attacks if stationary',
        pageNumber: 78
    },
    {
        name: 'Off-Road',
        abbreviation: 'ORO',
        rule: 'Ignores increased move cost for wheeled vehicles',
        pageNumber: 78
    },
    {
        name: 'Omni',
        abbreviation: 'OMNI',
        rule: 'May transport a single battle armor (p.38)',
        pageNumber: 78
    },
    {
        name: 'Overheat Long',
        abbreviation: 'OVL',
        rule: 'May overheat at long range',
        pageNumber: 78
    },
    {
        name: 'Rear-Firing Weapons',
        abbreviation: 'RF#/#/#',
        rule: 'May fire in the rear facing but suffers increased TN when doing so',
        pageNumber: 78
    },
    {
        name: 'Stealth',
        abbreviation: 'STL',
        rule: 'Makes this unit more difficult to hit. Effected by ECM.',
        pageNumber: 79
    },
    {
        name: 'Submersible Movement Strong',
        abbreviation: 'SUBS#',
        rule: 'Increased TMM when using submersible movement',
        pageNumber: 79
    },
    {
        name: 'Submersible Movement Weak',
        abbreviation: 'SUBW#',
        rule: 'Decreased TMM when using submersible movement',
        pageNumber: 79
    },
    {
        name: 'Triple-Strength Myomer',
        abbreviation: 'TSM',
        rule: 'Can move faster and deliver additional physical damage when running hot.',
        pageNumber: 78
    },
    {
        name: 'Turret',
        abbreviation: 'TUR#',
        rule: '360 degree field of fire',
        pageNumber: 79
    },
    {
        name: 'Underwater Maneuvering Units',
        abbreviation: 'UMU',
        rule: 'Uses submersible movement when underwater (p.36)',
        pageNumber: 79
    },
    {
        name: 'Watchdog',
        abbreviation: 'WAT',
        rule: 'Treated as both Light Active Probe LPRB (p.82) and ECM',
        pageNumber: 79
    }
    
];

export default RulesReferences;