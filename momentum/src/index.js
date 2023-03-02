//Переменные селектеров
const time = document.querySelector('.time')
const dateClass = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const body = document.querySelector('.body')
const name = document.querySelector('.name')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuoteBtn = document.querySelector('.change-quote')
const weatherIcon = document.querySelector('.weather-icon')
const weatherError = document.querySelector('.weather-error')
const weatherTemperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const weatherWind = document.querySelector('.wind')
const weatherHumidity = document.querySelector('.humidity')
const inputCity = document.querySelector('.city')
const weatherHide = document.querySelectorAll('.hide')
const playBtn = document.querySelector('.play')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const playListContainer = document.querySelector('.play-list')
const progressBar = document.querySelector('.progress-bar-cont')
const progressBarItem = document.querySelector('.progress-bar-item')
const playTime = document.querySelector('.play-time')
const songnName = document.querySelector('.song-name')
const mute = document.querySelector('.sound')
const volumeBar = document.querySelector('.volume-control')
const ball = document.querySelector('.ball')
const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['Audioplayer', 'Todo List','Weather', 'Time', 'Date', 'Greetings', 'Qoute']
  }
  const language = {
    en: {
        greetingsTimeOfDay: ['Good Night', 'Good Morning', 'Good Afternoon', 'Good Evening'],
        Humidity: 'Humidity',
        Windspeed: 'Wind speed',
        weatherMiss: `Error! city not found for!`,
        weatherVoid: `Error! Nothing to geocode for ''!`,
        defaultCity: 'Minsk',
        ms: 'm/s',
        placaholderName: "[Enter Name]",
        placaholderCity: "[Enter city]",
        settingsLanguage: 'Language:',
        bgSource: 'Image source:',
        visibilityTitle: 'Displayable Items:',
        '0': 'Audioplayer',
        '1': 'Links',
        '2': 'Weather',
        '3': 'Time',
        '4': 'Date',
        '5': 'Greetings',
        '6': 'Qoute',
        alert: 'Fail to load image',
        newlink: 'New Link',
        link: 'Link',
        linktitle: 'Name',
        create: 'Create'
    },
    ru: {
        greetingsTimeOfDay: ['Доброй Ночи', 'Доброое Утро', 'Добрый День', 'Добрый Вечер'],
        Humidity: 'Влажность',
        Windspeed: 'Скорость ветра',
        weatherMiss: `Ошибка, город не найден!`,
        weatherVoid: `Ошибка, введите город!`,
        defaultCity: 'Минск',
        ms: 'м/с',
        placaholderName: "[Введите Имя]",
        placaholderCity: "[Введите город]",
        settingsLanguage: 'Язык:',
        bgSource: 'Источник изображения:',
        visibilityTitle: 'Отоброжаемые элементы:',
        '0': 'Аудиоплеер',
        '1': 'Ссылки',
        '2': 'Погода',
        '3': 'Время',
        '4': 'Дата',
        '5': 'Приветствие',
        '6': 'Цитата',
        alert: 'Не удалось загрузить изображение',
        newlink: 'Новая Ссылка',
        link: 'Ссылка',
        linktitle: 'Название',
        create: 'Создать'
        
    }
}

//Случайные номер
const getRandomNumber = (min, max) => {
    return  Math.floor(Math.random() * (max - min) + min);
}

//Время суток
let arrayGreetings = []
const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    arrayGreetings = language[state.language].greetingsTimeOfDay
    return Math.floor(hours / 6)
}

//Дата
const showDate = () => {
    const date = new Date()
    const options = {weekday: 'long', month: 'long', day: 'numeric'}
    const currentDate = date.toLocaleDateString( state.language, options)
    dateClass.textContent = currentDate
}

//Время
const showTime = () => {
    const date = new Date()
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime
    let dayTime = getTimeOfDay()
    let greetings = arrayGreetings[dayTime]
    greeting.textContent = `${greetings}`
    showDate()
    setTimeout(showTime, 1000)
}
showTime()

