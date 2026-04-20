export const THEMES = [
  { id: 'gothic', name: 'Gothic Romance', emoji: '🖤', colors: ['#2d0a1e', '#8b0000', '#4a0028', '#1a0011'], description: 'Dark, dramatic, and romantically mysterious' },
  { id: 'y2k', name: 'Y2K Vibes', emoji: '💿', colors: ['#ff69b4', '#00bfff', '#ff1493', '#7b68ee'], description: 'Early 2000s butterfly clips and low-rise energy' },
  { id: 'cottagecore', name: 'Cottagecore Queen', emoji: '🌸', colors: ['#f5e6d3', '#8fbc8f', '#deb887', '#f0e68c'], description: 'Floral, pastoral, and dreamily rustic' },
  { id: 'oldmoney', name: 'Old Money Elegance', emoji: '💎', colors: ['#1a1a2e', '#c9b037', '#0f3057', '#e8d5b7'], description: 'Quiet luxury, timeless sophistication' },
  { id: 'cyberpunk', name: 'Cyberpunk Diva', emoji: '⚡', colors: ['#0d0221', '#ff00ff', '#00ffff', '#ff6600'], description: 'Neon-lit futuristic street style' },
  { id: 'royalball', name: 'Royal Ball', emoji: '👑', colors: ['#4a0080', '#ffd700', '#800020', '#f5f5dc'], description: 'Regal gowns fit for a palace soiree' },
  { id: 'beachglam', name: 'Beach Glamour', emoji: '🌊', colors: ['#00bcd4', '#ff7043', '#fff176', '#e0f7fa'], description: 'Sun-kissed and effortlessly chic' },
  { id: 'streetwear', name: 'Street Style Icon', emoji: '🔥', colors: ['#212121', '#ff5722', '#ffffff', '#9e9e9e'], description: 'Urban cool with bold statement pieces' },
  { id: 'fairytale', name: 'Fairytale Fantasy', emoji: '✨', colors: ['#e8b4f8', '#a0d2db', '#f8e8b4', '#f8b4d0'], description: 'Enchanted princess meets modern magic' },
  { id: 'retrodisco', name: 'Retro Disco', emoji: '🪩', colors: ['#ff6f00', '#e040fb', '#ffeb3b', '#76ff03'], description: '70s glitter, platforms, and groovy vibes' },
  { id: 'minimalist', name: 'Minimalist Chic', emoji: '🤍', colors: ['#f5f5f5', '#000000', '#c4b5a0', '#e0dcd5'], description: 'Clean lines, neutral tones, less is more' },
  { id: 'popstar', name: 'Pop Star Glam', emoji: '🌟', colors: ['#ff1493', '#ffd700', '#ff69b4', '#9400d3'], description: 'Stage-ready sparkle and showstopping style' },
];

export const SKIN_TONES = [
  { id: 'tone1', color: '#FDEBD0', name: 'Porcelain' },
  { id: 'tone2', color: '#F5CBA7', name: 'Fair' },
  { id: 'tone3', color: '#E8B98D', name: 'Light' },
  { id: 'tone4', color: '#D4A574', name: 'Medium Light' },
  { id: 'tone5', color: '#C68E5B', name: 'Medium' },
  { id: 'tone6', color: '#A0704E', name: 'Medium Dark' },
  { id: 'tone7', color: '#8B5E3C', name: 'Dark' },
  { id: 'tone8', color: '#6B4226', name: 'Deep' },
  { id: 'tone9', color: '#4A2C17', name: 'Espresso' },
  { id: 'tone10', color: '#3B1F0B', name: 'Rich' },
];

export const CHARACTERS = [
  { id: 'alice', name: 'Alice', defaultSkinTone: 'tone3', story: 'The creative dreamer who wants to wow at the fashion show' },
  { id: 'bella', name: 'Bella', defaultSkinTone: 'tone6', story: 'The confident trendsetter with an eye for bold style' },
  { id: 'chloe', name: 'Chloe', defaultSkinTone: 'tone1', story: 'The elegant minimalist who loves clean aesthetics' },
];

export const RANKS = [
  { minScore: 0, title: 'Fashion Newbie', icon: '👗' },
  { minScore: 30, title: 'Fashionista', icon: '💅' },
  { minScore: 50, title: 'Trendsetter', icon: '🔥' },
  { minScore: 70, title: 'Top Stylist', icon: '⭐' },
  { minScore: 85, title: 'Style Icon', icon: '👑' },
  { minScore: 95, title: 'Fashion Legend', icon: '🏆' },
];
