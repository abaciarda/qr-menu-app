"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Layers, Sliders, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Burgers",
    slug: "burgers",
    image: "/images/categories/burger.png",
    productCount: 8,
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Pizzas",
    slug: "pizzas",
    image: "/images/categories/burger.png",
    productCount: 6,
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "Beverages",
    slug: "beverages",
    image: "/images/categories/burger.png",
    productCount: 12,
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    name: "Desserts",
    slug: "desserts",
    image: "/images/categories/burger.png",
    productCount: 4,
    sortOrder: 4,
    isActive: true,
  },
];

const INITIAL_OPTION_GROUPS = [
  {
    id: 1,
    categoryName: "Burgers",
    label: "Doneness Level",
    isRequired: true,
    options: ["Rare", "Medium", "Medium Well", "Well Done"],
  },
  {
    id: 2,
    categoryName: "Burgers",
    label: "Fries Choice",
    isRequired: false,
    options: ["Regular Fries", "Sweet Potato Fries (+$2.50)", "Onion Rings (+$3.00)"],
  },
  {
    id: 3,
    categoryName: "Beverages",
    label: "Milk Choice",
    isRequired: false,
    options: ["Whole Milk", "Oat Milk (+$0.80)", "Almond Milk (+$0.80)", "Lactose Free"],
  },
  {
    id: 4,
    categoryName: "Pizzas",
    label: "Crust Type",
    isRequired: true,
    options: ["Classic Thin Crust", "Stuffed Cheese Crust (+$3.00)", "Gluten Free"],
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [optionGroups, setOptionGroups] = useState(INITIAL_OPTION_GROUPS);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isOptionGroupDialogOpen, setIsOptionGroupDialogOpen] = useState(false);

  const [newCatName, setNewCatName] = useState("");
  const [newCatImage, setNewCatImage] = useState("/images/categories/burger.png");
  const [newCatSortOrder, setNewCatSortOrder] = useState("5");

  const [newGroupCat, setNewGroupCat] = useState("Burgers");
  const [newGroupLabel, setNewGroupLabel] = useState("");
  const [newGroupRequired, setNewGroupRequired] = useState(false);
  const [newGroupOptions, setNewGroupOptions] = useState("Rare, Medium, Well Done");

  const handleToggleCategory = (id: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCategory = {
      id: Date.now(),
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
      image: newCatImage || "/images/categories/burger.png",
      productCount: 0,
      sortOrder: parseInt(newCatSortOrder) || 5,
      isActive: true,
    };

    setCategories([...categories, newCategory]);
    setIsCategoryDialogOpen(false);
    setNewCatName("");
  };

  const handleAddOptionGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupLabel || !newGroupOptions) return;

    const parsedOptions = newGroupOptions.split(",").map((o) => o.trim()).filter(Boolean);

    const newGroup = {
      id: Date.now(),
      categoryName: newGroupCat,
      label: newGroupLabel,
      isRequired: newGroupRequired,
      options: parsedOptions,
    };

    setOptionGroups([...optionGroups, newGroup]);
    setIsOptionGroupDialogOpen(false);
    setNewGroupLabel("");
    setNewGroupOptions("Rare, Medium, Well Done");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-heading">
            Categories & Option Groups
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize digital menu slide categories and customer customization options
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setIsOptionGroupDialogOpen(true)}
            className="rounded-xl"
          >
            <Sliders className="h-4 w-4 mr-1.5" />
            Add Option Group
          </Button>
          <Button onClick={() => setIsCategoryDialogOpen(true)} className="rounded-xl">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight font-heading flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> Active Categories ({categories.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="overflow-hidden">
              <div className="h-32 relative bg-muted">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge variant={cat.isActive ? "default" : "secondary"}>
                    {cat.isActive ? "Active" : "Hidden"}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-bold text-lg leading-tight font-heading">{cat.name}</p>
                  <p className="text-xs text-white/80 font-mono">{cat.productCount} products</p>
                </div>
              </div>

              <CardContent className="p-4 flex items-center justify-between bg-card border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={cat.isActive}
                    onCheckedChange={() => handleToggleCategory(cat.id)}
                  />
                  <span className="text-xs text-muted-foreground font-medium">
                    {cat.isActive ? "Visible" : "Hidden"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-xs">
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sliders className="h-4 w-4 text-primary" /> Category Option Groups
              </CardTitle>
              <CardDescription className="text-xs">
                Options presented inside product popup modals for customer selections
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOptionGroupDialogOpen(true)}
              className="rounded-xl"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> New Group
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optionGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 rounded-xl border bg-muted/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {group.categoryName}
                    </span>
                    <h3 className="font-semibold text-base font-heading">{group.label}</h3>
                  </div>
                  <Badge variant={group.isRequired ? "destructive" : "outline"}>
                    {group.isRequired ? "Required" : "Optional"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.options.map((opt) => (
                    <span
                      key={opt}
                      className="px-2.5 py-1 rounded-lg border bg-background text-xs font-medium"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category section for your digital QR menu.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddCategory} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Category Name</Label>
              <Input
                id="cat-name"
                placeholder="e.g. Cocktails & Smoothies"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Category Image Photo</Label>
              <ImageUpload
                value={newCatImage}
                onChange={setNewCatImage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cat-sort">Sort Order Index</Label>
              <Input
                id="cat-sort"
                type="number"
                placeholder="1"
                value={newCatSortOrder}
                onChange={(e) => setNewCatSortOrder(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCategoryDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Category</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isOptionGroupDialogOpen} onOpenChange={setIsOptionGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Option Group</DialogTitle>
            <DialogDescription>
              Add selectable options to products in a category.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddOptionGroup} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Target Category</Label>
              <Select
                value={newGroupCat}
                onValueChange={setNewGroupCat}
                options={categories.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grp-label">Option Group Label</Label>
              <Input
                id="grp-label"
                placeholder="e.g. Spice Level"
                value={newGroupLabel}
                onChange={(e) => setNewGroupLabel(e.target.value)}
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grp-opts">Options (Comma separated)</Label>
              <Input
                id="grp-opts"
                placeholder="Mild, Medium, Hot, Extra Hot"
                value={newGroupOptions}
                onChange={(e) => setNewGroupOptions(e.target.value)}
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Switch
                id="grp-req"
                checked={newGroupRequired}
                onCheckedChange={setNewGroupRequired}
              />
              <Label htmlFor="grp-req" className="cursor-pointer">
                Required selection for customer
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOptionGroupDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Option Group</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
