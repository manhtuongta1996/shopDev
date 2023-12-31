'use strict'
const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const RoleShop = {
    SHOP:'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            //step 1: check email
            const holderShop = await shopModel.findOne({email}).lean()
            if (holderShop){
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!'
                }
            }
            const passwordHashed = await bcrypt.hash(password,10)
            const newShop = await shopModel.create({
                name, email, password: passwordHashed, roles: [RoleShop.SHOP]
            })
            if(newShop) {
                // created privateKey, publicKey
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                })
                console.log({privateKey, publicKey})
            }
        } catch (error) {
            return {
                code: 'xxx',
                message:error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService