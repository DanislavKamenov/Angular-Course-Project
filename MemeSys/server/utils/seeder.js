const roleService = require('../services/roleService');
const userService = require('../services/userService');
const categoryService = require('../services/categoryService');
const commentService = require('../services/commentService');
const memeService = require('../services/memeService');

const categories = require('./mock-data/categories');
const memes = require('./mock-data/memes');
const comments = require('./mock-data/comments');

function seedCategoriesWithUser(userId) {
    categories.map(c => c.creator = userId);
    categoryService
        .create(categories)
        .then(categories => {
            console.log('categories seeded!')
            seedMemesWithUser();
        })
        .catch(err => console.log(err));

}

function seedMemesWithUser() {
    userService
        .getAll()
        .then(users => {
            categoryService.getAll()
                .then(cats => {
                    const admin = users.filter(u => u.name === 'Admin')[0];
                    // const pesho = users.filter(u => u.name === 'Pesho')[0];

                    const classicNakov = cats.filter(c => c.name === 'Classic Nakov')[0];
                    const surreal = cats.filter(c => c.name === 'Surreal Memes')[0];
                    const classicalArt = cats.filter(c => c.name === 'Classical Art Memes')[0];

                    memes.nakov.map(m => {
                        m.creator = admin._id;
                        m.category = classicNakov._id;
                    });
                    memes.surreal.map(m => {
                        m.creator = admin._id;
                        m.category = surreal._id;
                    });
                    memes.classicalArt.map(m => {
                        m.creator = admin._id;
                        m.category = classicalArt._id;
                    });
                    const memeArr = [...memes.nakov, ...memes.surreal, ...memes.classicalArt];

                    memeService
                        .create(memeArr)
                        .then((memes) => {
                            console.log('memes seeded!');
                            const educationEntity = memes.filter(m => m.title === 'Образование')[0];
                            const tasseractsEntity = memes.filter(m => m.title === 'Tasseracts')[0];
                            seedCommentsWithUser(educationEntity, admin._id);
                            seedCommentsWithUser(tasseractsEntity, admin._id);
                        })
                        .catch(console.log);
                }).catch(console.log);
        })
        .catch(console.log);
}

function seedCommentsWithUser(meme, userId) {
    comments[meme.title].forEach(c => {
        c.creator = userId;
        commentService
            .create(c, meme._id)
            .then(comments => {
                console.log(meme.title + ' comments seeded!');
            }).catch(console.log);
    });
}

module.exports = {
    seedRolesAndAdmin: () => {
        return new Promise((resolve, reject) => {
            roleService
                .create([{ name: 'Admin' }, { name: 'User' }])
                .then((roles) => {
                    console.log('Roles Seeded!');

                    let admin = {
                        email: 'admin@admin.bg',
                        name: 'Admin',
                        password: '123',
                        roles: [roles[0]._id, roles[1]._id]
                    };

                    userService
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
            roleService.get({ name: { $in: newRoles } })
                .then(roles => {
                    let normalUser = {
                        email: email,
                        name: name,
                        password: pwd,
                        avatar,
                        roles: roles.map(r => r._id)
                    };

                    userService
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