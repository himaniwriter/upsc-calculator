import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Calculator, Users, Award, BookOpen, Clock, Building, ChevronRight, GraduationCap, Target, TrendingUp, CheckCircle } from "lucide-react";
import { calculateAge, isEligibleForUPSC } from "@/lib/calculations";
import EligibilityChecker from "@/components/eligibility-checker";

export default function Home() {
  const [showEligibility, setShowEligibility] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-white">
              Government Exam Eligibility Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Check your eligibility for UPSC, SSC, Banking, and Railway exams. Get personalized calculators and preparation resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => setShowEligibility(true)}
              >
                Check Your Eligibility <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20 text-lg px-8 py-6"
                onClick={() => alert("Email notifications coming soon!")}
              >
                Get Exam Updates
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-16" viewBox="0 0 1440 100" fill="none">
            <path 
              d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z" 
              className="fill-gray-50 dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10+</div>
              <div className="text-gray-600 dark:text-gray-400">Exam Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Accurate Results</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">Free</div>
              <div className="text-gray-600 dark:text-gray-400">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Countdown */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Eligibility Checker */}
        {showEligibility && (
          <div className="mb-12">
            <EligibilityChecker />
          </div>
        )}

        {/* Calculators Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Government Exam Calculators</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">Specialized calculators for different exam types</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/upsc-age-calculator'}>
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">UPSC Age Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Calculate age eligibility for Civil Services with category-wise relaxations
                </p>
                <Badge variant="outline">IAS, IPS, IFS</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/ssc-age-calculator'}>
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">SSC Age Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Check age limits for SSC CGL, CHSL, and other SSC examinations
                </p>
                <Badge variant="outline">CGL, CHSL, MTS</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/marks-calculator'}>
              <CardHeader>
                <Calculator className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">Marks Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Calculate UPSC Prelims scores with negative marking
                </p>
                <Badge variant="outline">+2 Correct, -0.66 Wrong</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/upsc-syllabus'}>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">UPSC Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complete detailed syllabus for Prelims, Mains, and Interview
                </p>
                <Badge variant="outline">Prelims + Mains + Interview</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/blog'}>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">Exam Tips & Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Latest exam updates, preparation tips, and expert guidance
                </p>
                <Badge variant="outline">50+ Articles</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardHeader>
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Banking Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Coming Soon: IBPS, SBI, and other banking exam calculators
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader>
                <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Railway Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Coming Soon: RRB NTPC, Group D, and other railway exam tools
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Platform?</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need for government exam preparation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Target className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Accurate Calculations</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Our calculators use official government exam criteria for 100% accurate results
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Regular Updates</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with latest exam notifications, changes in eligibility criteria
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Guidance</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Get tips from toppers and expert guidance for your exam preparation journey
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold text-white mb-3">About Us</h5>
              <p className="text-sm">
                Your trusted partner for government exam preparation. We provide accurate calculators and up-to-date information.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/upsc-age-calculator" className="hover:text-white transition-colors">UPSC Age Calculator</a></li>
                <li><a href="/marks-calculator" className="hover:text-white transition-colors">Marks Calculator</a></li>
                <li><a href="/upsc-syllabus" className="hover:text-white transition-colors">UPSC Syllabus</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog & Tips</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Exams Covered</h5>
              <ul className="space-y-2 text-sm">
                <li>UPSC Civil Services</li>
                <li>SSC CGL & CHSL</li>
                <li>Banking (IBPS, SBI)</li>
                <li>Railway (RRB)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Contact</h5>
              <p className="text-sm">
                Have questions? Reach out to us for any assistance with your exam preparation.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Government Exam Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}