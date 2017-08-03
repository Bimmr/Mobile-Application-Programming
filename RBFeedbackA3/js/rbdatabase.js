/**
 * Created by Randy on 02/20/17.
 */

var db;
var DB = {

    rbCreateDatabase: function () {
        var shortName = "FeedbackDB";
        var version = "1.0";
        var displayName = "DB for Feedback App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database...");
        db = openDatabase(shortName, version, displayName, dbSize, function () {
            console.info("Success: Database was created");
        });

    },
    rbCreateTables: function () {

        console.info("Create Tables ...");

        DB.rbDropTable("type");
        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS type( "
                + "id               INTEGER     NOT NULL     PRIMARY KEY     AUTOINCREMENT,"
                + "name             VARCHAR(20) NOT NULL);";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Type Table created");
            }, rbErrorHandler);
        }, rbErrorHandler, rbSuccessfulTransaction);

        db.transaction(function (tx) {
            var query = "INSERT INTO type (name) VALUES " +
                "(?)," +
                "(?)," +
                "(?);";
            var options = ['Canadian', 'Asian', 'Other'];

            tx.executeSql(query, options, function (tx, result) {
                console.info("Success: Default Types Added");
            }, rbErrorHandler);
        }, rbErrorHandler, rbSuccessfulTransaction);


        db.transaction(function (tx) {
            var query = "CREATE TABLE IF NOT EXISTS review( " +
                "id                 INTEGER     NOT NULL    PRIMARY KEY     AUTOINCREMENT," +
                "businessName       VARCHAR(30) NOT NULL," +
                "typeId             INTEGER     NOT NULL," +
                "reviewerEmail      VARCHAR(30)," +
                "reviewerComments   TEXT," +
                "reviewDate         DATE," +
                "hasRating          VARCHAR(1)," +
                "rating1            INTEGER," +
                "rating2            INTEGER," +
                "rating3            INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: Review Table created");
            }, rbErrorHandler);
        }, rbErrorHandler, rbSuccessfulTransaction);

    }
    ,

    rbDropTable: function (table) {
        console.info("Drop Tables ...");
        db.transaction(function (tx) {
            var query = "DROP TABLE IF EXISTS "+table+";"

            tx.executeSql(query, [], function (tx, result) {
                console.info("Success: "+table +" Table dropped")
            }, rbErrorHandler);
        }, rbErrorHandler, rbSuccessfulTransaction);
    },

    rbDropTables: function () {
        DB.rbDropTable("type");
        DB.rbDropTable("review");
    }
}


function rbErrorHandler(tx, error) {
    console.error("SQL Error: %s (%s) -- %s", tx, error.code, error.message);
}
function rbSuccessfulTransaction() {
    console.info("Success: Transaction is successful");
}