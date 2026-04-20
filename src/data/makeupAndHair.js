export const MAKEUP_OPTIONS = {
  foundation: [
    { id: 'natural', name: 'Natural', opacity: 0.1 },
    { id: 'light', name: 'Light Coverage', opacity: 0.2 },
    { id: 'medium', name: 'Medium Coverage', opacity: 0.35 },
    { id: 'full', name: 'Full Coverage', opacity: 0.5 },
    { id: 'dewy', name: 'Dewy Glow', opacity: 0.25 },
  ],
  eyeshadow: [
    { id: 'none', name: 'None', color: 'transparent' },
    { id: 'rose', name: 'Rose Gold', color: '#e8a0bf' },
    { id: 'smokey', name: 'Smokey', color: '#3d3d3d' },
    { id: 'purple', name: 'Amethyst', color: '#9966cc' },
    { id: 'blue', name: 'Ocean Blue', color: '#4a90d9' },
    { id: 'green', name: 'Emerald', color: '#50c878' },
    { id: 'gold', name: 'Golden', color: '#daa520' },
    { id: 'copper', name: 'Copper', color: '#b87333' },
    { id: 'pink', name: 'Bubblegum', color: '#ff69b4' },
    { id: 'burgundy', name: 'Burgundy', color: '#800020' },
  ],
  eyeliner: [
    { id: 'none', name: 'None', style: 'none' },
    { id: 'natural', name: 'Natural', style: 'thin' },
    { id: 'cat', name: 'Cat Eye', style: 'winged' },
    { id: 'dramatic', name: 'Dramatic', style: 'thick' },
    { id: 'smudged', name: 'Smudged', style: 'smudge' },
  ],
  lipstick: [
    { id: 'none', name: 'None', color: 'transparent' },
    { id: 'nude', name: 'Nude', color: '#c4956a' },
    { id: 'rose', name: 'Rose', color: '#c45b84' },
    { id: 'red', name: 'Classic Red', color: '#cc0000' },
    { id: 'berry', name: 'Berry', color: '#8b0045' },
    { id: 'coral', name: 'Coral', color: '#ff6f61' },
    { id: 'mauve', name: 'Mauve', color: '#b784a7' },
    { id: 'plum', name: 'Plum', color: '#6b2d5b' },
    { id: 'pink', name: 'Hot Pink', color: '#ff1493' },
    { id: 'peach', name: 'Peach', color: '#ffb07c' },
  ],
  blush: [
    { id: 'none', name: 'None', color: 'transparent' },
    { id: 'pink', name: 'Pink', color: '#ffb6c1' },
    { id: 'peach', name: 'Peach', color: '#ffdab9' },
    { id: 'rose', name: 'Rose', color: '#de6fa1' },
    { id: 'coral', name: 'Coral', color: '#ff7f7f' },
    { id: 'berry', name: 'Berry', color: '#c44569' },
    { id: 'bronze', name: 'Bronze', color: '#cd7f32' },
  ],
  eyebrows: [
    { id: 'natural', name: 'Natural', shape: 'natural' },
    { id: 'arched', name: 'Arched', shape: 'arched' },
    { id: 'straight', name: 'Straight', shape: 'straight' },
    { id: 'thick', name: 'Bold & Thick', shape: 'thick' },
    { id: 'thin', name: 'Thin & Elegant', shape: 'thin' },
  ],
  lashes: [
    { id: 'natural', name: 'Natural', length: 1 },
    { id: 'long', name: 'Long & Wispy', length: 1.5 },
    { id: 'dramatic', name: 'Dramatic', length: 2 },
    { id: 'doll', name: 'Doll Eyes', length: 1.8 },
  ],
};

