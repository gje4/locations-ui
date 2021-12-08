import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';


    /*  node-bigcommerce throws an error if response bodies include an
        'errors' property (https://github.com/getconversio/node-bigcommerce/blob/40b9fb2d948ff0fa2f19d31fbf872754fb6cfe35/lib/request.js#L24-L28)
        So, the batch APIs can't use that client until it's patched.
        I don't want to monkey patch it here, so I'm going to use axios instead
    */
const axios = require('axios').default

export default async function segments(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        query: { id, page, limit },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const bigcommerce = bigcommerceClient(accessToken, storeHash);

                const bcRes = await bigcommerce.get(`/segments?limit=${limit ? limit : '250'}${page ? `&page=${page}` : ''}`);
                res.status(200).json(bcRes);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        case 'PUT':
            try {
                // const { accessToken, storeHash } = await getSession(req);
                // const bigcommerce = bigcommerceClient(accessToken, storeHash);

                // const { data } = await bigcommerce.put(`/catalog/products/${pid}`, body);
                // res.status(200).json(data);
            } catch (error) {
                // const { message, response } = error;
                // res.status(response?.status || 500).json({ message });
            }
            break;
        case 'POST':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const { data } =  await axios({
                    method: 'POST',
                    url: `https://api.bigcommerce.com/stores/${storeHash}/v3/segments`,
                    data: body,
                    headers: {
                        'X-Auth-Token': accessToken,
                        'Content-Type': "application/json"
                    }
                })
                res.status(200).json(data)
            } catch (error) {
                console.error(error)
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        case 'DELETE':
            const { accessToken, storeHash } = await getSession(req);
            const { data } =  await axios({
                method: 'DELETE',
                url: `https://api.bigcommerce.com/stores/${storeHash}/v3/segments?id:in=${id}`,
                headers: {
                    'X-Auth-Token': accessToken,
                    'Content-Type': "application/json"
                }
            })
            res.status(200).json(data)
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }


}
