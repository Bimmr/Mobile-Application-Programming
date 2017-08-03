/**
 * Created by Randy on 02/20/17.
 */
var review = {
    /**
     * Insert into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    rbInsert: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "INSERT INTO review" +
                    "(id,businessName,typeId,reviewerEmail,reviewerComments,reviewDate," +
                    "hasRating,rating1,rating2,rating3) " +
                    "VALUES (null,?,?,?,?,?,?,?,?,?);";
                tx.executeSql(query, options, sCallback, fCallback);
            },
            rbErrorHandler, rbSuccessfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    rbSelect: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "SELECT * FROM review WHERE id = ?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, rbErrorHandler, rbSuccessfulTransaction);

    },
    /**
     * Update a specific record into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    rbUpdate: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "UPDATE review SET " +
                "businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, " +
                "hasRating=?, rating1=?, rating2=?, rating3=?" +
                "WHERE id = ?;";

            tx.executeSql(query, options, sCallback, fCallback);
        }, rbErrorHandler, rbSuccessfulTransaction);

    },
    /**
     * Delete a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    rbDelete: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "DELETE FROM review WHERE id = ?";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, rbErrorHandler, rbSuccessfulTransaction);

    },
    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    rbSelectAll: function (sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "SELECT * FROM review;";
                tx.executeSql(query, [], sCallback, fCallback);
            },
            rbErrorHandler, rbSuccessfulTransaction);
    }
}
var type = {

    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    rbSelectAll: function (sCallback, fCallback) {

        db.transaction(function (tx) {
                var query = "SELECT * FROM type;";
                var options = [];

                tx.executeSql(query, options, sCallback, fCallback);
            },
            rbErrorHandler, rbSuccessfulTransaction);
    }
}
