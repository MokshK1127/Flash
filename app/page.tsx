import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  TrendingUpIcon,
  ZapIcon,
  RocketIcon,
  StarIcon,
  Zap,
  Clock,
  Target,
  Users,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignUpButton } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import FlashLanding from "./FlashLanding";

export default function Home() {
  return <FlashLanding />;
}
