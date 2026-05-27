export const productKeys = {
  publicList: (params: {
    search?: string;
    page?: number;
    limit?: number;
    activeCategory?: string;
  }) => ["publicProducts", params] as const,
};

export const categoryKeys = {
  activeList: ["activeCategories"] as const,
};