// Цитаты
let qouteNumber = 0
const getQouteNumber = () => {
    qouteNumber = getRandomNumber(0, 10)
}
getQouteNumber()
async function getQoute(){
    let quotes = `data${state.language}.json`
    const res = await fetch(quotes)
    const date = await res.json()
    quote.innerHTML = date[qouteNumber].text
    author.innerHTML = date[qouteNumber].author
}
const changeQuote = () =>{
    qouteNumber = getRandomNumber(0, 10)
    getQoute()
}
changeQuoteBtn.addEventListener('click', changeQuote)

//Погода
let city = ''
async function getWeather() {
    let error = inputCity.value||''
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${state.language}&appid=c5d262c6cf11150287b62da4b1818e48&units=metric`
    try {
        const res = await fetch(url)
        const data = await res.json()
        weatherError.classList.remove('active')
        weatherHide.forEach((el)=>el.classList.remove('active'))
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        weatherDescription.innerHTML = `${data.weather[0].description}`
        weatherTemperature.innerHTML = `${Math.round(data.main.temp)} °C`
        weatherWind.innerHTML= `${language[state.language].Windspeed}: ${Math.round(data.wind.speed)} ${language[state.language].ms}`
        weatherHumidity.innerHTML = `${language[state.language].Humidity}: ${Math.round(data.main.humidity)}%`
    } catch (e) {
        weatherError.classList.add('active')
        weatherHide.forEach((el)=>el.classList.add('active'))
        if (error === ''){
            weatherError.innerHTML = `${language[state.language].weatherVoid}`
        }else {
            weatherError.innerHTML = `${language[state.language].weatherMiss}`
        }
    }
}
inputCity.addEventListener('change', ()=>{
    city = inputCity.value
    getWeather()
})

// Список
playList.forEach((el, i) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const p = document.createElement('p')
    button.classList.add('player-icon')
    button.classList.add('play-playlist')
    li.classList.add('play-item')
    p.textContent = playList[i].title
    playListContainer.append(li)
    li.append(button)
    li.append(p)
})

//Аудиоплеер
const playItem = document.querySelectorAll('.play-item')
import playList from './playList.js';
const audio = new Audio()
let songTime = 0
let songNumber = 0
let songDurationSeconds = 0
let position = 0
playTime.textContent = `00:00/${playList[songNumber].duration}`
songnName.textContent = playList[songNumber].title
const playBtnList = document.querySelectorAll('.play-playlist')
const getSongDurationSeconds = () => {
    const array = playList[songNumber].duration.split(':')
    songDurationSeconds = Number(array[0])*60 + Number(array[1])
}
const getSongTime = () => {
    songTime = audio.currentTime
    let seconds = Math.round(songTime%60)
    let minutes = Math.floor(songTime/60)
    playTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}/${playList[songNumber].duration}`
    position = Math.round(songTime/songDurationSeconds*100)
    ball.style.left = `${position}px`
    progressBarItem.style.width = `${position+1}px`
}
audio.addEventListener('timeupdate', getSongTime)
const playAudio = () => {
    audio.src = playList[songNumber].src
    audio.currentTime = songTime
    if (playBtn.classList.contains('pause')) {
        audio.play()
    }else {
        audio.pause()
    }
    playItem[songNumber].classList.add('item-active')
    songnName.textContent = playList[songNumber].title
    getSongDurationSeconds()
    position = 0
} 
playBtn.addEventListener('click', ()=> {
    playBtn.classList.toggle('pause')
    playBtnList[songNumber].classList.toggle('pause')
    playAudio()
})
let playBtnListIndex = 0
playBtnList.forEach((el, i) =>{
    el.addEventListener('click', ()=>{
        if(i !== playBtnListIndex){
            songTime = 0
        }
        playItem[songNumber].classList.remove('item-active')
        playBtnList.forEach((el, m) => {
            if (m!==i){
                el.classList.remove('pause')
            }
        })
        songNumber = i
        el.classList.toggle('pause')
        if (el.classList.contains('pause')){
            playBtn.classList.add('pause')
        }else {
            playBtn.classList.remove('pause')
        }
        playAudio()
        playBtnListIndex = i  
    })
})
const nextSong = ()=>{
    playItem[songNumber].classList.remove('item-active')
    if (songNumber >= playList.length - 1){
        songNumber = 0
    }else {
        songNumber++ 
    }
    playBtnList.forEach((el, m) => {
        el.classList.remove('pause')
    })
    playBtnList[songNumber].classList.add('pause')
    songTime = 0
    position = 0
    playAudio()
}
playNext.addEventListener('click', nextSong)
playPrev.addEventListener('click', ()=>{
    playItem[songNumber].classList.remove('item-active')
    if (songNumber <= 0){
        songNumber = playList.length - 1
    }else {
        songNumber-- 
    }
    playBtnList.forEach((el, m) => {
        el.classList.remove('pause')
    })
    playBtnList[songNumber].classList.add('pause')
    songTime = 0
    position = 0
    playAudio()
})
audio.addEventListener('ended', nextSong)
mute.addEventListener('click', ()=>{
    mute.classList.toggle('active')
    if (mute.classList.contains('active')){
        audio.volume = 0
        volumeBar.value = '0'
    }else {
        audio.volume = 0.5
        volumeBar.value = '50'
    }
})
audio.volume = Number(volumeBar.value)/100
volumeBar.addEventListener('change', ()=>{
    audio.volume = Number(volumeBar.value)/100
    if (audio.volume === 0){
        mute.classList.add('active')
    }else {
        mute.classList.remove('active')
    }
})
const drag = (e) => {
    position = e.x-44
    if (position > 100){
        position = 100
    }
    if (position < 0){
        position = 0
    }
    ball.style.left = `${position}px`
    progressBarItem.style.width = `${position+1}px`
    audio.currentTime = Math.round(songDurationSeconds/100*position)
}
progressBar.addEventListener('mousedown', (e)=>{
    if (e.which === 1){
        drag(e)
    }
    progressBar.addEventListener('mousemove', (e)=>{
        if (e.which === 1){
            drag(e)
        }
    })
})

