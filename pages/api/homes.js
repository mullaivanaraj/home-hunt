import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, image, description, price, guests, beds, baths } =
        req.body;

      const home = await prisma.home.create({
        data: { title, image, description, price, guests, beds, baths },
      });

      res.status(201).json(home);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported` });
  }
}
