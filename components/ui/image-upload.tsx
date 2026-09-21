"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || "");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview("");
    onChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border bg-muted group">
          <Image
            src={preview}
            alt="Uploaded preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-background/80 backdrop-blur-sm text-xs"
            >
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="text-xs"
            >
              <X className="h-3.5 w-3.5 mr-1" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer transition-colors text-center space-y-2",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Click to upload photo or drag and drop
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              PNG, JPG, WebP or GIF (max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
