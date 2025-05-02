/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_SERVER_BASEURL: string
    readonly VITE_PROFILE: string
    readonly VITE_STRIPE_SCALE_PRODUCT_ID: string
    readonly VITE_STRIPE_ENTERPRISE_PRODUCT_ID: string
    readonly VITE_STRIPE_STARTER_PACK_PRODUCT_ID: string
    readonly VITE_STRIPE_PRO_PACK_PRODUCT_ID: string
    readonly VITE_STRIPE_BUSINESS_PACK_PRODUCT_ID: string
    readonly VITE_STRIPE_ENTERPRISE_PACK_PRODUCT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
