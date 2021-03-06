module.exports = (Model) => {
    const modelName = Model.modelName;
    return {
        create: (newEntity) => {
            return new Promise((resolve, reject) => {
                Model
                    .create(newEntity)
                    .then(resolve)
                    .catch(reject);
            });
        },
        getAll: (options, populate) => {
            return new Promise((resolve, reject) => {
                let callback = (resolve);                

                let promise;
                if (populate) {
                    promise = Model
                        .find({}, null, options || {})
                        .populate(populate);
                } else {
                    promise = Model
                        .find({}, null, options || {});
                }
                promise
                    .then(callback)
                    .catch(reject);
            });
        },
        get: (query, options, populate) => {
            return new Promise((resolve, reject) => {
                let callback = (resolve);               

                let promise;
                if (populate) {
                    promise = Model
                        .find(query, null, options || null)
                        .populate(populate);
                } else {
                    promise = Model
                        .find(query, null, options || null);
                }
                promise
                    .then(callback)
                    .catch(reject);
            });
        },
        getOne: (query, options, populate) => {
            return new Promise((resolve, reject) => {
                let callback = (existingEntity) => {
                    if (!existingEntity) {
                        let message = `${modelName} does not exist!`;
                        console.log(message);
                        return reject({ message });
                    }

                    resolve(existingEntity);
                };                

                let promise;
                if (populate) {
                    promise = Model
                        .findOne(query, null, options || {})
                        .populate(populate);
                } else {
                    promise = Model
                        .findOne(query, null, options || {});
                }
                promise
                    .then(callback)
                    .catch(reject);
            });
        },
        update: (query, updatedEntity, options) => {
            return new Promise((resolve, reject) => {
                let callback = (oldEntity) => {
                    if (!oldEntity) {
                        let message = `${modelName} does not exist!`;
                        return reject({ message });
                    }
                    resolve(oldEntity);
                };              
                
                Model   
                    .findOneAndUpdate(query, updatedEntity, options || {})
                    .then(callback)
                    .catch(reject); 
            });
        },
        removeOne: (query, options) => {
            return new Promise((resolve, reject) => {
                let callback = (oldEntity) => {
                    if (!oldEntity) {
                        let message = `Trying to delete ${modelName} but it does not exist!`;
                        return reject({ message });
                    }
                    resolve(oldEntity);
                };              
                
                Model   
                    .findByIdAndRemove(query, options)
                    .then(callback)
                    .catch(reject); 
            });
        },              
        removeMany: (query) => {
            return new Promise((resolve, reject) => {
                let callback = (resolve);           
                
                Model   
                    .deleteMany(query)
                    .then(callback)
                    .catch(reject); 
            });
        }        
    };    
};