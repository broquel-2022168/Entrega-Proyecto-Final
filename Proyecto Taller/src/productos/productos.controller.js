'use strict'

import Category from '../categorias/categories.model.js'
import Product from './productos.model.js'

export const addP = async(req, res) =>{
    try {
        let data = req.body
        let category = await Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'category not found'})
        let product = new Product(data)
        await product.save()
        return res.send({message: 'Product saved successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving product'})
    }
}

export const get = async(req, res) =>{
    try {
        let products = await Product.find()
        if(!products.length === 0) return res.status(404).send({message: 'Not Found'})
        return res.send({ products })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting products'})
    }
}

export const updateP = async(req, res)=> {
    try {
        let { id } = req.params
        let data = req.body
        let updateProducto = await Product.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateProducto) return res.status(404).send({message: 'Product not found and not update'})
        return res.send({message: 'Product update succesfully',updateProducto})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating producto'})
    }
}

/*export const deleteP = async(req,res)=>{
    try {
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting product'})
    }
}

*/