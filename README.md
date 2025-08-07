# AI Gift Recommendation Tool

A modern, client-side gift recommendation tool built with Next.js that simulates AI-powered gift suggestions based on user preferences.

## Features

- 🎁 **Smart Gift Recommendations**: AI-simulated algorithm that matches gifts based on recipient type, age, interests, and budget
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS
- ⚡ **Fast & Lightweight**: Fully client-side with no backend required
- 🚀 **Easy Deployment**: Optimized for Vercel deployment
- 📱 **Mobile Friendly**: Responsive design that works on all devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Client-side AI Simulation** - JavaScript-based recommendation engine

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Deployment on Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy automatically - the app is configured for static export

Or use the Vercel CLI:
```bash
npx vercel
```

## How It Works

The app uses a sophisticated client-side algorithm that:

1. **Collects User Input**: Recipient type, age group, interests, budget, and occasion
2. **Calculates Compatibility Scores**: Uses weighted scoring based on:
   - Age group compatibility (25%)
   - Recipient type match (25%)
   - Interest alignment (30%)
   - Budget fit (20%)
3. **Generates Personalized Reasoning**: Explains why each gift is recommended
4. **Simulates AI Processing**: Adds realistic delays and loading messages

## Gift Database

The app includes 20+ carefully curated gift options across categories:
- Technology & Gadgets
- Books & Learning
- Fashion & Accessories
- Home & Living
- Sports & Fitness
- Arts & Crafts
- Food & Treats
- Beauty & Self-Care
- Entertainment

## Customization

### Adding New Gifts

Edit `app/data/giftData.ts` to add new gifts to the database:

```typescript
{
  id: "new-gift",
  name: "Gift Name",
  description: "Gift description",
  price: 50,
  category: "Category",
  ageGroups: ["young-adult", "adult"],
  interests: ["interest1", "interest2"],
  recipientTypes: ["friend", "partner"]
}
```

### Modifying the Algorithm

The recommendation logic is in `app/utils/giftRecommendationEngine.ts`. You can:
- Adjust scoring weights
- Add new compatibility factors
- Modify the reasoning generation
- Change the AI simulation behavior

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
