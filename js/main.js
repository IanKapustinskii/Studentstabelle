(() => {

  const studentsList = [];

  const today = new Date();

  const allertFirst = document.createElement('span');
  allertFirst.classList.add('allert');
  allertFirst.textContent = 'Feld muss ausgefüllt werden';

  const allertSecond = document.createElement('span');
  allertSecond.classList.add('allert');
  allertSecond.textContent = 'Feld muss ausgefüllt werden';

  const allertThird = document.createElement('span');
  allertThird.classList.add('allert');
  allertThird.textContent = 'Feld muss ausgefüllt werden';

  const allertFourth = document.createElement('span');
  allertFourth.classList.add('allert');
  allertFourth.textContent = 'Feld muss ausgefüllt werden';

  const popupElement = document.createElement('p');

  function showPopup(text) {
    popupElement.classList.add('popup');
    popupElement.textContent = text;
    document.body.append(popupElement);

    popupElement.style.display = 'block';

    setTimeout(() => {
      popupElement.classList.add('hide');
    }, 2000);

    setTimeout(() => {
      popupElement.style.display = 'none';
      popupElement.classList.remove('hide');
    }, 3000);
  }

  function getStudentItem(studentObj, index) {
    const studentsTabelStr = document.createElement('tr');
    studentsTabelStr.setAttribute('data-id', index);
    const studentFullNameElement = document.createElement('td');
    const birthdayElement = document.createElement('td');
    const startYearElement = document.createElement('td');
    const facultatElement = document.createElement('td');
    const deleteElement = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Löschen';

    let studentFullName = `${studentObj.lastName.trim().split(' ').join('')[0].toUpperCase() + studentObj.lastName.trim().split(' ').join('').slice(1).toLowerCase()} ${studentObj.firstName.trim().split(' ').join('')[0].toUpperCase() + studentObj.firstName.trim().split(' ').join('').slice(1).toLowerCase()} ${studentObj.middleName.trim().split(' ').join('')[0].toUpperCase() + studentObj.middleName.trim().split(' ').join('').slice(1).toLowerCase()}`;

    studentObj.fullName = studentFullName.toLowerCase();

    let age = today.getFullYear() - studentObj.birthDate.getFullYear();
    if (today.getMonth() < studentObj.birthDate.getMonth() || (studentObj.birthDate.getMonth() === today.getMonth() && studentObj.birthDate.getDate() > today.getDate())) {
      age--; 
    }

    let studentBirthday = `${String(studentObj.birthDate.getDate()).padStart(2, '0')}.${String(studentObj.birthDate.getMonth() + 1).padStart(2, '0')}.${String(studentObj.birthDate.getFullYear())} (Полных лет: ${age})`;
    let studentStartYear = `${studentObj.startYear}-${studentObj.startYear + 4}`;
    let facultat = studentObj.faculty.trim()[0].toUpperCase() + studentObj.faculty.trim().slice(1).toLowerCase();

    studentObj.faculty = facultat.toLowerCase()

    let dateEnd = new Date(studentObj.startYear + 4, 9, 1);

    if (dateEnd.getFullYear() < today.getFullYear()) {
      studentStartYear = `${studentObj.startYear}-${studentObj.startYear + 4} (Absolvent)`;
    }

    if (dateEnd.getFullYear() === today.getFullYear()) {
      if (today.getMonth() >= dateEnd.getMonth()) {
        studentStartYear = `${studentObj.startYear}-${studentObj.startYear + 4} (Absolvent)`;
      }
    }

    studentFullNameElement.textContent = studentFullName;
    birthdayElement.textContent = studentBirthday;
    startYearElement.textContent = studentStartYear;
    facultatElement.textContent = facultat;

    deleteElement.append(deleteButton);

    studentsTabelStr.append(studentFullNameElement);
    studentsTabelStr.append(birthdayElement);
    studentsTabelStr.append(startYearElement);
    studentsTabelStr.append(facultatElement);

    studentsTabelStr.append(deleteButton);

    return studentsTabelStr;
  }

  function renderStudentsTable(studentsArray) {

    const tbody = document.querySelector('#students-table tbody');

    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const middleNameInput = document.getElementById('middle-name');
    const birthdayInput = document.getElementById('birthday');
    const startYearInput = document.getElementById('start-year');
    const facultyInput = document.getElementById('facultat');

    const nameLabel = document.querySelector('[for="name"]');
    const surnameLabel = document.querySelector('[for="surname"]');
    const middleNameLabel = document.querySelector('[for="middle-name"]');
    const facultyLabel = document.querySelector('[for="facultat"]');

    birthdayInput.setAttribute('max', `${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
    startYearInput.setAttribute('max', today.getFullYear());

    studentsArray.forEach((student, index) => {
      const row = getStudentItem(student);
      row.setAttribute('data-id', index); 
      tbody.append(row); 
    });

    nameInput.addEventListener('input', () => {
      if (document.body.contains(allertFirst) && nameInput.value.trim().length > 0) {
        allertFirst.remove();
        nameInput.style.backgroundColor = '';
      }
    })

    surnameInput.addEventListener('input', () => {
      if (document.body.contains(allertSecond) && surnameInput.value.trim().length > 0) {
        allertSecond.remove();
        surnameInput.style.backgroundColor = '';
      }
    })

    middleNameInput.addEventListener('input', () => {
      if (document.body.contains(allertThird) && middleNameInput.value.trim().length > 0) {
        allertThird.remove();
        middleNameInput.style.backgroundColor = '';
      }
    })

    facultyInput.addEventListener('input', () => {
      if (document.body.contains(allertFourth) && facultyInput.value.trim().length > 0) {
        allertFourth.remove();
        facultyInput.style.backgroundColor = '';
      }
    })

    const addForm = document.getElementById('students-form');

    addForm.addEventListener('submit', (e) => {

      e.preventDefault();

      let studentNew = {};
      studentNew.firstName = nameInput.value.trim();
      studentNew.lastName = surnameInput.value.trim();
      studentNew.middleName = middleNameInput.value.trim();
      studentNew.birthDate = new Date(birthdayInput.value.trim());
      studentNew.startYear = Number(startYearInput.value.trim());
      studentNew.faculty = facultyInput.value.trim();
      if (!studentNew.firstName || !studentNew.lastName || !studentNew.middleName || !studentNew.faculty) {
        if (!studentNew.firstName) {
          nameInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
          nameLabel.after(allertFirst);
        }

        if (!studentNew.lastName) {
          surnameInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
          surnameLabel.after(allertSecond);
        }

        if (!studentNew.middleName) {
          middleNameInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
          middleNameLabel.after(allertThird);
        }

        if (!studentNew.faculty) {
          facultyLabel.after(allertFourth);
          facultyInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        }
        return;
      }

      let age = today.getFullYear() - studentNew.birthDate.getFullYear();
      if (today.getMonth() < studentNew.birthDate.getMonth() || (studentNew.birthDate.getMonth() === today.getMonth() && studentNew.birthDate.getDate() < today.getDate())) {
        age--;
      }

      if (0 >= age) {
        showPopup('Überprüfen Sie, ob Ihr Geburtsdatum korrekt eingegeben ist');
        return;
      }

      if (studentNew.birthDate.getFullYear() > studentNew.startYear) {
        showPopup('Sie konnten vor Ihrer Geburt nicht eintreten')
        return;
      }

      const row = getStudentItem(studentNew, studentsList.length); 
      tbody.append(row);

      studentsList.push(studentNew);
      console.log(studentsList);

      nameInput.value = '';
      surnameInput.value = '';
      middleNameInput.value = '';
      birthdayInput.value = '';
      startYearInput.value = '';
      facultyInput.value = '';
    })

    sortiments(studentsList);

    findStudent(studentsList);

  }

  //сортировка массива
  function sortiments(arr) {
    arr = [...studentsList];

    const alphabethSort = document.getElementById('fullname');
    const birthSort = document.getElementById('birthDate');
    const yearsSort = document.getElementById('educationYears');
    const facultySort = document.getElementById('faculty');
    let reverse = false;

    const updateSortArrow = (element, direction) => {
      const arrow = element.querySelector('.sort-arrow');
      arrow.classList.remove('asc', 'desc');
      arrow.classList.add(direction ? 'asc' : 'desc');
    };

    const sortAndRender = (sortFunction, element) => {
      arr = [...studentsList];
      arr.sort(sortFunction);
      const tbody = document.querySelector('#students-table tbody');
      tbody.innerHTML = '';
      arr.forEach((student, index) => {
        const row = getStudentItem(student);
        row.setAttribute('data-id', index);
        tbody.append(row);
      });
      updateSortArrow(element, reverse);
      reverse = !reverse;
    };

    alphabethSort.addEventListener('click', () => {
      sortAndRender((a, b) => reverse
        ? b.lastName.toLowerCase().localeCompare(a.lastName.toLowerCase())
        : a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()),
        alphabethSort
      );
    });

    birthSort.addEventListener('click', () => {
      sortAndRender((a, b) => reverse ? b.birthDate - a.birthDate : a.birthDate - b.birthDate, birthSort);
    });

    yearsSort.addEventListener('click', () => {
      sortAndRender((a, b) => reverse ? b.startYear - a.startYear : a.startYear - b.startYear, yearsSort);
    });

    facultySort.addEventListener('click', () => {
      sortAndRender((a, b) => reverse
        ? b.faculty.toLowerCase().localeCompare(a.faculty.toLowerCase())
        : a.faculty.toLowerCase().localeCompare(b.faculty.toLowerCase()),
        facultySort
      );
    });
  }

  function findStudent(arr) {
    const findButton = document.getElementById("find-button");
    const filterNameInput = document.getElementById('filter-name');
    const filterEndInput = document.getElementById('filter-end-year');
    const filterStartInput = document.getElementById('filter-start-year');
    const filterFacultyInput = document.getElementById('filter-faculty');

    filterEndInput.setAttribute('max', (today.getFullYear() + 4));
    filterStartInput.setAttribute('max', today.getFullYear());

    findButton.addEventListener('click', (e) => {

      e.preventDefault();

      newArr = [...arr];

      if (!filterNameInput.value.trim() && !filterStartInput.value && !filterEndInput.value && !filterFacultyInput.value.trim()) {
        showPopup('Felder sind leer, es wurden keine Filter angewendet');
        return;
      }

      if (filterNameInput.value.trim()) newArr = filter(newArr, 'fullName', String(filterNameInput.value.trim().toLowerCase()));

      if (filterStartInput.value && (((filterEndInput.value - 4) === Number(filterStartInput.value)) || !filterEndInput.value)) newArr = filter(newArr, 'startYear', String(filterStartInput.value));

      if (filterEndInput.value && (((filterEndInput.value - 4) === Number(filterStartInput.value)) || !filterStartInput.value)) newArr = filter(newArr, 'startYear', String((filterEndInput.value - 4)));

      if (filterEndInput.value && filterStartInput.value && ((filterEndInput.value - 4) !== Number(filterStartInput.value))) {
        showPopup('Ausbildungsdauer 4 Jahre');
        filterEndInput.value = '';
        filterStartInput.value = '';
        return;
      }

      if (filterFacultyInput.value.trim()) newArr = filter(newArr, 'faculty', String(filterFacultyInput.value.trim().toLowerCase()));

      if (newArr.length === 0) {
        showPopup('Es gibt keine Studierenden mit diesen Parametern');
        filterNameInput.value = '';
        filterEndInput.value = '';
        filterStartInput.value = '';
        filterFacultyInput.value = '';
        return;
      }

      console.log(newArr);

      const tbody = document.querySelector('#students-table tbody');
      tbody.innerHTML = '';
      newArr.forEach((student, index) => {
        const row = getStudentItem(student);
        row.setAttribute('data-id', index);
        tbody.append(row);
      });
      showPopup('Angewendete Filter');

      filterNameInput.value = '';
      filterEndInput.value = '';
      filterStartInput.value = '';
      filterFacultyInput.value = '';
    })

    const deleteButton = document.getElementById('delete-button');

    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      const tbody = document.querySelector('#students-table tbody');
      tbody.innerHTML = '';
      studentsList.forEach((student, index) => {
        const row = getStudentItem(student);
        row.setAttribute('data-id', index);
        tbody.append(row);
      });
      showPopup('Filter werden gereinigt');
      filterNameInput.value = '';
      filterEndInput.value = '';
      filterStartInput.value = '';
      filterFacultyInput.value = '';
    })

  }


  function filter(arr, prop, value) {
    let result = []
    let copy = [...arr];
    for (const item of copy) {
      if (String(item[prop]).includes(value) == true) result.push(item);
    }
    return result;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderStudentsTable(studentsList)

  })

})()