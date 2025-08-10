import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, XCircle, Trophy, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { eligibilityCalculatorSchema, type EligibilityCalculatorInput } from "@shared/schema";

interface EligibilityResult {
  ageEligibility: { eligible: boolean; message: string };
  attemptsEligibility: { eligible: boolean; message: string };
  educationEligibility: { eligible: boolean; message: string };
  overallEligible: boolean;
  summary: string;
}

export default function EligibilityCalculator() {
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const form = useForm<EligibilityCalculatorInput>({
    resolver: zodResolver(eligibilityCalculatorSchema),
    defaultValues: {
      dateOfBirth: "",
      category: "general",
      education: "bachelor",
      usedAttempts: 0,
    },
  });

  const checkEligibilityMutation = useMutation({
    mutationFn: async (data: EligibilityCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate/eligibility", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: EligibilityCalculatorInput) => {
    checkEligibilityMutation.mutate(data);
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 p-3 rounded-lg dark:bg-emerald-900">
            <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle>UPSC Eligibility Calculator</CardTitle>
            <p className="text-sm text-muted-foreground">Complete eligibility check for UPSC CSE</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="obc">OBC</SelectItem>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="st">ST</SelectItem>
                          <SelectItem value="ews">EWS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Educational Qualification</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select education" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="pursuing">Pursuing Bachelor's</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usedAttempts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attempts Used</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Number of attempts used"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={checkEligibilityMutation.isPending}
                >
                  {checkEligibilityMutation.isPending ? "Checking..." : "Check Complete Eligibility"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="space-y-4">
            {!result ? (
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardCheck className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Enter your details to check eligibility</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  result.ageEligibility.eligible
                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950"
                    : "bg-red-50 border-red-200 dark:bg-red-950"
                }`}>
                  <div className={`flex items-center mb-2 ${
                    result.ageEligibility.eligible 
                      ? "text-emerald-800 dark:text-emerald-200" 
                      : "text-red-800 dark:text-red-200"
                  }`}>
                    {result.ageEligibility.eligible ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-semibold">Age Eligibility: {result.ageEligibility.eligible ? "✓ Eligible" : "✗ Not Eligible"}</span>
                  </div>
                  <p className={`text-sm ${
                    result.ageEligibility.eligible 
                      ? "text-emerald-700 dark:text-emerald-300" 
                      : "text-red-700 dark:text-red-300"
                  }`}>
                    {result.ageEligibility.message}
                  </p>
                </div>

                <div className={`p-4 rounded-lg border ${
                  result.educationEligibility.eligible
                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950"
                    : "bg-red-50 border-red-200 dark:bg-red-950"
                }`}>
                  <div className={`flex items-center mb-2 ${
                    result.educationEligibility.eligible 
                      ? "text-emerald-800 dark:text-emerald-200" 
                      : "text-red-800 dark:text-red-200"
                  }`}>
                    {result.educationEligibility.eligible ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-semibold">Educational Qualification: {result.educationEligibility.eligible ? "✓ Eligible" : "✗ Not Eligible"}</span>
                  </div>
                  <p className={`text-sm ${
                    result.educationEligibility.eligible 
                      ? "text-emerald-700 dark:text-emerald-300" 
                      : "text-red-700 dark:text-red-300"
                  }`}>
                    {result.educationEligibility.message}
                  </p>
                </div>

                <div className={`p-4 rounded-lg border ${
                  result.attemptsEligibility.eligible
                    ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950"
                    : "bg-red-50 border-red-200 dark:bg-red-950"
                }`}>
                  <div className={`flex items-center mb-2 ${
                    result.attemptsEligibility.eligible 
                      ? "text-emerald-800 dark:text-emerald-200" 
                      : "text-red-800 dark:text-red-200"
                  }`}>
                    {result.attemptsEligibility.eligible ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-semibold">Attempts: {result.attemptsEligibility.eligible ? "✓ Available" : "✗ Exhausted"}</span>
                  </div>
                  <p className={`text-sm ${
                    result.attemptsEligibility.eligible 
                      ? "text-emerald-700 dark:text-emerald-300" 
                      : "text-red-700 dark:text-red-300"
                  }`}>
                    {result.attemptsEligibility.message}
                  </p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  result.overallEligible
                    ? "bg-emerald-100 border-emerald-300 dark:bg-emerald-900"
                    : "bg-red-100 border-red-300 dark:bg-red-900"
                }`}>
                  <div className="text-center">
                    {result.overallEligible ? (
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600 dark:text-red-400" />
                    )}
                    <p className={`font-bold ${
                      result.overallEligible 
                        ? "text-emerald-800 dark:text-emerald-200" 
                        : "text-red-800 dark:text-red-200"
                    }`}>
                      {result.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
