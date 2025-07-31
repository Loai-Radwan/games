



window.addEventListener('scroll' , function (){
    let games = document.querySelectorAll('.game')
    if (isInView('#games')) {
        games.forEach(game => {
            game.style.animationName = "show";
        })
    }

})







// Setting date to the current year 
const date = new Date().getFullYear()
document.querySelector('footer span').innerHTML = date


function isInView(ele) {
    // Select element section
    let element = document.querySelector(ele);
    console.log(element)

    // testimonials offset top
    let elementTop = element.offsetTop;

    // testimonials outer hight
    let elementHeight = element.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    // Window Y offset
    let windowScrollTop = this.pageYOffset;

    return windowScrollTop >= elementTop + elementHeight / 2 - windowHeight;
}