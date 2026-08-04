const backBtn = document.getElementById("back-to-top");

if(backBtn){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            backBtn.classList.add("show");

        }else{

            backBtn.classList.remove("show");

        }

    });

    backBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}