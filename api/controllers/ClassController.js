const constant = require("../utils/constant");

module.exports = {

    // add class
    async add(req, res) {
        let params = req.allParams()

        if (!params.name || params.floor) {
            return res.json({ message: 'Missing class name or floor', err: 400 })
        }

        try {
            await Class.create({
                name: params.name,
                floor: params.floor
            })

            return res.json({ message: 'Class created success', err: 200 })
        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // get list class
    async getList(req, res) {
        let query = req.param('query') ?? '';
        let limit = req.param('limit') ?? constant.DEFAULT_LIMIT_CLASS

        let searchQuery = {
            where: {
                or: [
                    { name: { contains: query } },
                ]
            },
            limit
        };

        try {
            let listClass = await Class.find(searchQuery)

            return res.json({ data: listClass, err: 200 })

        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // get class by Id
    async getById(req, res) {
        let { id } = req.allParams()
        try {
            let classObj = await Class.findOne({ _id: id })
            if (!classObj) {
                return res.json({ err: 401, message: "Invalid class Id" })
            }

            return res.json({ data: classObj, err: 200 })
        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // delete class with id
    async delete(req, res) {
        let { id } = req.allParams()

        try {
            let classObj = await Class.findOne({ _id: id })
            if (!classObj) {
                return res.json({ err: 401, message: "Invalid class Id" })
            }

            await Class.destroy({ _id: id })

            return res.json({ message: `Deleted class with id: ${id}.`, err: 200 });

        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    },

    // update class with id
    async update(req, res) {
        let { id, name, floor } = req.allParams()

        if (!name || !floor) {
            return res.json({ message: 'Data request invalid', err: 400 })
        }

        try {
            let classObj = await Class.findOne({ _id: id })
            if (!classObj) {
                return res.json({ err: 401, message: "Invalid class Id" })
            }

            await Class.updateOne({ _id: id })
                .set({
                    name,
                    floor
                })

            return res.json({ message: `Updated class with id: ${id}`, err: 200 })
        } catch (err) {
            return res.json({ message: err.message, err: 500 })
        }
    }
};