//Язык
const languageSettingsText = document.querySelector('.language')
const bgSourseText =document.querySelector('.bg-sourse')
const visibilityItem = document.querySelectorAll('.visibility')
const visibilityTitle = document.querySelector('.visibility-title')
const links = document.querySelector('.links')
const linksTitle = document.querySelector('.links-title')
const newLink = document.querySelector('.new-link')
const linkName = document.querySelector('.link-name')
const linkSite = document.querySelector('.link-site')
const createLinkBtn = document.querySelector('.create-link')

const changeLanguage = () => {
    languageSettingsText.innerHTML = language[state.language].settingsLanguage
    bgSourseText.innerHTML = language[state.language].bgSource
    visibilityTitle.innerHTML = language[state.language].visibilityTitle
    links.innerHTML = language[state.language][1]
    linksTitle.innerHTML = language[state.language][1]
    newLink.innerHTML =language[state.language].newlink
    linkName.innerHTML = language[state.language].linktitle
    linkSite.innerHTML = language[state.language].link
    createLinkBtn.innerHTML = language[state.language].create
    visibilityItem.forEach((el, i) => {
        el.innerHTML = `${language[state.language][i.toString()]}`
    })
    inputCity.setAttribute('placeholder', `${language[state.language].placaholderCity}`)
    name.setAttribute('placeholder', `${language[state.language].placaholderName}`)
    if (state.language ==='en'){
        languageBtn[0].classList.add('active')
    }else {
        languageBtn[1].classList.add('active')
    }
    getWeather()
    showTime()
    getQoute()  
}

