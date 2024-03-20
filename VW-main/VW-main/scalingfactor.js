        // Get the user's screen width
        function handleResize() {
            var screenWidth = window.innerWidth;

            // Set the base resolution width
            var baseResolutionWidth = 1920;

            // Calculate the scaling factor
            var scalingFactor = screenWidth / baseResolutionWidth;

            // Set the scaling factor as a CSS variable
            document.documentElement.style.setProperty('--scaling-factor', scalingFactor);
            }
            window.onresize =handleResize;
            onload = handleResize;