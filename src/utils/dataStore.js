let filmInfo = null;

function setFilmInfo(info){
    filmInfo = info;
}

function getFilmInfo(){
    return Object.assign({}, filmInfo);
}

export default{
    setFilmInfo,
    getFilmInfo
}