import { describe, it, expect } from 'vitest';
import { createProductSchema, updateProductSchema } from '../product';

describe('Product CRUD Validation Schema (TDD)', () => {
  describe('Create Product Validation', () => {
    it('validates a correct product payload', () => {
      const payload = {
        name: 'tr:Adana Kebab|en:Adana Kebab',
        categoryId: 1,
        price: 250,
        description: 'tr:Acılı zırh kıyması|en:Spicy minced meat',
        image: 'https://youraccount.public.blob.vercel-storage.com/kebab.jpg',
        isAvailable: true,
        sortOrder: 1,
      };

      const result = createProductSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('tr:Adana Kebab|en:Adana Kebab');
        expect(result.data.price).toBe(250);
      }
    });

    it('rejects names shorter than 2 characters', () => {
      const payload = {
        name: 'A',
        categoryId: 1,
        price: 100,
        description: 'Delicious dish',
      };

      const result = createProductSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toBeDefined();
      }
    });

    it('rejects negative or zero prices', () => {
      const payload = {
        name: 'Chicken Soup',
        categoryId: 1,
        price: -50,
        description: 'Hot chicken soup',
      };

      const result = createProductSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.price).toBeDefined();
      }
    });

    it('rejects invalid or non-positive categoryId', () => {
      const payload = {
        name: 'Lentil Soup',
        categoryId: 0,
        price: 80,
        description: 'Traditional lentil soup',
      };

      const result = createProductSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.categoryId).toBeDefined();
      }
    });
  });

  describe('Update Product Validation', () => {
    it('validates a partial update with valid id', () => {
      const payload = {
        id: 42,
        price: 300,
        isAvailable: false,
      };

      const result = updateProductSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it('rejects update payloads missing a valid positive id', () => {
      const payload = {
        id: -5,
        price: 300,
      };

      const result = updateProductSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });
});
