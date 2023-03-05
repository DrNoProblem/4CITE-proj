function checkUserConnection(value) {
    console.log(value)
    if (value == 200) {
        displayUserWindow(false)
        document.querySelector('.userOption').classList.toggle("connected")
    }
    else {
        if (document.querySelector('.user-window.active .sign-in').classList.value != 'sign-in active error-connection') {
            document.querySelector('.user-window.active .sign-in').classList.toggle("error-connection")
        }

    }
}
function addTokenonID(token) {
    document.querySelector('.header a.title').id = token
}
function displayUserWindow(value) {

    if (!value) {
        document.querySelector('.user-window').classList.toggle('active')
        document.querySelector('.sign-in').classList.toggle('active')
    }

}

function displayUserInfo() {
    document.querySelector('.information').classList.toggle('active')
    document.querySelector('.userOption').classList.toggle("connected")

}

function displaySign(value) {
    elem = document.querySelector('.onglet')
    elem.classList = 'onglet'

    blockUp = document.querySelector('.sign-up')
    blockUp.classList = 'sign-up'

    blockIn = document.querySelector('.sign-in')
    blockIn.classList = 'sign-in'

    if (value == 'in') {
        elem.classList.add('in')
        blockIn.classList.add('active')
    }
    else if (value == 'up') {
        elem.classList.add('up')
        blockUp.classList.add('active')
    }
}

function openWindowReserve(id, name, loc) {

    document.querySelector('.reserve-bg').classList.toggle('active')
    document.querySelector('.hotel-name').innerHTML = name
    document.querySelector('.location-hotel').innerHTML = loc
    document.querySelector('.reserve-pict img').src = document.querySelector('.hotel-card img').src
    document.querySelector('input.id-hotel').value = id

}

function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
}