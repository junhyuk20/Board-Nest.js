/**
 * 게시글 정보가 담긴 객체 배열 반환
 * @returns [object...] 
 */
async function getBoards() {
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
}
