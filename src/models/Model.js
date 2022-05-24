class Model {
    constructor (mongoose, name, QueryBuilder, schema) {
        this._schema = schema;
        
        this._createModel(mongoose.model, name, QueryBuilder);
    };

    _createModel = (createModel, modelName, QueryBuilder) => (
        this.model = new QueryBuilder(createModel(modelName, this._schema))
    );

    add = (data) => this.model.add(data);

    delete = (_id) => this.model.updateOne(
        { _id },
        { isDeleted: true }
    );

    exists = async (condition) => (await this.model.count(condition)) >= 1;
};

module.exports = Model;