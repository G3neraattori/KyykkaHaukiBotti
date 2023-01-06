const fs = require("fs").promises;

//TODO: The search method is duplicated. Move to a function that returns the placement of user in userdata.json
module.exports = {
    // Add new user to userdata.json
    createUser: async (user) => {
        const filename = "./models/userdata.json";
        let users = [
            {},
        ];

        const file = await fs.readFile(filename);
        users = JSON.parse(file);
        users.push(user);
        await fs.writeFile(filename, JSON.stringify(users, null, 4));

    },

    //Removes user from userdata.json
    removeUser: async(name) => {
        const filename = "./models/userdata.json";
        const file2 = await fs.readFile('./models/userdata.json')
        let users = [
            {},
        ];
        users = await JSON.parse(file2);

        for (let i = 0; i < users.length; i++) {

            if (users[i].id.toString().includes(name)) {
                delete users[i];
                users.splice(i,1);
                //console.log("User removed")
                await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));

            }
        }

    },

    //Finds user from userdata.json by telegram id
    findUser: async (userid) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let user = await JSON.parse(file2);
        for (let i = 0; i < user.length; i++) {
            if (user[i].id.toString().includes(userid)) {
                return user[i].id;
            }

        }
        return false;
    },

    findUserByName: async (name) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let user = await JSON.parse(file2);
        for (let i = 0; i < user.length; i++) {
            if (user[i].name.toString().includes(name)) {
                return user[i].id;
            }

        }
        return false;
    },

    //Currently unused
    updateUser: async (name, what) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let users = [
            {},
        ];
        users = await JSON.parse(file2);

        for (let i = 0; i < users.length; i++) {
            //console.log(users[i].name);
            if (users[i].name.toString().includes(name)) {
                users[i].name = what
                await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));

            }
        }
    },

    //Finds how many hauki the is left in database
    findHauki: async (userid) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let user = await JSON.parse(file2);
        for (let i = 0; i < user.length; i++) {
            if (user[i].id.toString().includes(userid)) {
                //console.log('Hauet' + user[i].hauet);
                return user[i].hauet;
            }

        }
        return false;
    },

    //Removes one hauki from hauki database
    juoHauki: async (id) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let users = [
            {},
        ];
        users = await JSON.parse(file2);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id.toString().includes(id)) {
                let hauet = users[i].hauet -= 1
                if(hauet < 0){
                    console.log("There are none left.");
                    users[i].hauet = 0;
                    await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));
                    return false;
                }
                await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));
                return true;
            }
        }
    },
    //Removes one hauki from hauki database
    juoLauta: async (id) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let users = [
            {},
        ];
        users = await JSON.parse(file2);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id.toString().includes(id)) {
                for(let x = 0; x <= 6; x++){
                    let hauet = users[i].hauet -= 1
                    if(hauet < 0){
                        console.log("There are none left.");
                        users[i].hauet = 0;
                        await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));
                        return false;
                    }
                }
                await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));
                return true;
            }
        }
    },

    lisaaHaukia: async (id, number) => {
        const file2 = await fs.readFile('./models/userdata.json')
        let users = [
            {},
        ];
        users = await JSON.parse(file2);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id.toString().includes(id)) {
                users[i].hauet = (users[i].hauet * 1) + (number * 1);
                await fs.writeFile('./models/userdata.json', JSON.stringify(users, null, 4));
                return true;
            }
        }
    },
};


/*
const user = {
   "name": "template",
   "tg": "template",
   "hauet": 0,
};
*/