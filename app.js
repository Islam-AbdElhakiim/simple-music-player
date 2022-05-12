let realAudio = document.querySelector("#realAudio"),
	mainPlayBtn = document.querySelector("#mainPlay"),
	listPlayBtns = document.querySelectorAll(".song-play-btn"),
	musicListWrapper = document.querySelector(".musicList"),
	currentSong = 1,
	isPlaying = false,
	lastSong = 0,
	songCover = document.querySelector(".cover"),
	playedTimeSpan = document.querySelector("#played"),
	totalTimeSpan = document.querySelector("#total"),
	timeRange = document.querySelector("#seekingStick");

function handleTime(melli) {
	let output;
	let minutes = Math.floor(melli / 60);
	let seconds = Math.floor((melli / 60 - minutes) * 60);
	if (minutes < 10) {
		if (seconds < 10) {
			output = `0${minutes}:0${seconds}`;
		} else {
			output = `0${minutes}:${seconds}`;
		}
	} else {
		if (seconds < 10) {
			output = `${minutes}:0${seconds}`;
		} else {
			output = `${minutes}:${seconds}`;
		}
	}
	return output;
}

function handleRange(flag) {
	let timeInterval;
	if (flag) {
		timeInterval = setInterval(() => {
			//set range value
			timeRange.value = realAudio.currentTime;
			//set current time
			playedTimeSpan.innerHTML = handleTime(realAudio.currentTime);
		}, 100);
	} else {
		clearInterval(timeInterval);
	}
}

function playMusic(current) {
	//change src only if user changed song
	if (current != lastSong) {
		realAudio.src = `assets/${current}.mp3`;
		// songCover.style.backgroundImg = `url('assets/1w.jpg)`;
		console.log(songCover);
	}

	realAudio.play();
	isPlaying = true;
	mainPlayBtn.innerHTML = "<i class='fas fa-pause-circle'></i>";
	for (i = 1; i <= 3; i++) {
		if (i != current) {
			listPlayBtns[
				i - 1
			].innerHTML = `<i class='far fa-play-circle' id=${i}></i>`;
		}
	}
	listPlayBtns[
		current - 1
	].innerHTML = `<i class='far fa-pause-circle' id=${current}></i>`;

	handleRange(true);

	//set duration time
	setTimeout(() => {
		totalTimeSpan.innerHTML = handleTime(realAudio.duration);
		//Set Time Range with song's duration
		timeRange.setAttribute("min", 0);
		timeRange.setAttribute("max", Math.floor(realAudio.duration));
	}, 400);

	lastSong = current;
}

function pauseMusic() {
	realAudio.pause();
	isPlaying = false;
	for (i = 1; i <= 3; i++) {
		listPlayBtns[
			i - 1
		].innerHTML = `<i class='far fa-play-circle' id=${i}></i>`;
	}
	mainPlayBtn.innerHTML = `<i class='fas fa-play-circle' id=${currentSong}></i>`;
}

//Main PlayBtn play or pause
mainPlayBtn.addEventListener("click", () => {
	if (!isPlaying) {
		playMusic(currentSong);
	} else {
		pauseMusic();
	}
});

//Music List play buttons
musicListWrapper.addEventListener("click", (e) => {
	switch (Number(e.target.id)) {
		case 1:
			if (!isPlaying) {
				currentSong = 1;

				playMusic(currentSong);
			} else {
				if (currentSong != 1) {
					currentSong = 1;
					playMusic(currentSong);
				} else {
					pauseMusic();
				}
			}

			break;
		case 2:
			if (!isPlaying) {
				// console.log("1st");
				currentSong = 2;
				playMusic(currentSong);
			} else {
				if (currentSong != 2) {
					// console.log("2nd");
					currentSong = 2;
					playMusic(currentSong);
				} else {
					// console.log("3rd");
					pauseMusic();
				}
			}
			break;
		case 3:
			if (!isPlaying) {
				console.log("1st");
				currentSong = 3;
				playMusic(currentSong);
			} else {
				if (currentSong != 3) {
					console.log("2nd");
					currentSong = 3;
					playMusic(currentSong);
				} else {
					console.log("3rd");
					pauseMusic();
				}
			}
			break;
		default:
			currentSong = 1;
			break;
	}
});

// timeRange.addEventListener("change", (e) => {});
function seekPlayer(value) {
	//set Current time
	// handleRange(false);
	realAudio.currentTime = value;
}

function changeVolume(value) {
	realAudio.volume = value;
	console.log(volume);
}
