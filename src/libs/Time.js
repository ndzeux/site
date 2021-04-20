export function setTime(previous) {
    previous = parseInt(previous);
    if(previous.length == 11) previous *= 1000;
    let current = new Date().getTime();
    let elapsed = current - previous;
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    if (elapsed < msPerMinute) {
        return Math.floor(elapsed / 1000) + ' detik yang lalu';
    } else if (elapsed < msPerHour) {
        return Math.floor(elapsed / msPerMinute) + ' menit yang lalu';
    } else if (elapsed < msPerDay) {
        return Math.floor(elapsed / msPerHour) + " jam " + (Math.floor(elapsed / msPerMinute) - Math.floor(elapsed / msPerHour)*60) + ' menit yang lalu';
    } else if (elapsed < msPerMonth) {
        return 'Sekitar ' + Math.floor(elapsed / msPerDay) + ' hari yang lalu';
    } else if (elapsed < msPerYear) {
        return Math.floor(elapsed / msPerMonth) + ' bulan yang lalu';
    } else {
        return Math.floor(elapsed / msPerYear) + ' tahun yang lalu';
    }
}
export function setTime2(time){
    time = parseInt(time);
    if(time.length == 11) time *= 1000;
    let d = new Date(time);
    let m = [ 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember' ]
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;
}