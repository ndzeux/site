let elm;
// aos
let offset, tolerance, on;
function aos(elm){
    elm.forEach(el => {
        on = el.getAttribute("aos-on") || "fade";
        offset = parseInt(el.getAttribute("aos-offset")) || 100;
        tolerance = el.getAttribute("aos-tolerance");
        if(!tolerance){
            tolerance = 100;
        }
        if(tolerance > el.offsetHeight){
            tolerance = el.offsetHeight;
        }
        switch(tolerance){
            case "full":
                tolerance = el.offsetHeight;
                break;
            case "half":
                tolerance = el.offsetHeight / 2;
                break;
            case "third":
                tolerance = el.offsetHeight / 3;
                break;
            case "quarter":
                tolerance = el.offsetHeight / 4;
                break;
            default:
                tolerance = parseInt(tolerance);
                break;
        }
        if (window.scrollY > (el.offsetTop + tolerance - window.innerHeight)) {
            el.style.opacity = "1";
            el.style.transform = "translate3d(0,0,0)";
        } else {
            if(on != "flip"){
                el.style.opacity = "";
            }
            el.style.transform = "";
        }
    });
}
// detect element for aos
function aosinit(){
    elm = "";
    requestAnimationFrame(()=>{
        setTimeout(()=>{
            elm = document.querySelectorAll("[aos='true']");
            aos(elm);
        }, 100);
    });
}
// detect
const t = document.body;
const config = { attributes: true, childList: true, subtree: true };
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            aosinit();
        }
        else if (mutation.type === 'attributes') {
            aosinit();
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(t, config);
//
// aos event
window.addEventListener("scroll", () => {
    if(elm) aos(elm);
});

export { aosinit };