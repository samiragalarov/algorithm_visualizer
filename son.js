let graph =
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

let speed = document.getElementById('speed')

let speedVlaue = document.getElementById('speed').value

let block = false;

let stpoint = false;
let isstpointCheked = false
let stpointValue = [];


let endpoint = false;
let isendpointCheked = false
let endpointValiue = [];



let last = []
let path = []



const main = document.getElementById("main")
const aiOption = document.getElementById("aiselect")



function bfs(graph, start, end) {

    let queue = [start]
    let visited = []
    let isgood = []
    path.push(start)
    visited.push(`${start}`)


    while (queue.length > 0) {

        let current = queue.shift()

        isgood.push(
            [current[0], current[1] + 1],
            [current[0], current[1] - 1],
            [current[0] + 1, current[1]],
            [current[0] - 1, current[1]]
        )


        for (let i = 0; i < isgood.length; i++) {

            if (visited.includes(`${isgood[i]}`) == false && isgood[i][0] >= 0 && isgood[i][0] <= 9 && isgood[i][1] >= 0 && isgood[i][1] <= 9 && typeof (graph[isgood[i][0]][isgood[i][1]]) == "number") {
                visited.push(`${isgood[i]}`)
                path.push(isgood[i])
                queue.push(isgood[i])



                if (visited.includes(`${end}`)) {
             

                    setTimeout(visualPath(0), 1000)

                    return


                }

            }

        }



        isgood = []

    }

}




//depth first search
function dfs(graph, start, end) {

    let queue = [start]
    let visited = []
    let isgood = []

    visited.push(`${start}`)



    while (queue.length > 0) {
 
  

        let current = queue.pop()
      
      



        isgood.push(

            [current[0] + 1, current[1]],

            [current[0] - 1, current[1]],

            [current[0], current[1] + 1],

            [current[0], current[1] - 1],


        )



        for (let i = 0; i < isgood.length; i++) {
      

            if (visited.includes(`${isgood[i]}`) == false && isgood[i][0] >= 0 && isgood[i][0] <= 9 && isgood[i][1] >= 0 && isgood[i][1] <= 9 && typeof (graph[isgood[i][0]][isgood[i][1]]) == "number") {
                
                

                queue.push(isgood[i])


                if (visited.includes(`${end}`)) {

                    console.log('bura')


                    setTimeout(visualPath(0), 500)

                    return


                }

            }
           

        }
        if (visited.includes(`${end}`) == false) {
        path.push(current)
        }
        



        isgood = []
        visited.push(`${current}`)

    }

}
//dfs(graph,[0,9],[7,1])



//////

function start() {
    if (aiOption.value == 1) {
        if (endpointValiue !== null && stpointValue !== null) {
            console.log(stpointValue, endpointValiue)
            bfs(graph, stpointValue, endpointValiue)

        }

    } else if (aiOption.value == 2) {
        if (endpointValiue !== null && stpointValue !== null) {
            console.log(stpointValue, endpointValiue)
            dfs(graph, stpointValue, endpointValiue)

        }

    }

}


function visualPath(a) {
    

    if (a == path.length) {
        console.log(path.length)
        lastpath(path.length - 1, path.length - 2, path)
        return

    }

    let vh = document.getElementById(`${path[a][0]}` + ',' + `${path[a][1]}`)
    vh.classList.add('change')
    let alma = `${path[path.length - 1][0], path[path.length - 1][1]}`


    setTimeout(function () { visualPath(a + 1); }, speedVlaue);

}


function lastpath(a, b, path) {

    if (b== 0) {
        last.push(path[0])
        setTimeout(lastVisual(last.length - 2), 2000)
         
       // 
        // console.log(b)


        return
    }
    let req1 = path[a][0] - path[b][0]
    let req2 = path[a][1] - path[b][1]

    if (path[a][0] == path[b][0] && req2 >= -1 && req2 <= 1) {


        last.push(path[b])
        lastpath(b, b - 1, path)
    } else if (path[a][1] == path[b][1] && req1 >= -1 && req1 <= 1) {

        last.push(path[b])
        lastpath(b, b - 1, path)

    } else {

        lastpath(a, b - 1, path)
    }


}

function lastVisual(lastel) {

    let vhd = document.getElementById(`${last[lastel][0]}` + ',' + `${last[lastel][1]}`)
    vhd.style.backgroundColor = 'coral'


    if (lastel == 0) {


        return
    }
    setTimeout(function () { lastVisual(lastel - 1); }, 100);



}

let minkub = document.querySelectorAll('.minkub')


for (let i = 0; i < minkub.length; i++) {
    minkub[i].addEventListener('click', () => {

        if (block == true) {
            minkub[i].classList.add("block")
            graph[minkub[i].id.split(',')[0]][minkub[i].id.split(',')[1]] = "a"

        }


    })

}
for (let i = 0; i < minkub.length; i++) {
    minkub[i].addEventListener('click', () => {

        if (stpoint == true) {
            stpointValue.push(parseInt(minkub[i].id.split(',')[0]), parseInt(minkub[i].id.split(',')[1]))
            minkub[i].style.backgroundColor = 'rgb(11, 19, 126)'
            stpoint = false
            isstpointCheked = true
            block = false
           


        }



    })

}

for (let i = 0; i < minkub.length; i++) {
    minkub[i].addEventListener('click', () => {

        if (endpoint == true) {
            endpointValiue.push(parseInt(minkub[i].id.split(',')[0]), parseInt(minkub[i].id.split(',')[1]))

            minkub[i].style.backgroundColor = 'rgb(11, 19, 126)'
            endpoint = false
            isendpointCheked = true
            block = false


        }

    })

}

function startpoint() {
    if (isstpointCheked == false) {
        stpoint = true

    }


}

function blockf() {
    block = true
}

function endpointf() {

    if (isendpointCheked == false) {
        endpoint = true

    }

}


function clearboard() {
    location.reload();
}

function generateBoard() {

    graph =
        [
            ['a', 1, 'a', 'a', 1, 'a', 'a', 1, 'a', 1],
            [1, 1, 'a', 1, 1, 1, 1, 1, 1, 'a'],
            ['a', 1, 'a', 1, 'a', 'a', 1, 'a', 1, 'a'],
            ['a', 1, 1, 'a', 1, 1, 1, 1, 'a', 1],
            [1, 1, 1, 1, 'a', 'a', 'a', 1, 1, 1],
            ['a', 1, 'a', 1, 1, 1, 1, 'a', 1, 'a'],
            [1, 1, 1, 1, 'a', 1, 1, 1, 1, 'a'],
            ['a', 'a', 'a', 1, 'a', 'a', 'a', 1, 'a', 1],
            [1, 1, 1, 1, 1, 1, 'a', 1, 1, 1],
            ['a', 1, 'a', 'a', 1, 'a', 1, 'a', 1, 'a']
        ]

    for (let i = 0; i < graph.length; i++) {
        for (let k = 0; k < graph[i].length; k++) {
     
                if (graph[i][k] == "a") {
                    document.getElementById(i + ',' + k).classList.add("block")
                    graph[i][k] = "a"

                }


        }

    }

    if(stpointValue.length !== 0 || endpointValiue.length !== 0){
 
        graph[stpointValue[0]][stpointValue[1]] = 1
        graph[endpointValiue[0]][endpoint[1]] = 1

    }
}


function speedChange() {
    speedVlaue = speed.value


}

