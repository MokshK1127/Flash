"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "10 AI-generated posts per month",
      "Twitter, Instagram, and LinkedIn content",
      "Basic content preview",
    ],
  },
  {
    name: "Pro",
    price: "Coming Soon",
    features: [
      "500 AI-generated posts per month",
      "Twitter, Instagram, and LinkedIn content",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Coming Soon",
    features: [
      "Unlimited AI-generated posts",
      "All social media platforms",
      "Custom AI model training",
      "Dedicated account manager",
    ],
  },
];

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (planName: string) => {
    if (!isSignedIn) {
      return;
    }

    setIsLoading(true);
    try {
      // For now, just show a message that this feature is coming soon
      alert(`${planName} plan is coming soon! Stay tuned for updates.`);
    } catch (error) {
      console.error("Error upgrading plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <main className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12 text-center text-white">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-gray-800 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">
                {plan.name}
              </h2>
              <p className="text-4xl font-bold mb-6 text-white">
                ${plan.price}
                <span className="text-lg font-normal text-gray-400">
                  /month
                </span>
              </p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center mb-3 text-gray-300"
                  >
                    <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleUpgrade(plan.name)}
                disabled={isLoading || plan.price === "Free"}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                {isLoading ? "Processing..." : plan.price === "Free" ? "Current Plan" : "Coming Soon"}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
