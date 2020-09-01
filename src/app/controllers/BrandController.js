import Brand from '../models/Brand';
import Product from '../models/Product';

class BrandController {
  async index(req, res) {
    try {
      const brands = await Brand.findAll({
        attributes: ['uid', 'name'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['uid', 'name', 'quantity'],

          }
        ]
      });

      return res.json({ brands });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const brand = await Brand.findByPk(uid, {
        attributes: ['uid', 'name'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['uid', 'name', 'quantity'],

          }
        ]
      });

      return res.json({ brand });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const brands = await Brand.create(req.body);

      return res.json({ brands });
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

      const [updated] = await Brand.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('marca não encontrado');
      }

      return res.json({ updated });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;

      const deleted = await Brand.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('marca não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new BrandController();
