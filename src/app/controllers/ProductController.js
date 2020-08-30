import Product from '../models/Product';
import Brand from '../models/Brand';

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.findAll({
        attributes: ['uid', 'name', 'quantity', 'brand_uid'],
        include: [
          {
            model: Brand,
            as: 'brand',
          },
        ],
      });

      return res.json({ products });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const product = await Product.findByPk(uid, {
        attributes: ['uid', 'name', 'quantity'],
        include: {
          model: Brand,
          as: 'brand',
          attributes: ['uid', 'name'],
        }
      });

      return res.json({ product });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.json({ product });
    } catch (error) {
      const response = {
        message: 'dados incorretos',
        error,
      };
      return res.json(response);
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;

      const [updated] = await Product.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('produto não encontrado');
      }

      return res.json({ updated });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;

      const deleted = await Product.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('produto não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new ProductController();
