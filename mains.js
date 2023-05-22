window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    var homeButton = document.getElementById('homeButton');
    var songsButton = document.getElementById('songsButton');

    var homeScreen = document.getElementById('homeScreen');
    var songsScreen = document.getElementById('songsScreen');

    homeButton.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveScreen('home');
    });

    songsButton.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveScreen('songs');
    });

    function setActiveScreen(screen) {
        homeScreen.classList.remove('active');
        songsScreen.classList.remove('active');

        if (screen === 'home') {
            homeScreen.classList.add('active');
        } else if (screen === 'songs') {
            songsScreen.classList.add('active');
        }
    }

    // Hide the loader once all resources are loaded
    loader.style.display = 'none';

    var playPauseButton = document.getElementById('playPauseButton');
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');
    var progress = document.querySelector('.progress');

    var isPlaying = false;

    playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevButton.addEventListener('click', function() {
        // Handle previous song logic
    });

    nextButton.addEventListener('click', function() {
        // Handle next song logic
    });

    function playSong() {
        isPlaying = true;
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        // Start playing the song and update progress
        updateProgress();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        // Pause the currently playing song
    }

    function updateProgress() {
        // Update the progress bar based on the song's current progress
        // You can use a timer or a setInterval function to update it periodically
        // Example:
        var progressWidth = 50; // Example value, you can replace it with the actual progress
        progress.style.width = progressWidth + '%';
    }

    // Firebase configuration
    var firebaseConfig = {
    
    
        apiKey: "AIzaSyBqdH0t362zEz298Lc3b6RIpv4v2st-W1w",
    
    
        authDomain: "classiq-social.firebaseapp.com",
    
    
        projectId: "classiq-social",
    
    
        storageBucket: "classiq-social.appspot.com",
    
    
        messagingSenderId: "361602437616",
    
    
        appId: "1:361602437616:web:cbcda373f5c0de9e548d35",
    
    
        measurementId: "G-BFD72J4LJL"
    
    
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var storage = firebase.storage();

    // Fetch the list of songs from Firebase Storage
    var songsRef = storage.ref('songs');
    songsRef.listAll()
        .then(function(result) {
            // Process the list of songs
            result.items.forEach(function(songRef) {
                // Get the download URL for each song
                songRef.getDownloadURL()
                    .then(function(url) {
                        // Use the song URL to play or display the song in your application
                        console.log("Song URL:", url);
                        // Generate song cards or perform any other logic with the song URL
                    })
                    .catch(function(error) {
                        console.log("Error getting song download URL:", error);
                    });
            });
        })
        .catch(function(error) {
            console.log("Error fetching songs from Firebase Storage:", error);
        });
});
