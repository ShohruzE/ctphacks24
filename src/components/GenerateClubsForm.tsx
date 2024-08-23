"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const religion = [
  {
    id: "christian",
    label: "Christianity",
  },
  {
    id: "catholic",
    label: "Catholicism",
  },
  {
    id: "jewish",
    label: "Hebrew",
  },
  {
    id: "hindu",
    label: "Hinduism",
  },
  {
    id: "islam",
    label: "Islam",
  },
  {
    id: "N/A",
    label: "N/A",
  },
] as const;

const formSchema = z.object({
  gender: z.enum(["Male", "Female", "Prefer not to say", "Other"], {
    required_error: "You need to select a gender identity",
  }),
  religion: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  interests: z.string().min(2, {
    message: "Please provide a valid interest",
  }),
});

export default function GenerateClubsForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "Male",
      interests: "",
      religion: ["N/A"],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { interests } = values;
    setLoading(true);
    toast({
      title: "Creating your suggestions...",
      description: "Please wait a few moments while we cater to your profile!",
    });
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interests }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Male" id="Male" />
                    <Label htmlFor="Male">Male</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Female" id="Female" />
                    <Label htmlFor="Female">Female</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="Prefer not to say"
                      id="Prefer not to say"
                    />
                    <Label htmlFor="Prefer not to say">Prefer not to say</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Other" id="Other" />
                    <Label htmlFor="Other">Other</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>Choose your gender identity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Religious Interests</FormLabel>
              <FormControl>
                <Input placeholder="Coding, Music, Art" {...field} />
              </FormControl>
              <FormDescription>
                Enter some of your interests and hobbies.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Interests</FormLabel>
              <FormControl>
                <Input placeholder="Coding, Music, Art" {...field} />
              </FormControl>
              <FormDescription>
                Enter some of your interests and hobbies.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
