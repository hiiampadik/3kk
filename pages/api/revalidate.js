import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export default async function handler(req, res) {
    const signature = req.headers[SIGNATURE_HEADER_NAME];
    const isValid = isValidSignature(JSON.stringify(req.body), signature, SANITY_WEBHOOK_SECRET);

    // Validate signature
    if (!isValid) {
        console.log(`===== Not valid signature`);
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
    }

    try {
        const type = req.body['_type'];

        switch(type){
            case 'projects':
                const slug = req.body.slug.current
                console.log(`===== Revalidating: ${type}, ${slug}`);
                await Promise.all([
                    res.revalidate(`/en/projects/${slug}`),
                    res.revalidate(`/cs/projects/${slug}`),
                    res.revalidate(`/en/`),
                    res.revalidate(`/cs/`)
                ]);

                break;
            case 'homepage':
                console.log(`===== Revalidating: Homepage`);
                await Promise.all([
                    res.revalidate(`/en/`),
                    res.revalidate(`/cs/`)
                ]);

                break
            case 'about':
                console.log(`===== Revalidating: About`);
                await Promise.all([
                    res.revalidate(`/en/about`),
                    res.revalidate(`/cs/about`)
                ]);

                break
            case 'contact':
                console.log(`===== Revalidating: Contact`);
                await Promise.all([
                    res.revalidate(`/en/contact`),
                    res.revalidate(`/cs/contact`)
                ]);

                break
            default:
                console.log(`===== Wrong type ${type}`);
                res.status(401).json({ success: false, message: 'Invalid Type' });
                return
        }


        return res.json({ revalidated: true });

    } catch (err) {
        // Could not revalidate. The stale page will continue to be shown until
        // this issue is fixed.
        console.log(`===== Error ${err.message}`);
        res.status(401).json({ success: false, message: 'Could not Revalidate' });
    }
}