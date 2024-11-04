function experiment(array){
    let interval = 0
    for(let i = 0; i < array.length; i++){
        setInterval(() => {
            document.getElementById(array[i].id).className = 'minimum'
        }, 1000 * i)
    }
}

export default experiment