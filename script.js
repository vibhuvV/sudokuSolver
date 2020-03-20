const inputs = Array.from(document.querySelectorAll("input"))
const button = Array.from(document.querySelectorAll('button'));

inputs.forEach((input)=>{
    input.addEventListener("keydown", (e)=>{
            if(e.keyCode>=65 && e.keyCode<=90){
                alert("Only numbers allowed")
                e.target.value=" "
            }
            console.log(e.keyCode)
        })
})


function multiArrToSingle(arr){
    let newArr = []
    arr.forEach((sArr)=>{
        newArr = newArr.concat(sArr)
    })
    return newArr
}

const singleArrToMulti = (arr) => {
    let newArr = []
    let k = 0
    for(let i=0; i<Math.sqrt(arr.length); i++){
        let temp = [];
        for(let j=0; j<Math.sqrt(arr.length); j++){
            temp[j] = arr[k];
            k++;
        }
        newArr.push(temp);
    }
    return newArr
}

// console.log(singleArrToMulti(multiArrToSingle(grid)))

let grid = []

const possible = (grid, x, y, val) => {
    for(let i=0; i<9; i++){
        if(grid[x][i] == val){
            return false;
        }
    }

    for(let i=0; i<9; i++){
        if(grid[i][y] == val){
            return false;
        }
    }

    let x0 = Math.floor(x/3)*3;
    let y0 = Math.floor(y/3)*3;

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(grid[x0+i][y0+j] == val){
                return false;
            }
        }
    }
    return true;
}

const solve = (grid) => {
    //let grid = gridN
    for(let x=0; x<9; x++){
        for(let y=0; y<9; y++){
            if(grid[x][y] == 0){
                for(let i=1; i<10; i++){
                    if(possible(grid, x, y, i)){
                        grid[x][y] = i;
                        solve(grid);
                        grid[x][y] = 0;
                    }
                }
                return;
            }
        }
    }

    let k=0;
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            inputs[k].value = grid[i][j];
            k++;
        }
    }
}

// solve(grid);


const showSolved = () => {
    inputs.forEach((input, i)=>{
        if(input.value != 0 && input.value != "" && !isNaN(input.value)){
            grid[i] = Number(input.value);
        }else{
            grid[i] = 0;
        }
    })
    // console.log(grid);
    let multiGrid = singleArrToMulti(grid);
    solve(multiGrid);
}



button[0].addEventListener('click', showSolved);


const reset = () => {
    inputs.forEach((input)=>{
        input.value = ""
    })
    grid = [];
}

button[1].addEventListener('click', reset);