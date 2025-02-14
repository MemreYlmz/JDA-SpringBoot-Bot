function extractVideoCoverFromUrl(url) {
    let videoId = null;
    try {
        const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;

        // Regular expression to match YouTube Music URLs
        const youtubeMusicRegex = /^(?:https?:\/\/)?music\.youtube\.com\/(?:watch\?v=|embed\/|.*[?&]v=)([^"&?\/\s]{11})/i;

        // Try matching against both YouTube and YouTube Music URL patterns
        const youtubeMatch = url.match(youtubeRegex);
        const youtubeMusicMatch = url.match(youtubeMusicRegex);

        // Extract the video ID if matched
        if (youtubeMatch && youtubeMatch[1]) {
            videoId = youtubeMatch[1];
        } else if (youtubeMusicMatch && youtubeMusicMatch[1]) {
            videoId = youtubeMusicMatch[1];
        }
    }
    catch (e) {
        console.log(e);
        return null;
    }

    return `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function setSliderValue(duration,position){
    var slider = document.getElementById("trackSlider");
    slider.max = duration;
    slider.value = position;

}

function getReadableDurationFromMilliseconds(duration){
    var seconds = Math.floor(duration/1000);
    var minutes = Math.floor(seconds/60);
    seconds = seconds - minutes*60;
    return minutes+":"+seconds;
}

var shakingElements = [];

function shake (element, magnitude = 16, angular = false) {
    //First set the initial tilt angle to the right (+1)
    var tiltAngle = 1;

    //A counter to count the number of shakes
    var counter = 1;

    //The total number of shakes (there will be 1 shake per frame)
    var numberOfShakes = 15;

    //Capture the element's position and angle so you can
    //restore them after the shaking has finished
    var startX = 0,
        startY = 0,
        startAngle = 0;

    // Divide the magnitude into 10 units so that you can
    // reduce the amount of shake by 10 percent each frame
    var magnitudeUnit = magnitude / numberOfShakes;

    //The `randomInt` helper function
    var randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Add the element to the `shakingElements` array if it
    //isn't already there
    if(shakingElements.indexOf(element) === -1) {
        //console.log("added")
        shakingElements.push(element);

        //Add an `updateShake` method to the element.
        //The `updateShake` method will be called each frame
        //in the game loop. The shake effect type can be either
        //up and down (x/y shaking) or angular (rotational shaking).
        if(angular) {
            angularShake();
        } else {
            upAndDownShake();
        }
    }

    //The `upAndDownShake` function
    function upAndDownShake() {

        //Shake the element while the `counter` is less than
        //the `numberOfShakes`
        if (counter < numberOfShakes) {

            //Reset the element's position at the start of each shake
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Randomly change the element's position
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);

            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

            //Add 1 to the counter
            counter += 1;

            requestAnimationFrame(upAndDownShake);
        }

        //When the shaking is finished, restore the element to its original
        //position and remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            shakingElements.splice(shakingElements.indexOf(element), 1);
        }
    }

    //The `angularShake` function
    function angularShake() {
        if (counter < numberOfShakes) {
            console.log(tiltAngle);
            //Reset the element's rotation
            element.style.transform = 'rotate(' + startAngle + 'deg)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Rotate the element left or right, depending on the direction,
            //by an amount in radians that matches the magnitude
            var angle = Number(magnitude * tiltAngle).toFixed(2);
            console.log(angle);
            element.style.transform = 'rotate(' + angle + 'deg)';
            counter += 1;

            //Reverse the tilt angle so that the element is tilted
            //in the opposite direction for the next shake
            tiltAngle *= -1;

            requestAnimationFrame(angularShake);
        }

        //When the shaking is finished, reset the element's angle and
        //remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'rotate(' + startAngle + 'deg)';
            shakingElements.splice(shakingElements.indexOf(element), 1);
            //console.log("removed")
        }
    }

};