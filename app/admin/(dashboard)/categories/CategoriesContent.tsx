"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Layers, Plus, Sliders, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ImageUploadCloudinary from "@/components/ui/image-upload-cloudinary";

import {
    CreateCategoryFormValues,
    CreateCategoryInput,
    createCategorySchema,
    CreateOptionGroupFormValues,
    CreateOptionGroupInput,
    createOptionGroupSchema,
    UpdateCategoryFormValues,
    UpdateCategoryInput,
    updateCategorySchema,
} from "@/lib/validations/category";
import {
    createCategoryAction,
    createOptionGroupAction,
    deleteCategoryAction,
    deleteOptionGroupAction,
    toggleCategoryAction,
    updateCategoryAction,
} from "./actions";

type CategoryRow = {
    id: number;
    name: string;
    slug: string;
    image: string;
    sortOrder: number;
    isActive: boolean;
    productCount: number;
};

type OptionGroupRow = {
    id: number;
    categoryId: number;
    label: string;
    isRequired: boolean;
    sortOrder: number;
    options: { id: number; label: string; sortOrder: number }[];
};

export default function CategoriesContent({
    initialCategories,
    initialOptionGroups,
}: {
    initialCategories: CategoryRow[];
    initialOptionGroups: OptionGroupRow[];
}) {
    const router = useRouter();
    const [categories, setCategories] = useState(initialCategories);
    const [optionGroups, setOptionGroups] = useState(initialOptionGroups);
    const [isPending, startTransition] = useTransition();

    const [isCreateCatOpen, setIsCreateCatOpen] = useState(false);
    const [isEditCatOpen, setIsEditCatOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null);
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
    const [deleteCatId, setDeleteCatId] = useState<number | null>(null);
    const [deleteGroupId, setDeleteGroupId] = useState<number | null>(null);

    const [createCatError, setCreateCatError] = useState<string | null>(null);
    const [editCatError, setEditCatError] = useState<string | null>(null);
    const [createGroupError, setCreateGroupError] = useState<string | null>(null);

    const {
        register: registerCreate,
        handleSubmit: handleCreateSubmit,
        reset: resetCreate,
        setValue: setValueCreate,
        watch: watchCreate,
        formState: { errors: createErrors, isSubmitting: isCreating },
    } = useForm<CreateCategoryFormValues, unknown, CreateCategoryInput>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: { name: "", image: "", sortOrder: 0 },
    });

    const onCreateCategory = async (data: CreateCategoryInput) => {
        setCreateCatError(null);

        if (!data.image) {
            setCreateCatError("Category image is required");
            return;
        }

        const result = await createCategoryAction(data);
        if (!result.success) {
            setCreateCatError(result.error ?? "Failed to create category.");
            return;
        }
        if (result.category) {
            setCategories((prev) => [...prev, result.category!]);
        }
        toast.success("Category created successfully!");
        resetCreate();
        setIsCreateCatOpen(false);
    };

    const {
        register: registerEdit,
        handleSubmit: handleEditSubmit,
        reset: resetEdit,
        setValue: setValueEdit,
        watch: watchEdit,
        formState: { errors: editErrors, isSubmitting: isEditing },
    } = useForm<UpdateCategoryFormValues, unknown, UpdateCategoryInput>({
        resolver: zodResolver(updateCategorySchema),
    });

    const openEditDialog = (cat: CategoryRow) => {
        setEditingCategory(cat);
        setEditCatError(null);
        resetEdit({
            id: cat.id,
            name: cat.name,
            image: cat.image,
            sortOrder: String(cat.sortOrder),
        });
        setIsEditCatOpen(true);
    };

    const onEditCategory = async (data: UpdateCategoryInput) => {
        setEditCatError(null);

        const finalData = {
            ...data,
            image: data.image || editingCategory?.image || '',
        };

        const result = await updateCategoryAction(finalData);
        if (!result.success) {
            setEditCatError(result.error ?? "Failed to update category.");
            return;
        }
        if (result.category) {
            const updated = result.category;
            setCategories((prev) =>
                prev.map((c) =>
                    c.id === updated.id
                        ? { ...c, name: updated.name, slug: updated.slug, image: updated.image, sortOrder: updated.sortOrder }
                        : c
                )
            );
        }
        toast.success("Category updated successfully!");
        setIsEditCatOpen(false);
        setEditingCategory(null);
    };

    const {
        register: registerGroup,
        handleSubmit: handleGroupSubmit,
        reset: resetGroup,
        setValue: setGroupValue,
        watch: watchGroup,
        formState: { errors: groupErrors, isSubmitting: isCreatingGroup },
    } = useForm<CreateOptionGroupFormValues, unknown, CreateOptionGroupInput>({
        resolver: zodResolver(createOptionGroupSchema),
        defaultValues: {
            categoryId: String(categories[0]?.id ?? ""),
            label: "",
            isRequired: false,
            sortOrder: 0,
            optionsRaw: "",
        },
    });

    const watchIsRequired = watchGroup("isRequired");
    const watchCategoryId = watchGroup("categoryId");

    const onCreateOptionGroup = async (data: CreateOptionGroupInput) => {
        setCreateGroupError(null);
        const result = await createOptionGroupAction(data);
        if (!result.success) {
            setCreateGroupError(result.error ?? "Failed to create option group.");
            return;
        }
        if (result.optionGroup) {
            setOptionGroups((prev) => [...prev, result.optionGroup!]);
        }
        toast.success("Option group created successfully!");
        resetGroup();
        setIsCreateGroupOpen(false);
    };

    const handleToggleCategory = (id: number, current: boolean) => {
        setCategories((prev) =>
            prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c))
        );
        startTransition(async () => {
            const result = await toggleCategoryAction(id, !current);
            if (!result.success) {
                setCategories((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, isActive: current } : c))
                );
                toast.error(result.error ?? "Failed to toggle category visibility.");
            } else {
                toast.success(`Category ${!current ? "enabled" : "disabled"} successfully.`);
            }
        });
    };

    const handleDeleteCategory = (id: number) => {
        setDeleteCatId(id);
    };

    const confirmDeleteCategory = () => {
        if (!deleteCatId) return;
        setCategories((prev) => prev.filter((c) => c.id !== deleteCatId));
        startTransition(async () => {
            const result = await deleteCategoryAction(deleteCatId);
            if (!result.success) {
                router.refresh();
                toast.error(result.error ?? "Failed to delete category.");
            } else {
                toast.success("Category deleted successfully.");
            }
            setDeleteCatId(null);
        });
    };

    const handleDeleteOptionGroup = (id: number) => {
        setDeleteGroupId(id);
    };

    const confirmDeleteOptionGroup = () => {
        if (!deleteGroupId) return;
        setOptionGroups((prev) => prev.filter((g) => g.id !== deleteGroupId));
        startTransition(async () => {
            const result = await deleteOptionGroupAction(deleteGroupId);
            if (!result.success) {
                router.refresh();
                toast.error(result.error ?? "Failed to delete option group.");
            } else {
                toast.success("Option group deleted successfully.");
            }
            setDeleteGroupId(null);
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-heading">
                        Categories &amp; Option Groups
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Organize digital menu slide categories and customer customization options
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" onClick={() => setIsCreateGroupOpen(true)} className="rounded-xl">
                        <Sliders className="h-4 w-4 mr-1.5" /> Add Option Group
                    </Button>
                    <Button onClick={() => setIsCreateCatOpen(true)} className="rounded-xl">
                        <Plus className="h-4 w-4 mr-1.5" /> Add Category
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight font-heading flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" /> Categories ({categories.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Card key={cat.id} className="overflow-hidden">
                            <div className="h-32 relative bg-muted -mt-4">
                                <Image src={cat.image} alt={cat.name} fill className="object-cover" />
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
                                        onCheckedChange={() => handleToggleCategory(cat.id, cat.isActive)}
                                        disabled={isPending}
                                    />
                                    <span className="text-xs text-muted-foreground font-medium">
                                        {cat.isActive ? "Visible" : "Hidden"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => openEditDialog(cat)}
                                        disabled={isPending}
                                    >
                                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-xs"
                                        disabled={isPending}
                                        onClick={() => handleDeleteCategory(cat.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
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
                        <Button variant="outline" size="sm" onClick={() => setIsCreateGroupOpen(true)} className="rounded-xl">
                            <Plus className="h-3.5 w-3.5 mr-1" /> New Group
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {optionGroups.map((group) => {
                            const catName = categories.find((c) => c.id === group.categoryId)?.name ?? "Unknown";
                            return (
                                <div key={group.id} className="p-4 rounded-xl border bg-muted/20 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                                {catName}
                                            </span>
                                            <h3 className="font-semibold text-base font-heading">{group.label}</h3>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Badge variant={group.isRequired ? "destructive" : "outline"}>
                                                {group.isRequired ? "Required" : "Optional"}
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="icon-xs"
                                                disabled={isPending}
                                                onClick={() => handleDeleteOptionGroup(group.id)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {group.options.map((opt) => (
                                            <span
                                                key={opt.id}
                                                className="px-2.5 py-1 rounded-lg border bg-background text-xs font-medium"
                                            >
                                                {opt.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isCreateCatOpen} onOpenChange={setIsCreateCatOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>Create a new category section for your digital QR menu.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit(onCreateCategory)} className="space-y-4 pt-2">
                        {createCatError && (
                            <div className="p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
                                {createCatError}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="create-cat-name">Category Name *</Label>
                            <Input
                                id="create-cat-name"
                                placeholder="e.g. Cocktails & Smoothies"
                                {...registerCreate("name")}
                                className="h-10 rounded-xl"
                            />
                            {createErrors.name && <p className="text-xs text-destructive">{createErrors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Category Image *</Label>
                            <ImageUploadCloudinary
                                value={watchCreate("image") || ""}
                                onChange={(url) => setValueCreate("image", url)}
                                disabled={isCreating}
                            />
                            {createErrors.image && <p className="text-xs text-destructive">{createErrors.image.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="create-cat-sort">Sort Order</Label>
                            <Input
                                id="create-cat-sort"
                                type="number"
                                placeholder="0"
                                {...registerCreate("sortOrder")}
                                className="h-10 rounded-xl"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateCatOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating}>
                                {isCreating ? "Creating..." : "Create Category"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditCatOpen} onOpenChange={setIsEditCatOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update &quot;{editingCategory?.name}&quot; — changes reflect on the customer menu immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit(onEditCategory)} className="space-y-4 pt-2">
                        <input type="hidden" {...registerEdit("id", { valueAsNumber: true })} />

                        {editCatError && (
                            <div className="p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
                                {editCatError}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="edit-cat-name">Category Name</Label>
                            <Input
                                id="edit-cat-name"
                                {...registerEdit("name")}
                                className="h-10 rounded-xl"
                            />
                            {editErrors.name && <p className="text-xs text-destructive">{editErrors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Category Image</Label>
                            <ImageUploadCloudinary
                                value={watchEdit("image") || ""}
                                onChange={(url) => setValueEdit("image", url)}
                                disabled={isEditing}
                            />
                            {editErrors.image && <p className="text-xs text-destructive">{editErrors.image.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-cat-sort">Sort Order</Label>
                            <Input
                                id="edit-cat-sort"
                                type="number"
                                {...registerEdit("sortOrder")}
                                className="h-10 rounded-xl"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditCatOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isEditing}>
                                {isEditing ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Option Group</DialogTitle>
                        <DialogDescription>Add selectable options to products in a category.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGroupSubmit(onCreateOptionGroup)} className="space-y-4 pt-2">
                        {createGroupError && (
                            <div className="p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
                                {createGroupError}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>Target Category *</Label>
                            <Select
                                value={String(watchCategoryId)}
                                onValueChange={(val) => setGroupValue("categoryId", val)}
                                options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
                            />
                            {groupErrors.categoryId && <p className="text-xs text-destructive">{groupErrors.categoryId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="grp-label">Option Group Label *</Label>
                            <Input
                                id="grp-label"
                                placeholder="e.g. Spice Level"
                                {...registerGroup("label")}
                                className="h-10 rounded-xl"
                            />
                            {groupErrors.label && <p className="text-xs text-destructive">{groupErrors.label.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="grp-opts">Options (comma-separated) *</Label>
                            <Input
                                id="grp-opts"
                                placeholder="Mild, Medium, Hot, Extra Hot"
                                {...registerGroup("optionsRaw")}
                                className="h-10 rounded-xl"
                            />
                            {groupErrors.optionsRaw && <p className="text-xs text-destructive">{groupErrors.optionsRaw.message}</p>}
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <Switch
                                id="grp-req"
                                checked={watchIsRequired ?? false}
                                onCheckedChange={(val) => setGroupValue("isRequired", val)}
                            />
                            <Label htmlFor="grp-req" className="cursor-pointer">Required selection for customer</Label>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCreatingGroup}>
                                {isCreatingGroup ? "Saving..." : "Save Option Group"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteCatId !== null} onOpenChange={() => setDeleteCatId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this category? All products inside will also be deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteCatId(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDeleteCategory} disabled={isPending}>
                            {isPending ? "Deleting..." : "Delete Category"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteGroupId !== null} onOpenChange={() => setDeleteGroupId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Option Group</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this option group? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteGroupId(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDeleteOptionGroup} disabled={isPending}>
                            {isPending ? "Deleting..." : "Delete Option Group"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
