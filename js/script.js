const dishesList = document.querySelector('.content-wrapper ul');
const addItemBtn = document.querySelector('#add-item');
let dishes = JSON.parse(localStorage.getItem("dishes")) || [];
const selectAllBtn = document.querySelector('#select-all');
const unselectBtn = document.querySelector('#unselect');
const deleteBtn  = document.querySelector('#delete');
const addItemBtnHandler = function(e){
    e.preventDefault();
    const name = (this.querySelector('[name=new-dish]')).value;
    const dish = {
        name,
        done :false
    }
    dishes.push(dish);
    //console.table(dishes);
    localStorage.setItem("dishes",JSON.stringify(dishes));
    populateDishesList(dishes,dishesList);
    this.reset();
};
addItemBtn.addEventListener('submit',addItemBtnHandler);

const populateDishesList = function(dishes =[],dishesList){
    const html = dishes.map((dish,index)=>{
        return `
        <li>
        <input type="checkbox" data-index="${index}" id="item${index}" ${dish.done === true? 'checked' : '' }>
        <label for="item${index}">${dish.name}</label>
        </li>`
    }).join("");
    //console.log(html);
    dishesList.innerHTML = html;

};
console.log(dishes);
populateDishesList(dishes,dishesList);
const dishesListClickHandler = function(e){
    //console.log(e.target);
    if (!e.target.matches('input')) return;
    const index = e.target.dataset.index
    dishes[index].done = !dishes[index].done;
    localStorage.setItem('dishes',JSON.stringify(dishes));
    console.log(dishes);
};
dishesList.addEventListener('click',dishesListClickHandler);
const deleteAllDishes = function(e){
    localStorage.removeItem('dishes');
    dishes= JSON.parse(localStorage.getItem('dishes')) || [];
    populateDishesList(dishes,dishesList);
}
deleteBtn.addEventListener('click',deleteAllDishes);
const selectAllDishes = function(e){
    dishes.forEach(dish => {
        dish.done = true;
    });
    localStorage.setItem('dishes',JSON.stringify(dishes));
    populateDishesList(dishes,dishesList);
};
const unselectAll = function(e){
    dishes.forEach(dish =>{
        dish.done = false;
    });
    localStorage.setItem('dishes',JSON.stringify(dishes));
    populateDishesList(dishes,dishesList);
};
selectAllBtn.addEventListener('click',selectAllDishes);
unselectBtn.addEventListener('click',unselectAll);