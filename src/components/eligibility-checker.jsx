import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Calendar, GraduationCap } from "lucide-react";
import { calculateAge } from "@/lib/calculations";

const examData = {
  upsc: {
    name: "UPSC Civil Services",
    minAge: 21,
    maxAge: { general: 32, obc: 35, sc_st: 37 },
    education: "Bachelor's Degree",
    attempts: { general: 6, obc: 9, sc_st: "Unlimited" }
  },
  ssc: {
    name: "SSC CGL",
    minAge: 18,
    maxAge: { general: 32, obc: 35, sc_st: 37 },
    education: "Bachelor's Degree",
    attempts: "No Limit"
  },
  banking: {
    name: "IBPS PO",
    minAge: 20,
    maxAge: { general: 30, obc: 33, sc_st: 35 },
    education: "Bachelor's Degree",
    attempts: "No Limit"
  },
  railway: {
    name: "RRB NTPC",
    minAge: 18,
    maxAge: { general: 33, obc: 36, sc_st: 38 },
    education: "Graduate/ITI",
    attempts: "No Limit"
  }
};

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    examType: "",
    dateOfBirth: "",
    category: "general",
    education: ""
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const checkEligibility = () => {
    if (!formData.examType || !formData.dateOfBirth) {
      alert("Please fill all required fields");
      return;
    }

    const exam = examData[formData.examType];
    const cutoffDate = new Date("2025-08-01");
    const age = calculateAge(formData.dateOfBirth, cutoffDate);
    const maxAge = exam.maxAge[formData.category] || exam.maxAge.general;
    
    const ageEligible = age.years >= exam.minAge && age.years <= maxAge;
    const educationEligible = formData.education !== "";

    setResult({
      exam: exam.name,
      age,
      ageEligible,
      educationEligible,
      overall: ageEligible && educationEligible,
      minAge: exam.minAge,
      maxAge,
      education: exam.education,
      attempts: exam.attempts
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Multi-Exam Eligibility Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="exam">Select Exam</Label>
            <Select value={formData.examType} onValueChange={(value) => handleInputChange("examType", value)}>
              <SelectTrigger id="exam" className="mt-2">
                <SelectValue placeholder="Choose exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upsc">UPSC Civil Services</SelectItem>
                <SelectItem value="ssc">SSC CGL</SelectItem>
                <SelectItem value="banking">IBPS PO (Banking)</SelectItem>
                <SelectItem value="railway">RRB NTPC (Railway)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
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

          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="education">Education</Label>
            <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
              <SelectTrigger id="education" className="mt-2">
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="graduate">Bachelor's Degree</SelectItem>
                <SelectItem value="postgraduate">Master's Degree</SelectItem>
                <SelectItem value="professional">Professional Degree</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={checkEligibility} className="w-full" size="lg">
          Check Eligibility
        </Button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <Alert className={result.overall ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20"}>
              <div className="flex items-center gap-2">
                {result.overall ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <AlertDescription className="text-base font-semibold">
                  {result.overall 
                    ? `You are eligible for ${result.exam}!` 
                    : `You are not eligible for ${result.exam}`}
                </AlertDescription>
              </div>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Age Criteria
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Your Age:</span>
                    <Badge variant={result.ageEligible ? "default" : "destructive"}>
                      {result.age.years} years
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Required:</span>
                    <span className="text-sm">{result.minAge}-{result.maxAge} years</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Other Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Education:</span>
                    <Badge variant={result.educationEligible ? "default" : "outline"}>
                      {result.education}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Attempts:</span>
                    <span>{result.attempts}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}