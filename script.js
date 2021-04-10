const body = document.querySelector('body');
const time = document.querySelector('.time');
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focusText = document.querySelector('.focus');
const showButton = document.querySelector('.button-show');
const cityText = document.querySelector('.city');
const base = '../momentum/assets/images/showbg/';
let i = 0;
const nightArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];
const morningArray = ['07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg'];
const dayArray = ['13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg'];
const eveningArray = ['19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg'];
let nightArrayShuffle = shuffleCards(nightArray);
let morningArrayShuffle = shuffleCards(morningArray);
let dayArrayShuffle = shuffleCards(dayArray);
let eveningArrayShuffle = shuffleCards(eveningArray);
let cardsArray = [...nightArrayShuffle, ...morningArrayShuffle, ...dayArrayShuffle, ...eveningArrayShuffle];
const api = {
    key: "558ef0dc48039d0b4cd8d42ac5251fe5",
    base: "https://api.openweathermap.org/data/2.5/"
}

let quotes=[
    ["Common sense is the collection of prejudices acquired by age eighteen.", "Albert Einstein"],
    ["Never do anything against conscience even if the state demands it.", "Harry Truman"],
    ["I hate Indians. They are a beastly people with a beastly religion.", "Winston Churchill"],
    ["History will be kind to me for I intend to write it.", "Winston Churchill"],
    ["Far and away the best prize that life offers is the chance to work hard at work worth doing.", "Theodore Roosevelt"],
    ["A vote is like a rifle: its usefulness depends upon the character of the user.", "Theodore Roosevelt"],
    ["I wish to preach, not the doctrine of ignoble ease, but the doctrine of the strenuous life.", "Theodore Roosevelt"],
    ["For rarely are sons similar to their fathers: most are worse, and a few are better than their fathers.", "Homer"],
    ["I detest that man who hides one thing in the depths of his heart, and speaks for another.", "Homer"],
    ["The minds of the everlasting gods are not changed suddenly.", "Homer"],
    ["Insanity: doing the same thing over and over again and expecting different results.", "Albert Einstein"],
    ["You cannot simultaneously prevent and prepare for war.", "Albert Einstein"],
    ["Truth is what stands the test of experience.", "Albert Einstein"],
    ["I really thought that love would save us all.", "John Lennon"],
    ["Living is easy with eyes closed, misunderstanding all you see.", "John Lennon"],
    ["Subdue your appetites, my dears, and you've conquered human nature.", "Charles Dickens"],
    ["Once a gentleman, and always a gentleman.", "Charles Dickens"],
    ["Accidents will occur in the best regulated families.", "Charles Dickens"],
    ["Facts are stubborn things, but statistics are more pliable.", "Mark Twain"],
    ["Always do right. This will gratify some people and astonish the rest.", "Mark Twain"]
];
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const quoteButton = document.querySelector('.btn');

const addZero = (num) => num < 10 ? `0${num}` : `${num}`;

const showTime = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    let today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let d = addZero(today.getDate());
    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    let year = today.getFullYear();
   

    hour = hour % 24 || 24;
    time.innerHTML = `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
    date.innerHTML = `${day}, ${d} ${month} ${year}`;
	if (seconds === 0 && minutes === 0) {
        	setBgGreet();
    	} 
    setTimeout(showTime, 1000);
    
}

const setBgGreet = () => {
    
    let today = new Date();
    let hour = today.getHours();
    i = hour;
    body.style.backgroundImage = `url('../momentum/assets/images/showbg/${cardsArray[i]}')`;
    if (i >= 6 && i < 12) {
        greeting.textContent = 'Good morning!';
    } else if (i >= 12 && i < 18) {
        greeting.textContent = 'Good afternoon!';
    } else if (i >= 18 && i < 24) {
        greeting.textContent = 'Good evening!';
    } else {
        greeting.textContent = 'Good night!';
    }
};

const viewBgImage = (data) => {
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
        body.style.backgroundImage = `url(${src})`;
    }; 
};
const getImage = () => {
        const index = i % cardsArray.length;
        const imageSrc = base + cardsArray[index];
    viewBgImage(imageSrc);
        i++;
        showButton.disabled = true;
    setTimeout(function() { showButton.disabled = false }, 1000);
};

const getName = () => {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
};

const setName = (e) => {
    if (e.type === 'keypress') {
        if (e.key === 'Enter' && e.target.innerText !== '') {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
        if (e.key === 'Enter' && e.target.innerText === '') {
            name.blur();
            getName()
        }
    }else if (e.type === 'click'){
        e.target.innerText = '';
        name.focus();
    } else {
        getName();
    }
};

const getFocus = () => {
    if (localStorage.getItem('focus') === null) {
        focusText.textContent = '[Enter Focus]';
    } else {
        focusText.textContent = localStorage.getItem('focus');
    }
}

const setFocus = (event) => {
    if (event.type === 'keypress') {
        if (event.key === 'Enter' && event.target.innerText !== '') {
            localStorage.setItem('focus', event.target.innerText);
            focusText.blur();
        }
        if (event.key === 'Enter' && event.target.innerText === '') {
            focusText.blur();
            getFocus()
        }
    }else if (event.type === 'click'){
        event.target.innerText = '';
        focusText.focus();
    } else {
        getFocus();
    }
};


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffleCards(arr) {
	let result = [];
	
	while (arr.length > 0) {
		let random = getRandom(0, arr.length - 1);
		let elem = arr.splice(random, 1)[0];
		result.push(elem);
	}
	return result;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const showQuote = () => {
    let random = quotes[getRandomInt(0, 19)];
    blockquote.textContent = random[0];
    figcaption.textContent = random[1];
    
}

const getCity = () => {
    if (localStorage.getItem('city') === null) {
        cityText.textContent = '[Enter City]';
    } else {
        cityText.textContent = localStorage.getItem('city');
        getResults(cityText.textContent );
    }
}

const setCity = (event) => {
    if (event.type === 'keypress') {
        if (event.key === 'Enter' && event.target.innerText !== '') {
            localStorage.setItem('city', event.target.innerText);
            getResults(cityText.textContent );
            cityText.blur();
        }
        if (event.key === 'Enter' && event.target.innerText === '') {
            cityText.blur();
            getCity()
        }
    }else if (event.type === 'click'){
        event.target.innerText = '';
        cityText.focus();
    } else {
        getCity();
    }
};




showButton.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', setName);
focusText.addEventListener('keypress', setFocus);
focusText.addEventListener('blur', setFocus);
focusText.addEventListener('click', setFocus);
cityText.addEventListener('keypress', setCity);
cityText.addEventListener('blur', setCity);
cityText.addEventListener('click', setCity);
quoteButton.addEventListener('click', showQuote);

function getResults(city) {
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults)
        .catch(err => alert('Сity not found'));
};

function displayResults(weather) {

    let temp = document.querySelector('.temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let weatherIcon = document.querySelector('.icon');
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png">`;

    let humidity = document.querySelector('.humidity');
        humidity.innerText = `Humidity: ${Math.round(weather.main.humidity)}%`;
    
    let wind = document.querySelector('.wind');
        wind.innerText = `Wind: ${weather.wind.speed} m/s`;
};


showTime();
setBgGreet();
getName();
getFocus();
getCity();
showQuote();
