const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []; // сохраняем напоминание в локальном хранилище
//localStorage.removeItem('notes') // чистим всю информацию о списке напоминаний

let addButtonClose = false;
const editorTitle = document.querySelector('.editor__title');
const editorContent = document.querySelector('.editor__content');

// при нажитии внизу на крестик выезжает новая страница добавления заметки
const buttonAdd = document.querySelector('.add');
buttonAdd.onclick = addRemind;


// функция добавления Напоминания
function addRemind() {
    openCloseEditor();
    if (addButtonClose) {   //если страница с вводом напоминания открыть, то сохраняем эту заметку
        editorTitle.textContent = ''; // обнуляем заголовок и текст, чтобы при создании нового напоминания ничего не подставлялось из старого
        editorContent.textContent = '';
        notes.push(
            {
                title: '',
                text: ''
            });
        addEventsToInput(notes.length - 1); // в массив уже прибавилось новое напоминание, поэтому мы берем его индекс(он последний)
    };
}

//функция отредактировать существующее напоминание
function editRemind(idx) {          // передаем индекс напоминания
    editorTitle.textContent = notes[idx].title;  // подставляем в редактируемое напоминание заголовок и текст
    editorContent.textContent = notes[idx].text;
    openCloseEditor();
    if (addButtonClose) {   //если страница с вводом напоминания открыть, то сохраняем эту заметку   
        addEventsToInput(idx);
    };

}



// функция, которая добавляет и убирает слушателей
function addEventsToInput(idx) {
    editorTitle.dataset.idx = idx;
    editorContent.dataset.idx = idx;

    editorTitle.removeEventListener('input', realTimeSaveRemind); // убираем старых слушателей
    editorContent.removeEventListener('input', realTimeSaveRemind);

    editorTitle.addEventListener('input', realTimeSaveRemind); // вешаем листенера на заголовок и текст, чтобы отследить, когда начался ввод
    editorContent.addEventListener('input', realTimeSaveRemind); // и сохраняем эти зменения в режиме реального времени
}










// Функция в режиме реального времени сохраняет запись, интервал между сохранением 1 секунда
let timeOut;  // создаем переменную, в которой будет храниться функция таймаута
function realTimeSaveRemind(event) {
    const index = event.target.dataset.idx // с помощью атрибута dataset, определяем индекс напоминания, в котором сейчай происходят изменения
    clearTimeout(timeOut);  // обнуляем функцию, чтобы она сохраняла каждый раз после остановки ввода
    timeOut = setTimeout(function () {

        notes[index].title = editorTitle.textContent;
        notes[index].text = editorContent.textContent;
        localStorage.setItem('notes', JSON.stringify(notes)); // сохраняем измененные напоминания в локальное хранилище
        render();   // отрисовываем текущее состояние
    }, 500);
}

// функция, которая открывает-закрывает страницу с редактированием напоминания
function openCloseEditor() {
    const editor = document.querySelector('.editor');
    editor.classList.toggle('editor__show');

    const addSign = document.querySelector('.add-sign'); // поворачивается на 45 градусов
    addSign.classList.toggle('add__close');

    const addText = document.querySelector('.add-text'); // убираем-добавляем текст Напоминания
    const addTextOpen = document.getElementById('open');
    addTextOpen.classList.toggle('add-text-close');

    const addTextClose = document.getElementById('close'); // убираем-добавляем текст Закрыть
    addTextClose.classList.toggle('add-text-close');
    addButtonClose = !addButtonClose;  // меняем значение, чтобы программа поняла, что мы закрыли страницу редактирования напоминания
}

// функция удаления напоминания
function removeRemind(idx) {   //передаем индекс напоминания
    notes.splice(idx, 1);    // удаляем напоминание по индексу
    localStorage.setItem('notes', JSON.stringify(notes)); // перезаписываем изменения
    render()  // отрисовываем измененный список
}



