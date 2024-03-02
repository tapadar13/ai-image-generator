"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchesQuery = useQuery(api.sketches.getSketches);

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

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
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <Label htmlFor="prompt">Prompt</Label>
          <Input id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span>This field is required</span>}

          <Label className="mt-4">Canvas (Draw something below)</Label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: 256, height: 256 }}
            strokeWidth={4}
            strokeColor="black"
          />
          <Button type="submit">Submit</Button>
        </form>

        <section>
          <h2>Recent Sketches</h2>
          <div className="grid grid-cols-4 gap-4">
            {sortedSketches?.map((sketch) => (
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
