"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_BASE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const reviewSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  rating: z
    .number({ invalid_type_error: "Select a rating" })
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  message: z.string().min(10, "Share a few words about your experience"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function WriteReviewForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      message: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setSuccess(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email || undefined,
            rating: values.rating,
            message: values.message,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.message || "Unable to submit your review. Please try again.");
        }

        setSuccess("Thank you for sharing your experience with Ami Shalom Tours!");
        reset({ name: "", email: "", rating: 5, message: "" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="Jane Doe"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Email (optional)</label>
          <input
            type="email"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Rating</label>
          <select
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            {...register("rating", { valueAsNumber: true })}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} {value === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </select>
          {errors.rating && <p className="mt-1 text-xs text-rose-500">{errors.rating.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Share your experience
          </label>
          <textarea
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="Tell us about the highlights of your adventure..."
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-teal-600 text-white hover:bg-teal-700"
          disabled={isPending}
        >
          {isPending ? "Submitting review..." : "Submit Review"}
        </Button>

        {success && <p className="text-sm text-teal-600">{success}</p>}
        {error && <p className="text-sm text-rose-500">{error}</p>}
      </form>
    </div>
  );
}


