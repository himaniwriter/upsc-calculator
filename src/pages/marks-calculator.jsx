import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calculator, Target, TrendingUp, AlertTriangle, Award } from "lucide-react";
import { calculateUPSCPrelimsScore } from "@/lib/calculations";

export default function MarksCalculator() {
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("100");
  const [result, setResult] = useState(null);

  const calculateScore = () => {
    const correct = parseInt(correctAnswers) || 0;
    const wrong = parseInt(wrongAnswers) || 0;
    const total = parseInt(totalQuestions) || 100;

    if (correct + wrong > total) {
      alert("The sum of correct and wrong answers cannot exceed total questions!");
      return;
    }

    const score = calculateUPSCPrelimsScore(correct, wrong, total);
    setResult(score);
  };

  const resetCalculator = () => {
    setCorrectAnswers("");
    setWrongAnswers("");
    setTotalQuestions("100");
    setResult(null);
  };

  const getPerformanceLevel = (marks) => {
    if (marks >= 110) return { level: "Excellent", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" };
    if (marks >= 90) return { level: "Good", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" };
    if (marks >= 70) return { level: "Average", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
    return { level: "Needs Improvement", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">UPSC Marks Calculator</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calculate Prelims Score with Negative Marking</p>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculate Your Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="correct">Number of Correct Answers</Label>
                <Input
                  id="correct"
                  type="number"
                  min="0"
                  max={totalQuestions}
                  value={correctAnswers}
                  onChange={(e) => setCorrectAnswers(e.target.value)}
                  placeholder="Enter correct answers"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="wrong">Number of Wrong Answers</Label>
                <Input
                  id="wrong"
                  type="number"
                  min="0"
                  max={totalQuestions}
                  value={wrongAnswers}
                  onChange={(e) => setWrongAnswers(e.target.value)}
                  placeholder="Enter wrong answers"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="total">Total Questions</Label>
                <Input
                  id="total"
                  type="number"
                  min="1"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Default: 100 questions for UPSC Prelims</p>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={calculateScore} 
                  className="flex-1"
                  size="lg"
                >
                  Calculate Score
                </Button>
                <Button 
                  onClick={resetCalculator} 
                  variant="outline"
                  size="lg"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Marking Scheme Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                UPSC Marking Scheme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Correct Answer</span>
                  <Badge className="bg-green-600">+2 marks</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Each correct answer awards 2 marks
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Wrong Answer</span>
                  <Badge variant="destructive">-0.66 marks</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1/3rd negative marking for each wrong answer
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Unattempted</span>
                  <Badge variant="outline">0 marks</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No marks deducted for unattempted questions
                </p>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Attempt questions only when you can eliminate at least 2 options. Random guessing can significantly reduce your score due to negative marking.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-semibold">Cut-off Trends (General Category)</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>2023:</span>
                    <Badge variant="outline">75.41 marks</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>2022:</span>
                    <Badge variant="outline">88.22 marks</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>2021:</span>
                    <Badge variant="outline">87.54 marks</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result Display */}
        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Score Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Total Score */}
                <div className={`rounded-lg p-6 text-center ${getPerformanceLevel(result.totalMarks).bg}`}>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Score</h3>
                  <p className={`text-4xl font-bold ${getPerformanceLevel(result.totalMarks).color}`}>
                    {result.totalMarks} / {parseInt(totalQuestions) * 2}
                  </p>
                  <Badge className="mt-3" variant="outline">
                    {getPerformanceLevel(result.totalMarks).level} Performance
                  </Badge>
                </div>

                {/* Score Breakdown */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                    <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">Positive Marks</div>
                    <div className="text-2xl font-bold text-green-600">+{result.positiveMarks}</div>
                    <div className="text-xs text-gray-500 mt-1">{correctAnswers} correct answers</div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                    <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">Negative Marks</div>
                    <div className="text-2xl font-bold text-red-600">-{result.negativeMarks}</div>
                    <div className="text-xs text-gray-500 mt-1">{wrongAnswers} wrong answers</div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                    <div className="text-2xl font-bold text-blue-600">{result.accuracy}%</div>
                    <div className="text-xs text-gray-500 mt-1">{result.unattempted} unattempted</div>
                  </div>
                </div>

                {/* Performance Summary */}
                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <div>
                        <strong>Questions Attempted:</strong> {result.attemptedQuestions} out of {totalQuestions}
                      </div>
                      <div>
                        <strong>Success Rate:</strong> You got {((parseInt(correctAnswers) / result.attemptedQuestions) * 100).toFixed(1)}% of attempted questions correct
                      </div>
                      {result.totalMarks >= 90 && (
                        <div className="text-green-600 font-semibold">
                          Great job! Your score is above typical UPSC Prelims cut-off marks.
                        </div>
                      )}
                      {result.totalMarks < 70 && (
                        <div className="text-orange-600">
                          Consider improving accuracy and attempting more questions to increase your score.
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}