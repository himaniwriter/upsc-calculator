import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Circle, Clock, Target, Award } from "lucide-react";

export default function UPSCSyllabus() {
  const [completedTopics, setCompletedTopics] = useState(new Set());

  const toggleTopic = (topicId) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const prelimsSyllabus = [
    {
      id: "p1",
      subject: "History of India",
      topics: ["Ancient India", "Medieval India", "Modern India", "Indian National Movement"]
    },
    {
      id: "p2",
      subject: "Indian & World Geography",
      topics: ["Physical Geography", "Human Geography", "Economic Geography", "Indian Geography"]
    },
    {
      id: "p3",
      subject: "Indian Polity & Governance",
      topics: ["Constitution", "Political System", "Panchayati Raj", "Public Policy", "Rights Issues"]
    },
    {
      id: "p4",
      subject: "Economic & Social Development",
      topics: ["Sustainable Development", "Poverty", "Demographics", "Social Sector Initiatives"]
    },
    {
      id: "p5",
      subject: "Environment & Ecology",
      topics: ["Environmental Ecology", "Biodiversity", "Climate Change", "Environmental Issues"]
    },
    {
      id: "p6",
      subject: "General Science",
      topics: ["Physics", "Chemistry", "Biology", "Technology", "Space Technology"]
    },
    {
      id: "p7",
      subject: "Current Affairs",
      topics: ["National Events", "International Events", "Economic Affairs", "Science & Technology"]
    }
  ];

  const mainsSyllabus = [
    { paper: "Essay", marks: 250, topics: ["Philosophical essays", "Current affairs based essays"] },
    { paper: "GS Paper I", marks: 250, topics: ["History", "Geography", "Society", "Culture"] },
    { paper: "GS Paper II", marks: 250, topics: ["Governance", "Constitution", "Social Justice", "International Relations"] },
    { paper: "GS Paper III", marks: 250, topics: ["Economy", "Environment", "Science & Tech", "Security"] },
    { paper: "GS Paper IV", marks: 250, topics: ["Ethics", "Integrity", "Aptitude", "Case Studies"] },
    { paper: "Optional Paper I", marks: 250, topics: ["Subject specific topics"] },
    { paper: "Optional Paper II", marks: 250, topics: ["Subject specific topics"] }
  ];

  const calculateProgress = () => {
    const totalTopics = prelimsSyllabus.reduce((acc, subject) => acc + subject.topics.length, 0);
    return Math.round((completedTopics.size / totalTopics) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">UPSC Syllabus</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Complete Prelims, Mains & Interview Guide</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Card */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Syllabus Progress
              </span>
              <Badge className="text-lg px-3 py-1">
                {calculateProgress()}% Complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={calculateProgress()} className="h-3 mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completedTopics.size} topics completed out of {prelimsSyllabus.reduce((acc, s) => acc + s.topics.length, 0)} total topics
            </p>
          </CardContent>
        </Card>

        {/* Syllabus Tabs */}
        <Tabs defaultValue="prelims" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prelims">Prelims</TabsTrigger>
            <TabsTrigger value="mains">Mains</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
          </TabsList>

          {/* Prelims Syllabus */}
          <TabsContent value="prelims" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">UPSC Prelims Syllabus</h3>
              <p className="text-gray-600 dark:text-gray-400">General Studies Paper I (100 Questions, 200 Marks)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {prelimsSyllabus.map((subject) => (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      {subject.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subject.topics.map((topic, index) => {
                        const topicId = `${subject.id}-${index}`;
                        const isCompleted = completedTopics.has(topicId);
                        
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                            onClick={() => toggleTopic(topicId)}
                          >
                            <span className={`text-sm ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                              {topic}
                            </span>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mains Syllabus */}
          <TabsContent value="mains" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">UPSC Mains Syllabus</h3>
              <p className="text-gray-600 dark:text-gray-400">9 Papers, Total 1750 Marks</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mainsSyllabus.map((paper, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{paper.paper}</CardTitle>
                      <Badge variant="outline">{paper.marks} Marks</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {paper.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-indigo-600" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Language Papers:</strong> Paper A (Compulsory Indian Language) and Paper B (English) are qualifying papers with 300 marks each. Minimum 25% marks required to qualify.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Interview Syllabus */}
          <TabsContent value="interview" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">UPSC Interview (Personality Test)</h3>
              <p className="text-gray-600 dark:text-gray-400">275 Marks - Final Stage of Selection</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-600" />
                    Assessment Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Mental alertness and critical powers of assimilation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Clear and logical exposition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Balance of judgment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Variety and depth of interest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Ability for social cohesion and leadership</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Intellectual and moral integrity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    Interview Preparation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1">1</Badge>
                      <span className="text-sm">Thoroughly read your DAF (Detailed Application Form)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1">2</Badge>
                      <span className="text-sm">Stay updated with current affairs (last 6 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1">3</Badge>
                      <span className="text-sm">Practice mock interviews with experts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1">4</Badge>
                      <span className="text-sm">Prepare opinion on major national/international issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1">5</Badge>
                      <span className="text-sm">Work on body language and communication skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1">6</Badge>
                      <span className="text-sm">Be honest and authentic in your responses</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}