import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Info, Users } from "lucide-react";
import { calculateAge } from "@/lib/calculations";

export default function SSCAgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [examType, setExamType] = useState("cgl");
  const [category, setCategory] = useState("general");
  const [result, setResult] = useState(null);

  const sscExams = {
    cgl: { name: "SSC CGL", minAge: 18, maxAge: { general: 32, obc: 35, sc_st: 37 }},
    chsl: { name: "SSC CHSL", minAge: 18, maxAge: { general: 27, obc: 30, sc_st: 32 }},
    mts: { name: "SSC MTS", minAge: 18, maxAge: { general: 25, obc: 28, sc_st: 30 }},
    gd: { name: "SSC GD", minAge: 18, maxAge: { general: 23, obc: 26, sc_st: 28 }}
  };

  const calculateEligibility = () => {
    if (!dateOfBirth || !examType) {
      alert("Please enter all required details");
      return;
    }

    const cutoffDate = new Date("2025-01-01");
    const age = calculateAge(dateOfBirth, cutoffDate);
    const exam = sscExams[examType];
    const maxAge = exam.maxAge[category] || exam.maxAge.general;
    
    const eligible = age.years >= exam.minAge && age.years <= maxAge;

    setResult({
      age,
      eligible,
      examName: exam.name,
      minAge: exam.minAge,
      maxAge,
      cutoffDate: cutoffDate.toLocaleDateString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SSC Age Calculator</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check Your SSC Exam Eligibility</p>
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
                <Users className="h-5 w-5" />
                Calculate Your SSC Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="exam">Select SSC Exam</Label>
                <Select value={examType} onValueChange={setExamType}>
                  <SelectTrigger id="exam" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cgl">SSC CGL (Combined Graduate Level)</SelectItem>
                    <SelectItem value="chsl">SSC CHSL (Combined Higher Secondary)</SelectItem>
                    <SelectItem value="mts">SSC MTS (Multi Tasking Staff)</SelectItem>
                    <SelectItem value="gd">SSC GD (General Duty)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General/UR</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc_st">SC/ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateEligibility} 
                className="w-full"
                size="lg"
              >
                Check Eligibility
              </Button>
            </CardContent>
          </Card>

          {/* Age Limits Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                SSC Age Limits by Exam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">SSC CGL:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>General:</span>
                    <Badge variant="outline">18-32 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>OBC:</span>
                    <Badge variant="outline">18-35 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SC/ST:</span>
                    <Badge variant="outline">18-37 years</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">SSC CHSL:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>General:</span>
                    <Badge variant="outline">18-27 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>OBC:</span>
                    <Badge variant="outline">18-30 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SC/ST:</span>
                    <Badge variant="outline">18-32 years</Badge>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Age is calculated as on 1st January of the exam year. Category-wise relaxation is applicable as per government rules.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Result Display */}
        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{result.examName} Eligibility Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className={result.eligible ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20"}>
                  <div className="flex items-center gap-2">
                    {result.eligible ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <AlertDescription className="text-base font-semibold">
                      {result.eligible 
                        ? `You are eligible for ${result.examName}!` 
                        : `You are not eligible for ${result.examName}`}
                    </AlertDescription>
                  </div>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Your Age (as on {result.cutoffDate})</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {result.age.years} years, {result.age.months} months
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Age Requirement</h4>
                    <p className="text-lg">
                      {result.minAge} - {result.maxAge} years
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      For {category === 'general' ? 'General' : category.toUpperCase()} category
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}