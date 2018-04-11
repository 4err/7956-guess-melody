/**
 * Created by Denis on 11.04.2018.
 */

export default (result) => `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${result.title}</h2>
    <div class="main-stat">${result.stat}</div>
    <span role="button" tabindex="0" class="main-replay">${result.replay}</span>
`;