//Источник заднего фона
let tagValue = ''
const tagsInput = document.querySelector('.tags')
tagsInput.addEventListener('change', ()=>{
    tagValue = tagsInput.value
})
let bgNumber = 0
const img = new Image()
const getBgNumber = () =>{
    bgNumber = getRandomNumber(1, 21)
}
getBgNumber()
const setBg = (link) => {
    img.src = link
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`
    }
}
const tagForBg = () => {
    const arrayBG = ['Night', 'Morning', 'Afternoon', 'Evening']
    const dayTime = arrayBG[getTimeOfDay()].toLowerCase()
    return dayTime
}
const getGitBgLink = () => {
    const result = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tagForBg()}/${bgNumber.toString().padStart(2, '0')}.jpg`
    return result
}
const getGitBg = () => {
    setBg(getGitBgLink())
}
async function getFlickerBg(){
    let tag = ''
    let result = ''
    if (tagValue === ''){
        tag = tagForBg()
    }else {
        tag = tagValue
    }
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c67ce895d55596bbe5c44e142868b5a4&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url)
    try {
        const data = await res.json()
        const almostLink = data.photos.photo[bgNumber]
        result = almostLink.url_l
    }catch{
        result = getGitBgLink()
        state.photoSource = 'github'
        alert(language[state.language].alert)
    }
    setBg(result)
}
async function getUnsplashBg(){
    let tag = ''
    let result = ''
    if (tagValue === ''){
        tag = tagForBg()
    }else {
        tag = tagValue
    }
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=PyBVAj15w7ZIFblD3tjxZ5K633smbkd-Fd1icaAjYME`
    const res = await fetch(url)
    try {
        const data = await res.json()
        result = data.urls.regular
    }catch{
        result = getGitBgLink()
        state.photoSource = 'github'
        alert(language[state.language].alert)
    }
    setBg(result)
}
const checkSettingsForBg = () =>{
    if (state.photoSource === 'github'){
        bgBtns[0].classList.add('active')
        getGitBg()
    }else if (state.photoSource === 'unsplash'){
        bgBtns[1].classList.add('active')
        getUnsplashBg()
    }else if (state.photoSource === 'flicker'){
        bgBtns[2].classList.add('active')
        getFlickerBg() 
    }
}
const getNextSlide = () => { 
    bgNumber = bgNumber + 1
    if (bgNumber >= 21){
        bgNumber = 1
    }
    checkSettingsForBg()
}
const getPrevSlide = () => { 
    bgNumber = bgNumber - 1
    if (bgNumber <= 0){
        bgNumber = 20
    }
    checkSettingsForBg()
}
tagsInput.addEventListener('change', ()=>{
    tagValue = tagsInput.value
    checkSettingsForBg()
})
slideNext.addEventListener('click', getNextSlide)
slidePrev.addEventListener('click', getPrevSlide)

//Настройки 
const settingsBtn = document.querySelector('.settings-icon')
const settingsWindow = document.querySelector('.settings-window')
const languageBtn = document.querySelectorAll('.language-btn')
const bgBtns = document.querySelectorAll('.bg-btn')
const visibilityCheckbox = document.querySelectorAll('.visibility-check')
const visible = document.querySelectorAll('.visible')

settingsBtn.addEventListener('click', ()=>{
    settingsBtn.classList.toggle('active')
    settingsWindow.classList.toggle('active')
})
languageBtn.forEach((el, i) =>{
    if(i === 0){
        el.addEventListener('click', (e)=>{
            state.language = 'en'
            changeLanguage()
            languageBtn[0].classList.add('active')
            languageBtn[1].classList.remove('active')
        })
    }else{
        el.addEventListener('click', (e)=>{
            state.language = 'ru'
            changeLanguage()
            languageBtn[1].classList.add('active')
            languageBtn[0].classList.remove('active')
        })
    }
})
bgBtns.forEach((el, i) => {
    if(i === 0){
        el.addEventListener('click', (e)=>{
            state.photoSource = 'github'
            checkSettingsForBg()
            tagsInput.classList.remove('active')
            bgBtns[0].classList.add('active')
            bgBtns[1].classList.remove('active')
            bgBtns[2].classList.remove('active')
            
        })
    }else if (i === 1){
        el.addEventListener('click', (e)=>{
            state.photoSource = 'unsplash'
            checkSettingsForBg()
            tagsInput.classList.add('active')
            bgBtns[1].classList.add('active')
            bgBtns[0].classList.remove('active')
            bgBtns[2].classList.remove('active')
        })
    }else if (i === 2){
        el.addEventListener('click', (e)=>{
            state.photoSource = 'flicker'
            checkSettingsForBg()
            tagsInput.classList.add('active')
            bgBtns[2].classList.add('active')
            bgBtns[0].classList.remove('active')
            bgBtns[1].classList.remove('active')
        })
    }
})
visibilityCheckbox.forEach((el, i) => {
    el.addEventListener('change', ()=>{
        if (!el.checked){
            visible[i].classList.add('invisible', 'invisiblesmooth')
            state.blocks.forEach((x, m) =>{
                if (m !== i){
                   return state.blocks.splice(i, 1, '')
                }
            })
        }else {
            visible[i].classList.remove('invisible', 'invisiblesmooth')
            state.blocks.forEach((x, m) =>{
                if (m !== i){
                    const index = i.toString()
                    return state.blocks.splice(i, 1, `${language[state.language][index]}`)
                }
            })
        }
    })
})
const hideInvisibleElement = ()=> {
    state.blocks.forEach((el, i) =>{
        if (el === ''){
            visible[i].classList.add('invisible')
        }else {
            visibilityCheckbox[i].checked = true
        }
    })
}
//Ссылки
const linksWindow = document.querySelector('.links-window')
const linksCross = document.querySelector('.cross-btn')
const linksPlus = document.querySelector('.links-plus')
const linksWindowInput = document.querySelector('.links-window-input')
const linksCrossInput = document.querySelector('.cross-input-btn')
const linksInputSite = document.querySelector('.links-input-site')
const linksInputName = document.querySelector('.links-input-name')
const newLinksList = document.querySelector('.new-links-list')
const linksArray = []
let linksArrayToString = ''

links.addEventListener('click', ()=>{
    linksWindow.classList.toggle('active')
    linksWindowInput.classList.remove('active')
})
linksCross.addEventListener('click', ()=>{
    linksWindow.classList.remove('active')
})
linksPlus.addEventListener('click', ()=>{
    linksWindowInput.classList.add('active')
})
linksCrossInput.addEventListener('click', ()=>{
    linksWindowInput.classList.remove('active')
})
function alertInputName(){
    linksInputName.style.backgroundColor = 'white'  
}
function alertInputSite(){
    linksInputSite.style.backgroundColor = 'white'  
}
const createNewLink =(name, site, srcIcon) =>{
    const createdLinkItem = document.createElement('li')
    createdLinkItem.classList.add('created-link-item')
    const linkIcon = document.createElement('img')
    linkIcon.classList.add('link-icon')
    linkIcon.setAttribute('src', `https://icons.duckduckgo.com/ip2/${srcIcon}.ico`)
    const createdLink= document.createElement('a')
    createdLink.classList.add('created-link')
    createdLink.setAttribute('href', `${site}`)
    createdLink.setAttribute('target', '_blank')
    createdLink.innerHTML = name
    const cross = document.createElement('div')
    cross.classList.add('player-icon', 'links-cross', 'cross-btn', 'icon-cross')
    createdLinkItem.append(linkIcon)
    createdLinkItem.append(createdLink)
    createdLinkItem.append(cross)
    newLinksList.append(createdLinkItem)
    linksWindowInput.classList.remove('active')
}
const getNewLink = ()=>{
    const name = linksInputName.value.trim()
    let link = linksInputSite.value.trim()
    let srcIcon = linksInputSite.value
    if (name !== ''&& link !== ''){
        linksArrayToString += `${linksInputName.value},`
        if (linksInputSite.value.includes('https://')){
            linksArrayToString += `${linksInputSite.value},`
            srcIcon = linksInputSite.value.slice(8, linksInputSite.value.length)
        }else if(linksInputSite.value.includes('http://')){
            linksArrayToString += `${linksInputSite.value},`
            srcIcon = linksInputSite.value.slice(7, linksInputSite.value.length)
        }else {
            linksArrayToString += `http://${linksInputSite.value},`
            linksInputSite.value = `http://${linksInputSite.value}`
            srcIcon = linksInputSite.value.slice(7, linksInputSite.value.length)
        }
        createNewLink(linksInputName.value, linksInputSite.value, srcIcon)
        linksInputName.value = ''
        linksInputSite.value = ''
    }else if (name ===''){
        linksInputName.style.backgroundColor = 'gray'
        setTimeout(alertInputName, 250)
        linksInputName.value = ''  
    }else if (link ===''){
        linksInputSite.style.backgroundColor = 'gray'
        setTimeout(alertInputSite, 250)
        linksInputSite.value = ''
    }
}