//Эта функция выводит наши заметки на экран. Цикл проходит по массиву note и вытаскивает каждый объект, затем title и text передаем в функцию renderRemind создающую новое напоминание
function render() {
    const remindList = document.querySelector('.remind-list'); // получаем объект - Напоминания
    //remindList.innerHTML = null;
    remindList.innerHTML = notes.map(function (note, id, notes) {
        return `
        <li class="note">   <!-- создаем элемент с тегом li -->
        <div class="note__circle" onclick="circleCheck(${id})">   <!--создаем блок для кружочка слева -->
        <div class="note__circle-unchecked" id="circle${id}" ></div>   <!-- создаем еще один подблок для кружочка слева  -->
        </div>
            <div class="note__area">    <!-- создаем основной блок для Напоминания -->
            <div class="note__title-block">   <!-- создаем блок для заголовка -->
            
            <h2 class="note__title" contenteditable="true" id="title${id}" onclick="editRemind(${id})">${note.title}</h2>    <!-- создаем заголовок напоминания -->
            
            
            <div class="note__title-editor-unchecked" id="info${id}" onclick="infoMenuShow(${id})">i</div>    <!-- создаем блок для кружочка справа i -->
                <ul class="note__menu" id="noteMenu${id}">
                    <li class="note__menu-item" id="done${id}" onclick="noteIsDone(${id})">Выполнено</li>
                    <li class="note__menu-item" id="change${id}">Изменить</li>
                    <li class="note__menu-item note__remove" onclick="removeRemind(${id})">Удалить</li>
                </ul>
            <!--   <div class="note__remove" onclick="removeRemind(${id})">Удалить</div>          -->    <!-- создаем блок для кнопки Удалить -->
            </div> 
            <p class="note__preview">${note.text}</p>     <!-- создаем блок для текста напоминания -->
            </div>
            </li>
            `
    }).join('');

}

// эта функция заставляет появляться кружочек слева от заметки
let isCheck = false
function circleCheck(idx) {              
    const noteCircleCheck = document.getElementById('circle' + idx);
    noteCircleCheck.classList.toggle('note__circle-checked');
    isCheck = !isCheck                                         // чтобы отследить включен или выключен кружок
    console.log(isCheck)
    const infoCircle = document.getElementById('info'+idx);
    infoCircle.classList.toggle('note__title-editor');
    if (!isCheck) {                                    // это условие скрывает меню действий с заметкой, если кружочек слева не выбран
        const noteMenu = document.getElementById('noteMenu'+idx)
        noteMenu.classList.remove('note__menu-show')
        noteMenu.classList.add('note__menu-hide')
    }
}


// при нажатии кружка i справа появляется меню действий с заметкой
function infoMenuShow(idx){   
    const noteMenu = document.getElementById('noteMenu'+idx)
    noteMenu.classList.remove('note__menu-hide')
    noteMenu.classList.add('note__menu-show')  
}

let noteTitleIsCrossOut = false;
function noteIsDone(idx){                                       // функция, которая зачеркивает напоминание и меняет пунк меню выполнено-не выполнено
    const isDoneText = document.getElementById('done' + idx);     
    const noteTitle = document.getElementById('title' + idx);  // зачеркивание заголовка выполненного напоминания
    noteTitle.classList.toggle('note-is-done');
    noteTitleIsCrossOut = !noteTitleIsCrossOut;
    if(noteTitleIsCrossOut){                                   // меняем текст меню, если напоминание выполнено или не выполено
        isDoneText.textContent = isDoneText.textContent.replace("Не выполнено", "Выполнено")
    }else{
        isDoneText.textContent = isDoneText.textContent.replace("Выполнено", "Не выполнено")
    }
}




// //не могу понять почему не работает этот вариант с листенером
//     document.addEventListener("DOMContentLoaded", ()=>{  // сначала необходимо, чтобы полностью прогрузилась страница
//     const testCircleUp = document.querySelector('.note__circle')
//     testCircleUp.addEventListener('click', ()=>{   // и только потом назначать слушателя
//         console.log('hi')
//     })
// })








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






render(); // вызвываем функцию-цикл, которая проходит по массиву всех Напоминаний и отрисовывает их


// //кружок слева от заголовка заметки
// const circleChecked = document.querySelector('.note__circle');
// circleChecked.onclick = () => {
//     console.log('zacherknut')
//     const noteChecked = document.querySelector('.note__circle-unchecked');
//     const noteIsDone = document.querySelector('.note__title');

//     noteChecked.classList.toggle('note__circle-checked'); //при нажатии заполняется синим цветом
//     noteIsDone.classList.toggle('note-is-done'); // зачеркивает заголовок заметки
// }




// //кружок справа от заголовка заметки - i, меню редактирования
// const noteTitle = document.querySelector('.note__title');
// noteTitle.onclick = () => {
//     const noteTitleUnchecked = document.querySelector('.note__title-editor-unchecked'); // при нажатии на заголовок, справа появляется кружок
//     noteTitleUnchecked.classList.toggle('note__title-editor');
// }


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