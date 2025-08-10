import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FileText, CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";
import { prelimsCalculatorSchema, type PrelimsCalculatorInput } from "@shared/schema";

interface PrelimsCalculatorResult {
  gs1Score: number;
  csatScore: number;
  gs1Percentage: number;
  csatPercentage: number;
  csatQualified: boolean;
  qualified: boolean;
  message: string;
}

interface PrelimsCalculatorProps {
  onScoreCalculated?: (scores: PrelimsCalculatorResult) => void;
}

export default function PrelimsCalculator({ onScoreCalculated }: PrelimsCalculatorProps = {}) {
  const [result, setResult] = useState<PrelimsCalculatorResult | null>(null);

  const form = useForm<PrelimsCalculatorInput>({
    resolver: zodResolver(prelimsCalculatorSchema),
    defaultValues: {
      gs1Correct: 0,
      gs1Wrong: 0,
      csatCorrect: 0,
      csatWrong: 0,
    },
  });

  const calculatePrelimsMutation = useMutation({
    mutationFn: async (data: PrelimsCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate/prelims", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      onScoreCalculated?.(data);
    },
  });

  const onSubmit = (data: PrelimsCalculatorInput) => {
    calculatePrelimsMutation.mutate(data);
  };

  const scoringPattern = [
    { type: "Correct Answer", marks: "+2 marks", color: "text-emerald-800 bg-emerald-50 border-emerald-200" },
    { type: "Wrong Answer", marks: "-0.67 marks", color: "text-red-800 bg-red-50 border-red-200" },
    { type: "Not Attempted", marks: "0 marks", color: "text-slate-700 bg-slate-50 border-slate-200" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-3 rounded-lg dark:bg-amber-900">
              <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle>Prelims Marks Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">Calculate prelims score with negative marking</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-muted">
                  <h4 className="font-semibold mb-3">Paper 1 (GS)</h4>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="gs1Correct"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Correct Answers</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0-100" 
                              className="text-sm"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gs1Wrong"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Wrong Answers</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0-100" 
                              className="text-sm"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>

                <Card className="p-4 bg-muted">
                  <h4 className="font-semibold mb-3">Paper 2 (CSAT)</h4>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="csatCorrect"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Correct Answers</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0-80" 
                              className="text-sm"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="csatWrong"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Wrong Answers</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0-80" 
                              className="text-sm"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={calculatePrelimsMutation.isPending}
              >
                {calculatePrelimsMutation.isPending ? "Calculating..." : "Calculate Prelims Score"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prelims Scoring Pattern</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoringPattern.map((pattern, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg border ${pattern.color}`}>
              <span className="font-medium">{pattern.type}</span>
              <span className="font-bold">{pattern.marks}</span>
            </div>
          ))}

          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              CSAT is qualifying in nature. You need to score at least 33% (66 marks out of 200) to qualify.
            </AlertDescription>
          </Alert>

          {result && (
            <div className="mt-6 p-4 rounded-lg border bg-blue-50 dark:bg-blue-950 border-blue-200">
              <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Prelims Score Result</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800 dark:text-blue-200">GS Paper 1:</span>
                  <span className="font-semibold text-blue-900 dark:text-blue-100">
                    {result.gs1Score}/200 ({result.gs1Percentage}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800 dark:text-blue-200">CSAT Paper 2:</span>
                  <span className="font-semibold text-blue-900 dark:text-blue-100">
                    {result.csatScore}/200 ({result.csatPercentage}%)
                  </span>
                </div>
              </div>
              <div className={`mt-3 p-3 rounded border ${
                result.qualified 
                  ? "bg-emerald-100 border-emerald-200 dark:bg-emerald-900" 
                  : "bg-red-100 border-red-200 dark:bg-red-900"
              }`}>
                <div className={`flex items-center ${
                  result.qualified ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"
                }`}>
                  {result.qualified ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">{result.message}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
