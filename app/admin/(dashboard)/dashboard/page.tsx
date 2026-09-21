import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategories, getRestaurantConfig } from "@/lib/queries";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Phone,
  Plus,
  Settings,
  Utensils,
  Wifi,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: 14.5,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Smoky Bacon BBQ Burger",
    category: "Burgers",
    price: 16.5,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Truffle Mushroom Pizza",
    category: "Pizzas",
    price: 22.0,
    isAvailable: false,
  },
  {
    id: 4,
    name: "Margherita Supreme",
    category: "Pizzas",
    price: 18.0,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Iced Caramel Macchiato",
    category: "Beverages",
    price: 6.5,
    isAvailable: true,
  },
  {
    id: 6,
    name: "San Sebastian Cheesecake",
    category: "Desserts",
    price: 9.0,
    isAvailable: false,
  },
];

export default async function AdminDashboardPage() {
  const [dbCategories, config] = await Promise.all([
    getCategories(),
    getRestaurantConfig(),
  ]);

  const categories =
    dbCategories && dbCategories.length > 0
      ? dbCategories
      : [
          { id: "1", name: "Burgers", slug: "burgers" },
          { id: "2", name: "Pizzas", slug: "pizzas" },
          { id: "3", name: "Beverages", slug: "beverages" },
          { id: "4", name: "Desserts", slug: "desserts" },
        ];

  const totalProducts = MOCK_PRODUCTS.length;
  const inStockProducts = MOCK_PRODUCTS.filter((p) => p.isAvailable).length;
  const outOfStockProducts = MOCK_PRODUCTS.filter((p) => !p.isAvailable);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight font-heading">
              {config?.name || "Atlas Restaurant & Lounge"}
            </h1>
            <Badge variant="outline" className="text-xs">
              Live QR Menu
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Menu catalog overview, product stock availability, and store identity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button render={<Link href="/" target="_blank" />} variant="outline" className="rounded-xl">
            <ExternalLink className="h-4 w-4 mr-1.5" /> View Public QR Menu
          </Button>

          <Button render={<Link href="/admin/products/new" />} className="rounded-xl">
            <Plus className="h-4 w-4 mr-1.5" /> Add New Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
              Total Products
            </CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active catalog menu items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
              Active Categories
            </CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{categories.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Organized customer sections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
              In Stock Items
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{inStockProducts}</div>
            <p className="text-xs text-emerald-500 font-medium mt-1">
              {Math.round((inStockProducts / totalProducts) * 100)}% available to order
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
              Hidden / Out of Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">
              {outOfStockProducts.length}
            </div>
            <p className="text-xs text-amber-500 font-medium mt-1">
              Toggled off from menu
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {outOfStockProducts.length > 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-base font-semibold">
                    Stock Attention Needed ({outOfStockProducts.length})
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  The following items are currently toggled hidden on the digital QR menu.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {outOfStockProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border bg-card text-xs"
                  >
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <span className="text-muted-foreground">{item.category} • ${item.price.toFixed(2)}</span>
                    </div>
                    <Button render={<Link href="/admin/products" />} size="sm" variant="outline" className="rounded-lg">
                      Manage Stock
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Category Breakdown
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Distribution of products across menu sections
                  </CardDescription>
                </div>
                <Button render={<Link href="/admin/categories" />} size="sm" variant="ghost">
                  View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const catProducts = MOCK_PRODUCTS.filter(
                    (p) => p.category.toLowerCase() === cat.name.toLowerCase()
                  );
                  return (
                    <div
                      key={cat.id}
                      className="p-4 rounded-xl border bg-muted/20 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-sm">{cat.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {catProducts.length > 0
                            ? `${catProducts.length} items`
                            : "Catalog items"}
                        </p>
                      </div>
                      <Badge variant="secondary" className="rounded-lg">
                        Active
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" /> Store Quick Info
                </CardTitle>
                <Button render={<Link href="/admin/settings" />} size="icon-sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
              <div>
                <p className="text-muted-foreground font-mono uppercase">Guest Wi-Fi</p>
                <p className="font-semibold text-sm mt-0.5">
                  {config?.wifiName || "Atlas_Guest_5G"}
                </p>
                <p className="text-muted-foreground font-mono text-[11px] mt-0.5">
                  Pass: {config?.wifiPassword || "AtlasKarakoy2026"}
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-muted-foreground font-mono uppercase">Contact Phone</p>
                <p className="font-semibold text-sm mt-0.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  {config?.phone || "+90 (212) 245 80 90"}
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-muted-foreground font-mono uppercase">Address</p>
                <p className="text-muted-foreground leading-relaxed mt-0.5">
                  {config?.address || "Rihtim Street No: 42/A, Karakoy, Beyoglu / Istanbul"}
                </p>
              </div>

              <div className="pt-2">
                <Button render={<Link href="/admin/settings" />} variant="outline" className="w-full rounded-xl">
                  Edit Store Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
