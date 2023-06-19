
module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    address: { type: 'string' },
    birthday: { type: 'string' },
    classId: { model: 'Class' },
  },
};

