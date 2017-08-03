/**
 * Created by Randy on 02/20/17.
 */
/**
 * Toggle the Ratings Area
 * Works for both Add and Edit Pages
 * @param the page to use
 */
function rbToggleRatings(page) {
    //Get the page data
    page = page.data.page;

    var area = $("#rb" + page + "Reviews");
    if (area.is(":visible"))
        area.slideUp();
    else
        area.slideDown();
}

/**
 * Update the default email into the local storage
 */
function rbUpdateDefaultEmail() {
    var email = $("#rbDefaultTxtReviewersEmail").val();
    localStorage.setItem("DefaultEmail", email);

    alert("Default Email Saved as: " + email);
}

/**
 * Calculate the average rating
 * @param the page to use
 */
function rbCalculateRating(page) {

    //Get the page data
    if (typeof page != 'string')
        page = page.data.page;

    var calculatedArea = $("#rb" + page + "NumRatingCalculated");
    var food = parseInt($("#rb" + page + "NumRatingFood").val());
    var service = parseInt($("#rb" + page + "NumRatingService").val());
    var value = parseInt($("#rb" + page + "NumRatingValue").val());

    var calculated = parseFloat((food + service + value) / 3).toFixed(2);
    calculatedArea.val(calculated);
}

