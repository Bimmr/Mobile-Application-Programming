/**
 * Created by Randy on 02/20/17.
 */

/**
 * Clear the database
 */
function rbClearDatabase() {
    var result = confirm("Are you sure?");

    if (result) {
        DB.rbDropTables();
        alert("Dropped All Tables");
    }
}

/**
 * Update the types dropdown
 */
function rbUpdateTypesDropdown(element) {
    type.rbSelectAll(function (tx, result) {
        var code = "";
        result = result.rows;

        for (var i = 0; i < result.length; i++)
            code += "<option value=" + result[i].id + ">" + result[i].name + "</option>";

        $(element).html(code);
        $(element).val(result[0].id).change();

    }, rbErrorHandler);
}
/**
 * Add feedback to the database
 */
function rbAddFeedback() {

    if ($("#rbFrmAdd").valid()) {
        var name = $("#rbAddTxtBusinessName").val();
        var type = $("#rbAddSelectType").val();
        var email = $("#rbAddTxtReviewerEmail").val();
        var comments = $("#rbAddTxtReviewerComments").val();
        var date = $("#rbAddTxtDate").val();
        var rate = $("#rbAddTxtAddRatings").is(':checked');
        var food = $("#rbAddNumRatingFood").val();
        var service = $("#rbAddNumRatingService").val();
        var value = $("#rbAddNumRatingValue").val();

        var options = [name, type, email, comments, date, rate, food, service, value];

        review.rbInsert(options,
            function (tx, result) {
                console.log("Successfully inserted");
                alert("New Feedback Added");
            }, rbErrorHandler);
    }
}
/**
 * Get all the reviews
 */
function rbGetReviews() {
    review.rbSelectAll(
        function (tx, result) {
            var element = $("#rbViewFeedbackList");
            var code = "";
            result = result.rows;

            for (var i = 0; i < result.length; i++) {
                var averageRating = ((parseInt(result[i].rating1)
                + parseInt(result[i].rating2)
                + parseInt(result[i].rating3)) / 3).toFixed(2);

                code += "<li data-icon='false'>";
                code += "<a href='#rbEditFeedbackPage' data-row-id=" + result[i].id + ">";
                code += "<h1>" + result[i].businessName + "</h1>";
                code += "<p>Reviewer Email: " + result[i].reviewerEmail + "</p>";
                code += "<p>Comments: " + result[i].reviewerComments + "</p>";
                code += "<p>" + (result[i].hasRating == "on" ? "Overall Rating: " + averageRating : "" ) + "</p>";
                code += "</a>";
                code += "</li>";
            }
            element.html(code);
            element.listview("refresh");

            $("#rbViewFeedbackList a").click(function () {
                localStorage.setItem("id", $(this).attr("data-row-id"));
            });

        }, rbErrorHandler);
}

/**
 * Show current review on the modify page
 */
function rbShowCurrentReview() {
    var id = localStorage.getItem("id");
    review.rbSelect(id,
        function (tx, result) {

            result = result.rows[0];
            var hasRating = result.hasRating == "true";
            if (hasRating)
                $("#rbEditReviews").show();
            else
                $("#rbEditReviews").hide();

            $("#rbEditTxtBusinessName").val(result.businessName);
            $("#rbEditTxtReviewerEmail").val(result.reviewerEmail);
            $("#rbEditTxtReviewerComments").val(result.reviewerComments);
            $("#rbEditTxtSelectType").val(result.typeId);
            $("#rbEditTxtDate").val(result.reviewDate);
            $("#rbEditTxtAddRatings").prop("checked", hasRating);
            $("#rbEditTxtAddRatings").checkboxradio("refresh");
            $("#rbEditNumRatingFood").val(result.rating1);
            $("#rbEditNumRatingService").val(result.rating2);
            $("#rbEditNumRatingValue").val(result.rating3);

            if (hasRating)
                rbCalculateRating("Edit");

        }, rbErrorHandler);
}

/**
 * Update the current review
 */
function rbUpdate() {

    if ($("#rbFrmEdit").valid()) {

        var name = $("#rbEditTxtBusinessName").val();
        var type = $("#rbEditSelectType").val();
        var email = $("#rbEditTxtReviewerEmail").val();
        var comments = $("#rbEditTxtReviewerComments").val();
        var date = $("#rbEditTxtDate").val();
        var rate = $("#rbEditTxtAddRatings").prop("checked");
        var food = $("#rbEditNumRatingFood").val();
        var service = $("#rbEditNumRatingService").val();
        var value = $("#rbEditNumRatingValue").val();

        var id = localStorage.getItem("id");
        var options = [name, type, email, comments, date, rate, food, service, value, id];

        review.rbUpdate(options,
            function () {
                alert("Feedback has been updated.");
                rbChangePageToReview();
            }, rbErrorHandler);
    }
}

/**
 * Delete the current review
 */
function rbDelete() {

    var id = localStorage.getItem("id");
    review.rbDelete(id,
        function () {
            alert("Feedback has been deleted.");
            rbChangePageToReview();
        }, rbErrorHandler);

}
