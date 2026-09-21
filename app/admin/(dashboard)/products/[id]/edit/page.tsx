"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, Edit3, CheckCircle2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CATEGORIES = [
  { value: "Burgers", label: "Burgers" },
  { value: "Pizzas", label: "Pizzas" },
  { value: "Beverages", label: "Beverages" },
  { value: "Desserts", label: "Desserts" },
  { value: "Starters", label: "Starters & Appetizers" },
];

const AVAILABLE_PAIRINGS = [
  { id: "1", name: "Crispy French Fries", price: "$4.50" },
  { id: "2", name: "Truffle Garlic Mayo Dip", price: "$2.00" },
  { id: "3", name: "Iced Caramel Macchiato", price: "$6.50" },
  { id: "4", name: "San Sebastian Cheesecake", price: "$9.00" },
  { id: "5", name: "Onion Rings Basket", price: "$5.00" },
];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("Classic Cheeseburger");
  const [category, setCategory] = useState("Burgers");
  const [price, setPrice] = useState("14.50");
  const [image, setImage] = useState("/images/categories/burger.png");
  const [description, setDescription] = useState(
    "180g Angus beef patty, sharp cheddar, fresh lettuce, tomato, pickles & house sauce"
  );
  const [isAvailable, setIsAvailable] = useState(true);
  const [isChefSpecial, setIsChefSpecial] = useState(true);
  const [selectedPairings, setSelectedPairings] = useState<string[]>(["1", "2"]);

  const togglePairing = (id: string) => {
    setSelectedPairings((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    setLoading(true);
    setSaved(false);

    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        router.push("/admin/products");
      }, 600);
    }, 500);
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
            <Edit3 className="h-6 w-6 text-primary" /> Edit Menu Product #{resolvedParams.id}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update pricing, ingredients description, photo, and cross-sell pairings
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
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl min-w-[140px]"
          >
            {loading ? (
              "Saving..."
            ) : saved ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Saved!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save className="h-4 w-4" /> Save Changes
              </span>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <Label htmlFor="product-name">Product Name *</Label>
                <Input
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-desc">Description & Ingredients</Label>
                <textarea
                  id="product-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Category & Pricing
              </CardTitle>
              <CardDescription className="text-xs">
                Organize menu classification and set selling price
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category Selection *</Label>
                  <Select
                    value={category}
                    onValueChange={setCategory}
                    options={CATEGORIES}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-price">Price ($) *</Label>
                  <Input
                    id="product-price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="h-11 rounded-xl font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Recommended Pairings ("Goes Well With")
              </CardTitle>
              <CardDescription className="text-xs">
                Cross-sell add-on items displayed inside customer product popups
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_PAIRINGS.map((item) => {
                  const isSelected = selectedPairings.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePairing(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-xs text-foreground">{item.name}</p>
                        <p className="text-[11px] font-mono text-muted-foreground">{item.price}</p>
                      </div>
                      <div
                        className={`size-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border"
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Stock & Menu Visibility
              </CardTitle>
              <CardDescription className="text-xs">
                Control item availability on customer mobile devices
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="stock-switch" className="cursor-pointer font-medium">
                    Available in Stock
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    When toggled off, this product is immediately hidden from the menu
                  </p>
                </div>
                <Switch
                  id="stock-switch"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <Label htmlFor="special-switch" className="cursor-pointer font-medium flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Highlight as Chef Special
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Adds a featured badge to catch customer attention
                  </p>
                </div>
                <Switch
                  id="special-switch"
                  checked={isChefSpecial}
                  onCheckedChange={setIsChefSpecial}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold">
                Product Image
              </CardTitle>
              <CardDescription className="text-xs">
                Upload a high resolution photo for the QR menu card
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ImageUpload value={image} onChange={setImage} />
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-6 space-y-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-medium"
              >
                {loading ? "Saving..." : "Save Product Changes"}
              </Button>

              <Button
                type="button"
                render={<Link href="/admin/products" />}
                variant="outline"
                className="w-full h-10 rounded-xl"
              >
                Cancel & Return
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
