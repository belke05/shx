function toggleCss(target){
    target.style.visibility = "visible";
}

const lis = document.querySelectorAll('#users .user');



lis.forEach(li =>li.onclick =(e)=>{
    toggleCss(e.target);
});

const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");

burger.onclick = () => {
    sidebar.classList.toggle("is-here"),
    console.log('hello')
};