import { Gift, giftDatabase } from '../data/giftData';

export interface UserPreferences {
  recipientType: string;
  ageGroup: string;
  interests: string[];
  budget: number;
  occasion?: string;
}

export interface RecommendationResult {
  gift: Gift;
  score: number;
  reasoning: string;
}

export class GiftRecommendationEngine {
  private calculateCompatibilityScore(gift: Gift, preferences: UserPreferences): number {
    let score = 0;
    let maxScore = 0;

    // Age group compatibility (weight: 25%)
    maxScore += 25;
    if (gift.ageGroups.includes(preferences.ageGroup)) {
      score += 25;
    }

    // Recipient type compatibility (weight: 25%)
    maxScore += 25;
    if (gift.recipientTypes.includes(preferences.recipientType)) {
      score += 25;
    }

    // Interest compatibility (weight: 30%)
    maxScore += 30;
    const interestMatches = preferences.interests.filter(interest => 
      gift.interests.includes(interest)
    ).length;
    if (preferences.interests.length > 0) {
      score += (interestMatches / preferences.interests.length) * 30;
    }

    // Budget compatibility (weight: 20%)
    maxScore += 20;
    if (gift.price <= preferences.budget) {
      // Perfect score if within budget
      score += 20;
    } else if (gift.price <= preferences.budget * 1.2) {
      // Partial score if slightly over budget (within 20%)
      score += 10;
    }

    return (score / maxScore) * 100;
  }

  private generateReasoning(gift: Gift, preferences: UserPreferences, score: number): string {
    const reasons = [];

    if (gift.ageGroups.includes(preferences.ageGroup)) {
      reasons.push(`perfect for ${preferences.ageGroup.replace('-', ' ')}s`);
    }

    if (gift.recipientTypes.includes(preferences.recipientType)) {
      reasons.push(`ideal for a ${preferences.recipientType}`);
    }

    const matchingInterests = preferences.interests.filter(interest => 
      gift.interests.includes(interest)
    );
    if (matchingInterests.length > 0) {
      reasons.push(`matches their interest in ${matchingInterests.join(' and ')}`);
    }

    if (gift.price <= preferences.budget) {
      reasons.push(`fits within your budget`);
    } else if (gift.price <= preferences.budget * 1.2) {
      reasons.push(`slightly above budget but worth considering`);
    }

    if (reasons.length === 0) {
      return "A versatile gift option that could work well.";
    }

    return `Great choice because it's ${reasons.join(', ')}.`;
  }

  public async getRecommendations(
    preferences: UserPreferences, 
    maxResults: number = 6
  ): Promise<RecommendationResult[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const recommendations: RecommendationResult[] = [];

    for (const gift of giftDatabase) {
      const score = this.calculateCompatibilityScore(gift, preferences);
      
      // Only include gifts with a reasonable compatibility score
      if (score >= 20) {
        const reasoning = this.generateReasoning(gift, preferences, score);
        recommendations.push({
          gift,
          score,
          reasoning
        });
      }
    }

    // Sort by score (highest first) and return top results
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }

  public getRandomLoadingMessage(): string {
    const messages = [
      "Analyzing gift preferences...",
      "Searching through thousands of gift ideas...",
      "Matching interests with perfect gifts...",
      "Calculating compatibility scores...",
      "Finding the most thoughtful options...",
      "Personalizing recommendations just for you...",
      "Almost done! Finalizing your gift list..."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}
