/*
Возвращает разметку приложения.
Ручная вставка bootstrap стилей, стилей проекта и скриптов применяется только для серверного рендеринга.
*/
module.exports = function () {
  return `
doctype html
html(lang="ru")
  head
    title App
    link(href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet")
    link(href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet")
    meta(name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no")
  body
    div#root
`;
}
