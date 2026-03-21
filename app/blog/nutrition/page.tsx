"use client";

import Footer from "../../components/Footer";

export default function NutritionArticle() {
  return (
    <>
      <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-6">Understanding Nutrition for Everyone</h1>

        <p className="mb-4">
          Many people imagine that nutrition is different for those who do weight training and those who don't. This is false. Proteins, carbohydrates, and fats work the same way for everyone who has a body. Even if you don't train, your body still requires these nutrients.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Macronutrients Overview</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Proteins:</strong> Build and repair muscles and tissues, support immune function, and help hormone production.</li>
          <li><strong>Carbohydrates:</strong> Provide energy for daily activities and training, and help regulate blood sugar levels.</li>
          <li><strong>Fats:</strong> Support hormone production, brain function, and absorption of fat-soluble vitamins.</li>
        </ul>
        <p className="mb-4">
          Together, these macronutrients constitute your total calories.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Avoid Extremes in Thinking</h2>
        <p className="mb-4">
          People often believe in extremes: either "my hormones/my condition prevent me from losing or gaining weight" or "calories in, calories out". In reality, it's a spectrum. Hormones and personal conditions can cause fluctuations in calorie expenditure. Some may feel they cannot lose weight because their basal metabolic rate is naturally low, and vice versa.
        </p>
        <p className="mb-4">
          This is why tracking your diet is important. Adjusting slightly your fats, rice, or other foods can make the difference between losing or gaining weight.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">The Importance of Muscle Mass</h2>
        <p className="mb-4">
          Weight alone is not enough to measure health. Losing weight by losing muscle is unhealthy. Gaining weight as fat is also unhealthy. Muscle mass supports overall health, brain health, and longevity. That's why it's essential to calculate your intake correctly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Calorie and Macronutrient Guidelines</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Fat loss:</strong> Mild deficit (200-400 kcal), at least 0.7g fat/kg body weight to prevent hormonal disruption, and 2.2-3g protein/kg to preserve muscle.</li>
          <li><strong>Muscle gain:</strong> Mild surplus (~200 kcal). Protein intake can be lower, around 1.7g/kg, with more calories from carbohydrates for energy.</li>
        </ul>
        <p className="mb-4">
          Going too fast in either direction is harmful. Maximum healthy limits: ~4kg lost per month, ~1kg gained per month.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise is Essential</h2>
        <p className="mb-4">
          Nutrition alone is not enough. Regular physical activity and challenging your body with intense effort are key to optimal body and mind function.
        </p>

        <div className="mt-8 text-center">
          <p className="mb-4">
            If you've read this far, you can go further by consulting the guides designed to help you.
          </p>
          <a
            href="/guides"
            className="inline-block bg-teal-900 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Go to Guides
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}