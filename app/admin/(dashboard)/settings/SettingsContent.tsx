"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectOption } from "@/components/ui/select";
import { Phone, Save, Store, Wifi, QrCode, Download } from "lucide-react";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    UpdateRestaurantConfigFormValues,
    UpdateRestaurantConfigInput,
    updateRestaurantConfigSchema,
} from "@/lib/validations/settings";
import { updateRestaurantConfigAction } from "./actions";
import { generateQRCode, downloadQRCode } from "@/lib/utils/qr";
import ImageUploadCloudinary from "@/components/ui/image-upload-cloudinary";

const CURRENCIES: SelectOption[] = [
    { value: "₺", label: "₺ (Turkish Lira)" },
    { value: "$", label: "$ (USD)" },
    { value: "€", label: "€ (Euro)" },
    { value: "£", label: "£ (British Pound)" },
];

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

export default function SettingsContent({
    initialConfig,
}: {
    initialConfig: RestaurantConfig;
}) {
    const [isPending, startTransition] = useTransition();
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [isGeneratingQR, setIsGeneratingQR] = useState(false);

    useEffect(() => {
        const generateQR = async () => {
            setIsGeneratingQR(true);
            try {
                const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
                const qrDataUrl = await generateQRCode(appUrl);
                setQrCodeUrl(qrDataUrl);
            } catch (error) {
                console.error('Failed to generate QR code:', error);
            } finally {
                setIsGeneratingQR(false);
            }
        };

        generateQR();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<UpdateRestaurantConfigFormValues, unknown, UpdateRestaurantConfigInput>({
        resolver: zodResolver(updateRestaurantConfigSchema),
        defaultValues: {
            name: initialConfig.name || "",
            description: initialConfig.description || "",
            logo: initialConfig.logo || "",
            phone: initialConfig.phone || "",
            whatsappNumber: initialConfig.whatsappNumber || "",
            address: initialConfig.address || "",
            googleMapsUrl: initialConfig.googleMapsUrl || "",
            instagramUrl: initialConfig.instagramUrl || "",
            wifiName: initialConfig.wifiName || "",
            wifiPassword: initialConfig.wifiPassword || "",
            currencySymbol: initialConfig.currencySymbol || "₺",
        },
    });

    const onSubmit = async (inputData: UpdateRestaurantConfigInput) => {
        const data = {
            ...inputData,
            logo: inputData.logo || initialConfig.logo || '',
        };

        startTransition(async () => {
            const result = await updateRestaurantConfigAction(data);
            if (!result.success) {
                toast.error(result.error ?? "Failed to update settings.");
                return;
            }
            toast.success("Restaurant settings updated successfully!");
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-heading">
                        Store & Wi-Fi Settings
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Configure restaurant identity, customer Wi-Fi access, contacts, and currency
                    </p>
                </div>

                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting || isPending}
                    className="rounded-xl min-w-[140px]"
                >
                    {isSubmitting || isPending ? (
                        "Saving..."
                    ) : (
                        <span className="flex items-center gap-1.5">
                            <Save className="h-4 w-4" /> Save Settings
                        </span>
                    )}
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader className="pb-3 border-b">
                        <div className="flex items-center gap-2">
                            <Store className="h-4 w-4 text-primary" />
                            <CardTitle className="text-base font-semibold">
                                Store Identity
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="store-name">Restaurant Name</Label>
                                <Input
                                    id="store-name"
                                    {...register("name")}
                                    className="h-10 rounded-xl"
                                />
                                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="store-desc">Description / Tagline</Label>
                                <textarea
                                    id="store-desc"
                                    rows={3}
                                    {...register("description")}
                                    className="min-h-20 w-full rounded-xl border bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Store Logo</Label>
                            <ImageUploadCloudinary
                                value={watch("logo") || ""}
                                onChange={(url) => setValue("logo", url)}
                                disabled={isSubmitting || isPending}
                            />
                            {errors.logo && <p className="text-xs text-destructive">{errors.logo.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-center gap-2">
                                    <Wifi className="h-4 w-4 text-primary" />
                                    <CardTitle className="text-base font-semibold">
                                        Guest Wi-Fi
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
                                    <Input
                                        id="wifi-ssid"
                                        placeholder="e.g. Atlas_Guest_5G"
                                        {...register("wifiName")}
                                        className="h-10 rounded-xl"
                                    />
                                    {errors.wifiName && <p className="text-xs text-destructive">{errors.wifiName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="wifi-pass">Password</Label>
                                    <Input
                                        id="wifi-pass"
                                        type="text"
                                        placeholder="e.g. AtlasKarakoy2026"
                                        {...register("wifiPassword")}
                                        className="h-10 rounded-xl font-mono"
                                    />
                                    {errors.wifiPassword && <p className="text-xs text-destructive">{errors.wifiPassword.message}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <CardTitle className="text-base font-semibold">
                                        Contact Info
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            {...register("phone")}
                                            className="h-10 rounded-xl"
                                        />
                                        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="whatsapp">WhatsApp</Label>
                                        <Input
                                            id="whatsapp"
                                            {...register("whatsappNumber")}
                                            placeholder="905321234567"
                                            className="h-10 rounded-xl font-mono"
                                        />
                                        {errors.whatsappNumber && <p className="text-xs text-destructive">{errors.whatsappNumber.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select
                                        value={watch("currencySymbol") ?? "₺"}
                                        onValueChange={(value) => setValue("currencySymbol", value)}
                                        options={CURRENCIES}
                                        placeholder="Select currency..."
                                    />
                                    <input type="hidden" id="currency" {...register("currencySymbol")} />
                                    {errors.currencySymbol && <p className="text-xs text-destructive">{errors.currencySymbol.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="insta">Instagram</Label>
                                    <Input
                                        id="insta"
                                        {...register("instagramUrl")}
                                        className="h-10 rounded-xl"
                                    />
                                    {errors.instagramUrl && <p className="text-xs text-destructive">{errors.instagramUrl.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        {...register("address")}
                                        className="h-10 rounded-xl"
                                    />
                                    {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="maps">Google Maps URL</Label>
                                    <Input
                                        id="maps"
                                        {...register("googleMapsUrl")}
                                        className="h-10 rounded-xl"
                                    />
                                    {errors.googleMapsUrl && <p className="text-xs text-destructive">{errors.googleMapsUrl.message}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="h-max">
                        <CardHeader className="pb-3 border-b">
                            <div className="flex items-center gap-2">
                                <QrCode className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base font-semibold">
                                    QR Menu Code
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-center bg-white p-6 rounded-xl border">
                                {isGeneratingQR ? (
                                    <div className="size-40 flex items-center justify-center bg-muted/20 rounded-lg animate-pulse">
                                        <span className="text-sm text-muted-foreground">Generating...</span>
                                    </div>
                                ) : qrCodeUrl ? (
                                    <img
                                        src={qrCodeUrl}
                                        alt="QR Menu Code"
                                        className="size-40"
                                    />
                                ) : (
                                    <div className="size-40 flex items-center justify-center bg-muted/20 rounded-lg">
                                        <span className="text-sm text-muted-foreground">Failed to generate</span>
                                    </div>
                                )}
                            </div>
                            <Button
                                onClick={() => {
                                    if (qrCodeUrl) {
                                        downloadQRCode(qrCodeUrl, 'qr-menu.png');
                                        toast.success('QR code downloaded successfully!');
                                    }
                                }}
                                disabled={!qrCodeUrl || isGeneratingQR}
                                className="w-full rounded-xl"
                            >
                                <Download className="h-4 w-4 mr-2" /> Download QR Code
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
