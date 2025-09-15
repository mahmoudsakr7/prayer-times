//declaring varibles
let cityName = document.getElementById('city-name');
let day = document.getElementById('day');
let date = document.getElementById('date');
let fajrTime = document.getElementById('fajr-time');
let sunriseTime = document.getElementById('sunrise-time');
let dhuhrTime = document.getElementById('dhuhr-time');
let asrTime = document.getElementById('asr-time');
let maghrbTime = document.getElementById('maghrb-time');
let ishaTime = document.getElementById('isha-time');
let cityChoice = document.getElementById('city-choice');
//function to get the selected city iso name 
let params = {};
function selectedCity(name, iso) {
    cityName.innerHTML = name;

    params = {
        country: "EGY",
        city: iso,
    }

    getPrayerTimes();
}
//function to get the prayer time
function getPrayerTimes() {
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    }).then(function (response) {
        //get day and it's date 
        day.innerHTML = response.data.data.date.hijri.weekday.ar
        date.innerHTML = response.data.data.date.readable

        //get Time for prayers
        let timings = response.data.data.timings;
        fillTimeForPrayer(fajrTime, timings.Fajr);
        fillTimeForPrayer(sunriseTime, timings.Sunrise);
        fillTimeForPrayer(dhuhrTime, timings.Dhuhr);
        fillTimeForPrayer(asrTime, timings.Asr);
        fillTimeForPrayer(maghrbTime, timings.Sunset);
        fillTimeForPrayer(ishaTime, timings.Isha);
    })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}
//
function fillTimeForPrayer(id, time) {
    id.innerHTML = time
}
//function to set all the egyptian cities and its iso names 
function getCityInDropBox() {
    let city = [
        { name: "القاهرة", iso: "Cairo" },
        { name: "الجيزة", iso: "Giza" },
        { name: "الإسكندرية", iso: "Alexandria" },
        { name: "الشرقية", iso: "Sharqia" },
        { name: "الدقهلية", iso: "Dakahlia" },
        { name: "المنوفية", iso: "Monufia" },
        { name: "الفيوم", iso: "Faiyum" },
        { name: "أسيوط", iso: "Asyut" },
        { name: "سوهاج", iso: "Sohag" },
        { name: "قنا", iso: "Qena" },
        { name: "الأقصر", iso: "Luxor" },
        { name: "أسوان", iso: "Aswan" },
        { name: "البحر الأحمر", iso: "Red Sea" },
        { name: "مطروح", iso: "Matrouh" },
        { name: "شمال سيناء", iso: "North Sinai" },
        { name: "جنوب سيناء", iso: "South Sinai" }
    ];

    cityChoice.innerHTML = "";
    for (let i = 0; i < city.length; i++) {
        cityChoice.innerHTML += `
            <a class="dropdown-item" href="#" onclick="selectedCity('${city[i].name}', '${city[i].iso}')">
                ${city[i].name}
            </a>`;
    }
}

getCityInDropBox();


