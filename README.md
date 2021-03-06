# Movie Collection     movieDB_v3.3

[](https://kanistra50.github.io/movieDB/)

Описание:
Одностраничное приложения для просмотра коллекции фильмов с помощью The Movie Database API.

При открытии приложения, отображается список популярных фильмов с пагинацией. Также на странице есть поле для поиска. При вводе текста отображаются фильмы, которые ему соответствуют. Для каждого фильма в списке отображается список жанров (названий жанров, не айдишек), к которым он принадлежит.

При клике на карточку с фильмом, открывается страница с детальной информацией об этом фильме и списком рекоммендованых фильмов к нему.

Также реализована возможность добавлять фильмы в избранное как со списка, так и со страницы с отдельным фильмом. Список таких фильмов сохраняется локально (localStorage). Предусмотрен просмотр списка с избранными фильмами и удаление из избранного. Также предусмотрено отображение на карточке с фильмом и его странице информации о том, что этот фильм добавлен в избранное.

Технологии
При реализации использованы следующие технологии:
Angular2, UI router
RxJS,

Ссылки на API:

https://developers.themoviedb.org/3

https://developers.themoviedb.org/3/movies/get-popular-movies

https://developers.themoviedb.org/3/search/search-movies

https://developers.themoviedb.org/3/genres

https://developers.themoviedb.org/3/movies/get-movie-details

https://developers.themoviedb.org/3/movies/get-movie-recommendations
