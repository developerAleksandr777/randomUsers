const input = document.querySelector('.input')
const search = document.querySelector('.search')
const row = document.querySelector('.row')
const male = document.querySelector('.male')
const female = document.querySelector('.female')

let usersState = []
let gender = 'all'
const getRandomUsers = async (num) => {
    const request = await fetch(`https://randomuser.me/api/?results=${num ? num : 10}`)
    const response = await request.json()
    renderData(response.results);
    usersState = response.results
}
getRandomUsers()

const renderData = (data) => {
    row.innerHTML = ''
    data.forEach(el => {
        const box = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("p");
        const email = document.createElement("p");
        const phone = document.createElement("p");

        const col = document.createElement('div')

        name.textContent = `${el.name.title}.${el.name.first} ${el.name.last}`;
        img.src = el.picture.medium;
        phone.textContent = el.phone;
        email.textContent = el.email;
        box.className = 'box'
        col.className = 'col-6'

        box.append(img, name, email, phone);
        col.append(box)
        row.append(col);
    })
}

input.addEventListener('input', () => {
    getRandomUsers(input.value)
})


const renderDataByGender = () => {
    const [maleStr, femaleStr] = ['male', 'female']

    const getByGender = (gender) => {
        const result = usersState.filter(el => el.gender === gender)
        renderData(result)
    }
    male.addEventListener('click', () => {
        getByGender(maleStr)
        gender = maleStr
    })
    female.addEventListener('click', () => {
        getByGender(femaleStr)
        gender = femaleStr
    })
}
renderDataByGender()

const searchUsers = () => {
    search.addEventListener('input', () => {
        const result = usersState.filter(el => {
            const { title, first, last } = el.name
            const searchValue = `${title}.${first} ${last}`.toLowerCase().includes(search.value.toLowerCase())
            return gender === 'all'
                ? searchValue
                : searchValue && el.gender === gender
        })
        renderData(result)
    })
}
searchUsers()


// отрисовать картинку
// отрисовать title, name - first, name - last
// отрисовать phone, email
// создать кнопку при нажатии на которую отрисуются новые юзеры
// создать input в котором вы будете вводить кол - во юзеров, input динамичный

