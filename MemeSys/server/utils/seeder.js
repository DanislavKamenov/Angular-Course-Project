const Role = require('../models/Role');
const User = require('../models/User');
const categoryService = require('../services/categoryService');
const commentService = require('../services/commentService');
const categories = require('./mock-data/categories');

function seedCategoriesWithUser(userId) {
    categories.forEach(c => c.creator = userId);
    categoryService
        .create(categories)
        .then(categories => console.log('categories seeded!'))
        .catch(err => console.log(err));

}

module.exports =  {
    seedRolesAndAdmin: () => {
        return new Promise((resolve, reject) => {
            Role
                .insertMany([{ name: 'Admin' }, { name: 'User' }])
                .then((roles) => {
                    console.log('Roles Seeded!');

                    let admin = {
                        email: 'admin@admin.bg',
                        name: 'Admin',
                        password: '123',
                        roles: [roles[0]._id, roles[1]._id]
                    };

                    User
                        .create(admin)
                        .then((user) => {
                            console.log('Admin seeded!');
                            seedCategoriesWithUser(user._id);
                            resolve();
                        }).catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    reject(err);
                });

        });
    },
    seedUser(email, name, pwd, newRoles, avatar) {
        return new Promise((resolve, reject) => {
            Role.find({ name: { $in: newRoles } })
                .then(roles => {
                    let normalUser = {
                        email: email,
                        name: name,
                        password: pwd,
                        avatar,
                        roles: roles.map(r => r._id)
                    };

                    User
                        .create(normalUser)
                        .then((user) => {
                            console.log(`${user.name} seeded!`);
                            resolve(user);
                        }).catch(err => {
                            console.log(err);
                            reject(err);
                        });

                });
        });
    }    
};