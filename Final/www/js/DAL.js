/**
 * Created by Randy on 04/8/17.
 */
var Books = {
    /**
     * Insert into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    insert: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "INSERT INTO Books VALUES (" +
                    "NULL,?,?,?,?" +
                    ");";
                tx.executeSql(query, options, sCallback, fCallback);
            },
            errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    select: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "SELECT * FROM Books WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param fields
     * @param values
     * @param sCallback
     * @param fCallback
     */
    selectByField: function (fields, values, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "SELECT * FROM Books WHERE " + fields + " LIKE ?;";
            var options = ["%" + values + "%"];
            if (fields.constructor === Array) {
                query = "SELECT * FROM Books WHERE ";
                options = [];
                for (var i = 0; i < fields.length; i++) {
                    if (i > 0)
                        query += " AND ";
                    query += fields[i] + " LIKE ?";
                    options.push("%" + values[i] + "%");
                }
                query += ";";
            }
            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Update a specific record into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    update: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "UPDATE Books SET" +
                "bookName=?," +
                "bookAuthor=?," +
                "bookPublishDate=?," +
                "bookTypeId=?" +
                "WHERE bookId=?;";
            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Delete a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    delete: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "DELETE FROM Books WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    SelectAll: function (sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "SELECT * FROM Books;";
                tx.executeSql(query, [], sCallback, fCallback);
            },
            errorHandler, successfulTransaction);
    }
}
var Reviews = {
    /**
     * Insert into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    insert: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "INSERT INTO Reviews VALUES (" +
                    "NULL,?,?,?,?,?,?,?" +
                    ");";
                tx.executeSql(query, options, sCallback, fCallback);
            },
            errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    select: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "SELECT * FROM Reviews WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param fields
     * @param values
     * @param sCallback
     * @param fCallback
     */
    selectByField: function (fields, values, sCallback, fCallback) {
        db.transaction(function (tx) {

            var query = "SELECT * FROM Reviews WHERE " + fields + " LIKE ?;";
            var options = ["%" + values + "%"];
            if (fields.constructor == Array) {
                query = "SELECT * FROM Reviews WHERE ";
                options = [];
                for (var i = 0; i < fields.length; i++) {
                    if (i > 0)
                        query += " AND ";
                    query += fields[i] + " LIKE ?";
                    options.push("%" + values[i] + "%");
                }
                query += ";";
            }
            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);
    },
    /**
     * Update a specific record into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    update: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "UPDATE Reviews SET" +
                "reviewName=?," +
                "reviewEmail=?," +
                "reviewDate=?," +
                "reviewTitle=?," +
                "reviewText=?," +
                "reviewVotes=?," +
                "bookTypeId=?" +
                "WHERE reviewId=?;";
            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);
    },
    /**
     * Delete a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    delete: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "DELETE FROM Reviews WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    SelectAll: function (sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "SELECT * FROM Reviews;";
                tx.executeSql(query, [], sCallback, fCallback);
            },
            errorHandler, successfulTransaction);
    }
}
var SavedBooks = {
    /**
     * Insert into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    insert: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "INSERT INTO SavedBooks VALUES (" +
                    "NULL,?,?" +
                    ");";
                tx.executeSql(query, options, sCallback, fCallback);
            },
            errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    select: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "SELECT * FROM SavedBooks WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select a specific record from the database
     * @param fields
     * @param values
     * @param sCallback
     * @param fCallback
     */
    selectByField: function (fields, values, sCallback, fCallback) {
        db.transaction(function (tx) {

            var query = "SELECT * FROM SavedBooks WHERE " + fields + " LIKE ?;";
            var options = ["%" + values + "%"];
            if (fields.constructor == Array) {
                query = "SELECT * FROM SavedBooks WHERE ";
                options = [];
                for (var i = 0; i < fields.length; i++) {
                    if (i > 0)
                        query += " AND ";
                    query += fields[i] + " LIKE ?";
                    options.push("%" + values[i] + "%");
                }
                query += ";";
            }
            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);
    },
    /**
     * Update a specific record into the database
     * @param options
     * @param sCallback
     * @param fCallback
     */
    update: function (options, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "UPDATE SavedBooks SET" +
                "savedURI=?," +
                "savedEmail=?" +
                "WHERE id=?;";
            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);
    },
    /**
     * Delete a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    delete: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "DELETE FROM SavedBooks WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    SelectAll: function (email, sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "SELECT * FROM SavedBooks WHERE savedEmail=?;";
                var options = [email];
                tx.executeSql(query, options, sCallback, fCallback);
            },
            errorHandler, successfulTransaction);
    }
}
var BookTypes = {
    /**
     * Select a specific record from the database
     * @param id
     * @param sCallback
     * @param fCallback
     */
    select: function (id, sCallback, fCallback) {
        db.transaction(function (tx) {
            var query = "SELECT * FROM BookTypes WHERE id=?;";
            var options = [id];

            tx.executeSql(query, options, sCallback, fCallback);
        }, errorHandler, successfulTransaction);

    },
    /**
     * Select all records from the database
     * @param sCallback
     * @param fCallback
     */
    SelectAll: function (sCallback, fCallback) {
        db.transaction(function (tx) {
                var query = "SELECT * FROM BookTypes;";
                var options = [];
                tx.executeSql(query, options, sCallback, fCallback);
            },
            errorHandler, successfulTransaction);
    }
}
