import { describe, it, expect, vi, beforeEach } from 'vitest';
import { db } from '@/lib/db';
import {
  createCategoryAction,
  updateCategoryAction,
  toggleCategoryAction,
  deleteCategoryAction,
  createOptionGroupAction,
  deleteOptionGroupAction,
} from '../(dashboard)/categories/actions';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    orm: {
      public: {
        Category: {
          create: vi.fn(),
          where: vi.fn(),
        },
        OptionGroup: {
          create: vi.fn(),
          where: vi.fn(),
        },
        OptionGroupOption: {
          create: vi.fn(),
        },
      },
    },
  },
}));

describe('Categories & Option Groups CRUD Actions (TDD)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCategoryAction', () => {
    it('creates a new category', async () => {
      const mockCreated = {
        id: 3,
        name: 'tr:İçecekler|en:Beverages',
        slug: 'tr-icecekler-en-beverages',
        image: 'https://example.com/drinks.jpg',
        sortOrder: 1,
        isActive: true,
      };

      vi.mocked(db.orm.public.Category.create).mockResolvedValue(mockCreated as any);

      const result = await createCategoryAction({
        name: 'tr:İçecekler|en:Beverages',
        image: 'https://example.com/drinks.jpg',
        sortOrder: 1,
      });

      expect(result.success).toBe(true);
      if (result.success && result.category) {
        expect(result.category.name).toBe('tr:İçecekler|en:Beverages');
      }
    });
  });

  describe('updateCategoryAction', () => {
    it('updates category data', async () => {
      const mockUpdated = {
        id: 3,
        name: 'tr:Soğuk İçecekler|en:Cold Drinks',
        slug: 'tr-soguk-icecekler-en-cold-drinks',
        image: 'https://example.com/cold.jpg',
        sortOrder: 2,
        isActive: true,
      };

      vi.mocked(db.orm.public.Category.where).mockReturnValue({
        update: vi.fn().mockResolvedValue(mockUpdated),
      } as any);

      const result = await updateCategoryAction({
        id: 3,
        name: 'tr:Soğuk İçecekler|en:Cold Drinks',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('toggleCategoryAction', () => {
    it('toggles category visibility', async () => {
      const mockUpdate = vi.fn().mockResolvedValue({ id: 3 });
      vi.mocked(db.orm.public.Category.where).mockReturnValue({
        update: mockUpdate,
      } as any);

      const result = await toggleCategoryAction(3, false);
      expect(result.success).toBe(true);
      expect(mockUpdate).toHaveBeenCalledWith({ isActive: false });
    });
  });

  describe('deleteCategoryAction', () => {
    it('deletes category', async () => {
      const mockDelete = vi.fn().mockResolvedValue({ count: 1 });
      vi.mocked(db.orm.public.Category.where).mockReturnValue({
        delete: mockDelete,
      } as any);

      const result = await deleteCategoryAction(3);
      expect(result.success).toBe(true);
    });
  });

  describe('createOptionGroupAction', () => {
    it('creates option group and its options', async () => {
      const mockGroup = {
        id: 10,
        categoryId: 1,
        label: 'Sauce Choice',
        isRequired: true,
        sortOrder: 0,
      };

      vi.mocked(db.orm.public.OptionGroup.create).mockResolvedValue(mockGroup as any);
      vi.mocked(db.orm.public.OptionGroupOption.create).mockImplementation(async (data: any) => ({
        id: Math.floor(Math.random() * 1000),
        optionGroupId: data.optionGroupId,
        label: data.label,
        sortOrder: data.sortOrder,
      }) as any);

      const result = await createOptionGroupAction({
        categoryId: 1,
        label: 'Sauce Choice',
        isRequired: true,
        sortOrder: 0,
        optionsRaw: 'Garlic, Ketchup, Mayo',
      });

      expect(result.success).toBe(true);
      if (result.success && result.optionGroup) {
        expect(result.optionGroup.options).toHaveLength(3);
      }
    });
  });

  describe('deleteOptionGroupAction', () => {
    it('deletes option group', async () => {
      const mockDelete = vi.fn().mockResolvedValue({ count: 1 });
      vi.mocked(db.orm.public.OptionGroup.where).mockReturnValue({
        delete: mockDelete,
      } as any);

      const result = await deleteOptionGroupAction(10);
      expect(result.success).toBe(true);
    });
  });
});
