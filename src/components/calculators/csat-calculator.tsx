import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { GraduationCap, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { csatCalculatorSchema, type CSATCalculatorInput } from "@shared/schema";

interface CSATCalculatorResult {
  rawScore: number;
  totalMarks: number;
  percentage: number;
  qualified: boolean;
  qualifyingMarks: number;
  correctAnswers: number;
  wrongAnswers: number;
  notAttempted: number;
  message: string;
}

export default function CSATCalculator() {
  const [result, setResult] = useState<CSATCalculatorResult | null>(null);

  const form = useForm<CSATCalculatorInput>({
    resolver: zodResolver(csatCalculatorSchema),
    defaultValues: {
      correctAnswers: 0,
      wrongAnswers: 0,
      notAttempted: 0,
    },
  });

  const calculateCSATMutation = useMutation({
    mutationFn: async (data: CSATCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate/csat", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: CSATCalculatorInput) => {
    calculateCSATMutation.mutate(data);
  };

  const csatInfo = [
    {
      title: "Qualifying Nature",
      description: "CSAT is qualifying in nature. You need minimum 33% to qualify.",
      color: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
    },
    {
      title: "Qualifying Marks", 
      description: "Minimum 66 marks out of 200 total marks required.",
      color: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
    },
    {
      title: "Negative Marking",
      description: "1/3rd mark deducted for each wrong answer.",
      color: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-3 rounded-lg dark:bg-indigo-900">
              <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>CSAT Score Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">Calculate your CSAT (Paper 2) score</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="correctAnswers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correct Answers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Number of correct answers (0-80)" 
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
                name="wrongAnswers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wrong Answers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Number of wrong answers" 
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
                name="notAttempted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Not Attempted</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Questions not attempted" 
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
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={calculateCSATMutation.isPending}
              >
                {calculateCSATMutation.isPending ? "Calculating..." : "Calculate CSAT Score"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CSAT Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {csatInfo.map((info, index) => (
            <div key={index} className={`p-4 rounded-lg border ${info.color}`}>
              <h5 className="font-semibold mb-2">{info.title}</h5>
              <p className="text-sm">{info.description}</p>
            </div>
          ))}

          {result && (
            <div className={`mt-6 p-4 rounded-lg border ${
              result.qualified
                ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950"
                : "bg-red-50 border-red-200 dark:bg-red-950"
            }`}>
              <h5 className={`font-semibold mb-3 ${
                result.qualified ? "text-emerald-900 dark:text-emerald-100" : "text-red-900 dark:text-red-100"
              }`}>
                CSAT Score Result
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={result.qualified ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"}>
                    Raw Score:
                  </span>
                  <span className="font-semibold">{result.rawScore}/{result.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className={result.qualified ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"}>
                    Percentage:
                  </span>
                  <span className="font-semibold">{result.percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className={result.qualified ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"}>
                    Status:
                  </span>
                  <div className="flex items-center">
                    {result.qualified ? (
                      <CheckCircle className="h-4 w-4 mr-1 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      result.qualified ? "text-emerald-900 dark:text-emerald-100" : "text-red-900 dark:text-red-100"
                    }`}>
                      {result.qualified ? "Qualified" : "Not Qualified"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm font-medium">
                {result.message}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
