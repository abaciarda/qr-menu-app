"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { CheckCircle2, Phone, Save, Store, Wifi } from "lucide-react";
import { useState } from "react";

const CURRENCIES = [
  { value: "₺", label: "₺ (Turkish Lira)" },
  { value: "$", label: "$ (USD)" },
  { value: "€", label: "€ (Euro)" },
  { value: "£", label: "£ (British Pound)" },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("Atlas Restaurant & Lounge");
  const [description, setDescription] = useState(
    "Selecting Mediterranean & Aegean flavors, artisan coffee, and signature cocktails."
  );
  const [logo, setLogo] = useState(
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
  );
  const [wifiName, setWifiName] = useState("Atlas_Guest_5G");
  const [wifiPassword, setWifiPassword] = useState("AtlasKarakoy2026");
  const [phone, setPhone] = useState("+90 (212) 245 80 90");
  const [whatsappNumber, setWhatsappNumber] = useState("905321234567");
  const [address, setAddress] = useState(
    "Rihtim Street No: 42/A, Karakoy, Beyoglu / Istanbul"
  );
  const [googleMapsUrl, setGoogleMapsUrl] = useState(
    "https://maps.google.com/?q=Karakoy+Istanbul"
  );
  const [instagramUrl, setInstagramUrl] = useState(
    "https://instagram.com/atlasrestauranttr"
  );
  const [currencySymbol, setCurrencySymbol] = useState("₺");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
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

        <Button onClick={handleSubmit} disabled={loading} className="rounded-xl min-w-[140px]">
          {loading ? (
            "Saving..."
          ) : saved ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Saved!
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Save className="h-4 w-4" /> Save Settings
            </span>
          )}
        </Button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> Restaurant settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">
                General Store Identity
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Basic details displayed on the digital menu header and sidebar
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-2 gap-x-6">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Restaurant Name</Label>
                <Input
                  id="store-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-10 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-desc">Description / Tagline</Label>
                <textarea
                  id="store-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-20 w-full rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Store Logo / Header Photo</Label>
              <ImageUpload value={logo} onChange={setLogo} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">
                Guest Wi-Fi Network
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Credentials displayed in the customer sidebar for fast Wi-Fi connectivity
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wifi-ssid">Wi-Fi Network Name (SSID)</Label>
                <Input
                  id="wifi-ssid"
                  placeholder="e.g. Atlas_Guest_5G"
                  value={wifiName}
                  onChange={(e) => setWifiName(e.target.value)}
                  className="h-10 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wifi-pass">Wi-Fi Password</Label>
                <Input
                  id="wifi-pass"
                  type="text"
                  placeholder="e.g. AtlasKarakoy2026"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="h-10 rounded-xl font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">
                Contact & Regional Settings
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Currency formatting and customer support links
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Support Number</Label>
                <Input
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="905321234567"
                  className="h-10 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Currency Symbol</Label>
                <Select
                  value={currencySymbol}
                  onValueChange={setCurrencySymbol}
                  options={CURRENCIES}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insta">Instagram Handle / URL</Label>
                <Input
                  id="insta"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="h-10 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maps">Google Maps Location URL</Label>
              <Input
                id="maps"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading} size="lg" className="rounded-xl px-8">
            {loading ? "Saving Settings..." : "Save All Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
