/**
 * Created by Randy, Derek on 04/8/17.
 */

jQuery.validator.addMethod("lengthCheck",
    function (value, element) {
        var valid = true;
        if (value !== null && value !== "" && value.length <= 2)
            valid = false
        return valid;
    },
    "Please enter a value with more than 2 characters."
);
jQuery.validator.addMethod("emailcheck",
    function (value, element) {
        var regex = /^.+@/;
        return this.optional(element) || regex.test(value);
    },
    "Please enter a valid email address."
);

function doValidate_frmSearchBookReview() {
    var form = $("#frmSearchBook");
    form.validate({
        rules: {
            txtSearchName: {
                required: function () {
                    var needValue = true;
                    if ($("#txtSearchAuthor").val().length !== 0
                        || $("#txtSearchGenre").val() !== "-1"
                        || $("#datSearchDatePublished").val().length !== 0)
                        needValue = false;

                    return needValue;
                },
                lengthCheck: true,
                maxlength: 25
            },
            txtSearchAuthor: {
                required: function () {
                    var needValue = true;
                    if ($("#txtSearchName").val().length !== 0
                        || $("#txtSearchGenre").val() !== "-1"
                        || $("#datSearchDatePublished").val().length !== 0)
                        needValue = false;

                    return needValue;
                },
                lengthCheck: true,
                maxlength: 25
            },
            datSearchDatePublished: {
                required: function () {
                    var needValue = true;
                    if ($("#txtSearchName").val().length !== 0
                        || $("#txtSearchGenre").val() !== "-1"
                        || $("#txtSearchAuthor").val().length !== 0)
                        needValue = false;

                    return needValue;
                },
                lengthCheck: true,
                maxlength: 25
            }
        },
        messages: {
            txtSearchName: {
                required: "Please Fill in one of the filters",
                lengthCheck: "Please enter a title with more than 2 characters.",
                maxlength: "Book title cannot be more than 25 characters"
            },
            txtSearchAuthor: {
                required: "Please Fill in one of the filters",
                lengthCheck: "Please enter an Author name with more than 2 characters.",
                maxlength: "Author name cannot be more than 25 characters"
            },
            datSearchDatePublished: {
                required: "Please Fill in one of the filters"
            }
        }, groups: {
            inputGroup: "txtSearchName txtSearchAuthor datSearchDatePublished txtSearchGenre"
        },
        errorPlacement: function (error, element) {
            error.insertAfter("#searchErrorText");

            //$("#frmSearchBook .ui-select").addClass(".error");
        }

    });

    return form.valid();
}

function doValidate_frmWriteReview() {
    var form = $("#frmWriteReview");
    form.validate({
        rules: {
            txtAddReviewTitle: {
                required: true,
                minlength: 2,
                maxlength: 25
            },
            txtAddReviewEmail: {
                required: true
            },
            txtEmail: {
                required: true,
                email: true,
                emailcheck: true
            },
            txtAddReviewText: {
                required: true,
                minlength: 10,
                maxlength: 50
            },
            numAddReviewRating: {
                min: 1,
                max: 5
            }
        },
        messages: {
            txtAddReviewTitle: {
                required: "Please enter a review title",
                minlength: "Review title must be at least 2 characters",
                maxlength: "Review title must be less than 25 characters"
            },
            txtAddReviewText: {
                required: "Please enter a review",
                minlength: "Review must be at least 10 characters",
                maxlength: "Review must be less than 100 characters"
            },
            txtAddReviewEmail: {
                required: "Please enter a valid email"
            },
            numAddReviewRating: {
                required: "Please enter an email",
                emailcheck: "Please enter a valid email address"
            }
        }
    });
    return form.valid();
}


/**
 * Get list of fields, and list of values
 * @returns {[fields,values]}
 */
function getSearchFilters() {

    //Format fields and values into array
    var fields = [];
    var values = [];
    if ($("#txtSearchName").val().length !== 0) {
        fields.push("bookName");
        values.push($("#txtSearchName").val());
    }
    if ($("#txtSearchAuthor").val().length !== 0) {
        fields.push("bookAuthor");
        values.push($("#txtSearchAuthor").val());
    }
    if ($("#txtSearchGenre").val() !== "-1") {
        fields.push("bookTypeId");
        values.push($("#txtSearchGenre").val());
    }
    if ($("#datSearchDatePublished").val().length !== 0) {
        fields.push("bookPublishDate");
        values.push($("#datSearchDatePublished").val());
    }

    return [fields, values];
}

/**
 * Update the email
 * @param email
 */
function setEmail(email) {
    localStorage.setItem("email", email);
    $("#txtSettingsEmail").val(email);
    $("#txtAddReviewEmail").val(email);
}

/**
 * Display the saved gallery
 */
function showSavedGallery() {
    var container = $("#savedBookGallery");
    container.html("");

    var code = "";
    SavedBooks.selectByField(["savedEmail"], [localStorage.getItem("email")],
        function (tx, results) {
            if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
                    var path = results.rows.item(i).savedURI;
                    code += "<img src='" + path + "' style='height: 150px; padding: 5px;'>";
                }
                container.append(code);
            }
        },
        function (tx, results) {
            alert("Unable to load images");
        });
}

