import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { marksCalculatorSchema, type MarksCalculatorInput } from "@shared/schema";

interface MarksCalculatorResult {
  mainsScore: number;
  interviewScore: number;
  totalScore: number;
  totalPossible: number;
  percentage: number;
  breakdown: {
    mains: string;
    interview: string;
  };
}

export default function MarksCalculator() {
  const [result, setResult] = useState<MarksCalculatorResult | null>(null);

  const form = useForm<MarksCalculatorInput>({
    resolver: zodResolver(marksCalculatorSchema),
    defaultValues: {
      prelimsMarks: 0,
      mainsMarks: 0,
      interviewMarks: 0,
    },
  });

  const calculateMarksMutation = useMutation({
    mutationFn: async (data: MarksCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate/marks", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: MarksCalculatorInput) => {
    calculateMarksMutation.mutate(data);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-3 rounded-lg dark:bg-emerald-900">
              <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle>UPSC Marks Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">Calculate your overall UPSC CSE score</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="prelimsMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prelims Score</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter prelims marks" 
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
                name="mainsMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mains Score</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter mains marks" 
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
                name="interviewMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Score</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter interview marks" 
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
                disabled={calculateMarksMutation.isPending}
              >
                {calculateMarksMutation.isPending ? "Calculating..." : "Calculate Total Score"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UPSC CSE Marking Scheme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h5 className="font-semibold">Prelims</h5>
            <p className="text-sm text-muted-foreground">Qualifying only (not counted in final merit)</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-4">
            <h5 className="font-semibold">Mains</h5>
            <p className="text-sm text-muted-foreground">1750 marks (weighted 75%)</p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4">
            <h5 className="font-semibold">Interview</h5>
            <p className="text-sm text-muted-foreground">275 marks (weighted 25%)</p>
          </div>

          {result && (
            <div className="mt-6 p-4 rounded-lg border bg-muted">
              <h5 className="font-semibold mb-3">Final Score Breakdown</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Mains Score (75%):</span>
                  <span className="font-semibold">{result.breakdown.mains}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interview Score (25%):</span>
                  <span className="font-semibold">{result.breakdown.interview}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Score:</span>
                  <span>{result.totalScore}/{result.totalPossible}</span>
                </div>
                <div className="flex justify-between">
                  <span>Percentage:</span>
                  <span className="font-semibold">{result.percentage}%</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
