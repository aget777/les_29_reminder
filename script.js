const initialNotes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []; // сохраняем напоминание в локальном хранилище
//localStorage.removeItem('notes') // чистим всю информацию о списке напоминаний


function saveRemind(notes = [], idx = -1) {   // функция добавить напоминание в массив
    const editorTitle = document.querySelector('.editor__title');
    const editorContent = document.querySelector('.editor__content');
    if (idx >= 0) {                           // если мы изменяем существующее напоминание
        notes[idx].title = editorTitle.textContent;  // то изменяем title и text в этом напоминании по его индексу
        notes[idx].text = editorContent.textContent;
    } else {                                         // если это новое напоминание, то добавляем его в массив
        notes.push(
            {
                title: editorTitle.textContent,      // с новым title и text
                text: editorContent.textContent
            });
    }
    localStorage.setItem('notes', JSON.stringify(notes)); // передаем в локальное хранилище новый массив
    render(notes);                                        // передаем в функцию render новый массив для отрисовки новых элементов
    openCloseEditor();                                    // вызываем функцию открыть-закрыть страницу редактирования
}



// функция при нажитии внизу на крестик выезжает новая страница добавления заметки
const buttonAdd = document.querySelector('.add');
buttonAdd.onclick = () => {
    openCloseEditor();
    const buttonSave = document.querySelector('.editor__save');
    buttonSave.onclick = () => saveRemind(initialNotes);
};


// функция, которая открывает-закрывает страницу с редактированием напоминания

function openCloseEditor(note = { title: 'Введите напоминание', text: 'Введите текст напоминания' }) {

    const editorTitle = document.querySelector('.editor__title');
    const editorContent = document.querySelector('.editor__content');
    editorTitle.innerText = note.title;
    editorContent.innerText = note.text;

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
titleSign.onclick = () => {

    const titleMore = document.querySelector('.title__more');
    const titleMoreMenu = document.querySelector('.title__more-menu');
    titleMore.classList.add('display__hide'); // при нажатии появляется меню редактирования
    titleMoreMenu.classList.remove('display__hide');
    titleMoreMenu.classList.add('title__more-menu-show');
}



//закрываем выпадающее меню троеточия
const titleMenuExit = document.querySelector('.title-menu-exit');
titleMenuExit.onclick = () => {

    const titleMore = document.querySelector('.title__more');
    const titleMoreMenu = document.querySelector('.title__more-menu');
    titleMore.classList.remove('display__hide'); // при нажатии исчезает меню редактирования
    titleMoreMenu.classList.add('display__hide');
    titleMoreMenu.classList.remove('title__more-menu-show');
}




function renderRemind(newTitle, newText) {     // функция создания нового напоминания, блоки должны располгаться именно в таком порядке, чтобы не нарушилась верстка

    // const remindList = document.querySelector('.remind-list'); // получаем объект - Напоминания

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
    return listItem;
}

//Эта функция выводит наши заметки на экран. Цикл проходит по массиву note и вытаскивает каждый объект, затем title и text передаем в функцию renderRemind создающую новое напоминание
function render(notes) {
    const remindList = document.querySelector('.remind-list'); // получаем объект - Напоминания
    const buttonSave = document.querySelector('.editor__save');

//кружок слева от заголовка заметки
const circleChecked = document.querySelector('.note__circle');



    remindList.innerHTML = null;
    for (let idx = 0; idx < notes.length; idx++) {
        const listItem = renderRemind(notes[idx].title, notes[idx].text);  // передаем в функцию отрисовку заголовка и текста
        

        listItem.onclick = () => {                                         // кликаем на заголовок или текст напоминания
            openCloseEditor(notes[idx]);                                  // вызываем эту функцию, когда кликаем на любую часть этой заметки                        
            
            buttonSave.onclick = () => saveRemind(notes, idx);
        };

        remindList.append(listItem);
    }
}


render(initialNotes); // вызвываем функцию-цикл, которая проходит по массиву всех Напоминаний


//кружок слева от заголовка заметки
const circleChecked = document.querySelector('.note__circle');
circleChecked.onclick = () => {
    console.log('zacherknut')
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


//const noteTitle = document.querySelector('.note__title');
//noteTitle.onclick = infoEdit();


// const noteTitle = document.querySelector('.note__title');
// noteTitle.onclick = function infoEdit() {
//     console.log(idx)
//     const noteTitleUnchecked = document.querySelector('.note__title-editor-unchecked'); // при нажатии на заголовок, справа появляется кружок
//     noteTitleUnchecked.classList.toggle('note__title-editor');
// }



// function saveRemind(notes = [], idx = -1) {   // функция добавить напоминание в массив
//     const editorTitle = document.querySelector('.editor__title');
//     const editorContent = document.querySelector('.editor__content');
//     if (idx >= 0) {                           // если мы изменяем существующее напоминание
//         notes[idx].title = editorTitle.textContent;  // то изменяем title и text в этом напоминании по его индексу
//         notes[idx].text = editorContent.textContent;
//     } else {                                         // если это новое напоминание, то добавляем его в массив
//         notes.push(
//             {
//                 title: editorTitle.textContent,      // с новым title и text
//                 text: editorContent.textContent
//             });
//     }
//     localStorage.setItem('notes', JSON.stringify(notes)); // передаем в локальное хранилище новый массив
//     render(notes);                                        // передаем в функцию render новый массив
//     openCloseEditor();                                    // вызываем функцию открыть-закрыть страницу редактирования
// }