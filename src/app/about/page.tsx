import {
  Wheat,
  Heart,
  Award,
  Users,
  MapPin,
  Phone,
  AtSign,
  Leaf,
  Shield,
  Zap,
  Utensils,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";

const briefBenefits = [
  {
    icon: Leaf,
    title: "Gluten-Free",
    desc: "Safe for people with gluten sensitivity & celiac",
  },
  {
    icon: Heart,
    title: "Easy to Digest",
    desc: "Gentle on the stomach, great for kids & elderly",
  },
  {
    icon: Shield,
    title: "Naturally Hypoallergenic",
    desc: "No common allergens like wheat, dairy, nuts",
  },
  {
    icon: Utensils,
    title: "Versatile",
    desc: "Perfect for bread, cakes, pancakes, thickening soups & sauces",
  },
  {
    icon: Zap,
    title: "Energy Boost",
    desc: "Gives clean, lasting energy from complex carbs",
  },
];

const detailedBenefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    points: [
      { label: "Gluten-Free", text: "A safe alternative to wheat flour. No bloating, no stomach discomfort." },
      { label: "Digestive Friendly", text: "Light and easy to digest. Ideal for babies, elderly, and people recovering from illness." },
      { label: "Allergy-Free", text: "Free from wheat, dairy, soy, and nuts. Perfect for families with food allergies." },
    ],
  },
  {
    icon: Zap,
    title: "Nutrition",
    points: [
      { label: "Energy", text: "Rich in complex carbohydrates for steady energy release." },
      { label: "Low in Fat", text: "Naturally low-fat and cholesterol-free." },
      { label: "Fortified Options", text: "Can be enriched with vitamins and minerals." },
    ],
  },
  {
    icon: Utensils,
    title: "Cooking & Baking",
    points: [
      { label: "Smooth Texture", text: "Gives baked goods a soft, tender crumb. Makes cakes and cookies extra light." },
      { label: "Thickening Agent", text: "Works great for soups, gravies, and sauces without lumps." },
      { label: "Versatile", text: "Use for bread, pancakes, noodles, batters, baby food, and gluten-free pastries." },
    ],
  },
  {
    icon: Sparkles,
    title: "For BintaFoods Customers",
    points: [
      { label: "Local & Natural", text: "Made from Nigerian rice. No preservatives, no chemicals." },
      { label: "Diet-Friendly", text: "Fits keto, vegan, and gluten-free diets." },
    ],
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <Wheat className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6">
            About <span className="gradient-text">Binta Foods</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg leading-relaxed">
            Born from a passion for healthy, natural foods, Binta Foods is
            dedicated to producing premium rice flour that nourishes Nigerian
            families. We believe every meal should be both delicious and
            nutritious.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Our Mission",
                desc: "To provide every Nigerian household with access to premium, 100% natural rice flour that promotes health, wellness, and great taste.",
              },
              {
                icon: Award,
                title: "Quality Promise",
                desc: "Every batch of Binta Rice Flour is made from carefully selected rice and produced under strict quality control standards.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "We source our ingredients locally, support Nigerian farmers, and invest in our community's health through quality food production.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 product-shadow text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients & Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              What Goes{" "}
              <span className="gradient-text">Into Our Flour</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              One simple, natural ingredient - nothing more, nothing less.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
              <div
                className="flex items-start gap-4 p-6 bg-cream rounded-2xl"
              >
                <span className="text-4xl">🌾</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Premium Rice
                  </h3>
                  <p className="text-text-muted">Carefully selected, high-quality rice grains milled to a fine, smooth consistency.</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Benefits of Rice Flour */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
              Made from 100% Natural Rice
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              Benefits of <span className="text-secondary">Rice Flour</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {briefBenefits.map((b) => (
              <div
                key={b.title}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <b.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h3 className="font-bold mb-1">{b.title}</h3>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              A Closer <span className="gradient-text">Look</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              Everything that makes Binta Rice Flour good for your health, your
              kitchen, and your family.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {detailedBenefits.map((category) => (
              <div
                key={category.title}
                className="bg-white rounded-3xl p-8 product-shadow border border-card-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shrink-0">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.points.map((point) => (
                    <div key={point.label} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <p className="text-sm text-text-muted">
                        <span className="font-semibold text-foreground">{point.label}:</span>{" "}
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-[2rem] p-8 sm:p-12 text-center text-white">
            <p className="text-xl sm:text-2xl font-black leading-relaxed">
              Binta Rice Flour: Gluten-Free. Easy to Digest.{" "}
              <span className="text-secondary-light">Made for Nigerian Kitchens.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-3xl p-8 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto mb-8">
              Have questions or want to place a bulk order? Reach out to us!
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="flex flex-col items-center gap-2 p-4">
                <MapPin className="w-6 h-6 text-primary" />
                <p className="text-sm font-semibold">Location</p>
                <p className="text-xs text-text-muted">
                  5, Salami Eleku Cl, Awoyaya, Lagos
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <Phone className="w-6 h-6 text-primary" />
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-xs text-text-muted">
                  08138070191
                  <br />
                  09137447992
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <AtSign className="w-6 h-6 text-primary" />
                <p className="text-sm font-semibold">Instagram</p>
                <p className="text-xs text-text-muted">@bintafoods</p>
              </div>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
            >
              Shop Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
