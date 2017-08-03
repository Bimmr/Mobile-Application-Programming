/**
 * Created by Randy on 04/8/17.
 */

var db;
var DB = {

    createDatabase: function () {
        var shortName = "BookWorms";
        var version = "1.0";
        var displayName = "DB for BookWorms";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database...");
        db = openDatabase(shortName, version, displayName, dbSize, function () {
            console.info("Success: Database was created");
        });

    },
    createTables: function () {

        console.info("Create Tables ...");

        //Create Book Type
        db.transaction(function (tx) {
            var query = "CREATE TABLE BookTypes (" +
                "typeId     INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "typeName   VARCHAR(25)  NOT NULL" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Type Table created");
                //Add Default Types

                db.transaction(function (tx) {
                    var query = "INSERT INTO BookTypes (typeName) VALUES " +
                        "('Fiction')," +
                        "('Non-Fiction');";
                    tx.executeSql(query, [], function (tx, result) {
                        console.info("Success: Default Types Added");
                    }, errorHandler);
                }, errorHandler, successfulTransaction);

            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create Book Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE Books (" +
                "bookId             INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "bookName           VARCHAR(25)  NOT NULL," +
                "bookAuthor         VARCHAR(25)  NOT NULL," +
                "bookPublishDate    DATETIME," +
                "bookTypeId         INTEGER      NOT NULL," +
                "FOREIGN KEY(bookTypeId) REFERENCES BookTypes(typeId)" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Book Table created");

                db.transaction(function (tx) {
                    var query = "INSERT INTO Books VALUES " +
                        "(NULL, 'The Great Gatsby', 'F. Scott Fitzgerald', '5/22/1925', 1)," +
                        "(NULL, 'To Kill a Mocking Bird', 'Harper Lee', '6/8/1960', 1)," +
                        "(NULL, 'Lord of the Flies', 'William Godling', '3/1/1954', 1)," +
                        "(NULL, 'Persuasion', 'Jane Austen', '12/4/1890', 1)," +
                        "(NULL, 'Night', 'Elie Wiesel', '1/1/1958', 2)," +
                        "(NULL, 'Yes Please', 'Amy Poehler', '4/1/2014', 2)," +
                        "(NULL, 'The God Delusion', 'Richard Dawkins', '11/4/2006', 2)," +
                        "(NULL, 'Me Talk Pretty One Day', 'David Sedaris', '7/25/2000', 2)," +
                        "(NULL, 'Wuthering Heights', 'Emile Bronte', '3/12/1847', 1);";
                    tx.executeSql(query, [], function (tx, result) {
                        console.info("Success: Default Books Added");
                    }, errorHandler);
                }, errorHandler, successfulTransaction);

            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create Review Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE Reviews (" +
                "reviewId             INTEGER       NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "reviewEmail          VARCHAR(25)   NOT NULL," +
                "reviewDate           DATETIME      NOT NULL," +
                "reviewTitle          VARCHAR(25)   NOT NULL," +
                "reviewText           VARCHAR(100)  NOT NULL," +
                "reviewRating         INTEGER       NOT NULL," +
                "reviewVotes          INTEGER       NOT NULL," +
                "bookId               INTEGER       NOT NULL," +
                "FOREIGN KEY(bookId) REFERENCES Book(bookId)" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Review Table created");

                db.transaction(function (tx) {
                    var query = "INSERT INTO Reviews VALUES " +
                        "(NULL, 'jsmith@yahoo.ca', '3/6/2016', 'Classic!', 'I loved this novel! Its such a good read, " +
                        "definitely worth looking in to.', 5, 5, 1)," +
                        "(NULL, 'edouglas@gmail.com', '2/12/2017', 'It was confusing', 'I found the story difficult " +
                        "to follow. Too many different plot points', 2, 2, 3)," +
                        "(NULL, 'dfusari@gmail.com', '8/18/2017', 'Okay.', 'Not very interesting. " +
                        "Could not finish it because I got too bored', 2,  0, 5)," +
                        "(NULL, 'gharvey@msn.ca', '7/19/2015', 'Super Fun Read.', 'I really enjoyed this book. " +
                        "I would recommend it highly for people even remotely interested', 5,  0, 8)," +
                        "(NULL, 'rbimmA@gmail.com', '12/25/2018', 'Excellent read', 'A classic book to curl up and read over christmas holidays', 4, 5, 1);";
                    tx.executeSql(query, [], function (tx, result) {
                        console.info("Success: Default Reviews Added");
                    }, errorHandler);
                }, errorHandler, successfulTransaction);

            }, errorHandler);
        }, errorHandler, successfulTransaction);

        //Create SavedBooks Table
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS SavedBooks (" +
                "savedId            INTEGER      NOT NULL       PRIMARY KEY     AUTOINCREMENT," +
                "savedURI           VARCHAR(50)  NOT NULL," +
                "savedEmail         VARCHAR(50)  NOT NULL" +
                ");";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: SavedBooks Table created");
            }, errorHandler);
        }, errorHandler, successfulTransaction);


    },
    dropTable: function (table) {
        console.info("Drop Tables ...");
        db.transaction(function (tx) {
            var query = "DROP TABLE IF EXISTS " + table + ";"

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: " + table + " Table dropped")
            }, errorHandler);
        }, errorHandler, successfulTransaction);
    },

    dropTables: function () {
        DB.dropTable("Books");
        DB.dropTable("BookTypes");
        DB.dropTable("Reviews");
        DB.dropTable("SavedBooks");
    }
}


function errorHandler(tx, error) {
    console.error("SQL Error: %s (%s) -- %s", tx, error.code, error.message);
}
function successfulTransaction() {
    console.info("Success: Transaction is successful");
}