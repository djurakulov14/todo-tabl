const box = document.querySelector('.blya')
const row = document.querySelector('#row_change')
const block = document.querySelector('#block_change')
const add_btn = document.querySelector('#add_btn')
const cont = document.querySelector('.container')
const modal = document.querySelector('.modal')
const modal_bg = document.querySelector('.modal_bg')
const form = document.forms.add


function fetch() {
    axios.get("http://localhost:3001/tasks")
        .then(res => reload(res.data))
        
}

fetch()

function post(arr) {
    axios.post("http://localhost:3001/tasks", arr)
        .then(res => fetch())
        
}
    
    
    function reload(arr) {
        box.innerHTML = ''
        
        for(let item of arr) {

        box.innerHTML += `
        <div class="row" id="row">
        <p>${item.title}</p>
        
        <p class="dsc">${item.info}</p>
        
        <div class="time">
        <p>${item.data}</p>
        
        <p>${item.time}</p>
        </div>
        
        <p class="ready">${item.ready}</p>
        </div>
        `
        
        block.onclick = () => {
            let change_block = document.querySelectorAll('#row')

            let dsc = document.querySelectorAll('.dsc')

            change_block.forEach(element => {
                element.classList.remove('row')
                element.classList.add('block')
            });

            dsc.forEach(element => {
                element.style.width = 'auto'
            });

            box.classList.remove('blya')
            box.classList.add('blya2')

            row.classList.remove('clicked')
            row.classList.add('unclicked')

            block.classList.remove('unclicked')
            block.classList.add('clicked')
        }

        row.onclick = () => {
            let change_block = document.querySelectorAll('#row')

            let dsc = document.querySelectorAll('.dsc')

            change_block.forEach(element => {
                element.classList.remove('block')
                element.classList.add('row')
            });

            dsc.forEach(element => {
                element.style.width = '492px'
            });

            box.classList.remove('blya2')
            box.classList.add('blya')

            block.classList.remove('clicked')
            block.classList.add('unclicked')

            row.classList.remove('unclicked')
            row.classList.add('clicked')
        }
    }
}

add_btn.onclick = () => {
    modal.style.display = "block"
    modal_bg.style.display = "block"

    setTimeout(() => {
        modal.style.opacity = "1"
        modal_bg.style.opacity = "0.7"
    }, 200);
}

form.onsubmit = (e) => {

    e.preventDefault()

    let arr = {
        id: Math.random(),
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        arr[key] = value
    })

    post(arr)
    close()
    

    if(box.classList.contains("blya2")) {
        alert("ФИШКА: Вид данных был переведен в ряд, пожалуйста обновите страницу")
    }
}

modal_bg.onclick = () => {
    close()
}

function close() {
    modal.style.opacity = "0"
    modal_bg.style.opacity = "0"
    
    setTimeout(() => {
        modal.style.display = "block"
        modal_bg.style.display = "block"
    }, 200);
}