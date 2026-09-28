import { describe, it, expect, vi, beforeEach } from 'vitest';
import { db } from '@/lib/db';
import {
  createProductAction,
  updateProductAction,
  toggleProductStockAction,
  deleteProduct,
} from '../(dashboard)/products/actions';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    orm: {
      public: {
        Product: {
          create: vi.fn(),
          where: vi.fn(),
        },
      },
    },
  },
}));

describe('Products CRUD Server Actions (TDD)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createProductAction', () => {
    it('creates product in database successfully', async () => {
      const mockCreated = {
        id: 1,
        name: 'tr:Köfte|en:Meatballs',
        categoryId: 2,
        price: '220.00',
        description: 'tr:Taze ızgara köfte|en:Fresh grilled meatballs',
        image: 'https://example.com/kofta.jpg',
        isAvailable: true,
        sortOrder: 1,
      };

      vi.mocked(db.orm.public.Product.create).mockResolvedValue(mockCreated as any);

      const result = await createProductAction({
        name: 'tr:Köfte|en:Meatballs',
        categoryId: 2,
        price: 220,
        description: 'tr:Taze ızgara köfte|en:Fresh grilled meatballs',
        image: 'https://example.com/kofta.jpg',
        isAvailable: true,
        sortOrder: 1,
      });

      expect(result.success).toBe(true);
      if (result.success && result.product) {
        expect(result.product.name).toBe('tr:Köfte|en:Meatballs');
        expect(result.product.price).toBe(220);
      }
    });

    it('returns error if validation fails', async () => {
      const result = await createProductAction({
        name: 'X',
        categoryId: 0,
        price: -10,
        description: 'Short',
        isAvailable: true,
        sortOrder: 0,
      } as any);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Validation failed');
    });
  });

  describe('updateProductAction', () => {
    it('updates product successfully', async () => {
      const mockUpdated = {
        id: 5,
        name: 'tr:Urfa Kebab|en:Urfa Kebab',
        categoryId: 2,
        price: '280.00',
        description: 'tr:Acısız zırh kıyması|en:Non-spicy kebab',
        image: 'https://example.com/urfa.jpg',
        isAvailable: true,
        sortOrder: 0,
      };

      vi.mocked(db.orm.public.Product.where).mockReturnValue({
        update: vi.fn().mockResolvedValue(mockUpdated),
      } as any);

      const result = await updateProductAction({
        id: 5,
        price: 280,
      });

      expect(result.success).toBe(true);
      if (result.success && result.product) {
        expect(result.product.price).toBe(280);
      }
    });
  });

  describe('toggleProductStockAction', () => {
    it('toggles product stock status', async () => {
      const mockUpdate = vi.fn().mockResolvedValue({ id: 1 });
      vi.mocked(db.orm.public.Product.where).mockReturnValue({
        update: mockUpdate,
      } as any);

      const result = await toggleProductStockAction(1, false);
      expect(result.success).toBe(true);
      expect(mockUpdate).toHaveBeenCalledWith({ isAvailable: false });
    });
  });

  describe('deleteProduct', () => {
    it('deletes product from database', async () => {
      const mockDelete = vi.fn().mockResolvedValue({ count: 1 });
      vi.mocked(db.orm.public.Product.where).mockReturnValue({
        delete: mockDelete,
      } as any);

      const result = await deleteProduct(10);
      expect(result.success).toBe(true);
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
