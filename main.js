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

    var playPauseButton = document.getElementById('playPauseButton');
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');
    var progress = document.querySelector('.progress');
    var nowPlayingElement = document.getElementById('nowPlaying');
    var songTitleElement = document.querySelector('#nowPlaying .song-details h4');
    var artistElement = document.querySelector('#nowPlaying .song-details p');
    var avatarImage = document.querySelector('#nowPlaying .avatar img');

    var isPlaying = false;
    var currentSongIndex = 0;
    var audioElement = new Audio();
    var songs = [
        {
            songUrl: "https://firebasestorage.googleapis.com/v0/b/classiq-social.appspot.com/o/songs%2FAna%20dammi%20falastini.mp3?alt=media&token=94bdfff3-72f2-4c1e-bea8-f612a33b0257",
            artist: "Mohammed Assaf",
            songName: "Ana Dammi FalasTini",
            imageUrl: "https://example.com/song1.jpg"
        },
        {
            songUrl: "https://firebasestorage.googleapis.com/v0/b/classiq-social.appspot.com/o/songs%2FDua%20Lipa%2C%20Ang%C3%A8le%20-%20Fever%20.mp3?alt=media&token=e5d57066-e95a-45d6-a170-f0515f5aa81b",
            artist: "Dua Lipa ft Angele",
            songName: "Fever",
            imageUrl: "https://example.com/song2.jpg"
        },
        {
            songUrl: "https://firebasestorage.googleapis.com/v0/b/classiq-social.appspot.com/o/songs%2FMaroon%205%20-%20Beautiful%20Mistakes%20ft.%20Megan%20Thee%20Stallion%20.mp3?alt=media&token=4d406227-badb-4e88-9f42-08513bb4a423",
            artist: "Maroon 5 ft Meghan",
            songName: "Beautiful Mistake",
            imageUrl: "https://example.com/song3.jpg"
        }
        // Add more song objects here as needed
    ];

    playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevButton.addEventListener('click', function() {
        playPreviousSong();
    });

    nextButton.addEventListener('click', function() {
        playNextSong();
    });

    var progressInterval; // Declare the progress update interval variable

    function playSong() {
        isPlaying = true;
        playPauseButton.innerHTML = '<i class="fas fa-pause fa-lg"></i>';
        audioElement.src = songs[currentSongIndex].songUrl;
        audioElement.play();
        updateNowPlaying();
        avatarImage.classList.add('rotate'); // Add the rotate class to start rotation

        // Update progress every 100 milliseconds
        progressInterval = setInterval(updateProgress, 100);
    }

    function pauseSong() {
        isPlaying = false;
        playPauseButton.innerHTML = '<i class="fas fa-play fa-lg"></i>';
        audioElement.pause();
        clearInterval(progressInterval); // Clear the progress update interval
        avatarImage.classList.remove('rotate'); // Remove the rotate class to stop rotation
    }

    function updateProgress() {
        var progressWidth = (audioElement.currentTime / audioElement.duration) * 100;
        progress.style.width = progressWidth + '%';
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        if (isPlaying) {
            playSong();
        } else {
            updateNowPlaying();
        }
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        if (isPlaying) {
            playSong();
        } else {
            updateNowPlaying();
        }
    }

    function updateNowPlaying() {
        songTitleElement.textContent = songs[currentSongIndex].songName;
        artistElement.textContent = songs[currentSongIndex].artist;
        avatarImage.src = songs[currentSongIndex].imageUrl; // Set the image source to the song's imageUrl
    }

    var songList = document.querySelector('#songsScreen .song-list');

    songs.forEach(function(song, index) {
        var songListItem = document.createElement('li');
        songListItem.classList.add('song-list-item');
        var songTitle = document.createElement('p');
        songTitle.classList.add('song-title');
        songTitle.textContent = song.songName;
        var artistName = document.createElement('p');
        artistName.classList.add('artist-name');
        artistName.textContent = song.artist;
        songListItem.appendChild(songTitle);
        songListItem.appendChild(artistName);
        songListItem.addEventListener('click', function() {
            currentSongIndex = index;
            playSong();
        });
        songList.appendChild(songListItem);
    });

    // Show the loader
    loader.style.display = 'flex';

    // Delay hiding the loader for 5 seconds
    setTimeout(function() {
        loader.style.display = 'none';
    }, 5000);
});
