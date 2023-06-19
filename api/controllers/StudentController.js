/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constant = require("../utils/constant");

module.exports = {

    // add student
    async add(req, res) {
        let params = req.allParams()

        if (!params.name || !params.className) {
            return res.json({ message: 'Missing class name or student name', err: 400 })
        }

        if (!constant.BIRTHDAY_REGEX.test(params.birthday)) {
            return res.json({ message: 'Birthday invalid', err: 400 })
        }

        try {
            await Student.create({
                name: params.name,
                birthday: params.birthday,
                className: params.className,
                address: params.address,
            })

            return res.json({ message: 'Student created success', err: 200 })
        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // get list student
    async getList(req, res) {
        let query = req.param('query') ?? '';
        let limit = req.param('limit') ?? constant.DEFAULT_LIMIT_STUDENT

        let searchQuery = {
            where: {
                or: [
                    { name: { contains: query } },
                    { birthday: { contains: query } },
                    { address: { contains: query } },
                ]
            },
            limit
        };

        try {
            let students = await Student.find(searchQuery).populate('classId')
            for (let student of students) {
                let classObj = student.classId
                student.class = classObj
                student.classId = classObj.id
            }

            return res.json({ data: students, err: 200 })

        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // get student by Id
    async getById(req, res) {
        let { id } = req.allParams()

        try {
            let student = await Student.findOne({ _id: id })
            if (!student) {
                return res.json({ err: 401, message: "Invalid student Id" })
            }

            return res.json({ data: student, err: 200 })
        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // delete student with id
    async delete(req, res) {
        let { id } = req.allParams()

        try {
            let student = await Student.findOne({ _id: id })
            if (!student) {
                return res.json({ err: 401, message: "Invalid student Id" })
            }

            await Student.destroy({ _id: id })

            return res.json({ message: `Deleted student with id: ${id}.`, err: 200 });

        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // update student with id
    async update(req, res) {
        let { id, name, birthday, classId, address } = req.allParams()

        if (!name || !classId || !address || !constant.BIRTHDAY_REGEX.test(birthday)) {
            return res.json({ message: 'Data request invalid', err: 400 })
        }

        try {
            let student = await Student.findOne({ _id: id })
            if (!student) {
                return res.json({ err: 401, message: "Invalid student Id" })
            }

            await Student.updateOne({ _id: id })
                .set({
                    name,
                    birthday,
                    classId,
                    address
                })

            return res.json({ message: `Updated student with id: ${id}`, err: 200 })
        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    }
};