newLinksList.addEventListener('DOMSubtreeModified', ()=>{
    const createdLinkItem = document.querySelectorAll('.created-link-item')
    const iconCross = document.querySelectorAll('.icon-cross')
    const resultArray = []  
    iconCross.forEach((el, i) =>{
        el.addEventListener('click', ()=>{
            newLinksList.removeChild(createdLinkItem[i])
            const array = linksArrayToString.split(',')
            for (let m = 0;m < array.length-1; m+=2){
                resultArray.push([array[m], array[m+1]])
            }
            resultArray.splice(i, 1)
            let result = resultArray.join(',')
            if (result[result.length -1] !== ','){
                result = `${result},`
                if (result.split('').length === 1){
                    result = ''
                }
            }
            linksArrayToString = `${result}`
        })
    })
})
createLinkBtn.addEventListener('click', getNewLink)
const createLocalLinks = (str) =>{
    const array = str.split(',')
    let srcIcon =''
    for (let i = 0;i < array.length-1; i+=2){
        if (array[i+1].includes('https://')){
            srcIcon = array[i+1].slice(8, array[i+1].length)
        }else if(array[i+1].includes('http://')){
            srcIcon = array[i+1].slice(7, array[i+1].length)
        }
        createNewLink(array[i], array[i+1], srcIcon)
    }
}

