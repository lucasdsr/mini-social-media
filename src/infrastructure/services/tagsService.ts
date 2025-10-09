// Mock data for tag suggestions - Social Media focused
const TAG_SUGGESTIONS = [
  'amazing',
  'awesome',
  'beautiful',
  'cool',
  'cute',
  'epic',
  'fantastic',
  'funny',
  'great',
  'incredible',
  'love',
  'perfect',
  'wow',
  'best',
  'favorite',
  'recommend',
  'must-see',
  'trending',
  'viral',
  'popular',
  'hot',
  'fire',
  'lit',
  'goals',
  'inspiration',
  'motivation',
  'success',
  'achievement',
  'proud',
  'grateful',
  'blessed',
  'thankful',
  'happy',
  'excited',
  'thrilled',
  'pumped',
  'stoked',
  'mind-blown',
  'speechless',
  'shocked',
  'surprised',
  'impressed',
  'honored',
  'humbled',
  'lucky',
  'fortunate',
  'appreciate',
  'respect',
  'admire',
  'adore',
  'cherish',
  'treasure',
  'value',
  'important',
  'special',
  'unique',
  'rare',
  'precious',
  'memorable',
  'unforgettable',
  'legendary',
  'iconic',
  'classic',
  'timeless',
  'emotional',
  'touching',
  'moving',
  'heartwarming',
  'uplifting',
  'inspiring',
  'positive',
  'optimistic',
  'hopeful',
  'encouraging',
  'supportive',
  'helpful',
  'useful',
  'valuable',
  'rewarding',
  'satisfying',
  'fulfilling',
  'meaningful',
  'significant',
  'relevant',
  'practical',
  'effective',
  'successful',
  'accomplished',
  'achieved',
  'completed',
  'ready',
  'organized',
  'planned',
  'logical',
  'reasonable',
  'sensible',
  'realistic',
  'achievable',
  'possible',
  'feasible',
  'manageable',
  'adaptable',
  'flexible',
  'versatile',
  'complete',
  'thorough',
  'detailed',
  'specific',
  'precise',
  'accurate',
  'excellent',
  'outstanding',
  'exceptional',
  'extraordinary',
  'remarkable',
  'notable',
  'significant',
  'important',
  'major',
  'substantial',
  'meaningful',
  'valuable',
  'precious',
  'treasured',
  'cherished',
  'beloved',
  'adored',
  'loved',
  'appreciated',
  'valued',
  'respected',
  'admired',
  'honored',
  'esteemed',
  'celebrated',
  'remembered',
  'nostalgic',
  'sentimental',
  'emotional',
  'touching',
  'moving',
  'heartwarming',
  'uplifting',
  'inspiring',
  'motivating',
  'encouraging',
  'supportive',
  'helpful',
  'beneficial',
  'rewarding',
  'satisfying',
  'fulfilling',
  'gratifying',
  'pleasing',
  'delightful',
  'enjoyable',
  'pleasant',
  'nice',
  'good',
  'wonderful',
  'marvelous',
  'fantastic',
  'amazing',
  'incredible',
  'unbelievable',
  'extraordinary',
  'remarkable',
  'outstanding',
  'exceptional',
  'superb',
  'excellent',
  'perfect',
  'flawless',
  'impeccable',
  'pristine',
  'pure',
  'clean',
  'fresh',
  'new',
  'modern',
  'contemporary',
  'current',
  'latest',
  'recent',
  'hottest',
  'trending',
  'popular',
  'viral',
  'buzzworthy'
]

// Dynamic tags storage
let dynamicTags: string[] = []

export const tagsService = {
  /**
   * Get tag suggestions based on input
   */
  getSuggestions: (query: string, limit: number = 10): string[] => {
    const allTags = [...TAG_SUGGESTIONS, ...dynamicTags]

    if (!query.trim()) {
      return allTags.slice(0, limit)
    }

    const filtered = allTags.filter(tag =>
      tag.toLowerCase().includes(query.toLowerCase())
    )

    return filtered.slice(0, limit)
  },

  /**
   * Get all available tags
   */
  getAllTags: (): string[] => [...TAG_SUGGESTIONS, ...dynamicTags],

  /**
   * Get popular tags (most commonly used)
   */
  getPopularTags: (limit: number = 20): string[] => {
    const popularTags = [
      'amazing',
      'awesome',
      'beautiful',
      'cool',
      'cute',
      'epic',
      'fantastic',
      'funny',
      'great',
      'incredible',
      'love',
      'perfect',
      'wow',
      'best',
      'favorite',
      'recommend',
      'must-see',
      'trending',
      'viral',
      'popular'
    ]
    return popularTags.slice(0, limit)
  },

  /**
   * Add a new tag to dynamic suggestions
   */
  addDynamicTag: (tag: string): void => {
    const trimmedTag = tag.trim().toLowerCase()
    if (
      trimmedTag &&
      !dynamicTags.includes(trimmedTag) &&
      !TAG_SUGGESTIONS.includes(trimmedTag)
    ) {
      dynamicTags.push(trimmedTag)
    }
  },

  /**
   * Get dynamic tags
   */
  getDynamicTags: (): string[] => [...dynamicTags],

  /**
   * Clear dynamic tags
   */
  clearDynamicTags: (): void => {
    dynamicTags = []
  }
}
