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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

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

const clubType = [
  {
    id: "Academic",
    label: "Academic",
  },
  {
    id: "Advocacy and Outreach",
    label: "Advocacy and Outreach",
  },
  {
    id: "Culture",
    label: "Culture",
  },
  {
    id: "Faith-Based",
    label: "Faith-Based",
  },
  {
    id: "Fraternities and Sororities",
    label: "Fraternities and Sororities",
  },
  {
    id: "Graduate",
    label: "Graduate",
  },
  {
    id: "Honor Societies",
    label: "Honor Societies",
  },
  {
    id: "Performing Arts",
    label: "Performing Arts",
  },
  {
    id: "Publications and Media",
    label: "Publications and Media",
  },
  {
    id: "Service Learning",
    label: "Service Learning",
  },
  {
    id: "Special Interest",
    label: "Special Interest",
  },
] as const;

const formSchema = z.object({
  gender: z.enum(["Male", "Female", "Prefer not to say", "Other"], {
    required_error: "You need to select a gender identity",
  }),
  clubType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
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
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "Male",
      clubType: [],
      religion: [],
      interests: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { gender, clubType, religion, interests } = values;
    console.log(values);
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
        body: JSON.stringify({ gender, clubType, religion, interests }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      // router.push(`/recommendation/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* GENDER MULTIPLE CHOICE */}
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

        {/* CLUB TYPE CHECKBOXES */}
        <FormField
          control={form.control}
          name="clubType"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-xl">Club Types</FormLabel>
                <FormDescription>
                  Select any club types you may be interested in
                </FormDescription>
              </div>
              {clubType.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="clubType"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* RELIGION CHECKBOXES */}
        <FormField
          control={form.control}
          name="religion"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-xl">Religious Interests</FormLabel>
                <FormDescription>
                  Select any religious affiliations you may have
                </FormDescription>
              </div>
              {religion.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="religion"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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
