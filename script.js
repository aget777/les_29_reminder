

const buttonSave = document.querySelector('.editor__save');
buttonSave.onclick = () =>{
    const editorTitle = document.querySelector('.editor__title');
    const editorContent = document.querySelector('.editor__content');
    addRemind(editorTitle.textContent, editorContent.textContent)
    openCloseEditor();
}



// функция при нажитии внизу на крестик выезжает новая страница добавления заметки
const buttonAdd = document.querySelector('.add');  
buttonAdd.onclick = openCloseEditor;

function openCloseEditor(){
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








//троеточие справа от главного заголовка Напоминания
const titleSign = document.querySelector('.title__sign');
titleSign.onclick = () =>{
    console.log('hi');
    const titleMore = document.querySelector('.title__more');
    const titleMoreMenu = document.querySelector('.title__more-menu');
    titleMore.classList.add('display__hide'); // при нажатии появляется меню редактирования
    titleMoreMenu.classList.remove('display__hide');
    titleMoreMenu.classList.add('title__more-menu-show');
}






//закрываем выпадающее меню троеточия
const titleMenuExit = document.querySelector('.title-menu-exit');
titleMenuExit.onclick = () =>{
    console.log('buybuy');
    const titleMore = document.querySelector('.title__more');
    const titleMoreMenu = document.querySelector('.title__more-menu');
    titleMore.classList.remove('display__hide'); // при нажатии исчезает меню редактирования
    titleMoreMenu.classList.add('display__hide');
    titleMoreMenu.classList.remove('title__more-menu-show');
}




function addRemind(newTitle, newText){     // функция создания нового напоминания, блоки должны располгаться именно в таком порядке, чтобы не нарушилась верстка

const remindList = document.querySelector('.remind-list'); // получаем объект - Напоминания

const listItem = document.createElement('li'); // создаем элемент с тегом li
listItem.classList.add('note'); 

const noteCircle = document.createElement('div'); //создаем блок для кружочка слева
noteCircle.classList.add('note__circle'); 

const noteCircleUnchecked = document.createElement('div'); // создаем еще один подблок для кружочка слева
noteCircleUnchecked.classList.add('note__circle-unchecked'); 

const noteArea = document.createElement('div'); // создаем основной блок для Напоминания
noteArea.classList.add('note__area'); 

const noteTitleBlock = document.createElement('div'); // создаем блок для заголовка
noteTitleBlock.classList.add('note__title-block');

const newNoteTitle = document.createElement('h2'); // создаем заголовок напоминания
newNoteTitle.classList.add('note__title');
newNoteTitle.innerText = newTitle;

const newNoteTitleUnchecked = document.createElement('div'); // создаем блок для кружочка справа i
newNoteTitleUnchecked.classList.add('note__title-editor-unchecked');
newNoteTitleUnchecked.innerText = 'i';

const notePreview = document.createElement('p'); // создаем блок для текста напоминания
notePreview.classList.add('note__preview');
notePreview.innerText = newText;

noteCircle.append(noteCircleUnchecked); // добавляем в блок с кружком слева подблок

noteTitleBlock.append(newNoteTitle); // добавляем заголовок в основной блок с заголовком
noteTitleBlock.append(newNoteTitleUnchecked); // добавляем блок с кружочком в основной блок с заголовком

noteArea.append(noteTitleBlock); //добавляем в блок напоминание блок с заголовком напоминания
noteArea.append(notePreview); // добавляем блок с текстом в блок напоминание

listItem.append(noteCircle); // добавляем блок с кружком в основной элемент
listItem.append(noteArea); // добавляем блок для напоминания в основной блок
remindList.append(listItem);
}