export const HAIR_STYLES = [
  { id: 'long-straight', name: 'Long Straight',
    path: 'M-19,-30 C-20,-35 -14,-32 0,-32 C14,-32 20,-35 19,-30 L20,-20 C21,-5 22,10 22,30 C22,55 20,70 18,80 L12,80 C14,65 15,45 14,25 C13,5 14,-10 14,-25 L-14,-25 C-14,-10 -13,5 -14,25 C-15,45 -14,65 -12,80 L-18,80 C-20,70 -22,55 -22,30 C-22,10 -21,-5 -20,-20 Z',
    backPath: 'M-20,-28 C-20,-34 -12,-32 0,-32 C12,-32 20,-34 20,-28 L21,-15 C22,5 22,30 20,60 C19,75 18,85 16,90 L-16,90 C-18,85 -19,75 -20,60 C-22,30 -22,5 -21,-15 Z'
  },
  { id: 'long-wavy', name: 'Long Wavy',
    path: 'M-19,-30 C-20,-35 -14,-32 0,-32 C14,-32 20,-35 19,-30 L20,-20 C22,-5 20,10 22,25 C24,40 20,55 22,70 L16,72 C14,58 18,42 16,28 C14,12 16,-5 14,-22 L-14,-22 C-16,-5 -14,12 -16,28 C-18,42 -14,58 -16,72 L-22,70 C-20,55 -24,40 -22,25 C-20,10 -22,-5 -20,-20 Z',
    backPath: 'M-20,-28 C-20,-34 -12,-32 0,-32 C12,-32 20,-34 20,-28 L22,-10 C24,15 20,40 24,60 C26,72 22,82 20,90 L-20,90 C-22,82 -26,72 -24,60 C-20,40 -24,15 -22,-10 Z'
  },
  { id: 'bob', name: 'Classic Bob',
    path: 'M-19,-30 C-20,-35 -14,-32 0,-32 C14,-32 20,-35 19,-30 L20,-20 C21,-8 21,2 20,12 L18,15 C17,8 16,0 15,-12 L-15,-12 C-16,0 -17,8 -18,15 L-20,12 C-21,2 -21,-8 -20,-20 Z',
    backPath: 'M-20,-28 C-20,-34 -12,-32 0,-32 C12,-32 20,-34 20,-28 L21,-15 C22,0 21,12 20,20 L-20,20 C-21,12 -22,0 -21,-15 Z'
  },
  { id: 'pixie', name: 'Pixie Cut',
    path: 'M-18,-30 C-19,-34 -12,-32 0,-32 C12,-32 19,-34 18,-30 L19,-22 C20,-14 19,-6 17,0 L14,-2 C15,-8 16,-16 14,-24 L-14,-24 C-15,-18 -14,-12 -15,-4 L-18,-2 C-20,-8 -20,-16 -19,-24 Z',
    backPath: null
  },
  { id: 'curly', name: 'Curly',
    path: 'M-19,-30 C-22,-35 -14,-34 0,-34 C14,-34 22,-35 19,-30 C22,-22 24,-10 24,5 C25,20 22,35 20,48 C18,55 16,58 14,55 C16,42 18,28 17,12 C16,-2 17,-14 15,-25 L-15,-25 C-17,-14 -16,-2 -17,12 C-18,28 -16,42 -14,55 C-16,58 -18,55 -20,48 C-22,35 -25,20 -24,5 C-24,-10 -22,-22 -19,-30 Z',
    backPath: 'M-22,-28 C-22,-34 -12,-34 0,-34 C12,-34 22,-34 22,-28 C24,-18 26,-5 26,12 C27,30 24,48 22,60 L-22,60 C-24,48 -27,30 -26,12 C-26,-5 -24,-18 -22,-28 Z'
  },
  { id: 'braids', name: 'Double Braids',
    path: 'M-19,-30 C-20,-35 -14,-32 0,-32 C14,-32 20,-35 19,-30 L19,-22 C19,-10 18,0 17,5 L14,5 L-14,5 L-17,5 C-18,0 -19,-10 -19,-22 Z',
    backPath: 'M-14,5 L-16,15 L-13,18 L-16,24 L-13,28 L-16,34 L-13,42 L-16,48 L-13,55 L-10,55 L-8,48 L-11,42 L-8,34 L-11,28 L-8,24 L-11,18 L-8,12 L-14,5 M14,5 L16,15 L13,18 L16,24 L13,28 L16,34 L13,42 L16,48 L13,55 L10,55 L8,48 L11,42 L8,34 L11,28 L8,24 L11,18 L8,12 L14,5'
  },
  { id: 'ponytail', name: 'High Ponytail',
    path: 'M-18,-30 C-19,-35 -12,-32 0,-32 C12,-32 19,-35 18,-30 L19,-22 C19,-12 18,-4 16,2 L14,0 C15,-6 15,-14 14,-24 L-14,-24 C-15,-14 -15,-6 -14,0 L-16,2 C-18,-4 -19,-12 -19,-22 Z',
    backPath: 'M8,-34 C12,-36 16,-32 18,-26 C22,-16 20,0 18,20 C16,35 15,50 14,60 L10,60 C11,48 12,32 14,16 C16,-2 18,-14 14,-28 C12,-34 10,-35 8,-34 Z'
  },
  { id: 'bun', name: 'Elegant Bun',
    path: 'M-18,-30 C-19,-35 -12,-32 0,-32 C12,-32 19,-35 18,-30 L19,-22 C19,-12 18,-4 16,0 L14,-2 C15,-8 15,-14 14,-24 L-14,-24 C-15,-14 -15,-8 -14,-2 L-16,0 C-18,-4 -19,-12 -19,-22 Z',
    backPath: 'M-10,-36 A12,10 0 1,1 10,-36 A12,10 0 1,1 -10,-36 Z'
  },
  { id: 'sideSweep', name: 'Side Sweep',
    path: 'M-19,-30 C-20,-35 -10,-33 4,-33 C16,-33 22,-35 20,-28 L21,-18 C22,-8 21,2 20,10 L17,8 C18,0 18,-8 17,-18 L-6,-30 C-12,-28 -17,-22 -18,-14 L-20,-12 C-21,0 -21,12 -20,25 C-19,40 -18,55 -16,68 L-22,66 C-23,52 -24,35 -23,18 C-22,2 -21,-10 -20,-20 Z',
    backPath: 'M-20,-28 C-20,-34 -8,-33 4,-33 C16,-33 22,-34 22,-28 L22,-15 C22,5 22,25 20,45 C19,58 18,68 16,75 L-18,75 C-20,62 -22,45 -22,25 C-22,5 -22,-8 -21,-18 Z'
  },
  { id: 'spacesBuns', name: 'Space Buns',
    path: 'M-18,-30 C-19,-34 -12,-32 0,-32 C12,-32 19,-34 18,-30 L19,-22 C19,-12 18,-4 16,0 L14,-2 C15,-8 15,-14 14,-24 L-14,-24 C-15,-14 -15,-8 -14,-2 L-16,0 C-18,-4 -19,-12 -19,-22 Z M-14,-35 A8,8 0 1,1 -14,-19 A8,8 0 1,1 -14,-35 Z M14,-35 A8,8 0 1,1 14,-19 A8,8 0 1,1 14,-35 Z',
    backPath: null
  },
  { id: 'longCurly', name: 'Long Curly',
    path: 'M-20,-30 C-23,-36 -14,-34 0,-34 C14,-34 23,-36 20,-30 C24,-20 26,-5 26,15 C27,35 24,55 22,70 C20,78 18,82 15,78 C18,65 20,48 19,30 C18,10 20,-5 18,-22 L-18,-22 C-20,-5 -18,10 -19,30 C-20,48 -18,65 -15,78 C-18,82 -20,78 -22,70 C-24,55 -27,35 -26,15 C-26,-5 -24,-20 -20,-30 Z',
    backPath: 'M-22,-28 C-24,-36 -14,-34 0,-34 C14,-34 24,-36 22,-28 C26,-16 28,0 28,22 C29,44 26,66 24,80 L-24,80 C-26,66 -29,44 -28,22 C-28,0 -26,-16 -22,-28 Z'
  },
  { id: 'mohawk', name: 'Faux Hawk',
    path: 'M-16,-30 C-17,-34 -10,-32 0,-32 C10,-32 17,-34 16,-30 L16,-24 C16,-16 15,-8 13,-2 L10,-4 C12,-10 12,-18 11,-26 L-11,-26 C-12,-18 -12,-10 -10,-4 L-13,-2 C-15,-8 -16,-16 -16,-24 Z M-4,-48 C-6,-42 -4,-36 0,-34 C4,-36 6,-42 4,-48 C3,-52 -3,-52 -4,-48 Z',
    backPath: null
  },
  { id: 'shortBob', name: 'Short Bob',
    path: 'M-19,-30 C-20,-35 -14,-32 0,-32 C14,-32 20,-35 19,-30 L20,-22 C21,-12 20,-4 19,4 C18,8 16,10 14,8 C16,2 16,-6 15,-16 L-15,-16 C-16,-6 -16,2 -14,8 C-16,10 -18,8 -19,4 C-20,-4 -21,-12 -20,-22 Z',
    backPath: 'M-20,-28 C-20,-34 -12,-32 0,-32 C12,-32 20,-34 20,-28 L21,-18 C22,-6 21,4 20,10 L-20,10 C-21,4 -22,-6 -21,-18 Z'
  },
];

