"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import image from "next/image";
import { useForm } from "react-hook-form";

export default function Home() {
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <div className="container mx-auto flex gap-4">
        <form
          className="flex flex-col gap-2 w-1/4"
          onSubmit={handleSubmit(async (formData) => {
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <Label htmlFor="prompt">Prompt</Label>
          <Input id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span>This field is required</span>}
          <input type="submit" />
        </form>

        <section>
          <h2>Recent Sketches</h2>
          <div className="grid grid-cols-4 gap-4">
            {sketchesQuery?.map((sketch) => (
              <Image
                key={sketch._id}
                width="256"
                height="256"
                src={sketch.result}
                alt="sketch"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
