/**
 * Created by Randy on 02/20/17.
 */

/**
 * When the page is ready run the init
 */
$(document).ready(function () {
    init();
    initDB();
});

/**
 * Add custom Validator method
 */
jQuery.validator.addMethod("between0And5", function (value, element) {
    return this.optional(element) || (parseInt(value) >= 0 && parseInt(value) <= 5);
}, "Value must be 0-5");

/**
 * Perform functions that must be done when the Add page is shown
 */
function rbShowAddPage() {
    rbUpdateTypesDropdown("#rbAddSelectType");
    $("#rbAddTxtReviewerEmail").val(localStorage.getItem("DefaultEmail"));
}
/**
 * Change the page to the Feedback Page
 */
function rbChangePageToReview() {
    $.mobile.changePage("#rbViewFeedbackPage");
}

/**
 * Perform functions that must be done when the Feedback page is shown
 */
function rbShowFeedbackPage() {
    rbUpdateTypesDropdown("#rbEditSelectType");
}
/**
 * Init the page
 */
function init() {

    //Add types to both the add, and modify page

    // Settings Page
    {
        //Load the default email
        var defaultEmail = "RBimm5674@conestogac.on.ca";
        if (localStorage.getItem("DefaultEmail") != null)
            defaultEmail = localStorage.getItem("DefaultEmail");

        $("#rbDefaultTxtReviewersEmail").val(defaultEmail);

        $("#rbDefaultBtnSave").on("tap", rbUpdateDefaultEmail);
        $("#rbDefaultBtnClear").on("tap", rbClearDatabase);
    }

    //Feedback Page
    $("#rbViewFeedbackPage").on("pageshow", rbGetReviews);

    //Feedback Page
    $("#rbViewFeedbackPage").on("pageshow", rbShowFeedbackPage);

    //Add Page
    $("#rbAddFeedbackPage").on("pageshow", rbShowAddPage);
    $("#rbAddBtnSave").on("click", rbAddFeedback);

    //Edit Page
    $("#rbEditFeedbackPage").on("pageshow", rbShowCurrentReview);
    $("#rbEditBtnCancel").on("click", rbChangePageToReview);
    $("#rbEditBtnDelete").on("click", rbDelete);
    $("#rbEditBtnUpdate").on("click", rbUpdate);

    // Add/Edit Page
    {
        var pages = ["Add", "Edit"];
        for (var i = 0; i < pages.length; i++) {

            var page = pages[i];

            $("#rb" + page + "TxtAddRatings").change({page: page}, rbToggleRatings);
            $("#rb" + page + "NumRatingFood").change({page: page}, rbCalculateRating);
            $("#rb" + page + "NumRatingService").change({page: page}, rbCalculateRating);
            $("#rb" + page + "NumRatingValue").change({page: page}, rbCalculateRating);

            //When the date gets changed, check if valid
            // (Prevents the user from having to click elsewhere for it to update)
            $("#rb" + page + "TxtDate").change(function () {
                $(this).valid();
            });


            $("#rbFrm" + page).validate();
            $("#rbFrm" + page + " #rb" + page + "TxtBusinessName").rules("add", {
                required: true,
                rangelength: [2, 20],
                messages: {
                    rangelength: "Length must be 2-30 characters long"
                }
            });
            $("#rbFrm" + page + " #rb" + page + "TxtReviewerEmail").rules("add", {
                required: true
            });
            $("#rbFrm" + page + " #rb" + page + "TxtDate").rules("add", {
                required: true
            });
            $("#rbFrm" + page + " #rb" + page + "NumRatingFood").rules("add", {
                required: true,
                between0And5: true
            });
            $("#rbFrm" + page + " #rb" + page + "NumRatingService").rules("add", {
                required: true,
                between0And5: true
            });
            $("#rbFrm" + page + " #rb" + page + "NumRatingValue").rules("add", {
                required: true,
                between0And5: true
            });
        }
    }
}
/**
 * Initialize the database
 */
function initDB() {

    try {
        console.info("Creating DB");
        DB.rbCreateDatabase();

        if (db != null) {
            console.info("Creating Table");
            DB.rbCreateTables();
        }
    } catch (error) {
        console.error("An Error has occurred while creating the database");

    }
}


