import axios from 'axios'
import {
    BillingPortalResponse,
    CheckoutMode,
    CheckoutResponse,
    ProductWithPricesResponse,
    Subscription,
    SubscriptionInfoResponse,
} from './types'

export async function fetchSubscriptionInfo(): Promise<Subscription> {
    const response = await axios.get<SubscriptionInfoResponse>(
        '/payment/subscriptions_infos',
    )
    return response.data.subscription
}

export async function fetchProductWithPrices(
    productId: string,
): Promise<ProductWithPricesResponse> {
    const response = await axios.get(
        `/payment/product_with_prices?product_id=${productId}`,
    )
    return response.data
}

// TODO: comment rajouter le discount
export async function checkout(params: {
    plan_id: string
    mode: CheckoutMode
    discount_percentage?: number
}): Promise<CheckoutResponse> {
    const response = await axios.post('/payment', {
        plan_id: params.plan_id,
        mode: params.mode,
        discount_percentage: params.discount_percentage,
    })
    return response.data
}

export async function cancelSubscription(): Promise<void> {
    return (await axios.put('/payment/subscription/cancel')).data
}

export async function createBillingPortal(): Promise<BillingPortalResponse> {
    return (await axios.post('/payment/create_billing_portal')).data
}
