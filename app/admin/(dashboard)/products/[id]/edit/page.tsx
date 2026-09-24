import { getProductById } from "@/lib/queries/product"
import EditProductForm from "./EditProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if(!product) notFound();

  return (
    <EditProductForm product={ product } />
  )
}