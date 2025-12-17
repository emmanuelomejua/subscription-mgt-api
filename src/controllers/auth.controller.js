import mongoose from "mongoose"

export const signUp = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
    } catch (error) {
        
    }

}


export const signIn = async (req, res) => {

}


export const signOut = async (req, res) => {

}
