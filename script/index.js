const parent = document.getElementsByClassName('parent');
const addBtn = document.getElementById('add');

const setLocalStorageData = () => {
      const text = document.querySelectorAll("textarea");
      const arr = [];
      console.log(text);
      text.forEach((note) => {
        if (note.value.trim().length > 0) { // check if note has some text
          arr.push(note.value);
        } else {
          note.parentElement.remove(); // remove the note from the parent element
        }
      });
      console.log(arr);

      localStorage.setItem("arr", JSON.stringify(arr));
};

const addNote = (text = '') => {
  const div = document.createElement('div');
  div.classList.add('in');
  div.insertAdjacentHTML('beforeend',`<button class="edit" id="edit"><i class="fas fa-edit"></i></button>
          <button class="del" id="delete"><i class="fas fa-trash-alt"></i></button>
          <div class="toggleDiv ${text? "":"hidden"}"></div>
          <textarea class="${text ? "hidden":""}" rows="5"></textarea>`);
  parent[0].appendChild(div);
  
  const editBtn = div.querySelector('#edit');
  const delBtn = div.querySelector('#delete');
  const toggleDiv = div.querySelector('.toggleDiv');
  const textarea = div.querySelector('textarea');

  delBtn.addEventListener('click', () => {
  // Fade out the div before removing it
  div.style.opacity = 1;
  const fadeOut = setInterval(() => {
    if (div.style.opacity > 0) {
      div.style.opacity -= 0.1;
    } else {
      clearInterval(fadeOut);
      div.remove();
      setLocalStorageData();
    }
  }, 40);
});
 
   textarea.value = text;
   toggleDiv.innerHTML = text;

   editBtn.addEventListener('click', () => {
      toggleDiv.classList.toggle("hidden");
      textarea.classList.toggle("hidden");
   });

   textarea.addEventListener('change', (event) => {
    const value = event.target.value;
    toggleDiv.innerHTML = value;

    setLocalStorageData();
   });
};

const arr = JSON.parse(localStorage.getItem("arr"));

if(arr){
  arr.forEach((note) => addNote(note));
}

addBtn.addEventListener('click', () => addNote());