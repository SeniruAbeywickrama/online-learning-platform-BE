const Enrollment = require('../model/enrollments');
const Course = require('../model/courses');
const Users = require('../model/Users');



const createEnrollment = async (req, res) => {
    try {

        const enrollment= new Enrollment({
            userId : req.body.userId,
            courseId : req.body.courseId
        });

        const savedItem = await enrollment.save();
        if(savedItem) {
            res.status(200).json({message: 'Enrollment added successful!', code : 200});
        }
    } catch (e) {/*JSON*/
        res.status(500).json({error: e, code : 500});
    }
}

const getAllEnrollments = async (req, res) => {
    try {
        const all_enrollments = await Enrollment.find();


        let arr = [];
        for (let i=0;i < all_enrollments.length; i++){
            let data = {
                id : null,
                user : null,
                course : null
            }

            const user = await Users.findOne({_id: all_enrollments[i].userId});
            const course = await Course.findOne({_id: all_enrollments[i].courseId});

            data.id = all_enrollments[i].id;
            data.user = user.name;
            data.course = course.name;
            arr.push(data)
        }

        if (all_enrollments.length > 0) {
            res.status(200).json(
                {
                    message: 'Success',
                    data : arr,
                    code : 200
                });
        }else {
            res.status(200).json(
                {
                    message: 'No enrollments.',
                    data : arr,
                    code : 201
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

async function getAllEnrollment(){
    const all_enrollments = await Enrollment.find();



    let arr = [];
    for (let i=0;i < all_enrollments.length; i++){
        let data = {
            id : null,
            user : null,
            course : null
        }
        const user = await Users.findOne({_id: all_enrollments[i].userId});
        const course = await Course.findOne({_id: all_enrollments[i].courseId});

        data.id = all_enrollments[i].id;
        data.user = user.name;
        data.course = course.name;

        arr.push(data)
    }

    return arr;
}

const deleteEnrollments = async (req, res) => {
    try {
        Enrollment.deleteOne({_id: req.headers.id}).then(async result => {

            if (result.deletedCount > 0) {
                const all_en = await getAllEnrollment();
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

const getUserEnrollments = async (req, res) => {
    try {
        const myEnrollments = await Enrollment.find({userId: req.headers.id})
        let arr = [];

        for (let i=0;i < myEnrollments.length; i++){
            let data = {
                id : null,
                user : null,
                course : null
            }
            const user = await Users.findOne({_id: myEnrollments[i].userId});
            const course = await Course.findOne({_id: myEnrollments[i].courseId});

            data.id = myEnrollments[i].id;
            data.user = user.name;
            data.course = course.name;

            arr.push(data)
        }

        if (myEnrollments.length > 0) {
            res.status(200).json(
                {
                    message: 'Success',
                    data : arr,
                    code : 200
                });
        }else {
            res.status(200).json(
                {
                    message: 'No enrollments.',
                    data : arr,
                    code : 201
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}


module.exports = {
    getAllEnrollments,
    createEnrollment,
    deleteEnrollments,
    getUserEnrollments
}



