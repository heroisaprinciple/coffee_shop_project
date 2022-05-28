const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

module.exports = {
    secret: stripeSecretKey,
    public: stripePublicKey
}