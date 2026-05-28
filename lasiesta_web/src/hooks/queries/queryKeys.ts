// PUBLIC
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

export const planKeys = {
  activeList: ["activePlans"] as const,
};

export const bannerKeys = {
  byPage: (page: string) => ["banner", page] as const,
};

export const carouselKeys = {
  home: ["homeCarousel"] as const,
};

// PRIVATE
export const adminCategoryKeys = {
  all: ["adminCategories"] as const,
  list: () => [...adminCategoryKeys.all, "list"] as const,
};

export const adminPlanKeys = {
  all: ["adminPlans"] as const,
  list: () => [...adminPlanKeys.all, "list"] as const,
};

export const adminBannerKeys = {
  all: ["adminBanners"] as const,
  list: () => [...adminBannerKeys.all, "list"] as const,
};

export const adminCarouselKeys = {
  all: ["adminHomeCarousel"] as const,
  list: () => [...adminCarouselKeys.all, "list"] as const,
};

export const adminUserKeys = {
  all: ["adminUsers"] as const,
  list: () => [...adminUserKeys.all, "list"] as const,
};
