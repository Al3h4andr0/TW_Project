const filterSlide = () => {
    const filterButton = document.querySelector('.filterButton');
    const filterList = document.querySelector('.filterList');
    console.log(filterList);
    console.log(filterButton);
    filterButton.addEventListener('click', () => {
        filterList.classList.toggle('filterButton-active');
    });

}

filterSlide();



