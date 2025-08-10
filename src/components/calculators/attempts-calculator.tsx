import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";
import { attemptsCalculatorSchema, type AttemptsCalculatorInput } from "@shared/schema";

interface AttemptsCalculatorResult {
  totalAllowed: string | number;
  used: number;
  remaining: string | number;
  eligible: boolean;
  message: string;
}

export default function AttemptsCalculator() {
  const [result, setResult] = useState<AttemptsCalculatorResult | null>(null);

  const form = useForm<AttemptsCalculatorInput>({
    resolver: zodResolver(attemptsCalculatorSchema),
    defaultValues: {
      category: "general",
      usedAttempts: 0,
      currentAge: 21,
    },
  });

  const calculateAttemptsMutation = useMutation({
    mutationFn: async (data: AttemptsCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate/attempts", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: AttemptsCalculatorInput) => {
    calculateAttemptsMutation.mutate(data);
  };

  const attemptLimits = [
    { category: "General/EWS", attempts: "6 attempts" },
    { category: "OBC", attempts: "9 attempts" },
    { category: "SC/ST", attempts: "Unlimited" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg dark:bg-purple-900">
              <RotateCcw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle>UPSC Attempts Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">Track your remaining UPSC attempts</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <SelectItem value="general">General/EWS</SelectItem>
                        <SelectItem value="obc">OBC</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="st">ST</SelectItem>
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
              <FormField
                control={form.control}
                name="currentAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Your current age" 
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
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={calculateAttemptsMutation.isPending}
              >
                {calculateAttemptsMutation.isPending ? "Calculating..." : "Calculate Remaining Attempts"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attempt Limits by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attemptLimits.map((limit, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">{limit.category}</span>
              <span className="font-semibold">{limit.attempts}</span>
            </div>
          ))}

          <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              Age limit restrictions still apply even if you have remaining attempts.
            </AlertDescription>
          </Alert>

          {result && (
            <div className={`mt-6 p-4 rounded-lg border ${
              result.eligible 
                ? "bg-blue-50 border-blue-200 dark:bg-blue-950" 
                : "bg-red-50 border-red-200 dark:bg-red-950"
            }`}>
              <h5 className={`font-semibold mb-2 ${
                result.eligible ? "text-blue-900 dark:text-blue-100" : "text-red-900 dark:text-red-100"
              }`}>
                Attempts Analysis
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={result.eligible ? "text-blue-800 dark:text-blue-200" : "text-red-800 dark:text-red-200"}>
                    Total Allowed:
                  </span>
                  <span className="font-semibold">{result.totalAllowed} attempts</span>
                </div>
                <div className="flex justify-between">
                  <span className={result.eligible ? "text-blue-800 dark:text-blue-200" : "text-red-800 dark:text-red-200"}>
                    Used:
                  </span>
                  <span className="font-semibold">{result.used} attempts</span>
                </div>
                <div className="flex justify-between">
                  <span className={result.eligible ? "text-blue-800 dark:text-blue-200" : "text-red-800 dark:text-red-200"}>
                    Remaining:
                  </span>
                  <span className={`font-semibold ${
                    result.eligible ? "text-blue-900 dark:text-blue-100" : "text-red-900 dark:text-red-100"
                  }`}>
                    {result.remaining} attempts
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm font-medium">
                {result.message}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
