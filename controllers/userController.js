const Users = require('../model/Users');
const Enrollment = require('../model/enrollments');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {
    try {
        const pre_user = await Users.findOne({email: req.body.email});

        if(pre_user) {
            return res.status(200).json({message: 'This user is already added.', code : 201});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new Users({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            role : 1
        });

        const savedItem = await user.save();
        if(savedItem) {
            res.status(200).json({message: 'User added successful!', code : 200});
        }
    } catch (e) {/*JSON*/
        res.status(500).json({error: e});
    }
}



const getAllUsers = async (req, res) => {
    try {
        const all_users = await Users.find({role : 1});

        if (all_users.length > 0) {
            res.status(200).json(
                {
                    message: 'Success',
                    data : all_users,
                    code : 200
                });
        }else {
            res.status(200).json(
                {
                    message: 'No users.',
                    data : all_users,
                    code : 201
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

const getUserDetails = async (req, res) => {
    try {
        const all_users = await Users.findOne({_id : req.headers.id});

        if (all_users !== null) {
            res.status(200).json(
                {
                    message: 'Success',
                    data : all_users,
                    code : 200
                });
        }else {
            res.status(200).json(
                {
                    message: 'No users.',
                    data : all_users,
                    code : 201
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

async function getUsers(){
    return Users.find({role: 1});
}

const deleteUser = async (req, res) => {
    try {
        /* Remove the enrollments */
        await Enrollment.deleteMany({userId: req.headers.id})

        /* Remove user */
        Users.deleteOne({_id: req.headers.id}).then(async result => {
            if (result.deletedCount > 0) {
                const all_en = await getUsers();
                return res.status(200).json({
                    message: 'Enrollment Deleted Successfully!',
                    data : all_en,
                    code : 200
                });
            }
            if (result.deletedCount === 0) {
                return res.status(400).json({message: 'Try Again!',code : 404});
            }
        }).catch(error => {
            res.status(500).json({error: error});
        })
    } catch (e) {
        return res.status(500).json({error: e});
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(200).json({ error: 'Email or password is wrong.', code : 401 });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(200).json({ error: 'Wrong Password' , code : 402});
        }
        const token = jwt.sign({ user }, 'our-secret-key-el', {expiresIn: '5h'});

        res.cookie("tokenELearning",token);

        res.status(200).json({ token : token , message : "Login successful", code : 200 });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserDetails,
    deleteUser,
    userLogin
}



