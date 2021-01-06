
//кружок слева от заголовка заметки
const circleChecked = document.querySelector('.note__circle');
circleChecked.onclick = () => {
    const noteChecked = document.querySelector('.note__circle-unchecked');
    const noteIsDone = document.querySelector('.note__title');

    noteChecked.classList.toggle('note__circle-checked'); //при нажатии заполняется синим цветом
    noteIsDone.classList.toggle('note-is-done'); // зачеркивает заголовок заметки
}


//кружок справа от заголовка заметки - i, меню редактирования
const noteTitle = document.querySelector('.note__title');
noteTitle.onclick = () => {
    const noteTitleUnchecked = document.querySelector('.note__title-editor-unchecked'); // при нажатии на заголовок, справа появляется кружок
    noteTitleUnchecked.classList.toggle('note__title-editor');
}


// функция при нажитии внизу на крестик выезжает новая страница добавления заметки
const buttonAdd = document.querySelector('.add');  
buttonAdd.onclick = () =>{
    const editor = document.querySelector('.editor');
    editor.classList.toggle('editor__show');

    const addSign = document.querySelector('.add-sign'); // поворачивается на 45 градусов
    addSign.classList.toggle('add__close');

    const addText = document.querySelector('.add-text'); // убираем-добавляем текст Напоминания
    const addTextOpen = document.getElementById('open');
    addTextOpen.classList.toggle('add-text-close');

    const addTextClose = document.getElementById('close'); // убираем-добавляем текст Закрыть
    addTextClose.classList.toggle('add-text-close');
}


//троеточие справа от главного заголовка Напоминания
const titleSign = document.querySelector('.title__sign');
titleSign.onclick = () =>{
    console.log('hi');
    const titleMore = document.querySelector('.title__more');
    const titleMoreMenu = document.querySelector('.title__more-menu')
    titleMore.classList.add('display__hide'); // при нажатии появляется меню редактирования
    titleMoreMenu.classList.remove('display__hide');
    titleMoreMenu.classList.add('title__more-menu-show');
}

//закрываем выпадающее меню троеточия
const titleMenuExit = document.querySelector('.title-menu-exit');
titleMenuExit.onclick = () =>{
    console.log('buybuy');
    const titleMore = document.querySelector('.title__more');
    const titleMoreMenu = document.querySelector('.title__more-menu')
    titleMore.classList.remove('display__hide'); // при нажатии исчезает меню редактирования
    titleMoreMenu.classList.add('display__hide');
    titleMoreMenu.classList.remove('title__more-menu-show');
}











