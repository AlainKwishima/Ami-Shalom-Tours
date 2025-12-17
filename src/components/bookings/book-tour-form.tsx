"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_BASE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Phone number is required"),
  destination: z.string().min(2, "Destination is required"),
  tourDate: z.string().min(1, "Choose a tour date"),
  numberOfPeople: z
    .number({ invalid_type_error: "Number of travellers required" })
    .min(1, "At least one traveller"),
  specialRequest: z.string().optional(),
});

export type BookTourFormValues = z.infer<typeof bookingSchema>;

export function BookTourForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookTourFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      tourDate: "",
      numberOfPeople: 1,
      specialRequest: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setSuccess(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            destinationId: values.destination,
            tourDate: values.tourDate,
            numberOfPeople: values.numberOfPeople,
            specialRequest: values.specialRequest,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.message || "Unable to submit booking. Please try again.");
        }

        setSuccess(
          "Thank you! Your booking request has been sent. Our team will contact you shortly to confirm the details.",
        );
        reset();
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
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Phone</label>
            <input
              type="tel"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="(+250) 123-456"
              {...register("phone")}
            />
            {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Destination</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="Destination name"
              {...register("destination")}
            />
            {errors.destination && (
              <p className="mt-1 text-xs text-rose-500">{errors.destination.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Preferred Date</label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              {...register("tourDate")}
            />
            {errors.tourDate && <p className="mt-1 text-xs text-rose-500">{errors.tourDate.message}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Number of Travellers</label>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            {...register("numberOfPeople", { valueAsNumber: true })}
          />
          {errors.numberOfPeople && (
            <p className="mt-1 text-xs text-rose-500">{errors.numberOfPeople.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Special Requests</label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            placeholder="Tell us about any preferences or special requests"
            {...register("specialRequest")}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-teal-600 text-white hover:bg-teal-700"
          disabled={isPending}
        >
          {isPending ? "Sending request..." : "Submit Booking Request"}
        </Button>

        {success && <p className="text-sm text-teal-600">{success}</p>}
        {error && <p className="text-sm text-rose-500">{error}</p>}
      </form>
    </div>
  );
}

