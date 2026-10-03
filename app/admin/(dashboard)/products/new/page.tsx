"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";
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
import ImageUpload from "@/components/ui/image-upload";
import { MultilingualInput } from "@/components/ui/multilingual-input";
import { MultilingualTextarea } from "@/components/ui/multilingual-textarea";
import { useForm } from "react-hook-form";
import { CreateProductFormValues, CreateProductInput, createProductSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductAction, getCategoriesAction } from "../actions";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/context";

export default function NewProductPage() {
  const router = useRouter();
  const { t, getLocalized } = useLanguage();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const { handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<CreateProductFormValues, unknown, CreateProductInput>({
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
  }, [setValue]);

  const watchCategory = watch("categoryId");
  const watchIsAvailable = watch("isAvailable");
  const watchName = watch("name");
  const watchDesc = watch("description");

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
    toast.success(t("products.createdSuccess", "Product created successfully!"));
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
            <ArrowLeft className="h-3.5 w-3.5" /> {t("common.back", "Back to Products Catalog")}
          </Link>
          <h1 className="text-2xl font-bold tracking-tight font-heading flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" /> {t("products.addProduct", "Create New Menu Product")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button render={<Link href="/admin/products" />} variant="outline">
            {t("common.cancel", "Cancel")}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? t("common.loading", "Publishing...") : t("common.save", "Save Product")}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">{t("products.productName", "Product Information")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <MultilingualInput
                id="name"
                label={t("products.productName", "Product Name")}
                required
                value={watchName || ""}
                onChange={(val) => setValue("name", val)}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}

              <MultilingualTextarea
                id="description"
                label={t("products.description", "Description & Ingredients")}
                required
                value={watchDesc || ""}
                onChange={(val) => setValue("description", val)}
                rows={4}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">{t("products.category", "Category & Price")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("products.category", "Category")} *</Label>
                  {categories.length === 0 ? (
                    <div className="h-11 rounded-xl border bg-muted/30 animate-pulse" />
                  ) : (
                    <Select
                      value={String(watchCategory)}
                      onValueChange={(val) => setValue("categoryId", Number(val))}
                      options={categories.map((c) => ({ value: String(c.id), label: getLocalized(c.name) }))}
                    />
                  )}
                  {errors.categoryId && (
                    <p className="text-xs text-destructive">{errors.categoryId.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">{t("products.price", "Price")} *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    onChange={(e) => setValue("price", parseFloat(e.target.value) || 0)}
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
              <CardTitle className="text-base font-semibold">{t("products.availability", "Stock Availability")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <Label htmlFor="isAvailable" className="cursor-pointer font-medium">
                  {t("common.available", "In Stock")}
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
              <CardTitle className="text-base font-semibold">{t("products.image", "Product Photo")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ImageUpload
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
                {isSubmitting ? t("common.loading", "Creating...") : t("products.addProduct", "Publish Product")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
