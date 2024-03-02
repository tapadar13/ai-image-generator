"use client";

import { useForm } from "react-hook-form";

export default function Home() {
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
            console.log(formData);
          })}
        >
          <input {...register("prompt", { required: true })} />
          {errors.prompt && <span>This field is required</span>}
          <input type="submit" />
        </form>
      </div>
    </main>
  );
}
