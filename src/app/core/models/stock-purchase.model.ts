export interface StockPurchasePost {
  id?: string;
  inventoryId: number;
  supplierId: number;
  note?: string;
  refNumber?: string;
  status?: string;
  productsSupply: StockProductPost[];
}

export interface StockProductPost {
  id?: number;
  productId: number;
  variantName: string;
  variantSKU: string;
  amount: number;
  actualAmount?: number;
  imageUrl: string;
  imageId: number;
  variantId: number;
}

export interface StockPurchase {
  id: string;
  PO: string;
  created_at: string;
  status: string;
  totalPurchases: number;
  inventory: string;
  purchasesStatus: {
    verified: number;
    rejected: number;
    pending: number;
  };
  received_at: string;
}

export interface StockPurchaseAPI {
  id: number;
  inventoryId: number;
  PO?: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt: any;
  receivedAt: string;
  deletedAt: any;
  inventory: Inventory;
  productsSupply: ProductSupply[];
  status: string;
}

export interface Inventory {
  id: number;
  text: string;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSupply {
  id: number;
  productId: number;
  variantId: any;
  inventorySupplyId: number;
  amount: number;
  confirmed: number;
  rejected: number;
}
