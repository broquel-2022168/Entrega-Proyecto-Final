'use strict'

import { generateJwt } from '../utils/jwt.js'
import { checPassword, checkUpdate, encrypt } from '../utils/validator.js'
import User from './usuarios.model.js'

export const register = async(req, res)=>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role= 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registered Succesfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Error saving user',error})
    }
}

export const registerAutomatic = async()=>{
    try {
        let admin ={ 
            name: 'Fernando',
            surname: 'Roquel',
            email: 'roquelFer6@gmail.com',
            username: 'FerRoquel',
            password: '12345678',
            role: 'ADMIN'
        }
        admin.password = await encrypt(admin.password)
        let user = new User(admin)
        await user.save()
        return console.log('Guardado exitosamente')
    } catch (error) {
        console.error(error)
    }
}

export const login = async(req, res)=>{
    try {
        let { username, password, email} = req.body
        if(username){
            var user = await User.findOne({username})
        }else if(email){
            var user = await User.findOne({email})
        }
        
        if(user && await checPassword(password, user.password)){
            
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.name}`,
            loggedUser,
            token
            })
        }
        return res.status(404).send({message: 'Invalid credentials'})        
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Failed to login'})
    }
}

export const updateUser = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req. body
        let update = checkUpdate(data, id)
        if(!update)return res.status(404).send({message: 'Have submited some data that cannot be update or missing'})
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateUser) return res.status(400).send({message: `User not found and not update`})
        return res.send({message:'update user',updateUser})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating acount'})
    }
}

export const deleteU = async(req, res) =>{
    try {
        let {id} = req.params
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})
    } catch (error) {
        return res.status(500).send({message: 'Error deleting acount'})
    }
}