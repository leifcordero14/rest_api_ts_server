import { Request, Response } from "express";
import Product from "../models/Product";

export default class ProductHandler {
	static async getProducts(req: Request, res: Response) {
		try {
			const products = await Product.findAll({
				attributes: { exclude: ["createdAt", "updatedAt"] },
				order: [["id", "DESC"]]
			});
			return res.status(200).json({ data: products });
		} catch (error) {
			console.error("Error fetching products:", error);
			return res.status(500).json({ error: "An error occurred while fetching the products" });
		}
	}

	static async getProductById(req: Request, res: Response) {
		try {
			const product = await Product.findByPk(req.params.id, {
				attributes: { exclude: ["createdAt", "updatedAt"] }
			});
			if (!product) {
				return res.status(404).json({ error: "Product Not Found" });
			}
			return res.status(200).json({ data: product });
		} catch (error) {
			console.error(`Error fetching product by ID: ${error}`);
			return res.status(500).json({ error: "An error occurred while fetching the product" });
		}
	}

	static async createProduct(req: Request, res: Response) {
		try {
			const newProduct = await Product.create(req.body);
			return res.status(201).json({ data: newProduct });
		} catch (error) {
			console.error(`Error creating product: ${error}`);
			return res.status(500).json({ error: "An error occurred while creating the product" });
		}
	}

	static async updateProduct(req: Request, res: Response) {
		try {
			const product = await Product.findByPk(req.params.id);
			if (!product) {
				return res.status(404).json({ error: "Product Not Found" });
			}
			await product.update(req.body);
			return res.status(200).json({ data: product });
		} catch (error) {
			console.error(`Error updating product: ${error}`);
			return res.status(500).json({ error: "An error occurred while updating the product" });
		}
	}

	static async updateAvailability(req: Request, res: Response) {
		try {
			const product = await Product.findByPk(req.params.id);
			if (!product) {
				return res.status(404).json({ error: "Product Not Found" });
			}
			product.availability = !product.availability;
			await product.save();
			return res.status(200).json({ data: product });
		} catch (error) {
			console.error(`Error updating availability: ${error}`);
			return res
				.status(500)
				.json({ error: "An error occurred while updating the product's availability" });
		}
	}

	static async deleteProduct(req: Request, res: Response) {
		try {
			const product = await Product.findByPk(req.params.id);
			if (!product) {
				return res.status(404).json({ error: "Product Not Found" });
			}
			await product.destroy();
			return res.status(200).json({ data: "Product has been successfully deleted" });
		} catch (error) {
			console.error(`Error deleting product: ${error}`);
			return res.status(500).json({ error: "An error occurred while deleting the product" });
		}
	}
}
