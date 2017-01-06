class PagesComponent {
    beforeRegister() {
        this.is = 'server-pages';
    }

    ready() {
        /* GET home page. */
        this.homePage = (req, res) => {
            res.render('index', { title: 'Express' });
        };

        /* GET Hello World page. */
        this.helloWorldPage = (req, res) => {
            res.render('helloworld', { title: 'Hello, World!' })
        };

        /* GET Userlist page. */
        this.userListPage = (req, res) => {
            const db = req.db;
            const collection = db.get('usercollection');
            collection.find({}, {}, (e,docs) => {
                res.render('userlist', {
                    "userlist" : docs
                });
            });
        };

        /* GET New User page. */
        this.newUserPage = (req, res) => {
            res.render('newuser', { title: 'Add New User' });
        };
    }
}

Polymer(PagesComponent);
