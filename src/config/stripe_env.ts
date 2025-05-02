// Environment variables configuration
export const STRIPE_ENV = {
    stripe: {
        products: {
            scale: {
                id: import.meta.env.VITE_STRIPE_SCALE_PRODUCT_ID,
                price: import.meta.env.VITE_STRIPE_SCALE_PRICE_ID,
            },
            enterprise: {
                id: import.meta.env.VITE_STRIPE_ENTERPRISE_PRODUCT_ID,
                price: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID,
            },
            packs: {
                starter: {
                    id: import.meta.env.VITE_STRIPE_STARTER_PACK_PRODUCT_ID,
                    price: import.meta.env.VITE_STRIPE_STARTER_PACK_PRICE_ID,
                },
                pro: {
                    id: import.meta.env.VITE_STRIPE_PRO_PACK_PRODUCT_ID,
                    price: import.meta.env.VITE_STRIPE_PRO_PACK_PRICE_ID,
                },
                business: {
                    id: import.meta.env.VITE_STRIPE_BUSINESS_PACK_PRODUCT_ID,
                    price: import.meta.env.VITE_STRIPE_BUSINESS_PACK_PRICE_ID,
                },
                enterprise: {
                    id: import.meta.env.VITE_STRIPE_ENTERPRISE_PACK_PRODUCT_ID,
                    price: import.meta.env.VITE_STRIPE_ENTERPRISE_PACK_PRICE_ID,
                },
            },
        },
    },
} as const
