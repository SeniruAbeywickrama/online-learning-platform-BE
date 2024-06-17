const Course = require('../model/courses');
const Enrollment = require("../model/enrollments");



const createCourse = async (req, res) => {
    try {
        const pre_course = await Course.findOne({code: req.body.code});

        if(pre_course) {
            return res.status(200).json({message: 'This course is already added.', code : 201});
        }

        const course = new Course({
            code : req.body.code,
            name : req.body.name
        });

        const savedItem = await course.save();
        if(savedItem) {
            res.status(200).json({message: 'Course added successful!', code : 200});
        }
    } catch (e) {/*JSON*/
        res.status(500).json({error: e});
    }
}

const getAllCourses = async (req, res) => {
    try {
        const all_courses = await Course.find();

        if (all_courses.length > 0) {
            res.status(200).json(
                {
                    message: 'Success',
                    data : all_courses,
                    code : 200
                });
        }else {
            res.status(200).json(
                {
                    message: 'No courses.',
                    data : all_courses,
                    code : 201
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e});
    }
}

const getCourseDetails = async (req, res) => {
    try {
        const all_courses = await Course.findOne({_id : req.headers.id});

        if (all_courses !== null) {
            res.status(200).json(
                {
                    message: 'Success',
                    data : all_courses,
                    code : 200
                });
        }else {
            res.status(200).json(
                {
                    message: 'No courses.',
                    data : all_courses,
                    code : 201
                });
        }

    } catch (e) {/*JSON*/
        return res.status(500).json({error: e,code : 500});
    }
}


async function getCourses(){
    return Course.find();
}


const deleteCourse = async (req, res) => {
    try {
        /* Remove the enrollments */
        await Enrollment.deleteMany({courseId: req.headers.id})

        /* Remove user */
        Course.deleteOne({_id: req.headers.id}).then(async result => {
            if (result.deletedCount > 0) {
                const all_co = await getCourses();
                return res.status(200).json({
                    message: 'Course Deleted Successfully!',
                    data : all_co,
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



module.exports = {
    createCourse,
    getAllCourses,
    getCourseDetails,
    deleteCourse
}



