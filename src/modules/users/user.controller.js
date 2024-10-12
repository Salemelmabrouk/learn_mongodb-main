import { userModel } from "../../../models/user.model.js"
import bcrypt from 'bcrypt'
/**
 * find()=> []
 * findOne()=> object | null
 * findById()=> 
 */


export const signUp = async(req, res) => {
  const {name, email, password} = req.body
  const user = await userModel.findOne({email})
  if(user) {
    return res.json({message: "user already exists"})
  }else{
    const hash = bcrypt.hashSync(password, 8);
    await userModel.insertMany({
      name,
      email,
      password: hash
    })
    res.json({message: "success"})
  }
  //let users = await userModel.findById({_id:"67044b21d6fdda9f006e5849"})
}

export const signIn = async(req, res) => {
  const {email, password} = req.body
  const user = await userModel.findOne({email})
  if(user && bcrypt.compareSync(password, user.password)) {
    res.json({message: "Login with token"})
  }else{
    res.json({message: "email not found or password incorrect"})
  }
  //let users = await userModel.findById({_id:"67044b21d6fdda9f006e5849"})
}