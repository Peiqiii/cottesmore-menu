// define click status 
let clicked = [0,0]

// append btn click event
const btns = document.getElementsByClassName('tag')
for(let i = 0; i < btns.length; i++){
    btns[i].onclick = function(){
        // add tag
        if(!clicked[i]){
            const j = (i == 0 ? 1 : 0)
            if(clicked[j]){
                btns[j].classList.remove('tagClicked') 
                btns[j].innerHTML = btns[j].innerHTML.replace('-', '+')
                clicked[j] = 0
            }
            this.classList.add('tagClicked')
            // this.style.color = '#f1f1f1'
            // this.style.backgroundColor = '#C35218'   
            this.innerHTML = this.innerHTML.replace('+', '-')
            clicked[i] = 1
        }else{
            this.classList.remove('tagClicked') 
            this.innerHTML = this.innerHTML.replace('-', '+')
            clicked[i] = 0
        }
    }
}