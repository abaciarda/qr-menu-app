import { getRestaurantConfig } from "@/lib/queries";
import SettingsContent from "./SettingsContent";

export default async function SettingsPage() {
  const config = await getRestaurantConfig();

  return <SettingsContent initialConfig={config} />;
}
