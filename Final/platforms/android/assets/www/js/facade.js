/**
 * Created by Randy on 04/8/17.
 */

/**
 * Clear the database
 */
function clearDatabase() {
    var result = confirm("Are you sure?");

    if (result) {
        DB.dropTables();
        localStorage.removeItem("email");
        localStorage.removeItem("NewReviewOnBook");
        alert("Dropped All Tables");
    }
}

/**
 * Show reviews (Will also open the page)
 * @param fields
 * @param values
 */
function showReviews(fields, values) {

    //Get all books that match fields
    Books.selectByField(fields, values,
        function (tx, bookResults) {
            if (bookResults.rows.length > 0) {
                var element = $("#reviewList");
                element.html("");
                $.mobile.changePage("#pageShowReviews");

                //Iterate through all books
                for (var bRow = 0; bRow < bookResults.rows.length; bRow++) {
                    getReviews(element, bookResults.rows.item(bRow));
                }

                setTimeout(function () {
                    $(".addNewReview").on("click", function (element) {
                        var bookId = $(this).data("bookid");
                        localStorage.setItem("NewReviewOnBook", bookId);

                        $.mobile.changePage("#pageAddReview");
                    });
                }, 500);
            } else {
                $.mobile.changePage("#pageReviewSearch");
                alert("No books were found with those details");
            }
        }, errorHandler);

    /**
     * Get all reviews related to the
     * @param element
     * @param bookRow
     */
    function getReviews(element, bookRow) {

        //Get all reviews that match the books
        Reviews.selectByField("bookId", bookRow.bookId,
            function (tx, reviewResults) {

                //Manually set classes/etc because it doesn't work nicely when you have multiple listviews being added at the same time, to the same div
                var code = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
                code += "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit'> <h1>" + bookRow.bookName + " (" + bookRow.bookAuthor + ")" + "</h1></li>";

                //Iterate through all review
                for (var revRow = 0; revRow < reviewResults.rows.length; revRow++) {
                    var reviewRow = reviewResults.rows.item(revRow);
                    code += "<li data-icon='none' class='ui-li-static ui-body-inherit'>";
                    code += "<p class='ui-li-aside'>" + reviewRow.reviewDate + "</p>";
                    code += "<h3>" + reviewRow.reviewTitle + "</h3>";
                    code += "<p>" + reviewRow.reviewText + "</p>";
                    for (var rate = 1; rate <= 5; rate++)
                        code += "<i class='fa fa-star" + (rate <= reviewRow.reviewRating ? "" : "-o") + "' aria-hidden='true'></i>";
                    code += "<div class='ui-li-aside bottom'><i class='fa fa-arrow-up' aria-hidden='true'></i><br>" + reviewRow.reviewVotes + "</div>";
                    code += "<p>" + reviewRow.reviewEmail + "</p>";
                    code += "</li>";
                }
                code += "<li data-icon='plus'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-plus addNewReview' data-bookid='" + bookRow.bookId + "'><h1>Add A New Review</h1></a></li>";
                code += "</ul>";
                element.append(code);
            },
            function () {
                var code = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
                code += "<li data-role='list-divider' role='heading' class='ui-li-divider ui-bar-inherit'> <h1>" + bookRow.bookName + " (" + bookRow.bookAuthor + ")" + "</h1></li>";
                code += "<li data-icon='plus'><a href='#' class='ui-btn ui-btn-icon-right ui-icon-plus'><h1>Add A New Review</h1></a></li>";
                code += "</ul>";
                element.append(code);
            }
        );
    }
}
