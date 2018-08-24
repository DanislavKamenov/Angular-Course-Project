const mongoose = require('mongoose');
const seeder = require('../utils/seeder');

module.exports = (config) => {
    mongoose.connect(config.connectionString);

    let database = mongoose.connection;

    database.once('open', () => {
        console.log('Database connected!');

        database.db.listCollections({}).next((err, coll) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!coll) {
                //This seeds admin user and roles if there is no Database.
                //If you want to reseed the data please DROP the current Database.
                seeder.seedRolesAndAdmin()
                    .then(() => {
                        const promises = [
                            seeder.seedUser('pesho@abv.bg', 'Pesho', 'asd1', ['User'], 'https://i.pinimg.com/736x/29/a8/20/29a82067b71bd9e3df95e1c0ba5c4daf--fantasy-art-avatar-jake-sully.jpg'),
                            seeder.seedUser('stefka@abv.bg', 'Stefka', 'asd1', ['User'], 'https://thumbs.dreamstime.com/b/cute-girl-avatar-icon-young-woman-glasses-pretty-lady-portrait-cartoon-illustration-beautiful-brunette-76317721.jpg'),
                        ];

                        Promise
                            .all(promises)
                            .then((users) => {

                            });
                    });
            }
        });
    }).on('error', err => {
        console.log('Connection Error:');
        console.log(err);
    });
};