//Local Storage
const setLocalStorage = () => {
    localStorage.setItem('name', name.value)
    localStorage.setItem('city', inputCity.value)
    //Сохранение настроек
    localStorage.setItem('settingsLanguage', state.language)
    localStorage.setItem('bgSource', state.photoSource)
    localStorage.setItem('tag', tagsInput.value)
    localStorage.setItem('blocks', state.blocks)
    //Сохранение сссылок
    localStorage.setItem('links', linksArrayToString)

}
const getLocalStorage = () => {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }
    if (localStorage.getItem('settingsLanguage')){
        state.language = localStorage.getItem('settingsLanguage')
    }
    if (localStorage.getItem('city')) {
        inputCity.value = localStorage.getItem('city')
        city = localStorage.getItem('city')
    }else {
        inputCity.value = language[state.language].defaultCity
        city = language[state.language].defaultCity
    }
    //Вывод Настроек
    if (localStorage.getItem('bgSource')){
        state.photoSource = localStorage.getItem('bgSource')
        if (localStorage.getItem('bgSource') !== 'github') {
            tagsInput.classList.add('active') 
        }
    }
    if (localStorage.getItem('tag')){
        tagsInput.value = localStorage.getItem('tag')
        tagValue = localStorage.getItem('tag')
    }
    if (localStorage.getItem('blocks')){
        state.blocks = localStorage.getItem('blocks').split(',')
    }
    if (localStorage.getItem('links')){
        createLocalLinks(localStorage.getItem('links'))
        linksArrayToString += localStorage.getItem('links')
    }
    checkSettingsForBg()
    changeLanguage()
    hideInvisibleElement()
    getQoute() 
}
window.addEventListener('beforeunload', setLocalStorage) 
window.addEventListener('load', getLocalStorage)