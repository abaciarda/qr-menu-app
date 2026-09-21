"use client";

import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: 14.5,
    description: "180g Angus beef patty, sharp cheddar, fresh lettuce, tomato, pickles & house sauce",
    image: "/images/categories/burger.png",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Smoky Bacon & BBQ Burger",
    category: "Burgers",
    price: 16.5,
    description: "Double smoked bacon, crispy onion rings, smoked gouda & bourbon BBQ marinade",
    image: "/images/categories/burger.png",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Truffle Mushroom Pizza",
    category: "Pizzas",
    price: 22.0,
    description: "Wild portobello, mozzarella di bufala, fresh thyme & white truffle oil drip",
    image: "/images/categories/burger.png",
    isAvailable: false,
  },
  {
    id: 4,
    name: "Margherita Supreme",
    category: "Pizzas",
    price: 18.0,
    description: "San Marzano tomato passata, fresh basil leaves & extra virgin olive oil",
    image: "/images/categories/burger.png",
    isAvailable: true,
  },
  {
    id: 5,
    name: "Iced Caramel Macchiato",
    category: "Beverages",
    price: 6.5,
    description: "Espresso, cold milk, vanilla syrup topped with handmade caramel drizzle",
    image: "/images/categories/burger.png",
    isAvailable: true,
  },
  {
    id: 6,
    name: "San Sebastian Cheesecake",
    category: "Desserts",
    price: 9.0,
    description: "Burnt Basque cheesecake served with warm Belgian dark chocolate syrup",
    image: "/images/categories/burger.png",
    isAvailable: false,
  },
];

const CATEGORIES = ["All", "Burgers", "Pizzas", "Beverages", "Desserts"];

export default function ProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleToggleAvailability = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-heading">
            Products & Menu Catalog
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage menu items, prices, descriptions, and live stock availability toggles
          </p>
        </div>

        <Button render={<Link href="/admin/products/new" />} className="rounded-xl">
          <Plus className="h-4 w-4 mr-1.5" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1.5 flex items-center gap-1 shrink-0">
              <Filter className="h-3.5 w-3.5" /> Category:
            </span>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="xs"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-lg shrink-0"
              >
                {cat}
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
                Product Catalog ({filteredProducts.length})
              </CardTitle>
              <CardDescription className="text-xs">
                Toggle switch to immediately show or hide items on customer menu
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Item</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No products found matching your search or category filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="size-10 rounded-lg overflow-hidden relative bg-muted shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="max-w-xs">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>

                    <TableCell className="font-mono font-semibold text-sm">
                      ${product.price.toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={product.isAvailable}
                          onCheckedChange={() => handleToggleAvailability(product.id)}
                        />
                        <span className="text-xs font-medium">
                          {product.isAvailable ? (
                            <span className="text-foreground inline-flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" /> In Stock
                            </span>
                          ) : (
                            <span className="text-destructive inline-flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" /> Hidden
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
    </div>
  );
}
