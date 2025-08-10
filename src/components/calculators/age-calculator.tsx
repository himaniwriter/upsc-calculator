import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Cake, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { ageCalculatorSchema, type AgeCalculatorInput } from "@shared/schema";

interface AgeCalculatorResult {
  currentAge: number;
  eligible: boolean;
  yearsRemaining: number;
  ageLimit: string;
  message: string;
}

export default function AgeCalculator() {
  const [result, setResult] = useState<AgeCalculatorResult | null>(null);

  const form = useForm<AgeCalculatorInput>({
    resolver: zodResolver(ageCalculatorSchema),
    defaultValues: {
      dateOfBirth: "",
      category: "general",
    },
  });

  const calculateAgeMutation = useMutation({
    mutationFn: async (data: AgeCalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate/age", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: AgeCalculatorInput) => {
    calculateAgeMutation.mutate(data);
  };

  const ageLimits = [
    { category: "General/EWS", range: "21-32 years" },
    { category: "OBC", range: "21-35 years" },
    { category: "SC/ST", range: "21-37 years" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Cake className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>UPSC Age Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">Check your age eligibility for UPSC CSE</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={calculateAgeMutation.isPending}
              >
                {calculateAgeMutation.isPending ? "Calculating..." : "Calculate Age Eligibility"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Limits by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ageLimits.map((limit, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">{limit.category}</span>
              <span className="font-semibold">{limit.range}</span>
            </div>
          ))}

          {result && (
            <div className={`mt-6 p-4 rounded-lg border ${
              result.eligible 
                ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950" 
                : "bg-red-50 border-red-200 dark:bg-red-950"
            }`}>
              <div className={`flex items-center mb-2 ${
                result.eligible ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"
              }`}>
                {result.eligible ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 mr-2" />
                )}
                <span className="font-semibold">
                  {result.eligible ? "Eligible for UPSC CSE" : "Not Eligible"}
                </span>
              </div>
              <p className={`text-sm ${
                result.eligible ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"
              }`}>
                {result.message}
              </p>
              <div className="mt-2 text-sm font-medium">
                Current age: {result.currentAge} years
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
