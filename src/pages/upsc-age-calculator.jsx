import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Info, Users } from "lucide-react";
import { calculateAge, isEligibleForUPSC } from "@/lib/calculations";

export default function UPSCAgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [category, setCategory] = useState("general");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);

  const calculateEligibility = () => {
    if (!dateOfBirth) {
      alert("Please enter your date of birth");
      return;
    }

    const cutoffDate = new Date("2025-08-01");
    const age = calculateAge(dateOfBirth, cutoffDate);
    const eligibility = isEligibleForUPSC(age.years, category, attempts);

    setResult({
      age,
      eligibility,
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
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">UPSC Age Calculator</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Civil Services Exam 2025</p>
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
                Calculate Your UPSC Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc_st">SC/ST</SelectItem>
                    <SelectItem value="ews">EWS</SelectItem>
                    <SelectItem value="pwd_general">PwD (General/EWS)</SelectItem>
                    <SelectItem value="pwd_obc">PwD (OBC)</SelectItem>
                    <SelectItem value="pwd_sc_st">PwD (SC/ST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="attempts">Number of Previous Attempts</Label>
                <Input
                  id="attempts"
                  type="number"
                  min="0"
                  max="10"
                  value={attempts}
                  onChange={(e) => setAttempts(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
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
                UPSC Age Limits & Attempts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Age Limits by Category:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>General/EWS:</span>
                    <Badge variant="outline">21-32 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>OBC:</span>
                    <Badge variant="outline">21-35 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SC/ST:</span>
                    <Badge variant="outline">21-37 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>PwD (General/EWS):</span>
                    <Badge variant="outline">21-42 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>PwD (OBC):</span>
                    <Badge variant="outline">21-45 years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>PwD (SC/ST):</span>
                    <Badge variant="outline">21-47 years</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Maximum Attempts:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>General/EWS:</span>
                    <Badge variant="outline">6 attempts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>OBC/PwD (General):</span>
                    <Badge variant="outline">9 attempts</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SC/ST/PwD (SC/ST):</span>
                    <Badge variant="outline">Unlimited</Badge>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Age is calculated as on 1st August of the exam year. The relaxation is cumulative for candidates belonging to more than one category.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Result Display */}
        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your UPSC Eligibility Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className={result.eligibility.eligible ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20"}>
                  <div className="flex items-center gap-2">
                    {result.eligibility.eligible ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <AlertDescription className="text-base font-semibold">
                      {result.eligibility.eligible 
                        ? "You are eligible for UPSC Civil Services Exam!" 
                        : "You are not eligible for UPSC Civil Services Exam"}
                    </AlertDescription>
                  </div>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Your Age (as on {result.cutoffDate})</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {result.age.years} years, {result.age.months} months
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Age Eligibility</h4>
                    <p className="text-lg">
                      {result.eligibility.ageEligible ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" /> Within age limit
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="h-4 w-4" /> Outside age limit
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Required: {result.eligibility.ageLimit.min}-{result.eligibility.ageLimit.max} years
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Attempts Status</h4>
                    <p className="text-lg">
                      {result.eligibility.attemptsEligible ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" /> Attempts available
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="h-4 w-4" /> No attempts left
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Remaining: {result.eligibility.remainingAttempts} attempts
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Category</h4>
                    <Badge className="mt-1">{category.toUpperCase()}</Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Max attempts: {result.eligibility.attemptLimit === Infinity ? "Unlimited" : result.eligibility.attemptLimit}
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