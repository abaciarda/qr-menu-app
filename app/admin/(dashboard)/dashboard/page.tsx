import { getDashboardStats, getCategoryBreakdown } from "@/lib/queries";
import { getRestaurantConfig } from "@/lib/queries";
import DashboardContent from "./DashboardContent";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [stats, categoryBreakdown, config] = await Promise.all([
    getDashboardStats(),
    getCategoryBreakdown(),
    getRestaurantConfig(),
  ]);

  const categoryMap = new Map(
    categoryBreakdown.map((cat) => [cat.id, cat.name])
  );

  return (
    <DashboardContent
      stats={stats}
      categoryBreakdown={categoryBreakdown}
      config={config}
      categoryMap={categoryMap}
    />
  );
}
