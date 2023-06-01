// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: 'John Doe' })
  try {
    // eslint-disable-next-line no-console
    console.log(
      'estoy recibiendo un reuest',
      req.body,
      req.headers,
      req.method
    );
    res.status(200).json({ name: 'Juan'  });
  } catch {
    res.status(500);
  }
}
