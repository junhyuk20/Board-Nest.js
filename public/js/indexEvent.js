async function createBoards() {
    const boardDatas = await getBoards();
   
    console.log(`boardDatas: `, boardDatas);
    const contentsContainerEl = document.querySelector('#contents_container');
    

    boardDatas.forEach(board => {
        let { id, title, description, status} = board
        const word = `${id}
                      ${title}
                      ${description}
                      ${status}
                    `
        let div = document.createElement('div')
        div.className = 'board_items'
        div.innerText = word;
        contentsContainerEl.appendChild(div);
    });;
}
createBoards();