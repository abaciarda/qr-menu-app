"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUploadCloudinary from "@/components/ui/image-upload-cloudinary";
import { useForm } from "react-hook-form";
import { CreateProductFormValues, CreateProductInput, createProductSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductAction, getCategoriesAction } from "../actions";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<CreateProductFormValues, unknown, CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      categoryId: 1,
      price: 0.0,
      description: "",
      image: "",
      isAvailable: true,
      sortOrder: 0,
    },
  });

  useEffect(() => {
    getCategoriesAction().then((res) => {
      if (res.success) {
        const loadedCategories = res.categories as { id: number; name: string }[];
        setCategories(loadedCategories);
        if (loadedCategories.length > 0) {
          setValue("categoryId", loadedCategories[0].id);
        }
      }
    });
  }, []);

  const watchCategory = watch("categoryId");
  const watchIsAvailable = watch("isAvailable");

  const onSubmit = async (data: CreateProductInput) => {
    if (!data.image) {
      toast.error('Product photo is required');
      return;
    }

    const result = await createProductAction(data);
    if (!result.success) {
      toast.error(result.error || "Failed to create product.");
      return;
    }
    toast.success("Product created successfully!");
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Products Catalog
          </Link>
          <h1 className="text-2xl font-bold tracking-tight font-heading flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" /> Create New Menu Product
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button render={<Link href="/admin/products" />} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Save Product"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" {...register("name")} className="h-11 rounded-xl" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description & Ingredients *</Label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                  className="w-full rounded-xl border bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.description && (
                  <p className="text-xs text-destructive">{errors.description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">Category & Price</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  {categories.length === 0 ? (
                    <div className="h-11 rounded-xl border bg-muted/30 animate-pulse" />
                  ) : (
                    <Select
                      value={String(watchCategory)}
                      onValueChange={(val) => setValue("categoryId", Number(val))}
                      options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
                    />
                  )}
                  {errors.categoryId && (
                    <p className="text-xs text-destructive">{errors.categoryId.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price")}
                    className="h-11 rounded-xl font-mono"
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive">{errors.price.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">Stock Availability</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <Label htmlFor="isAvailable" className="cursor-pointer font-medium">
                  In Stock
                </Label>
                <p className="text-xs text-muted-foreground">
                  Toggle off to hide item from customer QR menu
                </p>
              </div>
              <Switch
                id="isAvailable"
                checked={watchIsAvailable}
                onCheckedChange={(val) => setValue("isAvailable", val)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">Product Photo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ImageUploadCloudinary
                value={watch("image") || ""}
                onChange={(url) => setValue("image", url)}
                disabled={isSubmitting}
              />
              {errors.image && (
                <p className="text-xs text-destructive mt-2">{errors.image.message}</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-xl">
                {isSubmitting ? "Creating..." : "Publish Product"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

