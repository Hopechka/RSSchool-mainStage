export const inner_html = `<div class="container">
<header class="header">
    <h1>
        Car Collection <br />
        store
    </h1>
    <div class="basket">
        <img src="./assets/icon/basket-shopping-solid.svg" alt="basket" />
        <div class="count"><span></span></div>
    </div>
</header>
<main class="main">
    <section class="filter">
        <div>
            <h3>Search</h3>

            <div class="wrap">
                <div class="search">
                    <input type="text" class="search-term" placeholder="Search by name" autofocus />
                    <button type="submit" class="search-button">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
            </div>
            <h3>Sorting</h3>
            <div class="sort-btn">
                <form>
                    <p>
                        <select id="sort-select">
                            <option value="selected" selected>Sorting</option>
                            <option value="sort-name-up">Sort by Name(A-Z)</option>
                            <option value="sort-name-down">Sort by Name(Z-A)</option>
                            <option value="sort-year-up">Sort by year &#8593;</option>
                            <option value="sort-year-down">Sort by year &#8595;</option>
                            <option value="sort-factory-up">Sort by fabric &#8593;</option>
                            <option value="sort-factory-down">Sort by fabric &#8595;</option>
                        </select>
                    </p>
                </form>
            </div>
        </div>

        <div>
            <h3>Filters by range</h3>
            <ul class="filter-btn filter-btn-range">
                <li>
                    <span>Filters by year: </span>
                    <div id="slider-year" class="slider"></div>
                    <div class="years"></div>
                </li>
                <li>
                    <span>Filters by quantity:</span>
                    <div id="slider-quantity" class="slider"></div>
                    <div class="quantity-text"></div>
                </li>
            </ul>
        </div>
        <div>
            <h3>Filters by value:</h3>
            <ul class="filter-btn filter-btn-value">
                <li>
                    <div class="sort-btn">
                        <span>by factory</span>
                        <span class="arrow">&#9660;</span>

                        <form class="hidden" id="filter-by-factory-select"></form>
                    </div>
                </li>
                <li>
                    <div class="sort-btn">
                        <span>by color</span>
                        <span class="arrow">&#9660;</span>

                        <form class="hidden" id="filter-by-color-select"></form>
                    </div>
                </li>
                <li>
                    <div class="sort-btn">
                        <span>by material</span>
                        <span class="arrow">&#9660;</span>

                        <form class="hidden" id="filter-by-material-select"></form>
                    </div>
                </li>
                <li>
                    <div class="sort-btn">
                        <span>by brand</span>
                        <span class="arrow">&#9660;</span>
                        <form class="hidden" id="filter-by-brand-select"></form>
                    </div>
                </li>
            </ul>
            <ul class="reset-btn">
                <li>
                    <button class="btn-reset-filter">Filters reset</button>
                </li>
                <li>
                    <button class="btn-reset-settings">Settings reset</button>
                </li>
            </ul>
        </div>
    </section>
    <section id="content">
        <div id="modal" class="modal-on">
            <h3>Извините, совпадений не обнаружено</h3>
        </div>
        <div class="cards" id="cards"></div>
        <div class="nav-btn">
            <ul>
                <li class="btn-no-active-prev-prev"><button disabled class="btn-light prev-prev"><p>&lt;&lt;</p></button>
                </li>
                <li class="btn-no-active-prev">
                    <button disabled class="btn-light prev"><p>&lt;</p></button>
                </li>
                <li class="btn-active">
                    <button class="page-num"><p>1</p></button>
                </li>
                <li class="btn-active">
                    <button class="btn-light next"><p>></p></button>
                </li>
                <li class="btn-active">
                    <button class="btn-light next-next"><p>>></p></button>
                </li>
            </ul>
        </div>
    </section>
</main>

<footer class="footer">
    <div class="date"><span>2022</span></div>
    <div class="git-link">
        <a href="https://github.com/Hopechka?tab=stars">
            <img src="./assets/icon/GitHub-Mark-64px.png" alt="GitHub link" />
        </a>
        <a href="https://github.com/Hopechka?tab=stars">
            <span>Hopechka</span>
        </a>
    </div>
    <div class="school-logo">
        <a href="https://rs.school/js/"><img src="./assets/icon/rs_school_logo.svg" alt="school-logo" /></a>
    </div>
</footer>
<template id="card">
    <div class="card">
        <div class="wrapper"></div>
        <h3 class="card-name">Volkswagen Karmann Ghia Coupe</h3>
        <div class="card-pic"></div>
        <ul>
            <li class="card-price">Цена: $50</li>
            <li class="card-amount">Количество: 2</li>
            <li class="card-factory">Производитель: Minichamps</li>
            <li class="card-year">Год выпуска: 1955</li>
            <li class="card-color">Цвет: Yellow/Black</li>
            <li class="card-material">Материал: metal/plastic</li>
        </ul>
        <div class="card-add"></div>
    </div>
</template>
</div>`;