export const HAIR_COLORS = [
  { id: 'black', name: 'Black', color: '#1a1a1a' },
  { id: 'darkBrown', name: 'Dark Brown', color: '#3b2214' },
  { id: 'brown', name: 'Brown', color: '#6b3a2a' },
  { id: 'auburn', name: 'Auburn', color: '#922b05' },
  { id: 'ginger', name: 'Ginger', color: '#c45628' },
  { id: 'blonde', name: 'Blonde', color: '#d4a853' },
  { id: 'platinum', name: 'Platinum', color: '#e8dcc8' },
  { id: 'strawberry', name: 'Strawberry', color: '#c97856' },
  { id: 'red', name: 'Fiery Red', color: '#cc2200' },
  { id: 'pink', name: 'Pastel Pink', color: '#ff99cc' },
  { id: 'blue', name: 'Electric Blue', color: '#4488ff' },
  { id: 'purple', name: 'Lavender', color: '#9966cc' },
  { id: 'green', name: 'Mint', color: '#66ccaa' },
  { id: 'silver', name: 'Silver', color: '#c0c0c0' },
  { id: 'ombre1', name: 'Brown to Blonde', gradient: ['#3b2214', '#d4a853'] },
  { id: 'ombre2', name: 'Black to Purple', gradient: ['#1a1a1a', '#9966cc'] },
];

export const HAIR_ACCESSORIES = [
  { id: 'none', name: 'None' },
  { id: 'bow', name: 'Bow' },
  { id: 'headband', name: 'Headband' },
  { id: 'tiara', name: 'Tiara' },
  { id: 'clips', name: 'Hair Clips' },
  { id: 'flowers', name: 'Flower Crown' },
  { id: 'ribbon', name: 'Ribbon' },
  { id: 'scrunchie', name: 'Scrunchie' },
];
