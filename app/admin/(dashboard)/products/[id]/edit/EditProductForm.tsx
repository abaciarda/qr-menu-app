"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Edit3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUploadCloudinary from "@/components/ui/image-upload-cloudinary";
import { ProductItem } from "@/lib/types";
import {
  updateProductSchema,
  UpdateProductInput,
  UpdateProductFormValues,
} from "@/lib/validations/product";
import {
  getCategoriesAction,
  updateProductAction,
} from "../../actions";
import { toast } from "sonner";

export default function EditProductForm({ product }: { product: ProductItem }) {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    getCategoriesAction().then((res) => {
      if (res.success) {
        setCategories(
          res.categories as { id: number; name: string }[]
        );
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductFormValues, unknown, UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      categoryId: String(product.categoryId),
      price: String(product.price),
      description: product.description ?? "",
      image: product.image,
      isAvailable: product.isAvailable,
      sortOrder: String(product.sortOrder),
    },
  });

  const watchCategoryId = watch("categoryId");
  const watchIsAvailable = watch("isAvailable");

  const onSubmit = async (data: UpdateProductInput) => {
    const finalData = {
      ...data,
      image: data.image || product.image,
    };

    const result = await updateProductAction(finalData);
    if (!result.success) {
      toast.error(result.error ?? "Failed to update product.");
      return;
    }
    toast.success("Product updated successfully!");
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
            <Edit3 className="h-6 w-6 text-primary" />
            Edit: {product.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update pricing, description, category, image, and availability
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/admin/products" />}
            variant="outline"
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="rounded-xl min-w-[140px]"
          >
            {isSubmitting ? "Saving..." : <span className="flex items-center gap-1.5">
                <Save className="h-4 w-4" /> Save Changes
              </span>}
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <input type="hidden" {...register("id", { valueAsNumber: true })} />

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                General Product Information
              </CardTitle>
              <CardDescription className="text-xs">
                Title and description displayed inside customer menu modals
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  {...register("name")}
                  className="h-11 rounded-xl"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">
                  Description &amp; Ingredients
                </Label>
                <textarea
                  id="edit-description"
                  rows={4}
                  {...register("description")}
                  className="w-full rounded-xl border bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Category &amp; Pricing
              </CardTitle>
              <CardDescription className="text-xs">
                Organize menu classification and set selling price
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  {categories.length === 0 ? (
                    <div className="h-11 rounded-xl border bg-muted/30 animate-pulse" />
                  ) : (
                    <Select
                      value={String(watchCategoryId)}
                      onValueChange={(val) =>
                        setValue("categoryId", Number(val))
                      }
                      options={categories.map((c) => ({
                        value: String(c.id),
                        label: c.name,
                      }))}
                    />
                  )}
                  {errors.categoryId && (
                    <p className="text-xs text-destructive">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    {...register("price")}
                    className="h-11 rounded-xl font-mono"
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-sort-order">Sort Order</Label>
                <Input
                  id="edit-sort-order"
                  type="number"
                  {...register("sortOrder")}
                  className="h-11 rounded-xl font-mono"
                />
                {errors.sortOrder && (
                  <p className="text-xs text-destructive">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Stock &amp; Menu Visibility
              </CardTitle>
              <CardDescription className="text-xs">
                Control item availability on customer mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="edit-is-available"
                    className="cursor-pointer font-medium"
                  >
                    Available in Stock
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    When toggled off, this product is immediately hidden from
                    the menu
                  </p>
                </div>
                <Switch
                  id="edit-is-available"
                  checked={watchIsAvailable ?? true}
                  onCheckedChange={(val) => setValue("isAvailable", val)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Product Photo
              </CardTitle>
              <CardDescription className="text-xs">
                Upload an image to Cloudinary storage
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ImageUploadCloudinary
                value={watch("image") || ""}
                onChange={(url) => setValue("image", url)}
                disabled={isSubmitting}
              />
              {errors.image && (
                <p className="text-xs text-destructive mt-2">
                  {errors.image.message}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-6 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl font-medium"
              >
                {isSubmitting ? "Saving..." : "Save Product Changes"}
              </Button>

              <Button
                type="button"
                render={<Link href="/admin/products" />}
                variant="outline"
                className="w-full h-10 rounded-xl"
              >
                Cancel &amp; Return
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
