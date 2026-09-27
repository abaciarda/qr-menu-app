"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Filter, Edit2, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductItem } from "@/lib/types";
import { deleteProduct, toggleProductStockAction } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/context";

type ProductWithCategory = ProductItem & { categoryName: string };

export default function ProductsContentPage({
  initialProducts,
}: {
  initialProducts: ProductWithCategory[];
}) {
  const router = useRouter();
  const { t, getLocalized } = useLanguage();
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPending, startTransition] = useTransition();
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const categoryNames = Array.from(
    new Set(products.map((p) => getLocalized(p.categoryName)))
  ).sort();
  const CATEGORIES = ["All", ...categoryNames];

  const handleToggleAvailability = (id: number, current: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isAvailable: !current } : p))
    );
    startTransition(async () => {
      const result = await toggleProductStockAction(id, !current);
      if (!result.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isAvailable: current } : p))
        );
        toast.error(result.error ?? "Failed to update stock status.");
      } else {
        toast.success(`Product ${!current ? "enabled" : "disabled"} successfully.`);
      }
    });
  };

  const handleDeleteProduct = (id: number) => {
    setDeleteProductId(id);
  };

  const confirmDeleteProduct = () => {
    if (!deleteProductId) return;

    setProducts((prev) => prev.filter((p) => p.id !== deleteProductId));
    startTransition(async () => {
      const result = await deleteProduct(deleteProductId);
      if (!result.success) {
        router.refresh();
        toast.error(result.error ?? "Failed to delete product.");
      } else {
        toast.success(t("products.deletedSuccess", "Product deleted successfully."));
      }
      setDeleteProductId(null);
    });
  };

  const filteredProducts = products.filter((p) => {
    const localizedName = getLocalized(p.name);
    const localizedDesc = getLocalized(p.description);
    const localizedCat = getLocalized(p.categoryName);

    const matchesSearch =
      localizedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      localizedDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || localizedCat === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-heading">
            {t("products.title", "Products & Menu Catalog")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("products.subtitle", "Manage menu items, prices, descriptions, and live stock availability toggles")}
          </p>
        </div>

        <Button render={<Link href="/admin/products/new" />} className="rounded-xl">
          <Plus className="h-4 w-4 mr-1.5" />
          {t("products.addProduct", "Add New Product")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("products.searchPlaceholder", "Search products by name or description...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1.5 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5" /> {t("common.filter", "Category")}:
            </span>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="xs"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-lg shrink-0"
              >
                {cat === "All" ? t("common.all", "All") : cat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                {t("common.products", "Product Catalog")} ({filteredProducts.length})
              </CardTitle>
              <CardDescription className="text-xs">
                {t("products.subtitle", "Toggle switch to immediately show or hide items on customer menu")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">{t("products.image", "Item")}</TableHead>
                <TableHead>{t("products.productName", "Product Name")}</TableHead>
                <TableHead>{t("products.category", "Category")}</TableHead>
                <TableHead>{t("products.price", "Price")}</TableHead>
                <TableHead>{t("products.availability", "Stock Status")}</TableHead>
                <TableHead className="text-right">{t("common.actions", "Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    {t("products.noProductsFound", "No products found matching your search or category filter.")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className={isPending ? "opacity-70" : ""}>
                    <TableCell>
                      <div className="size-10 rounded-lg overflow-hidden relative bg-muted shrink-0">
                        <Image
                          src={product.image}
                          alt={getLocalized(product.name)}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="max-w-xs">
                      <p className="font-medium text-sm truncate">{getLocalized(product.name)}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {getLocalized(product.description)}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{getLocalized(product.categoryName)}</Badge>
                    </TableCell>

                    <TableCell className="font-mono font-semibold text-sm">
                      ${product.price.toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={product.isAvailable}
                          onCheckedChange={() =>
                            handleToggleAvailability(product.id, product.isAvailable)
                          }
                          disabled={isPending}
                        />
                        <span className="text-xs font-medium">
                          {product.isAvailable ? (
                            <span className="text-foreground inline-flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" /> {t("common.available", "In Stock")}
                            </span>
                          ) : (
                            <span className="text-destructive inline-flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" /> {t("common.unavailable", "Hidden")}
                            </span>
                          )}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          render={<Link href={`/admin/products/${product.id}/edit`} />}
                          variant="ghost"
                          size="icon-sm"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={isPending}
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteProductId !== null} onOpenChange={() => setDeleteProductId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("products.deleteProduct", "Delete Product")}</DialogTitle>
            <DialogDescription>
              {t("products.confirmDeleteMessage", "Are you sure you want to delete this product? This action cannot be undone.")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteProductId(null)}>
              {t("common.cancel", "Cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProduct} disabled={isPending}>
              {isPending ? t("common.loading", "Deleting...") : t("common.delete", "Delete Product")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
