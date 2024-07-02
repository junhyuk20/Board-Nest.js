/**
 * 게시글 정보가 담긴 객체 배열 반환
 * @returns [object...] 
 */
/* async function getBoards() {
    const url = './boards';
    const boards = await fetch(url,{
        method: 'GET',
        mode:'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type" : "application/json"
        }

    });
    return boards.json();
} */

function showBoards() {
    const boardInnerEl = document.querySelector('#board_inner');
    let boards = document.querySelector('#boardDatas').value;
    boards = JSON.parse(boards);
    
    for(let data of boards) {
        let createElement = `<div class="post_item"> 
                                <a class="post_a" href="#">
                                  <div class="post_img"><img src=".${data.file[0].downloadPath}"></div>
                                  <div class="post_title">${data.title}</div>
                                </a>
                             </div>`;
        boardInnerEl.insertAdjacentHTML('beforeend', createElement);
    }
}
showBoards();
