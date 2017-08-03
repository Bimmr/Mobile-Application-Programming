/**
 * Created by Randy on 04/8/17.
 */

/**
 * When the page is ready run the init
 */
$(document).ready(function () {
    initDB();
    init();
});

/**
 * Init the page
 */
function init() {
    $.get("./reviews.html", function (data) {
        $("body").append(data);

        $.get("./settings.html", function (data) {
            $("body").append(data);

            $.get("./saved.html", function (data) {
                $("body").append(data);


                //Turn off native menus
                $.mobile.selectmenu.prototype.options.nativeMenu = false;


                //TODO: Move this to facade
                //Add book types to select
                BookTypes.SelectAll(
                    function (tx, results) {
                        var code = "";

                        for (var i = 0; i < results.rows.length; i++) {
                            code += "<option value='" + results.rows.item(i).typeId + "'>";
                            code += results.rows.item(i).typeName;
                            code += "</option>";
                        }
                        $("#txtSearchGenre").append(code).hide().show();

                    },
                    function () {
                        alert("Something went wrong whilst loading book types. Please try again.");
                    }
                );


                //Navbar
                {
                    //Setup panel navbar
                    $('#navbar').enhanceWithin().panel();

                    //Listen for swipe to open nav
                    $("body").on("swiperight", function () {
                        $("#navbar").panel("open");
                    });
                }

                //Home
                {
                    if (localStorage.getItem("email") == null)
                        $("#popupGetEmail").popup("open");
                    else
                        setEmail(localStorage.getItem("email"));

                    $("#btnHomeEmail").on("click", function (element) {
                        element.preventDefault();

                        //TODO: Move validate to Facade
                        if ($("#frmGetEmail").valid()) {

                            var email = $("#txtHomeEmail").val();
                            setEmail(email);
                            $("#popupGetEmail").popup("close");
                        }

                    });
                }

                //Review Pages
                {

                    //Update validator on anything changing
                    $("#frmSearchBook, #datSearchDatePublished").on("change", function () {
                        doValidate_frmSearchBookReview();
                    });

                    $("#frmSearchBook input").on("keyup", function () {
                        doValidate_frmSearchBookReview();
                    });

                    $("#btnAddReviewSubmit").on("click", function (element) {
                        element.preventDefault();
                        if (doValidate_frmWriteReview()) {
                            var bookId = localStorage.getItem("NewReviewOnBook");
                            var email = $("#txtAddReviewEmail").val();
                            var title = $("#txtAddReviewTitle").val();
                            var text = $("#txtAddReviewText").val();
                            var rating = $("#numAddReviewRating").val();
                            var d = new Date();
                            var date = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();
                            var votes = 0;

                            Reviews.insert([email, date, title, text, rating, votes, bookId],
                                function () {
                                    alert("New Review has been added");
                                    var filters = getSearchFilters();
                                    showReviews(filters[0], filters[1]);
                                },
                                function () {

                                });
                        }
                    });

                    $("#btnSearchBooks").on("click", function (element) {
                        element.preventDefault();
                        if (doValidate_frmSearchBookReview()) {
                            var filter = getSearchFilters();
                            showReviews(filter[0], filter[1]);

                        }
                    });
                }

                //Saved Page
                {
                    $("#btnCapturePhoto").on("click", function () {
                        savePhoto();
                    });
                    $("#pageSaved").on("pageshow", function () {
                       showSavedGallery();
                    });
                }
                //Settings Pages
                {
                    $("#btnSettingsAbout").on("click", function () {
                        $("#popupAbout").popup("open");
                    });

                    $("#btnSettingsSave").on("click", function () {
                        if ($("#frmSettings").valid()) {
                            alert("Email has been updated");
                            localStorage.setItem("email", $("#txtSettingsEmail").val());
                        }
                    });
                }
            });
        });
    });
}

/**
 * Initialize the database
 */
function initDB() {

    try {
        console.info("Creating DB");
        DB.createDatabase();

        if (db != null) {
            console.info("Creating Table");
            DB.createTables();
        }
    } catch (error) {
        console.error("An Error has occurred while creating the database");

    }
}


