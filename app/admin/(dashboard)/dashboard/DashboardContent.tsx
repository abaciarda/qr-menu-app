"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
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

type DashboardStats = {
    totalProducts: number;
    totalCategories: number;
    inStockCount: number;
    outOfStockCount: number;
    outOfStockProducts: Array<{
        id: number;
        name: string;
        categoryId: number;
        price: number;
        image: string;
    }>;
    recentProducts: Array<{
        id: number;
        name: string;
        categoryId: number;
        price: number;
        image: string;
        createdAt: Date;
    }>;
};

type CategoryBreakdown = Array<{
    id: number;
    name: string;
    slug: string;
    image: string;
    productCount: number;
}>;

type RestaurantConfig = {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    phone: string | null;
    whatsappNumber: string | null;
    address: string | null;
    googleMapsUrl: string | null;
    instagramUrl: string | null;
    wifiName: string | null;
    wifiPassword: string | null;
    currencySymbol: string;
};

type CategoryMap = Map<number, string>;

export default function DashboardContent({
    stats,
    categoryBreakdown,
    config,
    categoryMap,
}: {
    stats: DashboardStats;
    categoryBreakdown: CategoryBreakdown;
    config: RestaurantConfig;
    categoryMap: CategoryMap;
}) {
    const { totalProducts, totalCategories, inStockCount, outOfStockCount, outOfStockProducts } = stats;
    const stockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;

    const getCategoryName = (categoryId: number) => categoryMap.get(categoryId) ?? "Unknown";

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
                        <div className="text-2xl font-bold font-heading">{totalCategories}</div>
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
                        <div className="text-2xl font-bold font-heading">{inStockCount}</div>
                        <p className="text-xs text-emerald-500 font-medium mt-1">
                            {stockPercentage}% available to order
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
                            {outOfStockCount}
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
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg overflow-hidden relative bg-muted shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{item.name}</p>
                                                <span className="text-muted-foreground">
                                                    {getCategoryName(item.categoryId)} • ${item.price.toFixed(2)}
                                                </span>
                                            </div>
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
                                {categoryBreakdown.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="p-4 rounded-xl border bg-muted/20 flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-semibold text-sm">{cat.name}</p>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                {cat.productCount > 0
                                                    ? `${cat.productCount} items`
                                                    : "No items"}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="rounded-lg">
                                            Active
                                        </Badge>
                                    </div>
                                ))}
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
                                    {config?.wifiName || "Not configured"}
                                </p>
                                <p className="text-muted-foreground font-mono text-[11px] mt-0.5">
                                    Pass: {config?.wifiPassword || "Not configured"}
                                </p>
                            </div>

                            <div className="border-t pt-3">
                                <p className="text-muted-foreground font-mono uppercase">Contact Phone</p>
                                <p className="font-semibold text-sm mt-0.5 flex items-center gap-1.5">
                                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                    {config?.phone || "Not configured"}
                                </p>
                            </div>

                            <div className="border-t pt-3">
                                <p className="text-muted-foreground font-mono uppercase">Address</p>
                                <p className="text-muted-foreground leading-relaxed mt-0.5">
                                    {config?.address || "Not configured"}
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
