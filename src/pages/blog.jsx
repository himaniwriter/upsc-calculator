import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, User, TrendingUp, Award, Target, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Crack UPSC in First Attempt - Complete Strategy",
    author: "Ex-IAS Officer",
    date: "January 5, 2025",
    readTime: "8 min read",
    category: "UPSC",
    excerpt: "Learn the proven strategies used by toppers to clear UPSC CSE in their first attempt. From prelims to interview preparation.",
    trending: true
  },
  {
    id: 2,
    title: "SSC CGL 2025: Important Changes You Must Know",
    author: "Exam Expert",
    date: "January 3, 2025",
    readTime: "5 min read",
    category: "SSC",
    excerpt: "SSC has announced major changes in CGL 2025 exam pattern. Know about the new syllabus, marking scheme, and preparation tips.",
    trending: true
  },
  {
    id: 3,
    title: "Best Books for UPSC Prelims 2025 - Subject Wise List",
    author: "UPSC Mentor",
    date: "December 28, 2024",
    readTime: "10 min read",
    category: "UPSC",
    excerpt: "Comprehensive list of must-read books for UPSC Prelims preparation. Covers all subjects with recommended editions.",
    trending: false
  },
  {
    id: 4,
    title: "Banking Exams 2025: IBPS vs SBI - Which to Choose?",
    author: "Banking Coach",
    date: "December 25, 2024",
    readTime: "6 min read",
    category: "Banking",
    excerpt: "Detailed comparison between IBPS and SBI exams. Understand the differences in syllabus, career prospects, and salary.",
    trending: false
  },
  {
    id: 5,
    title: "Railway RRB NTPC: Last Month Preparation Strategy",
    author: "RRB Expert",
    date: "December 20, 2024",
    readTime: "7 min read",
    category: "Railway",
    excerpt: "How to maximize your scores in the last 30 days before RRB NTPC exam. Focus areas and revision techniques.",
    trending: false
  },
  {
    id: 6,
    title: "UPSC Mains Answer Writing: Score 450+ Marks",
    author: "IAS Topper",
    date: "December 15, 2024",
    readTime: "12 min read",
    category: "UPSC",
    excerpt: "Master the art of answer writing for UPSC Mains. Learn structure, presentation, and time management techniques.",
    trending: true
  }
];

const categories = ["All", "UPSC", "SSC", "Banking", "Railway"];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Tips & Blog</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Latest Updates & Preparation Strategies</p>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline" 
              size="sm"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Guidance for Government Exams
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Get insights from toppers, exam updates, preparation strategies, and success stories
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-blue-600 text-white">Featured</Badge>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3" /> Trending
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              UPSC CSE 2025: Complete Preparation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Comprehensive 12-month preparation strategy for UPSC Civil Services Examination 2025. 
              Covers prelims, mains, and interview preparation with month-by-month targets, 
              recommended resources, and time management tips from successful candidates.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> IAS Officer (2023 Batch)
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> January 8, 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> 15 min read
              </span>
            </div>
            <Button className="gap-2">
              Read Full Article <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.trending && (
                    <Badge variant="secondary" className="gap-1">
                      <TrendingUp className="h-3 w-3" /> Trending
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {post.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Load More Articles
          </Button>
        </div>

        {/* Newsletter Section */}
        <Card className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Get Exam Updates & Tips in Your Inbox
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join 50,000+ aspirants receiving weekly exam updates, preparation tips, and success strategies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}