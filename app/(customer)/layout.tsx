import CartSheet from "@/app/components/cart/CartSheet";
import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/navigation/Navigation";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { CartProvider } from "@/app/context/CartContext";
import { FavoritesProvider } from "@/app/context/FavoritesContext";
import { SidebarProvider } from "@/app/context/SidebarContext";
import { getRestaurantConfig } from "@/lib/queries";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const config = await getRestaurantConfig();
  return (
    <SidebarProvider>
      <CartProvider>
        <FavoritesProvider>
          <Navigation />
          <Sidebar config={config} />
          <CartSheet />
          <div className="flex-1 font-sans">
            {children}
          </div>
          <Footer />
        </FavoritesProvider>
      </CartProvider>
    </SidebarProvider>
  );
}
