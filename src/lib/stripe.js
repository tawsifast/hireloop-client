import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    "seeker_pro":"price_1Tg5dXCTzU6qPOQUL9X2HTAg",
    "seeker_premium":"price_1TgHz2CTzU6qPOQUIT4XQHMs",
    "recruiter_growth":"price_1TgHyBCTzU6qPOQUxK6txCJE",
    "recruiter_enterprise":"price_1TgHxZCTzU6qPOQUHy7sQTYU",
}