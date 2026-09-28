import { describe, it, expect } from 'vitest';
import { createCategorySchema, updateCategorySchema, createOptionGroupSchema } from '../category';

describe('Category & Option Group CRUD Validation Schema (TDD)', () => {
  describe('Create Category Validation', () => {
    it('validates correct category data', () => {
      const payload = {
        name: 'tr:Tatlılar|en:Desserts',
        image: 'https://res.cloudinary.com/demo/image/upload/v1/desserts.jpg',
        sortOrder: 2,
      };

      const result = createCategorySchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('tr:Tatlılar|en:Desserts');
      }
    });

    it('rejects category names shorter than 2 characters', () => {
      const payload = {
        name: 'T',
        sortOrder: 1,
      };

      const result = createCategorySchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe('Update Category Validation', () => {
    it('validates partial category update with valid id', () => {
      const payload = {
        id: 10,
        sortOrder: 5,
      };

      const result = updateCategorySchema.safeParse(payload);
      expect(result.success).toBe(true);
    });
  });

  describe('Create Option Group Validation', () => {
    it('validates correct option group data with comma-separated options', () => {
      const payload = {
        categoryId: 1,
        label: 'tr:Pişme Derecesi|en:Doneness',
        isRequired: true,
        sortOrder: 0,
        optionsRaw: 'Az Pişmiş, Orta, Çok Pişmiş',
      };

      const result = createOptionGroupSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it('rejects option groups with empty optionsRaw string', () => {
      const payload = {
        categoryId: 1,
        label: 'Extras',
        optionsRaw: '',
      };

      const result = createOptionGroupSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });
});
