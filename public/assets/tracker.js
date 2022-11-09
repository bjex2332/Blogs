let trackerTitle;
let trackerText;
let saveTrackerBtn;
let newTrackerButton;
let trackerList;

if (window.location.pathname === '/tracker') {
  trackerTitle = document.querySelector('.tracker-title');
  trackerText = document.querySelector('.tracker-textarea');
  saveTrackerBtn = document.querySelector('.save-tracker');
  newTrackerButton = document.querySelector('.new-tracker');
  trackerList = document.querySelectorAll('.list-container .list-group');
}

const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};

let activeTracker = {};

const getTracker = () =>
  fetch('/api/tracker', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveTracker = (tracker) =>
  fetch('/api/tracker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tracker),
  });

const deleteTracker = (id) =>
  fetch(`/api/tracker/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveTracker = () => {
  hide(saveTrackerBtn);

  if (activeTracker.id) {
    trackerTitle.setAttribute('readonly', true);
    trackerText.setAttribute('readonly', true);
    trackerTitle.value = activeTracker.title;
    trackerText.value = activeTracker.text;
  } else {
    trackerTitle.removeAttribute('readonly'); 
    trackerText.removeAttribute('readonly'); 
    trackerTitle.value = '';
    trackerText.value = '';
  }
};

const handleTrackerSave = () => {
  const newTracker = {
    title: trackerTitle.value,
    text: trackerText.value,
  };
  saveTracker(newTracker).then(() => {
    getAndRenderTracker();
    renderActiveTracker();
  });
};


const handleTrackerDelete = (data) => {

  data.stopPropagation();

  const tracker = data.target;
  const trackerId = JSON.parse(tracker.parentElement.getAttribute('data-tracker')).id;

  if (activeTracker.id === trackerId) {
    activeTracker = {};
  }

  deleteTracker(trackerId).then(() => {
    getAndRenderTracker();
    renderActiveTracker();
  });
};


const handletrackerView = (data) => {
  data.preventDefault();
  activeTracker = JSON.parse(data.target.parentElement.getAttribute('data-tracker'));
  renderActiveTracker();
};


const handleNewTrackerView = (data) => {
  activeTracker = {};
  renderActiveTracker();
};

const handleRenderSaveBtn = () => {
  if (!trackerTitle.value.trim() || !trackerText.value.trim()) {
    hide(saveTrackerBtn);
  } else {
    show(saveTrackerBtn);
  }
};


const renderTrackerList = async (tracker) => {
  let jsonTracker = await tracker.json();
  if (window.location.pathname === '/tracker') {
    trackerList.forEach((element) => (element.innerHTML = ''));
  }

  let trackerListItems = [];

 
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handletrackerView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-tracker'
      );
      delBtnEl.addEventListener('click', handleTrackerDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonTracker.length === 0) {
    trackerListItems.push(createLi('No saved workouts', false));
  }

  jsonTracker.forEach((tracker) => {
    const li = createLi(tracker.title);
    li.dataset.tracker = JSON.stringify(tracker);

    trackerListItems.push(li);
  });

  if (window.location.pathname === '/tracker') {
    trackerListItems.forEach((tracker) => trackerList[0].append(tracker));
  }
};


const getAndRenderTracker = () => getTracker().then(renderTrackerList);

if (window.location.pathname === '/tracker') {
  saveTrackerBtn.addEventListener('click', handleTrackerSave);
  newTrackerButton.addEventListener('click', handleNewTrackerView);
  trackerTitle.addEventListener('keyup', handleRenderSaveBtn);
  trackerText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderTracker();