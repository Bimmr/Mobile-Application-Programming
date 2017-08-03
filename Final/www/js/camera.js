/**
 * Created by Randy, Derek on 04/10/17.
 */

function capturePhoto(sCallback, fCallback) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true
    };
    navigator.camera.getPicture(sCallback, fCallback, options);
}

function savePhoto() {

    capturePhoto(
        function (imageURI) {
            SavedBooks.insert([imageURI, localStorage.getItem("email")],
                function () {
                    console.log("Picture saved");
                    showSavedGallery();
                },
                function () {
                    alert("Picture could not be saved");
                });
        },
        function () {
            console.log("No picture saved");
        });
}
